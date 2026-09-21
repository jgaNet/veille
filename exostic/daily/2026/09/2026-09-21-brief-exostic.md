---
title: "Brief Exostic — 21 septembre 2026"
date: 2026-09-21T20:00:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Point hebdomadaire. Deux durcissements de la chaîne de publication à anticiper : GitHub bloquera par défaut `pull_request_target` sur les dépôts publics le 2 novembre 2026, et npm vise janvier 2027 pour retirer la publication directe aux jetons qui contournent la 2FA. TypeScript 7.1 (API de programmation) est planifiée pour le 24 novembre, date provisoire. Budget 2027 : toujours aucun texte présenté — et une correction du brief d'hier, le barème de l'impôt serait indexé et non gelé."
---

# Brief Exostic — 21 septembre 2026

**Date de publication :** 21 septembre 2026, 20 h 00 (heure de Paris)

Point hebdomadaire du lundi. Aucune alerte n'a été publiée aujourd'hui ; les
recherches du soir donnent 4 informations retenables, dont une suite et une
correction du brief d'hier. Le flux ayant été amorcé le 20 septembre, la
« semaine écoulée » se résume aux trois alertes de calage de la veille,
rappelées dans les sections de fin. Les notes mesurent la solidité des
preuves, jamais l'urgence.

Vérifications sans résultat, lues directement ce soir : la page des avis de
sécurité de Node.js (dernier bulletin : 29 juillet 2026), la liste d'annonces
de sécurité de Kubernetes (dernière annonce : 22 juillet 2026) et la page
d'accueil du CERT-FR ne montrent aucune faille critique nouvelle touchant la
stack ; le catalogue KEV de la CISA n'a pas pu être lu (erreur 403). Node.js
26.9.0 (16 septembre) est une version mineure, non retenue. La rubrique
🏭 Secteurs clients est omise faute de fait structurant vérifié aujourd'hui.

---

## 🔐 Sécurité

### 1. GitHub Actions : `pull_request_target` bloqué par défaut sur les dépôts publics, application le 2 novembre 2026 — note 9/10 🟢

GitHub a annoncé le 17 septembre 2026 la disponibilité générale des
« protections d'exécution » des workflows : une liste d'autorisation qui fixe
qui peut déclencher un workflow GitHub Actions et par quels événements, au
niveau de l'entreprise, de l'organisation ou du dépôt. Avec elle arrive une
règle par défaut : pour les dépôts **publics** qui n'ont pas déjà de politique
d'événements applicable, l'événement `pull_request_target` est désactivé. La
règle tourne d'abord en mode « évaluation » — elle signale les exécutions qui
seraient bloquées sans les bloquer — puis sera **appliquée automatiquement le
2 novembre 2026**. `pull_request_target` exécute un workflow avec les droits
et les secrets du dépôt cible à partir d'une pull request venue d'un fork ;
c'est un vecteur classique de compromission de la chaîne d'approvisionnement.

**Ce qui est établi.** L'annonce, le périmètre (dépôts publics sans politique
d'événements), le mode évaluation et la date du 2 novembre : billet du
changelog GitHub du 17 septembre 2026 et documentation GitHub (« About Actions
policies »), lus directement et concordants. Fait documentaire, vérifiable à la
source : la source primaire suffit (§ 9 des consignes). Les reprises trouvées
ne sont que des recopies du changelog et ne comptent pas comme confirmations.

**Ce qui reste incertain.** Le comportement exact pour les dépôts créés après
l'annonce et le détail par offre (gratuite, Team, Enterprise) n'ont pas été lus
dans un document officiel. Les dépôts privés ne sont pas visés par la règle par
défaut d'après le billet.

**Ce que ça change — à faire avant le 2 novembre 2026** *(analyse)*, seulement
pour qui maintient un dépôt public dont un workflow utilise
`pull_request_target` (étiquetage automatique, commentaires de revue, robots) :
consulter le tableau « Insights » du mode évaluation, puis soit laisser la
règle bloquer, soit autoriser explicitement l'événement pour les workflows qui
en dépendent. Sur-réaction : toucher aux workflows des dépôts privés, non
concernés.

