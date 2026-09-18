// Moteur du flux « presidentielle-2027-factcheck » : vérification, affirmation
// par affirmation, des déclarations des candidats et des partis.
//
// Ce module ne réimplémente pas l'identité des affirmations : empreinte,
// similarité, garde-fou anti-fusion, appariement, dates de Paris et slugs
// viennent de claims.mjs (flux « verification »). Il n'ajoute que ce qui est
// propre au fact-checking politique : verdicts, note de vérité, attribution
// (auteur, parti), mesure de la diffusion d'une affirmation, corrections
// traçables et bulletin du jour.
//
// Principe : une fiche = une affirmation, jamais un candidat. Rien ici
// n'agrège de note par auteur, par parti ou par programme.

import { clampRating, fingerprint, normalizeText, parisStamp, slugify, THRESHOLDS } from "./claims.mjs";
import { parseFrontMatter, renderDocument } from "./frontmatter.mjs";

export const FEED = "presidentielle-2027-factcheck";
export const ID_PREFIX = "PRES27";

/* ---------- verdicts ---------- */

export const VERDICTS = [
  "CONFIRMÉ",
  "IMPRÉCIS",
  "TROMPEUR",
  "FAUX",
  "TRÈS PROBABLEMENT FAUX",
  "NON VÉRIFIABLE",
  "OPINION / PRÉDICTION",
];

// Verdicts qui ont leur place dans la section « affirmations fausses ou
// trompeuses ». IMPRÉCIS n'y entre que si l'erreur est substantielle.
export const PROBLEMATIC = ["FAUX", "TRÈS PROBABLEMENT FAUX", "TROMPEUR"];

export const CONFIDENCE_LEVELS = ["FORT", "MOYEN", "FAIBLE"];
export const SOURCE_TYPES = ["primaire", "officielle", "média", "fact-check"];

export const TOPICS = [
  "economie", "emploi", "finances-publiques", "fiscalite", "pouvoir-d-achat", "retraites",
  "immigration", "securite", "justice", "sante", "education", "logement", "energie", "climat",
  "agriculture", "europe", "international", "defense", "institutions", "societe", "numerique", "autre",
];

// Plages habituelles verdict -> note de vérité. Un écart n'est pas interdit,
// mais il est signalé : il doit être justifié dans la vérification.
export const USUAL_RANGE = {
  "FAUX": [0, 2],
  "TRÈS PROBABLEMENT FAUX": [1, 3],
  "TROMPEUR": [3, 5],
  "IMPRÉCIS": [6, 7],
  "CONFIRMÉ": [8, 10],
  "NON VÉRIFIABLE": [4, 6],
};

// Bornes Unicode : « \b » couperait « élément » après le « é » et y verrait « ment ».
const LIE_WORDS = /(?<!\p{L})(mensonges?|menteu(?:r|se)s?|ment|mentent|menti)(?!\p{L})/iu;

/* ---------- identifiants et chemins ---------- */

const ID_RE = new RegExp(`^${ID_PREFIX}-(\\d{4})(\\d{2})(\\d{2})-(\\d{3})$`);

export function isFactId(id) {
  return ID_RE.test(String(id));
}

export function nextFactId(existingIds, date = new Date()) {
  const { day } = parisStamp(date);
  let max = 0;
  for (const id of existingIds) {
    const m = ID_RE.exec(id);
    if (m && `${m[1]}${m[2]}${m[3]}` === day) max = Math.max(max, Number(m[4]));
  }
  return `${ID_PREFIX}-${day}-${String(max + 1).padStart(3, "0")}`;
}

export function factPath(id) {
  const m = ID_RE.exec(id);
  if (!m) throw new Error(`Identifiant invalide : ${id}`);
  return `${FEED}/claims/${m[1]}/${m[2]}/${id}.md`;
}

export function entryPath(date, author, title) {
  const s = parisStamp(date);
  // slugify() conserve %, € et $ : on les retire ici, un « % » dans un nom de
  // fichier casse les liens (séquence d'échappement invalide dans une URL).
  const slug = slugify(`${author} ${title}`.replace(/[%€$]/g, " "), 60);
  return `${FEED}/alerts/${s.year}/${s.month}/${s.date}-${s.time}-${slug}.md`;
}

