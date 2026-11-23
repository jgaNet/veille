---
title: "Brief Exostic — 23 novembre 2026"
date: 2026-11-23T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Correctif critique GitLab (CVE-2026-132825, RCE potentielle) pour les instances auto-hébergées. Point hebdomadaire du lundi : PLFSS 2027 et loi résilience adoptées en première lecture la semaine passée, toutes deux désormais suspendues à une commission mixte paritaire."
---

# Brief Exostic — 23 novembre 2026

## 🔐 Sécurité

**GitLab : patch critique sur une bibliothèque Ruby, risque d'exécution de code à distance — note 9/10 🟢**

GitLab a publié le 20 novembre des versions correctives critiques (19.6.1, 19.5.8, 19.4.10, Community et Enterprise) pour CVE-2026-132825, un débordement de tampon sur tas dans la conversion de casse d'une chaîne au sein de Ruby (GHSA-34m4-m9fh-gqp5). Une chaîne forgée peut provoquer une écriture hors limites, ce que l'équipe sécurité de Ruby qualifie de potentiellement exploitable pour de l'exécution de code à distance « dans certains scénarios ». GitLab classe le correctif « critique » ; le MITRE note la faille 7,4 (High) en CVSS. Le CERT-FR a publié le même jour un avis convergent (CERTFR-2026-AVI-1591). GitLab.com et GitLab Dedicated sont déjà corrigés ; seules les installations auto-hébergées sont concernées.

- **Établi :** bulletin officiel GitLab et avis CERT-FR, lus directement et concordants sur la date, les versions touchées (< 19.4.10, < 19.5.8, < 19.6.1) et le CVE.
- **Incertain :** aucune exploitation active documentée à ce stade ; l'écart entre la qualification « critique » de GitLab/Ruby et le score CVSS 7,4 (High) du MITRE n'est pas expliqué dans les sources consultées.
- **Ce que ça change :** à faire — pour toute instance GitLab auto-hébergée (CE ou EE) en version antérieure à 19.4.10 / 19.5.8 / 19.6.1, mettre à jour dès maintenant (paquets et images officiels déjà corrigés) ; pour un GitLab compilé soi-même, reconstruire avec Ruby 3.3.14 ou 3.4.13 au minimum.
- **Sources croisées :** GitLab — [patch release 19.6.1/19.5.8/19.4.10](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-6-1-released/) ; CERT-FR — [CERTFR-2026-AVI-1591](https://cert.cyber.gouv.fr/avis/CERTFR-2026-AVI-1591).

## 💼 Marché du conseil

**Textes suivis : deux adoptions en première lecture la semaine passée, rien de nouveau depuis — note 9/10 🟢**

Rappel sans évolution par rapport aux entrées déjà publiées : le Sénat a adopté l'ensemble du PLFSS 2027 le 18 novembre (201 voix contre 124) ; l'Assemblée nationale a adopté la loi « résilience » (transposition NIS 2 / DORA / Cyber Resilience Act) le 17 novembre (464 voix contre 64), article sur le chiffrement supprimé. Les deux textes restent suspendus à une éventuelle commission mixte paritaire : celle du PLFSS est annoncée pour le 26 novembre (échéance déjà suivie) ; pour la loi résilience, les recherches de ce jour ne permettent pas de confirmer une date — une source mentionne seulement qu'une CMP « reste possible ».

- **Établi :** les deux votes et leurs scores, sur les comptes rendus et dossiers législatifs des deux chambres.
- **Incertain :** calendrier de la commission mixte paritaire sur la loi résilience ; issue des deux CMP (accord ou échec).
- **Ce que ça change :** à surveiller — rien à faire avant l'issue des commissions mixtes paritaires ; le texte de la loi résilience (périmètre NIS 2, sanctions, obligations de notification) peut encore changer avant promulgation.
- **Sources croisées :** Sénat — [dossier PLFSS 2027](https://www.senat.fr/leg/pjl26-138.html) ; Public Sénat — [modifications après le passage au Sénat](https://www.publicsenat.fr/actualites/politique/budget-2027-de-la-securite-sociale-les-modifications-a-retenir-apres-le-passage-du-projet-de-loi-au-senat) ; Leto — [adoption loi résilience, 464 voix](https://www.leto.legal/news/nis-2-loi-resilience-adoptee-assemblee-464-voix-17-novembre-2026).

## 📅 Échéances à venir

- **26 novembre 2026** — PLFSS 2027 : commission mixte paritaire, après adoption de l'ensemble du texte par le Sénat le 18 novembre.
- **26 novembre 2026** — Amazon EKS 1.31 : fin du support étendu (bascule automatique du plan de contrôle).
- **2 décembre 2026** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements (report d'un mois, toujours en mode évaluation à ce jour).
- **2 décembre 2026** — Amazon EKS 1.34 : fin du support standard (bascule en support étendu facturé).
- **9 décembre 2026** — PLF 2027 : séance publique au Sénat, explications de vote puis scrutin public à la tribune de droit sur l'ensemble du texte (16 h 30).

## 🧭 Ce qu'il faut retenir

- Point hebdomadaire (lundi) : la semaine du 17 au 23 novembre a surtout fait avancer deux textes de loi (PLFSS 2027, loi résilience) jusqu'à leur adoption en première lecture — sans qu'aucun des deux ne soit encore définitif. Rien ne change avant l'issue des commissions mixtes paritaires.
- Deuxième correctif critique du mois sur un outil central de la chaîne de développement après celui de Node.js du 11 novembre : GitLab publie le 20 novembre un patch critique pour les installations auto-hébergées. Aucune exploitation active n'est documentée pour l'un ou l'autre à ce stade — une mise à jour rapide suffit, sans réaction de panique.
