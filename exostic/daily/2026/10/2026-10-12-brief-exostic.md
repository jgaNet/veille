---
title: "Brief Exostic — 12 octobre 2026"
date: 2026-10-12T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Point hebdomadaire du lundi : une faille Kubernetes sous Windows (CVE-2026-19444, kubectl cp) déjà couverte par la mise à jour recommandée le 26 septembre. NIS 2 et le budget 2027 suivent leur calendrier parlementaire sans évolution depuis le brief du 7 octobre, avec deux échéances communes le 13 octobre. Rien d'autre de retenable sur la stack, la sécurité ou les secteurs clients."
---

# Brief Exostic — 12 octobre 2026

**Date de publication :** 12 octobre 2026, 20 h 15 (heure de Paris)
**Point hebdomadaire (lundi)** — aucune alerte n'a été publiée depuis le brief
du 7 octobre. La recherche complémentaire de ce passage retient une seule
information nouvelle, une faille Kubernetes déjà couverte par une action déjà
recommandée. Conformément aux consignes, ce récapitulatif est publié malgré
tout.

Vérifié ce passage sans résultat retenable en dehors du point ci-dessous :
avis de sécurité Node.js (rien de nouveau, derniers correctifs 26.11.0 et
26.11.1 du 7 octobre — des annulations de changements de documentation et de
build, sans faille corrigée) ; changelog GitHub (rien sur Actions ni npm
entre le 7 et le 12 octobre, hors fonctionnalités de détection de secrets et
de sandboxing Copilot, hors périmètre ; la publication par étapes npm
étendue le 2 octobre à la création de nouveaux paquets ne change aucun
calendrier déjà suivi) ; avis CERT-FR du 9 et du 12 octobre (GitLab,
MongoDB, PostgreSQL JDBC, IBM, Apache Struts, noyaux Linux, Citrix — aucun ne
touche la stack suivie) ; blog Kubernetes (rien de nouveau après les billets
des 5 et 6 octobre déjà vus) ; page AWS « What's New » et statut AWS (aucune
panne ni annonce de retrait identifiée pour cette fenêtre). Côté marché, le
dossier législatif NIS 2 à l'Assemblée nationale est inchangé depuis le
6 octobre (aucune nouvelle date de séance) et le calendrier du PLF/PLFSS 2027
est confirmé sans changement par la page officielle de l'Assemblée nationale.
Rien de structurant identifié sur les secteurs clients (fintech, accessibilité
numérique, identité numérique, commande publique) pour cette fenêtre.

## 🔐 Sécurité

### Kubernetes : `kubectl cp` exposé à une traversée de chemin sous Windows (CVE-2026-19444) — note 9/10 🟢

Une faille de traversée de chemin (CWE-22) touche la commande `kubectl cp`
des clients `kubectl` tournant sous **Windows uniquement**. Lors d'une copie
depuis un conteneur, `kubectl` exécute `tar` à l'intérieur du conteneur puis
décompresse l'archive sur la machine locale ; si ce binaire `tar` est
malveillant, il peut écrire des fichiers à des chemins arbitraires sur la
machine de l'utilisateur, dans la limite de ses propres droits.

**Confirmé.** Avis officiel publié le 28 septembre 2026 sur la liste
`kubernetes-security-announce`, relayé le même jour sur la liste oss-security.
Versions affectées : v1.34.0–v1.34.11, v1.35.0–v1.35.8, v1.36.0–v1.36.4.
Versions corrigées : v1.34.12, v1.35.9, v1.36.5 et toute v1.37 (le module Go
`k8s.io/kubectl` suit le même schéma de version). CVSS 3.1 : 6,5 (EPSS 0,20
selon Mend.io). Faille signalée par Moriel Harush, corrigée par Marly
Salazar, Maciej Szulik et Vyom Yadav. Aucune exploitation active documentée.

