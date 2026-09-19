# Flux `verification` — consignes de la veille

Ce fichier est la référence opérationnelle du flux `verification` : les
passages automatiques le lisent avant de travailler. Il détaille et complète
les règles générales du dépôt énoncées dans le [README](../README.md) ; en cas
d'écart, le README fait foi. Il suit le même esprit que
[`monde/CONSIGNES.md`](../monde/CONSIGNES.md), auquel il emprunte ses règles de
croisement des sources et de neutralité.

## Mission

Veille horaire sur les **affirmations d'actualité potentiellement fausses,
trompeuses, sorties de leur contexte ou très peu plausibles** qui circulent
réellement (reprises médiatiques, déclarations publiques, contenus viraux).

L'objet du flux n'est pas l'actualité : c'est l'affirmation. Chaque
affirmation suivie possède une fiche durable, un identifiant stable et un
historique de notes, ce qui permet de suivre son évolution — y compris un
retournement complet de l'évaluation.

**Principe fondamental :** mieux vaut une affirmation correctement réfutée ou
correctement corroborée que dix signalements approximatifs. Une affirmation
douteuse insuffisamment vérifiée reste en suivi ; elle n'est pas publiée.

## 1. Déroulé d'un passage horaire

1. Lire ce fichier, puis `verification/state/affirmations.md` (mémoire
   anti-doublon) et, si utile, les fiches concernées dans
   `verification/claims/`.
2. Chercher les affirmations qui circulent depuis le passage précédent :
   contenus viraux, déclarations publiques reprises sans vérification,
   chiffres invérifiables, images ou vidéos réutilisées hors contexte,
   « informations » contredites par une source primaire.
3. Vérifier chaque affirmation : source originale, source primaire, agences de
   presse, fact-checkers reconnus, document ou donnée d'origine.
4. Écrire le résultat dans un fichier JSON d'observations (format ci-dessous).
5. Passer ce fichier à `scripts/verif-record.mjs`, **qui décide seul** de
   l'attribution des identifiants, du dédoublonnage et de la publication ou
   non d'une entrée RSS.
6. Committer **en une seule fois** tout ce que le script a écrit (§ 10).

**Ne jamais écrire à la main dans `verification/claims/`,
`verification/alerts/` ou `verification/state/`.** Ces fichiers sont produits
par le script ; les éditer à la main casse la déduplication.

**Un passage sans aucune affirmation publiable est un résultat normal**, pas un
échec. En l'absence d'observation, ne rien produire.

## 2. Ce qui mérite d'être suivi

Retenir une affirmation lorsqu'elle est **à la fois** douteuse et
conséquente :

- elle circule réellement (reprise, virale, relayée par un responsable) ;
- elle porte sur un fait vérifiable, pas sur une opinion ;
- son caractère faux, trompeur ou hors contexte est démontrable, ou au moins
  sérieusement douteux au regard des sources disponibles.

Écarter : les désaccords d'interprétation, les prédictions, les opinions
politiques, les propos satiriques évidents, les rumeurs confidentielles sans
portée, et tout ce qui relève de la simple erreur de plume.

Une affirmation déjà suivie n'est pas resignalée : elle est **mise à jour** en
réutilisant son `id`, ou en reformulant l'affirmation à l'identique — le script
retrouve la fiche par empreinte ou par similarité.

## 3. Croisement obligatoire des sources

Comme pour le flux `monde` : une source primaire lorsqu'elle existe, plus au
moins deux sources journalistiques indépendantes. Deux reprises d'une même
dépêche Reuters, AP ou AFP ne comptent pas pour deux confirmations. Le script
refuse toute observation comportant moins de deux sources.

Sources utiles ici : la source **originale** de l'affirmation (indispensable),
les sources primaires du domaine concerné, les agences, les fact-checkers
reconnus (AFP Factuel, Reuters Fact Check, Les Décodeurs, Full Fact, Snopes),
les recherches d'image inversée pour les visuels.

