---
title: "Brief Exostic — 24 octobre 2026"
date: 2026-10-24T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Deux failles de la chaîne d'approvisionnement logicielle : compromission des clés d'autorité eMudhra (magasin de certificats racine mis à jour dans Node.js) et faille de conception npm Trusted Publishing déjà corrigée par GitHub."
---

# Brief Exostic — 24 octobre 2026

**Date de publication :** 24 octobre 2026, 20 h 15 (heure de Paris)

Journée calme sur le marché du conseil (pas d'évolution confirmée sur le budget 2027 ni sur NIS 2 depuis les briefs précédents) ; deux informations de sécurité touchant directement la chaîne d'approvisionnement de la stack justifient malgré tout ce récapitulatif.

## 🔐 Sécurité

### Compromission des clés d'autorité eMudhra — magasin de certificats racine mis à jour dans Node.js — 8/10 🟢

Un chercheur indépendant (connu sous le nom « Wayne ») a découvert le 17 octobre 2026 que huit certificats intermédiaires de l'autorité de certification indienne eMudhra reposaient sur des clés privées si faibles qu'elles se recalculaient en moins d'une seconde à partir du certificat public — six servant à émettre des certificats TLS, deux à la signature de code. Mozilla a rendu l'incident public le 20 octobre ; Chrome, Firefox, Apple et Microsoft ont bloqué ces certificats entre le 17 et le 20 octobre. Node.js a publié le 21 octobre les versions **26.12.1, 24.22.1 et 22.23.4**, qui mettent à jour le magasin de certificats racine embarqué (dépendance `ca-cert`) en réponse à cet incident — dans la même publication que le correctif de la faille Brotli déjà signalée dans le brief du 21 octobre. Go, Python (certifi), Rust (webpki-roots), Red Hat, Debian et Ubuntu ont publié des correctifs équivalents.

**Confirmé :** l'existence des clés faibles, le blocage par les principaux programmes racines et la mise à jour correspondante dans Node.js 26.12.1/24.22.1/22.23.4 (source primaire nodejs.org). Chrome prévoit de retirer la racine `emSign ECC Root CA - G3` de son magasin le 27 octobre.

**Incertain :** la cause exacte (une erreur de script lors d'une cérémonie de génération de clés le 30 avril 2025, selon eMudhra seule — partie intéressée) et l'absence totale d'exploitation, affirmée par Chrome et le CERT-In indien mais limitée aux certificats journalisés en Certificate Transparency.

**Ce que ça change pour Exostic.** **À faire — sans délai.** Toute application Node.js qui vérifie des connexions TLS sortantes (appels API, CI/CD, images de conteneurs) doit tourner sur 26.12.1, 24.22.1 ou 22.23.4 ou plus récent pour bénéficier du magasin de confiance à jour ; les images Docker/Kubernetes construites sur un paquet système (`ca-certificates`) doivent être reconstruites après la mise à jour de l'image de base. Rien n'indique qu'Exostic détienne un certificat émis par eMudhra en production — l'action porte sur la chaîne d'outils, pas sur un certificat client à remplacer en urgence.

**Sources :** **Primaire** — [October 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) (nodejs.org) ; **indépendante** — [Protecting Firefox users following the compromise of eMudhra intermediate certificates](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/) (Mozilla) ; **indépendante** — [RHSB-2026-012](https://access.redhat.com/security/vulnerabilities/RHSB-2026-012) (Red Hat) ; **partie intéressée** — [communiqué eMudhra](https://emudhra.com/en/post/certificate-security-incident).

### npm Trusted Publishing : faille de conception « SlugFest », déjà corrigée par GitHub — 7/10 🟢

La société de sécurité Bloom Security a signalé à GitHub, le 6 juin 2026 via son programme HackerOne, que npm Trusted Publishing liait la confiance de publication au nom `propriétaire/dépôt` d'un dépôt GitHub plutôt qu'à son identifiant numérique permanent, tant que la configuration n'avait pas publié une première fois. Un dépôt renommé, transféré ou supprimé libérait ce nom, qu'un tiers pouvait reprendre pour obtenir un jeton OIDC et publier sous l'identité du paquet visé, sans voler aucun secret. GitHub a corrigé ce point le 2 octobre 2026 (changelog officiel) : une configuration non validée expire désormais 48 heures après sa création, et les jetons issus des événements `issue_comment` sont rejetés. Bloom a rendu la faille publique le 13 octobre, l'estimant à plus de 1 500 paquets concernés et plus de 10 millions de téléchargements cumulés.

**Confirmé :** l'existence de la faille de conception et le correctif de GitHub du 2 octobre, les deux décrits dans le changelog officiel de GitHub. Aucune exploitation dans la nature n'est documentée.

**Incertain :** l'ampleur chiffrée (1 500 paquets, 10 millions de téléchargements) ne vient que de Bloom Security, qui a trouvé la faille et vend des produits de sécurité de la chaîne d'approvisionnement logicielle — partie intéressée, chiffres non recoupés indépendamment ni accompagnés d'une méthode publiée ; aucun identifiant CVE ou GHSA n'est associé, ce qui est normal pour une faille de conception côté plateforme plutôt qu'un paquet précis.

**Ce que ça change pour Exostic.** **À surveiller.** Pertinent seulement pour qui publie des paquets npm via Trusted Publishing (OIDC GitHub Actions) : vérifier que chaque configuration a bien publié au moins une fois (donc validée) et qu'aucune configuration de confiance ne pointe vers un dépôt renommé ou supprimé. Sans objet pour qui ne fait que consommer des paquets npm — aucun paquet nommé n'est donné comme compromis, et le correctif est en production depuis le 2 octobre.

**Sources :** **Primaire** — [changelog GitHub, 2 octobre 2026](https://github.blog/changelog/2026-10-02-unvalidated-npm-trusted-publishing-configurations-now-expire) ; **indépendante** — [CSO Online](https://www.csoonline.com/article/4234229/over-1500-npm-packages-exposed-by-trusted-publishing-validation-flaw.html) ; **indépendante** — [The Hacker News](https://thehackernews.com/2026/10/github-tightens-npm-publishing-after.html).

## 📅 Échéances à venir

- 2026-10-27 — Kubernetes 1.34 : fin de vie côté projet amont.
- 2026-10-27 — Chrome (version 43) : retrait prévu de la racine `emSign ECC Root CA - G3` d'eMudhra ; les certificats qui en dépendent encore cesseront d'être reconnus par Chrome.
- 2026-10-27 — PLF 2027 : reprise annoncée de la discussion sur la première partie (recettes), après le report du vote solennel du 20 octobre — date non encore confirmée par un document officiel de l'Assemblée nationale.
- 2026-10-28 — Node.js 26 devient Active LTS.
- 2026-10-30 — Amazon Pinpoint : retrait du service (segments, campagnes, parcours, analytique).
- 2026-11-02 — GitHub Actions : application automatique du blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements.
- 2026-11-09 — PLFSS 2027 : début de l'examen par le Sénat, dans la version initiale du gouvernement.
- 2026-11-17 — PLF 2027 : vote solennel sur l'ensemble du texte en première lecture.
- 2026-11-19 — GitHub Actions : fin de la fenêtre de migration du label `ubuntu-latest` vers Ubuntu 26.04.

## 🧭 Ce qu'il faut retenir

Deux incidents de la même semaine touchent la confiance accordée par défaut à des intermédiaires externes — une autorité de certification pour TLS, un nom de dépôt GitHub pour la publication npm — plutôt qu'à des identifiants stables. Aucun des deux n'a donné lieu à une exploitation confirmée à ce jour, mais les deux correctifs (Node.js, GitHub) sont déjà en production : l'action, quand elle existe, consiste à mettre à jour la chaîne d'outils plutôt qu'à réagir à une attaque en cours.
