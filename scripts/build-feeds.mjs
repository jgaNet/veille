#!/usr/bin/env node
// Génère les flux RSS à partir des fichiers Markdown du dépôt.
//
// Un flux = un dossier à la racine contenant alerts/ et/ou daily/ (ex. monde/).
// Sortie : feeds/<flux>.xml pour chaque flux (alertes + récapitulatifs), plus
// feeds/all.xml, qui ne reprend QUE les récapitulatifs quotidiens de tous les
// flux — un seul rendez-vous vers 20 h, pas une réplication des alertes.
// Aucune dépendance externe : Node >= 18 suffit.

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const REPO = process.env.REPO || "jgaNet/veille";
const SITE_URL = (process.env.SITE_URL || `https://github.com/${REPO}`).replace(/\/$/, "");
const BLOB_BASE = process.env.BLOB_BASE || `https://github.com/${REPO}/blob/main`;
// Base publique des fichiers de flux. Avec GitHub Pages : https://<user>.github.io/<repo>
const FEEDS_BASE = (
  process.env.FEEDS_BASE || `https://raw.githubusercontent.com/${REPO}/main`
).replace(/\/$/, "");
const MAX_ITEMS = Number(process.env.MAX_ITEMS || 120);

// Dossiers racine qui ne sont pas des flux.
const NOT_FEEDS = new Set([".git", ".github", "scripts", "feeds", "node_modules"]);

const ALL_TITLE = "Veille — les briefs du soir";
const ALL_DESC =
  "Uniquement les récapitulatifs quotidiens (vers 20 h, heure de Paris) de tous les flux de la veille. Les alertes restent dans le flux de chaque thème.";

const DEFAULT_META = {
  monde: {
    title: "Veille mondiale — alertes vérifiées",
    description:
      "Veille horaire sur l'actualité mondiale : faits établis, déclarations et incertitudes clairement distingués, avec indice de confiance et sources croisées.",
  },
};

/* ---------- utilitaires ---------- */

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile() && e.name.endsWith(".md") && e.name !== "README.md") out.push(p);
  }
  return out;
}

