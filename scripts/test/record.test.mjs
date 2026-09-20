// Test de bout en bout : enregistrement des observations, non-republication,
// génération du flux RSS et validité du XML produit.
//
// Chaque cas travaille dans un dépôt temporaire isolé, jamais sur le vrai.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync, cpSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { parseClaim, parseIndex } from "../lib/claims.mjs";
import { checkRss } from "../check-feeds.mjs";

const SCRIPTS = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO = dirname(SCRIPTS);

function sandbox() {
  const dir = mkdtempSync(join(tmpdir(), "veille-test-"));
  mkdirSync(join(dir, "scripts"), { recursive: true });
  cpSync(SCRIPTS, join(dir, "scripts"), { recursive: true });
  mkdirSync(join(dir, "verification", "alerts"), { recursive: true });
  mkdirSync(join(dir, "verification", "claims"), { recursive: true });
  mkdirSync(join(dir, "verification", "state"), { recursive: true });
  cpSync(join(REPO, "verification", "feed.json"), join(dir, "verification", "feed.json"));
  return dir;
}

function record(dir, observations, { now = "2026-09-18T22:35:00+02:00", extra = [] } = {}) {
  const input = join(dir, "observations.json");
  writeFileSync(input, JSON.stringify(observations));
  return execFileSync(
    process.execPath,
    [join(dir, "scripts", "verif-record.mjs"), "--input", input, "--now", now, "--root", dir, ...extra],
    { encoding: "utf8" }
  );
}

function listAlerts(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  walk(join(dir, "verification", "alerts"));
  return out;
}

