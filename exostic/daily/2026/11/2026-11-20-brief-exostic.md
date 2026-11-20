---
title: "Brief Exostic — 20 novembre 2026"
date: 2026-11-20T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "La faille NGINX HTTP/2 signalée hier passe du simple contournement à un correctif concret : AWS confirme le problème et des paquets nginx déjà corrigés existent pour Amazon Linux 2, 2023 et 2027 Preview. Rien de nouveau par ailleurs côté marché du conseil."
---

# Brief Exostic — 20 novembre 2026

## 🔐 Sécurité

**NGINX HTTP/2 : AWS confirme la faille et des paquets corrigés existent déjà pour Amazon Linux — note 8/10**

*Suite de l'entrée d'hier : [exostic/daily/2026/11/2026-11-19-brief-exostic.md](../2026-11-19-brief-exostic.md).*

AWS a publié le 19 novembre son propre bulletin de sécurité (2026-192-AWS, « Issue with nginx HTTP/2 Implementation »), confirmant indépendamment les deux failles NGINX non authentifiées signalées hier par le CERT-FR (CVE-2026-123633, CVE-2026-123007). Le centre d'avis Amazon Linux Security (ALAS) liste des paquets `nginx` déjà corrigés : Amazon Linux 2023 (ALAS2023-2026-3494, 18 novembre), Amazon Linux 2 (ALAS2NGINX1-2026-018, 19 novembre) et Amazon Linux 2027 Preview (ALAS2027-2026-385/386, 18 novembre). Gravité qualifiée d'« Important », score CVSS v3 de 8,1.

- **Établi :** bulletin AWS et avis ALAS lus directement — la faille touche NGINX Open Source et NGINX Plus quand HTTP/2 est activé (plantage du worker, parfois exécution de code), et des paquets `nginx` corrigés sont disponibles sur Amazon Linux 2, 2023 et 2027 Preview.
- **Incertain :** les avis ALAS ne donnent pas le numéro de version corrigée en amont (seulement le statut « Fixed ») ; les bulletins propres à F5 (K000163926, K000163928) restent non consultés directement ; aucune exploitation active confirmée à ce stade.
- **Qui parle :** AWS a intérêt à présenter sa réaction comme rapide et complète, mais l'information retenue — existence de paquets corrigés, nommés et datés — est directement vérifiable, pas une simple déclaration.
- **Ce que ça change :** à faire — pour toute charge Node.js derrière NGINX sur une image Amazon Linux 2 / 2023 / 2027 Preview (EC2, conteneurs construits sur ces images), mettre à jour le paquet `nginx` du système dès maintenant plutôt que de se limiter à la désactivation d'HTTP/2 recommandée hier ; vérifier aussi les contrôleurs d'entrée Kubernetes qui embarqueraient un NGINX basé sur ces paquets. Pour un NGINX installé autrement (build F5 officiel, image maison), continuer d'attendre la confirmation directe de F5.
- **Sources croisées :** AWS — [bulletin 2026-192-AWS](https://aws.amazon.com/security/security-bulletins/2026-192-aws/) ; Amazon Linux Security Center — avis ALAS2023-2026-3494, ALAS2NGINX1-2026-018, ALAS2027-2026-385/386 (lus directement) ; CERT-FR — [CERTFR-2026-ALE-017](https://cert.cyber.gouv.fr/alerte/CERTFR-2026-ALE-017/) (entrée d'hier).

## ✅ À faire

- Mettre à jour le paquet `nginx` dès maintenant sur toute instance Amazon Linux 2, Amazon Linux 2023 ou Amazon Linux 2027 Preview exposant HTTP/2 (correctif déjà disponible, avis ALAS officiels).
- Pour un NGINX installé autrement, continuer à désactiver HTTP/2 en attendant la confirmation directe des bulletins F5 (K000163926, K000163928).

## 📅 Échéances à venir

- **26 novembre 2026** — PLFSS 2027 : commission mixte paritaire, après adoption de l'ensemble du texte par le Sénat le 18 novembre.
- **26 novembre 2026** — Amazon EKS 1.31 : fin du support étendu (bascule automatique du plan de contrôle).
- **2 décembre 2026** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements (report d'un mois).
- **2 décembre 2026** — Amazon EKS 1.34 : fin du support standard (bascule en support étendu facturé).
- **9 décembre 2026** — PLF 2027 : séance publique au Sénat, explications de vote puis scrutin public à la tribune de droit sur l'ensemble du texte (16 h 30).

## 🧭 Ce qu'il faut retenir

- La faille NGINX HTTP/2 signalée hier par le CERT-FR passe, en une journée, du simple contournement (désactiver HTTP/2) à un vrai correctif disponible — au moins pour les charges tournant sur les distributions Amazon Linux d'AWS. C'est une confirmation indépendante utile, pas une nouvelle faille.
- Rien de nouveau par ailleurs côté marché du conseil (PLF 2027, PLFSS 2027, loi résilience) : les échéances déjà suivies n'ont pas bougé depuis hier.
