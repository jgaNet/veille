---
title: "Brief Exostic — 19 novembre 2026"
date: 2026-11-19T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Faille critique non authentifiée dans NGINX (HTTP/2, CVE-2026-123633 et CVE-2026-123007) à traiter sur les reverse proxies et contrôleurs d'entrée Kubernetes. Rien de nouveau côté marché du conseil par rapport au brief d'hier."
---

# Brief Exostic — 19 novembre 2026

## 🔐 Sécurité

**NGINX (F5) — deux vulnérabilités critiques, exécution de code à distance non authentifiée via HTTP/2 — note 7/10**

Le CERT-FR a publié le 18 novembre l'alerte CERTFR-2026-ALE-017 sur deux vulnérabilités de F5 NGINX : CVE-2026-123633 et CVE-2026-123007. Un attaquant non authentifié peut exploiter l'une d'elles à distance via HTTP/2 pour exécuter du code arbitraire ; un code de démonstration public existe pour CVE-2026-123007. Versions concernées selon le CERT-FR : NGINX Open Source antérieures à 1.31.9 (branche 1.31.x) et à 1.30.7, NGINX Plus 3.1.x–3.2.x antérieures à 3.7.3.0.1 et 3.7.x antérieures à 37.0.8.1.

- **Établi :** l'alerte officielle du CERT-FR, lue directement, donne les deux identifiants CVE, les plages de versions affectées et une mesure de contournement immédiate — désactiver HTTP/2 (retirer ou remplacer la directive `http2 on` pour NGINX ≤ 1.25.0 ; ne pas déclarer `http2` sur `listen 443 ssl;` pour les versions plus récentes) en attendant le correctif.
- **Incertain :** les bulletins F5 cités par le CERT-FR (K000163926 et K000163928) n'ont pas pu être consultés directement (page dynamique inaccessible), et aucune autre source indépendante n'a encore repris ces deux CVE au moment du passage — probablement parce que l'alerte date d'hier. Note abaissée en conséquence (une annonce officielle datée, détails à confirmer directement chez l'éditeur).
- **Ce que ça change :** à faire sans attendre sur toute instance exposée — NGINX est couramment utilisé comme reverse proxy devant des applications Node.js ou comme contrôleur d'entrée (Ingress) dans l'écosystème Kubernetes. Désactiver HTTP/2 en attendant le correctif, ou mettre à jour vers les versions corrigées dès leur confirmation chez F5.
- **Sources croisées :** CERT-FR — [CERTFR-2026-ALE-017](https://cert.cyber.gouv.fr/alerte/CERTFR-2026-ALE-017/) (source officielle, lue directement) ; bulletins F5 K000163926 et K000163928 cités par le CERT-FR mais non consultés directement.

## ✅ À faire

- Désactiver HTTP/2 sur toute instance NGINX exposée (reverse proxy, Ingress Kubernetes) en attendant le correctif F5, puis mettre à jour dès que les bulletins K000163926/K000163928 confirment les versions corrigées.

## 📅 Échéances à venir

- **19 novembre 2026** — GitHub Actions : fin de la fenêtre de migration progressive du label `ubuntu-latest` vers Ubuntu 26.04 (épinglage `ubuntu-24.04` toujours possible en attendant une bascule constatée).
- **19 novembre 2026** — PLF 2027 : examen définitif de la seconde partie par la commission des finances du Sénat (10 h).
- **26 novembre 2026** — PLFSS 2027 : commission mixte paritaire, après adoption de l'ensemble du texte par le Sénat le 18 novembre.
- **26 novembre 2026** — Amazon EKS 1.31 : fin du support étendu (bascule automatique du plan de contrôle).
- **2 décembre 2026** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements (report d'un mois).
- **2 décembre 2026** — Amazon EKS 1.34 : fin du support standard (bascule en support étendu facturé).
- **9 décembre 2026** — PLF 2027 : séance publique au Sénat, explications de vote puis scrutin public à la tribune de droit sur l'ensemble du texte (16 h 30).

## 🧭 Ce qu'il faut retenir

- La seule information nouvelle et suffisamment établie de la journée concerne la sécurité : une faille HTTP/2 non authentifiée dans NGINX, à traiter sans attendre sur les reverse proxies et contrôleurs d'entrée Kubernetes, même si le bulletin de l'éditeur reste à confirmer directement.
- Rien de nouveau côté marché du conseil (PLF 2027, PLFSS 2027, loi résilience) par rapport au brief d'hier : les échéances déjà suivies n'ont pas bougé, elles sont simplement rappelées ci-dessus car plusieurs tombent dans les prochains jours.
