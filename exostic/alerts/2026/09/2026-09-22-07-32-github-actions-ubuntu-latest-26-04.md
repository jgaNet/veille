---
title: "🛠️ Stack — GitHub Actions : le label ubuntu-latest bascule vers Ubuntu 26.04 entre le 19 octobre et le 19 novembre 2026"
date: 2026-09-22T07:32:00+02:00
type: alert
feed: exostic
category: stack
confidence: 9
summary: "GitHub a annoncé le 17 septembre 2026 que l'image Ubuntu 26.04 des runners hébergés est en disponibilité générale et que le label ubuntu-latest passera progressivement d'Ubuntu 24.04 à Ubuntu 26.04 entre le 19 octobre et le 19 novembre 2026, avec des outils mis à jour et certains retirés. À faire avant le 19 octobre pour tout dépôt dont les workflows utilisent runs-on: ubuntu-latest : tester sur ubuntu-26.04 ou épingler ubuntu-24.04."
---

# 🛠️ Stack — GitHub Actions : le label `ubuntu-latest` bascule vers Ubuntu 26.04 entre le 19 octobre et le 19 novembre 2026

**Date de publication :** 22 septembre 2026, 07 h 32 (heure de Paris)
**Nature : stack technique**
**Note de vérité : 9/10 🟢**
**Pour Exostic : à faire avant le 19 octobre 2026** (pour tout workflow GitHub Actions en `runs-on: ubuntu-latest`)

Le 17 septembre 2026, GitHub a publié dans son changelog l'entrée « Ubuntu 26
generally available and latest migration ». L'image de runner hébergé
**Ubuntu 26.04** sort de préversion publique et est « entièrement prise en
charge pour les workflows de production », en x64 (`ubuntu-26.04`) et en arm64
(`ubuntu-26.04-arm`). Surtout, le label **`ubuntu-latest`**, qui désigne
aujourd'hui Ubuntu 24.04, sera **migré progressivement vers Ubuntu 26.04 entre
le 19 octobre et le 19 novembre 2026**. Le même jour, l'équipe des images de
runners a ouvert l'issue de suivi n° 14748 dans le dépôt `actions/runner-images`,
avec le même calendrier.

GitHub prévient que l'image 26.04 « contient des outils et des versions
d'outils mis à jour, et dans certains cas retirés, par rapport aux images
précédentes », et que les workflows qui dépendent de versions logicielles
précises, de bibliothèques système ou de compilateurs propres à 24.04 peuvent
être affectés. Deux recommandations : tester ses workflows sur `ubuntu-26.04`
avant la migration, ou épingler `ubuntu-24.04` pour rester sur l'image
actuelle.

