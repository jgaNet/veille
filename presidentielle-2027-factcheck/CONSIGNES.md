# Flux `presidentielle-2027-factcheck` — consignes de la veille

Ce fichier est la référence opérationnelle du flux `presidentielle-2027-factcheck` :
les passages automatiques le lisent avant de travailler. Il complète les règles
générales du dépôt énoncées dans le [README](../README.md) ; en cas d'écart, le
README fait foi. Il emprunte au flux [`monde`](../monde/CONSIGNES.md) ses règles de
croisement des sources et de neutralité, et au flux
[`verification`](../verification/CONSIGNES.md) son fonctionnement : le passage
écrit des observations, un script décide seul de l'identité des affirmations,
du dédoublonnage et de la publication.

## Mission

Vérifier, une par une, les affirmations factuelles vérifiables contenues dans
les nouvelles déclarations publiques des candidats et des partis engagés dans
l'élection présidentielle française de 2027. Les résultats sont des fichiers
Markdown déposés dans ce dépôt, consultables via le flux RSS
(`feeds/presidentielle-2027-factcheck.xml`).

**Principe fondamental.** Le système ne répond jamais à « quel candidat ment le
plus ? ». Il répond à : « cette affirmation précise est-elle soutenue par les
meilleures preuves disponibles ? ». Chaque verdict doit pouvoir être audité et
reproduit à partir des sources enregistrées.

Conséquences directes :

- on ne juge pas si une personnalité est « honnête » ou « menteuse » ;
- aucune note globale n'est attribuée à un candidat, un parti, une idéologie
  ou un programme — ni dans une entrée, ni dans un bulletin, ni dans un
  classement, ni dans un décompte par parti ;
- la précision prime sur la quantité : un passage sans publication est un
  résultat normal et attendu, pas un échec. Ne jamais inventer une conclusion
  pour remplir le flux.

## 1. Périmètre

Déclarations émises **directement** par :

- les candidats déclarés à la présidentielle de 2027 ;
- les candidats potentiels ou pressentis lorsqu'ils participent clairement au
  débat présidentiel ;
- les partis qui soutiennent ces candidats, leurs dirigeants et porte-parole
  s'exprimant au nom du parti ;
- leurs comptes et communications officielles.

La liste indicative des acteurs est tenue dans
[`state/acteurs.md`](state/acteurs.md). Elle n'est ni exhaustive ni figée : un
passage qui constate une nouvelle candidature, un retrait ou un ralliement la
met à jour, source à l'appui.

## 2. Où chercher

Déclarations : interviews, discours, débats, conférences de presse, communiqués
officiels, sites officiels des partis et des candidats, publications officielles
sur les réseaux sociaux, vidéos ou transcriptions, articles rapportant
directement une déclaration.

Vérification : AFP Factuel, Les Décodeurs (Le Monde), CheckNews (Libération),
Les Vérificateurs (TF1/LCI), Vrai ou Faux (franceinfo), Les Observateurs
(France 24), fact-checkers européens reconnus (réseau EFCSN/EDMO).

**Un fact-checker n'est jamais une vérité suffisante à lui seul** lorsqu'une
source primaire ou des données officielles permettent de vérifier directement
l'affirmation : il sert alors de piste et de recoupement, pas de preuve finale.

## 3. Hiérarchie des preuves

Pour chaque affirmation, rechercher autant que possible, dans cet ordre :

1. la source primaire de la déclaration (vidéo, transcription, communiqué,
   publication officielle) ;
2. le texte de loi, de règlement ou le document officiel concerné ;
3. les statistiques officielles (Insee, Dares, DREES, SSMSI, Eurostat, Banque
   de France, Cour des comptes, etc.) ;
4. les institutions publiques françaises ou européennes ;
5. les organismes scientifiques ou académiques reconnus ;
6. plusieurs médias indépendants ;
7. les fact-checkers reconnus.

La source primaire sert d'abord à établir **ce qui a réellement été dit**. Ne
pas vérifier une citation uniquement à partir d'un article qui paraphrase les
propos : sans source primaire consultée, l'observation ne comporte pas de
`quote` — l'entrée présente alors une paraphrase fidèle et non une citation —
et le niveau de confiance en tient compte. Le script refuse une `quote` sans
`statement_url`.

## 4. Extraction des affirmations

Dans chaque nouvelle déclaration, ne retenir que les propositions réellement
factuelles et vérifiables.