function stripQuotes(s) {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

// Parseur de front matter volontairement minimal : scalaires, listes en ligne
// ([a, b]) et listes à tirets. Suffisant pour le format utilisé ici.
function parseFrontMatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const head = raw.slice(raw.indexOf("\n") + 1, end);
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  let currentKey = null;
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(stripQuotes(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const [, key, rest] = kv;
    currentKey = key;
    const value = rest.trim();
    if (value === "") {
      data[key] = [];
    } else if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => stripQuotes(v))
        .filter(Boolean);
    } else {
      data[key] = stripQuotes(value);
    }
  }
  return { data, body };
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Conversion Markdown -> HTML minimale, pour un contenu lisible dans les
// lecteurs RSS sans embarquer de dépendance.
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inList = false;
  let inQuote = false;
  let para = [];
  let quoteBuf = [];

  const inline = (t) =>
    esc(t)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\W)\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/(^|[\s(])(https?:\/\/[^\s)<]+)/g, '$1<a href="$2">$2</a>');

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushQuote = () => {
    if (quoteBuf.length) {
      out.push(`<p>${inline(quoteBuf.join(" "))}</p>`);
      quoteBuf = [];
    }
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const closeQuote = () => {
    if (inQuote) {
      out.push("</blockquote>");
      inQuote = false;
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushPara();
      flushQuote();
      closeList();
      closeQuote();
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      flushPara();
      flushQuote();
      closeList();
      closeQuote();
      out.push("<hr />");
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      flushQuote();
      closeList();
      closeQuote();
      const level = Math.min(h[1].length + 1, 6);
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    const li = line.match(/^(\s*)[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      flushQuote();
      closeQuote();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(li[2])}</li>`);
      continue;
    }
    const bq = line.match(/^>\s?(.*)$/);
    if (bq) {
      flushPara();
      closeList();
      if (!inQuote) {
        out.push("<blockquote>");
        inQuote = true;
      }
      quoteBuf.push(bq[1]);
      continue;
    }
    // Continuation indentée d'un élément de liste.
    if (inList && /^\s{2,}\S/.test(line)) {
      const last = out.length - 1;
      if (out[last] && out[last].startsWith("<li>")) {
        out[last] = out[last].replace(/<\/li>$/, ` ${inline(line.trim())}</li>`);
        continue;
      }
    }
    if (inQuote) {
      quoteBuf.push(line.trim());
      continue;
    }
    closeList();
    para.push(line.trim());
  }
  flushPara();
  flushQuote();
  closeList();
  closeQuote();
  return out.join("\n");
}

function parseDate(value, fallbackPath) {
  if (value) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  // Repli : date-heure déduite du nom de fichier AAAA-MM-JJ-HH-MM-...
  const m = fallbackPath.match(/(\d{4})-(\d{2})-(\d{2})(?:-(\d{2})-(\d{2}))?/);
  if (m) {
    const [, y, mo, d, h = "12", mi = "00"] = m;
    const dt = new Date(`${y}-${mo}-${d}T${h}:${mi}:00+02:00`);
    if (!Number.isNaN(dt.getTime())) return dt;
  }
  return statSync(fallbackPath).mtime;
}

/* ---------- rendez-vous de 20 h (all.xml) ---------- */

// Heure à laquelle les récapitulatifs du jour entrent dans all.xml (Paris).
const BRIEF_HOUR = 20;
// BUILD_NOW permet de figer l'instant de génération (tests).
const NOW = process.env.BUILD_NOW ? new Date(process.env.BUILD_NOW) : new Date();

const PARIS = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function parisParts(date) {
  const p = Object.fromEntries(PARIS.formatToParts(date).map((x) => [x.type, x.value]));
  return { ymd: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

// Un récapitulatif du jour n'entre dans all.xml qu'à partir de 20 h : certains
// bulletins (fact-check) sont régénérés au fil de la journée et ne doivent pas
// y apparaître à moitié remplis. Leur date y est ramenée à 20 h, pour que tous
// les briefs d'une même soirée se suivent dans le lecteur RSS.
function forEveningFeed(items) {
  const now = parisParts(NOW);
  return items
    .filter((it) => it.isDaily)
    .filter((it) => {
      const d = parisParts(it.date);
      return d.ymd !== now.ymd || now.minutes >= BRIEF_HOUR * 60;
    })
    .map((it) => {
      const d = parisParts(it.date);
      const gap = BRIEF_HOUR * 60 - d.minutes;
      return gap > 0 ? { ...it, date: new Date(it.date.getTime() + gap * 60000) } : it;
    });
}

/* ---------- collecte ---------- */

function collect(feedDir) {
  const files = [...walk(join(feedDir, "alerts")), ...walk(join(feedDir, "daily"))];
  return files.map((abs) => {
    const raw = readFileSync(abs, "utf8");
    const { data, body } = parseFrontMatter(raw);
    const rel = relative(ROOT, abs).split(/[\\/]/).join("/");
    const firstHeading = body.match(/^#\s+(.*)$/m);
    const title = data.title || (firstHeading ? firstHeading[1] : rel);
    const date = parseDate(data.date, abs);
    const cats = [].concat(data.category || data.categories || []).filter(Boolean);
    const isDaily =
      data.type === "daily" || data.type === "recap" || rel.includes("/daily/");
    if (isDaily) {
      cats.push("briefing");
    }
    const confidence = data.confidence ? String(data.confidence) : "";
    const summary =
      data.summary ||
      body
        .replace(/[#*>`]/g, "")
        .split("\n")
        .find((l) => l.trim())
        ?.slice(0, 300) ||
      "";
    return {
      rel,
      isDaily,
      title,
      date,
      cats: [...new Set(cats)],
      confidence,
      summary,
      html: mdToHtml(body),
      link: `${BLOB_BASE}/${rel}`,
    };
  });
}

