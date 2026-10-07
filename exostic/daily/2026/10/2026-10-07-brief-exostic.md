---
title: "Brief Exostic — 7 octobre 2026"
date: 2026-10-07T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "La séance publique du 7 octobre sur le projet de loi « résilience » (transposition NIS 2) a été retirée de l'ordre du jour par la conférence des présidents la veille, sans nouvelle date ; rien d'autre de retenable sur la stack, la sécurité ou les secteurs clients depuis le brief du 5 octobre."
---

# Brief Exostic — 7 octobre 2026

**Date de publication :** 7 octobre 2026, 20 h 15 (heure de Paris)

Vérifié ce passage sans résultat retenable en dehors du point ci-dessous : avis
de sécurité Node.js (dernier en date toujours le 29 juillet 2026, rien
d'affiché sur `github.com/nodejs/node/security/advisories`), blog Kubernetes
(deux billets les 5 et 6 octobre, sur le swap mémoire des nœuds et la bascule
cgroup v2 — ce dernier rappelle une dépréciation déjà connue depuis la 1.31,
sans nouvelle date, donc hors critère d'entrée), changelog GitHub (rien sur
Actions ni npm les 5-6 octobre), avis CERT-FR du 7 octobre (SPIP, Veeam, HPE
Aruba, Elastic, SonicWall, Traefik, WordPress, Mozilla, OpenSSH, Google
Pixel — aucun ne touche la stack suivie), page AWS « What's New » et statut
AWS (aucune panne ni annonce de retrait identifiée). Rien de structurant
identifié sur les secteurs clients ni de nouveauté sur la facturation
électronique, DORA ou l'AI Act.

## 💼 Marché du conseil

### NIS 2 : la séance publique du 7 octobre retirée de l'ordre du jour, sans nouvelle date — note 7/10 🟢

Le projet de loi relatif à la résilience des infrastructures critiques et au
renforcement de la cybersécurité (transposition NIS 2, REC, DORA), que ce
flux suivait pour une discussion en séance publique à l'Assemblée nationale à
partir du 7 octobre 2026 (signalé le 26 septembre), a été retiré de l'ordre
du jour des séances des 7 et 9 octobre par la conférence des présidents, réunie
le 6 octobre 2026.

**Établi.** Deux sources de presse spécialisée indépendantes et concordantes
(Next, via son brief du 6 octobre, et Leto.legal, article daté du 6 octobre)
rapportent le retrait décidé en conférence des présidents. Raison officielle
invoquée : l'examen de la proposition de loi sur les violences sexistes et
sexuelles dure plus longtemps que prévu, dans un calendrier parlementaire
chargé. Le rapporteur du texte, Éric Bothorel, se dit « confiant » pour une
réinscription « d'ici deux ou trois semaines ». La prochaine conférence des
présidents susceptible de le réinscrire est le 13 octobre 2026.

**Incertain.** La page officielle du dossier législatif
(assemblee-nationale.fr) n'a pas pu être lue directement par ce passage (accès
bloqué par le robots.txt du site) ; l'information repose donc sur la presse
spécialisée plutôt que sur la source primaire, ce qui plafonne la note à
7/10 malgré la concordance des deux articles. Next évoque, en citant la
Commission supérieure du numérique et des postes, un blocage de fond sur
l'article 16 bis du texte (encadrement des obligations faites aux fournisseurs
de chiffrement) — une explication non confirmée par une source officielle, à
traiter comme une analyse de la presse plutôt qu'un fait établi. Aucune
nouvelle date de séance n'est fixée à ce stade.

**Qui parle, et avec quel intérêt.** Next et Leto.legal sont des médias
spécialisés sans intérêt direct dans l'issue du texte ; le rapporteur
Éric Bothorel, cité par voie de presse, est partie prenante du calendrier
parlementaire et a intérêt à présenter le report comme temporaire.

**Ce que ça change pour Exostic.** **À surveiller — prochaine conférence des
présidents le 13 octobre 2026.** La transposition française de NIS 2 (et donc
l'entrée en vigueur des nouvelles obligations de cybersécurité pour les
entités concernées) prend encore du retard, sans calendrier ferme. Rien à
faire dans l'immédiat : les obligations ne naissent qu'à la promulgation du
texte, qui reste à une étape très en amont (ni adopté en première lecture, ni
même débattu en séance). Il serait prématuré d'anticiper une date d'entrée en
application précise sur cette base.

**Sources :**
- **Presse spécialisée (concordante)** — [Next, brief du 6 octobre 2026](https://next.ink/brief-article/alleluia-la-transposition-de-nis2-est-enfin-a-lordre-du-jour-de-lassemblee-nationale/)
- **Presse spécialisée (concordante)** — [Leto.legal, 6 octobre 2026](https://www.leto.legal/news/assemblee-nationale-report-projet-loi-resilience-nis2-octobre-2026)
- **Référence (non lue directement, robots.txt)** — [Dossier législatif, assemblee-nationale.fr](https://www.assemblee-nationale.fr/dyn/17/dossiers/DLR5L17N50731)
- **Entrée précédente** — [exostic/alerts/2026/09/2026-09-26-19-40-nis-2-transposition-assemblee-7-octobre.md](../../../alerts/2026/09/2026-09-26-19-40-nis-2-transposition-assemblee-7-octobre.md)

## ✅ À faire

- **GitHub Actions — label `ubuntu-latest`.** Tester les workflows sur `ubuntu-26.04` ou épingler explicitement `ubuntu-24.04` avant le début de la migration, le 19 octobre 2026.
- **GitHub Actions — `pull_request_target`.** Vérifier les workflows de dépôts publics qui déclenchent sur cet événement avant l'application automatique de la règle de blocage, le 2 novembre 2026.

## 📅 Échéances à venir

- 2026-10-13 — NIS 2 : prochaine conférence des présidents de l'Assemblée nationale susceptible de réinscrire le projet de loi « résilience » à l'ordre du jour (aucune date de séance garantie).
- 2026-10-13 — PLF 2027 (texte n° 3210) : discussion générale en séance publique à l'Assemblée nationale, première lecture ; PLFSS 2027 (texte n° 3211) toujours en commission des affaires sociales, sans date de séance publique fixée.
- 2026-10-19 — GitHub Actions : début de la migration progressive du label `ubuntu-latest` d'Ubuntu 24.04 vers Ubuntu 26.04 (achèvement prévu le 19 novembre 2026).
- 2026-10-20 — Node.js 24 passe d'Active LTS à maintenance.
- 2026-10-27 — Kubernetes 1.34 : fin de vie côté projet amont.
- 2026-10-28 — Node.js 26 devient Active LTS.
- 2026-10-30 — Amazon Pinpoint : retrait du service (les API SMS, voix, push et OTP restent servies par AWS End User Messaging).
- 2026-11-02 — GitHub Actions : application automatique de la règle par défaut bloquant `pull_request_target` sur les dépôts publics sans politique d'événements.

## 🧭 Ce qu'il faut retenir

Le calendrier parlementaire reste le principal facteur de retard, pas de
blocage de fond : NIS 2 glisse pour la troisième fois en quelques semaines
sans qu'aucun acteur n'annonce l'abandon du texte, et le budget 2027 suit son
cours normal vers le débat du 13 octobre. Pour une société de conseil qui
livre du logiciel à des entités concernées par NIS 2, ce report élargit
mécaniquement la fenêtre avant l'entrée en vigueur des nouvelles obligations,
sans qu'on puisse en déduire une date plus précise qu'avant.
