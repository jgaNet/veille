# Affirmations déjà vérifiées

Mémoire anti-doublon du flux `presidentielle-2027-factcheck`, régénérée par
`scripts/factcheck-record.mjs`. Chaque passage la lit avant de chercher.
Format : `- ID | verdict | note | premier auteur (parti) | occurrences | dernière occurrence | affirmation`

Une affirmation déjà listée n'est jamais republiée : une reprise, par le même
auteur ou par un autre, s'enregistre en réutilisant son `id`. Les fiches
complètes vivent dans `presidentielle-2027-factcheck/claims/` et ne sont jamais supprimées. Cet
index n'est pas élagué et n'est jamais agrégé par candidat ou par parti.

- PRES27-20260919-008 | TROMPEUR | 3/10 | Nicolas Dupont-Aignan (Debout la France) | 1 | 2026-09-18 | Il est le seul candidat à l'élection présidentielle de 2027 à proposer la sortie de la France de l'Union européenne.
- PRES27-20260919-009 | FAUX | 2/10 | Marine Le Pen (Rassemblement national) | 1 | 2026-09-17 | N'avoir pas voté contre les propositions de financement des services départementaux d'incendie et de secours (SDIS) examinées à l'Assemblée nationale en novembre 2025.
- PRES27-20260919-007 | NON VÉRIFIABLE | sans note | Édouard Philippe (Horizons) | 1 | 2026-09-17 | 301 personnes sont mortes par noyade en France durant l'été 2026.
- PRES27-20260919-006 | CONFIRMÉ | 8/10 | Édouard Philippe (Horizons) | 1 | 2026-09-17 | Les catastrophes naturelles coûtent environ 5 milliards d'euros par an en France.
- PRES27-20260919-002 | FAUX | 2/10 | Éric Zemmour (Reconquête) | 1 | 2026-09-17 | Un article du code des étrangers, datant de 1945, prévoit que tout étranger qui pèse sur les finances publiques doit être expulsé.
- PRES27-20260919-001 | CONFIRMÉ | 9/10 | Éric Zemmour (Reconquête) | 1 | 2026-09-17 | Les étrangers représentent 25 % des personnes détenues dans les prisons françaises.
- PRES27-20260919-005 | CONFIRMÉ | 8/10 | Bruno Retailleau (Les Républicains) | 1 | 2026-09-16 | Les retraites représentent un quart de la dépense publique en France.
- PRES27-20260919-004 | CONFIRMÉ | 8/10 | Olivier Faure (Parti socialiste) | 1 | 2026-09-16 | L'Espagne a engagé une régularisation pouvant concerner jusqu'à 500 000 personnes en situation irrégulière.
- PRES27-20260919-003 | IMPRÉCIS | 6/10 | Jordan Bardella (Rassemblement national) | 1 | 2026-09-11 | Édouard Philippe et Gabriel Attal ont augmenté en 2018 la fiscalité sur l'essence et les carburants.
