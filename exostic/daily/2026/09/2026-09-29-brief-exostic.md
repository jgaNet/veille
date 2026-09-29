---
title: "Brief Exostic — 29 septembre 2026"
date: 2026-09-29T20:00:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Une information retenue ce soir : GitHub a reporté de quatre jours (25 → 29 septembre 2026) l'application définitive du contrôle de version minimale des runners GitHub Actions self-hébergés — un runner sous la version 2.329.0 ne peut plus s'enregistrer ni exécuter de jobs à partir d'aujourd'hui, sur github.com et GitHub Enterprise Cloud (Enterprise Server non concerné). À vérifier sans délai pour qui utilise des runners self-hébergés. Budget 2027 et NIS 2 restent au même point que le 26 septembre."
---

# Brief Exostic — 29 septembre 2026

**Date de publication :** 29 septembre 2026, 20 h 00 (heure de Paris)

Une information neuve franchit le critère d'entrée ce soir, côté sécurité de
la chaîne CI/CD. Budget 2027 et NIS 2 (voir le
[brief du 26 septembre](2026-09-26-brief-exostic.md)) n'ont pas bougé depuis :
aucune nouvelle entrée, ils restent dans les échéances à venir. Les notes
mesurent la solidité des preuves, jamais l'urgence.

Vérifications sans résultat, lues directement ce soir : la page des avis de
sécurité de Node.js (aucun nouveau bulletin depuis le 29 juillet 2026), le
flux CVE officiel de Kubernetes (rien après les correctifs du 23 septembre
déjà couverts), la page d'accueil du CERT-FR (aucun avis entre le 27 et le
29 septembre touchant Node.js, Kubernetes, AWS ou npm ; les avis de la
période portent sur Citrix, MongoDB, IBM, des noyaux Linux, Elastic, PHP et
Zabbix, hors périmètre), le compte rendu du dernier Conseil des ministres
(le projet de loi de finances et le PLFSS n'y figurent toujours pas) et le
dossier législatif du texte de transposition NIS 2 à l'Assemblée nationale
(aucun changement d'inscription, séance toujours prévue le 7 octobre). La
page « What's New » d'AWS n'a pas pu être lue en direct (contenu chargé
dynamiquement) ; aucun bulletin de sécurité AWS récent trouvé par ailleurs ne
touche la stack Exostic. Les rubriques 🛠️ Stack, 💼 Marché du conseil et
🏭 Secteurs clients sont omises faute de fait structurant neuf et vérifié.

---

## 🔐 Sécurité

### 1. GitHub Actions : le contrôle de version minimale des runners self-hébergés entre en pleine application le 29 septembre 2026, reporté de quatre jours — note 9/10 🟢

Le 28 septembre 2026, GitHub a publié une entrée de changelog annonçant que
la date d'application définitive du contrôle de version minimale pour les
runners self-hébergés — annoncé le 12 juin 2026, avec un calendrier de
brownouts et une date de bascule initialement fixée au 25 septembre — a été
**reportée de quatre jours : l'application complète a débuté le 29 septembre
2026**, aujourd'hui. Le périmètre, inchangé depuis l'annonce de juin, couvre
**github.com, GitHub Enterprise Cloud et Enterprise Cloud avec Data
Residency** (ce dernier périmètre étant déjà en application depuis le
31 juillet) ; **GitHub Enterprise Server n'est pas concerné**. À partir
d'aujourd'hui, un runner self-hébergé en version antérieure à **2.329.0** ne
peut plus s'enregistrer ni se réenregistrer, et un runner déjà enregistré
mais resté sous cette version cesse d'exécuter les jobs.

**Confirmé.** L'entrée de changelog du 28 septembre 2026 annonçant le
changement de date, et l'annonce initiale du 12 juin 2026 (version minimale
2.329.0, périmètre github.com / Enterprise Cloud / Data Residency, Enterprise
Server exclu, calendrier détaillé des brownouts) : deux entrées du changelog
officiel GitHub, lues directement — fait purement documentaire, la source
primaire suffit (§ 9).

