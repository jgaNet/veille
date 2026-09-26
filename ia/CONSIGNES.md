# Flux `ia` — consignes de la veille

Référence opérationnelle du flux `ia`, lue par chaque passage automatique.
Complète les règles générales du [README](../README.md) ; en cas d'écart, le
README fait foi.

## Mission

Veille sur l'intelligence artificielle, **indépendante des acteurs
économiques du secteur**, publiée en Markdown et via RSS (`feeds/ia.xml`).

L'actualité de l'IA est en grande partie produite par ceux qui ont intérêt à
ce qu'elle paraisse spectaculaire (entreprises, fabricants de puces, fonds
investis, mais aussi auteurs et instituts dont la notoriété dépend d'un
récit). Ce flux répond à trois questions :

1. **Qu'est-ce que c'est ?** Avancée scientifique, évolution sociétale,
   annonce commerciale ou hypothèse — jamais mélangées.
2. **Qu'est-ce qui est réellement établi, et par qui ?** Par une vérification
   indépendante, ou seulement par la parole de celui qui a intérêt à le dire.
3. **Est-ce important ?** Une hypothèse non démontrée peut compter davantage
   qu'un lancement de produit ; elle est alors publiée, mais étiquetée comme
   telle.

**Principe fondamental :** 10 informations correctement vérifiées plutôt que
30 simplement reprises. La vitesse est secondaire par rapport à la fiabilité.
La plupart des annonces du secteur ne méritent aucune entrée.

## 1. Rythme et volume

Un passage toutes les trois heures, plus un récapitulatif quotidien à 20 h
(heure de Paris).

- **Au plus deux alertes par passage.** Le plus souvent, la bonne réponse est
  de n'en publier aucune : un passage silencieux est normal, pas un échec.
- Ne pas répéter une information déjà publiée, sauf évolution significative :
  nouvelle entrée précisant ce qui a changé, avec un lien vers l'entrée
  précédente.

## 2. Périmètre

- recherche : nouvelles méthodes, résultats, capacités mesurées, limites
  démontrées, réplications et échecs de réplication, rétractations ;
- sûreté et sécurité : incidents documentés, vulnérabilités, évaluations de
  risques, usages malveillants avérés ;
- régulation et justice : lois, règlements, décisions de justice, sanctions,
  normes (AI Act et AI Office, CNIL, autorités nationales, tribunaux) ;
- société : emploi, éducation, santé, information, droit d'auteur, vie privée,
  usages réels mesurés, énergie et environnement ;
- économie du secteur : financements, investissements, puces, centres de
  données — uniquement lorsque l'enjeu dépasse la communication d'entreprise ;
- produits et modèles : uniquement lorsqu'un lancement change réellement ce
  qui est possible ou accessible, pas à chaque version.

Hors périmètre : astuces d'utilisation, comparatifs de produits, rumeurs de
calendrier, cours de bourse au jour le jour, tribunes sans élément nouveau. Le
flux `monde` ne conserve de l'IA que les événements de portée géopolitique ou
économique mondiale ; tout le reste vit ici.

## 3. Nature de l'information — étiquette obligatoire

Chaque entrée porte **une** nature, dans le champ `category` du front matter
et en tête du titre. C'est la distinction centrale du flux.

| `category` | Préfixe du titre | Ce que c'est |
| --- | --- | --- |
| `recherche` | 🔬 Recherche | Résultat scientifique ou technique : article, réplication, évaluation indépendante, jeu de données, limite démontrée |
| `societe` | ⚖️ Société | Régulation, justice, emploi, usages, incidents, sûreté, environnement — un fait qui concerne la société, pas un produit |
| `annonce` | 📣 Annonce | Communication d'un acteur économique : produit, modèle, performance revendiquée, financement, partenariat, feuille de route |
| `hypothese` | 💭 Hypothèse | Projection, scénario, théorie ou mise en garde importante mais non démontrée |
| `verification` | 🔎 Vérification | Affirmation virale sur l'IA, vérifiée (§ 8) |

