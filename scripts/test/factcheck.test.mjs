// Tests du flux « presidentielle-2027-factcheck » : règles de publication,
// déduplication entre auteurs, corrections traçables, garde-fous de
// neutralité, et validité du RSS produit. Chaque cas travaille dans un dépôt
// temporaire isolé, jamais sur le vrai. Les personnes et partis sont fictifs.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { checkRss } from "../check-feeds.mjs";
import { BULLETIN_SECTION, FEED, decide, nextFactId, parseFact, validateObservation } from "../lib/factcheck.mjs";

const SCRIPTS = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO = dirname(SCRIPTS);

function sandbox() {
  const dir = mkdtempSync(join(tmpdir(), "veille-factcheck-"));
  cpSync(SCRIPTS, join(dir, "scripts"), { recursive: true });
  for (const d of ["alerts", "claims", "state"]) mkdirSync(join(dir, FEED, d), { recursive: true });
  cpSync(join(REPO, FEED, "feed.json"), join(dir, FEED, "feed.json"));
  return dir;
}

function record(dir, observations, { now = "2026-09-19T10:47:00+02:00", extra = [] } = {}) {
  const input = join(dir, "observations.json");
  writeFileSync(input, JSON.stringify(observations));
  return execFileSync(
    process.execPath,
    [join(dir, "scripts", "factcheck-record.mjs"), "--input", input, "--now", now, "--root", dir, ...extra],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  );
}

