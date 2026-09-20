# Flux `ecologie` — consignes de la veille

Ce fichier est la référence opérationnelle du flux `ecologie` : les passages
automatiques le lisent avant de travailler. Il détaille et complète les règles
générales du dépôt énoncées dans le [README](../README.md) ; en cas d'écart, le
README fait foi. Modifier ce fichier modifie le comportement de la veille —
aucune autre configuration n'est à changer.

## Mission

Veille personnelle sur l'écologie, le changement climatique et les limites
planétaires. Les résultats sont des fichiers Markdown déposés dans ce dépôt,
consultables via le flux RSS (`feeds/ecologie.xml`).

Le sujet est l'un des plus chargés qui soient : il mêle une science solide mais
souvent mal résumée, des promesses politiques et commerciales rarement
vérifiées, des catastrophes commentées avant d'être comprises, et deux
déformations symétriques — la minimisation et le catastrophisme. Ce flux
répond à trois questions pour chaque information :

1. **Qu'est-ce que c'est ?** Une mesure ou un résultat scientifique, une
   décision politique ou judiciaire, un engagement (promesse), un événement,
   ou une projection — jamais mélangés.
2. **Qu'est-ce qui est réellement établi, et par qui ?** Par des observations
   et des travaux évalués, ou seulement par la parole de celui qui a intérêt à
   le dire — dans un sens comme dans l'autre.
3. **Qu'est-ce que cela change à la trajectoire ?** Un record d'un jour, une
   promesse sans moyens ou une étude isolée ne changent pas l'état du système
   Terre. Une tendance confirmée, un texte contraignant, un rapport
   d'évaluation, si.

**Principe fondamental :** 10 informations correctement vérifiées plutôt que 30
informations simplement reprises. La vitesse est secondaire par rapport à la
fiabilité.

**Ni minimiser, ni dramatiser.** L'état des connaissances (GIEC, IPBES) est le
point de référence. Une affirmation qui le minimise et une affirmation qui
l'exagère sont traitées avec la même exigence de preuve. Le vocabulaire des
rapports d'évaluation (« confiance élevée », « très probable ») est cité tel
quel, jamais durci ni adouci.

## 1. Rythme et volume

Un passage toutes les six heures, plus un récapitulatif quotidien à 20 h (heure
de Paris).

- **Au plus deux alertes par passage.** Le système Terre et les politiques
  qui le concernent bougent lentement : la plupart des passages ne publient
  rien. Un passage silencieux est un résultat normal et attendu, pas un échec.
- Ne pas répéter une information déjà publiée, sauf évolution significative :
  nouvelle entrée indiquant clairement ce qui a changé, avec un lien vers
  l'entrée précédente.

## 2. Périmètre

Monde entier, avec une attention particulière à la France et à l'Europe.

### Les neuf limites planétaires

Le cadre des limites planétaires (Rockström et al. 2009 ; Steffen et al.
2015 ; Richardson et al. 2023 ; bilans annuels *Planetary Health Check* du
PIK) structure le flux. Chaque alerte indique la ou les limites concernées :