export function bulletinPath(date) {
  const s = parisStamp(date);
  return `${FEED}/daily/${s.year}/${s.month}/${s.date}-factcheck.md`;
}

export const INDEX_PATH = `${FEED}/state/affirmations.md`;

/* ---------- encodages sur une ligne (lisibles dans Git) ---------- */

const flat = (s) => String(s ?? "").replace(/[|\n\r]+/g, " ").replace(/\s+/g, " ").trim();
const split = (line) => String(line).split("|").map((s) => s.trim());

function encodeSource(s) {
  return [s.name, s.title, s.date || "", s.url, s.type].map(flat).join(" | ");
}
function decodeSource(line) {
  const [name, title, date, url, type] = split(line);
  return { name, title, date, url, type };
}
function encodeOccurrence(o) {
  return [o.date, o.author, o.party, o.context, o.url || ""].map(flat).join(" | ");
}
function decodeOccurrence(line) {
  const [date, author, party, context, url] = split(line);
  return { date, author, party, context, url };
}
function encodeCorrection(c) {
  return [c.at, c.old_verdict, c.new_verdict, c.reason, c.path].map(flat).join(" | ");
}
function decodeCorrection(line) {
  const [at, old_verdict, new_verdict, reason, path] = split(line);
  return { at, old_verdict, new_verdict, reason, path };
}
function encodeEvent(e) {
  return [e.at, e.type, e.path].map(flat).join(" | ");
}
function decodeEvent(line) {
  const [at, type, path] = split(line);
  return { at, type, path };
}

export function occurrenceKey(o) {
  return [o.date, normalizeText(o.author), o.url || normalizeText(o.context)].join("|");
}

const sameAuthor = (a, b) => normalizeText(a) === normalizeText(b);

/* ---------- fiche d'affirmation ---------- */

export function parseFact(raw) {
  const { data } = parseFrontMatter(raw);
  const num = (v) => (v === undefined || v === "" || Array.isArray(v) ? null : Number(v));
  return {
    id: data.id,
    title: data.title || "",
    claim: data.claim || data.title || "",
    aliases: [].concat(data.aliases || []),
    fingerprint: data.fingerprint || fingerprint(data.claim || data.title || ""),
    topic: data.category || "autre",
    author: data.author || "",
    party: data.party || "",
    verdict: data.verdict || "NON VÉRIFIABLE",
    truth_score: num(data.truth_score),
    confidence_level: data.confidence_level || "MOYEN",
    lie_established: data.lie_established === "true",
    first_seen: data.first_seen,
    last_seen: data.last_seen,
    last_checked: data.last_checked,
    repeat_count: num(data.repeat_count) || 1,
    occurrences: [].concat(data.occurrences || []).map(decodeOccurrence),
    corrections: [].concat(data.corrections || []).map(decodeCorrection),
    sources: [].concat(data.sources || []).map(decodeSource),
    events: [].concat(data.events || []).map(decodeEvent),
  };
}

// Autres auteurs ou partis ayant repris l'affirmation (hors premier auteur).
export function repeatedBy(fact) {
  const seen = new Map();
  for (const o of fact.occurrences) {
    if (sameAuthor(o.author, fact.author)) continue;
    const key = normalizeText(o.author);
    if (!seen.has(key)) seen.set(key, { author: o.author, party: o.party, first: o.date });
  }
  return [...seen.values()];
}

const scoreText = (n) => (n === null || n === undefined ? "sans note" : `${n}/10`);

function sourceLine(s) {
  const link = s.url ? `[${s.title}](${s.url})` : s.title;
  return `- **${s.name}** — ${link}${s.date ? ` — ${s.date}` : ""} — type : ${s.type}`;
}

