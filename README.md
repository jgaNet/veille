# veille

Système personnel de veille sur l'actualité, publié sous forme de fichiers Markdown et consultable via plusieurs flux RSS.

Objectif : détecter les événements réellement importants, les vérifier à partir de plusieurs sources indépendantes, et distinguer clairement faits établis, déclarations, informations incertaines, analyses et informations fausses.

## Flux

Chaque flux vit dans son propre dossier et génère son propre RSS.

| Flux | Dossier | Périmètre |
|------|---------|-----------|
| monde | `monde/` | Géopolitique, France/Europe, économie, énergie, tech/IA, cybersécurité, science, climat |
| presidentielle-2027-factcheck | `presidentielle-2027-factcheck/` | Vérification, affirmation par affirmation, des déclarations des candidats et des partis pour la présidentielle française de 2027 |

D'autres flux pourront être ajoutés selon le même modèle : un dossier à la racine avec ses
`CONSIGNES.md` (référence opérationnelle lue par les passages automatiques), un `feed.json`
facultatif (titre et description du RSS) et un dossier `state/` (mémoire anti-doublon).

Les flux RSS sont générés dans `feeds/<flux>.xml` (plus `feeds/all.xml`, tous flux confondus)
par `scripts/build-feeds.mjs`, exécuté par GitHub Actions à chaque publication sur `main`.
Abonnement : `https://raw.githubusercontent.com/jgaNet/veille/main/feeds/<flux>.xml`.

## Structure d'un flux

```
<flux>/
  alerts/YYYY/MM/YYYY-MM-DD-HH-MM-slug.md   # alertes horaires
  daily/YYYY/MM/YYYY-MM-DD-brief-<flux>.md   # récapitulatif quotidien (20 h, Paris)
```

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

Entrée de fact-checking (flux `presidentielle-2027-factcheck`, détail dans ses
[consignes](presidentielle-2027-factcheck/CONSIGNES.md)) :

```yaml
---
title: "[TROMPEUR · 3/10] Prénom Nom — « citation courte »"
date: 2026-09-19T10:47:00+02:00
type: factcheck
feed: presidentielle-2027-factcheck
category: emploi
id: emploi--affirmation-normalisee--prenom-nom
author: "Prénom Nom"
party: "Parti"
statement_date: 2026-09-18
claim: "Affirmation examinée."
context: "Interview — média, émission"
verdict: TROMPEUR
truth_score: 3
confidence_level: FORT
mensonge_etabli: false
source_url: "https://…"
summary: "Résumé de la vérification."
---
```

Dans ce flux, la note de vérité (`truth_score`) porte sur l'affirmation examinée et sur elle
seule ; aucune note globale n'est attribuée à un candidat, un parti ou un programme.
`scripts/check-factcheck.mjs` contrôle ces entrées et leur registre.

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

## Messages de commit

```
alert: nouvelle évolution concernant le détroit d'Ormuz
daily: brief mondial 2026-09-18
factcheck: Prénom Nom — chômage depuis 2022
correction: Prénom Nom — chômage depuis 2022
```

Principe fondamental : 10 informations correctement vérifiées valent mieux que 30 informations simplement reprises. La fiabilité passe avant la vitesse.