D'après l'annonce de préversion du 11 juin 2026 (issue n° 14226 du même
dépôt) et le fichier de description de l'image 26.04, les changements
notables par rapport à 24.04 sont : Node.js par défaut en 24.x (au lieu de
22.x), Python 3.14 par défaut, Go 1.26, PHP 8.5, Java par défaut en 25,
PostgreSQL 18, Docker 29.x, kubectl 1.36 ; retrait de Swift, miniconda, Julia,
fastlane, Mercurial, Pulumi, Haveged, MediaInfo et du serveur Sphinx. Le
mécanisme est le même que lors du passage de `ubuntu-latest` à 24.04 début
2025, qui avait cassé des workflows s'appuyant sur des outils préinstallés
disparus (issue de suivi de l'époque dans le même dépôt, non relue ici).

## Confirmé

- Disponibilité générale de l'image Ubuntu 26.04 (x64 et arm64) et migration
  progressive du label `ubuntu-latest` du 19 octobre au 19 novembre 2026 :
  entrée du changelog GitHub du 17 septembre 2026 et issue n° 14748 de
  `actions/runner-images`, ouverte le 17 septembre 2026, toutes deux lues
  directement.
- Recommandations de GitHub (tester sur `ubuntu-26.04`, ou épingler
  `ubuntu-24.04`) : mêmes sources.
- Fait purement documentaire vérifié à la source primaire : la source
  primaire suffit (§ 9 des consignes). Un billet indépendant (byteiota,
  21 septembre 2026) reprend l'annonce et détaille des ruptures constatées ;
  il n'apporte pas de confirmation supplémentaire du calendrier, seulement des
  exemples.

## Incertain

- La liste exacte des outils retirés en version finale n'est pas centralisée
  dans l'annonce de disponibilité générale ; celle donnée ci-dessus vient de
  l'annonce de préversion de juin et du fichier de description de l'image,
  qui évoluent à chaque mise à jour hebdomadaire de l'image. Vérifier sur le
  dépôt `actions/runner-images` au moment du test.
- Les sources ne concordent pas sur la version Java par défaut de l'image
  24.04 (17 ou 21 selon la source) ; le point commun est que 26.04 passe à 25.
- Le billet indépendant signale la disparition de `apt-key` et de cgroup v1
  sur 26.04 ; ce sont des changements d'Ubuntu lui-même, plausibles, mais non
  vérifiés ici dans une source GitHub.
- La migration est « progressive » : GitHub ne dit pas quels dépôts basculent
  en premier, ni si le calendrier peut glisser.
- Aucune date de fin de support d'Ubuntu 24.04 sur les runners hébergés n'est
  annoncée ; épingler `ubuntu-24.04` reste donc possible sans échéance connue.

## Qui parle, et avec quel intérêt

GitHub (Microsoft) est l'éditeur du service ; il est source primaire du
calendrier et des recommandations, sans intérêt particulier à en minimiser
l'impact puisqu'il fournit l'option d'épinglage. Le billet byteiota est un
blog technique tiers, sans produit vendu autour du sujet dans ce qui a été
lu.

## Décomposition des affirmations

- Image Ubuntu 26.04 en disponibilité générale, x64 et arm64 — 10/10
  (changelog GitHub, issue officielle)
- Migration de `ubuntu-latest` vers 26.04 entre le 19 octobre et le
  19 novembre 2026 — 9/10 (calendrier annoncé par l'éditeur, susceptible
  d'ajustement)
- Node.js 24 par défaut, Python 3.14, Java 25, PostgreSQL 18, Docker 29 sur
  l'image 26.04 — 8/10 (fichier de description de l'image, version datée,
  mise à jour chaque semaine)
- Liste des outils retirés (Swift, miniconda, Julia, fastlane, Mercurial,
  Pulumi…) — 7/10 (annonce de préversion de juin 2026, non reconfirmée
  dans l'annonce de disponibilité générale)
- Disparition d'`apt-key` et de cgroup v1 sur 26.04 — 6/10 (billet tiers
  unique)

## Pourquoi 9/10 ?

Le fait central — la bascule de `ubuntu-latest` et son calendrier — est lu
directement dans deux documents officiels de GitHub concordants. Un point est
retiré parce qu'il s'agit d'un calendrier annoncé, encore modifiable, et que
la migration est décrite comme progressive sans détail sur l'ordre.

## Ce que ça change pour Exostic

**À faire — avant le 19 octobre 2026.** Analyse : tout dépôt dont les
workflows GitHub Actions utilisent `runs-on: ubuntu-latest` — cas le plus
courant pour des projets Node.js / TypeScript, des builds d'images de
conteneurs et des déploiements Kubernetes ou AWS — changera d'image sans
modification de sa part entre le 19 octobre et le 19 novembre. Il est
raisonnable, d'ici là, de lancer une fois les workflows critiques sur
`ubuntu-26.04` (une ligne à changer), de vérifier que les versions de Node.js,
Python ou Java sont fixées par `actions/setup-node`, `actions/setup-python` ou
`actions/setup-java` plutôt qu'héritées de l'image, et de repérer les scripts
qui installent des paquets avec `apt-key` ou dépendent d'un outil retiré. Un
dépôt qui ne peut pas être testé à temps peut simplement épingler
`ubuntu-24.04`, sans date butoir connue. Serait une sur-réaction : réécrire
les pipelines ou geler les déploiements ; à en juger par la bascule vers 24.04
début 2025, les ruptures tiennent surtout à des outils préinstallés disparus
ou à des versions héritées de l'image, pas au runtime Node.js lui-même.

## Sources

- **Source primaire** — [Ubuntu 26 generally available and latest migration — GitHub Changelog, 17 septembre 2026](https://github.blog/changelog/2026-09-17-ubuntu-26-generally-available-and-latest-migration/)
- **Source primaire** — [\[Ubuntu\] `ubuntu-latest` label will use Ubuntu 26.04 in November 2026 — actions/runner-images, issue n° 14748, 17 septembre 2026](https://github.com/actions/runner-images/issues/14748)
- **Source primaire** — [\[Ubuntu\] Ubuntu 26.04 and Ubuntu 26.04 Arm is now available as a public preview — actions/runner-images, issue n° 14226, 11 juin 2026](https://github.com/actions/runner-images/issues/14226)
- **Source primaire** — [Description de l'image Ubuntu 26.04 (Ubuntu2604-Readme.md) — actions/runner-images](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2604-Readme.md)
- **Indépendante (illustration)** — [GitHub Actions ubuntu-latest Is Moving to Ubuntu 26.04 — byteiota, 21 septembre 2026](https://byteiota.com/github-actions-ubuntu-26-migration/)