**Incertain.** L'annonce du 28 septembre ne détaille pas la raison du report
de quatre jours ; elle ne redonne pas non plus la date antérieure en toutes
lettres (25 septembre, déduite de l'annonce de juin et de reprises
techniques datées d'août). Aucune reprise indépendante de ce report précis
du 28 septembre n'a été trouvée ce soir — l'annonce date d'hier, une
couverture par la presse spécialisée peut suivre dans les prochains jours.
Le comportement exact d'un runner self-hébergé qui tournait déjà avant le
changement (interruption immédiate ou au prochain job) n'est pas détaillé
dans l'entrée consultée.

**Qui parle, et avec quel intérêt.** GitHub est à la fois l'opérateur de la
plateforme et la source unique de cette annonce : aucun intérêt commercial
direct identifié à durcir ce contrôle plutôt qu'un autre, la mesure vise la
sécurité de sa propre infrastructure de runners.

**Décomposition des affirmations.**
- Version minimale 2.329.0 requise pour l'enregistrement d'un runner
  self-hébergé — 10/10 (annonce officielle du 12 juin 2026)
- Application complète effective depuis le 29 septembre 2026, après un
  report de quatre jours par rapport à la date initialement annoncée (25
  septembre) — 9/10 (changelog officiel du 28 septembre, date antérieure
  reconstituée à partir de l'annonce de juin plutôt que citée explicitement)
- Périmètre : github.com, Enterprise Cloud, Enterprise Cloud avec Data
  Residency ; Enterprise Server exclu — 10/10 (dit explicitement dans
  l'annonce de juin)

**Pourquoi 9/10 ?** Les faits sont documentaires et lus directement à la
source primaire (changelog officiel GitHub), ce qui suffit au sens du § 9 ;
la note reste à 9 plutôt que 10 parce que la date antérieure exacte et le
motif du report ne sont pas énoncés en toutes lettres dans l'annonce du
28 septembre elle-même.

**Ce que ça change pour Exostic — à faire, sans délai, pour qui utilise des
runners self-hébergés.** Concerne uniquement les projets dont l'intégration
continue s'appuie sur des runners self-hébergés (matériel ou réseau
spécifique, coûts de calcul) plutôt que sur les runners hébergés par GitHub,
qui ne sont pas affectés par ce contrôle. Pour ces projets : vérifier la
version du logiciel runner installé (`./config.sh --version` ou équivalent)
et la mettre à jour vers 2.329.0 ou une version plus récente sans attendre,
faute de quoi l'enregistrement échoue et les jobs ne s'exécutent plus. Une
sur-réaction serait d'étendre cette vérification aux runners hébergés par
GitHub (`ubuntu-latest`, etc.), qui ne sont pas concernés par ce contrôle de
version — leur sujet du moment est la migration du label vers Ubuntu 26.04
(voir échéance du 19 octobre).

Sources : [GitHub Changelog, « Self-hosted runner version enforcement date has moved », 28 septembre 2026 — source primaire](https://github.blog/changelog/2026-09-28-self-hosted-runner-version-enforcement-date-has-moved) · [GitHub Changelog, « GitHub Actions: Minimum version enforcement timeline for self-hosted runners », 12 juin 2026 — source primaire](https://github.blog/changelog/2026-06-12-github-actions-minimum-version-enforcement-timeline-for-self-hosted-runners/)

---

### ✅ À faire

- **Sans délai, si des runners self-hébergés sont utilisés** — Vérifier leur
  version et mettre à jour vers 2.329.0 ou plus récente ; sans objet pour les
  projets qui n'utilisent que des runners hébergés par GitHub (voir n° 1).
- **Avant le 30 septembre** — AWS App Mesh : retrait du service, ressources
  restantes inaccessibles ensuite ([alerte du 22 septembre](../../../alerts/2026/09/2026-09-22-01-32-aws-app-mesh-fin-de-support-30-septembre.md)).
- **Avant le 19 octobre** — Tester les workflows sur `ubuntu-26.04` ou
  épingler `ubuntu-24.04` avant la migration du label `ubuntu-latest`
  ([alerte du 22 septembre](../../../alerts/2026/09/2026-09-22-07-32-github-actions-ubuntu-latest-26-04.md)).

### 📅 Échéances à venir

Lignes de `exostic/state/echeances.md` tombant dans les 30 jours :

- **2026-09-30** — AWS App Mesh : retrait du service — confirmé.
- **2026-10-06** — PLF 2027 : date limite constitutionnelle de dépôt (premier
  mardi d'octobre, LOLF art. 39) ; présentation en Conseil des ministres
  toujours seulement évoquée pour le 30 septembre par la presse spécialisée,
  non confirmée officiellement — inchangé depuis le 26 septembre.
- **2026-10-07** — NIS 2 : séance publique à l'Assemblée nationale, première
  lecture du projet de loi « résilience » — projet, calendrier susceptible de
  glisser — inchangé depuis le 26 septembre.
- **2026-10-19** — GitHub Actions : début de la migration du label
  `ubuntu-latest` vers Ubuntu 26.04 (jusqu'au 19 novembre) — confirmé,
  progressif.
- **2026-10-20** — Node.js 24 passe d'Active LTS à maintenance — confirmé,
  date prévue.
- **2026-10-27** — Kubernetes 1.34 : fin de vie amont — confirmé.
- **2026-10-28** — Node.js 26 devient Active LTS — confirmé, date prévue.

### 🧭 Ce qu'il faut retenir

- **La discipline de version sur la chaîne CI/CD GitHub continue de se
  durcir, par petites touches successives.** Après le retrait de Node 20 des
  runners hébergés et la compromission puis la réactivation de deux actions
  tierces (`actions-cool`), c'est maintenant le contrôle de version minimale
  des runners self-hébergés qui entre en pleine application — avec un simple
  report de quatre jours, sans changement de fond. Le sujet ne concerne
  qu'une minorité de configurations (runners self-hébergés), mais la routine
  d'audit des workflows `.github/workflows/*.yml` reste le fil rouge des
  trois dernières semaines de veille.
- **Budget 2027 et NIS 2 : toujours dans l'attente, rien de plus concret à en
  dire tant que les textes ne sont ni déposés ni votés.** Le calendrier
  officiel n'a pas changé depuis le 26 septembre : dépôt du PLF au plus tard
  le 6 octobre, séance NIS 2 à l'Assemblée le 7 octobre.
