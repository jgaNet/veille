---
title: "Brief Exostic — 19 octobre 2026"
date: 2026-10-19T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Point hebdomadaire du lundi : la migration ubuntu-latest vers Ubuntu 26.04 démarre aujourd'hui sur GitHub Actions ; semaine chargée à venir sur le budget, Node.js et Kubernetes."
---

# Brief Exostic — 19 octobre 2026

Semaine calme sur le fond — rien de significativement nouveau depuis le brief du 17 octobre sur le budget ou NIS 2 — mais un calendrier chargé s'ouvre à partir de demain. Point hebdomadaire du lundi, comme prévu par les consignes du flux, avec un focus sur l'échéance qui devient active aujourd'hui.

## 🛠️ Stack

### GitHub Actions — début de la migration `ubuntu-latest` vers Ubuntu 26.04 — note 9/10 🟢

**Confirmé.** La bascule progressive du label `ubuntu-latest`, qui pointait vers Ubuntu 24.04, débute aujourd'hui 19 octobre 2026 et doit s'achever le 19 novembre 2026 : les workflows qui utilisent ce label basculeront automatiquement et individuellement vers Ubuntu 26.04 à un moment non prévisible dans cette fenêtre. Source primaire lue directement (billet de changelog GitHub, fait documentaire et calendaire directement vérifiable — § 9 des consignes), confirmant le calendrier annoncé le 17 septembre.

**Incertain.** La liste précise des outils supprimés ou mis à jour entre les deux images (Node.js préinstallé, versions de compilateurs, etc.) n'est documentée que dans une issue GitHub dédiée (`actions/runner-images#14747`), non consultée dans le détail ici.

**Ce que ça change pour Exostic — à faire avant le 19 novembre 2026.** Pour tout workflow GitHub Actions utilisant `runs-on: ubuntu-latest`, le moment est venu de vérifier qu'il tourne sans régression sur `ubuntu-26.04`, ou d'épingler explicitement `ubuntu-24.04` si ce n'est pas encore testé — sans attendre la bascule automatique, qui peut survenir n'importe quel jour de la fenêtre. Cela concerne surtout les workflows qui installent des outils système par leur nom de paquet plutôt que via des actions versionnées. Pas de quoi retarder une livraison : un simple test sur l'image 26.04 en parallèle suffit à lever le doute.

**Sources**
- **Source primaire** — [GitHub Changelog — Ubuntu 26 generally available and `ubuntu-latest` migration](https://github.blog/changelog/2026-09-17-ubuntu-26-generally-available-and-latest-migration/)

## 📅 Échéances à venir

- **20 octobre 2026** — Node.js 24 passe d'Active LTS à maintenance.
- **20 octobre 2026** — PLF 2027 (texte n° 3210) : vote solennel sur la première partie (recettes), toujours annoncé à cette date ; aucune confirmation officielle trouvée depuis le brief du 17 octobre que ce calendrier ait bougé.
- **20 octobre 2026** — PLFSS 2027 (texte n° 3211) : poursuite de la discussion en séance publique ; le rejet du texte en commission des affaires sociales rapporté par LCP le 16 octobre reste non confirmé par le dossier officiel de l'Assemblée nationale.
- **20 octobre 2026** — NIS 2 : conférence des présidents de l'Assemblée nationale susceptible de réinscrire le projet de loi « résilience » à l'ordre du jour ; aucune nouvelle date de séance connue à ce jour.
- **21 octobre 2026** — Node.js : releases de sécurité sur les lignes 22.x/24.x/26.x, gravité maximale « élevée » annoncée par l'éditeur ; identifiants CVE et versions précises toujours non publiés à la date de ce brief.
- **27 octobre 2026** — Kubernetes 1.34 : fin de vie côté projet amont.
- **27 octobre 2026** — PLFSS 2027 : vote solennel en première lecture (délai constitutionnel de 20 jours).
- **28 octobre 2026** — Node.js 26 devient Active LTS.
- **30 octobre 2026** — Amazon Pinpoint : retrait du service (segments, campagnes, parcours, analytique) ; les API SMS, voix, push et OTP restent servies par AWS End User Messaging.
- **2 novembre 2026** — GitHub Actions : application automatique du blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements.
- **17 novembre 2026** — PLF 2027 : vote solennel sur l'ensemble du texte en première lecture (délai constitutionnel de 40 jours).
- **19 novembre 2026** — GitHub Actions : fin de la fenêtre de migration `ubuntu-latest` → Ubuntu 26.04 (voir ci-dessus).

## 🧭 Ce qu'il faut retenir

La semaine du 20 au 27 octobre concentre à elle seule trois échéances stack/sécurité (Node.js, Kubernetes) et quatre échéances budgétaires et réglementaires (PLF, PLFSS, NIS 2) — un empilement de calendriers plus qu'un signal de risque en soi. Sur le fond budgétaire et NIS 2, rien n'a bougé depuis le 17 octobre : les votes annoncés pour demain restent des dates de calendrier parlementaire, pas des résultats acquis, et le dossier officiel de l'Assemblée nationale ne confirme à ce jour ni adoption ni rejet. Côté stack, la seule action concrète de la semaine est immédiate et peu coûteuse : vérifier la compatibilité des workflows CI avec Ubuntu 26.04 avant que GitHub ne bascule automatiquement `ubuntu-latest`.
