// Tests du moteur d'affirmations : identité, déduplication, notes, titres.
import test from "node:test";
import assert from "node:assert/strict";

import {
  THRESHOLDS,
  clampRating,
  conflicting,
  decide,
  eventTitle,
  fingerprint,
  matchClaim,
  nextClaimId,
  parisISO,
  parseClaim,
  parseIndex,
  ratingLevel,
  renderClaim,
  renderIndex,
  similarity,
  slugify,
  validateObservation,
} from "../lib/claims.mjs";

const SOURCES = ["AFP Factuel — démenti | https://a", "Reuters — enquête | https://b"];

function obs(extra = {}) {
  return validateObservation({
    claim: "Le ministère de l'Intérieur aurait interdit les rassemblements dans toute la France",
    summary: "Interdiction nationale des rassemblements",
    rating: 2,
    status: "TRÈS PROBABLEMENT FAUX",
    sources: SOURCES,
    ...extra,
  });
}

/* ---------- identifiants ---------- */

test("nextClaimId : numérotation quotidienne et format stable", () => {
  const day = new Date("2026-09-18T12:00:00+02:00");
  assert.equal(nextClaimId([], day), "CLAIM-20260918-001");
  assert.equal(nextClaimId(["CLAIM-20260918-001"], day), "CLAIM-20260918-002");
  assert.equal(nextClaimId(["CLAIM-20260918-009", "CLAIM-20260917-050"], day), "CLAIM-20260918-010");
  // Les identifiants d'autres jours n'influencent pas la séquence du jour.
  assert.equal(nextClaimId(["CLAIM-20260917-200"], day), "CLAIM-20260918-001");
});

test("nextClaimId : la date suit l'heure de Paris, pas UTC", () => {
  // 23 h 30 UTC = le lendemain 01 h 30 à Paris en heure d'été.
  const id = nextClaimId([], new Date("2026-09-18T23:30:00Z"));
  assert.equal(id, "CLAIM-20260919-001");
});

test("empreinte : stable à l'ordre des mots et à la ponctuation près", () => {
  const a = fingerprint("Le pipeline saoudien Est-Ouest a été fermé");
  const b = fingerprint("le  PIPELINE   saoudien est-ouest, a ete ferme !");
  assert.equal(a, b);
  assert.notEqual(a, fingerprint("Le pipeline norvégien a été rouvert"));
  assert.match(a, /^[0-9a-f]{16}$/);
});

/* ---------- déduplication ---------- */

test("matchClaim : retrouve une fiche par identifiant explicite", () => {
  const claims = [{ id: "CLAIM-20260918-001", claim: "Autre chose entièrement", title: "x", aliases: [], fingerprint: "zz" }];
  const m = matchClaim({ id: "CLAIM-20260918-001", claim: "Autre chose entièrement" }, claims);
  assert.equal(m.how, "id");
});

test("matchClaim : retrouve une fiche par empreinte exacte", () => {
  const text = "Le ministère de l'Intérieur aurait interdit les rassemblements dans toute la France";
  const claims = [{ id: "CLAIM-20260918-001", claim: text, title: "t", aliases: [], fingerprint: fingerprint(text) }];
  const m = matchClaim({ claim: `${text.toUpperCase()} !` }, claims);
  assert.equal(m.how, "fingerprint");
  assert.equal(m.claim.id, "CLAIM-20260918-001");
});

test("matchClaim : tolère une reformulation proche, rejette un sujet différent", () => {
  const text = "Le ministère de l'Intérieur aurait interdit les rassemblements dans toute la France";
  const claims = [{ id: "CLAIM-20260918-001", claim: text, title: "t", aliases: [], fingerprint: fingerprint(text) }];

  const proche = matchClaim(
    { claim: "Le ministère de l'Intérieur a interdit les rassemblements dans la France entière" },
    claims
  );
  assert.ok(proche, "une reformulation proche doit être appariée");
  assert.equal(proche.claim.id, "CLAIM-20260918-001");
  assert.ok(proche.score >= THRESHOLDS.similarity);

  const autre = matchClaim({ claim: "La Banque centrale européenne relève son taux directeur de 50 points" }, claims);
  assert.equal(autre, null, "un sujet différent ne doit pas être apparié");
});