| Exemple | Traitement |
| --- | --- |
| « Le chômage a augmenté de 20 % depuis 2022. » | Vérifiable → à vérifier |
| « Cette politique est catastrophique. » | Opinion → ne pas noter |
| « Cette réforme va ruiner la France. » | Prédiction/opinion → ne pas noter, sauf si elle contient aussi une affirmation quantitative vérifiable |

Séparer les affirmations lorsqu'une même phrase en contient plusieurs : une
entrée = une affirmation.

## 5. Verdicts

| Verdict | Définition |
| --- | --- |
| `CONFIRMÉ` | Les éléments disponibles confirment substantiellement l'affirmation. |
| `IMPRÉCIS` | L'idée générale est fondée, mais chiffres, dates, ordres de grandeur ou formulations présentent une erreur limitée. |
| `TROMPEUR` | L'affirmation repose sur un élément réel mais omet un contexte essentiel ou présente les faits d'une manière susceptible de conduire à une conclusion incorrecte. |
| `FAUX` | Les meilleures preuves disponibles contredisent clairement l'affirmation. |
| `TRÈS PROBABLEMENT FAUX` | Les preuves rendent l'affirmation extrêmement improbable, sans démonstration totalement définitive. |
| `NON VÉRIFIABLE` | Les informations disponibles ne permettent pas de conclure sérieusement. |
| `OPINION / PRÉDICTION` | Pas un fait actuellement vérifiable. Jamais présenté comme une fake news, jamais publié dans le flux. |

## 6. Note de vérité

Note de `0/10` à `10/10`, qui concerne **exclusivement l'affirmation examinée**.

| Note | Interprétation indicative | Verdicts habituels |
| --- | --- | --- |
| 0 | directement contredit par des preuves solides | FAUX |
| 1–2 | très fortement contredit | FAUX, TRÈS PROBABLEMENT FAUX |
| 3–4 | largement trompeur ou substantiellement incorrect | TROMPEUR, TRÈS PROBABLEMENT FAUX (3) |
| 5 | mélange important de vrai et de faux / incertitude majeure | TROMPEUR, NON VÉRIFIABLE |
| 6–7 | globalement fondé mais imprécis ou incomplet | IMPRÉCIS |
| 8–9 | largement confirmé | CONFIRMÉ |
| 10 | directement et solidement confirmé par plusieurs preuves indépendantes | CONFIRMÉ |

Un écart entre verdict et note habituelle est possible, mais il doit être
justifié dans la section `## Vérification`. Une affirmation `NON VÉRIFIABLE` peut
ne pas porter de note. Ne jamais présenter cette note comme une mesure
scientifique.

