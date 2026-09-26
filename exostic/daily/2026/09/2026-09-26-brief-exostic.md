---
title: "Brief Exostic — 26 septembre 2026"
date: 2026-09-26T20:00:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Deux alertes aujourd'hui et deux compléments. GitHub a retiré Node 20 de ses runners le 23 septembre : les actions JavaScript encore en node20 ne s'exécutent plus, audit des workflows à faire sans délai. Kubernetes a publié le même jour les correctifs 1.34.12, 1.35.9, 1.36.5 et 1.37.1 pour deux failles de gravité moyenne (CVE-2026-2270, CVE-2026-76654). Le projet de loi transposant NIS 2 est inscrit en séance à l'Assemblée nationale à partir du 7 octobre — ce n'est pas encore une loi. Budget 2027 : toujours aucun texte déposé ; la date limite constitutionnelle de dépôt est le 6 octobre."
---

# Brief Exostic — 26 septembre 2026

**Date de publication :** 26 septembre 2026, 20 h 00 (heure de Paris)

Deux alertes ont été publiées aujourd'hui (GitHub Actions, NIS 2) ; les
recherches du soir y ajoutent deux compléments, dont une suite du
[brief du 21 septembre](2026-09-21-brief-exostic.md) sur le budget 2027. Les
notes mesurent la solidité des preuves, jamais l'urgence.

Vérifications sans résultat, lues directement ce soir : la page des avis de
sécurité de Node.js (dernier bulletin : 29 juillet 2026 ; les versions
22.23.3 du 23 septembre et 26.10.0 du 22 septembre sont des versions
ordinaires, non retenues), la page d'accueil du CERT-FR (aucune alerte depuis
le 10 septembre ; avis du 24 et 25 septembre sur PHP, Zabbix, Elastic, IBM et
les noyaux Linux, hors stack) et le changelog GitHub du 22 au 26 septembre
(rien d'autre que le retrait de Node 20 ci-dessous, hormis un avis de
dépréciation du paquet CodeQL « toutes plateformes », mineur). La page
« What's New » d'AWS n'a pas pu être lue (contenu chargé dynamiquement). La
rubrique 🏭 Secteurs clients est omise faute de fait structurant vérifié.

---

## 🛠️ Stack

### 1. GitHub Actions : Node 20 retiré des runners le 23 septembre 2026, les actions JavaScript en `runs.using: node20` ne s'exécutent plus — note 9/10 🟢

Reprise de l'[alerte de 19 h 35](../../../alerts/2026/09/2026-09-26-19-35-github-actions-node-20-retire.md).
Le 23 septembre, GitHub a retiré Node 20 de ses runners hébergés : seul
`node24` reste disponible pour exécuter les actions JavaScript, et la variable
de contournement `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` est supprimée. Une
action dont le `action.yml` déclare encore `runs.using: node20` échoue. Le
calendrier avait été annoncé un an à l'avance, le 19 septembre 2025, avec cette
date exacte. Les actions officielles ont toutes une version majeure en Node 24
(`actions/checkout` depuis la v5.0.0 du 11 août 2025) ; un workflow épinglé sur
`actions/checkout@v4` ou sur une ancienne version majeure d'une action tierce
est concerné. À ne pas confondre avec `node-version: 20` dans `setup-node`,
qui désigne la version de Node.js de l'application testée et reste valide.

**Ce qui est établi.** Retrait effectif, suppression de la variable, seul
`node24` disponible, calendrier annoncé le 19 septembre 2025 : deux entrées du
changelog GitHub lues directement et cohérentes ; version Node 24 de
`actions/checkout` v5 : notes de version lues directement. Fait documentaire,
source primaire suffisante (§ 9).

**Ce qui reste incertain.** La liste précise des versions d'actions populaires
cassées circule sur un blog technique du 26 septembre sans vérification ligne à
ligne (6/10) : vérifier soi-même le `action.yml` de chaque action épinglée. Le
comportement des runners auto-hébergés non mis à jour n'est pas décrit.

**Ce que ça change — à faire sans délai** *(analyse)*, pour tout dépôt dont
l'intégration continue tourne sur GitHub Actions : lister les `uses:` des
workflows, vérifier que chaque version épinglée déclare `runs.using: node24`,
monter de version majeure sinon, passer les actions maison en `node24` ; penser
aux workflows peu fréquents (publication, déploiement planifié) qui n'ont pas
encore tourné depuis le 23 septembre. La même passe peut préparer la migration
du label `ubuntu-latest` vers Ubuntu 26.04 (19 octobre – 19 novembre). Sur-
réaction : changer la version de Node.js des applications elles-mêmes.

