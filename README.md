# veille

Système personnel de veille sur l'actualité, publié sous forme de fichiers Markdown et consultable via plusieurs flux RSS.

Objectif : détecter les événements réellement importants, les vérifier à partir de plusieurs sources indépendantes, et distinguer clairement faits établis, déclarations, informations incertaines, analyses et informations fausses.

## S'abonner

| Flux | URL RSS |
|------|---------|
| Monde | https://jganet.github.io/veille/feeds/monde.xml |
| Vérification | https://jganet.github.io/veille/feeds/verification.xml |
| Présidentielle 2027 | https://jganet.github.io/veille/feeds/presidentielle-2027-factcheck.xml |
| Tous les flux | https://jganet.github.io/veille/feeds/all.xml |

Page d'accueil : https://jganet.github.io/veille/

Coller l'URL dans un lecteur RSS (Feedly, Inoreader, NetNewsWire, Feeder,
Thunderbird, FreshRSS…). Les fichiers sont publiés par GitHub Pages à chaque
passage de veille.

## Flux

Chaque flux vit dans son propre dossier et génère son propre RSS.

| Flux | Dossier | Périmètre |
|------|---------|-----------|
| monde | `monde/` | Géopolitique, France/Europe, économie, énergie, tech/IA, cybersécurité, science, climat |
| verification | `verification/` | Affirmations d'actualité potentiellement fausses, trompeuses ou hors contexte, suivies dans le temps |
| presidentielle-2027-factcheck | `presidentielle-2027-factcheck/` | Vérification, affirmation par affirmation, des déclarations des candidats et des partis pour la présidentielle française de 2027 |

D'autres flux pourront être ajoutés selon le même modèle.

Flux générés : `feeds/monde.xml`, `feeds/verification.xml`,
`feeds/presidentielle-2027-factcheck.xml` et `feeds/all.xml` (agrégé). Les
consignes opérationnelles de chaque flux vivent dans son dossier
(`monde/CONSIGNES.md`, `verification/CONSIGNES.md`,
`presidentielle-2027-factcheck/CONSIGNES.md`).

## Structure d'un flux

```
<flux>/
  alerts/YYYY/MM/YYYY-MM-DD-HH-MM-slug.md   # alertes horaires
  daily/YYYY/MM/YYYY-MM-DD-brief-<flux>.md   # récapitulatif quotidien (20 h, Paris)
```

Un dossier racine est reconnu comme flux dès qu'il contient `alerts/` ou
`daily/` ; `feed.json` y précise le titre et la description du flux RSS.

Le flux `verification` ajoute à ce socle une couche de persistance, parce qu'il
suit des affirmations dans la durée plutôt que des événements ponctuels :

```
verification/
  claims/YYYY/MM/CLAIM-YYYYMMDD-NNN.md   # fiche durable d'une affirmation, mise à jour
  alerts/YYYY/MM/…                        # entrées RSS, une par évolution publiable
  state/affirmations.md                   # mémoire anti-doublon
```

Seul `alerts/` alimente le RSS. Une affirmation vérifiée dix fois sans
évolution n'engendre qu'une seule entrée : voir
[`verification/CONSIGNES.md`](verification/CONSIGNES.md).

Le flux `presidentielle-2027-factcheck` reprend cette couche de persistance et
le moteur d'identité des affirmations (`scripts/lib/claims.mjs`). Il y ajoute
ce qui est propre au fact-checking politique (`scripts/lib/factcheck.mjs`) :
verdict et note de vérité par affirmation, attribution à un auteur et à un
parti, mesure des reprises sans republication, corrections traçables et
bulletin du jour dans `daily/`. Une fiche décrit une affirmation, jamais un
candidat : aucune note n'est agrégée par auteur, par parti ou par programme.
Voir [`presidentielle-2027-factcheck/CONSIGNES.md`](presidentielle-2027-factcheck/CONSIGNES.md).

## Front matter

Chaque fichier commence par un front matter YAML utilisé pour générer le RSS.

Alerte :