La note de vérité (l'affirmation est-elle vraie ?) est distincte du **niveau de
confiance** `FORT` / `MOYEN` / `FAIBLE` (nos preuves sont-elles solides ?).
Justifier brièvement tout niveau autre que `FORT`.

## 7. « Mensonge » et « affirmation fausse »

Distinction stricte. Une affirmation fausse ne prouve pas que son auteur ment.
« Mensonge » suppose que l'auteur (1) connaissait la réalité, (2) savait que son
affirmation était fausse, (3) l'a néanmoins présentée comme vraie.

- Par défaut : `lie_established` est absent ou `false`, et l'observation
  n'emploie ni « mensonge », ni « menteur », ni « ment » — on écrit faux,
  trompeur, imprécis, non vérifiable. Le script refuse ce vocabulaire.
- `lie_established: true` uniquement si des éléments fiables et sourcés
  établissent raisonnablement la connaissance préalable (par exemple : l'auteur
  a lui-même cité le bon chiffre auparavant, ou a été formellement corrigé par
  une institution et a répété l'affirmation ensuite). Le script exige alors
  `prior_knowledge` et `prior_knowledge_sources`, publiés dans une section
  `## Connaissance préalable`.
- Ne jamais déduire une intention, politique ou autre, de la seule fausseté
  d'une affirmation.

## 8. Croisement des sources

Une affirmation problématique importante est idéalement vérifiée par au moins
deux sources indépendantes, mais **la qualité prime sur le nombre** : Insee +
texte officiel de l'Union européenne pèsent davantage que dix articles
reprenant la même dépêche. Détecter les sources qui se recopient (même dépêche
AFP/Reuters, même communiqué) et ne pas les compter comme des confirmations
distinctes. Ne jamais établir un verdict à partir des seules publications
partisanes, quel que soit leur camp.

Quand une source n'a pas pu être lue directement (page inaccessible), elle est
citée comme référence, la mention « non lue directement » figure dans l'entrée
et le niveau de confiance baisse en conséquence.

## 9. Neutralité politique

Exactement les mêmes critères pour tous : RN, Reconquête, LR, Renaissance /
Ensemble, Horizons, MoDem, PS, Place publique, Les Écologistes, LFI, PCF, et
toutes les autres formations et candidatures.

La sélection d'une affirmation dépend uniquement de sa **nouveauté**, de sa
**vérifiabilité**, de son **importance** et de la **qualité des preuves**. Ne
jamais chercher davantage d'erreurs chez un parti parce qu'il en a déjà produit.
À chaque passage, la recherche de déclarations balaie l'ensemble du spectre (on
ne s'arrête pas au premier camp qui fournit de la matière) ; les affirmations
vérifiées `CONFIRMÉ` sont elles aussi enregistrées en fiche, ce qui permet de
contrôler après coup que la recherche n'était pas orientée.

## 10. Interdits

Ne jamais :

- transformer une opinion en fake news ;
- tronquer une citation d'une manière qui change son sens ;
- attribuer à un candidat les propos d'un journaliste (ou la question à
  laquelle il répond) ;
- considérer une prédiction comme déjà fausse ;
- utiliser uniquement des publications partisanes pour établir un verdict ;
- déduire une intention de tromper sans preuve ;
- compter plusieurs reprises d'une même dépêche comme plusieurs confirmations ;
- inventer une URL, une citation ou une source. Une URL citée est une URL
  réellement rencontrée pendant la recherche.

## 11. Déroulé d'un passage horaire

1. **Lire** le README, ce fichier, puis `state/affirmations.md` (affirmations
   déjà vérifiées), `state/declarations-analysees.md` (déclarations déjà
   traitées) et `state/acteurs.md` (périmètre).
2. **Récupérer les nouvelles déclarations** depuis le précédent passage, sur
   l'ensemble du spectre politique.
3. **Éliminer** celles qui figurent déjà dans
   `state/declarations-analysees.md`.
4. **Extraire** les affirmations factuelles vérifiables (§ 4).
5. **Rechercher les preuves** selon la hiérarchie du § 3.
6. **Croiser les sources** (§ 8).
7. **Attribuer le verdict** (§ 5), puis **la note** (§ 6) et le niveau de
   confiance.
8. **Enregistrer** : écrire les observations (§ 12) et les passer à
   `scripts/factcheck-record.mjs`, **qui décide seul** de l'identité des
   affirmations, du dédoublonnage, des reprises et de la publication (§ 13) ;
   puis ajouter les déclarations traitées à `state/declarations-analysees.md`.
9. **RSS** : `feeds/presidentielle-2027-factcheck.xml` et `feeds/all.xml` sont
   produits par `scripts/build-feeds.mjs`. Ne jamais les éditer à la main.
10. **Committer en une seule fois** l'intégralité du passage (§ 16).

Une affirmation déjà vérifiée et répétée est tout de même soumise au script,
avec son `id` : c'est ainsi que sa diffusion est mesurée. Elle n'est jamais
republiée.

**Ne jamais écrire à la main dans `claims/`, `alerts/`, `daily/` ni dans
`state/affirmations.md`.** Ces fichiers sont produits par le script ; les
éditer à la main casse la déduplication et la traçabilité des corrections.
`state/declarations-analysees.md` et `state/acteurs.md`, eux, sont tenus par
le passage.

S'il n'existe aucune nouvelle affirmation problématique suffisamment
documentée : ne rien publier. En cas de preuves insuffisantes :
`NON VÉRIFIABLE`, ou pas d'observation du tout.

## 12. Format des observations

Le passage écrit un tableau JSON dans `.veille-tmp/observations.json` (fichier
de travail, jamais commité). Un objet par affirmation :

```json
[
  {
    "id": "PRES27-20260919-001",
    "author": "Prénom Nom",
    "party": "Parti",
    "statement_date": "2026-09-18",
    "quote": "citation courte exacte, relevée dans la source primaire",
    "claim": "Affirmation canonique, reformulée de façon neutre, complète et vérifiable.",
    "title": "affirmation résumée, utilisée dans le titre quand il n'y a pas de citation courte",
    "context": "Interview — média, émission ; en réponse à quelle question",
    "statement_url": "https://…",
    "topic": "emploi",
    "verdict": "TROMPEUR",
    "truth_score": 3,
    "confidence_level": "MOYEN",
    "confidence_note": "Pourquoi le niveau n'est pas FORT.",
    "summary": "Une ou deux phrases pour la description RSS.",
    "exact": "Ce qui est exact.",
    "incorrect": "Ce qui est incorrect.",
    "missing": "Ce qui manque dans la présentation.",
    "decisive": "Les chiffres ou faits qui permettent de trancher.",
    "significance": "moyenne",
    "substantial_error": false,
    "sources": [
      { "name": "Insee", "title": "Titre du document", "date": "2026-08-14", "url": "https://…", "type": "officielle" },
      { "name": "Média", "title": "Titre", "date": "2026-09-18", "url": "https://…", "type": "primaire" }
    ]
  }
]
```

Champs obligatoires : `author`, `party`, `statement_date`, `claim`
(≥ 15 caractères), `context`, `verdict`, `truth_score` (sauf
`NON VÉRIFIABLE`), `confidence_level`, `summary`, `decisive`, `sources`.

- `id` : à fournir pour toute affirmation déjà présente dans
  `state/affirmations.md` (reprise ou correction). Sinon l'omettre : le script
  apparie l'affirmation — empreinte exacte, puis similarité de formulation,
  sans jamais fusionner deux énoncés contradictoires ou chiffrés différemment —
  ou crée une fiche `PRES27-AAAAMMJJ-NNN`, datée du jour de première détection.
- `claim` : l'affirmation elle-même, **sans l'auteur**. C'est elle qui fonde
  l'identité : la même affirmation reprise par un autre candidat ou un autre
  parti rejoint la même fiche.
- `quote` : uniquement si la source primaire a été consultée ; exige
  `statement_url`. Ne jamais tronquer d'une manière qui change le sens.
- `topic` : une valeur parmi `economie`, `emploi`, `finances-publiques`,
  `fiscalite`, `pouvoir-d-achat`, `retraites`, `immigration`, `securite`,
  `justice`, `sante`, `education`, `logement`, `energie`, `climat`,
  `agriculture`, `europe`, `international`, `defense`, `institutions`,
  `societe`, `numerique`, `autre`.
- `sources` : objets `{ name, title, date, url, type }`, `type` parmi
  `primaire`, `officielle`, `média`, `fact-check`. Deux sources distinctes au
  minimum pour `FAUX`, `TRÈS PROBABLEMENT FAUX` et `TROMPEUR`. Le script
  signale une vérification appuyée sur les seuls fact-checkers.
- `confidence_note` : obligatoire si le niveau n'est pas `FORT`.
- `significance` : `haute`, `moyenne` (défaut) ou `faible`.
  `substantial_error: true` : réservé à un `IMPRÉCIS` dont l'erreur est
  substantielle.
- `lie_established`, `prior_knowledge`, `prior_knowledge_sources` : voir § 7.
- `correction_reason`, `new_evidence` : obligatoires lorsque le verdict ou la
  note d'une affirmation déjà enregistrée change (§ 15).

```bash
node scripts/factcheck-record.mjs --input .veille-tmp/observations.json --dry-run   # simule
node scripts/factcheck-record.mjs --input .veille-tmp/observations.json             # enregistre
node scripts/build-feeds.mjs && node scripts/check-feeds.mjs                         # flux RSS
```

Le script valide tout avant d'écrire quoi que ce soit : un passage est
enregistré en entier ou pas du tout. Il liste les fichiers qu'il a écrits.

## 13. Règles de publication, déduplication et diffusion

| Situation | Fiche `claims/` | Entrée RSS `alerts/` |
| --- | --- | --- |
| Nouvelle affirmation `FAUX`, `TRÈS PROBABLEMENT FAUX`, `TROMPEUR` | créée | oui — `[TROMPEUR · 3/10] Auteur — « citation »` |
| Nouvelle affirmation `IMPRÉCIS` | créée | seulement si `substantial_error` |
| Nouvelle affirmation `NON VÉRIFIABLE` | créée | seulement si `significance: haute` |
| Nouvelle affirmation `CONFIRMÉ` | créée | non |
| `OPINION / PRÉDICTION` | non | non — à ne pas soumettre |
| Importance `faible` | créée | non |
| Affirmation déjà vérifiée, répétée par le même auteur | occurrence ajoutée | non |
| Affirmation déjà vérifiée, reprise par un autre candidat ou parti | nouvelle attribution ajoutée | non |
| Verdict modifié, ou note modifiée d'au moins 2 points | corrigée | oui — `[CORRECTION · FAUX → IMPRÉCIS] Auteur — affirmation` |

Une même affirmation répétée dans plusieurs interviews ne constitue pas une
nouvelle fake news. Chaque fiche conserve `first_seen`, `last_seen`,
`repeat_count` et la liste datée des occurrences (auteur, parti, contexte,
URL), d'où se déduit « reprise par ». Ces compteurs mesurent la diffusion
d'une affirmation ; ils ne sont **jamais** agrégés par candidat ou par parti.

`state/declarations-analysees.md` est le journal des déclarations déjà
traitées, y compris celles qui n'ont rien donné (opinions, affirmations
confirmées, rien de vérifiable). Une ligne en tête par déclaration :
`- AAAA-MM-JJ — Auteur (Parti) — contexte — URL — résultat`. Élaguer les lignes
de plus de 30 jours.

