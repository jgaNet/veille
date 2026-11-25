---
title: "Brief Exostic — 25 novembre 2026"
date: 2026-11-25T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Traefik (reverse-proxy/contrôleur d'entrée courant des architectures Kubernetes et microservices) publie trois avis de sécurité le 24 novembre, dont un déni de service non authentifié activable par défaut. Journée calme par ailleurs."
---

# Brief Exostic — 25 novembre 2026

## 🔐 Sécurité

**Traefik : trois avis de sécurité, dont un déni de service non authentifié activable par défaut — note 7/10 🟢**

Traefik, reverse-proxy et contrôleur d'entrée fréquemment placé devant des architectures Kubernetes ou microservices, a publié trois avis de sécurité le 24 novembre 2026, relayés le jour même par le CERT-FR (CERTFR-2026-AVI-1611). Le plus sévère (GHSA-3rh5-223h-cpwr, qualifié « High » par l'éditeur, sans CVE ni score CVSS) décrit un déni de service non authentifié : le middleware de compression Brotli, activé par défaut, laisse le processus accumuler plusieurs mégaoctets d'état par réponse tant qu'elle n'est pas terminée ; un client peut exploiter cela en maintenant ouvertes de nombreuses réponses compressées, par exemple sur une seule connexion HTTP/2, pour épuiser la mémoire du processus et interrompre toutes les routes. Un deuxième avis (GHSA-9657-c2gv-wjpj, CVSS v4 6,3 « Moderate », pas de CVE) décrit un contournement de l'authentification par certificat client sur une instance Traefik partagée entre locataires : un nom d'hôte terminé par un point échappe à la détection de conflit entre options TLS. Un troisième avis (GHSA-42x2-976f-ph52) complète le lot, sans détail technique obtenu dans les sources consultées.

- **Établi :** avis publiés directement par l'éditeur (comptes GitHub Security Advisories de `traefik/traefik`), donnant versions affectées et corrigées ; CERT-FR relaie l'alerte le même jour (CERTFR-2026-AVI-1611). Versions affectées : 3.0 à 3.7.19 et les versions candidates 3.8 (déni de service Brotli, toutes branches 3.x) ; 2.0 à 2.11.63 et 3.0 à 3.7.19/3.8-RC (contournement TLS). Correctifs disponibles : 3.7.20, 3.8.0, 2.11.64 ; les lignes 3.0 à 3.6 sont en fin de vie et ne seront pas corrigées.
- **Incertain :** aucun identifiant CVE ni score CVSS n'a été attribué à la faille la plus sévère (Brotli) à ce stade — la qualification « High » reste celle de l'éditeur seul ; aucune exploitation active n'est documentée dans les sources consultées ; le CERT-FR reprend l'essentiel des avis de l'éditeur sans analyse technique indépendante supplémentaire, ce qui limite la portée du recoupement.
- **Ce que ça change :** à faire — pour toute instance Traefik en version antérieure à 3.7.20/3.8.0 (ou 2.11.64 pour le contournement TLS multi-locataires), mettre à jour ; pas d'urgence documentée en l'absence d'exploitation connue, mais la faille Brotli touche une configuration par défaut et ne demande aucune authentification.
- **Sources croisées :** GitHub Security Advisories (éditeur) — [GHSA-3rh5-223h-cpwr](https://github.com/traefik/traefik/security/advisories/GHSA-3rh5-223h-cpwr), [GHSA-9657-c2gv-wjpj](https://github.com/traefik/traefik/security/advisories/GHSA-9657-c2gv-wjpj) ; CERT-FR — [CERTFR-2026-AVI-1611](https://cert.cyber.gouv.fr/avis/CERTFR-2026-AVI-1611).

## ✅ À faire

- Mettre à jour Traefik vers 3.7.20 / 3.8.0 (ou 2.11.64) pour toute architecture Kubernetes ou microservices qui l'utilise comme reverse-proxy ou contrôleur d'entrée.

## 📅 Échéances à venir

- **26 novembre 2026** — PLFSS 2027 : commission mixte paritaire annoncée, après adoption de l'ensemble du texte par le Sénat le 18 novembre ; aucun résultat connu à l'heure de ce brief.
- **26 novembre 2026** — Amazon EKS 1.31 : fin du support étendu (bascule automatique du plan de contrôle).
- **2 décembre 2026** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements.
- **2 décembre 2026** — Amazon EKS 1.34 : fin du support standard (bascule en support étendu facturé).
- **9 décembre 2026** — PLF 2027 : séance publique au Sénat, vote solennel sur l'ensemble du texte (16 h 30).

## 🧭 Ce qu'il faut retenir

- Journée calme : la seule information retenue aujourd'hui touche un composant d'infrastructure (Traefik) courant des déploiements Kubernetes/microservices, sans exploitation active documentée ni CVE attribué à ce stade.
- Deux échéances déjà suivies tombent dès demain (commission mixte paritaire PLFSS, fin de support étendu EKS 1.31) ; aucune n'a encore livré de résultat à l'heure de ce brief, et rien ne change avant leur issue.
- Semaine à venir chargée côté échéances (EKS 1.34, blocage `pull_request_target`, vote solennel du PLF 2027) : à vérifier au prochain passage plutôt qu'à anticiper.