function claimFiles(dir) {
  const out = [];
  const walk = (d) => {
    if (!existsSync(d)) return;
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  walk(join(dir, "verification", "claims"));
  return out;
}

const SOURCES = [
  "Source originale — publication virale | https://exemple.test/origine",
  "AFP Factuel — vérification | https://exemple.test/afp",
  "Reuters — dépêche | https://exemple.test/reuters",
];

const CLAIM_A = {
  claim: "Une vidéo montrerait l'effondrement d'un pont autoroutier en Allemagne cette semaine",
  title: "Vidéo d'effondrement de pont présentée comme allemande",
  summary: "Une vidéo virale attribuée à l'Allemagne montre en réalité un accident survenu à Taïwan en 2019.",
  rating: 1,
  status: "HORS CONTEXTE",
  evidence_confidence: 9,
  significance: "haute",
  evidence: ["La séquence est archivée par Reuters, datée d'octobre 2019 à Taïwan."],
  sources: SOURCES,
  note: "La source originale de la vidéo est identifiée et antérieure de sept ans.",
};

const CLAIM_B = {
  claim: "Le gouvernement aurait décidé de geler l'ensemble des pensions de retraite l'an prochain",
  title: "Gel annoncé de toutes les pensions de retraite",
  summary: "Aucun texte ni communiqué ne confirme un gel généralisé des pensions.",
  rating: 3,
  status: "TRÈS PROBABLEMENT FAUX",
  evidence_confidence: 6,
  significance: "haute",
  evidence: ["Le dossier de presse du budget ne mentionne aucun gel généralisé."],
  sources: SOURCES,
};

/* ---------- cycle complet ---------- */

test("premier passage : fiche créée, entrée RSS publiée, index alimenté", () => {
  const dir = sandbox();
  const out = record(dir, [CLAIM_A, CLAIM_B]);

  assert.match(out, /2 affirmation\(s\) examinée\(s\)/);
  const alerts = listAlerts(dir);
  assert.equal(alerts.length, 2, "deux entrées RSS attendues");

  const claims = claimFiles(dir).map((p) => parseClaim(readFileSync(p, "utf8")));
  assert.deepEqual(claims.map((c) => c.id).sort(), ["CLAIM-20260918-001", "CLAIM-20260918-002"]);

  const a = claims.find((c) => c.title.includes("Vidéo"));
  assert.equal(a.rating, 1);
  assert.equal(a.status, "HORS CONTEXTE");
  assert.equal(a.previous_rating, null);
  assert.equal(a.first_seen, "2026-09-18T22:35:00+02:00");
  assert.equal(a.last_checked, "2026-09-18T22:35:00+02:00");
  assert.equal(a.follow_up, "en-cours");
  assert.equal(a.ratings.length, 1);
  assert.equal(a.events.length, 1);
  assert.equal(a.sources.length, 3);

  const titre = readFileSync(alerts.find((p) => p.includes("video")) || alerts[0], "utf8");
  assert.match(titre, /\[1\/10 🔴 TRÈS IMPROBABLE\]/);

  const index = parseIndex(readFileSync(join(dir, "verification", "state", "affirmations.md"), "utf8"));
  assert.equal(index.length, 2);
});

test("repasse à l'identique : aucune nouvelle entrée RSS, fiche mise à jour", () => {
  const dir = sandbox();
  record(dir, [CLAIM_A]);
  const apres1 = listAlerts(dir).length;

  const out = record(dir, [CLAIM_A], { now: "2026-09-18T23:35:00+02:00" });
  assert.match(out, /Aucune entrée RSS publiée/);
  assert.equal(listAlerts(dir).length, apres1, "aucune republication sans changement");

  // Troisième et quatrième passages : toujours rien.
  record(dir, [CLAIM_A], { now: "2026-09-19T00:35:00+02:00" });
  record(dir, [CLAIM_A], { now: "2026-09-19T01:35:00+02:00" });
  assert.equal(listAlerts(dir).length, apres1);

  const claim = parseClaim(readFileSync(claimFiles(dir)[0], "utf8"));
  assert.equal(claim.id, "CLAIM-20260918-001", "l'identifiant reste stable d'un passage à l'autre");
  assert.equal(claim.first_seen, "2026-09-18T22:35:00+02:00", "la première détection ne bouge pas");
  assert.equal(claim.last_checked, "2026-09-19T01:35:00+02:00", "la dernière vérification est actualisée");
  assert.equal(claim.ratings.length, 4, "chaque vérification est historisée");
  assert.equal(claim.events.length, 1, "une seule entrée RSS au total");
});

test("reformulation de l'affirmation : appariée à la fiche existante, pas de doublon", () => {
  const dir = sandbox();
  record(dir, [CLAIM_A]);

  const reformule = {
    ...CLAIM_A,
    claim: "Une vidéo virale montrerait l'effondrement récent d'un pont autoroutier situé en Allemagne",
  };
  record(dir, [reformule], { now: "2026-09-18T23:35:00+02:00" });

  assert.equal(claimFiles(dir).length, 1, "aucune fiche en double");
  assert.equal(listAlerts(dir).length, 1, "aucune entrée RSS en double");
  const claim = parseClaim(readFileSync(claimFiles(dir)[0], "utf8"));
  assert.ok(claim.aliases.length >= 1, "la reformulation est conservée comme alias");
});

test("évolution significative de la note : une entrée « mise à jour »", () => {
  const dir = sandbox();
  record(dir, [CLAIM_B]);
  record(
    dir,
    [{ ...CLAIM_B, rating: 7, status: "PROBABLE", change: "Le ministère confirme l'arbitrage." }],
    { now: "2026-09-19T10:35:00+02:00" }
  );

  const alerts = listAlerts(dir);
  assert.equal(alerts.length, 2);
  const maj = readFileSync(alerts.sort()[1], "utf8");
  assert.match(maj, /\[MISE À JOUR ↑ 3→7\/10\]/);
  assert.match(maj, /Ce qui a changé/);
  assert.match(maj, /claim_id: CLAIM-20260918-001/);

  const claim = parseClaim(readFileSync(claimFiles(dir)[0], "utf8"));
  assert.equal(claim.rating, 7);
  assert.equal(claim.previous_rating, 3);
  assert.equal(claim.ratings.length, 2);
});

test("retournement de l'évaluation : entrée dédiée", () => {
  const dir = sandbox();
  record(dir, [{ ...CLAIM_B, rating: 8, status: "PROBABLE", significance: "haute" }]);
  // 8/10 : suivi mais non publié — le flux ne signale pas le plausible.
  assert.equal(listAlerts(dir).length, 0);

  record(dir, [{ ...CLAIM_B, rating: 1, status: "FAUX / RÉFUTÉ" }], { now: "2026-09-19T10:35:00+02:00" });
  const alerts = listAlerts(dir);
  assert.equal(alerts.length, 1, "le retournement est publié même si la détection initiale ne l'était pas");
  assert.match(readFileSync(alerts[0], "utf8"), /\[🚨 RETOURNEMENT 8→1\/10\]/);
});

test("nouveauté d'importance ordinaire : fiche créée, aucune entrée RSS", () => {
  const dir = sandbox();
  const ordinaire = { ...CLAIM_A, significance: "moyenne" };
  const out = record(dir, [ordinaire]);

  assert.match(out, /Aucune entrée RSS publiée/);
  assert.equal(listAlerts(dir).length, 0, "le flux reste silencieux");
  assert.equal(claimFiles(dir).length, 1, "l'affirmation reste suivie dans sa fiche");

  // Et si elle se retourne plus tard, le retournement est bien publié.
  record(dir, [{ ...ordinaire, rating: 9, status: "CONFIRMÉ" }], { now: "2026-09-19T10:35:00+02:00" });
  assert.equal(listAlerts(dir).length, 1, "un retournement sort malgré l'importance ordinaire");
});

test("simulation : aucun fichier écrit", () => {
  const dir = sandbox();
  const out = record(dir, [CLAIM_A], { extra: ["--dry-run"] });
  assert.match(out, /\[simulation\]/);
  assert.equal(listAlerts(dir).length, 0);
  assert.equal(claimFiles(dir).length, 0);
});

test("observation invalide : le script échoue sans rien écrire", () => {
  const dir = sandbox();
  assert.throws(
    () => record(dir, [{ ...CLAIM_A, sources: ["une seule source"] }]),
    /deux sources/
  );
  assert.equal(listAlerts(dir).length, 0);
});

/* ---------- génération RSS ---------- */

test("génération du flux : items RSS valides et titres conservés", () => {
  const dir = sandbox();
  record(dir, [CLAIM_A, CLAIM_B]);
  execFileSync(process.execPath, [join(dir, "scripts", "build-feeds.mjs")], { cwd: dir, encoding: "utf8" });

  const xml = readFileSync(join(dir, "feeds", "verification.xml"), "utf8");
  const { errors, items } = checkRss(xml);
  assert.deepEqual(errors, [], "le flux doit être un RSS 2.0 bien formé");
  assert.equal(items, 2);
  assert.match(xml, /<title>Veille vérification — affirmations douteuses<\/title>/);
  assert.match(xml, /\[1\/10 🔴 TRÈS IMPROBABLE\]/);
  assert.ok(!xml.includes("CLAIM-20260918-001.md<"), "les fiches ne doivent pas devenir des items RSS");

  const all = readFileSync(join(dir, "feeds", "all.xml"), "utf8");
  assert.deepEqual(checkRss(all).errors, []);
  assert.equal(checkRss(all).items, 0, "all.xml ne reprend pas les alertes");
});

test("all.xml ne contient que les récapitulatifs quotidiens", () => {
  const dir = sandbox();
  record(dir, [CLAIM_A, CLAIM_B]);
  const daily = join(dir, "monde", "daily", "2026", "09");
  mkdirSync(daily, { recursive: true });
  writeFileSync(
    join(daily, "2026-09-18-brief-monde.md"),
    '---\ntitle: "Brief mondial — 18 septembre 2026"\ndate: 2026-09-18T20:00:00+02:00\ntype: daily\nfeed: monde\ncategory: briefing\n---\n\n# Brief\n\nTexte.\n'
  );
  const alerts = join(dir, "monde", "alerts", "2026", "09");
  mkdirSync(alerts, { recursive: true });
  writeFileSync(
    join(alerts, "2026-09-18-15-40-test.md"),
    '---\ntitle: "Alerte test"\ndate: 2026-09-18T15:40:00+02:00\ntype: alert\nfeed: monde\ncategory: science\nconfidence: 8\nsummary: "Test."\n---\n\n# Alerte\n\nTexte.\n'
  );
  const build = (now) =>
    execFileSync(process.execPath, [join(dir, "scripts", "build-feeds.mjs")], {
      cwd: dir,
      encoding: "utf8",
      env: { ...process.env, BUILD_NOW: now },
    });

  // Bulletin régénéré au fil de la journée : absent de all.xml avant 20 h.
  const roll = join(dir, "factcheck", "daily", "2026", "09");
  mkdirSync(roll, { recursive: true });
  writeFileSync(
    join(roll, "2026-09-19-factcheck.md"),
    '---\ntitle: "Bulletin du 19"\ndate: 2026-09-19T02:24:00+02:00\ntype: daily\nfeed: factcheck\ncategory: briefing\n---\n\n# Bulletin\n\nTexte.\n'
  );
  build("2026-09-19T15:00:00+02:00");
  const avant20h = readFileSync(join(dir, "feeds", "all.xml"), "utf8");
  assert.ok(!avant20h.includes("Bulletin du 19"), "le bulletin du jour attend 20 h");
  assert.match(avant20h, /Brief mondial — 18 septembre 2026/);

  build("2026-09-19T20:06:00+02:00");
  const apres20h = readFileSync(join(dir, "feeds", "all.xml"), "utf8");
  assert.match(apres20h, /Bulletin du 19/);
  assert.match(apres20h, /<pubDate>Sat, 19 Sep 2026 18:00:00 GMT<\/pubDate>/, "date ramenée à 20 h, heure de Paris");

  const monde = readFileSync(join(dir, "feeds", "monde.xml"), "utf8");
  assert.equal(checkRss(monde).items, 2, "le flux du thème garde alertes et brief");

  const all = readFileSync(join(dir, "feeds", "all.xml"), "utf8");
  assert.deepEqual(checkRss(all).errors, []);
  assert.equal(checkRss(all).items, 2);
  assert.match(all, /Brief mondial — 18 septembre 2026/);
  assert.ok(!all.includes("Alerte test"), "aucune alerte dans all.xml");
});

test("le flux est stable : une régénération sans nouveauté ne change pas les items", () => {
  const dir = sandbox();
  record(dir, [CLAIM_A]);
  execFileSync(process.execPath, [join(dir, "scripts", "build-feeds.mjs")], { cwd: dir });
  const avant = readFileSync(join(dir, "feeds", "verification.xml"), "utf8");

  record(dir, [CLAIM_A], { now: "2026-09-19T05:35:00+02:00" });
  execFileSync(process.execPath, [join(dir, "scripts", "build-feeds.mjs")], { cwd: dir });
  const apres = readFileSync(join(dir, "feeds", "verification.xml"), "utf8");

  const sansDate = (s) => s.replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, "");
  assert.equal(sansDate(avant), sansDate(apres), "seule la date de construction peut changer");
});

