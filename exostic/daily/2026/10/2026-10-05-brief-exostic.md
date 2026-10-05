---
title: "Brief Exostic — 5 octobre 2026"
date: 2026-10-05T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Point hebdomadaire du lundi : aucune information nouvelle retenue sur la stack, la sécurité ou les secteurs clients depuis le brief du 3 octobre ; le calendrier budgétaire 2027 et la transposition de NIS 2 entrent dans leur phase parlementaire active."
---

# Brief Exostic — 5 octobre 2026

**Date de publication :** 5 octobre 2026, 20 h 15 (heure de Paris)
**Point hebdomadaire (lundi)** — aucune alerte n'a été publiée depuis le brief du 3 octobre, et la recherche complémentaire de ce passage n'a trouvé aucune information répondant au critère d'entrée (stack, sécurité, marché, secteurs). Conformément aux consignes, ce récapitulatif est publié malgré tout, centré sur les échéances à venir.

Vérifié ce passage sans résultat retenable : avis de sécurité Node.js (dernier en date : 29 juillet 2026, rien en septembre ou octobre), bulletins Kubernetes et CERT-FR des derniers jours (rien touchant Node.js, Kubernetes, AWS ou npm), changelog GitHub (entrées du 1ᵉʳ-2 octobre sur les runners macOS et les rapports de vulnérabilité, hors périmètre ou sans impact pour la stack suivie), page AWS « What's New » et statut AWS. Aucune nouvelle réglementation ni fait structurant identifié sur les secteurs clients.

Les deux seuls dossiers qui ont bougé cette semaine — budget 2027 et NIS 2 — sont déjà suivis dans `echeances.md` sans évolution significative : le PLF (n° 3210) et le PLFSS (n° 3211) ont été déposés le 1ᵉʳ octobre et sont en commission (1 768 amendements déposés sur la première partie du PLF selon l'Assemblée nationale), débat prévu en séance le 13 octobre ; le projet de loi « résilience » transposant NIS 2 reste programmé en séance à partir du 7 octobre, avec un risque de glissement de calendrier déjà signalé — rien à publier de nouveau, seulement à surveiller aux dates ci-dessous.

## ✅ À faire

- **GitHub Actions — label `ubuntu-latest`.** Tester les workflows sur `ubuntu-26.04` ou épingler explicitement `ubuntu-24.04` avant le début de la migration, le 19 octobre 2026.
- **GitHub Actions — `pull_request_target`.** Vérifier les workflows de dépôts publics qui déclenchent sur cet événement avant l'application automatique de la règle de blocage, le 2 novembre 2026.

## 📅 Échéances à venir

- 2026-10-07 — NIS 2 : discussion en séance publique à l'Assemblée nationale du projet de loi relatif à la résilience des infrastructures critiques et au renforcement de la cybersécurité (transposition NIS 2, REC, DORA), première lecture.
- 2026-10-13 — PLF 2027 (texte n° 3210) : discussion générale en séance publique à l'Assemblée nationale, première lecture ; PLFSS 2027 (texte n° 3211) en commission des affaires sociales, sans date de séance publique encore fixée.
- 2026-10-19 — GitHub Actions : début de la migration progressive du label `ubuntu-latest` d'Ubuntu 24.04 vers Ubuntu 26.04 (achèvement prévu le 19 novembre 2026).
- 2026-10-20 — Node.js 24 passe d'Active LTS à maintenance.
- 2026-10-27 — Kubernetes 1.34 : fin de vie côté projet amont.
- 2026-10-28 — Node.js 26 devient Active LTS.
- 2026-10-30 — Amazon Pinpoint : retrait du service (les API SMS, voix, push et OTP restent servies par AWS End User Messaging).
- 2026-11-02 — GitHub Actions : application automatique de la règle par défaut bloquant `pull_request_target` sur les dépôts publics sans politique d'événements.

## 🧭 Ce qu'il faut retenir

Les prochaines semaines sont dominées par deux calendriers parlementaires plutôt que par des faits nouveaux : le budget 2027 (PLF/PLFSS déposés, débat à partir du 13 octobre) et la transposition de NIS 2 (séance à partir du 7 octobre) entrent dans leur phase active, mais aucun des deux textes n'est encore adopté et les deux calendriers restent susceptibles de glisser — ni l'un ni l'autre n'impose d'action avant un vote effectif.

Côté stack, la fenêtre du 19 au 30 octobre concentre plusieurs bascules déjà connues (runners GitHub `ubuntu-latest`, Node.js 24 en maintenance, fin de vie de Kubernetes 1.34, Node.js 26 en LTS active) : rien de nouveau cette semaine, mais c'est le bon moment pour vérifier que ces échéances sont déjà anticipées plutôt que d'attendre qu'elles tombent.