Règles de classement :

- **L'origine décide, pas le vocabulaire.** Un billet de blog d'entreprise
  présenté comme « recherche », un « rapport technique » sans méthode
  reproductible, une « étude » commandée par un vendeur : c'est une `annonce`.
  Elle ne devient `recherche` que si le travail est publié avec assez de
  détails pour être vérifié — méthode, données ou poids, protocole — ou s'il
  a été reproduit ou évalué par un tiers.
- Un article scientifique signé par des salariés d'une entreprise peut être
  de la `recherche` ; l'affiliation est alors dite en clair (§ 5).
- Une prépublication (arXiv et équivalents) **n'est pas relue par les pairs** :
  le préciser systématiquement.
- Une même actualité mêle souvent plusieurs natures — annonce, mesure
  indépendante, hypothèse d'un dirigeant. Retenir la nature du fait central
  et séparer le reste dans le corps.
- En cas de doute entre `recherche` et `annonce`, choisir `annonce`.

## 4. Note de vérité sur 10

Une note par information, qui mesure **la solidité des preuves
indépendantes**, jamais l'importance de la nouvelle, la notoriété de son
auteur ni l'ampleur de sa couverture.

| Note | Signification | Typiquement |
| --- | --- | --- |
| 9–10 🟢 | Très solidement établi | texte officiel consultable, résultat reproduit par des tiers, données ou code directement vérifiables, plusieurs sources indépendantes concordantes |
| 7–8 🟢 | Solide | publication relue par les pairs ou évaluation indépendante crédible, détails à confirmer |
| 4–6 🟠 | Incertain | source unique, prépublication non reproduite, chiffres fournis par la partie intéressée, sources anonymes |
| 1–3 🔴 | Très faible | rumeur, fuite non corroborée, affirmation promotionnelle invérifiable, éléments contradictoires |

**Sur quoi porte la note.** C'est le point où ce flux s'écarte du flux
`monde`. Qu'une entreprise ait publié un communiqué est toujours vrai à
10/10 : noter cela ferait des annonces commerciales les informations les
mieux notées du flux, l'inverse du but recherché. Donc : pour une `annonce`,
`confidence` porte sur **l'affirmation de fond** (ce que le produit fait
réellement, la performance revendiquée, la réalité du montant ou du
calendrier), pas sur l'existence de l'annonce ; pour une `hypothese`, il porte
sur **la solidité de l'hypothèse elle-même**. L'existence de l'annonce ou de
la déclaration figure dans la décomposition (§ 6), où elle peut valoir 10/10
sans tromper personne.

**Plafonds**, tant qu'aucune vérification indépendante n'existe :

- performance, capacité ou chiffre d'usage fondé uniquement sur les
  déclarations de l'entreprise concernée : **5/10 au plus** ;
- résultat d'une prépublication ni reproduite ni relue : **6/10 au plus** ;
- fuite, source anonyme unique, capture d'écran : **4/10 au plus** ;
- hypothèse ou projection : **6/10 au plus**, quelle que soit la réputation
  de son auteur — au-delà, ce n'est plus une hypothèse et l'entrée change de
  nature.

Ne jamais présenter une probabilité subjective comme une mesure scientifique.

## 5. Indépendance à l'égard des acteurs économiques

Pour chaque source, se poser la question « qui parle, et qu'a-t-il à y
gagner ? » et **écrire la réponse dans l'alerte** lorsqu'un intérêt existe :
une entreprise est source primaire de **ce qu'elle déclare**, jamais de la
véracité de ce qu'elle déclare (performance, utilisateurs, revenus, sécurité,
énergie sont des déclarations) ; affiliation et financeur d'une étude,
lorsqu'ils sont liés au sujet ; un évaluateur ou classement « indépendant »
peut lui-même être financé par les entreprises qu'il évalue, ou en dépendre
pour accéder aux modèles ; un média peut être lié à un acteur du secteur
(actionnaire, licence de contenus, partenariat) ; un analyste, investisseur ou
dirigeant qui commente un marché où il a des intérêts est une partie
intéressée ; l'intérêt n'est pas que commercial — auteur qui vend un livre,
organisation militante, institut dont le financement dépend d'un récit
alarmiste ou enthousiaste. **Indépendant des entreprises ne veut pas dire
exact.** Un intérêt ne rend pas une affirmation fausse ; il signifie qu'elle
ne peut pas se confirmer elle-même.

