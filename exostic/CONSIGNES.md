# Flux `exostic` — consignes de la veille

Ce fichier est la référence opérationnelle du flux `exostic` : les passages
automatiques le lisent avant de travailler. Il détaille et complète les règles
générales du dépôt énoncées dans le [README](../README.md) ; en cas d'écart, le
README fait foi. Modifier ce fichier modifie le comportement de la veille —
aucune autre configuration n'est à changer.

## Mission

Veille professionnelle pour [Exostic](https://exostic.com), société de conseil
en ingénierie produit, logiciel et système (SAS, Châtelaillon-Plage, fondée par
Jérémy Gay). Les résultats sont des fichiers Markdown déposés dans ce dépôt,
consultables via le flux RSS (`feeds/exostic.xml`).

Le flux répond à trois questions pour chaque information :

1. **Qu'est-ce qui s'est passé, et est-ce établi ?** Source primaire, sources
   indépendantes, note de vérité sur 10 — comme les autres flux du dépôt.
2. **Est-ce que cela concerne réellement Exostic ?** Sa stack, son statut de
   société de conseil française, ou l'un des secteurs où elle intervient.
3. **Qu'est-ce que cela change ?** Rien à faire, à surveiller, ou à faire avant
   une date. Cette partie est une analyse, étiquetée comme telle.

**Critère d'entrée :** une information n'est retenue que si elle peut changer
une décision — mettre à jour, migrer, corriger une faille, facturer autrement,
adapter un contrat, ajuster une offre ou un discours commercial. L'actualité
tech « intéressante » qui ne change aucune décision n'a pas sa place ici.

**Principe fondamental :** 10 informations correctement vérifiées plutôt que 30
informations simplement reprises. La fiabilité passe avant la vitesse.

## 1. Rythme et volume

Un passage toutes les six heures, plus un récapitulatif quotidien à 20 h (heure
de Paris).

- **Au plus deux alertes par passage.** Ce type d'actualité bouge lentement :
  la plupart des passages ne publient rien. Un passage silencieux est un
  résultat normal et attendu, pas un échec.
- Ne pas répéter une information déjà publiée, sauf évolution significative :
  nouvelle entrée indiquant clairement ce qui a changé, avec un lien vers
  l'entrée précédente.

## 2. Périmètre

### Stack technique (`stack`, `securite`)

Technologies affichées sur le site : **TypeScript, JavaScript (ECMAScript),
Node.js, Kubernetes, AWS, microservices, architecture DDD, développement
fullstack, API, bases de données, DevOps, organisation agile.**

Sont retenus :

- versions majeures et LTS, fins de support, dépréciations et changements
  cassants (Node.js, TypeScript, Kubernetes, spécification ECMAScript / TC39
  étape 4, services AWS arrêtés ou profondément modifiés) ;
- failles de sécurité critiques ou activement exploitées touchant cette stack
  ou son écosystème direct ; compromissions de la chaîne d'approvisionnement
  (npm, images de conteneurs, GitHub Actions) ;
- changements de licence, de gouvernance ou de prix d'un outil largement
  utilisé dans cet écosystème ;
- pannes majeures d'AWS ou d'un service dont dépendent couramment ces
  architectures, avec leur analyse a posteriori ;
- évolutions de fond, documentées, des pratiques d'architecture et
  d'ingénierie (microservices, DDD, plateformes, outillage IA du développeur)
  — uniquement lorsqu'elles s'appuient sur des données ou des retours
  d'expérience vérifiables, pas sur une tribune.

Ne sont pas retenus : versions mineures et correctifs ordinaires, tutoriels,
comparatifs, nouveaux frameworks sans adoption mesurable, classements de
popularité, billets d'opinion.

### Marché du conseil et des indépendants en France (`marche`)

- droit et fiscalité applicables à une SAS de conseil et à son dirigeant :
  lois de finances et de financement de la sécurité sociale, cotisations,
  dividendes, TVA, **facturation électronique** (calendrier, plateformes
  agréées), délais de paiement ;
- cadre des prestations intellectuelles : requalification, prêt de
  main-d'œuvre, portage salarial, plateformes d'intermédiation, marchés
  publics, clauses de propriété intellectuelle ;
- réglementation qui s'impose aux logiciels livrés aux clients et crée de la
  demande ou des obligations : NIS 2, DORA, Cyber Resilience Act, AI Act, RGPD,
  accessibilité numérique, souveraineté et qualification SecNumCloud ;
- état du marché : demande en prestations d'ingénierie logicielle, taux
  journaliers, emploi des développeurs, effets mesurés de l'IA sur le métier —
  sur la base d'études dont la méthode est publiée (voir § 5).

### Secteurs clients (`secteur`)

Secteurs affichés sur le site : logistique (stocks, entrepôts, tournées),
e-commerce (catalogues, paiements, tarification), jeux vidéo, Internet des
objets, apprentissage et serious games, réseaux sociaux, big data, ressources
humaines (sourcing, matching), défense (OSINT, GEOINT, détection par IA),
banque et fintech (conformité, détection de fraude).

N'est retenu que ce qui est **structurant pour qui y construit du logiciel** :
nouvelle obligation réglementaire ou norme technique (par exemple paiements,
identité numérique, IA à haut risque dans le recrutement, protection des
mineurs en ligne), commande publique ou programme d'investissement majeur,
bascule technologique documentée, défaillance ou consolidation qui redistribue
un marché. L'actualité courante de ces secteurs — résultats trimestriels,
sorties de jeux, levées de fonds ordinaires — est hors périmètre.

### Hors périmètre, et articulation avec les autres flux

- L'actualité générale de l'IA vit dans le flux `ia`. N'en retenir ici que ce
  qui change concrètement la pratique ou le marché du développement logiciel,
  et renvoyer vers l'entrée du flux `ia` lorsqu'elle existe.
- Les événements de portée mondiale vivent dans le flux `monde`.
- **Rien de confidentiel.** Ce dépôt est public : le flux ne s'appuie que sur
  ce que le site exostic.com affiche. Ne jamais nommer, deviner ni décrire un
  client, une mission, un contrat ou un chiffre d'affaires.

## 3. Nature de l'information — étiquette obligatoire

Chaque entrée porte **une** nature, dans le champ `category` du front matter et
en tête du titre.

| `category` | Préfixe du titre | Ce que c'est |
| --- | --- | --- |
| `stack` | 🛠️ Stack | Version majeure, fin de support, dépréciation, changement de licence ou de prix, panne majeure, évolution documentée des pratiques |
| `securite` | 🔐 Sécurité | Faille critique ou exploitée, compromission de la chaîne d'approvisionnement, incident touchant la stack |
| `marche` | 💼 Marché | Droit, fiscalité, réglementation, état du marché du conseil et des indépendants en France |
| `secteur` | 🏭 Secteur | Fait structurant dans l'un des secteurs clients |

En cas de doute entre `stack` et `securite`, choisir `securite` dès qu'une
action corrective est à envisager.

## 4. Note de vérité sur 10

Une note par information. Elle mesure **la solidité des preuves**, jamais
l'importance de la nouvelle ni son degré d'urgence pour Exostic.

| Note | Signification | Typiquement |
| --- | --- | --- |
| 9–10 🟢 | Très solidement établi | notes de version, tag ou changelog officiels, avis de sécurité de l'éditeur avec identifiant CVE, texte publié au Journal officiel ou sur EUR-Lex, plusieurs sources indépendantes concordantes |
| 7–8 🟢 | Solide | annonce officielle datée dont les détails restent à confirmer, texte adopté mais non encore publié, analyse technique indépendante crédible |
| 4–6 🟠 | Incertain | source unique, projet de texte encore amendable, chiffres fournis par la partie intéressée, faille annoncée sans détail technique ni correctif |
| 1–3 🔴 | Très faible | rumeur, fuite non corroborée, affirmation promotionnelle invérifiable, éléments contradictoires |

**Sur quoi porte la note.** Un éditeur est la source primaire de ce qu'il
publie : l'existence d'une version, d'une date de fin de support ou d'une
grille tarifaire se vérifie dans ses propres documents et peut valoir 9 ou
10/10. Mais :

- performance, gain de productivité, part de marché, nombre d'utilisateurs ou
  économie revendiqués par l'éditeur lui-même : **5/10 au plus** tant qu'aucune
  mesure indépendante n'existe ;
- étude de marché, baromètre de taux journaliers ou enquête publiés par une
  plateforme, un cabinet ou un éditeur qui vend dans ce marché : **6/10 au
  plus**, méthode et échantillon décrits dans l'alerte (voir § 5) ;
- **un projet n'est pas une loi.** Projet ou proposition de loi, amendement,
  annonce ministérielle, consultation, proposition de la Commission : la note
  porte sur l'état réel du texte, qui est dit en toutes lettres (annoncé,
  déposé, adopté en première lecture, adopté définitivement, promulgué, publié,
  entré en application). Une mesure annoncée mais non votée est une
  déclaration, formulée comme telle ;
