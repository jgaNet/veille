---
title: "Brief Exostic — 28 septembre 2026"
date: 2026-09-28T20:00:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Point hebdomadaire du lundi. Une information retenue : deux GitHub Actions de l'organisation actions-cool (issues-helper, maintain-one-comment), compromises depuis mai 2026, ont été réactivées avec leur code malveillant le 16 septembre puis redésactivées le 25 — aucun CVE ni communiqué officiel de GitHub, mais recherches techniques indépendantes convergentes. À faire sans délai : vérifier l'absence d'usage de ces deux actions et généraliser l'épinglage par SHA. NIS 2 et le budget 2027 restent au même point que le 26 septembre ; rien de nouveau côté stack ou secteurs clients."
---

# Brief Exostic — 28 septembre 2026

**Date de publication :** 28 septembre 2026, 20 h 00 (heure de Paris)

Lundi : récapitulatif publié dans tous les cas, comme le prévoit le
[point hebdomadaire](../../../CONSIGNES.md). Une seule information neuve cette
semaine franchit le critère d'entrée ; elle est détaillée ci-dessous. NIS 2 et
le budget 2027 (voir le [brief du 26 septembre](2026-09-26-brief-exostic.md))
n'ont pas bougé depuis : aucune nouvelle entrée, ils restent dans les
échéances à venir.