test("garde-fou : deux affirmations opposées ne sont jamais fusionnées", () => {
  // Cas piège : un sac de mots juge ces énoncés très proches alors qu'ils
  // s'opposent. Sans garde-fou, les deux affirmations partageraient une fiche.
  const gel = "Le gouvernement aurait gelé toutes les pensions de retraite en 2027";
  const hausse = "Le gouvernement aurait augmenté toutes les pensions de retraite en 2027";
  assert.ok(similarity(gel, hausse) > THRESHOLDS.similarity, "la similarité seule les confondrait");
  assert.equal(conflicting(gel, hausse), true);

  const monte = "La BCE relève son taux directeur de 50 points de base";
  const baisse = "La BCE abaisse son taux directeur de 25 points de base";
  assert.equal(conflicting(monte, baisse), true);

  // Chiffres contradictoires seuls.
  assert.equal(
    conflicting("Le bilan officiel fait état de 12 victimes", "Le bilan officiel fait état de 120 victimes"),
    true
  );

  // Une reformulation fidèle n'est pas un conflit.
  assert.equal(
    conflicting(
      "Une vidéo montrerait l'effondrement d'un pont autoroutier en Allemagne cette semaine",
      "Une vidéo virale montrerait l'effondrement récent d'un pont autoroutier situé en Allemagne"
    ),
    false
  );
});

test("matchClaim : refuse d'apparier une affirmation contradictoire", () => {
  const gel = "Le gouvernement aurait gelé toutes les pensions de retraite en 2027";
  const claims = [{ id: "CLAIM-20260918-001", claim: gel, title: gel, aliases: [], fingerprint: fingerprint(gel) }];
  const m = matchClaim({ claim: "Le gouvernement aurait augmenté toutes les pensions de retraite en 2027" }, claims);
  assert.equal(m, null, "une affirmation opposée mérite sa propre fiche");
});

test("similarité : bornée et symétrique", () => {
  const a = "Une explosion a détruit le pont de Kertch";
  const b = "Le pont de Kertch a été détruit par une explosion";
  assert.equal(similarity(a, b), similarity(b, a));
  assert.ok(similarity(a, a) === 1);
  assert.equal(similarity("", "quoi que ce soit"), 0);
});

/* ---------- notes ---------- */

test("clampRating et libellés de l'échelle", () => {
  assert.equal(clampRating("7"), 7);
  assert.equal(clampRating(12), 10);
  assert.equal(clampRating(-3), 0);
  assert.throws(() => clampRating("abc"), /Note invalide/);
  assert.equal(ratingLevel(2).label, "TRÈS IMPROBABLE");
  assert.equal(ratingLevel(9).label, "CONFIRMÉ");
  assert.equal(ratingLevel(0).label, "RÉFUTÉ");
  assert.equal(ratingLevel(5).dot, "🟠");
});

/* ---------- décision de publication ---------- */

const prev = (rating, status = "INCERTAIN", evidence = []) => ({ rating, status, evidence });

test("nouvelle affirmation douteuse : publiée", () => {
  const d = decide(null, obs({ rating: 2 }));
  assert.equal(d.publish, true);
  assert.equal(d.event, "nouvelle");
});

test("nouvelle affirmation plausible : suivie mais non publiée", () => {
  const d = decide(null, obs({ rating: 8, status: "PROBABLE" }));
  assert.equal(d.publish, false);
  assert.match(d.reason, /seuil de publication/);
});

test("nouvelle affirmation d'importance faible : non publiée", () => {
  assert.equal(decide(null, obs({ significance: "faible" })).publish, false);
});

test("aucun changement : aucune republication", () => {
  const d = decide(prev(2, "TRÈS PROBABLEMENT FAUX"), obs({ rating: 2 }));
  assert.equal(d.publish, false);
  assert.equal(d.reason, "aucun changement significatif");
});

test("dérive d'un point : pas de republication", () => {
  const d = decide(prev(4, "INCERTAIN"), obs({ rating: 5, status: "INCERTAIN" }));
  assert.equal(d.publish, false);
});

test("évolution de deux points : mise à jour", () => {
  const d = decide(prev(4, "INCERTAIN"), obs({ rating: 6, status: "INCERTAIN" }));
  assert.equal(d.publish, true);
  assert.equal(d.event, "mise-a-jour");
});

