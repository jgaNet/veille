---
title: "Brief Exostic — 17 novembre 2026"
date: 2026-11-17T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Deux informations retenues : l'Assemblée nationale achève l'examen du projet de loi « résilience » (NIS2) avec un vote solennel attendu ce 17 novembre, et Kubernetes programme la suppression du backend IPVS de kube-proxy en version 1.40."
---

# Brief Exostic — 17 novembre 2026

**Date de publication :** 17 novembre 2026, 20 h 15 (heure de Paris)

## 💼 Marché du conseil

### Loi « résilience » (NIS2) : l'Assemblée nationale achève son examen, vote solennel attendu ce 17 novembre — note 7/10 🟢

**Confirmé.** Les députés ont terminé l'examen en séance publique du projet
de loi « résilience » (transposition de NIS2 et DORA) les 9 et 10 novembre,
article par article, avec plusieurs amendements adoptés contre l'avis du
gouvernement : intégration de critères de souveraineté numérique dans la
stratégie nationale, exigences de cybersécurité dans les marchés publics,
déclaration d'incident unique (ANSSI/CNIL/ACPR/AMF), reconnaissance de la
veille OSINT sur des données volées, préférence pour les prestataires
qualifiés par l'ANSSI avec possibilité d'interdire des composants contrôlés
par un État tiers, et plusieurs dispositions pour les collectivités.
L'article 16 bis, introduit au Sénat pour interdire d'imposer aux
fournisseurs de chiffrement des dispositifs affaiblissant volontairement la
sécurité, a lui été supprimé le 10 novembre (69 voix contre 37) sur
amendement du gouvernement et d'un député, celui-ci et le gouvernement jugeant
le texte sénatorial trop large et gênant pour les services judiciaires et de
renseignement. Le vote solennel sur l'ensemble du texte est programmé ce 17
novembre, après les questions au gouvernement.

**Incertain.** Le résultat de ce vote solennel n'apparaît pas encore dans les
sources consultées (la page officielle des scrutins de l'Assemblée nationale
ne liste, à l'heure de ce passage, aucun scrutin postérieur au 16 novembre).
La date de réunion de la commission mixte paritaire, qui devra ensuite
concilier ce texte très remanié avec la version du Sénat, n'est pas encore
connue.

**Ce que ça change pour Exostic : à surveiller.** Le texte renforce
nettement les obligations pesant sur les entités couvertes par NIS2 et sur
leurs prestataires (déclaration d'incident, préférence pour des prestataires
qualifiés ANSSI, possibilité d'exclure des composants sous contrôle d'un État
tiers) — autant d'éléments qui peuvent peser sur des appels d'offres ou des
cahiers des charges côté clients dans les secteurs réglementés. Rien à faire
dans l'immédiat : le texte n'est pas encore adopté définitivement et passera
par une commission mixte paritaire avant toute entrée en application.

**Sources croisées** (deux médias spécialisés indépendants, le dossier
législatif du Sénat confirmant le stade de la procédure) :
- [L'Assemblée adopte enfin la transposition, et la réécrit contre l'avis du gouvernement](https://www.journaldunet.com/cybersecurite/1557881-nis2-l-assemblee-adopte-enfin-la-transposition-et-la-reecrit-contre-l-avis-du-gouvernement/)
- [Article 16 bis supprimé, vote du 17 novembre 2026](https://www.leto.legal/news/nis-2-loi-resilience-assemblee-article-16-bis-supprime-vote-17-novembre-2026)
- [Dossier législatif — Sénat](https://www.senat.fr/tableau-historique/pjl24-033.html)

## 🛠️ Stack

### Kubernetes : suppression du backend IPVS de kube-proxy programmée en version 1.40 — note 8/10 🟢

**Confirmé.** Le blog officiel de Kubernetes (SIG Network) annonce que le
backend IPVS de kube-proxy, déprécié depuis la version 1.35, sera supprimé en
**Kubernetes 1.40**. Raison donnée : l'API noyau IPVS correspond mal à l'API
Services de Kubernetes, ne couvre jamais complètement tous les cas limites,
et sa maintenance pèse lourd face aux deux autres backends. Le backend
`nftables`, passé GA en version 1.33, est destiné à remplacer à terme
`iptables` comme `ipvs`. Les utilisateurs d'`ipvs` sont invités à planifier
leur migration vers `nftables` ou `iptables`.

**Incertain.** La version 1.40 correspond, au rythme actuel de Kubernetes
(trois versions mineures par an), à une échéance encore lointaine (de l'ordre
de 2028) ; le billet ne précise pas de date calendaire ferme ni de KEP
(Kubernetes Enhancement Proposal) associé.

**Ce que ça change pour Exostic : à surveiller.** Concerne uniquement les
projets ayant explicitement choisi le backend `--proxy-mode=ipvs` de
kube-proxy — configuration minoritaire par rapport à `iptables` ou
`nftables`. Vérifier, pour tout cluster suivi, quel backend kube-proxy est
configuré ; aucune action urgente, la fenêtre de migration se compte en
années.

**Source primaire :**
- [Scheduling the removal of the kube-proxy IPVS backend — Kubernetes Blog, 16 novembre 2026](https://kubernetes.io/blog/2026/11/16/ipvs-removal/)

## 📅 Échéances à venir

- **18 novembre, 16 h 30** — PLFSS 2027 : scrutin public solennel sur l'ensemble du texte au Sénat (discussion en séance publique les 17 et 18 novembre, confirmée sans changement de calendrier)
- **19 novembre** — GitHub Actions : fin de la fenêtre de migration `ubuntu-latest` vers Ubuntu 26.04 — épingler `ubuntu-24.04` en attendant si nécessaire
- **19 novembre, 10 h** — PLF 2027 : examen définitif de la seconde partie en commission des finances du Sénat
- **26 novembre** — Amazon EKS 1.31 : fin du support étendu, mise à niveau automatique du plan de contrôle
- **2 décembre** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics (après report d'un mois)
- **2 décembre** — Amazon EKS 1.34 : fin du support standard, bascule en support étendu facturé (0,60 $ par cluster et par heure)
- **9 décembre, 16 h 30** — PLF 2027 : séance publique au Sénat, scrutin public sur l'ensemble du texte (calendrier qualifié par le Sénat lui-même de « susceptible d'être modifié à tout moment »)

## 🧭 Ce qu'il faut retenir

- Le texte NIS2 ressort de l'Assemblée nationale significativement réécrit
  par rapport à la version sénatoriale, avec des obligations renforcées pour
  les prestataires (déclaration d'incident, qualification ANSSI) ; sa version
  définitive dépendra de la commission mixte paritaire, pas encore
  programmée.
- Aucune publication de version ni faille critique n'est apparue depuis la
  release de sécurité Node.js du 11 novembre.
- Le reste de la stack (TypeScript, AWS, npm) n'a rien produit franchissant
  le critère d'entrée du flux depuis le brief d'hier.