Vérifications sans résultat, lues directement ce soir : la page des avis de
sécurité de Node.js (dernier bulletin toujours daté du 29 juillet 2026), le
flux CVE officiel de Kubernetes (rien après les correctifs du 23 septembre
déjà couverts), la page d'accueil du CERT-FR (aucun avis entre le 26 et le
28 septembre touchant Node.js, Kubernetes, AWS ou npm ; les avis de la période
portent sur Citrix, MongoDB, IBM, des noyaux Linux, Elastic et PHP, hors
périmètre), et les dossiers législatifs de l'Assemblée nationale pour le PLF
et le texte NIS 2 (aucun changement d'inscription). La page « What's New »
d'AWS n'a rien produit de spécifique à la stack Exostic cette semaine. La
rubrique 🛠️ Stack et la rubrique 🏭 Secteurs clients sont omises faute de fait
structurant vérifié.

---

## 🔐 Sécurité

### 1. GitHub Actions : deux actions `actions-cool` compromises depuis mai, réactivées le 16 septembre avec leur code malveillant, redésactivées le 25 — note 6/10 🟠

Les tags des actions `actions-cool/issues-helper` (53 tags) et
`actions-cool/maintain-one-comment` (15 tags) — deux actions tierces utilisées
pour automatiser la gestion des issues et des commentaires sur GitHub — ont
été réorientés le 18 mai 2026, entre 19 h 10 et 19 h 13 UTC, vers des commits
contenant un code malveillant : installation du runtime Bun puis lecture de
la mémoire du processus `Runner.Worker` pour en extraire les secrets utilisés
par le workflow, exfiltrés ensuite vers un serveur distant. Une première
désactivation par GitHub a suivi la découverte, mais les dépôts concernés ont
été réactivés entre le 16 et le 25 septembre 2026 sans que les tags
malveillants soient nettoyés : tout workflow référençant ces actions par tag
(plutôt que par SHA de commit) et s'exécutant dans cette fenêtre — y compris
via des déclenchements programmés ou automatiques — a rejoué le code
malveillant. Une nouvelle désactivation est intervenue le 25 septembre.
L'incident s'inscrit dans la continuité de la campagne « Shai-Hulud » de
compromissions npm documentée depuis mai 2026 (323 paquets et 639 versions
selon les mêmes chercheurs), sans qu'un lien technique direct entre les deux
volets soit établi dans les sources consultées.

**Confirmé.** La réorientation des tags vers des commits malveillants le
18 mai 2026, avec horodatages précis : analyse technique de StepSecurity,
lue directement. La réactivation du 16 septembre et la nouvelle
désactivation du 25 septembre : rapportées indépendamment par Socket.dev,
reprises par TheHackerNews et BleepingComputer. Le mécanisme technique
(téléchargement de Bun, lecture mémoire, exfiltration HTTPS) : décrit de
façon cohérente par StepSecurity et Socket.dev, deux analyses indépendantes
l'une de l'autre.

**Incertain.** Aucun identifiant CVE ni avis GHSA officiel n'existe à ce
jour pour ces deux actions précises ; aucune communication officielle de
GitHub n'a été retrouvée dans les sources consultées, seulement des
recherches de sociétés de sécurité. Le nombre exact de dépôts ayant
effectivement exécuté le payload pendant la fenêtre du 16-25 septembre n'est
pas chiffré : le graphe de dépendances GitHub évoque environ 15 000 dépôts
dépendants pour `issues-helper` seul, mais ce chiffre mesure l'usage
déclaré de l'action, pas l'exécution réelle du code malveillant.

**Qui parle, et avec quel intérêt.** StepSecurity et Socket.dev sont deux
éditeurs qui vendent des outils de sécurisation de la chaîne CI/CD
(politiques d'actions, durcissement des runners) : ils ont un intérêt
commercial à documenter ce type d'incident en détail. Cela ne contredit pas
les éléments techniques datés qu'ils publient, mais justifie l'absence de
confirmation officielle dans la note.

**Décomposition des affirmations.**
- Les tags des deux actions redirigent vers du code malveillant introduit le
  18 mai 2026 — 8/10 (analyse technique indépendante, horodatages précis)
- Réactivation le 16 septembre, nouvelle désactivation le 25 septembre — 7/10
  (deux sources indépendantes concordantes, sans confirmation officielle de
  GitHub)
- Environ 15 000 dépôts dépendants exposés — 5/10 (mesure d'usage déclaré,
  pas de l'exécution réelle du payload)

**Pourquoi 6/10 ?** Les faits techniques datés reposent sur des analyses
indépendantes convergentes, mais aucune source primaire (GitHub, GHSA, CVE)
ne les confirme à ce jour ; la note plafonne donc dans le haut de la
fourchette « incertain ».

**Ce que ça change pour Exostic — à faire, sans délai particulier mais sans
attendre.** Vérifier que les workflows GitHub Actions des projets ne
référencent pas `actions-cool/issues-helper` ni `actions-cool/maintain-one-comment`
(peu probable, ce sont des actions de niche, mais la vérification prend
quelques minutes) ; plus largement, généraliser l'épinglage de toute action
tierce par SHA de commit plutôt que par tag mutable (`@v2`, `@main`),
pratique déjà recommandée après le retrait de Node 20 des runners la
semaine dernière. Une sur-réaction serait de suspendre l'usage de GitHub
Actions en général : l'incident touche deux actions précises d'un éditeur
tiers, pas la plateforme.

Sources : [StepSecurity, « actions-cool/issues-helper GitHub Action Compromised », analyse technique — indépendante, intérêt commercial signalé ci-dessus](https://www.stepsecurity.io/blog/actions-cool-issues-helper-github-action-compromised-all-tags-point-to-imposter-commit-that-exfiltrates-ci-cd-credentials) · [Socket.dev, « Re-Enabled GitHub Actions Expose Thousands of Repositories to Mini Shai-Hulud », 27 septembre 2026 — indépendante, intérêt commercial signalé ci-dessus](https://socket.dev/blog/mini-shai-hulud-actions) · [TheHackerNews, « Compromised GitHub Actions Came Back Online and Resumed Executing Mini Shai-Hulud Malware », 27 septembre 2026 — reprise indépendante](https://thehackernews.com/2026/09/compromised-github-actions-came-back.html) · [BleepingComputer, « GitHub Actions re-enabled with Mini Shai-Hulud payload still active » — reprise indépendante](https://www.bleepingcomputer.com/news/security/github-actions-re-enabled-with-mini-shai-hulud-payload-still-active/)

---

### ✅ À faire

- **Sans délai** — Vérifier l'absence, dans les workflows GitHub Actions des
  projets, de références à `actions-cool/issues-helper` ou
  `actions-cool/maintain-one-comment` ; généraliser l'épinglage des actions
  tierces par SHA de commit (voir n° 1).
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

- **La chaîne d'approvisionnement CI/CD reste la faille la plus active cette
  semaine.** Après le retrait de Node 20 des runners GitHub la semaine
  dernière, c'est une compromission d'actions tierces qui occupe le volet
  sécurité : deux incidents différents, un même rappel — épingler par SHA, ne
  jamais faire confiance à un tag mutable pour une dépendance CI/CD.
  L'incident de cette semaine n'a pas de confirmation officielle de GitHub à
  ce jour, ce qui pèse sur la note mais pas sur la pertinence de l'action à
  mener.
- **Deux textes attendus début octobre, aucun encore voté.** Le budget 2027
  doit être déposé au plus tard le 6 octobre, NIS 2 arrive en séance à
  l'Assemblée le 7 ; dans les deux cas, rien de plus concret à en dire tant
  que les textes ne sont pas connus ou votés.