export function renderFact(fact) {
  const data = {
    id: fact.id,
    title: fact.title,
    claim: fact.claim,
    aliases: fact.aliases,
    fingerprint: fact.fingerprint,
    feed: FEED,
    category: fact.topic,
    author: fact.author,
    party: fact.party,
    verdict: fact.verdict,
    truth_score: fact.truth_score ?? "",
    confidence_level: fact.confidence_level,
    lie_established: fact.lie_established ? "true" : "false",
    first_seen: fact.first_seen,
    last_seen: fact.last_seen,
    last_checked: fact.last_checked,
    repeat_count: fact.repeat_count,
    occurrences: fact.occurrences.map(encodeOccurrence),
    corrections: fact.corrections.map(encodeCorrection),
    sources: fact.sources.map(encodeSource),
    events: fact.events.map(encodeEvent),
  };

  const lines = [];
  lines.push(`# ${fact.id} — ${fact.title}`);
  lines.push("");
  lines.push(`**Affirmation examinée :** ${fact.claim}`);
  lines.push("");
  lines.push(`**Première attribution :** ${fact.author} — ${fact.party}`);
  lines.push("");
  lines.push(`**Verdict actuel : ${fact.verdict} — note de vérité : ${scoreText(fact.truth_score)} — niveau de confiance : ${fact.confidence_level}**`);
  lines.push("");
  lines.push(`**Première occurrence :** ${fact.first_seen} · **Dernière occurrence :** ${fact.last_seen} · **Occurrences relevées :** ${fact.repeat_count}`);
  lines.push("");
  lines.push("## Diffusion");
  lines.push("");
  lines.push("Mesure la circulation de cette affirmation. Ces compteurs ne sont jamais agrégés par candidat ou par parti.");
  lines.push("");
  for (const o of fact.occurrences) {
    lines.push(`- ${o.date} — ${o.author} (${o.party}) — ${o.context}${o.url ? ` — [source](${o.url})` : ""}`);
  }
  lines.push("");
  const others = repeatedBy(fact);
  if (others.length) {
    lines.push(`**Reprise par :** ${others.map((o) => `${o.author} (${o.party}, depuis le ${o.first})`).join(" ; ")}`);
    lines.push("");
  }
  if (fact.corrections.length) {
    lines.push("## ✏️ Corrections");
    lines.push("");
    for (const c of fact.corrections) {
      lines.push(`- ${c.at} — ${c.old_verdict} → ${c.new_verdict} — ${c.reason} — [correction](../../../../${c.path})`);
    }
    lines.push("");
  }
  if (fact.events.length) {
    lines.push("## Entrées RSS publiées");
    lines.push("");
    for (const e of fact.events) lines.push(`- ${e.at} — ${e.type} — [${e.path}](../../../../${e.path})`);
    lines.push("");
  }
  lines.push("## Sources");
  lines.push("");
  for (const s of fact.sources) lines.push(sourceLine(s));
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(
    "Fiche générée par `scripts/factcheck-record.mjs`. Le front matter est la source de vérité ; le corps en est le rendu lisible."
  );
  return renderDocument(data, lines.join("\n"));
}

/* ---------- décision de publication ---------- */

// Renvoie { record, publish, event, reason }.
//  - record: false  -> rien n'est enregistré (opinion ou prédiction) ;
//  - publish: false -> la fiche est tenue à jour, le flux reste silencieux.
export function decide(previous, obs) {
  if (obs.verdict === "OPINION / PRÉDICTION") {
    return { record: false, publish: false, event: null, reason: "opinion ou prédiction : ni notée ni publiée" };
  }

  if (!previous) {
    if (obs.significance === "faible") {
      return { record: true, publish: false, event: "nouvelle", reason: "importance jugée faible" };
    }
    if (PROBLEMATIC.includes(obs.verdict)) {
      return { record: true, publish: true, event: "nouvelle", reason: "nouvelle affirmation problématique documentée" };
    }
    if (obs.verdict === "IMPRÉCIS") {
      return obs.substantial_error
        ? { record: true, publish: true, event: "nouvelle", reason: "imprécision substantielle" }
        : { record: true, publish: false, event: "nouvelle", reason: "imprécision mineure : enregistrée, non publiée" };
    }
    if (obs.verdict === "NON VÉRIFIABLE") {
      return obs.significance === "haute"
        ? { record: true, publish: true, event: "nouvelle", reason: "affirmation importante non vérifiable" }
        : { record: true, publish: false, event: "nouvelle", reason: "non vérifiable : enregistrée, non publiée" };
    }
    return { record: true, publish: false, event: "nouvelle", reason: "affirmation confirmée : enregistrée, non publiée" };
  }

  if (obs.verdict !== previous.verdict) {
    return { record: true, publish: true, event: "correction", reason: `verdict corrigé : ${previous.verdict} → ${obs.verdict}` };
  }
  const before = previous.truth_score;
  const after = obs.truth_score;
  if (before !== null && after !== null && Math.abs(after - before) >= THRESHOLDS.significantDelta) {
    return { record: true, publish: true, event: "correction", reason: `note de vérité corrigée : ${before}/10 → ${after}/10` };
  }
  return { record: true, publish: false, event: "reprise", reason: "affirmation déjà vérifiée : occurrence enregistrée, pas de republication" };
}