test("changement de statut à note égale : mise à jour", () => {
  const d = decide(prev(5, "INCERTAIN"), obs({ rating: 5, status: "HORS CONTEXTE" }));
  assert.equal(d.publish, true);
  assert.equal(d.event, "mise-a-jour");
  assert.match(d.reason, /statut/);
});

test("preuve importante inédite à note égale : mise à jour", () => {
  const previous = prev(4, "INCERTAIN", ["Ancienne preuve"]);
  const sans = decide(previous, obs({ rating: 4, status: "INCERTAIN", evidence: ["Ancienne preuve"], major_evidence: true }));
  assert.equal(sans.publish, false, "une preuve déjà connue ne republie pas");

  const avec = decide(
    previous,
    obs({ rating: 4, status: "INCERTAIN", evidence: ["Le document original est daté de 2019"], major_evidence: true })
  );
  assert.equal(avec.publish, true);
  assert.equal(avec.event, "mise-a-jour");
});

test("retournement : bascule d'un bord à l'autre", () => {
  const d = decide(prev(8, "PROBABLE"), obs({ rating: 1, status: "FAUX / RÉFUTÉ" }));
  assert.equal(d.publish, true);
  assert.equal(d.event, "retournement");

  const inverse = decide(prev(2, "TRÈS PROBABLEMENT FAUX"), obs({ rating: 9, status: "CONFIRMÉ" }));
  assert.equal(inverse.event, "retournement");
});

test("forte évolution sans bascule franche : mise à jour, pas retournement", () => {
  assert.equal(decide(prev(4, "INCERTAIN"), obs({ rating: 8, status: "INCERTAIN" })).event, "mise-a-jour");
  // Cas limite : 3→7 traverse l'échelle mais reste un écart de 4 points.
  assert.equal(decide(prev(3, "INCERTAIN"), obs({ rating: 7, status: "INCERTAIN" })).event, "mise-a-jour");
});

/* ---------- titres ---------- */

test("titres RSS conformes au format attendu", () => {
  assert.equal(
    eventTitle("nouvelle", { rating: 2, previousRating: null, summary: "Résumé de l'affirmation" }),
    "[2/10 🔴 TRÈS IMPROBABLE] Résumé de l'affirmation"
  );
  assert.equal(
    eventTitle("mise-a-jour", { rating: 7, previousRating: 3, summary: "Résumé de l'affirmation" }),
    "[MISE À JOUR ↑ 3→7/10] Résumé de l'affirmation"
  );
  assert.equal(
    eventTitle("mise-a-jour", { rating: 3, previousRating: 7, summary: "Résumé" }),
    "[MISE À JOUR ↓ 7→3/10] Résumé"
  );
  assert.equal(
    eventTitle("retournement", { rating: 1, previousRating: 8, summary: "Résumé de l'affirmation" }),
    "[🚨 RETOURNEMENT 8→1/10] Résumé de l'affirmation"
  );
});

/* ---------- validation des observations ---------- */

test("validation : refuse une observation incomplète", () => {
  assert.throws(
    () => validateObservation({ claim: "trop court", summary: "résumé correct", rating: 2, status: "CONFIRMÉ", sources: SOURCES }),
    /claim/
  );
  assert.throws(
    () => validateObservation({ claim: "a".repeat(20), summary: "x", rating: 2, status: "CONFIRMÉ", sources: SOURCES }),
    /summary/
  );
  assert.throws(() => validateObservation({ claim: "a".repeat(20), summary: "résumé correct", rating: 2, status: "INVENTÉ", sources: SOURCES }), /statut/);
  assert.throws(
    () => validateObservation({ claim: "a".repeat(20), summary: "résumé correct", rating: 2, status: "CONFIRMÉ", sources: ["une seule"] }),
    /deux sources/
  );
  assert.throws(() => validateObservation({ ...obs(), id: "CLAIM-1" }), /malformé/);
});

/* ---------- persistance ---------- */

