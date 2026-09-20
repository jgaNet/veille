---
title: "🛠️ Stack — Kubernetes 1.34 en fin de vie le 27 octobre 2026, Node.js 26 en LTS le 28 octobre"
date: 2026-09-20T11:00:00+02:00
type: alert
feed: exostic
category: stack
confidence: 9
summary: "D'après les calendriers officiels, Kubernetes 1.34 ne reçoit plus de correctifs après le 27 octobre 2026 (sur Amazon EKS : fin du support standard le 2 décembre, puis support étendu facturé six fois plus cher), Node.js 24 passe en maintenance le 20 octobre et Node.js 26 devient la LTS active le 28 octobre. À faire avant le 27 octobre pour un cluster 1.34 autogéré, avant le 2 décembre sur EKS ; rien d'urgent côté Node.js tant qu'on n'est pas en version 22 ou antérieure."
---

# 🛠️ Stack — Kubernetes 1.34 en fin de vie le 27 octobre 2026, Node.js 26 en LTS le 28 octobre

**Date de publication :** 20 septembre 2026, 11 h 00 (heure de Paris)
**Nature : stack technique — fins de support et bascule de LTS**
**Note de vérité : 9/10 🟢**
**Pour Exostic : à faire avant le 27 octobre 2026 (cluster Kubernetes 1.34 autogéré) ou avant le 2 décembre 2026 (Amazon EKS 1.34) ; à planifier côté Node.js**

Premier relevé des calendriers de support de la stack, à environ 30 jours d'un groupe d'échéances.

**Kubernetes.** Le projet maintient les trois dernières versions mineures : 1.37 (publiée le 26 août 2026), 1.36 et 1.35. La version **1.34**, en mode maintenance depuis le 27 août 2026, atteint sa **fin de vie le 27 octobre 2026** : plus aucun correctif, y compris de sécurité, côté projet amont. Suivent 1.35 (fin de vie le 28 février 2027), 1.36 (28 juin 2027) et 1.37 (28 octobre 2027).

**Amazon EKS** suit son propre calendrier, décalé : 14 mois de support standard après la mise à disposition sur EKS, puis 12 mois de support étendu. Pour **EKS 1.34**, le support standard se termine le **2 décembre 2026**. Le support étendu est **activé par défaut** : sans action, le cluster y bascule automatiquement, et le plan de contrôle passe de 0,10 $ à **0,60 $ par cluster et par heure**. Si le support étendu a été désactivé, le cluster est mis à niveau automatiquement à la fin du support standard. Autres dates EKS : la version **1.31** sort du support étendu le **26 novembre 2026** — le plan de contrôle est alors mis à niveau d'office, à un moment non annoncé ; la 1.35 quitte le support standard le 27 mars 2027, la 1.36 le 2 août 2027. La version 1.37 ne figurait pas encore au calendrier EKS lors de ce passage.

**Node.js.** Selon le calendrier du groupe de travail Release : **Node.js 24** (« Krypton ») passe d'Active LTS à **maintenance le 20 octobre 2026** (fin de vie le 30 avril 2028) ; **Node.js 26**, en version courante depuis le 5 mai 2026, devient **Active LTS le 28 octobre 2026** (maintenance le 20 octobre 2027, fin de vie le 30 avril 2029) ; **Node.js 22** (« Jod »), déjà en maintenance, atteint sa **fin de vie le 30 avril 2027**. Node.js 20 n'est plus maintenu depuis le 30 avril 2026. Le même calendrier annonce la version 27 en alpha le 28 octobre 2026 et en version publiée le 22 avril 2027.

## Confirmé

- Dates de fin de vie de Kubernetes 1.34 à 1.37 : pages « Releases » et « Patch Releases » de kubernetes.io, lues directement ; endoflife.date, tenu indépendamment, donne les mêmes dates de publication et de passage en maintenance.
- Calendrier EKS, bascule par défaut en support étendu et mise à niveau automatique en fin de cycle : documentation Amazon EKS, lue directement. Tarifs : page de prix d'Amazon EKS, lue directement.
- Calendrier Node.js : fichier `schedule.json` et README du dépôt `nodejs/Release`, lus directement.

