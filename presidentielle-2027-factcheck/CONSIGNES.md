# Flux `presidentielle-2027-factcheck` — consignes de la veille

Ce fichier est la référence opérationnelle du flux `presidentielle-2027-factcheck` :
les passages automatiques le lisent avant de travailler. Il complète les règles
générales du dépôt énoncées dans le [README](../README.md) ; en cas d'écart, le
README fait foi. Les mécanismes communs (croisement des sources, reprises de
dépêches, corrections signalées, front matter, génération RSS, commits) sont
ceux du flux [`monde`](../monde/CONSIGNES.md) ; seul ce qui est propre au
fact-checking est détaillé ici. Modifier ce fichier modifie le comportement de
la veille — aucune autre configuration n'est à changer.

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
propos : sans source primaire, l'entrée utilise `Affirmation :` (paraphrase
fidèle) et non `Déclaration :` (citation exacte), et le niveau de confiance en
tient compte.

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

- Par défaut : `mensonge_etabli: false`, et le corps de l'entrée n'emploie ni
  « mensonge » ni « menteur » — on écrit faux, trompeur, imprécis, non
  vérifiable.
- `mensonge_etabli: true` uniquement si des éléments fiables et sourcés
  établissent raisonnablement la connaissance préalable (par exemple : l'auteur
  a lui-même cité le bon chiffre auparavant, ou a été formellement corrigé par
  une institution et a répété l'affirmation ensuite). L'entrée comporte alors
  une section `## Connaissance préalable` avec ces éléments et leurs sources.
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
ne s'arrête pas au premier camp qui fournit de la matière) ; le registre
consigne aussi les affirmations vérifiées `CONFIRMÉ`, ce qui permet de
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

1. **Lire** le README, ce fichier, puis les trois fichiers de `state/`.
2. **Récupérer les nouvelles déclarations** depuis le précédent passage, sur
   l'ensemble du spectre politique.
3. **Éliminer** celles qui figurent déjà dans
   `state/declarations-analysees.md`.
4. **Extraire** les affirmations factuelles vérifiables (§ 4) et écarter celles
   dont la clé figure déjà dans `state/affirmations.json` (§ 13).
5. **Rechercher les preuves** selon la hiérarchie du § 3.
6. **Croiser les sources** (§ 8).
7. **Attribuer le verdict** (§ 5), puis **la note** (§ 6) et le niveau de
   confiance.
8. **Enregistrer** : une entrée par affirmation problématique suffisamment
   documentée (§ 12), puis le registre et le journal des déclarations (§ 13),
   puis le bulletin du jour (§ 14).
9. **RSS** : rien à faire, `feeds/presidentielle-2027-factcheck.xml` et
   `feeds/all.xml` sont régénérés par GitHub Actions
   (`scripts/build-feeds.mjs`). Ne jamais éditer ces fichiers à la main.

S'il n'existe aucune nouvelle affirmation problématique suffisamment
documentée : ne rien publier dans `alerts/`. Les fichiers de `state/` sont
quand même mis à jour pour ne pas refaire le même travail au passage suivant.

Ce qui est publié dans le flux :

| Verdict | Entrée dans `alerts/` | Registre |
| --- | --- | --- |
| `FAUX`, `TRÈS PROBABLEMENT FAUX`, `TROMPEUR` | oui | oui |
| `IMPRÉCIS` | seulement si l'erreur est substantielle | oui |
| `NON VÉRIFIABLE` | seulement si l'affirmation est importante et largement reprise | oui |
| `CONFIRMÉ` | non | oui |
| `OPINION / PRÉDICTION` | non | non (mention dans le journal des déclarations) |

En cas de preuves insuffisantes : `NON VÉRIFIABLE`, ou pas de publication.

## 12. Format d'une entrée

Un fichier par affirmation, chemin
`presidentielle-2027-factcheck/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-auteur-sujet-court.md`
(date et heure de publication, heure de Paris).

```markdown
---
title: "[TROMPEUR · 3/10] Prénom Nom — « citation courte ou affirmation résumée »"
date: 2026-09-19T10:47:00+02:00
type: factcheck
feed: presidentielle-2027-factcheck
category: emploi
id: emploi--chomage-hausse-20-pourcent-depuis-2022--prenom-nom
author: "Prénom Nom"
party: "Parti"
statement_date: 2026-09-18
claim: "Affirmation examinée, en une phrase."
context: "Interview — média, émission"
verdict: TROMPEUR
truth_score: 3
confidence_level: FORT
mensonge_etabli: false
source_url: "https://… (déclaration originale, si elle existe)"
summary: "Résumé de la vérification en une ou deux phrases, utilisé par le flux RSS."
---

# [TROMPEUR · 3/10] Prénom Nom — « citation courte ou affirmation résumée »

**Prénom Nom — Parti**
**Date :** 2026-09-18

**Déclaration :**

> « citation courte exacte, lorsque la source primaire est disponible »

(À défaut de source primaire — **Affirmation :** paraphrase fidèle, sans
guillemets.)

**Contexte :** interview, discours, publication, débat, etc. — où, quand, en
réponse à quoi. [Déclaration originale](https://…)

**Verdict : TROMPEUR**
**Note de vérité : 3/10**

## Vérification

- **Ce qui est exact :** …
- **Ce qui est incorrect :** …
- **Ce qui manque dans la présentation :** …
- **Chiffres ou faits permettant de trancher :** …

## Sources

- **Nom** — [Titre](https://…) — AAAA-MM-JJ — type : primaire
- **Nom** — [Titre](https://…) — AAAA-MM-JJ — type : officielle
- **Nom** — [Titre](https://…) — AAAA-MM-JJ — type : média
- **Nom** — [Titre](https://…) — AAAA-MM-JJ — type : fact-check

## Niveau de confiance

**FORT** (justification courte obligatoire si `MOYEN` ou `FAIBLE`).
```

Précisions :

- `title` : `[VERDICT · N/10] Auteur — « citation »` ou
  `[VERDICT · N/10] Auteur — affirmation résumée`. Toujours entre guillemets
  droits dans le front matter, sans guillemet droit à l'intérieur.
- `category` : le sujet, une seule valeur parmi `economie`, `emploi`,
  `finances-publiques`, `fiscalite`, `pouvoir-d-achat`, `retraites`,
  `immigration`, `securite`, `justice`, `sante`, `education`, `logement`,
  `energie`, `climat`, `agriculture`, `europe`, `international`, `defense`,
  `institutions`, `societe`, `numerique`, `autre`.
- `verdict`, `party` et `author` sont repris dans le RSS (catégories et
  auteur) ; il n'y a pas de champ `confidence` dans ce flux, la note figurant
  déjà dans le titre.
- Types de source : `primaire`, `officielle`, `média`, `fact-check`.
- `scripts/check-factcheck.mjs` contrôle ces champs à chaque publication.

## 13. Déduplication et mesure de la diffusion

Ne jamais republier une affirmation déjà présente dans la veille.

**Clé d'affirmation** (`claim_key`) : `sujet--affirmation-normalisee`, en
minuscules, sans accents, mots séparés par des tirets, chiffres conservés, sans
l'auteur — par exemple `emploi--chomage-hausse-20-pourcent-depuis-2022`.
**Identifiant stable** (`id`) : `claim_key--premier-auteur`. Deux formulations
du même fait partagent la même clé : avant d'en créer une, relire les clés
existantes du même sujet.

`state/affirmations.json` est le registre permanent (jamais élagué) :

```json
{
  "id": "emploi--chomage-hausse-20-pourcent-depuis-2022--prenom-nom",
  "claim_key": "emploi--chomage-hausse-20-pourcent-depuis-2022",
  "author": "Prénom Nom",
  "party": "Parti",
  "topic": "emploi",
  "claim_normalized": "Le chômage a augmenté de 20 % depuis 2022.",
  "verdict": "FAUX",
  "truth_score": 1,
  "confidence_level": "FORT",
  "file": "presidentielle-2027-factcheck/alerts/2026/09/….md",
  "first_seen": "2026-09-18",
  "last_seen": "2026-09-18",
  "repeat_count": 1,
  "repeated_by": [],
  "corrections": []
}
```

- Même affirmation répétée par le même auteur (autre interview, autre
  meeting) : pas de nouvelle entrée ; `last_seen` et `repeat_count` sont mis à
  jour, et l'occurrence est ajoutée à `repeated_by`.
- Même affirmation reprise par un autre candidat ou parti : pas de nouveau fait
  distinct ; la nouvelle attribution est ajoutée à `repeated_by`
  (`{"author", "party", "date", "context", "url"}`) et `repeat_count`
  augmente. La reprise n'est signalée dans le flux que si elle change
  l'ampleur de la diffusion ; elle renvoie alors à l'entrée d'origine.
- `file` vaut `null` pour une affirmation vérifiée mais non publiée
  (`CONFIRMÉ`, `IMPRÉCIS` mineur, `NON VÉRIFIABLE` secondaire).
- Ces compteurs mesurent la diffusion d'une affirmation. Ils ne sont jamais
  agrégés par candidat ou par parti.

`state/declarations-analysees.md` est le journal des déclarations déjà
traitées, y compris celles qui n'ont rien donné. Une ligne en tête par
déclaration :
`- AAAA-MM-JJ — Auteur (Parti) — contexte — URL — résultat`. Élaguer les lignes
de plus de 30 jours.

## 14. Bulletin du jour

Chaque passage qui publie au moins une entrée l'ajoute au bulletin du jour,
`presidentielle-2027-factcheck/daily/AAAA/MM/AAAA-MM-JJ-factcheck.md`
(`type: daily`, `category: briefing`), créé au premier passage publiant de la
journée. Le bulletin contient, par passage, une section :

```markdown
## Mensonges / affirmations fausses ou trompeuses dans les nouvelles déclarations — passage de HH h MM

- [FAUX · 1/10] Auteur (Parti) — affirmation résumée — [vérification](../../../alerts/AAAA/MM/fichier.md)
```

N'y figurent que les nouveaux éléments `FAUX`, `TRÈS PROBABLEMENT FAUX`,
`TROMPEUR`, et `IMPRÉCIS` lorsque l'erreur est substantielle. Les opinions et
désaccords politiques en sont exclus. Le mot « mensonge » du titre de section
ne qualifie aucune entrée : seule une entrée `mensonge_etabli: true` y est
signalée comme telle. Le bulletin liste les entrées par ordre d'importance,
sans total ni classement par candidat ou par parti. Pas de bulletin les jours
sans publication. Le compte rendu final de chaque passage reprend cette même
section, ou indique qu'il n'y avait rien à publier.

## 15. Corrections

Un verdict publié peut évoluer. Si de nouvelles preuves montrent qu'un verdict
était incorrect, **ne jamais supprimer ni réécrire silencieusement l'entrée** :

1. publier une nouvelle entrée `type: correction` dans `alerts/`, titre
   `[CORRECTION] Auteur — affirmation résumée`, avec `corrects: <id>`, et dans
   le corps : ancien verdict, nouveau verdict, nouvelles preuves, raison du
   changement, date de correction ;
2. ajouter en tête de l'entrée d'origine une section datée `## ✏️ Correction`
   renvoyant à la correction (le reste de l'entrée reste intact) ;
3. mettre à jour le registre : nouveau `verdict` / `truth_score`, et une ligne
   dans `corrections`
   (`{"date", "old_verdict", "new_verdict", "reason", "file"}`).

Message de commit : `correction: <sujet court>`.

## 16. Publication

- Entrées : `factcheck: <auteur> — <sujet court>` ; bulletin :
  `daily: fact-check présidentielle AAAA-MM-JJ` ; état :
  `chore: mise à jour du registre fact-check`.
- Jamais de réécriture d'historique ni de push forcé.
- Ne pas modifier les fichiers existants, hors `state/`, bulletin du jour et
  corrections signalées (§ 15).
- Le flux RSS suffit au suivi : aucun e-mail ni notification séparée.
