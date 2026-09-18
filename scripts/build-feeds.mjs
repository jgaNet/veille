#!/usr/bin/env node
// Génère les flux RSS à partir des fichiers Markdown du dépôt.
//
// Un flux = un dossier à la racine contenant alerts/ et/ou daily/ (ex. monde/).
// Sortie : feeds/<flux>.xml pour chaque flux, plus feeds/all.xml agrégé.
// Aucune dépendance externe : Node >= 18 suffit.

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parseFrontMatter, walk } from "./lib/front-matter.mjs";

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

const ALL_TITLE = "Veille — tous les flux";
const ALL_DESC =
  "Toutes les alertes et récapitulatifs de la veille, tous flux confondus. Chaque entrée porte un indice de confiance et ses sources croisées.";

const DEFAULT_META = {
  monde: {
    title: "Veille mondiale — alertes vérifiées",
    description:
      "Veille horaire sur l'actualité mondiale : faits établis, déclarations et incertitudes clairement distingués, avec indice de confiance et sources croisées.",
  },
};

/* ---------- utilitaires ---------- */

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
    if (data.type === "daily" || data.type === "recap" || rel.includes("/daily/")) {
      cats.push("briefing");
    }
    // Champs optionnels des flux de vérification (ex. presidentielle-2027-factcheck) :
    // le verdict et le parti deviennent des catégories, l'auteur un <dc:creator>.
    for (const extra of [data.verdict, data.party]) {
      if (typeof extra === "string" && extra) cats.push(extra);
    }
    const author = typeof data.author === "string" ? data.author : "";
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
      title,
      date,
      cats: [...new Set(cats)],
      author,
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
    if (it.author) xml.push(`      <dc:creator>${esc(it.author)}</dc:creator>`);
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
  all.push(...items);
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