Il s'agit de faits purement documentaires, directement vérifiables : conformément aux consignes du flux, les sources primaires lues directement suffisent.

## Incertain

- Le calendrier Node.js porte la mention « *Dates are subject to change* » : les bascules du 20 et du 28 octobre sont des dates prévues, confirmées seulement le jour où la version correspondante est publiée. Les dates de fin de vie, elles, n'ont pas bougé sur les lignes précédentes.
- Le nom de code LTS de Node.js 26 n'est pas encore renseigné dans le calendrier.
- AWS indique ne donner aucun préavis ni créneau précis pour les mises à niveau automatiques en fin de support étendu.

## Qui parle, et avec quel intérêt

AWS est la source primaire de son calendrier et de ses prix ; le support étendu est une prestation payante, activée par défaut, qu'AWS a intérêt à voir utilisée. Les projets Kubernetes et Node.js publient leur propre calendrier, sans intérêt commercial direct.

## Décomposition des affirmations

- Kubernetes 1.34 atteint sa fin de vie le 27 octobre 2026 — 10/10 (kubernetes.io)
- EKS 1.34 sort du support standard le 2 décembre 2026 ; EKS 1.31 sort du support étendu le 26 novembre 2026 — 10/10 (documentation AWS)
- Support étendu EKS activé par défaut, à 0,60 $ au lieu de 0,10 $ par cluster et par heure — 10/10 (documentation et page de prix AWS)
- Node.js 22 atteint sa fin de vie le 30 avril 2027 — 9/10 (calendrier officiel)
- Node.js 24 passe en maintenance le 20 octobre 2026, Node.js 26 en Active LTS le 28 octobre 2026 — 8/10 (calendrier officiel, dates prévues « susceptibles de changer »)

## Pourquoi 9/10 ?

Toutes les dates viennent des calendriers officiels lus directement, recoupés pour Kubernetes par une source indépendante. Un point retiré parce que les bascules Node.js d'octobre sont des dates prévues, non encore réalisées.

## Ce que ça change pour Exostic

**À faire — avant le 27 octobre 2026 pour un cluster Kubernetes 1.34 autogéré, avant le 2 décembre 2026 sur Amazon EKS.** *Analyse.* Sont concernés les projets Kubernetes encore en 1.34 ou antérieur : sur EKS, ne rien faire ne casse rien mais multiplie par six le coût du plan de contrôle à partir du 2 décembre, et un cluster resté en 1.31 sera mis à niveau d'office après le 26 novembre, sans préavis — mieux vaut choisir la date soi-même, après avoir vérifié les API dépréciées et la compatibilité des modules complémentaires. Côté Node.js, rien ne presse pour un projet en version 24 : le passage en maintenance ne supprime pas les correctifs de sécurité, et la fin de vie n'est qu'en avril 2028. La vraie date à planifier est le **30 avril 2027** pour tout projet encore en Node.js 22 ; un nouveau projet qui démarre après le 28 octobre a intérêt à viser directement Node.js 26. Sur-réaction : migrer dans l'urgence de 24 vers 26 le jour de la bascule LTS, avant que les dépendances natives et les images de base aient suivi.

## Sources

- **Source primaire (lue directement)** — [Kubernetes, « Releases »](https://kubernetes.io/releases/)
- **Source primaire (lue directement)** — [Kubernetes, « Patch Releases »](https://kubernetes.io/releases/patch-releases/)
- **Source primaire (lue directement)** — [Amazon EKS, « Understand the Kubernetes version lifecycle on EKS »](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)
- **Source primaire, partie intéressée sur ses prix (lue directement)** — [Amazon EKS, tarifs](https://aws.amazon.com/eks/pricing/)
- **Source primaire (lue directement)** — [Node.js Release Working Group, calendrier des versions](https://github.com/nodejs/Release)
- **Source primaire (lue directement)** — [Node.js Release Working Group, `schedule.json`](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json)
- **Indépendante** — [endoflife.date, Kubernetes](https://endoflife.date/kubernetes)
