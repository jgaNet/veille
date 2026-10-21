---
title: "Brief Exostic — 21 octobre 2026"
date: 2026-10-21T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "Node.js publie ses releases de sécurité du 21 octobre : 12 failles corrigées, dont une possible exécution de code à distance via le décodeur Brotli — mise à jour recommandée sans délai."
---

# Brief Exostic — 21 octobre 2026

## 🔐 Sécurité

### Node.js : 12 failles corrigées dans les releases de sécurité du 21 octobre, gravité maximale « haute » — note de vérité 9/10 🟢

Node.js a publié, comme annoncé, ses releases de sécurité du 21 octobre 2026 sur les trois lignes actives : 22.x, 24.x et 26.x (versions corrigées : 22.23.4, 24.22.1, 26.12.1). Douze vulnérabilités sont corrigées. La plus grave, **CVE-2026-111497**, est une écriture hors limites dans le décodeur Brotli pouvant permettre une exécution de code à distance (gravité haute, lignes 22.x/24.x/26.x). Trois autres failles de gravité haute : `dns.resolve` tronque un nom de domaine contenant un caractère NUL (CVE-2026-105482) ; deux contournements de la vérification du nom d'hôte TLS, l'un via des chiffres IP écrits en pleine chasse (CVE-2026-105483, 26.x/24.x), l'autre via une résolution DNS trop permissive d'un nom en adresse IP (CVE-2026-106069, toutes lignes). Les huit autres failles sont de gravité moyenne (dont une faille de validation de certificat IPv4 et un défaut dans les caches d'entropie de `crypto.randomUUID()`/`randomInt()` partagés par erreur entre processus via les snapshots de démarrage) ou faible (Permission Model, parsing ZIP).

**Confirmé.** Lu directement sur le billet de sécurité officiel de nodejs.org : identifiants CVE, versions touchées et versions corrigées, niveau de gravité par faille. Fait documentaire directement vérifiable à la source primaire de l'éditeur.

**Incertain.** Le billet ne précise pas, faille par faille, le numéro de version-patch exact où chacune a été introduite ni s'il existe une exploitation active documentée ; aucune deuxième source indépendante (dépôt GitHub, GHSA) n'a été recoupée dans ce passage — la note est plafonnée à 9/10 pour cette raison plutôt que portée à 10/10.

**Ce que ça change pour Exostic : à faire, sans délai.** Mettre à jour tout projet Node.js vers 22.23.4, 24.22.1 ou 26.12.1 selon la ligne utilisée, en priorité les services qui décompressent du contenu Brotli (proxys, serveurs HTTP avec compression) ou qui valident des noms d'hôte TLS à partir d'une entrée réseau. Vérifier aussi l'usage de `crypto.randomUUID()`/`randomInt()` dans des images de conteneurs utilisant des snapshots de démarrage ou des exécutables autonomes (SEA). Les versions déjà en fin de vie (18.x, 20.x) restent, elles aussi, concernées par ces failles mais ne recevront pas de correctif.

**Sources :**
- **Source primaire** — [Node.js — October 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) (21 octobre 2026)

## 📅 Échéances à venir

- **27 octobre 2026** — Kubernetes 1.34 : fin de vie côté projet amont (EKS 1.34 : fin du support standard le 2 décembre 2026).
- **27 octobre 2026** — PLFSS 2027 : vote solennel en première lecture (délai constitutionnel de 20 jours) ; motion de rejet préalable de La France insoumise écartée le 20 octobre, examen en séance engagé comme prévu.
- **27 octobre 2026** — PLF 2027 : reprise annoncée des débats sur la partie recettes, après le report du 20 octobre (date de reprise non confirmée par un document officiel de l'Assemblée nationale).
- **28 octobre 2026** — Node.js 26 devient Active LTS (calendrier susceptible de changer).
- **30 octobre 2026** — Amazon Pinpoint : retrait du service (API SMS/voix/push/OTP conservées via AWS End User Messaging).
- **2 novembre 2026** — GitHub Actions : application automatique du blocage par défaut de `pull_request_target` sur les dépôts publics.
- **17 novembre 2026** — PLF 2027 : vote solennel sur l'ensemble du texte en première lecture (délai constitutionnel de 40 jours).
- **19 novembre 2026** — GitHub Actions : fin de la fenêtre de migration du label `ubuntu-latest` vers Ubuntu 26.04.

## 🧭 Ce qu'il faut retenir

La fenêtre de sécurité annoncée depuis le 15 octobre s'est tenue à la date prévue, avec un correctif à exécution de code à distance (décodeur Brotli) dans le lot — c'est le type de publication qu'il vaut mieux appliquer rapidement plutôt que d'attendre le prochain cycle de maintenance habituel. Côté budget, le calendrier annoncé le 29 septembre continue pour l'instant de tenir pour le PLFSS (vote solennel le 27 octobre), tandis que la partie recettes du PLF reste en attente d'une date de reprise officiellement confirmée.
