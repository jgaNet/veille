// Version condensée des récapitulatifs dans feeds/all.xml.
import test from "node:test";
import assert from "node:assert/strict";

import { condense } from "../lib/digest.mjs";

const LINK = "https://exemple.test/brief.md";

const BRIEF = `# Brief mondial — 19 septembre 2026

Texte d'introduction qui ne doit pas être repris.

## 🌍 Géopolitique

### 1. Pays X — un événement — confiance 8/10 🟢

Un long paragraphe de détail.

**Ce qui est établi.** Encore du détail.

- une puce de détail qui ne doit pas sortir

### 2. Pays Y — autre événement — confiance 6/10 🟠

Détail.

## 💰 Économie

### 3. Banque Z relève son taux — confiance 10/10 🟢

Détail.

## 🧭 Ce qu'il faut retenir

**1. Première évolution de fond, sur
deux lignes.** Explication longue à ne pas reprendre.

**2. Seconde évolution.** Explication.

## 👀 À surveiller demain

- Une échéance
`;

test("brief à titres : résumé, titres par rubrique, points à retenir, lien", () => {
  const md = condense({ body: BRIEF, summary: "Résumé du jour.", link: LINK });

  assert.match(md, /^Résumé du jour\./);
  assert.match(md, /\*\*🌍 Géopolitique\*\*/);
  assert.match(md, /- Pays X — un événement — 8\/10 🟢/);
  assert.match(md, /- Pays Y — autre événement — 6\/10 🟠/);
  assert.match(md, /\*\*💰 Économie\*\*/);
  assert.match(md, /- Banque Z relève son taux — 10\/10 🟢/);
  assert.match(md, /- Première évolution de fond, sur deux lignes\./);
  assert.match(md, /- Seconde évolution\./);
  assert.ok(md.endsWith(`[Lire le brief complet](${LINK})`));

  assert.ok(!md.includes("long paragraphe"), "pas de corps d'article");
  assert.ok(!md.includes("puce de détail"), "pas de puces internes aux articles");
  assert.ok(!md.includes("Explication"), "seule la phrase clé est reprise");
  assert.ok(!md.includes("Une échéance"), "« À surveiller » n'est pas repris");
  assert.ok(md.length < BRIEF.length / 2, "nettement plus court que le brief");
});

test("bulletin à puces (fact-check) : une ligne par affirmation, sans lien interne", () => {
  const body = `# Bulletin

Préambule.

## Passage de 01 h 25

- [FAUX · 2/10] Candidat A — une affirmation — [vérification](../../alerts/a.md)

## Passage de 06 h 22

- [TROMPEUR · 3/10] Candidat B — autre affirmation — [vérification](../../alerts/b.md)
`;
  const md = condense({ body, summary: "", link: LINK });
  assert.match(md, /- \[FAUX · 2\/10\] Candidat A — une affirmation\n/);
  assert.match(md, /- \[TROMPEUR · 3\/10\] Candidat B — autre affirmation\n/);
  assert.ok(!md.includes("vérification"), "le lien relatif est retiré");
  assert.ok(!md.includes("Passage de"), "les titres de passage ne sont pas repris");
});

test("au-delà de 15 titres, le reste est compté", () => {
  const body = Array.from({ length: 18 }, (_, i) => `### ${i + 1}. Titre ${i + 1} — note 7/10`).join("\n\n");
  const md = condense({ body, summary: "", link: LINK });
  assert.match(md, /- Titre 15 — 7\/10/);
  assert.ok(!md.includes("Titre 16"));
  assert.match(md, /… et 3 autre\(s\)/);
});

test("brief sans structure : résumé et lien seulement", () => {
  const md = condense({ body: "Rien de corroboré aujourd'hui.", summary: "Journée calme.", link: LINK });
  assert.equal(md, `Journée calme.\n\n[Lire le brief complet](${LINK})`);
});
