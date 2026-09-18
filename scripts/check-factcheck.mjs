#!/usr/bin/env node
// Contrôle les entrées des flux de fact-checking (type: factcheck / correction)
// et la cohérence de leur registre state/affirmations.json.
//
// Usage : node scripts/check-factcheck.mjs   (depuis la racine du dépôt)
// Code de sortie 1 si une erreur est trouvée ; les avertissements n'échouent pas.
// Aucune dépendance externe : Node >= 18 suffit.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parseFrontMatter, walk } from "./lib/front-matter.mjs";

const ROOT = process.cwd();
const NOT_FEEDS = new Set([".git", ".github", "scripts", "feeds", "node_modules"]);

const PUBLISHABLE = ["FAUX", "TRÈS PROBABLEMENT FAUX", "TROMPEUR", "IMPRÉCIS", "NON VÉRIFIABLE"];
const ALL_VERDICTS = [...PUBLISHABLE, "CONFIRMÉ"];
const LEVELS = ["FORT", "MOYEN", "FAIBLE"];
// Plages indicatives verdict -> note (CONSIGNES § 6). Un écart est un avertissement.
const USUAL_RANGE = {
  "FAUX": [0, 2],
  "TRÈS PROBABLEMENT FAUX": [1, 3],
  "TROMPEUR": [3, 5],
  "IMPRÉCIS": [6, 7],
  "CONFIRMÉ": [8, 10],
  "NON VÉRIFIABLE": [4, 6],
};
const REQUIRED = [
  "title", "date", "type", "feed", "category", "id", "author", "party",
  "statement_date", "claim", "context", "verdict", "confidence_level", "summary",
];

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file} — ${msg}`);
const warn = (file, msg) => warnings.push(`${file} — ${msg}`);

const str = (v) => (typeof v === "string" ? v : "");
const section = (body, heading) => {
  const re = new RegExp(`^##\\s+${heading}\\s*$([\\s\\S]*?)(?=^##\\s|(?![\\s\\S]))`, "m");
  const m = body.match(re);
  return m ? m[1] : null;
};
const links = (text) => (text || "").match(/https?:\/\/[^\s)>\]]+/g) || [];

function checkScore(file, verdict, raw) {
  if (raw === "") {
    if (verdict !== "NON VÉRIFIABLE") err(file, "truth_score manquant");
    return null;
  }
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0 || n > 10) {
    err(file, `truth_score invalide : « ${raw} » (entier de 0 à 10 attendu)`);
    return null;
  }
  const range = USUAL_RANGE[verdict];
  if (range && (n < range[0] || n > range[1])) {
    warn(file, `note ${n}/10 inhabituelle pour ${verdict} (${range[0]}–${range[1]}) : à justifier dans « Vérification »`);
  }
  return n;
}

function checkEntry(file, data, body, feed) {
  for (const key of REQUIRED) if (!str(data[key])) err(file, `champ « ${key} » manquant`);
  if (str(data.feed) && data.feed !== feed) err(file, `feed « ${data.feed} » ≠ dossier « ${feed} »`);
  if (str(data.statement_date) && !/^\d{4}-\d{2}-\d{2}$/.test(data.statement_date)) {
    err(file, "statement_date doit être au format AAAA-MM-JJ");
  }
  if (str(data.date) && Number.isNaN(new Date(data.date).getTime())) err(file, "date illisible");

  const verdict = str(data.verdict);
  if (verdict && !PUBLISHABLE.includes(verdict)) {
    err(file, `verdict « ${verdict} » non publiable dans le flux (attendu : ${PUBLISHABLE.join(", ")})`);
  }
  const score = checkScore(file, verdict, str(data.truth_score));
  if (str(data.confidence_level) && !LEVELS.includes(data.confidence_level)) {
    err(file, `confidence_level « ${data.confidence_level} » invalide (${LEVELS.join(" / ")})`);
  }
  if (data.confidence) err(file, "champ « confidence » interdit ici : utiliser truth_score et confidence_level");

  const expected = score === null ? `[${verdict}]` : `[${verdict} · ${score}/10]`;
  if (verdict && !str(data.title).startsWith(expected)) err(file, `le titre doit commencer par « ${expected} »`);
  if (str(data.id) && !/^[a-z0-9]+(?:-[a-z0-9]+)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*){2}$/.test(data.id)) {
    err(file, "id attendu : sujet--affirmation-normalisee--premier-auteur (minuscules, sans accents)");
  }
  if (str(data.source_url) && !/^https?:\/\//.test(data.source_url)) err(file, "source_url doit être une URL http(s)");

  if (section(body, "Vérification") === null) err(file, "section « ## Vérification » manquante");
  const sources = section(body, "Sources");
  if (sources === null) err(file, "section « ## Sources » manquante");
  else {
    const n = new Set(links(sources)).size;
    if (n === 0) err(file, "aucune URL dans « ## Sources »");
    else if (n < 2 && ["FAUX", "TRÈS PROBABLEMENT FAUX", "TROMPEUR"].includes(verdict)) {
      warn(file, "une seule source pour un verdict problématique : croisement conseillé (CONSIGNES § 8)");
    }
    if (!/type\s*:\s*(primaire|officielle|média|fact-check)/i.test(sources)) {
      err(file, "chaque source doit indiquer son type (primaire / officielle / média / fact-check)");
    }
  }
  const level = section(body, "Niveau de confiance");
  if (level === null) err(file, "section « ## Niveau de confiance » manquante");
  else if (data.confidence_level !== "FORT" && level.replace(/\*\*[^*]*\*\*/g, "").trim().length < 20) {
    err(file, "niveau de confiance MOYEN ou FAIBLE sans justification");
  }

  const lie = str(data.mensonge_etabli) === "true";
  if (lie) {
    const prior = section(body, "Connaissance préalable");
    if (prior === null || links(prior).length === 0) {
      err(file, "mensonge_etabli: true exige une section « ## Connaissance préalable » sourcée (CONSIGNES § 7)");
    }
  } else if (/\b(mensonges?|menteu(?:r|se)s?|ment(?:ent|i)?)\b/i.test(body.replace(/^>.*$/gm, ""))) {
    warn(file, "vocabulaire du mensonge employé sans mensonge_etabli: true (hors citations) — CONSIGNES § 7");
  }
}

