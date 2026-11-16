---
title: "Brief Exostic — 16 novembre 2026"
date: 2026-11-16T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Lundi calme sur les trois volets suivis : point hebdomadaire sur les huit échéances suivies (NIS2/PLFSS/PLF, GitHub Actions, Amazon EKS), sans information nouvelle franchissant le critère d'entrée du flux."
---

# Brief Exostic — 16 novembre 2026

**Date de publication :** 16 novembre 2026, 20 h 15 (heure de Paris)

Lundi — point hebdomadaire. Depuis le brief du 15 novembre, aucune
information n'a franchi le critère d'entrée du flux (rien qui changerait une
décision pour Exostic) sur les trois volets suivis : pas de nouvelle
publication de version ni de faille critique sur la stack (Node.js, 
TypeScript, Kubernetes, AWS, npm), pas de nouvelle étape franchie sur les
textes suivis au-delà de ce qui est déjà enregistré dans les échéances
ci-dessous, pas de fait structurant dans les secteurs clients. Conformément
au § 11 des consignes, ce lundi donne tout de même lieu à un récapitulatif,
limité au point sur les échéances suivies.

## 📅 Échéances à venir

- **18 novembre, 16 h 30** — PLFSS 2027 : scrutin public solennel sur l'ensemble du texte au Sénat (discussion en séance publique les 16, 17 et 18 novembre selon le dossier législatif du Sénat, consulté ce jour)
- **19 novembre** — GitHub Actions : fin de la fenêtre de migration `ubuntu-latest` vers Ubuntu 26.04 — épingler `ubuntu-24.04` en attendant si nécessaire
- **19 novembre, 10 h** — PLF 2027 : examen définitif de la seconde partie en commission des finances du Sénat
- **26 novembre** — Amazon EKS 1.31 : fin du support étendu, mise à niveau automatique du plan de contrôle
- **2 décembre** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics (après report d'un mois)
- **2 décembre** — Amazon EKS 1.34 : fin du support standard, bascule en support étendu facturé (0,60 $ par cluster et par heure)
- **9 décembre, 16 h 30** — PLF 2027 : séance publique au Sénat, scrutin public sur l'ensemble du texte (calendrier qualifié par le Sénat lui-même de « susceptible d'être modifié à tout moment »)

## 🧭 Ce qu'il faut retenir

- La dernière fenêtre de test (« brownout ») du blocage de `pull_request_target` sur GitHub Actions a eu lieu aujourd'hui (16 h-18 h UTC) ; aucun signalement d'incident trouvé dans les sources consultées. L'application définitive de la règle reste prévue le 2 décembre.
- Le budget 2027 (PLF et PLFSS) continue d'avancer en parallèle au Sénat, avec un premier scrutin solennel attendu le 18 novembre (PLFSS) puis le 9 décembre (PLF) ; aucune de ces dates n'est, à ce stade, définitivement acquise.
- Le projet de loi « résilience » (transposition NIS 2) reste en débat à l'Assemblée nationale depuis le 9 novembre ; aucune nouvelle étape franchie cette semaine selon les sources consultées — à revoir lors d'un prochain vote ou d'un report.
- Node.js : la release de sécurité du 11 novembre (16 failles corrigées, 7 de gravité élevée) reste la plus récente ; rien de nouveau publié depuis.