**Incertain.** La fiche NVD et l'avis de sécurité du dépôt
`kubernetes/kubernetes` sur GitHub ne sont pas directement lisibles depuis ce
passage (NVD charge son contenu en JavaScript, la page « Security advisories »
du dépôt n'affiche rien) ; l'information s'appuie donc sur la liste officielle
`kubernetes-security-announce` lue directement, complétée par des bases
tierces (Red Hat, Mend.io) pour le score CVSS. Point notable pour le suivi
anti-doublon : les versions corrigées (1.34.12, 1.35.9, 1.36.5, 1.37.x) sont
exactement celles publiées le 23 septembre 2026 pour les CVE-2026-2270 et
CVE-2026-76654 déjà signalées dans ce flux le 26 septembre — cette faille a
donc été corrigée avant même sa divulgation publique, dans la même fournée de
correctifs.

**Ce que ça change pour Exostic.** **Rien à faire de nouveau.** Qui a déjà
appliqué la mise à jour recommandée le 26 septembre (passage en 1.34.12,
1.35.9, 1.36.5 ou 1.37.x) est déjà protégé contre cette faille. Pour qui ne
l'a pas encore fait, l'action reste la même qu'alors : mettre à jour le
cluster ou, à défaut, pour les postes Windows utilisant `kubectl cp`, ne
copier des fichiers que depuis des conteneurs de confiance. Exposition limitée
en pratique pour une architecture qui développe en conteneurs sous Linux/macOS
et déploie sur des clusters Linux ; seuls les postes de développement ou
d'administration Windows sont concernés.

**Sources :**
- **Primaire (lue directement)** — [Avis kubernetes-security-announce, 28 septembre 2026](https://groups.google.com/g/kubernetes-security-announce/c/v_ob5Gf4-eY)
- **Référence (titre lu, corps non accessible)** — [oss-security, Openwall, 28 septembre 2026](http://www.openwall.com/lists/oss-security/2026/09/28/1)
- **Base de vulnérabilités (score CVSS, non indépendante de NVD)** — [Mend.io, CVE-2026-19444](https://www.mend.io/vulnerability-database/CVE-2026-19444/)
- **Entrée précédente (même fournée de correctifs)** — [exostic/daily/2026/09/2026-09-26-brief-exostic.md](../../09/2026-09-26-brief-exostic.md)

## ✅ À faire

- **GitHub Actions — label `ubuntu-latest`.** Tester les workflows sur `ubuntu-26.04` ou épingler explicitement `ubuntu-24.04` avant le début de la migration, le 19 octobre 2026.
- **GitHub Actions — `pull_request_target`.** Vérifier les workflows de dépôts publics qui déclenchent sur cet événement avant l'application automatique de la règle de blocage, le 2 novembre 2026.

## 📅 Échéances à venir

- 2026-10-13 — NIS 2 : prochaine conférence des présidents de l'Assemblée nationale susceptible de réinscrire le projet de loi « résilience » à l'ordre du jour (aucune date de séance garantie à ce stade).
- 2026-10-13 — PLF 2027 (texte n° 3210) : discussion générale en séance publique à l'Assemblée nationale, première lecture (3 840 amendements déposés sur la première partie) ; PLFSS 2027 (texte n° 3211) toujours en commission des affaires sociales, sans date de séance publique fixée.
- 2026-10-19 — GitHub Actions : début de la migration progressive du label `ubuntu-latest` d'Ubuntu 24.04 vers Ubuntu 26.04 (achèvement prévu le 19 novembre 2026).
- 2026-10-20 — Node.js 24 passe d'Active LTS à maintenance.
- 2026-10-27 — Kubernetes 1.34 : fin de vie côté projet amont.
- 2026-10-28 — Node.js 26 devient Active LTS.
- 2026-10-30 — Amazon Pinpoint : retrait du service (les API SMS, voix, push et OTP restent servies par AWS End User Messaging).
- 2026-11-02 — GitHub Actions : application automatique de la règle par défaut bloquant `pull_request_target` sur les dépôts publics sans politique d'événements.

## 🧭 Ce qu'il faut retenir

Deux dossiers parlementaires convergent le 13 octobre — la séance budgétaire
du PLF 2027 et la prochaine conférence des présidents susceptible de
réinscrire NIS 2 — sans qu'aucun des deux ne soit encore voté : les deux
calendriers restent susceptibles de glisser, comme ils l'ont déjà fait
plusieurs fois depuis fin septembre. Côté stack, cette semaine confirme
surtout une bascule habituelle de la veille sécurité : des failles corrigées
dans une même fournée de correctifs (23 septembre) continuent d'être
divulguées publiquement avec quelques jours de décalage (CVE-2026-19444 le
28 septembre) sans changer l'action déjà recommandée — un rappel que suivre
les numéros de version publiés compte parfois plus que suivre chaque CVE une
par une.