/* ---------- titres ---------- */

const short = (text, max) => {
  const t = flat(text);
  return t.length <= max ? t : `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
};

export function verdictTag(verdict, score) {
  return score === null || score === undefined ? `[${verdict}]` : `[${verdict} · ${score}/10]`;
}

export function entryTitle(event, { fact, obs, previousVerdict }) {
  const label = obs.quote && flat(obs.quote).length <= 90 ? `« ${flat(obs.quote)} »` : short(fact.title, 110);
  if (event === "correction") {
    const change = previousVerdict === fact.verdict ? `note ${scoreText(fact.truth_score)}` : `${previousVerdict} → ${fact.verdict}`;
    return `[CORRECTION · ${change}] ${fact.author} — ${short(fact.title, 110)}`;
  }
  return `${verdictTag(fact.verdict, fact.truth_score)} ${obs.author} — ${label}`;
}

/* ---------- entrée RSS ---------- */

export function renderEntry({ fact, event, obs, at, previous }) {
  const title = entryTitle(event, { fact, obs, previousVerdict: previous ? previous.verdict : null });
  const data = {
    title,
    date: at,
    type: event === "correction" ? "correction" : "factcheck",
    feed: FEED,
    // Sujet, verdict et parti deviennent des catégories RSS : c'est le
    // mécanisme existant de build-feeds.mjs, inchangé.
    category: [fact.topic, fact.verdict, obs.party],
    claim_id: fact.id,
    event,
    author: obs.author,
    party: obs.party,
    statement_date: obs.statement_date,
    verdict: fact.verdict,
    truth_score: fact.truth_score ?? "",
    confidence_level: fact.confidence_level,
    lie_established: fact.lie_established ? "true" : "false",
    statement_url: obs.statement_url || "",
    summary: obs.summary,
  };

  const lines = [];
  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`**${obs.author} — ${obs.party}**`);
  lines.push("");
  lines.push(`**Date :** ${obs.statement_date}`);
  lines.push("");
  if (obs.quote) {
    lines.push("**Déclaration :**");
    lines.push("");
    lines.push(`> « ${flat(obs.quote)} »`);
    lines.push("");
    lines.push(`**Affirmation examinée :** ${fact.claim}`);
  } else {
    lines.push(`**Affirmation** (paraphrase fidèle, la source primaire n'ayant pas pu être consultée) **:** ${fact.claim}`);
  }
  lines.push("");
  lines.push(`**Contexte :** ${obs.context}${obs.statement_url ? ` — [déclaration originale](${obs.statement_url})` : ""}`);
  lines.push("");
  lines.push(`**Verdict : ${fact.verdict}**`);
  lines.push("");
  lines.push(`**Note de vérité : ${scoreText(fact.truth_score)}**`);
  lines.push("");

  if (event === "correction") {
    lines.push("## ✏️ Correction");
    lines.push("");
    lines.push(`- **Ancien verdict :** ${previous.verdict} (${scoreText(previous.truth_score)})`);
    lines.push(`- **Nouveau verdict :** ${fact.verdict} (${scoreText(fact.truth_score)})`);
    lines.push(`- **Nouvelles preuves :** ${obs.new_evidence}`);
    lines.push(`- **Raison du changement :** ${obs.correction_reason}`);
    lines.push(`- **Date de correction :** ${at.slice(0, 10)}`);
    lines.push("");
    const first = fact.events.find((e) => e.type === "nouvelle");
    if (first) {
      lines.push(`L'entrée d'origine reste en ligne, inchangée : [${first.path}](../../../../${first.path}).`);
      lines.push("");
    }
  }

  lines.push("## Vérification");
  lines.push("");
  if (obs.exact) lines.push(`- **Ce qui est exact :** ${obs.exact}`);
  if (obs.incorrect) lines.push(`- **Ce qui est incorrect :** ${obs.incorrect}`);
  if (obs.missing) lines.push(`- **Ce qui manque dans la présentation :** ${obs.missing}`);
  lines.push(`- **Chiffres ou faits permettant de trancher :** ${obs.decisive}`);
  lines.push("");

  if (fact.lie_established) {
    lines.push("## Connaissance préalable");
    lines.push("");
    lines.push(obs.prior_knowledge);
    lines.push("");
    for (const s of obs.prior_knowledge_sources) lines.push(sourceLine(s));
    lines.push("");
  }

  lines.push("## Sources");
  lines.push("");
  for (const s of obs.sources) lines.push(sourceLine(s));
  lines.push("");
  lines.push("## Niveau de confiance");
  lines.push("");
  lines.push(`**${fact.confidence_level}**${obs.confidence_note ? ` — ${obs.confidence_note}` : ""}`);
  lines.push("");
  lines.push(
    `Fiche de suivi : [\`${fact.id}\`](../../../claims/${fact.id.slice(7, 11)}/${fact.id.slice(11, 13)}/${fact.id}.md). ` +
      "Ce verdict porte sur cette affirmation et sur elle seule : il ne note ni son auteur, ni son parti, ni son programme."
  );
  return renderDocument(data, lines.join("\n"));
}