**Compte comme vérification indépendante :** réplication ou évaluation par un
tiers sans lien avec l'auteur, méthode publiée ; relecture par les pairs ;
poids, code ou données publiés permettant à quiconque de vérifier ; texte
officiel, décision de justice, document réglementaire ; statistiques
publiques (Insee, Eurostat, OCDE, BLS…) ; enquête journalistique appuyée sur
plusieurs sources indépendantes entre elles. **Ne compte pas :** reprise du
communiqué par dix médias, démonstration filmée par l'entreprise, banc
d'essai dont l'entreprise a choisi les épreuves, témoignage d'un partenaire
ou client mis en avant par elle, classement dont la méthode n'est pas
publiée.

Les mêmes critères s'appliquent à tous les acteurs, quels que soient leur
taille, leur pays, leur modèle et leur réputation : OpenAI, Google, Anthropic,
Meta, Microsoft, xAI, Nvidia, Mistral, DeepSeek, Alibaba et tous les autres —
ni indulgence pour un acteur européen ou « ouvert », ni sévérité pour un
acteur impopulaire.

**Conflit d'intérêts de cette veille.** Les passages sont effectués par un
modèle d'IA développé par Anthropic, l'un des acteurs du secteur, traité
exactement comme ses concurrents — mêmes plafonds, même scepticisme — et
toute entrée dont Anthropic est le sujet principal le rappelle en une ligne.

**Vocabulaire.** Ne pas reprendre le vocabulaire promotionnel ou dramatique :
« révolutionnaire », « niveau humain », « AGI », « superintelligence »,
« comprend », « raisonne », « conscient », « dépasse les médecins ».
Reformuler en termes mesurables (quelle tâche, quelle mesure, contre quelle
référence, mesuré par qui), sauf à citer et attribuer le terme lorsqu'il est
l'objet même de l'information. Se méfier des bancs d'essai fuités dans
l'entraînement, des comparaisons à charge contre le concurrent, des
« jusqu'à X % », des démonstrations choisies, des chiffres d'utilisateurs
sans définition, des investissements annoncés mais non engagés.

## 6. Décomposer les affirmations

Une même actualité contient plusieurs niveaux de certitude. Exemple :

- L'entreprise X a annoncé le modèle Y le 3 mars — 10/10
- Y obtient 92 % au banc d'essai Z — 5/10 (chiffre de l'entreprise, non
  reproduit)
- Y « surpasse les experts humains » — 3/10 (formulation promotionnelle, une
  seule tâche, protocole non publié)

Le champ `confidence` porte la note de l'affirmation de fond (§ 4) ; le corps
détaille la décomposition.

## 7. Hypothèses importantes

Certaines questions décisives n'ont pas de réponse établie : rythme des
progrès, effets sur l'emploi, risques graves, limites du passage à l'échelle,
consommation d'énergie future, bulle financière éventuelle. Les ignorer
faute de preuve serait une erreur ; les présenter comme des faits aussi.

Une hypothèse est publiée lorsqu'elle est **importante** et **sérieusement
argumentée**, nature `hypothese`, avec les sections : **Qui la formule**, et
avec quel intérêt (§ 5) ; **Sur quoi elle s'appuie** ; **Ce qui la contredit
ou la nuance**, et qui la conteste — chercher activement les objections
sérieuses ; **Ce qui permettrait de la confirmer ou de la réfuter**, et à
quelle échéance ; **Pourquoi elle compte** même non démontrée.

Le mot « hypothèse » figure dans le titre et le résumé. Une prédiction d'un
dirigeant sur son propre secteur est une hypothèse émise par une partie
intéressée, pas une information sur l'avenir. Le consensus d'un milieu n'est
pas une preuve ; l'absence de preuve n'est pas une réfutation.

