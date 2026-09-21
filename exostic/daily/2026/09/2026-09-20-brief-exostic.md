---
title: "Brief Exostic — 20 septembre 2026"
date: 2026-09-20T20:00:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Premier brief du flux : fins de support Kubernetes 1.34 et bascule LTS de Node.js fin octobre, TypeScript 7 désormais version par défaut sur npm, signalement sous 24 h du Cyber Resilience Act applicable depuis le 11 septembre, réception des factures électroniques exigible depuis le 1er septembre, premières annonces — non votées — sur le budget 2027. Aucune faille critique nouvelle sur la stack."
---

# Brief Exostic — 20 septembre 2026

**Date de publication :** 20 septembre 2026, 20 h 00 (heure de Paris)

Premier récapitulatif du flux, amorcé aujourd'hui : 5 informations retenues,
dont trois alertes de calage publiées ce matin et deux compléments issus des
recherches du soir. Les notes mesurent la solidité des preuves, jamais
l'urgence. La rubrique 🔐 Sécurité est omise : les pages d'avis de sécurité de
Node.js (dernier bulletin : 29 juillet 2026), la liste d'annonces de sécurité
de Kubernetes (dernière annonce : 22 juillet 2026) et la page d'accueil du
CERT-FR, lues directement ce soir, ne montrent aucune faille critique nouvelle
touchant la stack ; le catalogue KEV de la CISA n'a pas pu être lu (blocage).
La rubrique 🏭 Secteurs clients est omise faute de fait structurant vérifié
aujourd'hui.

---

## 🛠️ Stack

### 1. Kubernetes 1.34 en fin de vie le 27 octobre, Node.js 26 en LTS le 28 octobre — note 9/10 🟢

Kubernetes 1.34 ne reçoit plus aucun correctif du projet amont après le
27 octobre 2026. Sur Amazon EKS, le support standard de la 1.34 s'arrête le
2 décembre 2026, avec bascule par défaut en support étendu facturé (plan de
contrôle à 0,60 $ au lieu de 0,10 $ par cluster et par heure) ; EKS 1.31 sort
du support étendu le 26 novembre et sera alors mis à niveau d'office. Côté
Node.js, la version 24 passe en maintenance le 20 octobre, la 26 devient Active
LTS le 28 octobre, la 22 atteint sa fin de vie le 30 avril 2027.

**Ce qui est établi.** Toutes les dates viennent des calendriers officiels lus
directement (kubernetes.io, documentation et tarifs Amazon EKS, dépôt
`nodejs/Release`), recoupés pour Kubernetes par endoflife.date.

**Ce qui reste incertain.** Les bascules Node.js d'octobre sont des dates
prévues, le calendrier portant la mention « susceptible de changer » ; AWS ne
donne ni préavis ni créneau pour ses mises à niveau automatiques.

**Ce que ça change — à faire** avant le 27 octobre (cluster 1.34 autogéré),
le 26 novembre (EKS 1.31) ou le 2 décembre (EKS 1.34) ; rien ne presse pour un
projet en Node.js 24.

Alerte détaillée : [Kubernetes 1.34 en fin de vie, Node.js 26 en LTS](../../../alerts/2026/09/2026-09-20-11-00-kubernetes-1-34-fin-de-vie-node-26-lts.md)