/* ---------- bulletin du jour ---------- */

export const BULLETIN_SECTION = "Mensonges / affirmations fausses ou trompeuses dans les nouvelles déclarations";

// Reconstruit le bulletin d'une journée à partir des fiches : idempotent.
// N'y figurent que FAUX, TRÈS PROBABLEMENT FAUX, TROMPEUR et les IMPRÉCIS
// publiés (donc substantiels). Ni total, ni classement par auteur ou parti.
export function renderBulletin(facts, date, at) {
  const { date: day } = parisStamp(date);
  const passes = new Map();
  for (const f of facts) {
    if (![...PROBLEMATIC, "IMPRÉCIS"].includes(f.verdict)) continue;
    for (const e of f.events) {
      if (e.type !== "nouvelle" || !String(e.at).startsWith(day)) continue;
      const time = String(e.at).slice(11, 16).replace(":", " h ");
      if (!passes.has(time)) passes.set(time, []);
      passes.get(time).push({ fact: f, path: e.path });
    }
  }
  if (passes.size === 0) return null;

  const order = (v) => ["FAUX", "TRÈS PROBABLEMENT FAUX", "TROMPEUR", "IMPRÉCIS"].indexOf(v);
  const lines = [];
  lines.push(`# Fact-check présidentielle 2027 — ${day}`);
  lines.push("");
  lines.push(
    "Chaque ligne renvoie à la vérification d'une affirmation précise. Aucune note n'est attribuée à un candidat, à un parti ou à un programme, et une affirmation fausse ne prouve pas que son auteur ment : le terme n'est employé que lorsque la connaissance préalable est établie et sourcée."
  );
  lines.push("");
  let count = 0;
  for (const time of [...passes.keys()].sort()) {
    lines.push(`## ${BULLETIN_SECTION} — passage de ${time}`);
    lines.push("");
    const items = passes.get(time).sort((a, b) => order(a.fact.verdict) - order(b.fact.verdict) || (a.fact.truth_score ?? 5) - (b.fact.truth_score ?? 5));
    for (const { fact: f, path } of items) {
      const lie = f.lie_established ? " — mensonge établi (connaissance préalable sourcée)" : "";
      lines.push(`- ${verdictTag(f.verdict, f.truth_score)} ${f.author} (${f.party}) — ${f.title}${lie} — [vérification](../../../../${path})`);
      count += 1;
    }
    lines.push("");
  }
  const data = {
    title: `Fact-check présidentielle 2027 — ${day}`,
    date: at,
    type: "daily",
    feed: FEED,
    category: "briefing",
    summary: `${count} affirmation(s) fausse(s), trompeuse(s) ou substantiellement imprécise(s) relevée(s) dans les nouvelles déclarations du ${day}.`,
  };
  return renderDocument(data, lines.join("\n"));
}

