// Moteur de la veille « vérification » : identité des affirmations,
// déduplication, évolution des notes et règles de publication RSS.
//
// Aucune dépendance externe (Node >= 18). Le stockage reste du Markdown à
// front matter, comme le reste du dépôt : une fiche par affirmation dans
// verification/claims/, un fichier d'alerte par événement publiable dans
// verification/alerts/ (c'est ce dossier, et lui seul, que build-feeds.mjs
// transforme en items RSS).

import { createHash } from "node:crypto";
import { parseFrontMatter, renderDocument } from "./frontmatter.mjs";

export const FEED = "verification";
export const CATEGORY = "verification";

/* ---------- échelle de plausibilité ---------- */

// Note /10 : plausibilité de l'affirmation (10 = établi, 1 = très
// probablement faux). À ne pas confondre avec l'indice de confiance du
// dépôt, qui mesure la solidité des preuves : les deux coexistent.
const LEVELS = [
  { min: 9, max: 10, dot: "🟢", label: "CONFIRMÉ" },
  { min: 7, max: 8, dot: "🟢", label: "PLAUSIBLE" },
  { min: 5, max: 6, dot: "🟠", label: "INCERTAIN" },
  { min: 3, max: 4, dot: "🟠", label: "DOUTEUX" },
  { min: 1, max: 2, dot: "🔴", label: "TRÈS IMPROBABLE" },
  { min: 0, max: 0, dot: "🔴", label: "RÉFUTÉ" },
];

export const STATUSES = [
  "CONFIRMÉ",
  "PROBABLE",
  "INCERTAIN",
  "TRÈS PROBABLEMENT FAUX",
  "FAUX / RÉFUTÉ",
  "HORS CONTEXTE",
  "TROMPEUR",
];

export function ratingLevel(rating) {
  const n = clampRating(rating);
  return LEVELS.find((l) => n >= l.min && n <= l.max);
}

export function clampRating(rating) {
  const n = Math.round(Number(rating));
  if (!Number.isFinite(n)) throw new Error(`Note invalide : ${rating}`);
  return Math.min(10, Math.max(0, n));
}

/* ---------- seuils de publication ---------- */

export const THRESHOLDS = {
  // Au-delà, une affirmation nouvelle est suivie mais pas publiée : le flux
  // porte sur les affirmations douteuses, pas sur l'actualité confirmée.
  newClaimMaxRating: 6,
  // Écart de note considéré comme significatif.
  significantDelta: 2,
  // Retournement : bascule franche d'un bord à l'autre de l'échelle.
  // Volontairement plus exigeant qu'une simple mise à jour : 3→7 reste une
  // mise à jour, 8→1 est un retournement.
  reversalDelta: 5,
  reversalHigh: 7,
  reversalLow: 3,
  // Similarité minimale entre deux formulations pour parler de la même
  // affirmation. Le seuil est volontairement modéré, parce qu'il est doublé
  // d'un garde-fou : deux énoncés contradictoires ne sont jamais fusionnés,
  // même très similaires (voir conflicting()).
  similarity: 0.68,
};

/* ---------- normalisation et empreinte ---------- */

const STOPWORDS = new Set(
  ("a ai au aux avec ce ces dans de des du elle en est et eux il ils je la le les leur lui ma mais me meme mes moi mon " +
    "ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous y " +
    "d l n s c j m t qu est ete etre avoir plus tres selon apres avant entre dont sans sous chez lors aussi alors " +
    "the of to in on and or for that this it is are was were be been").split(/\s+/)
);

export function normalizeText(text) {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9%€$]+/g, " ")
    .trim();
}

export function tokenize(text) {
  const tokens = normalizeText(text)
    .split(" ")
    .filter((t) => t && t.length > 1 && !STOPWORDS.has(t));
  return [...new Set(tokens)].sort();
}

