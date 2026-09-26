---
title: "🛠️ Stack — GitHub Actions : Node 20 retiré des runners le 23 septembre 2026, les actions JavaScript en `runs.using: node20` ne s'exécutent plus"
date: 2026-09-26T19:35:00+02:00
type: alert
feed: exostic
category: stack
confidence: 9
summary: "Le 23 septembre 2026, GitHub a retiré Node 20 de ses runners : les actions JavaScript déclarées en runs.using: node20 ne s'exécutent plus, la variable de contournement ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION est supprimée, seul node24 reste. À faire sans délai pour tout dépôt utilisant GitHub Actions : vérifier que chaque action tierce épinglée est une version passée à Node 24 (actions/checkout v5 ou plus, etc.) et mettre à jour ses propres actions."
---

# 🛠️ Stack — GitHub Actions : Node 20 retiré des runners le 23 septembre 2026, les actions JavaScript en `runs.using: node20` ne s'exécutent plus

**Date de publication :** 26 septembre 2026, 19 h 35 (heure de Paris)
**Nature : stack technique**
**Note de vérité : 9/10 🟢**
**Pour Exostic : à faire sans délai** (pour tout dépôt dont les workflows GitHub Actions utilisent des actions JavaScript, tierces ou maison)

Le 23 septembre 2026, GitHub a publié dans son changelog l'entrée « Node 20 is
no longer available in GitHub Actions ». Les runners hébergés n'exécutent plus
que **Node 24** pour les actions JavaScript ; les actions dont le fichier
`action.yml` déclare `runs.using: node20` **ne fonctionnent plus**, et la
variable d'environnement `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION`, qui
permettait jusque-là de forcer l'ancien runtime, **est supprimée**. Il n'existe
donc plus d'échappatoire côté workflow.

Ce retrait n'est pas une surprise : il conclut le calendrier annoncé par GitHub
le 19 septembre 2025 (« Deprecation of Node 20 on GitHub Actions runners »),
qui prévoyait le passage à Node 24 par défaut le 16 juin 2026 et « la mise à
jour du runner et le retrait de Node 20 le 23 septembre 2026 ». Node.js 20
lui-même est en fin de vie depuis le 30 avril 2026 (calendrier officiel du
projet Node.js).

Concrètement, deux cas sont à distinguer :

- **les actions tierces épinglées à une ancienne version majeure.** Les actions
  officielles de GitHub ont toutes été mises à jour vers Node 24 dans une
  nouvelle version majeure ; par exemple `actions/checkout` est passé à Node 24
  avec la v5.0.0 publiée le 11 août 2025 (note de version : « Update actions
  checkout to use node 24 »). Un workflow encore en `actions/checkout@v4`, ou
  sur une version majeure antérieure d'une action tierce non maintenue, échoue
  désormais ;
- **les actions maison** (dans le dépôt ou dans un dépôt d'organisation) : la
  valeur `runs.using` doit passer à `node24` et une nouvelle version doit être
  publiée. Le code de l'action tourne alors sous Node 24 : à tester, deux
  versions majeures de Node.js séparent les deux runtimes.

GitHub précise en outre que Node 24 n'est pas compatible avec macOS 13.4 et
antérieur ni avec ARM32 : les runners auto-hébergés sur ces plateformes ne sont
plus pris en charge.

À ne pas confondre : `node-version: 20` dans une étape `actions/setup-node`
désigne la version de Node.js **de l'application** testée ou construite, et
reste valide ; ce qui est retiré est le runtime **du runner** qui exécute les
actions JavaScript elles-mêmes.

## Confirmé

- Retrait de Node 20 des runners GitHub Actions effectif depuis le
  23 septembre 2026, seul `node24` subsiste, variable de contournement
  supprimée — changelog GitHub du 23 septembre 2026, lu directement.
- Calendrier annoncé un an à l'avance avec cette date exacte — changelog GitHub
  du 19 septembre 2025, lu directement.
- `actions/checkout` v5.0.0 (11 août 2025) utilise Node 24 — notes de version
  du dépôt `actions/checkout`, lues directement.
- Node.js 20 : fin de vie le 30 avril 2026 — calendrier officiel `nodejs/Release`.

Fait purement documentaire vérifié à la source primaire : GitHub est ici la
source de ce qu'il retire de sa propre plateforme.

## Incertain

- La liste précise des versions d'actions populaires cassées (checkout,
  setup-node, cache, upload/download-artifact « v4 et antérieures »,
  setup-python et setup-go « v5 et antérieures », github-script « v7 et
  antérieures ») vient d'un billet de blog du 26 septembre 2026 qui synthétise
  le changelog et un cas rapporté, sans vérification indépendante de chaque
  ligne — 6/10. Vérifier soi-même le `action.yml` de chaque action épinglée
  plutôt que de se fier à cette liste.