```yaml
---
title: "Titre de l'actualité"
date: 2026-09-18T22:00:00+02:00
type: alert
feed: monde
category: geopolitique
confidence: 9
summary: "Résumé très court de l'information."
---
```

Briefing quotidien :

```yaml
---
title: "Brief mondial — 18 septembre 2026"
date: 2026-09-18T20:00:00+02:00
type: daily
feed: monde
category: briefing
---
```

## Indice de confiance

Note sur 10 mesurant la solidité des preuves, jamais l'importance de l'information.

| Note | Signification |
|------|---------------|
| 9–10 | Très solidement établi — source primaire vérifiable ou plusieurs sources indépendantes concordantes |
| 7–8  | Solide — plusieurs sources crédibles concordent, détails à confirmer |
| 4–6  | Incertain — source unique, responsables anonymes, protagoniste du conflit, données incomplètes |
| 1–3  | Très faible — rumeur, affirmation non corroborée, éléments contradictoires |

## Règles

- Croisement obligatoire : une source primaire si elle existe, plus au moins deux sources journalistiques indépendantes. Deux reprises d'une même dépêche ne comptent pas pour deux.
- Décomposer les affirmations par niveau de certitude plutôt que donner une note globale.
- Les déclarations gouvernementales sont formulées comme telles, jamais converties en faits sans confirmation indépendante.
- Neutralité politique : distinguer fait → déclaration → analyse → opinion.
- Aucune répétition d'une information déjà publiée sauf évolution significative (nouvelle entrée, lien vers la précédente).
- Pas de réécriture de l'historique Git, jamais de push forcé.
- Fichiers existants non modifiés, sauf correction factuelle ou technique explicitement signalée.

## Un commit par passage

**Un passage de veille produit un seul commit**, quel que soit le nombre
d'alertes, de fiches ou de fichiers d'état écrits. Jamais un commit par
article.

Concrètement : rassembler tous les fichiers du passage — alertes, fiches
`claims/`, bulletin `daily/`, mémoire `state/` — et les écrire en une seule
opération. En local, `git add` puis un unique `git commit`. Via l'API GitHub,
l'endpoint « contents » crée un commit par fichier : utiliser l'API Git tree
(`push_files` côté connecteur MCP), qui écrit tout le lot d'un coup.

Trois raisons : l'historique reste lisible, l'état anti-doublon ne peut pas se
désynchroniser des alertes correspondantes (tout part ou rien ne part), et le
workflow `feeds` ne redéploie le site qu'une fois par passage au lieu d'une
fois par article.

Le message de commit récapitule le passage :

```
veille: 4 alertes — 19/09 08:00
```

## Outils

Aucune dépendance externe ; Node >= 18 suffit.

```bash
npm test                                            # tests du dépôt
node scripts/build-feeds.mjs                        # génère feeds/*.xml
node scripts/check-feeds.mjs                        # vérifie la validité des flux
node scripts/verif-record.mjs --input o.json        # enregistre des affirmations vérifiées
node scripts/verif-record.mjs --input o.json --dry-run   # simule sans rien écrire
node scripts/factcheck-record.mjs --input o.json    # enregistre des affirmations de campagne vérifiées
```

## Automatisation

`.github/workflows/feeds.yml` régénère les flux RSS de **tous** les flux à
chaque publication sur `main`, puis les publie sur GitHub Pages (source :
GitHub Actions). Il peut être déclenché à la main depuis l'onglet Actions.

La recherche elle-même est faite par les passages de veille (Cowork ou session
Claude), pas par GitHub Actions.

## Messages de commit

Un seul message par passage, qui décrit l'ensemble du lot :

```
veille: 4 alertes — 19/09 08:00
alert: 2 alertes — détroit d'Ormuz, BCE
daily: brief mondial 2026-09-18
verif: 2 affirmations publiées ou mises à jour
factcheck: 1 affirmation publiée, 2 reprises enregistrées
correction: PRES27-20260919-001, FAUX → IMPRÉCIS
```

Principe fondamental : 10 informations correctement vérifiées valent mieux que 30 informations simplement reprises. La fiabilité passe avant la vitesse.