/* ---------- index anti-doublon ---------- */

const INDEX_HEADER = `# Affirmations déjà vérifiées

Mémoire anti-doublon du flux \`${FEED}\`, régénérée par
\`scripts/factcheck-record.mjs\`. Chaque passage la lit avant de chercher.
Format : \`- ID | verdict | note | premier auteur (parti) | occurrences | dernière occurrence | affirmation\`

Une affirmation déjà listée n'est jamais republiée : une reprise, par le même
auteur ou par un autre, s'enregistre en réutilisant son \`id\`. Les fiches
complètes vivent dans \`${FEED}/claims/\` et ne sont jamais supprimées. Cet
index n'est pas élagué et n'est jamais agrégé par candidat ou par parti.
`;

export function renderIndex(facts) {
  const lines = [INDEX_HEADER];
  const sorted = [...facts].sort((a, b) => String(b.last_seen).localeCompare(String(a.last_seen)) || b.id.localeCompare(a.id));
  for (const f of sorted) {
    lines.push(
      `- ${f.id} | ${f.verdict} | ${scoreText(f.truth_score)} | ${flat(f.author)} (${flat(f.party)}) | ${f.repeat_count} | ${f.last_seen} | ${flat(f.claim)}`
    );
  }
  return lines.join("\n").replace(/\s*$/, "") + "\n";
}

/* ---------- validation d'une observation ---------- */

function checkSource(s, where) {
  if (!s || typeof s !== "object") throw new Error(`${where} : source attendue sous forme d'objet { name, title, date, url, type }`);
  for (const key of ["name", "title", "url", "type"]) {
    if (!s[key] || !String(s[key]).trim()) throw new Error(`${where} : source sans « ${key} »`);
  }
  if (!/^https?:\/\/\S+$/.test(String(s.url))) throw new Error(`${where} : URL de source invalide « ${s.url} »`);
  if (s.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(s.date))) throw new Error(`${where} : date de source attendue au format AAAA-MM-JJ`);
  if (!SOURCE_TYPES.includes(s.type)) throw new Error(`${where} : type de source « ${s.type} » inconnu (${SOURCE_TYPES.join(", ")})`);
  return { name: s.name, title: s.title, date: s.date || "", url: s.url, type: s.type };
}