// Empreinte stable d'une affirmation : jeu de mots significatifs, trié.
// Deux formulations identiques à l'ordre des mots près donnent la même
// empreinte, donc le même CLAIM_ID.
export function fingerprint(text) {
  return createHash("sha1").update(tokenize(text).join(" ")).digest("hex").slice(0, 16);
}

// Coefficient de Dice sur les jeux de mots : tolère les reformulations.
export function similarity(a, b) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter += 1;
  return (2 * inter) / (A.size + B.size);
}

/* ---------- garde-fou anti-fusion ---------- */

// Un sac de mots ne distingue pas « gelé » de « augmenté » : deux
// affirmations opposées peuvent être plus similaires que deux formulations
// d'une même affirmation. Avant de fusionner deux énoncés sur leur seule
// similarité, on vérifie qu'ils ne se contredisent pas.
const ANTONYMS = [
  [["gel", "gele", "geler"], ["augment", "hausse", "revaloris", "releve", "relev"]],
  [["releve", "relev", "hausse", "augment", "monte"], ["abaisse", "baisse", "diminu", "reduit", "reduction", "recul"]],
  [["interdit", "interdiction", "interdire"], ["autorise", "autorisation", "autoriser", "legalise"]],
  [["ouvre", "ouvert", "rouvert", "reouverture"], ["ferme", "fermeture", "cloture"]],
  [["confirme", "confirmation", "atteste"], ["dement", "dementi", "refute", "infirme"]],
  [["authentique", "veridique"], ["faux", "falsifie", "truque", "trucage", "montage"]],
  [["demission", "demissionne", "demissionner"], ["maintien", "maintenu", "reconduit", "reconduction"]],
  [["adopte", "adoption", "vote", "promulgue"], ["rejete", "rejet", "abandonne", "retire"]],
];

function numbers(text) {
  return new Set(normalizeText(text).split(" ").filter((t) => /^\d+$/.test(t)));
}

function hasStem(tokens, stems) {
  return tokens.some((t) => stems.some((s) => t.startsWith(s)));
}

export function conflicting(a, b) {
  // Désaccord chiffré : chacun porte un nombre que l'autre ignore.
  const na = numbers(a);
  const nb = numbers(b);
  if (na.size && nb.size) {
    const aOnly = [...na].some((n) => !nb.has(n));
    const bOnly = [...nb].some((n) => !na.has(n));
    if (aOnly && bOnly) return true;
  }
  // Polarité opposée.
  const ta = normalizeText(a).split(" ");
  const tb = normalizeText(b).split(" ");
  for (const [left, right] of ANTONYMS) {
    const aL = hasStem(ta, left);
    const aR = hasStem(ta, right);
    const bL = hasStem(tb, left);
    const bR = hasStem(tb, right);
    if ((aL && bR && !aR && !bL) || (aR && bL && !aL && !bR)) return true;
  }
  return false;
}

/* ---------- dates (heure de Paris) ---------- */

export function parisParts(input = new Date()) {
  // Le décalage est calculé à la minute près : on tronque les secondes,
  // faute de quoi la soustraction ci-dessous produit des décalages du type
  // « +01:59 ».
  const date = new Date(Math.floor(input.getTime() / 60000) * 60000);
  const fmt = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  const offsetMin = Math.round((asUTC - date.getTime()) / 60000);
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const offset = `${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
  return { ...p, hour: p.hour === "24" ? "00" : p.hour, offset };
}

export function parisISO(date = new Date()) {
  const p = parisParts(date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00${p.offset}`;
}