## 8. Affirmations virales

Lorsqu'une affirmation sur l'IA devient virale mais paraît douteuse — démo
truquée, « l'IA a fait X toute seule », étude mal résumée, chiffre d'emplois
détruits sans source, capture d'écran — la vérifier : source originale,
document complet plutôt que son résumé, protocole réel de l'expérience,
fact-checkers reconnus. Beaucoup d'affirmations spectaculaires proviennent
d'expériences réelles mais construites à dessein : décrire le protocole, pas
seulement le résultat.

Conclure par un statut explicite : `CONFIRMÉ`, `PROBABLE`, `INCERTAIN`,
`TRÈS PROBABLEMENT FAUX`, `FAUX / RÉFUTÉ`, ou `TROMPEUR` (fait réel présenté
de façon à induire en erreur).

## 9. Suivi des affirmations en attente

Une annonce ou hypothèse importante publiée avec une note basse faute de
vérification indépendante est inscrite dans
`ia/state/affirmations-en-attente.md`. Chaque passage commence par regarder
si l'une d'elles a bougé (évaluation indépendante, réplication, relecture,
démenti, rétractation, échéance d'une prédiction atteinte).

Si oui, publier une nouvelle alerte — note révisée à la hausse **ou à la
baisse**, lien vers l'entrée d'origine, explication de ce qui a changé — et
mettre la ligne à jour ou la retirer. Une promesse non tenue ou un résultat
non reproduit est une information.

## 10. Croisement des sources

Chercher : 1) la source primaire — article ou prépublication (lire résumé,
méthode et limites, pas le communiqué qui l'accompagne), texte officiel,
décision, jeu de données, dépôt de code, document d'entreprise ; 2) au moins
deux sources indépendantes de l'auteur **et** indépendantes entre elles.

Deux sites reprenant le même communiqué ou la même dépêche ne constituent pas
deux confirmations. Pour une `annonce`, la couverture qui paraphrase le
communiqué ne compte pas comme confirmation : seul compte ce que le
journaliste ou chercheur a vérifié lui-même.

Sources utiles, sans exclusive : arXiv et actes de conférences (NeurIPS,
ICML, ICLR, ACL), Nature, Science, PNAS ; EUR-Lex, AI Office, CNIL,
Légifrance, NIST, décisions de justice ; AI Index (Stanford), OCDE, Insee,
Eurostat ; agences (Reuters, AP, AFP) ; presse spécialisée et généraliste
(MIT Technology Review, Ars Technica, The Verge, 404 Media, Financial Times,
Le Monde, Next, Contexte). Aucune n'est exempte des vérifications du § 5.

Lorsqu'une source n'est pas lisible directement, la citer comme référence, le
dire explicitement et baisser la note en conséquence. Ne jamais inventer une
source, une URL ni une citation.

## 11. Format d'une alerte

Un fichier Markdown par alerte, chemin
`ia/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-titre-court.md` (heure de Paris).

```markdown
---
title: "📣 Annonce — [acteur] : [titre neutre]"
date: 2026-09-20T15:40:00+02:00
type: alert
feed: ia
category: annonce
confidence: 5
summary: "Résumé en une ou deux phrases. Dit ce qui est vérifié indépendamment et ce qui ne l'est pas."
---

# 📣 Annonce — [acteur] : [titre neutre]

**Date de publication :** 20 septembre 2026, 15 h 40 (heure de Paris)
**Nature : annonce commerciale**
**Note de vérité : 5/10 🟠** (sur [l'affirmation de fond])

Résumé en quelques paragraphes, en termes mesurables.

## Vérifié indépendamment

Ce que des tiers sans lien avec l'auteur permettent d'établir.

## Affirmé par [l'acteur], non vérifié

Ce qui ne repose que sur sa parole.

## Qui parle, et avec quel intérêt

Affiliations, financements, liens commerciaux des sources citées.

## Incertain ou contesté

Ce qui manque, qui conteste, et pourquoi.

## Décomposition des affirmations

- Affirmation A — 10/10
- Affirmation B — 5/10

## Pourquoi 5/10 ?

Explication en une ou deux phrases, plafond appliqué le cas échéant.

## Ce qui ferait bouger la note

Évaluation indépendante attendue, réplication, publication des poids, etc.

## Sources

- **Source primaire** — [intitulé](https://…)
- **Indépendante** — [intitulé](https://…)
- **Partie intéressée** — [intitulé](https://…)
```

Adaptations selon la nature : `recherche` — remplacer « Affirmé par… » par
**« Limites »** (échantillon, conditions, ce que le résultat ne montre pas) et
préciser le statut (prépublication, relu, reproduit) ; `societe` — sections
« Confirmé » / « Incertain », comme `monde` ; `hypothese` — sections du § 7 ;
`verification` — statut explicite du § 8.

La section « Qui parle, et avec quel intérêt » peut être omise lorsque aucune
source n'a d'intérêt dans le sujet ; obligatoire pour `annonce` et
`hypothese`. Dans `## Sources`, chaque source est qualifiée : primaire,
indépendante ou partie intéressée.

## 12. Récapitulatif quotidien

Chaque jour à 20 h (heure de Paris), un fichier
`ia/daily/AAAA/MM/AAAA-MM-JJ-brief-ia.md`, avec `type: daily`, `feed: ia` et
`category: briefing`.

5 à 8 informations au plus, classées par importance à l'intérieur de chaque
rubrique, **jamais fusionnées** : 🔬 Recherche ; ⚖️ Société et régulation ;
📣 Annonces des entreprises (pour chacune : vérifié indépendamment vs
seulement affirmé) ; 💭 Hypothèses à suivre.

Pour chaque information : titre — note X/10, résumé court, ce qui est établi,
ce qui reste incertain, sources croisées. Une rubrique vide est omise.

Terminer par :

### 🧭 Ce qu'il faut retenir

2 à 4 évolutions de fond, sans dramatiser et sans présenter de prédiction
comme certaine.

### 🔇 Beaucoup de bruit, peu de preuves

Facultatif. Une à trois lignes sur les sujets très commentés du jour écartés
faute de preuve — pour savoir qu'ils ont été vus et pourquoi.

### 👀 À surveiller

Uniquement les échéances réelles : vote, audience, publication attendue,
entrée en application d'un texte, évaluation indépendante annoncée.

Si la journée n'a rien produit de suffisamment corroboré, publier un
récapitulatif court qui le dit, plutôt que de remplir les rubriques.

## 13. Publication

- Le front matter (`title`, `date`, `type`, `feed`, `category`, `confidence`,
  `summary`) alimente `feeds/ia.xml` et `feeds/all.xml`, régénérés
  automatiquement. Ne jamais éditer ces fichiers à la main.
- **Un seul commit par passage** (règle générale : voir README) : alertes,
  récapitulatif éventuel et fichiers de `ia/state/` ensemble, via
  `push_files`. Message : `ia: 2 alertes — [sujets courts]` ou `ia: brief
  2026-09-20`.
- **Ne pas modifier les fichiers existants**, sauf correction factuelle ou
  technique clairement identifiée (section `## ✏️ Correction` datée). Une
  note qui évolue donne une nouvelle alerte (§ 9), pas une réécriture.

## 14. Anti-doublon

`ia/state/derniers-sujets.md` tient la liste des sujets publiés récemment.
Chaque passage :

1. lit ce fichier et `ia/state/affirmations-en-attente.md` avant de chercher ;
2. ne republie pas un sujet qui y figure, sauf évolution significative ;
3. ajoute en tête la ligne des sujets qu'il vient de publier
   (`- AAAA-MM-JJ HH:MM — [nature] sujet — chemin du fichier`) ;
4. élague les lignes de plus de 14 jours.

Ces fichiers partent **dans le même commit** que les alertes qu'ils
enregistrent.