function renderFeed({ title, description, language, selfUrl, items }) {
  const xml = [];
  xml.push('<?xml version="1.0" encoding="UTF-8"?>');
  xml.push(
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">'
  );
  xml.push("  <channel>");
  xml.push(`    <title>${esc(title)}</title>`);
  xml.push(`    <link>${esc(SITE_URL)}</link>`);
  xml.push(`    <description>${esc(description)}</description>`);
  xml.push(`    <language>${esc(language || "fr")}</language>`);
  xml.push(`    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`);
  xml.push(`    <atom:link href="${esc(selfUrl)}" rel="self" type="application/rss+xml" />`);
  xml.push("    <generator>build-feeds.mjs</generator>");
  for (const it of items) {
    const t = it.confidence ? `${it.title} — confiance ${it.confidence}/10` : it.title;
    xml.push("    <item>");
    xml.push(`      <title>${esc(t)}</title>`);
    xml.push(`      <link>${esc(it.link)}</link>`);
    xml.push(`      <guid isPermaLink="false">veille:${esc(it.rel)}</guid>`);
    xml.push(`      <pubDate>${it.date.toUTCString()}</pubDate>`);
    for (const c of it.cats) xml.push(`      <category>${esc(c)}</category>`);
    xml.push(`      <description>${esc(it.summary)}</description>`);
    xml.push(
      `      <content:encoded><![CDATA[${it.html.replace(/]]>/g, "]]&gt;")}]]></content:encoded>`
    );
    xml.push("    </item>");
  }
  xml.push("  </channel>");
  xml.push("</rss>");
  return xml.join("\n") + "\n";
}

/* ---------- construction ---------- */

const FEEDS_DIR = join(ROOT, "feeds");
mkdirSync(FEEDS_DIR, { recursive: true });

const slugs = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !NOT_FEEDS.has(e.name))
  .map((e) => e.name)
  .filter((name) => {
    try {
      return readdirSync(join(ROOT, name)).some((n) => n === "alerts" || n === "daily");
    } catch {
      return false;
    }
  })
  .sort();

if (slugs.length === 0) {
  console.error("Aucun flux trouvé (dossier racine contenant alerts/ ou daily/).");
  process.exit(1);
}

const all = [];
const rows = [];

for (const slug of slugs) {
  const dir = join(ROOT, slug);
  let meta = DEFAULT_META[slug] || {};
  try {
    meta = { ...meta, ...JSON.parse(readFileSync(join(dir, "feed.json"), "utf8")) };
  } catch {
    /* feed.json optionnel */
  }
  const items = collect(dir).sort((a, b) => b.date - a.date);
  // all.xml : seulement les récapitulatifs quotidiens, jamais les alertes.
  all.push(...forEveningFeed(items));
  const kept = items.slice(0, MAX_ITEMS);
  writeFileSync(
    join(FEEDS_DIR, `${slug}.xml`),
    renderFeed({
      title: meta.title || `Veille — ${slug}`,
      description: meta.description || `Flux de veille « ${slug} ».`,
      language: meta.language,
      selfUrl: `${FEEDS_BASE}/feeds/${slug}.xml`,
      items: kept,
    })
  );
  rows.push(`  feeds/${slug}.xml — ${kept.length} entrée(s)`);
}

all.sort((a, b) => b.date - a.date);
writeFileSync(
  join(FEEDS_DIR, "all.xml"),
  renderFeed({
    title: ALL_TITLE,
    description: ALL_DESC,
    language: "fr",
    selfUrl: `${FEEDS_BASE}/feeds/all.xml`,
    items: all.slice(0, MAX_ITEMS),
  })
);
rows.push(`  feeds/all.xml — ${Math.min(all.length, MAX_ITEMS)} entrée(s)`);

console.log(`Flux générés (${slugs.length}) :`);
console.log(rows.join("\n"));