- fuite, source anonyme unique, capture d'écran : **4/10 au plus**.

## 5. Qui parle, et avec quel intérêt

Se poser la question pour chaque source et écrire la réponse dans l'alerte
lorsqu'un intérêt existe :

- un éditeur ou un fournisseur de cloud a intérêt à présenter ses produits, ses
  prix et ses incidents sous leur meilleur jour ; un concurrent a l'intérêt
  inverse ;
- une société de sécurité qui révèle une faille vend souvent la protection
  correspondante : vérifier la faille dans la base CVE/NVD, l'avis de l'éditeur
  concerné ou une analyse indépendante, et ne pas reprendre son vocabulaire
  alarmiste ;
- les baromètres du freelancing sont presque tous produits par des plateformes
  d'intermédiation, des sociétés de portage ou des cabinets de recrutement,
  sur leur propre base d'utilisateurs : ce sont des parties intéressées et des
  échantillons non représentatifs. Préférer Insee, Dares, Urssaf, Banque de
  France, Eurostat, et sinon dire clairement d'où vient le chiffre ;
- un syndicat professionnel, une fédération ou un collectif d'indépendants
  défend une position : ses communiqués sont des déclarations ;
- Exostic elle-même est une partie intéressée sur son marché : ne pas écrire
  les alertes comme un argumentaire commercial, ne jamais forcer une
  information pour qu'elle paraisse favorable au conseil indépendant.

