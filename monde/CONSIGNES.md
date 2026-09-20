# Flux `monde` — consignes de la veille

Ce fichier est la référence opérationnelle du flux `monde` : les passages
automatiques le lisent avant de travailler. Il détaille et complète les règles
générales du dépôt énoncées dans le [README](../README.md) ; en cas d'écart, le
README fait foi. Modifier ce fichier modifie le comportement de la veille —
aucune autre configuration n'est à changer.

## Mission

Système personnel de veille sur l'actualité mondiale. Les résultats sont des
fichiers Markdown déposés dans ce dépôt, consultables via le flux RSS
(`feeds/monde.xml`).

L'objectif n'est pas de maximiser le nombre d'informations, mais de détecter les
événements réellement importants, de les vérifier à partir de plusieurs sources
indépendantes et de distinguer clairement :

- les faits établis ;
- les déclarations ;
- les informations encore incertaines ;
- les analyses ou interprétations ;
- les informations fausses ou trompeuses lorsqu'elles peuvent être vérifiées
  comme telles.

**Principe fondamental :** 10 informations correctement vérifiées plutôt que 30
informations simplement reprises. La vitesse est secondaire par rapport à la
fiabilité. Si une information spectaculaire n'est pas suffisamment corroborée,
signaler son incertitude ou attendre davantage de confirmation plutôt que de la
présenter comme un fait.

## 1. Veille horaire

Toutes les heures, rechercher les informations importantes apparues depuis le
précédent passage. Pour chaque nouvelle alerte, créer un fichier Markdown.

Domaines couverts :

- géopolitique et conflits ;
- France et Europe ;
- économie et marchés ;
- énergie ;
- technologie ; de l'IA, uniquement les événements de portée géopolitique ou
  économique mondiale — le reste relève du flux `ia` (`ia/CONSIGNES.md`) ;
- cybersécurité ;
- science ;
- climat et environnement ;
- événements internationaux majeurs.

Ne pas répéter une information déjà publiée, sauf évolution significative. Dans
ce cas, créer une nouvelle entrée en indiquant clairement ce qui a changé et en
renvoyant vers l'entrée précédente (lien vers le fichier précédent dans le
corps de la nouvelle alerte).

**S'il n'y a aucune évolution suffisamment importante, ne créer aucun fichier.**
Un passage sans publication est un résultat normal et attendu, pas un échec.

## 2. Croisement obligatoire des sources

Pour chaque information importante, chercher idéalement :

1. une source primaire lorsqu'elle existe ;
2. au moins deux sources journalistiques indépendantes.

Sources primaires possibles : gouvernement, ONU, Union européenne, banque
centrale, tribunal, organisme scientifique, entreprise directement concernée,
publication scientifique, données officielles.

Pour les médias, diversifier les origines lorsque c'est pertinent : Reuters,
Associated Press, AFP, BBC, France 24, Le Monde, Financial Times, The Guardian,
DW, Al Jazeera, médias locaux fiables.

**Deux sites reprenant la même dépêche Reuters, AP ou AFP ne constituent pas
deux confirmations indépendantes.** Rechercher autant que possible la source
originale de l'information.

## 3. Indice de confiance

Un indice sur 10 par information. Il mesure la solidité des preuves
disponibles, et non l'importance de la nouvelle.

| Indice | Signification | Typiquement |
| --- | --- | --- |
| 9–10 🟢 | Très solidement établi | source primaire vérifiable, plusieurs sources indépendantes concordantes, données ou documents directement accessibles |
| 7–8 🟢 | Solide | plusieurs sources crédibles concordent, certains détails restent à confirmer |
| 4–6 🟠 | Incertain | une seule source, responsables anonymes, gouvernement impliqué dans le conflit, données incomplètes |
| 1–3 🔴 | Très faible | rumeur, affirmation non corroborée, éléments contradictoires, preuves insuffisantes |

Ne jamais présenter une probabilité subjective comme une mesure scientifique.

## 4. Décomposer les affirmations

Une même actualité contient plusieurs niveaux de certitude. Préférer la
décomposition à une note unique artificielle. Exemple :

- Une explosion a eu lieu — 9/10
- Le pays X affirme en être responsable — 10/10 (sur l'existence de la
  déclaration)
- Le pays X est effectivement responsable — 6/10
- La motivation supposée de l'attaque — 3/10

Le champ `confidence` du front matter porte alors l'indice du fait central, et
le corps détaille la décomposition.

## 5. Guerre et géopolitique

Prudence particulière sur : nombre de morts, territoires capturés, destruction
de matériel, responsabilité d'une attaque, déclarations militaires,
renseignements, motivations supposées.

Une déclaration gouvernementale est formulée comme telle :

> « Le ministère ukrainien de la Défense affirme que… »

et non « L'Ukraine a détruit… », tant qu'une confirmation indépendante
suffisante n'existe pas.

## 6. Politique

Rester neutre. Distinguer systématiquement : fait → déclaration → analyse →
opinion. Ne pas transformer l'interprétation d'un journaliste ou d'un
responsable politique en fait établi.

## 7. Fake news et informations virales

