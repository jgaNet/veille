#!/usr/bin/env node
// Enregistre les affirmations vérifiées du flux « presidentielle-2027-factcheck ».
//
// Entrée : un JSON produit par le passage de veille (tableau d'observations,
// ou objet { observations: [...] }). Voir
// presidentielle-2027-factcheck/CONSIGNES.md pour le format attendu.
//
// Sortie : fiches presidentielle-2027-factcheck/claims/PRES27-*.md tenues à
// jour ; une entrée dans alerts/ — donc un item RSS — uniquement pour une
// nouvelle affirmation problématique ou pour une correction ; le bulletin du
// jour dans daily/ ; l'index anti-doublon dans state/.
//
// Une affirmation déjà vérifiée n'est jamais republiée : sa reprise, par le
// même auteur ou par un autre, incrémente sa diffusion sur la fiche existante.
//
// Usage (mêmes options que verif-record.mjs) :
//   node scripts/factcheck-record.mjs --input observations.json
//   node scripts/factcheck-record.mjs --input o.json --dry-run
//   node scripts/factcheck-record.mjs --input o.json --now 2026-09-19T10:47:00+02:00

import { mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fingerprint, matchClaim, parisISO } from "./lib/claims.mjs";
import {
  FEED,
  INDEX_PATH,
  bulletinPath,
  decide,
  entryPath,
  factPath,
  nextFactId,
  occurrenceKey,
  parseFact,
  renderBulletin,
  renderEntry,
  renderFact,
  renderIndex,
  validateCorrection,
  validateObservation,
} from "./lib/factcheck.mjs";
import { parseArgs } from "./verif-record.mjs";

/* ---------- lecture et écriture du dépôt ---------- */