export function parisStamp(date = new Date()) {
  const p = parisParts(date);
  return { day: `${p.year}${p.month}${p.day}`, date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}-${p.minute}`, year: p.year, month: p.month };
}

/* ---------- identifiants ---------- */

export function nextClaimId(existingIds, date = new Date()) {
  const { day } = parisStamp(date);
  let max = 0;
  for (const id of existingIds) {
    const m = /^CLAIM-(\d{8})-(\d{3})$/.exec(id);
    if (m && m[1] === day) max = Math.max(max, Number(m[2]));
  }
  return `CLAIM-${day}-${String(max + 1).padStart(3, "0")}`;
}

export function isClaimId(id) {
  return /^CLAIM-\d{8}-\d{3}$/.test(String(id));
}

/* ---------- slug ---------- */

export function slugify(text, max = 60) {
  const base = normalizeText(text).split(" ").filter(Boolean).join("-");
  if (base.length <= max) return base || "affirmation";
  return base.slice(0, max).replace(/-[^-]*$/, "") || "affirmation";
}

/* ---------- fiche d'affirmation ---------- */

// Un enregistrement d'historique tient sur une ligne, pour rester lisible
// dans Git : « horodatage | note | statut | événement | commentaire ».
function encodeRating(r) {
  return [r.at, r.rating, r.status, r.event || "verification", (r.note || "").replace(/[|\n]/g, " ")].join(" | ");
}

function decodeRating(line) {
  const [at, rating, status, event, ...rest] = String(line).split("|").map((s) => s.trim());
  return { at, rating: Number(rating), status, event, note: rest.join(" | ") };
}

function encodeSource(s) {
  if (typeof s === "string") return s.replace(/\n/g, " ");
  return `${s.title || s.name || "source"} | ${s.url || ""}`.trim();
}

function encodeEvent(e) {
  return [e.at, e.type, e.path].join(" | ");
}

function decodeEvent(line) {
  const [at, type, path] = String(line).split("|").map((s) => s.trim());
  return { at, type, path };
}

export function parseClaim(raw) {
  const { data } = parseFrontMatter(raw);
  return {
    id: data.id,
    title: data.title || "",
    claim: data.claim || data.title || "",
    aliases: [].concat(data.aliases || []),
    fingerprint: data.fingerprint || fingerprint(data.claim || data.title || ""),
    status: data.status || "INCERTAIN",
    rating: data.rating === undefined ? null : clampRating(data.rating),
    previous_rating: data.previous_rating === "" || data.previous_rating === undefined ? null : Number(data.previous_rating),
    evidence_confidence: data.evidence_confidence === undefined ? null : Number(data.evidence_confidence),
    follow_up: data.follow_up || "en-cours",
    category: data.category || CATEGORY,
    first_seen: data.first_seen,
    last_checked: data.last_checked,
    last_published: data.last_published || "",
    ratings: [].concat(data.ratings || []).map(decodeRating),
    sources: [].concat(data.sources || []),
    evidence: [].concat(data.evidence || []),
    events: [].concat(data.events || []).map(decodeEvent),
  };
}

export function renderClaim(claim) {
  const level = ratingLevel(claim.rating);
  const data = {
    id: claim.id,
    title: claim.title,
    claim: claim.claim,
    aliases: claim.aliases,
    fingerprint: claim.fingerprint,
    feed: FEED,
    category: claim.category || CATEGORY,
    status: claim.status,
    rating: claim.rating,
    previous_rating: claim.previous_rating === null || claim.previous_rating === undefined ? "" : claim.previous_rating,
    evidence_confidence: claim.evidence_confidence ?? "",
    follow_up: claim.follow_up,
    first_seen: claim.first_seen,
    last_checked: claim.last_checked,
    last_published: claim.last_published || "",
    ratings: claim.ratings.map(encodeRating),
    sources: claim.sources.map(encodeSource),
    evidence: claim.evidence,
    events: claim.events.map(encodeEvent),
  };

  const lines = [];
  lines.push(`# ${claim.id} — ${claim.title}`);
  lines.push("");
  lines.push(`**Affirmation canonique :** ${claim.claim}`);
  lines.push("");
  lines.push(`**Évaluation actuelle : ${claim.rating}/10 ${level.dot} ${level.label} — statut \`${claim.status}\`**`);
  if (claim.evidence_confidence !== null && claim.evidence_confidence !== undefined && claim.evidence_confidence !== "") {
    lines.push("");
    lines.push(`**Confiance dans l'évaluation (solidité des preuves) : ${claim.evidence_confidence}/10**`);
  }
  lines.push("");
  lines.push(`**Première détection :** ${claim.first_seen} · **Dernière vérification :** ${claim.last_checked} · **Suivi :** ${claim.follow_up}`);
  lines.push("");
  if (claim.evidence.length) {
    lines.push("## Preuves principales");
    lines.push("");
    for (const e of claim.evidence) lines.push(`- ${e}`);
    lines.push("");
  }
  lines.push("## Historique des notes");
  lines.push("");
  for (const r of claim.ratings) {
    lines.push(`- ${r.at} — **${r.rating}/10** · ${r.status}${r.note ? ` — ${r.note}` : ""}`);
  }
  lines.push("");
  if (claim.events.length) {
    lines.push("## Entrées RSS publiées");
    lines.push("");
    for (const e of claim.events) lines.push(`- ${e.at} — ${e.type} — [${e.path}](../../../../${e.path})`);
    lines.push("");
  }
  lines.push("## Sources");
  lines.push("");
  for (const s of claim.sources) {
    const [title, url] = String(s).split("|").map((x) => x.trim());
    lines.push(url ? `- [${title}](${url})` : `- ${title}`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(
    "Fiche générée par `scripts/verif-record.mjs`. Le front matter est la source de vérité ; le corps en est le rendu lisible."
  );

  return renderDocument(data, lines.join("\n"));
}

/* ---------- appariement ---------- */

// Retrouve la fiche correspondant à une observation. L'ordre compte :
// identifiant explicite, puis empreinte exacte, puis similarité.
export function matchClaim(observation, claims) {
  if (observation.id) {
    const byId = claims.find((c) => c.id === observation.id);
    if (byId) return { claim: byId, how: "id", score: 1 };
  }
  const fp = fingerprint(observation.claim);
  const byFp = claims.find((c) => c.fingerprint === fp);
  if (byFp) return { claim: byFp, how: "fingerprint", score: 1 };

  let best = null;
  for (const c of claims) {
    const candidates = [c.claim, c.title, ...c.aliases].filter(Boolean);
    // Un énoncé contradictoire n'est jamais fusionné, si proche soit-il :
    // c'est une affirmation différente, qui mérite sa propre fiche.
    if (conflicting(observation.claim, c.claim)) continue;
    const score = Math.max(...candidates.map((t) => similarity(observation.claim, t)));
    if (!best || score > best.score) best = { claim: c, how: "similarity", score };
  }
  if (best && best.score >= THRESHOLDS.similarity) return best;
  return null;
}

/* ---------- décision de publication ---------- */

// Renvoie l'événement à publier, ou { publish: false, reason }.
// C'est le cœur de la règle « pas de republication sans changement ».
export function decide(previous, observation) {
  const rating = clampRating(observation.rating);
  const status = observation.status;

  if (!previous) {
    if (observation.significance === "faible") {
      return { publish: false, event: "nouvelle", reason: "importance jugée faible" };
    }
    if (rating > THRESHOLDS.newClaimMaxRating) {
      return {
        publish: false,
        event: "nouvelle",
        reason: `note ${rating}/10 au-dessus du seuil de publication (${THRESHOLDS.newClaimMaxRating}/10)`,
      };
    }
    return { publish: true, event: "nouvelle", reason: "nouvelle affirmation significative" };
  }

  const prev = clampRating(previous.rating);
  const delta = rating - prev;
  const crossed =
    (prev >= THRESHOLDS.reversalHigh && rating <= THRESHOLDS.reversalLow) ||
    (prev <= THRESHOLDS.reversalLow && rating >= THRESHOLDS.reversalHigh);

  if (crossed && Math.abs(delta) >= THRESHOLDS.reversalDelta) {
    return { publish: true, event: "retournement", reason: `retournement de l'évaluation ${prev}→${rating}` };
  }
  if (status && previous.status && status !== previous.status) {
    return { publish: true, event: "mise-a-jour", reason: `changement de statut ${previous.status} → ${status}` };
  }
  if (Math.abs(delta) >= THRESHOLDS.significantDelta) {
    return { publish: true, event: "mise-a-jour", reason: `évolution significative de la note ${prev}→${rating}` };
  }

  const known = new Set(previous.evidence.map((e) => normalizeText(e)));
  const fresh = (observation.evidence || []).filter((e) => !known.has(normalizeText(e)));
  if (fresh.length && observation.major_evidence) {
    return { publish: true, event: "mise-a-jour", reason: "nouvelle preuve importante" };
  }

  return { publish: false, event: null, reason: "aucun changement significatif" };
}

/* ---------- titres ---------- */

export function eventTitle(event, { rating, previousRating, summary }) {
  const n = clampRating(rating);
  const level = ratingLevel(n);
  if (event === "retournement") return `[🚨 RETOURNEMENT ${previousRating}→${n}/10] ${summary}`;
  if (event === "mise-a-jour") {
    const arrow = n > previousRating ? "↑" : n < previousRating ? "↓" : "→";
    return `[MISE À JOUR ${arrow} ${previousRating}→${n}/10] ${summary}`;
  }
  return `[${n}/10 ${level.dot} ${level.label}] ${summary}`;
}

/* ---------- fichier d'alerte (item RSS) ---------- */

export function renderAlert({ claim, event, observation, at }) {
  const level = ratingLevel(claim.rating);
  const title = eventTitle(event, {
    rating: claim.rating,
    previousRating: claim.previous_rating,
    summary: claim.title,
  });

  const data = {
    title,
    date: at,
    type: "alert",
    feed: FEED,
    category: claim.category || CATEGORY,
    claim_id: claim.id,
    event,
    rating: claim.rating,
    previous_rating: claim.previous_rating === null || claim.previous_rating === undefined ? "" : claim.previous_rating,
    status: claim.status,
    evidence_confidence: claim.evidence_confidence ?? "",
    summary: observation.summary || claim.claim,
  };

  const lines = [];
  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`**Identifiant :** \`${claim.id}\` · **Statut : ${claim.status}** · **Plausibilité : ${claim.rating}/10 ${level.dot} ${level.label}**`);
  if (claim.evidence_confidence !== null && claim.evidence_confidence !== "") {
    lines.push("");
    lines.push(`**Confiance dans l'évaluation (solidité des preuves) : ${claim.evidence_confidence}/10**`);
  }
  lines.push("");
  lines.push("## Affirmation examinée");
  lines.push("");
  lines.push(`> ${claim.claim}`);
  lines.push("");
  if (observation.context) {
    lines.push("## Contexte");
    lines.push("");
    lines.push(observation.context);
    lines.push("");
  }
  lines.push("## Ce que montre la vérification");
  lines.push("");
  for (const e of claim.evidence) lines.push(`- ${e}`);
  lines.push("");
  if (observation.note) {
    lines.push(`## Pourquoi ${claim.rating}/10 ?`);
    lines.push("");
    lines.push(observation.note);
    lines.push("");
  }
  if (event !== "nouvelle") {
    lines.push("## Ce qui a changé");
    lines.push("");
    lines.push(
      `Évaluation précédente : **${claim.previous_rating}/10**. Nouvelle évaluation : **${claim.rating}/10**. ${observation.change || ""}`.trim()
    );
    lines.push("");
    lines.push("Historique complet :");
    lines.push("");
    for (const r of claim.ratings) lines.push(`- ${r.at} — ${r.rating}/10 · ${r.status}`);
    lines.push("");
  }
  lines.push("## Sources");
  lines.push("");
  for (const s of claim.sources) {
    const [t, url] = String(s).split("|").map((x) => x.trim());
    lines.push(url ? `- [${t}](${url})` : `- ${t}`);
  }
  lines.push("");
  lines.push(`Fiche de suivi : [\`${claim.id}\`](../../../claims/${claim.id.slice(6, 10)}/${claim.id.slice(10, 12)}/${claim.id}.md)`);

  return renderDocument(data, lines.join("\n"));
}

/* ---------- chemins ---------- */

export function claimPath(id) {
  const m = /^CLAIM-(\d{4})(\d{2})\d{2}-\d{3}$/.exec(id);
  if (!m) throw new Error(`Identifiant invalide : ${id}`);
  return `${FEED}/claims/${m[1]}/${m[2]}/${id}.md`;
}

export function alertPath(date, summary) {
  const s = parisStamp(date);
  return `${FEED}/alerts/${s.year}/${s.month}/${s.date}-${s.time}-${slugify(summary, 50)}.md`;
}

/* ---------- index anti-doublon ---------- */

export const INDEX_PATH = `${FEED}/state/affirmations.md`;

const INDEX_HEADER = `# Affirmations suivies

Mémoire anti-doublon du flux \`verification\`, régénérée par
\`scripts/verif-record.mjs\`. Chaque passage la lit avant de chercher.
Format : \`- CLAIM_ID | note | statut | suivi | dernière vérification | affirmation\`

Les fiches complètes vivent dans \`verification/claims/\` et ne sont jamais
supprimées. Cet index n'énumère que les affirmations encore utiles au
dédoublonnage : une affirmation \`clos\` en sort après 30 jours.
`;

export function renderIndex(claims, now = new Date()) {
  const limit = now.getTime() - 30 * 24 * 3600 * 1000;
  const kept = claims
    .filter((c) => {
      if (c.follow_up !== "clos") return true;
      const t = Date.parse(c.last_checked);
      return Number.isNaN(t) ? true : t >= limit;
    })
    .sort((a, b) => String(b.last_checked).localeCompare(String(a.last_checked)));
  const lines = [INDEX_HEADER];
  for (const c of kept) {
    lines.push(`- ${c.id} | ${c.rating}/10 | ${c.status} | ${c.follow_up} | ${c.last_checked} | ${c.claim}`);
  }
  return lines.join("\n").replace(/\s*$/, "") + "\n";
}

export function parseIndex(raw) {
  const out = [];
  for (const line of String(raw).split(/\r?\n/)) {
    const m = /^-\s+(CLAIM-\d{8}-\d{3})\s*\|(.*)$/.exec(line.trim());
    if (!m) continue;
    const [rating, status, follow_up, last_checked, ...rest] = m[2].split("|").map((s) => s.trim());
    out.push({
      id: m[1],
      rating: Number(String(rating).replace("/10", "")),
      status,
      follow_up,
      last_checked,
      claim: rest.join(" | "),
    });
  }
  return out;
}

/* ---------- validation d'une observation ---------- */

export function validateObservation(obs, i = 0) {
  const where = `observation #${i + 1}`;
  if (!obs || typeof obs !== "object") throw new Error(`${where} : objet attendu`);
  if (!obs.claim || String(obs.claim).trim().length < 15) {
    throw new Error(`${where} : champ « claim » manquant ou trop court`);
  }
  if (!obs.summary || String(obs.summary).trim().length < 10) {
    throw new Error(`${where} : champ « summary » manquant ou trop court`);
  }
  const rating = clampRating(obs.rating);
  if (!obs.status || !STATUSES.includes(obs.status)) {
    throw new Error(`${where} : statut « ${obs.status} » inconnu (attendus : ${STATUSES.join(", ")})`);
  }
  const sources = [].concat(obs.sources || []);
  if (sources.length < 2) {
    throw new Error(`${where} : au moins deux sources indépendantes sont exigées (croisement obligatoire)`);
  }
  if (obs.id && !isClaimId(obs.id)) throw new Error(`${where} : identifiant « ${obs.id} » malformé`);
  return { ...obs, rating, sources };
}