- La documentation de référence de la syntaxe des métadonnées d'action
  (docs.github.com) mentionnait encore `node20` comme valeur acceptée à la date
  de ce passage ; il s'agit vraisemblablement d'un retard de mise à jour de la
  documentation, non d'une prise en charge maintenue.
- Comportement des runners auto-hébergés qui n'auraient pas été mis à jour :
  non décrit dans l'annonce.

## Qui parle, et avec quel intérêt

GitHub (Microsoft) est l'éditeur de la plateforme et la source primaire du
retrait ; il n'a pas d'intérêt à minimiser une rupture qu'il documente
lui-même, mais présente naturellement la transition comme suffisamment
préparée. Le billet tiers cité (byteiota) est un blog technique sans intérêt
commercial identifié dans le sujet, qui ne fait pas de mesure indépendante.

## Décomposition des affirmations

- Node 20 retiré des runners, seul `node24` disponible, variable de
  contournement supprimée, depuis le 23 septembre 2026 — 10/10 (source
  primaire lue directement)
- Date annoncée un an à l'avance (changelog du 19 septembre 2025) — 10/10
- `actions/checkout` v5 = Node 24 ; v4 reste en Node 20 — 9/10 (notes de
  version ; le maintien de v4 en `node20` est déduit de l'absence de note
  contraire)
- Liste des versions d'actions populaires cassées — 6/10 (blog, synthèse)
- Incompatibilité Node 24 avec macOS ≤ 13.4 et ARM32 — 9/10 (déclaration de
  l'éditeur)

## Pourquoi 9/10 ?

Fait documentaire vérifié directement dans deux entrées officielles du
changelog GitHub, cohérentes entre elles à un an d'écart, et dans les notes de
version d'`actions/checkout`. Le point retiré est l'absence de source
indépendante ayant mesuré l'ampleur des échecs de workflows.

## Ce que ça change pour Exostic

**À faire — sans délai.** Cette analyse concerne tout dépôt (projets Node.js /
TypeScript, images de conteneurs, charts Kubernetes, infrastructure AWS) dont
l'intégration continue tourne sur GitHub Actions. Ce qu'il est raisonnable de
faire : lister les actions utilisées par les workflows (`uses:` dans
`.github/workflows/*.yml`), vérifier pour chacune que la version épinglée
déclare `runs.using: node24` dans son `action.yml`, et monter de version
majeure lorsque ce n'est pas le cas (`actions/checkout@v5` au moins,
`actions/setup-node`, `actions/cache`, `actions/upload-artifact` et
`download-artifact` dans leurs versions majeures Node 24) ; pour une action
maison, passer `runs.using` à `node24`, tester et publier une nouvelle version.
Un workflow qui passe encore aujourd'hui n'a rien à corriger, mais l'audit
reste utile pour les workflows peu fréquents (publication, déploiement planifié)
qui n'ont pas encore tourné depuis le 23 septembre. Ce qui relèverait d'une
sur-réaction : changer la version de Node.js des applications elles-mêmes —
`node-version` dans `setup-node` n'est pas concerné. À relier à l'alerte du
22 septembre sur la migration du label `ubuntu-latest` vers Ubuntu 26.04
(19 octobre – 19 novembre 2026), qui touche les mêmes fichiers : les deux
vérifications peuvent être faites en une seule passe.

## Sources

- **Source primaire** — [Node 20 is no longer available in GitHub Actions — GitHub Changelog, 23 septembre 2026](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/)
- **Source primaire** — [Deprecation of Node 20 on GitHub Actions runners — GitHub Changelog, 19 septembre 2025](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/)
- **Source primaire** — [actions/checkout v5.0.0 — notes de version, 11 août 2025](https://github.com/actions/checkout/releases/tag/v5.0.0)
- **Source primaire** — [Calendrier des versions Node.js (nodejs/Release)](https://github.com/nodejs/Release)
- **Référence** — [Metadata syntax for GitHub Actions — docs.github.com (`runs.using`)](https://docs.github.com/en/actions/reference/workflows-and-actions/metadata-syntax)
- **Indépendante (blog, synthèse)** — [GitHub Actions Dropped Node 20 — Fix Your Workflows Now — byteiota, 26 septembre 2026](https://byteiota.com/github-actions-dropped-node-20-fix-your-workflows-now/)
- **Contexte** — [Alerte du 22 septembre 2026 : label `ubuntu-latest` vers Ubuntu 26.04](2026-09-22-07-32-github-actions-ubuntu-latest-26-04.md)