function checkCorrection(file, data, body, ids) {
  for (const key of ["title", "date", "feed", "corrects", "summary"]) {
    if (!str(data[key])) err(file, `champ « ${key} » manquant`);
  }
  if (str(data.corrects) && !ids.has(data.corrects)) err(file, `corrects « ${data.corrects} » absent du registre`);
  for (const word of ["Ancien verdict", "Nouveau verdict", "Nouvelles preuves", "Raison du changement"]) {
    if (!body.toLowerCase().includes(word.toLowerCase())) err(file, `mention « ${word} » manquante`);
  }
}

/* ---------- parcours des flux ---------- */

let checked = 0;
const feeds = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !NOT_FEEDS.has(e.name))
  .map((e) => e.name);

for (const feed of feeds) {
  const registryPath = join(ROOT, feed, "state", "affirmations.json");
  const entries = walk(join(ROOT, feed, "alerts"))
    .map((abs) => ({ abs, rel: relative(ROOT, abs).split(/[\\/]/).join("/"), ...parseFrontMatter(readFileSync(abs, "utf8")) }))
    .filter((e) => e.data.type === "factcheck" || e.data.type === "correction");
  if (!existsSync(registryPath)) {
    if (entries.length) err(feed, "entrées de fact-check sans registre state/affirmations.json");
    continue;
  }

  let registry = [];
  const regRel = relative(ROOT, registryPath);
  try {
    registry = JSON.parse(readFileSync(registryPath, "utf8")).affirmations;
    if (!Array.isArray(registry)) throw new Error("clé « affirmations » absente ou non tabulaire");
  } catch (e) {
    err(regRel, `registre illisible : ${e.message}`);
    registry = [];
  }

  const ids = new Set();
  const keys = new Set();
  for (const a of registry) {
    const label = `${regRel} [${a.id ?? "?"}]`;
    for (const key of ["id", "claim_key", "author", "party", "topic", "claim_normalized", "verdict", "first_seen", "last_seen"]) {
      if (!str(a[key])) err(label, `champ « ${key} » manquant`);
    }
    if (ids.has(a.id)) err(label, "id en double");
    if (keys.has(a.claim_key)) err(label, "claim_key en double : une même affirmation ne crée qu'un seul fait");
    ids.add(a.id);
    keys.add(a.claim_key);
    if (str(a.id) && str(a.claim_key) && !a.id.startsWith(`${a.claim_key}--`)) err(label, "id doit commencer par claim_key");
    if (str(a.verdict) && !ALL_VERDICTS.includes(a.verdict)) err(label, `verdict « ${a.verdict} » inconnu`);
    if (!Number.isInteger(a.repeat_count) || a.repeat_count < 1) err(label, "repeat_count doit être un entier ≥ 1");
    if (!Array.isArray(a.repeated_by) || !Array.isArray(a.corrections)) err(label, "repeated_by et corrections doivent être des listes");
    if (a.file && !existsSync(join(ROOT, a.file))) err(label, `fichier introuvable : ${a.file}`);
  }

  const seen = new Set();
  for (const e of entries) {
    checked += 1;
    if (e.data.type === "correction") {
      checkCorrection(e.rel, e.data, e.body, ids);
      continue;
    }
    checkEntry(e.rel, e.data, e.body, feed);
    const id = str(e.data.id);
    if (!id) continue;
    if (seen.has(id)) err(e.rel, `id « ${id} » déjà utilisé par une autre entrée`);
    seen.add(id);
    const reg = registry.find((a) => a.id === id);
    if (!reg) err(e.rel, `id « ${id} » absent du registre`);
    else {
      if (reg.file !== e.rel) err(e.rel, `le registre pointe vers « ${reg.file} »`);
      if (reg.verdict !== e.data.verdict && !(reg.corrections || []).length) {
        err(e.rel, `verdict « ${e.data.verdict} » ≠ registre « ${reg.verdict} » sans correction enregistrée`);
      }
    }
  }
}

for (const w of warnings) console.warn(`⚠️  ${w}`);
for (const e of errors) console.error(`❌ ${e}`);
console.log(`Fact-check : ${checked} entrée(s) contrôlée(s), ${errors.length} erreur(s), ${warnings.length} avertissement(s).`);
process.exit(errors.length ? 1 : 0);