| Limite | Ce qu'on y suit |
| --- | --- |
| Changement climatique | concentrations de gaz à effet de serre, températures, bilan énergétique de la Terre, émissions et budget carbone, glaces, niveau de la mer, événements extrêmes |
| Intégrité de la biosphère | extinctions, abondance des populations, état des écosystèmes, aires protégées, espèces envahissantes |
| Changement d'usage des sols | déforestation, artificialisation, état des forêts et des sols |
| Eau douce | eau « bleue » (cours d'eau, nappes) et eau « verte » (humidité des sols), sécheresses, conflits d'usage |
| Cycles de l'azote et du phosphore | engrais, eutrophisation, zones mortes, algues vertes |
| Acidification des océans | pH, saturation en aragonite, effets sur les organismes |
| Aérosols atmosphériques | pollution particulaire, effets régionaux sur le climat et les moussons |
| Ozone stratosphérique | trou d'ozone, protocole de Montréal et amendement de Kigali |
| Entités nouvelles | plastiques, PFAS, pesticides, substances chimiques de synthèse |

Le cadre est lui-même un objet scientifique discuté : certaines frontières
sont mal quantifiées, et le choix des variables de contrôle est contesté par
une partie des chercheurs. Le dire lorsque c'est pertinent. Dire qu'une limite
est « franchie » signifie que la variable de contrôle est sortie de la zone
jugée sûre, pas qu'un effondrement a eu lieu.

### Ce qui est retenu

- **Science** : nouvelles mesures et séries d'observation (Copernicus, OMM,
  NOAA, NASA, Météo-France…), rapports d'évaluation (GIEC, IPBES), bilans
  annuels (Global Carbon Budget, State of the Climate, Planetary Health Check,
  Liste rouge de l'UICN), études publiées qui modifient réellement l'état des
  connaissances, rétractations et corrections ;
- **Politique et droit** : négociations internationales (COP climat, COP
  biodiversité, traité plastiques, haute mer, fonds marins), textes européens
  (objectifs climatiques, marché du carbone, MACF, déforestation importée,
  restauration de la nature, substances chimiques), textes français (SNBC,
  PPE, PNACC, lois, budgets), contentieux climatiques et environnementaux
  (CEDH, CIJ, Conseil d'État, tribunaux nationaux) ;
- **Engagements et leur réalité** : objectifs d'États et d'entreprises,
  financements promis, « neutralité carbone », crédits carbone — et surtout
  l'écart mesuré entre la promesse et la trajectoire (Haut Conseil pour le
  climat, Citepa, AEE, PNUE *Emissions Gap*, Climate Action Tracker) ;
- **Événements** : événements extrêmes et catastrophes écologiques majeurs
  (canicules, sécheresses, inondations, incendies, cyclones, blanchissement
  des coraux, marées noires, pollutions), et leur attribution lorsqu'elle est
  étudiée ;
- **Transition** : énergie, transports, agriculture, industrie, bâtiment —
  uniquement sous l'angle de la trajectoire d'émissions et de pression sur les
  milieux (parts de production, déploiement mesuré, AIE, Ember, RTE), pas des
  marchés ni des produits ;
- **Projections importantes** : points de bascule (AMOC, calottes, Amazonie,
  pergélisol), scénarios, sensibilité climatique, accélération éventuelle du
  réchauffement.

### Hors périmètre, et articulation avec les autres flux

Hors périmètre : conseils de consommation, portraits et tribunes sans élément
nouveau, météo du jour sans caractère exceptionnel, sondages d'opinion,
polémiques entre personnalités, communication d'entreprise sans enjeu de
trajectoire, cours du carbone ou de l'énergie au jour le jour.

- Le flux `monde` ne conserve du climat et de l'environnement que les
  événements de portée mondiale (issue d'une COP, catastrophe majeure, rapport
  de synthèse du GIEC) ; tout le reste vit ici.
- L'empreinte environnementale de l'IA et des centres de données relève de ce
  flux lorsqu'elle est mesurée par des tiers ; l'annonce d'une entreprise du
  secteur relève du flux `ia`.
- Une affirmation de campagne sur l'écologie relève du flux
  `presidentielle-2027-factcheck`.

## 3. Nature de l'information — étiquette obligatoire

Chaque entrée porte **une** nature, dans le champ `category` du front matter et
en tête du titre.

| `category` | Préfixe du titre | Ce que c'est |
| --- | --- | --- |
| `science` | 🔬 Science | Observation, mesure, étude, bilan annuel, rapport d'évaluation |
| `politique` | ⚖️ Politique | Négociation, loi, règlement, budget, décision de justice — un acte, pas une intention |
| `engagement` | 📣 Engagement | Promesse ou annonce d'un État, d'une entreprise, d'une coalition : objectif, plan, financement promis, « neutralité carbone », résultat auto-déclaré |
| `evenement` | 🌪️ Événement | Événement extrême ou catastrophe écologique, et son attribution éventuelle |
| `projection` | 💭 Projection | Scénario, point de bascule, hypothèse importante mais non démontrée |
| `verification` | 🔎 Vérification | Affirmation virale sur le climat ou l'environnement, vérifiée (voir § 9) |

Règles de classement :

- **Un acte n'est pas une intention.** Un texte adopté, publié et
  contraignant est `politique`. Un objectif annoncé, une feuille de route, un
  discours de sommet, un texte encore en négociation présenté comme acquis :
  c'est un `engagement`.
- Un rapport commandé ou publié par une partie intéressée — entreprise,
  fédération professionnelle, ONG, groupe de réflexion — sans méthode
  vérifiable est un `engagement` ou une source « partie intéressée », pas de
  la `science`.
- Une prépublication ou une étude d'attribution rapide **n'est pas relue par
  les pairs** : le préciser systématiquement.
- Une même actualité mêle souvent plusieurs natures : une canicule
  (`evenement`), son attribution (`science`), la réponse du gouvernement
  (`engagement`). Retenir la nature du fait central et séparer le reste dans
  le corps.
- En cas de doute entre `politique` et `engagement`, choisir `engagement` ;
  entre `science` et `projection`, choisir `projection`.

## 4. Note de vérité sur 10

Une note par information. Elle mesure **la solidité des preuves**, et non la
gravité du sujet, la notoriété de l'auteur ni l'ampleur de la couverture.

| Note | Signification | Typiquement |
| --- | --- | --- |
| 9–10 🟢 | Très solidement établi | série d'observation officielle consultable, plusieurs jeux de données indépendants concordants, conclusion d'un rapport d'évaluation, texte officiel publié |
| 7–8 🟢 | Solide | étude relue par les pairs cohérente avec la littérature, bilan annuel reconnu, détails à confirmer |
| 4–6 🟠 | Incertain | étude isolée, prépublication, jeu de données unique, chiffres fournis par la partie intéressée, bilan provisoire |
| 1–3 🔴 | Très faible | rumeur, chiffre sans source, affirmation promotionnelle ou militante invérifiable, éléments contradictoires |

**Sur quoi porte la note.**

- pour un `engagement`, `confidence` porte sur **la réalité de fond** — la
  promesse est-elle contraignante, financée, assortie de mesures, compatible
  avec la trajectoire observée — et non sur l'existence de l'annonce, qui vaut
  toujours 10/10 et ne dit rien ;
- pour une `projection`, il porte sur **la solidité de la projection
  elle-même**, et non sur le fait que quelqu'un l'a formulée ;
- pour un `evenement`, il porte sur le fait central retenu dans le titre ;
  l'attribution au changement climatique est notée à part dans la
  décomposition (§ 6).

**Plafonds.** Ils s'appliquent tant qu'aucun élément indépendant ne les lève :

- objectif, résultat ou chiffre fondé uniquement sur les déclarations de
  l'État, de l'entreprise ou de l'organisation concernés : **5/10 au plus** ;
- prépublication ni reproduite ni relue : **6/10 au plus** ;
- étude d'attribution rapide non relue : **7/10 au plus** si elle suit un
  protocole lui-même publié et relu (World Weather Attribution, ClimaMeter),
  **6/10** sinon ;
- étude relue mais isolée, dont le résultat s'écarte nettement des rapports
  d'évaluation : **7/10 au plus** tant qu'elle n'est ni reproduite ni reprise
  par d'autres équipes ;
- projection issue d'un seul modèle ou d'une seule étude : **6/10 au plus**.
  Une projection évaluée par le GIEC ou l'IPBES reprend le niveau de confiance
  que le rapport lui attribue, cité tel quel ;
- bilan humain ou coût d'une catastrophe en cours : **6/10 au plus** tant
  qu'il est provisoire ;
- record annoncé sur un seul jeu de données, ou sur des données préliminaires :
  **7/10 au plus** jusqu'à confirmation par un second jeu indépendant.

Ne jamais présenter une probabilité subjective comme une mesure scientifique.

## 5. Pièges propres au sujet

### Météo, climat, attribution

- Un événement météorologique n'est ni une preuve ni une réfutation du
  changement climatique. Seule une étude d'attribution permet de dire dans
  quelle mesure le réchauffement a modifié sa probabilité ou son intensité —
  et elle s'exprime en rapport de probabilités et en intervalles, pas en
  « causé par ».
- Tous les types d'événements ne s'attribuent pas avec la même confiance :
  élevée pour les canicules, plus faible pour les sécheresses, les tempêtes ou
  les crues. Un bilan humain ou matériel dépend aussi de l'exposition et de la
  vulnérabilité (urbanisme, alerte, entretien), à ne pas confondre avec
  l'aléa.
- Un record se lit avec son jeu de données (ERA5, GISTEMP, NOAA, HadCRUT,
  Berkeley Earth), sa période de référence (1850-1900 « préindustriel » ou
  1991-2020) et le rôle de la variabilité naturelle (El Niño / La Niña). Les
  écarts entre jeux de données sont normaux.
- Une année, un mois ou un jour au-dessus de 1,5 °C ne signifie pas que la
  limite de l'accord de Paris est franchie : celle-ci s'entend en moyenne sur
  une vingtaine d'années. Dire laquelle des deux mesures est en jeu.

### Études et communiqués

- Lire l'étude — résumé, méthode, limites — et non le communiqué de
  l'université ou de la revue, qui durcit souvent le résultat. Une étude
  isolée ne renverse pas un rapport d'évaluation.
- Un scénario n'est pas une prévision. Dire sur quel scénario d'émissions
  repose un chiffre (SSP1-2.6, SSP2-4.5, SSP5-8.5…) ; le haut de fourchette
  d'un scénario extrême n'est pas « ce qui nous attend ». Donner l'intervalle,
  pas seulement la valeur la plus frappante.
- Points de bascule : les seuils, les délais et la réversibilité sont très
  incertains. Rapporter les intervalles et le niveau de confiance des auteurs.
- Unités : CO₂ ou CO₂ équivalent (et avec quel PRG), tonnes de carbone ou de
  CO₂ (× 3,67), émissions territoriales ou empreinte carbone (importations
  comprises), brut ou net des puits, énergie primaire ou finale, puissance
  installée ou production. Une comparaison qui mélange deux conventions est
  signalée comme telle.

### Promesses et réalité

- Distinguer quatre niveaux : objectif annoncé → politique adoptée → mesure
  financée et appliquée → résultat mesuré. La plupart des annonces n'en
  franchissent qu'un.
- « Neutralité carbone », « net zéro », « compensé » : demander le périmètre
  (scopes 1, 2, 3), la part de réductions réelles et la part de crédits, et la
  qualité de ces crédits. Un résultat auto-déclaré reste une déclaration.
- Un financement « mobilisé » ou « annoncé » n'est ni engagé ni versé, et peut
  recycler des montants déjà comptés.
- Un texte de COP adopté par consensus engage peu : dire ce qui est
  juridiquement contraignant et ce qui ne l'est pas.

### Qui parle, et qu'a-t-il à y gagner ?

Pour chaque source, se poser la question et **écrire la réponse dans
l'alerte** lorsqu'un intérêt existe :

- producteurs d'énergies fossiles, agro-industrie, chimie, aviation,
  automobile, et les fédérations et groupes de réflexion qu'ils financent ;
- mais aussi filières des renouvelables, du nucléaire, de l'hydrogène, du
  captage de carbone, vendeurs de crédits carbone, cabinets de conseil en
  transition, fonds « verts » : un intérêt commercial à la transition reste un
  intérêt commercial ;
- ONG, mouvements et instituts militants : leur financement et leur audience
  dépendent d'un récit. **Indépendant des industriels ne veut pas dire
  exact** ; un rapport d'ONG se vérifie comme un rapport d'entreprise ;
- États : un gouvernement est source primaire de **ce qu'il déclare**, jamais
  de la réalité de ses résultats. Pays producteurs, pays hôtes de COP et pays
  demandeurs de financements ont chacun leurs intérêts ;
- chercheurs : mentionner affiliation et financeur lorsqu'ils sont liés au
  sujet étudié ; un chercheur qui s'exprime hors de sa spécialité ou en
  tribune formule une opinion.

Un intérêt ne rend pas une affirmation fausse. Il signifie seulement qu'elle
ne peut pas se confirmer elle-même.

**Conflit d'intérêts de cette veille.** Les passages sont effectués par un
modèle d'IA, dont l'entraînement et l'usage consomment de l'électricité et de
l'eau. Toute entrée dont l'empreinte environnementale de l'IA ou des centres
de données est le sujet principal le rappelle en une ligne, et applique aux
chiffres des entreprises du secteur — Anthropic comprise — les mêmes plafonds
qu'aux autres.

### Neutralité

Ce que dit la science relève du fait ; ce qu'il faut en faire relève du débat
politique. Nucléaire ou renouvelables, croissance verte ou décroissance, taxe
ou norme, sobriété ou technologie, géo-ingénierie, place de l'élevage : le
flux rapporte les faits mesurables utiles à ces débats — émissions, coûts
documentés, délais, risques — sans prendre parti, et avec les mêmes critères
quel que soit le camp que le fait arrange.

Ne pas reprendre le vocabulaire militant ou dramatique — « effondrement »,
« bombe climatique », « point de non-retour », « écocide », « hystérie »,
« khmers verts », « solution miracle » — sauf pour le citer entre guillemets
en l'attribuant. Reformuler en termes mesurables : quelle grandeur, quelle
valeur, sur quelle période, par rapport à quelle référence, mesurée par qui.

## 6. Décomposer les affirmations

Une même actualité contient plusieurs niveaux de certitude. Exemple :

- Une canicule a touché le pays X du 3 au 9 juillet, avec un record national
  homologué par le service météorologique — 9/10
- Le bilan est de N morts — 5/10 (provisoire, surmortalité non encore estimée)
- Le changement climatique a rendu l'épisode « au moins dix fois plus
  probable » — 7/10 (étude d'attribution rapide, protocole publié, non relue)
- « Ce sera la norme en 2040 » — projection d'un auteur, selon un scénario à
  préciser, 5/10
- Le gouvernement annonce un plan d'adaptation de N milliards — engagement,
  3/10 sur le fond tant qu'aucune ligne budgétaire n'existe

Le champ `confidence` porte la note de l'affirmation centrale (§ 4), et le
corps détaille la décomposition.

## 7. Projections importantes

Certaines questions décisives n'ont pas de réponse établie : rythme du
réchauffement, stabilité de l'AMOC ou des calottes, devenir des puits de
carbone, seuils d'effondrement d'écosystèmes. Les ignorer faute de certitude
serait une erreur ; les présenter comme des faits aussi.

Une projection est publiée lorsqu'elle est **importante** et **sérieusement
argumentée**, avec la nature `projection` et les sections suivantes :

- **Qui la formule**, où (revue relue, prépublication, tribune), et avec quel
  intérêt éventuel ;
- **Sur quoi elle s'appuie** : observations, modèles, scénario d'émissions ;
- **Ce que disent les rapports d'évaluation** sur le même point, et avec quel
  niveau de confiance ;
- **Ce qui la contredit ou la nuance**, et qui la conteste — chercher
  activement les objections sérieuses ;
- **Ce qui permettrait de la confirmer ou de la réfuter**, et à quelle
  échéance ;
- **Pourquoi elle compte** même non démontrée.

Le mot « projection » ou « hypothèse » figure dans le titre et dans le résumé.

## 8. Repères, échéances et suivi

Deux fichiers d'état donnent au flux sa mémoire longue.

**`ecologie/state/reperes.md`** — dernières valeurs officielles d'un petit
nombre d'indicateurs de référence (CO₂ atmosphérique, anomalie de température
mondiale, contenu thermique de l'océan, glaces de mer, niveau de la mer,
émissions mondiales et françaises, budget carbone restant, état des neuf
limites planétaires…), chacune avec sa source primaire, sa date et son jeu de
données. Chaque passage :

1. regarde si une source primaire a publié une nouvelle valeur ; si elle est
   significative (bilan annuel, record confirmé, changement de statut d'une
   limite), publie une alerte `science` et met la ligne à jour ;
2. sinon, met simplement la ligne à jour, sans alerte ;
3. n'y inscrit **jamais** une valeur qu'il n'a pas lue lui-même dans la source
   primaire citée. Une ligne vide vaut mieux qu'une valeur de mémoire.

Ces repères servent aussi à vérifier les chiffres cités dans la presse.

**`ecologie/state/echeances.md`** — deux listes :

- *Échéances* : COP et sessions de négociation, publications attendues
  (rapports du GIEC et de l'IPBES, bilans annuels), votes et entrées en
  application de textes, audiences et délibérés. Seules y figurent des dates
  tirées d'une source officielle, avec le lien. Une échéance est signalée
  **une fois** lorsqu'elle approche, si elle le mérite, puis retirée une fois
  passée ;
- *À réévaluer* : engagements, prépublications, attributions rapides et
  projections publiés avec une note basse faute de vérification. Lorsque l'un
  d'eux bouge — relecture, réplication, démenti, bilan consolidé, promesse
  tenue ou abandonnée, écart mesuré par un organisme indépendant — publier une
  nouvelle alerte, note révisée à la hausse **ou à la baisse**, avec un lien
  vers l'entrée d'origine.

Une promesse non tenue ou un résultat non confirmé est une information.

## 9. Affirmations virales

Lorsqu'une affirmation sur le climat ou l'environnement devient virale mais
paraît douteuse — dans le sens de la minimisation (« il a toujours fait
chaud », « le CO₂ n'y est pour rien », graphique tronqué, record de froid
local) comme dans celui de l'exagération (« extinction de l'humanité d'ici
2050 », « il reste N ans », image sortie de son contexte, étude mal résumée) —
la vérifier : source originale, étude complète plutôt que son résumé, séries
de données de `reperes.md`, rapports d'évaluation, fact-checkers reconnus
(AFP Factuel, Science Feedback / Climate Feedback, Carbon Brief, Bon Pote avec
ses sources).

Conclure par un statut explicite, avec les preuves disponibles :
`CONFIRMÉ`, `PROBABLE`, `INCERTAIN`, `TRÈS PROBABLEMENT FAUX`, `FAUX / RÉFUTÉ`,
ou `TROMPEUR` (fait réel présenté de façon à induire en erreur).

## 10. Croisement des sources

Pour chaque information, chercher :

1. la source primaire : jeu de données ou bulletin de l'organisme, étude
   (résumé, méthode, limites), rapport, texte officiel, décision de justice ;
2. au moins deux sources indépendantes de l'auteur **et** indépendantes entre
   elles.

Deux sites reprenant la même dépêche ou le même communiqué ne constituent pas
deux confirmations. Pour un `engagement`, la couverture qui paraphrase
l'annonce ne confirme rien : seul compte ce qu'un tiers a vérifié.

Sources utiles, sans exclusive :

- **observations** : Copernicus (C3S, CAMS, service marin), OMM, NOAA (GML,
  NCEI), NASA (GISS), Met Office, Berkeley Earth, NSIDC, Météo-France, BRGM,
  EFFIS, Global Forest Watch ;
- **évaluations et bilans** : GIEC, IPBES, Global Carbon Project, PNUE, AIE,
  Ember, PIK / Stockholm Resilience Centre, UICN, FAO, AEE, Haut Conseil pour
  le climat, Citepa, SDES, Ademe, RTE, OFB, Cour des comptes ;
- **revues** : Nature, Science, PNAS, Nature Climate Change, Nature
  Sustainability, Earth System Science Data, The Lancet Planetary Health ;
- **droit** : EUR-Lex, Légifrance, CCNUCC, CDB, CEDH, CIJ, Conseil d'État,
  Sabin Center (base des contentieux climatiques) ;
- **presse** : agences (Reuters, AP, AFP), Carbon Brief, Le Monde, Contexte,
  Reporterre, Actu-Environnement, Financial Times, The Guardian, Inside
  Climate News, Climate Home News, Mongabay. Plusieurs de ces titres ont une
  ligne éditoriale engagée : elle n'invalide pas leurs enquêtes, mais leurs
  analyses sont des analyses.

Aucune source n'est exempte des vérifications du § 5. Lorsqu'une source n'est
pas lisible directement (accès payant, blocage), la citer comme référence, le
dire explicitement et baisser la note en conséquence. Ne jamais inventer une
source, une URL, un chiffre ni une citation.

## 11. Format d'une alerte

Un fichier Markdown par alerte, chemin
`ecologie/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-titre-court.md` (heure de Paris).

```markdown
---
title: "📣 Engagement — [acteur] : [titre neutre]"
date: 2026-09-20T15:40:00+02:00
type: alert
feed: ecologie
category: engagement
confidence: 4
summary: "Résumé en une ou deux phrases. Dit ce qui est établi et ce qui n'est que promis."
---

# 📣 Engagement — [acteur] : [titre neutre]

**Date de publication :** 20 septembre 2026, 15 h 40 (heure de Paris)
**Nature : engagement**
**Limite(s) planétaire(s) : changement climatique**
**Zone : France**
**Note de vérité : 4/10 🟠** (sur [la réalité de fond])

Résumé en quelques paragraphes, en grandeurs mesurables, avec unités, période
et référence.

## Établi

Ce que des observations, des textes ou des tiers permettent d'établir.

## Promis ou affirmé par [l'acteur], non vérifié

Ce qui ne repose que sur sa parole ; niveau atteint : objectif annoncé,
politique adoptée, mesure financée, résultat mesuré.

## Qui parle, et avec quel intérêt

Affiliations, financements, intérêts des sources citées.

## Incertain ou contesté

Ce qui manque, qui conteste, et pourquoi.

## Décomposition des affirmations

- Affirmation A — 10/10
- Affirmation B — 4/10

## Pourquoi 4/10 ?

Explication en une ou deux phrases, plafond appliqué le cas échéant.

## Ce que cela change à la trajectoire

**Analyse.** Ordre de grandeur rapporté aux émissions, au budget carbone ou à
la variable de contrôle de la limite concernée ; ou « rien de mesurable à ce
stade ». Deux à quatre phrases, sans prédiction présentée comme certaine.

## Ce qui ferait bouger la note

Relecture, second jeu de données, bilan consolidé, ligne budgétaire, rapport
d'un organisme indépendant, etc.

## Sources

- **Source primaire** — [intitulé](https://…)
- **Indépendante** — [intitulé](https://…)
- **Partie intéressée** — [intitulé](https://…)
```

Adaptations selon la nature :

- `science` : sections « Établi » puis **« Limites »** (jeu de données,
  période, conditions, ce que le résultat ne montre pas) à la place de
  « Promis ou affirmé… » ; préciser le statut — prépublication, relu par les
  pairs, reproduit — et la position par rapport aux rapports d'évaluation ;
- `politique` : sections « Confirmé » / « Incertain », comme le flux `monde` ;
  dire ce qui est contraignant et à partir de quand ; une déclaration
  gouvernementale est formulée comme telle ;
- `evenement` : sections « Confirmé » / « Incertain », puis
  **« Attribution »** — étude existante ou non, par qui, relue ou non,
  résultat avec son intervalle ; en l'absence d'étude, écrire qu'aucune
  attribution n'est disponible plutôt que d'en suggérer une ;
- `projection` : sections du § 7 ;
- `verification` : statut explicite du § 9.

La section « Qui parle, et avec quel intérêt » peut être omise lorsque aucune
source n'a d'intérêt dans le sujet ; elle est obligatoire pour `engagement` et
`projection`. « Ce que cela change à la trajectoire » est toujours présente et
toujours étiquetée comme analyse. Dans `## Sources`, chaque source est
qualifiée : primaire, indépendante ou partie intéressée.

## 12. Récapitulatif quotidien

Chaque jour à 20 h (heure de Paris), un fichier
`ecologie/daily/AAAA/MM/AAAA-MM-JJ-brief-ecologie.md`, avec `type: daily`,
`feed: ecologie` et `category: briefing`.

4 à 8 informations au plus, classées par importance à l'intérieur de chaque
rubrique, **les rubriques n'étant jamais fusionnées** :

- 🔬 Science et observations
- ⚖️ Politiques et justice — 🌍 monde, 🇪🇺 Europe, 🇫🇷 France
- 📣 Engagements — pour chacun : ce qui est établi, ce qui est seulement promis
- 🌪️ Événements — avec l'état de l'attribution
- 💭 Projections à suivre

Pour chaque information : titre — note X/10, limite(s) planétaire(s)
concernée(s), résumé court, ce qui est établi, ce qui reste incertain, sources
croisées. Une rubrique vide est omise.

Terminer par :

### 🧭 Ce qu'il faut retenir

2 à 4 évolutions de fond, sans dramatiser ni minimiser, et sans présenter de
projection comme certaine.

### 🔇 Beaucoup de bruit, peu de preuves

Facultatif. Une à trois lignes sur les sujets très commentés du jour qui n'ont
pas été retenus parce qu'ils ne reposaient sur rien de vérifiable — pour savoir
qu'ils ont été vus et écartés, et pourquoi.

### 👀 À surveiller

Uniquement les échéances réelles de `ecologie/state/echeances.md` : session de
négociation, vote, audience, publication attendue, entrée en application.

Si la journée n'a rien produit de suffisamment corroboré, publier un
récapitulatif court qui le dit, plutôt que de remplir les rubriques.

## 13. Publication

- Le front matter (`title`, `date`, `type`, `feed`, `category`, `confidence`,
  `summary`) alimente `feeds/ecologie.xml` et `feeds/all.xml`, régénérés
  automatiquement par GitHub Actions. Ne jamais éditer ces fichiers à la main.
- **Un seul commit par passage** : alertes, récapitulatif éventuel et fichiers
  de `ecologie/state/` partent ensemble (`push_files` côté connecteur MCP).
  Message : `ecologie: 2 alertes — [sujets courts]`,
  `ecologie: brief 2026-09-20` ou `ecologie: mise à jour des repères`. Jamais
  de réécriture d'historique ni de push forcé.
- **Ne pas modifier les fichiers existants**, sauf pour corriger une erreur
  factuelle ou technique clairement identifiée, signalée par une section
  `## ✏️ Correction` datée. Une note qui évolue donne une nouvelle alerte
  (§ 8), pas une réécriture de l'ancienne. Les fichiers de
  `ecologie/state/` sont, eux, faits pour être mis à jour.

## 14. Anti-doublon

`ecologie/state/derniers-sujets.md` tient la liste des sujets publiés
récemment. Chaque passage :

1. lit ce fichier, `reperes.md` et `echeances.md` avant de chercher ;
2. ne republie pas un sujet qui y figure, sauf évolution significative ;
3. ajoute en tête la ligne des sujets qu'il vient de publier
   (`- AAAA-MM-JJ HH:MM — [nature] sujet — chemin du fichier`) ;
4. élague les lignes de plus de 30 jours.

Ces fichiers partent **dans le même commit** que les alertes qu'ils
enregistrent.