function files(dir, sub) {
  const out = [];
  const walk = (d) => {
    if (!existsSync(d)) return;
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  walk(join(dir, FEED, sub));
  return out.sort();
}

const SOURCES = [
  { name: "Insee", title: "Taux de chômage au sens du BIT", date: "2026-08-14", url: "https://example.org/insee-chomage", type: "officielle" },
  { name: "Média fictif", title: "Entretien intégral", date: "2026-09-18", url: "https://example.org/entretien", type: "primaire" },
];

const base = (over = {}) => ({
  author: "Camille Exemple",
  party: "Parti fictif A",
  statement_date: "2026-09-18",
  quote: "Le chômage a augmenté de 20 % depuis 2022",
  claim: "Le taux de chômage en France a augmenté de 20 % entre 2022 et 2026.",
  title: "le chômage aurait augmenté de 20 % depuis 2022",
  context: "Interview — matinale d'une radio fictive",
  statement_url: "https://example.org/entretien",
  topic: "emploi",
  verdict: "FAUX",
  truth_score: 1,
  confidence_level: "FORT",
  summary: "Les séries officielles ne montrent aucune hausse de cet ordre sur la période.",
  incorrect: "L'ordre de grandeur avancé ne correspond à aucune série officielle.",
  decisive: "Le taux de chômage au sens du BIT est resté dans une fourchette étroite sur la période.",
  sources: SOURCES,
  ...over,
});

test("une nouvelle affirmation fausse crée une fiche, une entrée et un bulletin", () => {
  const dir = sandbox();
  record(dir, [base()]);
  const claims = files(dir, "claims");
  const alerts = files(dir, "alerts");
  assert.equal(claims.length, 1);
  assert.equal(alerts.length, 1);
  const fact = parseFact(readFileSync(claims[0], "utf8"));
  assert.equal(fact.id, "PRES27-20260919-001");
  assert.equal(fact.repeat_count, 1);
  assert.match(alerts[0], /2026-09-19-10-47-camille-exemple-le-chomage-aurait-augmente-de-20-depuis-2022\.md$/);
  const entry = readFileSync(alerts[0], "utf8");
  assert.match(entry, /^title: "\[FAUX · 1\/10\] Camille Exemple — « Le chômage a augmenté de 20 % depuis 2022 »"$/m);
  assert.match(entry, /## Vérification/);
  assert.match(entry, /type : officielle/);
  assert.match(entry, /## Niveau de confiance/);
  const bulletin = readFileSync(files(dir, "daily")[0], "utf8");
  assert.ok(bulletin.includes(`## ${BULLETIN_SECTION} — passage de 10 h 47`));
});

test("la même affirmation répétée par son auteur n'est pas republiée", () => {
  const dir = sandbox();
  record(dir, [base()]);
  const out = record(dir, [base({ statement_date: "2026-09-20", context: "Meeting fictif", statement_url: "https://example.org/meeting" })], {
    now: "2026-09-20T11:47:00+02:00",
  });
  assert.match(out, /Aucune entrée RSS publiée/);
  assert.equal(files(dir, "alerts").length, 1);
  const fact = parseFact(readFileSync(files(dir, "claims")[0], "utf8"));
  assert.equal(fact.repeat_count, 2);
  assert.equal(fact.first_seen, "2026-09-18");
  assert.equal(fact.last_seen, "2026-09-20");
});

test("une reprise par un autre parti enrichit la fiche sans créer de nouveau fait", () => {
  const dir = sandbox();
  record(dir, [base()]);
  record(
    dir,
    [base({
      author: "Dominique Modèle",
      party: "Parti fictif B",
      quote: undefined,
      statement_url: undefined,
      claim: "Entre 2022 et 2026, le taux de chômage a augmenté de 20 % en France.",
      statement_date: "2026-09-21",
      context: "Communiqué du parti",
      confidence_level: "MOYEN",
      confidence_note: "La déclaration n'a pas pu être lue à la source primaire.",
    })],
    { now: "2026-09-21T09:47:00+02:00" }
  );
  assert.equal(files(dir, "claims").length, 1);
  assert.equal(files(dir, "alerts").length, 1);
  const raw = readFileSync(files(dir, "claims")[0], "utf8");
  const fact = parseFact(raw);
  assert.equal(fact.author, "Camille Exemple");
  assert.equal(fact.repeat_count, 2);
  assert.ok(fact.occurrences.some((o) => o.author === "Dominique Modèle" && o.party === "Parti fictif B"));
});

test("soumettre deux fois la même déclaration ne change rien", () => {
  const dir = sandbox();
  record(dir, [base()]);
  const before = readFileSync(files(dir, "claims")[0], "utf8");
  const out = record(dir, [base()], { now: "2026-09-19T11:47:00+02:00" });
  assert.match(out, /occurrence déjà enregistrée/);
  assert.equal(readFileSync(files(dir, "claims")[0], "utf8"), before);
});

test("un énoncé chiffré différent est un fait distinct", () => {
  const dir = sandbox();
  record(dir, [base()]);
  record(dir, [base({ quote: undefined, claim: "Le taux de chômage en France a augmenté de 35 % entre 2022 et 2026.", title: "le chômage aurait augmenté de 35 %" })], {
    now: "2026-09-19T12:47:00+02:00",
  });
  assert.equal(files(dir, "claims").length, 2);
});

test("un changement de verdict publie une correction traçable et garde l'entrée d'origine", () => {
  const dir = sandbox();
  record(dir, [base()]);
  const original = files(dir, "alerts")[0];
  const originalText = readFileSync(original, "utf8");
  const corrected = base({
    verdict: "IMPRÉCIS",
    truth_score: 6,
    substantial_error: true,
    correction_reason: "La série révisée publiée depuis montre une hausse réelle, plus faible qu'annoncé.",
    new_evidence: "Révision de la série officielle publiée après la première vérification.",
  });
  assert.throws(() => record(dir, [{ ...corrected, correction_reason: undefined }], { now: "2026-09-25T10:47:00+02:00" }), /correction_reason/);
  record(dir, [corrected], { now: "2026-09-25T10:47:00+02:00" });
  const alerts = files(dir, "alerts");
  assert.equal(alerts.length, 2);
  assert.equal(readFileSync(original, "utf8"), originalText);
  const correction = readFileSync(alerts[1], "utf8");
  assert.match(correction, /^type: correction$/m);
  assert.match(correction, /\[CORRECTION · FAUX → IMPRÉCIS\]/);
  for (const label of ["Ancien verdict", "Nouveau verdict", "Nouvelles preuves", "Raison du changement", "Date de correction"]) {
    assert.ok(correction.includes(label), label);
  }
  const fact = parseFact(readFileSync(files(dir, "claims")[0], "utf8"));
  assert.equal(fact.verdict, "IMPRÉCIS");
  assert.equal(fact.corrections.length, 1);
  assert.equal(fact.corrections[0].old_verdict, "FAUX");
});

test("règles de publication par verdict", () => {
  const v = (over) => validateObservation(base(over)).obs;
  assert.equal(decide(null, v({ verdict: "TROMPEUR", truth_score: 3 })).publish, true);
  assert.equal(decide(null, v({ verdict: "TRÈS PROBABLEMENT FAUX", truth_score: 2 })).publish, true);
  assert.equal(decide(null, v({ verdict: "IMPRÉCIS", truth_score: 6 })).publish, false);
  assert.equal(decide(null, v({ verdict: "IMPRÉCIS", truth_score: 6, substantial_error: true })).publish, true);
  assert.equal(decide(null, v({ verdict: "NON VÉRIFIABLE", truth_score: null })).publish, false);
  assert.equal(decide(null, v({ verdict: "NON VÉRIFIABLE", truth_score: null, significance: "haute" })).publish, true);
  const confirmed = decide(null, v({ verdict: "CONFIRMÉ", truth_score: 9 }));
  assert.deepEqual([confirmed.record, confirmed.publish], [true, false]);
  const opinion = decide(null, v({ verdict: "OPINION / PRÉDICTION" }));
  assert.deepEqual([opinion.record, opinion.publish], [false, false]);
});

test("une opinion n'est ni enregistrée ni publiée", () => {
  const dir = sandbox();
  const out = record(dir, [base({ verdict: "OPINION / PRÉDICTION", claim: "Cette réforme va ruiner la France dans les années à venir." })]);
  assert.match(out, /ignorée/);
  assert.equal(files(dir, "claims").length, 0);
  assert.equal(files(dir, "alerts").length, 0);
});

test("garde-fous : sources, citation, confiance, vocabulaire du mensonge", () => {
  assert.throws(() => validateObservation(base({ sources: [SOURCES[0]] })), /2 source/);
  assert.throws(() => validateObservation(base({ sources: [SOURCES[0], { ...SOURCES[1], type: "blog" }] })), /type de source/);
  assert.throws(() => validateObservation(base({ statement_url: undefined })), /quote/);
  assert.throws(() => validateObservation(base({ confidence_level: "MOYEN" })), /justification/);
  assert.throws(() => validateObservation(base({ truth_score: 11 })), /0 à 10/);
  assert.throws(() => validateObservation(base({ verdict: "MENSONGE" })), /verdict/);
  assert.throws(() => validateObservation(base({ summary: "Camille Exemple ment sur les chiffres du chômage." })), /mensonge/);
  assert.doesNotThrow(() => validateObservation(base({ exact: "Un élément réel, présenté véhémentement et incomplètement." })));
  assert.throws(() => validateObservation(base({ lie_established: true })), /prior_knowledge/);
  const ok = validateObservation(
    base({
      lie_established: true,
      prior_knowledge: "L'auteur avait cité le chiffre exact lors d'une audition publique un mois plus tôt.",
      prior_knowledge_sources: [{ name: "Assemblée fictive", title: "Compte rendu d'audition", url: "https://example.org/audition", type: "officielle" }],
    })
  );
  assert.equal(ok.obs.lie_established, true);
  assert.equal(validateObservation(base({ truth_score: 5 })).warnings.length, 1);
});

test("les identifiants sont stables et datés du jour de première détection", () => {
  const day = new Date("2026-09-19T10:47:00+02:00");
  assert.equal(nextFactId([], day), "PRES27-20260919-001");
  assert.equal(nextFactId(["PRES27-20260919-001", "PRES27-20260918-007", "CLAIM-20260919-004"], day), "PRES27-20260919-002");
});

test("--dry-run n'écrit rien", () => {
  const dir = sandbox();
  record(dir, [base()], { extra: ["--dry-run"] });
  assert.equal(files(dir, "claims").length, 0);
  assert.equal(files(dir, "alerts").length, 0);
});

test("le flux RSS généré est valide et ne contient aucune note par candidat", () => {
  const dir = sandbox();
  record(dir, [base(), base({ author: "Dominique Modèle", party: "Parti fictif B", quote: undefined, verdict: "TROMPEUR", truth_score: 4, claim: "La dette publique française a doublé en cinq ans selon les comptes nationaux.", title: "la dette aurait doublé en cinq ans", topic: "finances-publiques", missing: "La comparaison mêle des périmètres différents." })]);
  execFileSync(process.execPath, [join(dir, "scripts", "build-feeds.mjs")], { cwd: dir, encoding: "utf8" });
  const xml = readFileSync(join(dir, "feeds", `${FEED}.xml`), "utf8");
  const rss = checkRss(xml);
  assert.deepEqual(rss.errors, []);
  assert.equal(rss.items, 3); // deux entrées et le bulletin du jour
  assert.ok(xml.includes("<category>FAUX</category>"));
  assert.ok(xml.includes("<category>Parti fictif B</category>"));
  assert.ok(xml.includes("<category>finances-publiques</category>"));
  assert.ok(!/confiance \d+\/10<\/title>/.test(xml));
  const index = readFileSync(join(dir, FEED, "state", "affirmations.md"), "utf8");
  assert.equal(index.split("\n").filter((l) => l.startsWith("- PRES27-")).length, 2);
});
