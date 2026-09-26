# Flux `monde` — consignes de la veille

Référence opérationnelle du flux `monde`, lue par chaque passage automatique.
Complète les règles générales du [README](../README.md) ; en cas d'écart, le
README fait foi.

## Mission

Veille sur l'actualité mondiale, publiée en Markdown et via RSS
(`feeds/monde.xml`) : détecter les événements réellement importants, les
vérifier par plusieurs sources indépendantes, et distinguer faits établis,
déclarations, informations incertaines, analyses, et informations fausses ou
trompeuses.

**Principe fondamental :** 10 informations correctement vérifiées plutôt que 30
simplement reprises. Une information spectaculaire insuffisamment corroborée
est signalée comme incertaine, jamais présentée comme un fait.

## 1. Veille horaire

Toutes les heures, rechercher les informations importantes apparues depuis le
précédent passage et créer un fichier Markdown par nouvelle alerte.

Domaines couverts : géopolitique et conflits ; France et Europe ; économie et
marchés ; énergie ; technologie (de l'IA, uniquement les événements de portée
géopolitique ou économique mondiale — le reste relève du flux `ia`) ;
cybersécurité ; science ; climat et environnement (uniquement portée mondiale
— COP, catastrophe majeure, rapport de synthèse du GIEC — le reste relève du
flux `ecologie`) ; événements internationaux majeurs.

Ne pas répéter une information déjà publiée, sauf évolution significative :
nouvelle entrée précisant ce qui a changé, avec un lien vers l'entrée
précédente. **S'il n'y a aucune évolution suffisamment importante, ne créer
aucun fichier** : un passage sans publication est normal, pas un échec.

## 2. Croisement obligatoire des sources

Chercher : 1) une source primaire si elle existe (gouvernement, ONU, UE,
banque centrale, tribunal, organisme scientifique, entreprise concernée,
publication scientifique, données officielles) ; 2) au moins deux sources
journalistiques indépendantes, en diversifiant les origines (Reuters, AP,
AFP, BBC, France 24, Le Monde, Financial Times, The Guardian, DW, Al Jazeera,
médias locaux fiables).

**Deux sites reprenant la même dépêche Reuters, AP ou AFP ne comptent pas pour
deux confirmations indépendantes** : rechercher la source originale.

## 3. Indice de confiance

Un indice sur 10 par information, qui mesure la solidité des preuves, jamais
l'importance de la nouvelle.

| Indice | Signification | Typiquement |
| --- | --- | --- |
| 9–10 🟢 | Très solidement établi | source primaire vérifiable, plusieurs sources indépendantes concordantes, données ou documents directement accessibles |
| 7–8 🟢 | Solide | plusieurs sources crédibles concordent, certains détails restent à confirmer |
| 4–6 🟠 | Incertain | une seule source, responsables anonymes, gouvernement impliqué dans le conflit, données incomplètes |
| 1–3 🔴 | Très faible | rumeur, affirmation non corroborée, éléments contradictoires, preuves insuffisantes |

Ne jamais présenter une probabilité subjective comme une mesure scientifique.

## 4. Décomposer les affirmations

Une même actualité contient plusieurs niveaux de certitude ; préférer la
décomposition à une note unique artificielle. Exemple :

- Une explosion a eu lieu — 9/10
- Le pays X affirme en être responsable — 10/10 (existence de la déclaration)
- Le pays X est effectivement responsable — 6/10
- La motivation supposée de l'attaque — 3/10

Le champ `confidence` du front matter porte l'indice du fait central ; le
corps détaille la décomposition.

## 5. Guerre et géopolitique

Prudence particulière sur : morts, territoires capturés, destruction de
matériel, responsabilité d'une attaque, déclarations militaires,
renseignements, motivations supposées. Une déclaration gouvernementale est
formulée comme telle (« Le ministère ukrainien de la Défense affirme que… »),
jamais convertie en fait (« L'Ukraine a détruit… ») sans confirmation
indépendante suffisante.

## 6. Politique

Rester neutre : distinguer systématiquement fait → déclaration → analyse →
opinion, sans transformer l'interprétation d'un journaliste ou d'un
responsable politique en fait établi.

## 7. Fake news et informations virales

Lorsqu'une information importante devient virale mais paraît douteuse, la
vérifier (source originale, sources primaires, agences de presse,
fact-checkers reconnus, images ou vidéos originales) et conclure par un statut
explicite : `CONFIRMÉ`, `PROBABLE`, `INCERTAIN`, `TRÈS PROBABLEMENT FAUX`,
`FAUX / RÉFUTÉ`.

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
`france`, `europe`, `economie`, `energie`, `tech-ia`, `cybersecurite`,
`science`, `climat`, `international`, `verification`.

Les sources ne figurent pas dans le front matter : elles vivent dans la
section `## Sources` du corps, avec liens directs. En cas d'évolution d'un
sujet déjà publié, la nouvelle alerte renvoie en clair vers le fichier
précédent. Ne publier une alerte que si l'information est réellement nouvelle
ou constitue une évolution importante.

## 9. Récapitulatif quotidien

Chaque jour à 20 h (heure de Paris), un fichier
`monde/daily/AAAA/MM/AAAA-MM-JJ-brief-monde.md`, avec `type: daily`,
`feed: monde` et `category: briefing`.

8 à 12 informations maximum, classées par importance plutôt que par heure de
publication : 🌍 Géopolitique, 🇫🇷 France / 🇪🇺 Europe, 💰 Économie,
🤖 Technologie / IA, 🔬 Science, 🌡️ Climat.

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

- Alertes : `monde/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-slug.md` ; récapitulatifs :
  `monde/daily/AAAA/MM/AAAA-MM-JJ-brief-monde.md`.
- Le front matter (`title`, `date`, `type`, `feed`, `category`, `confidence`,
  `summary`) alimente `feeds/monde.xml` et `feeds/all.xml`, régénérés
  automatiquement par GitHub Actions (`scripts/build-feeds.mjs`). Ne jamais
  éditer ces fichiers à la main.
- **Un seul commit par passage** (règle générale : voir README) : alertes,
  récapitulatif éventuel et mise à jour de `state/derniers-sujets.md`
  ensemble, via `push_files`. Message : `alert: 3 alertes — 19/09 08:00`, ou
  `daily: brief mondial 2026-09-18`.
- **Ne pas modifier les fichiers existants**, sauf pour corriger une erreur
  factuelle ou technique clairement identifiée, signalée par une section
  `## ✏️ Correction` datée.
- Le flux RSS suffit au suivi : aucun e-mail ni notification séparée.

## 12. Anti-doublon

`monde/state/derniers-sujets.md` tient la liste des sujets publiés récemment.
Chaque passage :

1. lit ce fichier avant de chercher ;
2. ne republie pas un sujet qui y figure, sauf évolution significative ;
3. ajoute en tête la ligne des sujets qu'il vient de publier
   (`- AAAA-MM-JJ HH:MM — sujet — chemin du fichier`) ;
4. élague les lignes de plus de 7 jours.

La mise à jour de ce fichier part **dans le même commit** que les alertes
qu'elle enregistre : l'état et le flux ne doivent jamais pouvoir diverger.