Lorsqu'une information importante devient virale mais paraît douteuse, la
vérifier : source originale, sources primaires, agences de presse,
fact-checkers reconnus, images ou vidéos originales.

Conclure par un statut explicite, avec les preuves disponibles :
`CONFIRMÉ`, `PROBABLE`, `INCERTAIN`, `TRÈS PROBABLEMENT FAUX`, `FAUX / RÉFUTÉ`.

## 8. Format d'une alerte horaire

Un fichier Markdown par alerte, chemin
`monde/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-titre-court.md` (heure de Paris).

```markdown
---
title: "🆕 [Pays/thème] — [titre]"
date: 2026-09-18T15:40:00+02:00
type: alert
feed: monde
category: geopolitique
confidence: 8
summary: "Résumé en une ou deux phrases, utilisé par le flux RSS."
---

# 🆕 [Pays/thème] — [titre]

**Date de publication :** 18 septembre 2026, 15 h 40 (heure de Paris)
**Confiance : 8/10 🟢**

Résumé de l'événement en quelques paragraphes.

## Confirmé

Ce que plusieurs sources permettent d'établir.

## Incertain

Ce qui n'est pas encore suffisamment corroboré.

## Décomposition des affirmations

- Affirmation A — 9/10
- Affirmation B — 6/10

## Pourquoi 8/10 ?

Explication en une ou deux phrases.

## Sources

- **Source primaire** — [intitulé](https://…)
- [Reuters — intitulé](https://…)
- [Le Monde — intitulé](https://…)
```

Valeurs de `category` (une seule par alerte, la principale) : `geopolitique`,
`france`, `europe`, `economie`, `energie`, `tech-ia`, `cybersecurite`, `science`,
`climat`, `international`, `verification`.

Les sources ne figurent pas dans le front matter : elles vivent dans la section
`## Sources` du corps, avec liens directs. En cas d'évolution d'un sujet déjà
publié, la nouvelle alerte renvoie en clair vers le fichier précédent dans son
corps.

Ne publier une alerte que si l'information est réellement nouvelle ou constitue
une évolution importante.

## 9. Récapitulatif quotidien

Chaque jour à 20 h (heure de Paris), un fichier
`monde/daily/AAAA/MM/AAAA-MM-JJ-brief-monde.md`, avec `type: daily`,
`feed: monde` et `category: briefing`.

8 à 12 informations maximum, classées par importance plutôt que par heure de
publication. Structure :

- 🌍 Géopolitique
- 🇫🇷 France / 🇪🇺 Europe
- 💰 Économie
- 🤖 Technologie / IA
- 🔬 Science
- 🌡️ Climat

Pour chaque événement : titre — confiance X/10, résumé court, ce qui est
établi, ce qui reste incertain, sources croisées.

## 10. Synthèse du récapitulatif

Terminer le récapitulatif par :

### 🧭 Ce qu'il faut retenir

3 à 5 évolutions structurelles majeures de la journée, en expliquant pourquoi
elles sont importantes, sans dramatiser et sans présenter de prédictions comme
certaines.

### 👀 À surveiller demain

Uniquement les événements attendus susceptibles de faire évoluer
significativement l'actualité.

## 11. Publication et flux RSS

- Alertes : `monde/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-slug.md`
- Récapitulatifs : `monde/daily/AAAA/MM/AAAA-MM-JJ-brief-monde.md`
- Le front matter (`title`, `date`, `type`, `feed`, `category`, `confidence`,
  `summary`) alimente `feeds/monde.xml` et `feeds/all.xml`, régénérés
  automatiquement par GitHub Actions (`scripts/build-feeds.mjs`) à chaque
  publication. Ne jamais éditer ces fichiers à la main.
- **Un seul commit par passage**, jamais un commit par alerte : rassembler
  toutes les alertes du passage, le récapitulatif éventuel et la mise à jour de
  `state/derniers-sujets.md` dans une écriture unique. En local, `git add` puis
  un unique `git commit` ; via l'API GitHub, l'API Git tree (`push_files` côté
  connecteur MCP) et non l'endpoint « contents », qui crée un commit par
  fichier. Message récapitulatif : `alert: 3 alertes — 19/09 08:00`, ou
  `daily: brief mondial 2026-09-18`. Jamais de réécriture d'historique ni de
  push forcé.
- **Ne pas modifier les fichiers existants**, sauf pour corriger une erreur
  factuelle ou technique clairement identifiée. Toute correction importante est
  signalée dans le contenu concerné (section `## ✏️ Correction` datée).
- Le flux RSS suffit au suivi : aucun e-mail ni notification séparée.

## 12. Anti-doublon

`monde/state/derniers-sujets.md` tient la liste des sujets publiés récemment. Chaque
passage :

1. lit ce fichier avant de chercher ;
2. ne republie pas un sujet qui y figure, sauf évolution significative ;
3. ajoute en tête la ligne des sujets qu'il vient de publier
   (`- AAAA-MM-JJ HH:MM — sujet — chemin du fichier`) ;
4. élague les lignes de plus de 7 jours.

La mise à jour de ce fichier part **dans le même commit** que les alertes
qu'elle enregistre : l'état et le flux ne doivent jamais pouvoir diverger.