Sources : [Kubernetes, « Patch Releases »](https://kubernetes.io/releases/patch-releases/) · [Amazon EKS, cycle de vie des versions](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html) · [Node.js Release Working Group](https://github.com/nodejs/Release) · [endoflife.date, Kubernetes](https://endoflife.date/kubernetes)

### 2. TypeScript 7 est la version installée par défaut depuis npm — sans API de programmation pour l'instant — note 9/10 🟢

Complément de calage, le fait n'est pas du jour : Microsoft a annoncé le
8 juillet 2026 la disponibilité générale de TypeScript 7.0, portage natif (en
Go) du compilateur. Le registre npm sert ce soir la version **7.0.2** sous
l'étiquette `latest` : un `npm install -D typescript` sans contrainte de
version installe donc la 7. D'après le billet d'annonce, la 7.0 transforme en
erreurs plusieurs options jusque-là dépréciées (`target: es5`, `baseUrl`,
`moduleResolution: node`/`node10`/`classic`, `module: amd`/`umd`/`systemjs`/`none`,
`esModuleInterop: false`, entre autres) et **ne fournit pas d'API de
programmation** : une nouvelle API, différente, est attendue avec la 7.1.
Dans l'intervalle, le paquet `@typescript/typescript6` (exécutable `tsc6`)
permet de faire cohabiter les deux versions pour les outils qui ont besoin
d'un accès programmatique, comme typescript-eslint. Le billet précise que les
chaînes Vue, MDX, Astro, Svelte et la vérification des gabarits Angular ne
peuvent vraisemblablement pas encore s'appuyer sur TypeScript 7.

**Ce qui est établi.** La disponibilité générale et la date (billet officiel de
l'équipe TypeScript, lu directement ; InfoWorld, 13 juillet 2026, lu
directement) ; la version 7.0.2 sous `latest` (registre npm, lu directement) ;
la liste des options supprimées et l'absence d'API (billet officiel).

**Ce qui reste incertain.** Les gains annoncés — « 8x à 12x » sur une
compilation complète — sont des mesures de l'éditeur et d'entreprises qu'il
cite : 5/10 tant qu'aucun banc d'essai indépendant n'a été lu. Aucune date
n'est donnée pour la 7.1 ; le billet ne dit rien de la durée de maintenance de
TypeScript 6. La page des versions du dépôt GitHub `microsoft/TypeScript`
affiche encore la 6.0.3 comme dernière version — la 7 est publiée sur npm, pas
à cet endroit.

**Ce que ça change — à surveiller** *(analyse)*. Un projet existant dont la
dépendance est bornée à la version 6 (`^6.0.0`) ne bascule pas tout seul ; le
point de vigilance concerne les nouveaux projets, les images et scripts qui
installent `typescript` sans version, et les chaînes qui dépendent de l'API du
compilateur. Il est raisonnable de vérifier son `tsconfig.json` au regard des
options supprimées avant toute montée de version, et d'attendre la 7.1 pour
les projets Vue, Svelte, Astro ou Angular. Sur-réaction : migrer dans
l'urgence un projet stable en 6.0.

Sources : [Équipe TypeScript, « Announcing TypeScript 7.0 », 8 juillet 2026 — source primaire, partie intéressée sur les performances](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) · [Registre npm, `typescript@latest` — source primaire](https://registry.npmjs.org/typescript/latest) · [InfoWorld, « Go-based TypeScript 7.0 arrives », 13 juillet 2026 — indépendante](https://www.infoworld.com/article/4196378/go-based-typescript-7-0-arrives.html) · [Dépôt `microsoft/TypeScript`, versions](https://github.com/microsoft/TypeScript/releases)

---

## 💼 Marché du conseil

### 3. Cyber Resilience Act : le signalement sous 24 h s'applique depuis le 11 septembre 2026 — note 9/10 🟢

Depuis le 11 septembre 2026, le fabricant d'un « produit comportant des
éléments numériques » doit signaler toute vulnérabilité activement exploitée et
tout incident grave : alerte sous 24 h, notification sous 72 h, rapport final
ensuite, via la plateforme unique de l'ENISA (en France, vers le CERT-FR). Les
produits déjà sur le marché sont couverts. Le reste du règlement (UE) 2024/2847
s'applique le 11 décembre 2027.

**Ce qui est établi.** Dates, délais et canal : Commission européenne, ENISA et
ANSSI, lues directement et concordantes ; ouverture de la plateforme confirmée
par Help Net Security. Le « fabricant » est celui qui commercialise sous son
nom, y compris s'il a fait développer le produit par un tiers.

**Ce qui reste incertain.** La frontière du champ pour le logiciel exploité en
service (un SaaS pur est en principe hors champ : 6/10, à qualifier au cas par
cas) ; le texte sur EUR-Lex n'a pas pu être lu directement ; l'articulation
avec NIS 2, dont la loi française de transposition n'est pas promulguée d'après
la dernière mise à jour de la FAQ officielle de l'ANSSI — page datée du
19 septembre 2025, donc ancienne.

**Ce que ça change — à faire**, sans date butoir : repérer les projets qui sont
des « produits » au sens du règlement et vérifier que les contrats disent qui
surveille, qui prévient et qui notifie. La qualification et les clauses
relèvent d'un avocat.

Alerte détaillée : [CRA — signalement sous 24 h](../../../alerts/2026/09/2026-09-20-10-55-cra-signalement-vulnerabilites-24h.md)

Sources : [Commission européenne, « CRA — Reporting obligations »](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) · [ENISA, lancement de la plateforme unique, 11 septembre 2026](https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched) · [ANSSI, cadre réglementaire du CRA](https://cyber.gouv.fr/reglementation/cybersecurite-des-produits/cyber-resilience-act/cadre-r%C3%A8glementaire-du-cra/) · [Help Net Security, 14 septembre 2026](https://www.helpnetsecurity.com/2026/09/14/enisa-cra-single-reporting-platform/) · [ANSSI, FAQ NIS 2 — avancement de la transposition](https://aide.monespacenis2.cyber.gouv.fr/fr/article/avancement-de-la-transposition-de-la-directive-nis-2-1b3j1da/)

### 4. Facturation électronique : réception exigible depuis le 1er septembre 2026, émission des PME au 1er septembre 2027 — note 9/10 🟢

Le calendrier officiel est tenu, sans report ni suspension : depuis le
1er septembre 2026, toute entreprise assujettie à la TVA établie en France doit
pouvoir recevoir des factures électroniques via une plateforme agréée ; les
grandes entreprises et ETI doivent en outre émettre. L'émission et
l'*e-reporting* s'étendent aux PME et micro-entreprises le 1er septembre 2027.

**Ce qui est établi.** Calendrier et obligations : economie.gouv.fr,
impots.gouv.fr, guide pratique de la DGFiP et Service public, lus directement.
La tolérance de démarrage annoncée par l'administration vise les entreprises
engagées dans une mise en conformité sérieuse ; elle n'est pas un report.

**Ce qui reste incertain.** Les montants des sanctions n'ont pas été lus dans
un texte officiel ; la durée de la phase de tolérance n'est pas bornée ; aucun
bilan chiffré officiel des premières semaines n'existe — ceux qui circulent
viennent d'éditeurs de plateformes, parties intéressées.

**Ce que ça change — à faire** : vérifier qu'une plateforme agréée est bien
désignée pour la réception ; préparer l'émission avant le 1er septembre 2027.
Catégorie de taille et choix de plateforme sont à voir avec l'expert-comptable.

Alerte détaillée : [Facturation électronique — réception obligatoire](../../../alerts/2026/09/2026-09-20-11-05-facturation-electronique-reception-obligatoire.md)

Sources : [Ministère de l'Économie, facturation électronique](https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises) · [impots.gouv.fr, plateformes agréées](https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees) · [Entreprendre.Service-Public.fr](https://entreprendre.service-public.gouv.fr/actualites/A18953)

### 5. Budget 2027 : premières annonces du Premier ministre, aucun texte déposé — note 6/10 🟠

**État du texte : annoncé, non présenté, non déposé.** D'après LégiFiscal
(18 septembre 2026), qui rend compte d'un entretien du Premier ministre au
*Figaro* paru le 17 septembre, le gouvernement **déclare** viser un effort de
54 milliards d'euros, écarter le gel du barème de l'impôt sur le revenu
*(phrase corrigée le 21 septembre 2026, voir « ✏️ Correction » en fin de page)* et
reconduire à un niveau réduit la surtaxe sur les bénéfices des grandes
entreprises (5 milliards d'euros au lieu d'environ 8), les ETI en étant
exclues. Le projet de loi de finances pour 2027 serait présenté en Conseil des
ministres le 30 septembre 2026. Rien, dans ce qui a pu être lu, ne porte sur
les dividendes, les cotisations des dirigeants, la TVA ou les petites sociétés.

**Ce qui est établi.** L'existence de l'entretien et l'ordre de grandeur de
54 milliards, repris aussi par L'Usine Nouvelle (titre seul : article non
lisible directement). Le dossier « Budget 2027 » de Public Sénat, lu
directement, fait état d'un séminaire gouvernemental le 17 septembre et
d'arbitrages encore en cours.

**Ce qui reste incertain.** Tout le reste : ce sont des déclarations, toutes
issues du même entretien — elles ne valent pas confirmations indépendantes
entre elles ; l'entretien lui-même (accès payant) n'a pas été lu. La date du
30 septembre ne vient pas d'une source officielle lue directement et n'est
donc pas inscrite aux échéances suivies. Un projet de loi de finances est
amendable jusqu'à son adoption définitive.

**Ce que ça change — à surveiller** : le texte présenté en Conseil des
ministres, puis le projet de loi de financement de la sécurité sociale, seuls
documents qui diront si une mesure touche une SAS de conseil ou son dirigeant.
D'ici là, aucune décision à prendre sur la foi d'un entretien.

Sources : [LégiFiscal, « Projet de loi de finances pour 2027 : les annonces de Sébastien Lecornu », 18 septembre 2026 — secondaire, lue directement](https://www.legifiscal.fr/actualites-fiscales/4639-projet-loi-finances-2027-annonces-sebastien-lecornu.html) · [L'Usine Nouvelle, « Budget 2027 : Sébastien Lecornu propose 54 milliards d'euros d'économies… » — non lisible directement (blocage), titre seul](https://www.usinenouvelle.com/eco-social/budget-2027-lecornu-propose-54-milliards-deuros-deconomies-alerte-les-oppositions-sur-la-contrainte-du-reel.MVTESMBGT5FNFCPE5Q2AXA4ZDY.html) · [Public Sénat, dossier « Budget 2027 » — lue directement](https://www.publicsenat.fr/dossier/budget-2027)

---

### ✅ À faire

- **Dès maintenant (exigible depuis le 1er septembre 2026)** — vérifier qu'une
  plateforme agréée est désignée pour la réception des factures électroniques.
- **Avant le 27 octobre 2026** — mettre à niveau tout cluster Kubernetes 1.34
  autogéré ; **avant le 26 novembre 2026** tout cluster EKS resté en 1.31 ;
  **avant le 2 décembre 2026** tout cluster EKS 1.34, ou accepter en
  connaissance de cause le tarif du support étendu.
- **Sans date butoir (obligation en vigueur depuis le 11 septembre 2026)** —
  repérer les projets qui sont des « produits » au sens du CRA et clarifier par
  contrat qui détecte, qui prévient et qui notifie.
- **Avant le 1er septembre 2027** — être en mesure d'émettre des factures
  électroniques (PME et micro-entreprises).

### 📅 Échéances à venir

Dans les 30 jours :

- **20 octobre 2026** — Node.js 24 passe d'Active LTS à maintenance (date
  prévue, calendrier « susceptible de changer ») — [nodejs/Release](https://github.com/nodejs/Release)

Juste au-delà, déjà signalées : 27 octobre (fin de vie de Kubernetes 1.34) et
28 octobre 2026 (Node.js 26 en Active LTS).

### 🧭 Ce qu'il faut retenir

- **La réglementation des logiciels livrés entre dans sa phase
  opérationnelle.** Avec le signalement du CRA depuis le 11 septembre, puis la
  pleine application en décembre 2027, la question « qui est le fabricant, et
  qui le prévient » devient un sujet de contrat autant que de technique — sans
  que tout développement sur mesure soit concerné.
- **La fin octobre concentre les bascules de support** (Kubernetes 1.34,
  Node.js 24 et 26) : rien d'inattendu, mais des dates à choisir plutôt qu'à
  subir, surtout sur EKS où l'inaction a un coût.
- **TypeScript 7 change la chaîne d'outils plus que le langage.** Tant que la
  nouvelle API n'est pas publiée, la cohabitation 6/7 est la situation normale
  d'une partie de l'écosystème ; les gains de vitesse annoncés restent, à ce
  stade, des chiffres de l'éditeur.

## ✏️ Correction

**21 septembre 2026, 20 h 00.** L'information n° 5 indiquait à tort que le
gouvernement déclarait « maintenir le gel du barème de l'impôt sur le revenu ».
C'était une erreur de lecture de la source : LégiFiscal écrit « Matignon écarte
toute hausse d'impôts et le gel du barème de l'IR » — le gel est écarté, et le
gouvernement déclare vouloir proposer l'indexation du barème sur l'inflation
(déclaration de la porte-parole du gouvernement, 13 septembre 2026). La phrase
a été corrigée dans le texte ; le reste de l'entrée, son état (« annoncé, non
présenté, non déposé ») et sa note sont inchangés. Détail et sources dans le
[brief du 21 septembre 2026](2026-09-21-brief-exostic.md).