Une affirmation gouvernementale est décrite comme une déclaration, jamais
convertie en fait établi sans confirmation indépendante. Neutralité politique :
l'évaluation porte sur les preuves, jamais sur le camp de l'auteur.

## 4. Les deux notes

| Champ | Ce qu'il mesure | Échelle |
| --- | --- | --- |
| `rating` | **Plausibilité de l'affirmation** : dans quelle mesure elle est vraie | 0 = réfutée, 10 = établie |
| `evidence_confidence` | **Solidité des preuves** de cette évaluation — l'indice de confiance habituel du dépôt | 1 à 10 |

Les deux sont indépendantes : une affirmation peut être notée 1/10
(très probablement fausse) avec une confiance de 9/10 (démenti officiel
documenté), ou 3/10 avec une confiance de 4/10 (douteuse, mais faute de
sources).

Libellés de `rating` utilisés dans les titres RSS :

| Note | Libellé |
| --- | --- |
| 9–10 🟢 | CONFIRMÉ |
| 7–8 🟢 | PLAUSIBLE |
| 5–6 🟠 | INCERTAIN |
| 3–4 🟠 | DOUTEUX |
| 1–2 🔴 | TRÈS IMPROBABLE |
| 0 🔴 | RÉFUTÉ |

Ne jamais présenter une probabilité subjective comme une mesure scientifique.

## 5. Statuts

Valeurs autorisées pour `status`, reprises de la section « fake news » des
consignes du flux `monde` :

`CONFIRMÉ`, `PROBABLE`, `INCERTAIN`, `TRÈS PROBABLEMENT FAUX`,
`FAUX / RÉFUTÉ`, `HORS CONTEXTE`, `TROMPEUR`.

`HORS CONTEXTE` : les faits sont exacts mais leur présentation induit en
erreur. `TROMPEUR` : l'affirmation mélange vrai et faux.

Suivi (`follow_up`) : `en-cours` (vérification active), `en-attente`
(éléments manquants, à revoir), `clos` (dossier stabilisé, plus de
vérification attendue).

## 6. Format des observations

Le passage écrit un tableau JSON. Un objet par affirmation :

```json
[
  {
    "id": "CLAIM-20260918-004",
    "claim": "Affirmation canonique, reformulée de façon neutre et complète, en une phrase vérifiable.",
    "title": "Résumé court, utilisé dans le titre RSS après le crochet",
    "summary": "Une ou deux phrases pour la description RSS.",
    "rating": 2,
    "status": "TRÈS PROBABLEMENT FAUX",
    "evidence_confidence": 8,
    "category": "verification",
    "significance": "haute",
    "follow_up": "en-cours",
    "context": "Où l'affirmation circule, depuis quand, sous quelle forme.",
    "note": "Pourquoi cette note, en une ou deux phrases.",
    "change": "Ce qui a changé depuis la dernière vérification (mises à jour seulement).",
    "major_evidence": false,
    "evidence": [
      "Le communiqué original ne contient pas la phrase citée.",
      "La photo est référencée dans les archives AFP en mars 2019."
    ],
    "sources": [
      "Source originale — compte X de … | https://…",
      "AFP Factuel — … | https://…",
      "Reuters — … | https://…"
    ]
  }
]
```

Champs obligatoires : `claim` (≥ 15 caractères), `summary`, `rating`,
`status`, et au moins deux `sources`. Tout le reste est facultatif.

- `id` : à fournir **uniquement** pour mettre à jour une fiche existante dont
  l'identifiant est connu. Sinon l'omettre : le script apparie l'affirmation
  ou en crée une.
- `significance` : `haute`, `moyenne` (défaut) ou `faible`. Une nouveauté
  `faible` est enregistrée mais pas publiée.
- `major_evidence` : `true` uniquement si une preuve réellement nouvelle et
  importante justifie une entrée RSS alors que la note n'a pas bougé.
- `sources` : format `Intitulé | URL`.

Le fichier d'observations est un fichier de travail : il n'est pas commité
(voir `.gitignore`).

## 7. Enregistrement

