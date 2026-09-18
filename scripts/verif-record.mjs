#!/usr/bin/env node
// Enregistre les affirmations vérifiées du flux « verification ».
//
// Entrée : un JSON produit par le passage de veille (tableau d'observations,
// ou objet { observations: [...] }). Voir verification/CONSIGNES.md pour le
// format attendu.
//
// Sortie : fiches verification/claims/CLAIM-*.md mises à jour, et un fichier
// d'alerte verification/alerts/... — donc un item RSS — uniquement lorsqu'il
// y a un changement publiable. Sans changement, rien n'est créé : c'est la
// garantie « pas de republication à chaque exécution ».
//
// Usage :
//   node scripts/verif-record.mjs --input observations.json
//   cat observations.json | node scripts/verif-record.mjs
//   node scripts/verif-record.mjs --input o.json --dry-run
//   node scripts/verif-record.mjs --input o.json --now 2026-09-18T23:00:00+02:00

import { mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  FEED,
  INDEX_PATH,
  alertPath,
  claimPath,
  decide,
  fingerprint,
  matchClaim,
  nextClaimId,
  parisISO,
  parseClaim,
  renderAlert,
  renderClaim,
  renderIndex,
  validateObservation,
} from "./lib/claims.mjs";

/* ---------- arguments ---------- */

function parseArgs(argv) {
  const out = { input: null, dryRun: false, now: new Date(), root: process.cwd(), quiet: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--input" || a === "-i") out.input = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--quiet") out.quiet = true;
    else if (a === "--root") out.root = argv[++i];
    else if (a === "--now") {
      const d = new Date(argv[++i]);
      if (Number.isNaN(d.getTime())) throw new Error("--now : date invalide");
      out.now = d;
    } else if (a === "--help" || a === "-h") out.help = true;
    else throw new Error(`Argument inconnu : ${a}`);
  }
  return out;
}

/* ---------- lecture du dépôt ---------- */

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

export function loadClaims(root) {
  return walkMd(join(root, FEED, "claims"))
    .map((p) => parseClaim(readFileSync(p, "utf8")))
    .filter((c) => c.id)
    .sort((a, b) => a.id.localeCompare(b.id));
}

function write(root, rel, content, dryRun) {
  const abs = join(root, rel);
  if (dryRun) return abs;
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  return abs;
}

/* ---------- application d'une observation ---------- */

export function applyObservation(observation, claims, { now, at }) {
  const obs = observation;
  const match = matchClaim(obs, claims);
  const previous = match ? match.claim : null;
  const decision = decide(previous, obs);

  let claim;
  if (previous) {
    claim = { ...previous };
    claim.previous_rating = previous.rating;
    claim.rating = obs.rating;
    claim.status = obs.status;
    claim.last_checked = at;
    claim.evidence_confidence = obs.evidence_confidence ?? previous.evidence_confidence;
    if (obs.follow_up) claim.follow_up = obs.follow_up;
    if (obs.title) claim.title = obs.title;
    if (obs.category) claim.category = obs.category;
    // L'affirmation canonique ne change pas : les reformulations sont
    // conservées comme alias, ce qui stabilise l'appariement futur.
    if (fingerprint(obs.claim) !== claim.fingerprint && !claim.aliases.includes(obs.claim)) {
      claim.aliases = [...claim.aliases, obs.claim].slice(-8);
    }
    const known = new Set(previous.evidence);
    claim.evidence = [...previous.evidence, ...(obs.evidence || []).filter((e) => !known.has(e))];
    const knownSrc = new Set(previous.sources.map(String));
    claim.sources = [
      ...previous.sources,
      ...(obs.sources || [])
        .map((s) => (typeof s === "string" ? s : `${s.title} | ${s.url}`))
        .filter((s) => !knownSrc.has(s)),
    ];
  } else {
    const id = nextClaimId(claims.map((c) => c.id), now);
    claim = {
      id,
      title: obs.title || obs.summary,
      claim: obs.claim,
      aliases: [],
      fingerprint: fingerprint(obs.claim),
      category: obs.category || "verification",
      status: obs.status,
      rating: obs.rating,
      previous_rating: null,
      evidence_confidence: obs.evidence_confidence ?? null,
      follow_up: obs.follow_up || "en-cours",
      first_seen: at,
      last_checked: at,
      last_published: "",
      ratings: [],
      sources: (obs.sources || []).map((s) => (typeof s === "string" ? s : `${s.title} | ${s.url}`)),
      evidence: obs.evidence || [],
      events: [],
    };
  }

  // L'historique des notes enregistre chaque vérification, publiée ou non.
  claim.ratings = [
    ...claim.ratings,
    {
      at,
      rating: claim.rating,
      status: claim.status,
      event: decision.publish ? decision.event : "verification",
      note: decision.publish ? decision.reason : obs.note || decision.reason,
    },
  ];

  return { claim, previous, decision, match };
}

/* ---------- programme principal ---------- */

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log("Usage : node scripts/verif-record.mjs [--input fichier.json] [--dry-run] [--now ISO] [--root dir]");
    return;
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

  const at = parisISO(args.now);
  const claims = loadClaims(args.root);
  const byId = new Map(claims.map((c) => [c.id, c]));
  const report = { at, examined: list.length, published: [], unchanged: [], created: [], updated: [] };
  const usedPaths = new Set();

  list.forEach((o, i) => {
    const obs = validateObservation(o, i);
    const current = [...byId.values()];
    const { claim, previous, decision } = applyObservation(obs, current, { now: args.now, at });

    if (decision.publish) {
      let rel = alertPath(args.now, claim.title);
      // Deux publications dans la même minute ne doivent pas se recouvrir.
      for (let n = 2; usedPaths.has(rel); n += 1) rel = alertPath(args.now, `${claim.title} ${n}`);
      usedPaths.add(rel);
      claim.last_published = at;
      claim.events = [...claim.events, { at, type: decision.event, path: rel }];
      write(args.root, rel, renderAlert({ claim, event: decision.event, observation: obs, at }), args.dryRun);
      report.published.push({ id: claim.id, event: decision.event, path: rel, reason: decision.reason });
    } else {
      report.unchanged.push({ id: claim.id, reason: decision.reason });
    }

    write(args.root, claimPath(claim.id), renderClaim(claim), args.dryRun);
    (previous ? report.updated : report.created).push(claim.id);
    byId.set(claim.id, claim);
  });

  write(args.root, INDEX_PATH, renderIndex([...byId.values()], args.now), args.dryRun);

  if (!args.quiet) {
    const tag = args.dryRun ? "[simulation] " : "";
    console.log(`${tag}Passage du ${at} — ${report.examined} affirmation(s) examinée(s).`);
    console.log(`${tag}Fiches : ${report.created.length} créée(s), ${report.updated.length} mise(s) à jour.`);
    if (report.published.length) {
      console.log(`${tag}Entrées RSS publiées (${report.published.length}) :`);
      for (const p of report.published) console.log(`${tag}  ${p.event} — ${p.id} — ${p.path} (${p.reason})`);
    } else {
      console.log(`${tag}Aucune entrée RSS publiée.`);
    }
    for (const u of report.unchanged) console.log(`${tag}  sans publication — ${u.id} : ${u.reason}`);
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

export { main, parseArgs };
