---
title: "🛠️ Stack — AWS retire App Mesh le 30 septembre 2026 et Pinpoint le 30 octobre ; Lambda bloquera la création de fonctions Node.js 20 le 1er février 2027"
date: 2026-09-22T01:32:00+02:00
type: alert
feed: exostic
category: stack
confidence: 10
summary: "AWS App Mesh cesse de fonctionner le 30 septembre 2026 (console et ressources inaccessibles), Amazon Pinpoint le 30 octobre ; AWS Lambda refusera de créer des fonctions nodejs20.x et nodejs18.x à partir du 1er février 2027 et de les mettre à jour à partir du 3 mars 2027. À faire avant le 30 septembre pour tout maillage de services encore sur App Mesh (ECS ou EKS) ; rien à faire pour les autres."
---

# 🛠️ Stack — AWS retire App Mesh le 30 septembre 2026 et Pinpoint le 30 octobre ; Lambda bloquera la création de fonctions Node.js 20 le 1er février 2027

**Date de publication :** 22 septembre 2026, 01 h 32 (heure de Paris)
**Nature : stack technique**
**Note de vérité : 10/10 🟢**
**Pour Exostic : à faire avant le 30 septembre 2026** (uniquement pour un déploiement encore sur App Mesh) ; à surveiller sinon

Rappel d'échéance, pas une nouvelle : ces dates ont été annoncées par AWS en
2024 et 2025. Elles n'étaient pas encore dans les échéances suivies de ce flux,
amorcé le 20 septembre, et la première tombe dans huit jours.

**AWS App Mesh** — le maillage de services géré d'AWS, utilisable avec Amazon
ECS, Amazon EKS et EC2 via des sidecars Envoy — est **retiré le 30 septembre
2026**. D'après le guide utilisateur AWS, après cette date il n'est plus
possible d'accéder ni à la console App Mesh ni aux ressources App Mesh
(maillages, nœuds virtuels, routeurs, routes). Les nouveaux clients ne peuvent
plus s'inscrire au service depuis le 24 septembre 2024, date de l'annonce.
Jusqu'au 30 septembre 2026, les clients existants peuvent continuer à créer
des ressources et AWS s'engage à fournir « les mises à jour critiques de
sécurité et de disponibilité ». Les chemins de migration recommandés par AWS
sont **Amazon ECS Service Connect** pour les charges ECS et **Amazon VPC
Lattice** (avec le contrôleur Gateway API) pour EKS.

**Amazon Pinpoint** — segments, campagnes, parcours (« journeys ») et
analytique d'engagement — est retiré le **30 octobre 2026** : plus d'accès à
la console ni aux ressources Pinpoint (points de terminaison, segments,
campagnes, parcours, analytique). Les API de SMS, voix, notifications push,
OTP et validation de numéros ne sont pas concernées : elles relèvent d'AWS End
User Messaging et restent prises en charge. AWS oriente vers Amazon Connect
(campagnes sortantes, profils clients), Amazon SES (courriel) et Amazon
Kinesis (événements).

**AWS Lambda** — le tableau des runtimes dépréciés indique pour `nodejs20.x`
(déprécié depuis le 30 avril 2026) et `nodejs18.x` (déprécié depuis le
1er septembre 2025) les mêmes dates : **blocage de la création de fonctions le
1er février 2027**, **blocage de la mise à jour le 3 mars 2027**. Les fonctions
existantes continuent de s'exécuter « indéfiniment », mais sans correctifs de
sécurité garantis ni support technique. Pour `nodejs22.x`, la dépréciation est
fixée au 30 avril 2027 (blocage de la création le 1er juin 2027, de la mise à
jour le 1er juillet 2027) ; `nodejs24.x` au 30 avril 2028 ; `nodejs26.x` sans
date.

## Confirmé

- Retrait d'App Mesh le 30 septembre 2026, inaccessibilité de la console et des
  ressources après cette date, fermeture aux nouveaux clients depuis le
  24 septembre 2024 : guide utilisateur AWS App Mesh, page AWS « Services in
  Sunset », billet du blog AWS Containers du 24 septembre 2024, tous lus
  directement.
- Chemins de migration recommandés (ECS Service Connect ; VPC Lattice pour
  EKS) : billets du blog AWS Containers des 24 septembre et 1er octobre 2024.
- Retrait de Pinpoint le 30 octobre 2026, fermeture aux nouveaux clients
  depuis le 20 mai 2025, périmètre exclu (SMS, voix, push, OTP) : guide de
  migration Amazon Pinpoint, lu directement.
- Dates de dépréciation et de blocage des runtimes Lambda : page « Lambda
  runtimes » de la documentation AWS, lue directement.

Fait purement documentaire, vérifié à la source primaire : la source primaire
suffit (§ 9 des consignes). Un guide de migration tiers (dev.to)
reprend les mêmes dates ; il ne constitue pas une confirmation indépendante au
sens des consignes et n'est cité qu'à titre d'illustration.

## Incertain

- Le comportement exact du trafic à la date de retrait n'est pas décrit dans
  ce qui a été lu : AWS dit que les ressources deviennent inaccessibles, pas ce
  qu'il advient des sidecars Envoy déjà déployés et de leur configuration en
  mémoire. Prudence : considérer que le maillage cesse de fonctionner.