```bash
node scripts/verif-record.mjs --input observations.json      # enregistre
node scripts/verif-record.mjs --input observations.json --dry-run   # simule
node scripts/build-feeds.mjs                                 # régénère les flux
node scripts/check-feeds.mjs                                 # vérifie le XML
```

Le script :

1. charge toutes les fiches existantes ;
2. apparie chaque observation — identifiant explicite, puis empreinte exacte
   de l'affirmation, puis similarité de formulation (seuil 0,68), en refusant
   de fusionner deux énoncés contradictoires ;
3. attribue un identifiant stable `CLAIM-AAAAMMJJ-NNN` aux nouvelles
   affirmations, daté du jour de la **première** détection ;
4. met à jour la fiche : note actuelle, note précédente, historique complet,
   statut, confiance, sources, preuves, suivi, dernière vérification ;
5. n'écrit un fichier d'alerte — donc un item RSS — que si un seuil de
   publication est franchi ;
6. régénère `verification/state/affirmations.md`.

## 8. Règles de publication RSS

Une entrée n'est créée que dans l'un de ces cas :

| Cas | Condition | Titre |
| --- | --- | --- |
| Nouvelle affirmation | jamais vue, `rating` ≤ 6, importance ≥ moyenne | `[2/10 🔴 TRÈS IMPROBABLE] Résumé de l'affirmation` |
| Changement de statut | `status` différent du précédent | `[MISE À JOUR ↑ 3→7/10] Résumé de l'affirmation` |
| Évolution de la note | écart ≥ 2 points | `[MISE À JOUR ↓ 7→4/10] Résumé de l'affirmation` |
| Preuve importante | `major_evidence: true` et preuve inédite | `[MISE À JOUR → 4→4/10] Résumé de l'affirmation` |
| Retournement | bascule franche (≥ 7 ↔ ≤ 3) avec un écart ≥ 5 | `[🚨 RETOURNEMENT 8→1/10] Résumé de l'affirmation` |

Dans tous les autres cas, **rien n'est publié** : la fiche enregistre la
vérification (`dernière vérification`, historique) et le flux reste silencieux.
Une affirmation vérifiée dix fois sans évolution produit une seule entrée RSS.

Une affirmation nouvelle notée 7/10 ou plus n'est pas publiée : elle est
plausible, elle n'a pas sa place dans ce flux — mais elle est suivie, et un
retournement ultérieur sera publié.

## 9. Structure des fichiers

```
verification/
  CONSIGNES.md                                  # ce fichier
  feed.json                                     # titre et description du flux RSS
  claims/AAAA/MM/CLAIM-AAAAMMJJ-NNN.md          # fiches durables, mises à jour
  alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-slug.md       # entrées RSS, jamais modifiées
  state/affirmations.md                         # mémoire anti-doublon
```

Seul `alerts/` alimente le RSS : c'est le mécanisme existant de
`scripts/build-feeds.mjs`, inchangé. Les fiches et l'index en sont exclus par
construction.

## 10. Publication

- **Un seul commit par passage**, jamais un commit par affirmation ou par
  fichier. Le script écrit d'un coup les fiches `claims/`, les entrées
  `alerts/` et `state/affirmations.md` : tout part ensemble. En local,
  `git add` puis un unique `git commit` ; via l'API GitHub, l'API Git tree
  (`push_files` côté connecteur MCP) et non l'endpoint « contents », qui crée
  un commit par fichier. Une fiche séparée de l'alerte qui la cite, ou un
  index désynchronisé, casserait la déduplication.
- Message de commit : `verif: …`, récapitulatif du passage — par exemple
  `verif: 2 affirmations publiées ou mises à jour`.
- Les fichiers de `alerts/` ne sont jamais modifiés après publication ; une
  évolution donne lieu à une nouvelle entrée, reliée par le `claim_id`.
- Les fiches de `claims/` sont mises à jour en place : leur historique est la
  mémoire du flux. **Aucune fiche n'est jamais supprimée.**
- Jamais de réécriture d'historique Git, jamais de push forcé.
- Le flux RSS suffit au suivi : aucun e-mail ni notification séparée.