Sources : [GitHub Changelog, « Workflow execution protections in GitHub Actions generally available », 17 septembre 2026 — source primaire](https://github.blog/changelog/2026-09-17-workflow-execution-protections-in-github-actions-generally-available/) · [GitHub Docs, « About Actions policies » — source primaire](https://docs.github.com/en/actions/concepts/about-actions-policies)

### 2. npm : jetons « stage only » disponibles, fin de la publication directe par jeton contournant la 2FA visée pour janvier 2027 — note 8/10 🟢

Depuis le 18 septembre 2026, les jetons d'accès granulaires npm peuvent porter
un nouveau niveau de droit, « lecture et écriture (mise en attente
uniquement) » : une automatisation peut déposer une version avec
`npm stage publish`, mais un `npm publish` direct est refusé ; un mainteneur
doit approuver la version en attente avec sa double authentification.
Prérequis indiqués : npm CLI 11.15.0 ou plus, Node.js 22.14.0 ou plus, 2FA
activée, paquet déjà existant sur le registre. Le billet rappelle le
calendrier : npm **vise janvier 2027** pour retirer la publication directe aux
jetons configurés pour contourner la 2FA — ceux qu'emploient couramment les chaînes
d'intégration continue qui publient avec un jeton. Depuis le 31 juillet
2026, ces jetons ne peuvent déjà plus gérer comptes, organisations, mainteneurs
ni jetons. Les deux voies de sortie proposées sont la « publication de
confiance » (OIDC, sans jeton longue durée) et, à défaut, la mise en attente.

**Ce qui est établi.** La fonctionnalité, ses prérequis et la restriction du
31 juillet : billets du changelog GitHub des 18 septembre et 31 juillet 2026 et
documentation npm (« Staged publishing »), lus directement. TechTimes
(1er août 2026, lu directement) rapporte de façon indépendante la restriction
de juillet et l'échéance de janvier 2027.

**Ce qui reste incertain.** « Janvier 2027 » est une cible (*targeting*), sans
jour précis, énoncée par l'éditeur : elle peut glisser. C'est ce qui ramène la
note à 8 ; l'existence de la fonctionnalité vaut 10. L'efficacité de ces
mesures contre les vers npm de 2026 est une appréciation, pas un fait mesuré ;
GitHub, propriétaire de npm, est partie intéressée lorsqu'il présente ses
propres mesures de sécurité.

**Ce que ça change — à faire avant janvier 2027** *(analyse)*, uniquement pour
les projets qui **publient** des paquets sur le registre npm depuis une CI avec
un jeton : migrer vers la publication de confiance, ou vers un jeton « stage
only » avec approbation humaine. Les projets qui ne font que consommer des
paquets — le cas courant d'une application ou d'un microservice — n'ont rien à
faire. Un registre privé autre que npmjs.com n'est pas concerné par ce billet.

Sources : [GitHub Changelog, « Stage-only npm tokens for safer automation », 18 septembre 2026 — source primaire](https://github.blog/changelog/2026-09-18-stage-only-npm-tokens-for-safer-automation/) · [GitHub Changelog, « Restricting npm bypass-2FA granular access tokens », 31 juillet 2026 — source primaire](https://github.blog/changelog/2026-07-31-restricting-npm-bypass-2fa-granular-access-tokens/) · [npm Docs, « Staged publishing » — source primaire](https://docs.npmjs.com/staged-publishing) · [TechTimes, « npm Closes Skeleton-Key Attack Surface », 1er août 2026 — indépendante](https://www.techtimes.com/articles/322609/20260801/npm-closes-skeleton-key-attack-surface-bypass-tokens-lose-account-control.htm)

---

## 🛠️ Stack

### 3. TypeScript 7.1 : version stable planifiée pour le 24 novembre 2026, date provisoire — note 7/10 🟢

Suite du [brief d'hier](2026-09-20-brief-exostic.md), qui notait qu'aucune
date n'était connue pour la 7.1. Le plan d'itération publié par l'équipe
TypeScript sur GitHub (ticket n° 63703) donne : bêta le 6 octobre 2026,
*release candidate* le 10 novembre, version stable le **24 novembre 2026**. Le
premier objectif listé est de « stabiliser l'API » (accès programmatique au
compilateur, émission, service de langage) — la pièce dont l'absence dans la
7.0 oblige aujourd'hui typescript-eslint et d'autres outils à faire cohabiter
TypeScript 6 et 7. Le plan mentionne aussi une option `es2026` pour `lib` et
`target`.

**Ce qui est établi.** L'existence du plan et ses trois dates : ticket du dépôt
`microsoft/TypeScript`, lu directement (source primaire).

**Ce qui reste incertain.** Ce sont des dates de plan, pas des engagements : un
commentaire d'un responsable de l'équipe, sur le même ticket, évoque un
décalage de la bêta d'environ deux semaines. Rien ne garantit que l'API
stabilisée couvrira dès la 7.1 les besoins de Vue, Svelte, Astro ou Angular :
cela dépendra aussi du rythme d'adoption par ces outils. Aucune date n'est donc
inscrite aux échéances suivies.

**Ce que ça change — à surveiller** *(analyse)* : la sortie de la bêta, puis
les annonces de compatibilité des outils réellement utilisés dans chaque
projet. Pour un projet stable en TypeScript 6 dont la chaîne dépend de l'API du
compilateur, attendre la 7.1 reste l'option raisonnable ; l'horizon passe de
« inconnu » à « fin d'année, sous réserve ».

Sources : [Dépôt `microsoft/TypeScript`, « TypeScript 7.1 Iteration Plan », ticket n° 63703 — source primaire](https://github.com/microsoft/TypeScript/issues/63703) · [Équipe TypeScript, « Announcing TypeScript 7.0 », 8 juillet 2026 — source primaire](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)

---

## 💼 Marché du conseil

### 4. Budget 2027 : le gouvernement déclare vouloir indexer le barème de l'impôt sur le revenu — correction du brief d'hier ; toujours aucun texte présenté — note 6/10 🟠

**État du texte : annoncé, non présenté en Conseil des ministres, non déposé.**

**Correction.** Le brief du 20 septembre écrivait que le gouvernement déclarait
« maintenir le gel du barème de l'impôt sur le revenu ». C'était une erreur de
lecture : la phrase de LégiFiscal est « Matignon écarte toute hausse d'impôts
et le gel du barème de l'IR » — le gel est **écarté**. La porte-parole du
gouvernement a déclaré le 13 septembre 2026 sur BFMTV : « Nous proposerons
l'indexation du barème de l'impôt sur le revenu sur l'inflation complète, pas
en partie » (propos rapportés par MoneyVox, 14 septembre, et Entrevue,
15 septembre, lus directement). Le brief d'hier est corrigé, avec une section
de correction datée.

**Du nouveau depuis hier.** D'après LégiFiscal (20 septembre 2026), les
éléments transmis par Matignon au Haut Conseil des finances publiques tablent
pour 2027 sur un taux de prélèvements obligatoires de 44,2 % du PIB (+0,3 point
sur un an), une croissance de 1 % et une dette publique à 121,7 % du PIB ; la
hausse du taux s'expliquerait pour l'essentiel par le maintien de la
contribution exceptionnelle sur les bénéfices des grandes entreprises. Le
gouvernement déclare par ailleurs des taux de TVA stables.

**Ce qui est établi.** Que ces déclarations ont été faites, et dans quels
termes. Rien, dans ce qui a pu être lu, ne vise les dividendes, les cotisations
du dirigeant, l'impôt sur les sociétés des PME ni la TVA des prestations.

**Ce qui reste incertain.** Tout le reste. Les chiffres transmis au Haut
Conseil sont rapportés par une seule source secondaire ; le site du Haut
Conseil n'a pas pu être lu (blocage), la dépêche AEF sur la saisine non plus.
Les dates qui circulent — présentation en Conseil des ministres le
30 septembre, dépôt au Parlement « au plus tard le 6 octobre » — viennent de la
presse et non d'une source officielle lue directement : elles ne sont pas
inscrites aux échéances suivies. Un projet de loi de finances est amendable
jusqu'à son adoption définitive ; une indexation proposée n'est pas une
indexation votée.

**Ce que ça change — à surveiller** : le texte présenté en Conseil des
ministres, l'avis du Haut Conseil, puis le projet de loi de financement de la
sécurité sociale. Aucune décision à prendre d'ici là. Le moment venu, la
lecture des mesures touchant une SAS et son dirigeant relève de
l'expert-comptable.

Sources : [LégiFiscal, « PLF 2027 : 0,3 point de prélèvements obligatoires en plus », 20 septembre 2026 — secondaire, lue directement](https://www.legifiscal.fr/actualites-fiscales/4641-plf-2027-03-point-prelevements-obligatoires.html) · [LégiFiscal, « Projet de loi de finances pour 2027 : les annonces de Sébastien Lecornu », 18 septembre 2026 — secondaire, relue directement](https://www.legifiscal.fr/actualites-fiscales/4639-projet-loi-finances-2027-annonces-sebastien-lecornu.html) · [MoneyVox, « Impôt sur le revenu 2027 : les nouvelles tranches du barème dégelé par le gouvernement », 14 septembre 2026 — lue directement](https://www.moneyvox.fr/impot/actualites/110310/impot-sur-le-revenu-2027-les-nouvelles-tranches-du-bareme-degele-par-le-gouvernement) · [Entrevue, « Budget 2027 : le gouvernement écarte le gel du barème de l'impôt sur le revenu », 15 septembre 2026 — lue directement](https://entrevue.fr/politique-economique/budget-2027-le-gouvernement-ecarte-le-gel-du-bareme-de-limpot-sur-le-revenu/) · [Assemblée nationale, page du projet de loi de finances pour 2027 — lue directement, aucun texte déposé à ce jour sur la page](https://www.assemblee-nationale.fr/dyn/budget-et-securite-sociale/les-lois-de-finances-depuis-1998/projet-de-loi-de-finances-pour-2027) · [AEF info, dépêche sur la transmission du projet de budget au Haut Conseil des finances publiques — non lisible directement (blocage), titre seul](https://www.aefinfo.fr/depeche/757022-le-gouvernement-transmet-son-projet-de-budget-2027-au-haut-conseil-des-finances-publiques)

---

### ✅ À faire

Nouveautés du jour, puis rappel des actions ouvertes par les alertes du
20 septembre.

- **Avant le 2 novembre 2026** — pour tout dépôt GitHub public dont un workflow
  utilise `pull_request_target` : lire le mode évaluation, puis autoriser
  explicitement l'événement ou accepter le blocage.
- **Avant janvier 2027 (cible de l'éditeur, jour non précisé)** — pour toute CI
  qui publie sur npmjs.com avec un jeton contournant la 2FA : passer à la
  publication de confiance (OIDC) ou à un jeton « stage only ».
- **Dès maintenant (exigible depuis le 1er septembre 2026)** — vérifier qu'une
  plateforme agréée est désignée pour la réception des factures électroniques.
  [Alerte](../../../alerts/2026/09/2026-09-20-11-05-facturation-electronique-reception-obligatoire.md)
- **Avant le 27 octobre 2026** — mettre à niveau tout cluster Kubernetes 1.34
  autogéré ; **avant le 26 novembre 2026** tout cluster EKS resté en 1.31 ;
  **avant le 2 décembre 2026** tout cluster EKS 1.34, ou accepter en
  connaissance de cause le tarif du support étendu.
  [Alerte](../../../alerts/2026/09/2026-09-20-11-00-kubernetes-1-34-fin-de-vie-node-26-lts.md)
- **Sans date butoir (obligation en vigueur depuis le 11 septembre 2026)** —
  repérer les projets qui sont des « produits » au sens du Cyber Resilience Act
  et clarifier par contrat qui détecte, qui prévient et qui notifie.
  [Alerte](../../../alerts/2026/09/2026-09-20-10-55-cra-signalement-vulnerabilites-24h.md)

### 📅 Échéances à venir

Dans les 30 jours :

- **20 octobre 2026** — Node.js 24 passe d'Active LTS à maintenance (date
  prévue, calendrier « susceptible de changer ») — [nodejs/Release](https://github.com/nodejs/Release)

Juste au-delà : 27 octobre (fin de vie de Kubernetes 1.34), 28 octobre
(Node.js 26 en Active LTS) et, nouvelle ligne inscrite ce soir, **2 novembre
2026** (blocage par défaut de `pull_request_target` sur les dépôts GitHub
publics). Également inscrite : janvier 2027, cible de npm pour la fin de la
publication directe par jeton contournant la 2FA.

### 🧭 Ce qu'il faut retenir

- **La publication de code se referme par défaut.** Après les vers npm de
  l'année, GitHub et npm déplacent la sécurité du côté des réglages par défaut
  — événements à risque bloqués, publication soumise à approbation humaine ou à
  une identité de courte durée. Pour la plupart des projets, c'est une
  vérification ponctuelle ; pour ceux qui publient des paquets, un chantier de
  CI à planifier avant l'hiver.
- **TypeScript 7 : la cohabitation 6/7 a désormais un horizon**, fin novembre
  si le plan tient — à prendre comme une date de plan, pas comme une promesse.
- **Budget 2027 : le calendrier avance, le contenu reste déclaratif.** Tant
  qu'aucun texte n'est présenté, les annonces se lisent comme des intentions —
  et se relisent avec soin, comme le rappelle la correction du jour.