- Les mérites comparés de Service Connect et de VPC Lattice, et l'affirmation
  d'AWS selon laquelle la migration « supprime l'administration des sidecars »,
  sont des déclarations de l'éditeur.
- Les dates de blocage Lambda sont celles affichées ce jour et AWS peut les
  modifier : le tableau lui-même montre pour `nodejs18.x` un écart de dix-sept
  mois entre dépréciation et blocage, bien plus long que d'ordinaire, signe que
  ces dates ont déjà bougé.

## Qui parle, et avec quel intérêt

AWS est la source primaire des dates de retrait de ses propres services, ce
qui vaut 10/10 pour ces dates. AWS a aussi intérêt à orienter la migration vers
ses services de remplacement (Service Connect, VPC Lattice, Connect, SES) plutôt
que vers des solutions ouvertes comme Istio, Linkerd ou Cilium, qu'aucun des
documents lus ne mentionne : le choix du remplaçant n'est pas dicté par les
sources.

## Décomposition des affirmations

- App Mesh inaccessible après le 30 septembre 2026 — 10/10 (documentation AWS)
- Pinpoint inaccessible après le 30 octobre 2026, hors API SMS/voix/push/OTP — 10/10 (documentation AWS)
- Lambda : blocage création `nodejs20.x` et `nodejs18.x` le 1er février 2027, mise à jour le 3 mars 2027 — 10/10 (documentation AWS, dates modifiables par AWS)
- Les fonctions Lambda sur runtime déprécié continuent de s'exécuter — 8/10 (déclaration d'AWS dans sa documentation, sans garantie contractuelle)
- Service Connect ou VPC Lattice sont les remplaçants « naturels » — 5/10 (recommandation de l'éditeur, partie intéressée)

## Pourquoi 10/10 ?

Dates lues directement dans la documentation de l'éditeur, qui est la source
primaire de ses propres retraits de service ; aucun élément contradictoire.

## Ce que ça change pour Exostic

**À faire — avant le 30 septembre 2026**, pour tout projet ECS ou EKS dont le
maillage de services repose encore sur App Mesh (présence du contrôleur
`appmesh-controller`, d'annotations ou de ressources `VirtualNode`,
`VirtualService`, `VirtualRouter`, ou de sidecars Envoy injectés par App
Mesh) : la migration ne peut plus être planifiée, elle doit être terminée ou
un contournement décidé en connaissance de cause (retour à une découverte de
services sans maillage, Service Connect, VPC Lattice ou un maillage ouvert).
Vérification à faire sur chaque compte AWS : `aws appmesh list-meshes` ne doit
rien renvoyer. Un projet qui n'a jamais utilisé App Mesh — le cas le plus
courant, le service étant fermé aux nouveaux clients depuis deux ans — n'a
rien à faire.

**À faire — avant le 30 octobre 2026** pour un projet e-commerce ou réseau
social dont les campagnes, segments ou parcours d'engagement passent par
Pinpoint ; rien à faire pour un projet qui n'emploie que les API SMS, push ou
OTP, qui restent servies par End User Messaging.

**À surveiller — 1er février 2027** pour les fonctions Lambda encore en
`nodejs20.x` ou `nodejs18.x` : les faire passer en `nodejs22.x` ou
`nodejs24.x` (la LTS courante) à la prochaine intervention ; sur-réaction :
migrer en urgence, les fonctions continuant de s'exécuter. Ces dates rejoignent
les échéances suivies, aux côtés du calendrier Node.js publié le
[20 septembre](2026-09-20-11-00-kubernetes-1-34-fin-de-vie-node-26-lts.md).

## Sources

- **Source primaire** — [AWS App Mesh User Guide, « What is AWS App Mesh? » (avis de fin de support en tête de page)](https://docs.aws.amazon.com/app-mesh/latest/userguide/what-is-app-mesh.html)
- **Source primaire** — [AWS General Reference, « Services in Sunset »](https://docs.aws.amazon.com/general/latest/gr/sunset_services.html)
- **Source primaire** — [AWS Containers Blog, « Migrating from AWS App Mesh to Amazon ECS Service Connect », 24 septembre 2024](https://aws.amazon.com/blogs/containers/migrating-from-aws-app-mesh-to-amazon-ecs-service-connect/)
- **Source primaire** — [AWS Containers Blog, « Migrating from AWS App Mesh to Amazon VPC Lattice », 1er octobre 2024](https://aws.amazon.com/blogs/containers/migrating-from-aws-app-mesh-to-amazon-vpc-lattice/)
- **Source primaire** — [Amazon Pinpoint User Guide, « Migrating from Amazon Pinpoint »](https://docs.aws.amazon.com/pinpoint/latest/userguide/migrate.html)
- **Source primaire** — [AWS Lambda Developer Guide, « Lambda runtimes » (tableaux des runtimes supportés et dépréciés)](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
- **Secondaire, illustration** — [dev.to, « AWS App Mesh Deprecated: Migration Guide Before September 2026 Shutdown »](https://dev.to/kseniyaseliverstava/aws-app-mesh-deprecated-escaping-app-mesh-before-september-2026-1l7m)
