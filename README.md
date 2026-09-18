# veille

Système personnel de veille sur l'actualité, publié sous forme de fichiers Markdown et consultable via plusieurs flux RSS.

Objectif : détecter les événements réellement importants, les vérifier à partir de plusieurs sources indépendantes, et distinguer clairement faits établis, déclarations, informations incertaines, analyses et informations fausses.

## Flux

Chaque flux vit dans son propre dossier et génère son propre RSS.

| Flux | Dossier | Périmètre |
|------|---------|-----------|
| monde | `monde/` | Géopolitique, France/Europe, économie, énergie, tech/IA, cybersécurité, science, climat |

D'autres flux pourront être ajoutés selon le même modèle.

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
```

Principe fondamental : 10 informations correctement vérifiées valent mieux que 30 informations simplement reprises. La fiabilité passe avant la vitesse.