/* ---------- non-régression du flux existant ---------- */

test("le flux monde existant n'est pas affecté", () => {
  const dir = sandbox();
  cpSync(join(REPO, "monde"), join(dir, "monde"), { recursive: true });
  record(dir, [CLAIM_A]);
  execFileSync(process.execPath, [join(dir, "scripts", "build-feeds.mjs")], { cwd: dir });

  const monde = readFileSync(join(dir, "feeds", "monde.xml"), "utf8");
  const { errors, items } = checkRss(monde);
  assert.deepEqual(errors, []);
  assert.ok(items >= 5, "les alertes du flux monde restent publiées");
  assert.ok(!monde.includes("CLAIM-"), "aucune affirmation ne fuit dans le flux monde");
  assert.match(monde, /<title>Veille mondiale/);
});

/* ---------- validateur ---------- */

test("le validateur RSS détecte le XML malformé", () => {
  const bon = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>t</title><link>l</link><description>d</description><lastBuildDate>Fri, 18 Sep 2026 20:00:00 GMT</lastBuildDate></channel></rss>`;
  assert.deepEqual(checkRss(bon).errors, []);

  assert.ok(checkRss(bon.replace("</channel>", "")).errors.length, "balise non refermée");
  assert.ok(checkRss(bon.replace("<title>t</title>", "<title>a & b</title>")).errors.length, "esperluette nue");
  assert.ok(
    checkRss(bon.replace("</channel></rss>", "<item><title>x</title></item></channel></rss>")).errors.length,
    "item incomplet"
  );
});