test("fiche d'affirmation : aller-retour écriture / lecture", () => {
  const claim = {
    id: "CLAIM-20260918-003",
    title: "Interdiction nationale des rassemblements",
    claim: "Le ministère de l'Intérieur aurait interdit les rassemblements : dans toute la France",
    aliases: ["Une interdiction générale des rassemblements aurait été décidée"],
    fingerprint: "abc123",
    category: "verification",
    status: "TRÈS PROBABLEMENT FAUX",
    rating: 2,
    previous_rating: 7,
    evidence_confidence: 8,
    follow_up: "en-cours",
    first_seen: "2026-09-18T20:00:00+02:00",
    last_checked: "2026-09-18T23:00:00+02:00",
    last_published: "2026-09-18T23:00:00+02:00",
    ratings: [
      { at: "2026-09-18T20:00:00+02:00", rating: 7, status: "INCERTAIN", event: "nouvelle", note: "première évaluation" },
      { at: "2026-09-18T23:00:00+02:00", rating: 2, status: "TRÈS PROBABLEMENT FAUX", event: "retournement", note: "démenti officiel" },
    ],
    sources: ["AFP Factuel — démenti | https://a", "Reuters — enquête | https://b"],
    evidence: ["Le communiqué cité ne contient pas la phrase", "Le compte d'origine a supprimé sa publication"],
    events: [{ at: "2026-09-18T23:00:00+02:00", type: "retournement", path: "verification/alerts/2026/09/x.md" }],
  };

  const round = parseClaim(renderClaim(claim));
  assert.equal(round.id, claim.id);
  assert.equal(round.claim, claim.claim, "les deux-points ne doivent pas casser le front matter");
  assert.equal(round.rating, 2);
  assert.equal(round.previous_rating, 7);
  assert.equal(round.evidence_confidence, 8);
  assert.equal(round.status, "TRÈS PROBABLEMENT FAUX");
  assert.deepEqual(round.evidence, claim.evidence);
  assert.deepEqual(round.aliases, claim.aliases);
  assert.equal(round.ratings.length, 2);
  assert.equal(round.ratings[1].rating, 2);
  assert.equal(round.ratings[1].status, "TRÈS PROBABLEMENT FAUX");
  assert.equal(round.events[0].path, "verification/alerts/2026/09/x.md");
  assert.equal(round.sources.length, 2);
});

test("index : rendu, relecture et élagage des dossiers clos anciens", () => {
  const now = new Date("2026-09-18T12:00:00+02:00");
  const claims = [
    { id: "CLAIM-20260918-001", rating: 2, status: "FAUX / RÉFUTÉ", follow_up: "en-cours", last_checked: "2026-09-18T11:00:00+02:00", claim: "Affirmation en cours" },
    { id: "CLAIM-20260701-001", rating: 1, status: "FAUX / RÉFUTÉ", follow_up: "clos", last_checked: "2026-07-01T11:00:00+02:00", claim: "Vieux dossier clos" },
    { id: "CLAIM-20260915-001", rating: 3, status: "INCERTAIN", follow_up: "clos", last_checked: "2026-09-15T11:00:00+02:00", claim: "Dossier clos récent" },
  ];
  const text = renderIndex(claims, now);
  const parsed = parseIndex(text);
  assert.deepEqual(parsed.map((p) => p.id), ["CLAIM-20260918-001", "CLAIM-20260915-001"]);
  assert.equal(parsed[0].rating, 2);
  assert.equal(parsed[0].claim, "Affirmation en cours");
  assert.ok(!text.includes("CLAIM-20260701-001"), "un dossier clos de plus de 30 jours sort de l'index");
});

/* ---------- utilitaires ---------- */

test("slugify : ASCII, borné, sans tiret final", () => {
  const s = slugify("Élection « présidentielle » : résultats contestés — 2026", 30);
  assert.match(s, /^[a-z0-9-]+$/);
  assert.ok(s.length <= 30);
  assert.ok(!s.endsWith("-"));
});

test("parisISO : format et décalage horaire", () => {
  assert.equal(parisISO(new Date("2026-09-18T20:35:00Z")), "2026-09-18T22:35:00+02:00");
  assert.equal(parisISO(new Date("2026-01-15T10:00:00Z")), "2026-01-15T11:00:00+01:00");
});

test("parisISO : les secondes ne faussent pas le décalage", () => {
  // Une horloge non alignée sur la minute produisait « +01:59 ».
  for (const s of ["00", "01", "29", "30", "31", "59"]) {
    const iso = parisISO(new Date(`2026-09-18T20:35:${s}.750Z`));
    assert.equal(iso, "2026-09-18T22:35:00+02:00", `secondes = ${s}`);
    assert.match(iso, /T\d{2}:\d{2}:00[+-]\d{2}:00$/);
  }
  assert.equal(parisISO(new Date("2026-01-15T10:00:47Z")), "2026-01-15T11:00:00+01:00");
});