// Renvoie { obs, warnings }. Lève une erreur sur tout manquement bloquant.
export function validateObservation(input, i = 0) {
  const where = `observation #${i + 1}`;
  const warnings = [];
  if (!input || typeof input !== "object") throw new Error(`${where} : objet attendu`);
  const obs = { ...input };

  for (const key of ["author", "party", "context"]) {
    if (!obs[key] || !String(obs[key]).trim()) throw new Error(`${where} : champ « ${key} » manquant`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(obs.statement_date || ""))) {
    throw new Error(`${where} : « statement_date » attendu au format AAAA-MM-JJ`);
  }
  if (!obs.claim || String(obs.claim).trim().length < 15) throw new Error(`${where} : champ « claim » manquant ou trop court`);
  if (!VERDICTS.includes(obs.verdict)) throw new Error(`${where} : verdict « ${obs.verdict} » inconnu (${VERDICTS.join(", ")})`);
  if (obs.id && !isFactId(obs.id)) throw new Error(`${where} : identifiant « ${obs.id} » malformé`);
  if (obs.statement_url && !/^https?:\/\/\S+$/.test(String(obs.statement_url))) throw new Error(`${where} : « statement_url » invalide`);
  // Une citation entre guillemets suppose que la source primaire a été lue.
  if (obs.quote && !obs.statement_url) {
    throw new Error(`${where} : « quote » exige « statement_url » (pas de citation exacte sans source primaire ; utiliser la paraphrase « claim »)`);
  }
  obs.topic = obs.topic || "autre";
  if (!TOPICS.includes(obs.topic)) throw new Error(`${where} : sujet « ${obs.topic} » inconnu (${TOPICS.join(", ")})`);

  // Une opinion ou une prédiction n'est ni notée ni sourcée : rien d'autre à contrôler.
  if (obs.verdict === "OPINION / PRÉDICTION") return { obs: { ...obs, truth_score: null, sources: [] }, warnings };

  if (!obs.summary || String(obs.summary).trim().length < 10) throw new Error(`${where} : champ « summary » manquant ou trop court`);
  if (!obs.decisive || String(obs.decisive).trim().length < 10) {
    throw new Error(`${where} : champ « decisive » manquant (chiffres ou faits permettant de trancher)`);
  }
  obs.title = obs.title || obs.summary;

  if (obs.truth_score === undefined || obs.truth_score === null || obs.truth_score === "") {
    if (obs.verdict !== "NON VÉRIFIABLE") throw new Error(`${where} : « truth_score » manquant`);
    obs.truth_score = null;
  } else {
    const n = Number(obs.truth_score);
    if (!Number.isInteger(n) || n < 0 || n > 10) throw new Error(`${where} : « truth_score » doit être un entier de 0 à 10`);
    obs.truth_score = clampRating(n);
    const range = USUAL_RANGE[obs.verdict];
    if (range && (n < range[0] || n > range[1])) {
      warnings.push(`${where} : note ${n}/10 inhabituelle pour ${obs.verdict} (${range[0]}–${range[1]}) — à justifier dans la vérification`);
    }
  }

  if (!CONFIDENCE_LEVELS.includes(obs.confidence_level)) {
    throw new Error(`${where} : « confidence_level » attendu parmi ${CONFIDENCE_LEVELS.join(", ")}`);
  }
  if (obs.confidence_level !== "FORT" && !(obs.confidence_note && String(obs.confidence_note).trim().length >= 10)) {
    throw new Error(`${where} : un niveau de confiance ${obs.confidence_level} exige une justification (« confidence_note »)`);
  }

  obs.sources = [].concat(obs.sources || []).map((s) => checkSource(s, where));
  const urls = new Set(obs.sources.map((s) => s.url));
  const needed = PROBLEMATIC.includes(obs.verdict) ? 2 : 1;
  if (urls.size < needed) {
    throw new Error(`${where} : ${needed} source(s) distincte(s) exigée(s) pour un verdict ${obs.verdict} (croisement obligatoire)`);
  }
  if (obs.sources.every((s) => s.type === "fact-check")) {
    warnings.push(`${where} : uniquement des fact-checks en source — chercher la source primaire ou les données officielles`);
  }

  obs.lie_established = obs.lie_established === true;
  if (obs.lie_established) {
    if (!PROBLEMATIC.includes(obs.verdict)) throw new Error(`${where} : « lie_established » n'a de sens que pour un verdict ${PROBLEMATIC.join(" / ")}`);
    if (!obs.prior_knowledge || String(obs.prior_knowledge).trim().length < 30) {
      throw new Error(`${where} : « lie_established » exige « prior_knowledge » (éléments établissant que l'auteur connaissait la réalité)`);
    }
    obs.prior_knowledge_sources = [].concat(obs.prior_knowledge_sources || []).map((s) => checkSource(s, where));
    if (obs.prior_knowledge_sources.length === 0) throw new Error(`${where} : « lie_established » exige au moins une source dans « prior_knowledge_sources »`);
  } else {
    // Une affirmation fausse ne prouve pas que son auteur ment.
    for (const key of ["title", "summary", "exact", "incorrect", "missing", "decisive", "confidence_note"]) {
      if (obs[key] && LIE_WORDS.test(String(obs[key]))) {
        throw new Error(`${where} : vocabulaire du mensonge dans « ${key} » sans « lie_established » — écrire faux, trompeur, imprécis ou non vérifiable`);
      }
    }
  }

  if (obs.significance && !["haute", "moyenne", "faible"].includes(obs.significance)) {
    throw new Error(`${where} : « significance » attendu parmi haute, moyenne, faible`);
  }
  return { obs, warnings };
}

// Une correction n'est jamais silencieuse : elle doit dire pourquoi.
export function validateCorrection(obs, i = 0) {
  const where = `observation #${i + 1}`;
  for (const key of ["correction_reason", "new_evidence"]) {
    if (!obs[key] || String(obs[key]).trim().length < 15) {
      throw new Error(`${where} : le verdict ou la note d'une affirmation déjà publiée change — « ${key} » est obligatoire`);
    }
  }
}