Sources : [GitHub Changelog, « Node 20 is no longer available in GitHub Actions », 23 septembre 2026 — source primaire](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/) · [GitHub Changelog, « Deprecation of Node 20 on GitHub Actions runners », 19 septembre 2025 — source primaire](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/) · [actions/checkout v5.0.0, notes de version — source primaire](https://github.com/actions/checkout/releases/tag/v5.0.0) · [byteiota, « GitHub Actions Dropped Node 20 », 26 septembre 2026 — blog, synthèse](https://byteiota.com/github-actions-dropped-node-20-fix-your-workflows-now/)

---

## 🔐 Sécurité

### 2. Kubernetes : correctifs 1.34.12, 1.35.9, 1.36.5 et 1.37.1 publiés le 23 septembre pour deux failles de gravité moyenne (CVE-2026-2270, CVE-2026-76654) — note 9/10 🟢

Le 23 septembre 2026, le comité de réponse sécurité de Kubernetes a publié deux
avis, et le projet a mis en ligne le même jour les versions correctives
**1.34.12, 1.35.9, 1.36.5 et 1.37.1**.

- **CVE-2026-2270** — kube-controller-manager, CVSS 3.1 : **5,9 (moyenne)**,
  vecteur `AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:N`. Un acteur disposant de droits
  d'écriture **dans un espace de noms** sur les objets StatefulSet et
  ControllerRevision peut amener le contrôleur à créer un pod **dans un autre
  espace de noms**, avec le contrôle de ses métadonnées et de sa spécification
  (attaque du « député confus »). Le pod est supprimé par le ramasse-miettes
  sauf si l'attaquant fournit une `OwnerReference` valide vers un StatefulSet
  existant dans l'espace cible. Versions touchées : 1.34.11 et antérieures,
  1.35.8 et antérieures, 1.36.4 et antérieures, 1.37.0. Le correctif limite la
  restauration depuis une ControllerRevision au seul champ `spec`.
- **CVE-2026-76654** — kubelet, **nœuds Windows uniquement**, CVSS 3.1 :
  **5,8 (moyenne)**. Le kubelet n'écartait pas les liens symboliques vers des
  chemins UNC dans les montages `subPath`, ce qui permet de forcer une
  authentification NTLM vers un partage contrôlé par l'attaquant et de
  capturer le condensat NetNTLMv2 du compte du kubelet. Mêmes versions
  touchées et corrigées.

Aucune exploitation n'est signalée par le projet pour l'une ou l'autre.

**Ce qui est établi.** Les deux avis (scores, versions touchées et corrigées,
description) : annonces officielles du projet sur discuss.kubernetes.io, lues
directement ; l'existence des quatre versions correctives datées du
23 septembre : page des versions du dépôt `kubernetes/kubernetes`, lue
directement ; les deux identifiants figurent dans le flux CVE officiel de
Kubernetes. Reprise indépendante de la CVE-2026-2270 par LinuxSecurity le
24 septembre, sans analyse technique supplémentaire.

**Ce qui reste incertain.** La page des versions correctives de kubernetes.io
affichait encore ce soir 1.34.11 / 1.35.8 / 1.36.4 comme dernières versions :
retard de mise à jour de la page, non contradiction, les tags existant sur
GitHub. Le calendrier de reprise de ces correctifs par les services managés
(versions de plateforme Amazon EKS) n'a pas été lu dans un document officiel.
L'absence d'exploitation connue est une déclaration du projet à la date de
l'avis.

**Ce que ça change — à faire au prochain cycle de correctifs, sans caractère
d'urgence** *(analyse)*, pour les clusters Kubernetes en général : passer le
plan de contrôle sur 1.34.12, 1.35.9, 1.36.5 ou 1.37.1 ; la CVE-2026-2270
compte surtout sur un cluster **multi-locataire** où des équipes distinctes ont
des droits d'écriture StatefulSet dans leurs espaces de noms — sur un cluster
mono-équipe, le prérequis de droits élevés en réduit la portée. La
CVE-2026-76654 ne concerne que qui exploite des nœuds Windows. Pour un cluster
encore en 1.34, dont la fin de vie amont est le 27 octobre, la 1.34.12 est
vraisemblablement l'un des derniers correctifs : c'est l'occasion de planifier
la montée de version plutôt qu'un simple patch. Sur-réaction : traiter ces avis
comme critiques ou interrompre des charges de travail.

Sources : [Kubernetes, avis de sécurité CVE-2026-2270, 23 septembre 2026 — source primaire](https://discuss.kubernetes.io/t/security-advisory-cve-2026-2270-statefulset-and-controllerrevision-write-permissions-allow-cross-namespace-pod-creation/35276) · [Kubernetes, avis de sécurité CVE-2026-76654, 23 septembre 2026 — source primaire](https://discuss.kubernetes.io/t/security-advisory-cve-2026-76654-subpath-symlinking-on-windows-nodes-permits-ntlm-coercion/35277) · [Flux CVE officiel de Kubernetes — source primaire](https://kubernetes.io/docs/reference/issues-security/official-cve-feed/) · [kubernetes/kubernetes, page des versions (v1.37.1, v1.36.5, v1.35.9, v1.34.12 du 23 septembre 2026) — source primaire](https://github.com/kubernetes/kubernetes/releases) · [LinuxSecurity, « Kubernetes Security Fix Blocks Cross-Namespace Pod Creation », 24 septembre 2026 — indépendante](https://linuxsecurity.com/news/cloud-security/kubernetes-security-cross-namespace-pod-cve-2026-2270)

---

## 💼 Marché du conseil

### 3. NIS 2 : le projet de loi de transposition (« résilience ») inscrit en séance publique à l'Assemblée nationale à partir du 7 octobre 2026 — note 9/10 🟢

Reprise de l'[alerte de 19 h 40](../../../alerts/2026/09/2026-09-26-19-40-nis-2-transposition-assemblee-7-octobre.md).
Le dossier législatif de l'Assemblée nationale programme en séance publique, à
partir du mercredi 7 octobre 2026, le projet de loi relatif à la résilience des
infrastructures critiques et au renforcement de la cybersécurité, qui transpose
NIS 2 ainsi que les directives REC et DORA. État exact du texte : déposé au
Sénat le 15 octobre 2024, adopté par le Sénat en première lecture le 12 mars
2025, adopté par la commission spéciale de l'Assemblée le 10 septembre 2025, en
attente de séance depuis plus d'un an ; **ni adopté définitivement, ni
promulgué**. La date limite de transposition était le 17 octobre 2024. La
directive vise 18 secteurs et, sauf exceptions, les entités de taille moyenne ou
plus (50 salariés, ou 10 millions d'euros de chiffre d'affaires et de bilan),
avec des obligations de gestion des risques dont la sécurité de la chaîne
d'approvisionnement et du développement, une notification des incidents sous
24 h / 72 h / un mois, et des sanctions jusqu'à 10 millions d'euros ou 2 % du
chiffre d'affaires mondial.

**Ce qui est établi.** L'inscription à l'ordre du jour et les étapes
antérieures : dossier législatif officiel, lu directement, repris le
23 septembre par Next et par cyberattaque.org, indépendants l'un de l'autre ;
le contenu de la directive : EUR-Lex.

**Ce qui reste incertain.** Un ordre du jour peut glisser et le texte reste
amendable en séance ; suivent, selon les cas, une commission mixte paritaire ou
une nouvelle lecture, la promulgation, puis les décrets qui fixeront le détail et
le calendrier de mise en conformité. « Près de 15 000 » entités concernées est
une estimation gouvernementale (7/10). La répercussion contractuelle des
obligations de chaîne d'approvisionnement sur les prestataires n'est pas
chiffrable aujourd'hui.

**Ce que ça change — à surveiller : vote de l'Assemblée à partir du 7 octobre,
puis navette et décrets** *(analyse)*. Une société de conseil de moins de
50 salariés hors des 18 secteurs n'est pas, en l'état, une entité régulée : rien
à engager pour elle-même. Ce qui bouge se joue chez les clients des secteurs
concernés (banque et fintech, logistique et transport, infrastructures et
services numériques), où des exigences de développement sécurisé, de
traçabilité des dépendances et de coopération en cas d'incident peuvent
apparaître dans les appels d'offres et les contrats. Sur-réaction : lancer une
mise en conformité NIS 2 pour la société elle-même ou vendre du « conseil
NIS 2 » sur un texte non voté. Le classement d'une activité donnée dans les
annexes mérite, le moment venu, un avis juridique. Exostic est partie
intéressée sur ce marché : cette entrée décrit ce que le texte impose, pas une
opportunité.

Sources : [Assemblée nationale, dossier législatif — source primaire](https://www.assemblee-nationale.fr/dyn/17/dossiers/DLR5L17N50731) · [Directive (UE) 2022/2555 — EUR-Lex, source primaire](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) · [ANSSI, avancement de la transposition — officielle](https://aide.monespacenis2.cyber.gouv.fr/fr/article/avancement-de-la-transposition-de-la-directive-nis-2-1b3j1da/) · [Next, 23 septembre 2026 — indépendante](https://next.ink/brief-article/alleluia-la-transposition-de-nis2-est-enfin-a-lordre-du-jour-de-lassemblee-nationale/) · [cyberattaque.org, 23 septembre 2026 — indépendante](https://www.cyberattaque.org/nis2-enfin-a-lassemblee-nationale-pres-de-deux-ans-apres-la-date-limite/)

### 4. Budget 2027 : toujours aucun texte déposé ; présentation en Conseil des ministres évoquée pour le 30 septembre par la presse spécialisée, sans confirmation officielle lisible ; date limite constitutionnelle de dépôt le 6 octobre — note 5/10 🟠 sur la date du 30 septembre

Suite des briefs des [20](2026-09-20-brief-exostic.md) et
[21 septembre](2026-09-21-brief-exostic.md). À ce soir, ni le projet de loi
de finances (PLF) ni le projet de loi de financement de la sécurité sociale
(PLFSS) pour 2027 n'ont été présentés en Conseil des ministres ni déposés au
Parlement. Plusieurs sites spécialisés (un blog destiné aux auto-entrepreneurs
le 17 septembre, un site de préparation aux concours le 4 septembre) écrivent
que le gouvernement **vise le 30 septembre** pour la présentation ; aucun ne
cite de document officiel et le compte rendu du Conseil des ministres du
16 septembre, lu directement, ne donne pas de date — la porte-parole y indique
seulement que le Premier ministre « détaillera sa feuille de route budgétaire
dans les prochains jours ». Ce qui est certain, c'est la borne : l'article 39
de la LOLF impose le dépôt du PLF **au plus tard le premier mardi d'octobre**,
soit le **6 octobre 2026**, puis l'article 47 de la Constitution ouvre 70 jours
d'examen (40 à l'Assemblée en première lecture).

**Ce qui est établi.** La date limite du premier mardi d'octobre et les délais
d'examen : fiche de synthèse n° 53 de l'Assemblée nationale, lue directement
(10/10). L'absence de présentation à ce jour : compte rendu officiel du
16 septembre et dossiers législatifs, sans PLF 2027 déposé (10/10). Aucune
mesure nouvelle concernant les sociétés de conseil ou leurs dirigeants n'a été
annoncée depuis le brief du 21 septembre.

**Ce qui reste incertain.** La date du 30 septembre : source secondaire sans
document officiel, 5/10 — c'est ce qui fixe la note de l'entrée. Le contenu du
texte : entièrement inconnu jusqu'à sa présentation ; toute « mesure » qui
circule d'ici là est une déclaration ou une rumeur.

**Ce que ça change — à surveiller : présentation du PLF et du PLFSS, au plus
tard le 6 octobre** *(analyse)*. Rien à décider avant la lecture du texte
déposé ; le brief reprendra alors ce qui touche une SAS de conseil et son
dirigeant (impôt sur les sociétés, dividendes, cotisations, TVA, facturation
électronique) en précisant l'état du texte à chaque étape. Pas de conseil fiscal
personnalisé ici : les arbitrages de fin d'année relèvent de l'expert-comptable,
une fois le texte connu.

Sources : [Assemblée nationale, fiche de synthèse n° 53, « L'examen parlementaire des lois de finances » — source primaire](https://www.assemblee-nationale.fr/dyn/synthese/fonctionnement-assemblee-nationale/travail-legislatif/l-examen-parlementaire-des-lois-de-finances) · [info.gouv.fr, compte rendu du Conseil des ministres du 16 septembre 2026 — source primaire](https://www.info.gouv.fr/conseil-des-ministres/compte-rendu-du-conseil-des-ministres-du-16-09-2026) · [Espace Auto-Entrepreneur, « PLF 2027 : ce qui se prépare pour le 30 septembre », 17 septembre 2026 — secondaire, sans source officielle](https://espace-autoentrepreneur.com/blog/plf-2027-auto-entrepreneur-ce-qui-se-prepare-pour-le-30-septembre) · [Admis Concours, « Le calendrier budgétaire d'automne 2026 », 4 septembre 2026 — secondaire](https://admisconcours.fr/breves/le-calendrier-budgetaire-dautomne-2026-plf-et-plfss-2027-un-controle-parlementaire-sous-contrainte-de-temps)

---

### ✅ À faire

- **Sans délai** — Auditer les workflows GitHub Actions : chaque action
  épinglée doit déclarer `runs.using: node24` (`actions/checkout@v5` au moins),
  les actions maison passent en `node24` ; inclure les workflows peu fréquents
  (voir n° 1).
- **Prochain cycle de correctifs** — Passer les plans de contrôle Kubernetes
  sur 1.34.12 / 1.35.9 / 1.36.5 / 1.37.1 ; pour un cluster en 1.34, planifier
  la montée de version avant la fin de vie du 27 octobre (voir n° 2).
- **Avant le 30 septembre** — AWS App Mesh : retrait du service ; toute
  ressource restante devient inaccessible ([alerte du 22 septembre](../../../alerts/2026/09/2026-09-22-01-32-aws-app-mesh-fin-de-support-30-septembre.md)).
- **Avant le 19 octobre** — Tester les workflows sur `ubuntu-26.04` ou épingler
  `ubuntu-24.04` avant la migration du label `ubuntu-latest` ([alerte du 22 septembre](../../../alerts/2026/09/2026-09-22-07-32-github-actions-ubuntu-latest-26-04.md)).

### 📅 Échéances à venir

Lignes de `exostic/state/echeances.md` tombant dans les 30 jours (les deux
dernières, à J+31 et J+32, sont gardées pour la continuité) :

- **2026-09-30** — AWS App Mesh : retrait du service — confirmé.
- **2026-10-06** — PLF 2027 : date limite constitutionnelle de dépôt (premier
  mardi d'octobre, LOLF art. 39) ; présentation visée le 30 septembre selon la
  presse, non confirmée — date légale confirmée, ajoutée ce soir.
- **2026-10-07** — NIS 2 : séance publique à l'Assemblée nationale, première
  lecture — projet, calendrier susceptible de glisser.
- **2026-10-19** — GitHub Actions : début de la migration de `ubuntu-latest`
  vers Ubuntu 26.04 (jusqu'au 19 novembre) — confirmé, progressif.
- **2026-10-20** — Node.js 24 passe en maintenance — confirmé, date prévue.
- **2026-10-27** — Kubernetes 1.34 : fin de vie amont — confirmé.
- **2026-10-28** — Node.js 26 devient Active LTS — confirmé, date prévue.

Hors fenêtre mais proches : 2026-10-30 (retrait d'Amazon Pinpoint) et
2026-11-02 (GitHub bloque `pull_request_target` par défaut sur les dépôts
publics).

### 🧭 Ce qu'il faut retenir

- **Les plateformes de CI ferment les échappatoires.** Le retrait de Node 20
  des runners GitHub, la migration d'`ubuntu-latest`, le blocage de
  `pull_request_target` et le retrait des jetons npm contournant la 2FA
  suivent le même schéma : annonce longue, puis coupure nette sans variable de
  contournement. Les fichiers `.github/workflows/*.yml` méritent désormais une
  revue à chaque échéance annoncée, pas seulement quand un workflow casse.
- **Kubernetes : un cluster en 1.34 n'a plus qu'un mois de support amont.**
  Les deux avis du 23 septembre sont de gravité moyenne, mais ils rappellent
  que la fin de vie de la 1.34 tombe le 27 octobre ; côté EKS, le support
  étendu facturé prend le relais le 2 décembre.
- **Deux textes à suivre en octobre, aucun encore en vigueur.** NIS 2 arrive
  en séance à l'Assemblée le 7 octobre, près de deux ans après la date limite
  de transposition ; le budget 2027 doit être déposé au plus tard le 6 octobre.
  Dans les deux cas, ce que le brief pourra dire de concret dépend du texte
  voté, pas des annonces.