**Conflit d'intérêts de cette veille.** Les passages sont effectués par un
modèle d'IA développé par Anthropic, qui vend des outils d'assistance au
développement. Toute entrée portant sur l'effet de l'IA sur le métier de
développeur ou sur le marché du conseil applique les mêmes critères à tous les
acteurs, Anthropic compris, et le rappelle en une ligne.

Neutralité politique sur les sujets fiscaux et sociaux : décrire ce que le
texte change, pas s'il est souhaitable.

## 6. Décomposer les affirmations

Une même actualité contient plusieurs niveaux de certitude. Exemple :

- La version X est publiée et devient la LTS active le 28 octobre — 10/10
  (notes de version officielles)
- La version N-2 n'est plus maintenue après le 30 avril — 10/10 (calendrier
  officiel)
- La migration est « sans changement cassant pour la plupart des projets » —
  6/10 (parole de l'éditeur, premiers retours partiels)
- La nouvelle version est « 30 % plus rapide » — 5/10 (banc d'essai de
  l'éditeur, non reproduit)

Le champ `confidence` porte la note de l'affirmation centrale, et le corps
détaille la décomposition.

## 7. Ce que ça change pour Exostic

Chaque alerte se termine, avant les sources, par une section **« Ce que ça
change pour Exostic »**. C'est la raison d'être du flux, et c'est une
**analyse**, pas un fait : elle est rédigée comme telle.

Elle commence par un niveau, en gras :

- **Rien à faire** — à connaître, sans action ;
- **À surveiller** — dépend d'une suite (vote, correctif, décret) ; dire
  laquelle et quand ;
- **À faire** — action concrète, avec l'échéance réelle si elle existe.

Puis deux à quatre phrases : qui est concerné (la société elle-même, les
projets en Node.js / Kubernetes / AWS en général, tel secteur client), ce
qu'il est raisonnable de vérifier ou de préparer, et ce qui relèverait d'une
sur-réaction. Règles :

- rester au niveau de ce que le site affiche : « un projet Node.js encore en
  version N-2 », jamais « le projet du client untel » ;
- ne pas donner de conseil juridique ou fiscal personnalisé : décrire ce que
  le texte impose et renvoyer vers la source officielle ; signaler quand la
  question mérite l'expert-comptable ou un avocat ;
- ne pas inventer d'urgence. Si l'honnêteté commande d'écrire « rien à
  faire », l'information n'avait probablement pas sa place dans le flux —
  sauf s'il s'agit d'écarter une inquiétude très répandue.

## 8. Suivi des échéances

`exostic/state/echeances.md` tient la liste des dates qui engagent : fins de
support, entrées en application de textes, dates limites déclaratives
nouvelles, votes attendus sur un texte suivi. Chaque passage :

1. commence par regarder si une échéance suivie a bougé — report, calendrier
   précisé, texte adopté ou abandonné — et, si oui, publie une alerte qui
   renvoie vers l'entrée d'origine et met la ligne à jour ;
2. signale une échéance **une fois** lorsqu'elle approche (environ 30 jours
   avant), puis la retire une fois passée ;
3. y inscrit toute nouvelle échéance réelle issue d'une alerte publiée.

Seules y figurent des dates tirées d'une source officielle, avec le lien.

## 9. Croisement des sources

Pour chaque information, chercher :

1. la source primaire : notes de version, dépôt de code, avis de sécurité,
   page de statut ou rapport d'incident, texte officiel, communiqué daté de
   l'autorité concernée, étude complète avec sa méthode ;
2. au moins deux sources indépendantes de l'auteur **et** indépendantes entre
   elles. Exception : pour un fait purement documentaire et directement
   vérifiable (une version est publiée, un texte est paru au Journal officiel),
   la source primaire lue directement suffit — le dire dans l'alerte.

Deux sites reprenant le même communiqué ou la même dépêche ne constituent pas
deux confirmations.

Sources utiles, sans exclusive :

- **stack** : nodejs.org (blog, calendrier des versions), dépôts et notes de
  version sur github.com (nodejs/node, microsoft/TypeScript,
  kubernetes/kubernetes), devblogs.microsoft.com/typescript, kubernetes.io/blog,
  tc39.es, aws.amazon.com (What's New, blog, health.aws.amazon.com), CNCF,
  OpenJS Foundation, InfoQ, The Register, LWN, Ars Technica, Next, The New Stack ;
- **sécurité** : NVD / cve.org, GitHub Security Advisories, catalogue KEV de la
  CISA, CERT-FR (cert.ssi.gouv.fr), ANSSI, avis de sécurité de Node.js,
  Kubernetes et AWS, OpenSSF, BleepingComputer, analyses techniques publiées
  avec preuves ;
- **marché** : Légifrance, Journal officiel, impots.gouv.fr, BOFiP, urssaf.fr,
  economie.gouv.fr, entreprendre.service-public.fr, Assemblée nationale et
  Sénat (dossiers législatifs), EUR-Lex, CNIL, Insee, Dares, Banque de France,
  Numeum ; presse : Les Echos, Le Monde, Contexte, Next, L'Usine Digitale,
  Le Monde Informatique ;
- **secteurs** : autorités et régulateurs du secteur (ACPR, AMF, Banque de
  France, EBA, Arcom, Arcep, DGA / ministère des Armées, Commission
  européenne), puis presse spécialisée.

Lorsqu'une source n'est pas lisible directement (accès payant, blocage), la
citer comme référence, le dire explicitement et baisser la note en
conséquence. Ne jamais inventer une source, une URL, un numéro de version, un
identifiant CVE ni une citation.

## 10. Format d'une alerte

Un fichier Markdown par alerte, chemin
`exostic/alerts/AAAA/MM/AAAA-MM-JJ-HH-MM-titre-court.md` (heure de Paris).

```markdown
---
title: "🛠️ Stack — [titre neutre]"
date: 2026-09-20T15:40:00+02:00
type: alert
feed: exostic
category: stack
confidence: 9
summary: "Résumé en une ou deux phrases : le fait, puis ce que ça change (rien à faire / à surveiller / à faire avant telle date)."
---

# 🛠️ Stack — [titre neutre]

**Date de publication :** 20 septembre 2026, 15 h 40 (heure de Paris)
**Nature : stack technique**
**Note de vérité : 9/10 🟢**
**Pour Exostic : à faire avant le [date]** (ou : à surveiller / rien à faire)

Résumé en quelques paragraphes, en termes précis : versions, dates, articles
de loi, seuils, montants.

## Confirmé

Ce que la source primaire et les sources indépendantes établissent.

## Incertain

Ce qui manque, ce qui peut encore changer, ce qui ne repose que sur une
partie intéressée.

## Qui parle, et avec quel intérêt

À inclure dès qu'une source a un intérêt dans le sujet (§ 5).

## Décomposition des affirmations

- Affirmation A — 10/10
- Affirmation B — 5/10

## Pourquoi 9/10 ?

Explication en une ou deux phrases, plafond appliqué le cas échéant.

## Ce que ça change pour Exostic

**À faire — avant le [date].** Analyse en deux à quatre phrases (§ 7).

## Sources

- **Source primaire** — [intitulé](https://…)
- **Indépendante** — [intitulé](https://…)
- **Partie intéressée** — [intitulé](https://…)
```

Adaptations selon la nature :

- `securite` : préciser les versions touchées, les versions corrigées,
  l'identifiant CVE ou GHSA, le score de gravité et sa source, et si une
  exploitation réelle est documentée (par qui) ;
- `marche` : dire l'état exact du texte (§ 4), la date d'entrée en
  application, qui est concerné (toutes les sociétés, les SAS, les
  prestataires de tel secteur) ; une déclaration gouvernementale est formulée
  comme telle ;
- `secteur` : dire en quoi le fait est structurant pour qui y construit du
  logiciel, et non pour le secteur en général.

## 11. Récapitulatif quotidien

Chaque jour à 20 h (heure de Paris), un fichier
`exostic/daily/AAAA/MM/AAAA-MM-JJ-brief-exostic.md`, avec `type: daily`,
`feed: exostic` et `category: briefing`.

3 à 6 informations au plus, classées par importance à l'intérieur de chaque
rubrique :

- 🛠️ Stack
- 🔐 Sécurité
- 💼 Marché du conseil
- 🏭 Secteurs clients

Pour chaque information : titre — note X/10, résumé court, ce qui est établi,
ce qui reste incertain, **ce que ça change** en une ligne, sources croisées.
Une rubrique vide est omise.

Terminer par :

### ✅ À faire

Uniquement les actions réelles, avec leur échéance. Omettre la section s'il
n'y en a aucune.

### 📅 Échéances à venir

Les lignes de `exostic/state/echeances.md` qui tombent dans les 30 jours.

### 🧭 Ce qu'il faut retenir

Une à trois évolutions de fond, sans dramatiser et sans présenter de
prédiction comme certaine.

**Jour sans nouveauté.** Si la journée n'a produit aucune alerte et qu'aucune
recherche complémentaire ne donne d'information retenable, **ne rien
publier** : sur ce flux, les journées calmes sont la règle, et un brief vide
chaque soir serait du bruit. Exception : le lundi, publier dans tous les cas
un récapitulatif, même court, qui reprend les échéances à venir — il sert de
point hebdomadaire.

## 12. Publication

- Le front matter (`title`, `date`, `type`, `feed`, `category`, `confidence`,
  `summary`) alimente `feeds/exostic.xml` et `feeds/all.xml`, régénérés
  automatiquement par GitHub Actions. Ne jamais éditer ces fichiers à la main.
- **Un seul commit par passage** : alertes, récapitulatif éventuel et fichiers
  de `exostic/state/` partent ensemble (`push_files` côté connecteur MCP).
  Message : `exostic: 1 alerte — [sujet court]` ou `exostic: brief 2026-09-20`.
  Jamais de réécriture d'historique ni de push forcé.
- **Ne pas modifier les fichiers existants**, sauf pour corriger une erreur
  factuelle ou technique clairement identifiée, signalée par une section
  `## ✏️ Correction` datée. Une situation qui évolue donne une nouvelle alerte,
  pas une réécriture de l'ancienne.

## 13. Anti-doublon

`exostic/state/derniers-sujets.md` tient la liste des sujets publiés
récemment. Chaque passage :

1. lit ce fichier et `exostic/state/echeances.md` avant de chercher ;
2. ne republie pas un sujet qui y figure, sauf évolution significative ;
3. ajoute en tête la ligne des sujets qu'il vient de publier
   (`- AAAA-MM-JJ HH:MM — [nature] sujet — chemin du fichier`) ;
4. élague les lignes de plus de 30 jours — ce flux publie peu, et les sujets
   y reviennent lentement.

Ces fichiers partent **dans le même commit** que les alertes qu'ils
enregistrent.