## 14. Bulletin du jour

Chaque passage qui publie au moins une nouvelle entrée régénère le bulletin du
jour, `daily/AAAA/MM/AAAA-MM-JJ-factcheck.md`, avec une section par passage :

```markdown
## Mensonges / affirmations fausses ou trompeuses dans les nouvelles déclarations — passage de 10 h 47

- [FAUX · 1/10] Auteur (Parti) — affirmation résumée — [vérification](…)
```

N'y figurent que les nouveaux éléments `FAUX`, `TRÈS PROBABLEMENT FAUX`,
`TROMPEUR`, et `IMPRÉCIS` lorsque l'erreur est substantielle. Les opinions et
désaccords politiques en sont exclus. Le mot « mensonges » du titre de section
ne qualifie aucune entrée : seule une entrée `lie_established` y est signalée
comme telle. Ni total, ni classement par candidat ou par parti. Pas de
bulletin les jours sans publication. Le compte rendu final de chaque passage
reprend cette même section, ou indique qu'il n'y avait rien à publier.

## 15. Corrections

Un verdict publié peut évoluer. Si de nouvelles preuves montrent qu'un verdict
était incorrect, **ne jamais supprimer ni réécrire l'entrée d'origine** :
soumettre l'affirmation avec son `id`, le nouveau `verdict`, et les champs
`correction_reason` et `new_evidence` (le script refuse une correction qui
n'explique pas pourquoi). Le script publie alors une entrée
`type: correction` indiquant l'ancien verdict, le nouveau verdict, les
nouvelles preuves, la raison du changement et la date de correction, avec un
lien vers l'entrée d'origine, qui reste en ligne inchangée ; la fiche garde
l'historique dans `corrections`.

## 16. Structure et publication

```
presidentielle-2027-factcheck/
  CONSIGNES.md                              # ce fichier
  feed.json                                 # titre et description du flux RSS
  claims/AAAA/MM/PRES27-AAAAMMJJ-NNN.md     # une fiche durable par affirmation
  alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-slug.md   # entrées RSS, jamais modifiées
  daily/AAAA/MM/AAAA-MM-JJ-factcheck.md     # bulletin du jour
  state/affirmations.md                     # index anti-doublon (généré)
  state/declarations-analysees.md           # déclarations déjà traitées (passage)
  state/acteurs.md                          # périmètre indicatif (passage)
```

- **Un seul commit par passage**, jamais un commit par affirmation ou par
  fichier. Le passage est validé en entier par le script : fiches `claims/`,
  entrées `alerts/`, bulletin `daily/` et fichiers `state/` partent donc
  ensemble, dans une écriture unique. En local, `git add` puis un unique
  `git commit` ; via l'API GitHub, l'API Git tree (`push_files` côté
  connecteur MCP) et non l'endpoint « contents », qui crée un commit par
  fichier. Un index ou un journal de déclarations séparé des entrées qu'il
  enregistre casserait la déduplication et la traçabilité.
- Messages de commit : `factcheck: …` pour un passage — par exemple
  `factcheck: 1 affirmation publiée, 2 reprises enregistrées` —, et
  `correction: …` pour une correction.
- Aucune fiche, aucune entrée n'est jamais supprimée. Jamais de réécriture
  d'historique Git, jamais de push forcé.
- Le flux RSS suffit au suivi : aucun e-mail ni notification séparée.