function walkMd(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMd(p));
    else if (e.isFile() && e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

export function loadFacts(root) {
  return walkMd(join(root, FEED, "claims"))
    .map((p) => parseFact(readFileSync(p, "utf8")))
    .filter((f) => f.id)
    .sort((a, b) => a.id.localeCompare(b.id));
}

function write(root, rel, content, dryRun) {
  if (dryRun) return;
  const abs = join(root, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
}

/* ---------- application d'une observation ---------- */

export function applyObservation(obs, facts, { now, at, index = 0 }) {
  const match = matchClaim(obs, facts);
  const previous = match ? match.claim : null;
  const decision = decide(previous, obs);
  if (!decision.record) return { fact: null, previous, decision, isNewOccurrence: false };
  if (decision.event === "correction") validateCorrection(obs, index);

  const occurrence = {
    date: obs.statement_date,
    author: obs.author,
    party: obs.party,
    context: obs.context,
    url: obs.statement_url || "",
  };

  let fact;
  let isNewOccurrence = true;
  if (previous) {
    fact = { ...previous };
    const known = new Set(previous.occurrences.map(occurrenceKey));
    isNewOccurrence = !known.has(occurrenceKey(occurrence));
    if (isNewOccurrence) {
      fact.occurrences = [...previous.occurrences, occurrence].sort((a, b) => String(a.date).localeCompare(String(b.date)));
      fact.repeat_count = fact.occurrences.length;
      if (occurrence.date > fact.last_seen) fact.last_seen = occurrence.date;
      if (occurrence.date < fact.first_seen) fact.first_seen = occurrence.date;
    }
    // L'affirmation canonique ne change pas : les reformulations deviennent
    // des alias, ce qui stabilise l'appariement futur.
    if (fingerprint(obs.claim) !== fact.fingerprint && !fact.aliases.includes(obs.claim)) {
      fact.aliases = [...fact.aliases, obs.claim].slice(-8);
    }
    const knownSrc = new Set(previous.sources.map((s) => s.url));
    fact.sources = [...previous.sources, ...obs.sources.filter((s) => !knownSrc.has(s.url))];
    if (decision.event === "correction") {
      fact.verdict = obs.verdict;
      fact.truth_score = obs.truth_score;
      fact.confidence_level = obs.confidence_level;
      fact.lie_established = obs.lie_established;
    }
  } else {
    fact = {
      id: nextFactId(facts.map((f) => f.id), now),
      title: obs.title,
      claim: obs.claim,
      aliases: [],
      fingerprint: fingerprint(obs.claim),
      topic: obs.topic,
      author: obs.author,
      party: obs.party,
      verdict: obs.verdict,
      truth_score: obs.truth_score,
      confidence_level: obs.confidence_level,
      lie_established: obs.lie_established,
      first_seen: obs.statement_date,
      last_seen: obs.statement_date,
      repeat_count: 1,
      occurrences: [occurrence],
      corrections: [],
      sources: obs.sources,
      events: [],
    };
  }
  fact.last_checked = at;
  return { fact, previous, decision, isNewOccurrence };
}

/* ---------- programme principal ---------- */

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log("Usage : node scripts/factcheck-record.mjs [--input fichier.json] [--dry-run] [--now ISO] [--root dir]");
    return null;
  }

  const raw = args.input ? readFileSync(args.input, "utf8") : readFileSync(0, "utf8");
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    throw new Error(`JSON d'entrée illisible : ${e.message}`);
  }
  const list = Array.isArray(payload) ? payload : payload.observations || [];
  if (!Array.isArray(list)) throw new Error("Entrée : tableau d'observations attendu");

  // Tout est validé avant la moindre écriture : un passage est enregistré en
  // entier ou pas du tout.
  const warnings = [];
  const validated = list.map((o, i) => {
    const v = validateObservation(o, i);
    warnings.push(...v.warnings);
    return v.obs;
  });

  const at = parisISO(args.now);
  const byId = new Map(loadFacts(args.root).map((f) => [f.id, f]));
  const report = { at, examined: list.length, published: [], silent: [], ignored: [], created: [], updated: [] };
  const usedPaths = new Set();
  const writes = [];

  validated.forEach((obs, i) => {
    const { fact, previous, decision, isNewOccurrence } = applyObservation(obs, [...byId.values()], { now: args.now, at, index: i });
    if (!fact) {
      report.ignored.push({ author: obs.author, reason: decision.reason });
      return;
    }

    if (decision.publish) {
      let rel = entryPath(args.now, obs.author, fact.title);
      for (let n = 2; usedPaths.has(rel); n += 1) rel = entryPath(args.now, obs.author, `${fact.title} ${n}`);
      usedPaths.add(rel);
      if (decision.event === "correction") {
        fact.corrections = [
          ...fact.corrections,
          { at, old_verdict: previous.verdict, new_verdict: fact.verdict, reason: obs.correction_reason, path: rel },
        ];
      }
      const entry = renderEntry({ fact, event: decision.event, obs, at, previous });
      fact.events = [...fact.events, { at, type: decision.event, path: rel }];
      writes.push([rel, entry]);
      report.published.push({ id: fact.id, event: decision.event, path: rel, reason: decision.reason });
    } else if (previous && !isNewOccurrence) {
      // Même déclaration soumise deux fois : la fiche n'est pas réécrite.
      report.silent.push({ id: fact.id, reason: "occurrence déjà enregistrée : rien de nouveau" });
      return;
    } else {
      report.silent.push({ id: fact.id, reason: decision.reason });
    }

    writes.push([factPath(fact.id), renderFact(fact)]);
    (previous ? report.updated : report.created).push(fact.id);
    byId.set(fact.id, fact);
  });

  const facts = [...byId.values()];
  if (report.published.some((p) => p.event === "nouvelle")) {
    const bulletin = renderBulletin(facts, args.now, at);
    if (bulletin) writes.push([bulletinPath(args.now), bulletin]);
  }
  if (report.created.length || report.updated.length) writes.push([INDEX_PATH, renderIndex(facts)]);
  for (const [rel, content] of writes) write(args.root, rel, content, args.dryRun);
  report.files = [...new Set(writes.map(([rel]) => rel))];

  if (!args.quiet) {
    const tag = args.dryRun ? "[simulation] " : "";
    for (const w of warnings) console.log(`${tag}⚠️  ${w}`);
    console.log(`${tag}Passage du ${at} — ${report.examined} affirmation(s) examinée(s).`);
    console.log(`${tag}Fiches : ${report.created.length} créée(s), ${report.updated.length} mise(s) à jour.`);
    if (report.published.length) {
      console.log(`${tag}Entrées RSS publiées (${report.published.length}) :`);
      for (const p of report.published) console.log(`${tag}  ${p.event} — ${p.id} — ${p.path} (${p.reason})`);
    } else {
      console.log(`${tag}Aucune entrée RSS publiée.`);
    }
    for (const s of report.silent) console.log(`${tag}  sans publication — ${s.id} : ${s.reason}`);
    for (const g of report.ignored) console.log(`${tag}  ignorée — ${g.author} : ${g.reason}`);
    if (report.files.length) {
      console.log(`${tag}Fichiers écrits :`);
      for (const f of report.files) console.log(`${tag}  ${f}`);
    }
  }

  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, `published=${report.published.length}\n`, { flag: "a" });
  }
  return report;
}

function invokedDirectly() {
  try {
    return process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
}

if (invokedDirectly()) {
  try {
    main();
  } catch (e) {
    console.error(`Erreur : ${e.message}`);
    process.exit(1);
  }
}

export { main };
