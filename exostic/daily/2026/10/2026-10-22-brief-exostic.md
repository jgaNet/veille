---
title: "Brief Exostic — 22 octobre 2026"
date: 2026-10-22T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "TypeScript 7.1 passe en bêta : plus rapide que la 7.0, mais avec un changement cassant sur les types conditionnels distributifs — à tester avant la RC. Côté budget, le calendrier annoncé fin septembre continue de tenir pour l'instant."
---

# Brief Exostic — 22 octobre 2026

## 🛠️ Stack

### TypeScript 7.1 : version bêta publiée, changement cassant sur les types conditionnels distributifs — note de vérité 9/10 🟢

L'équipe TypeScript a publié, le 20 octobre 2026, la version bêta de TypeScript 7.1 (confirmée indépendamment par le registre npm, qui porte le tag `beta` sur `7.1.0-beta`). Cette version apporte notamment des attributs d'importation dans les déclarations de modules ambiants (`with { type: "css" | "text" | "bytes" }`), le support des imports « source phase » (utile pour les modules WebAssembly), la cible et la bibliothèque `es2026` stabilisées, une nouvelle organisation de l'API en points d'entrée (`typescript/sync`, `typescript/async`, `typescript/fs`…), et des gains de performance mesurés par l'éditeur sur un projet de référence (compilation 1,2 à 1,9 fois plus rapide, mémoire réduite de 16 à 50 %). Aucune date précise n'est donnée pour la suite : une Release Candidate est annoncée « dans environ un mois », suivie d'une version stable « peu après ».

**Confirmé.** Billet officiel du blog TypeScript (devblogs.microsoft.com), daté du 20 octobre 2026, lu directement. Tag `beta` du paquet `typescript` sur le registre npm, cohérent avec l'annonce, consulté le jour même.

**Incertain.** Les gains de performance annoncés proviennent exclusivement de bancs d'essai internes de l'éditeur (un seul projet cité, « mui-docs »), sans mesure indépendante à ce stade — la note resterait plafonnée à 5/10 pour cette seule affirmation si elle était isolée. Aucune date ferme pour la RC ou la version stable.

**Décomposition des affirmations.**
- La bêta de TypeScript 7.1 est publiée le 20 octobre 2026 — 9/10 (billet officiel + tag npm).
- TypeScript 7.1 est « plus rapide et plus léger » que 7.0 — 5/10 (mesures de l'éditeur seul, non reproduites).
- Un changement cassant existe sur la vérification des paramètres de type distributifs dans les types conditionnels, et sur certains types DOM de `lib.d.ts` — 9/10 (décrit explicitement comme tel dans le billet officiel).

**Ce que ça change pour Exostic : à surveiller.** Qui utilise TypeScript 7.0 et prévoit de migrer vers 7.1 à sa sortie devrait tester la bêta sur ses projets utilisant des types conditionnels distributifs avancés, où une contrainte de type plus stricte peut désormais provoquer une erreur de compatibilité qui n'existait pas en 7.0. Rien ne presse avant la sortie d'une Release Candidate, dans un mois environ selon l'éditeur ; une sur-réaction consisterait à modifier du code de production dès maintenant sur la seule foi d'une bêta.

**Sources :**
- **Source primaire** — [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/) (devblogs.microsoft.com, 20 octobre 2026)
- **Indépendante** — registre npm, tag `beta` du paquet `typescript` (consulté le 22 octobre 2026)

## 📅 Échéances à venir

- **27 octobre 2026** — Kubernetes 1.34 : fin de vie côté projet amont (EKS 1.34 : fin du support standard le 2 décembre 2026).
- **27 octobre 2026** — PLF 2027 : reprise annoncée des débats sur la partie recettes après le report du 20 octobre ; aucune date de reprise confirmée par un document officiel de l'Assemblée nationale à ce jour.
- **27 octobre 2026** — PLFSS 2027 : vote solennel en première lecture (délai constitutionnel de 20 jours) ; l'examen en séance publique se poursuivait encore le 22 octobre (amendements adoptés les 21 et 22 octobre), sans remise en cause de la date annoncée.
- **28 octobre 2026** — Node.js 26 devient Active LTS (calendrier susceptible de changer).
- **30 octobre 2026** — Amazon Pinpoint : retrait du service (API SMS/voix/push/OTP conservées via AWS End User Messaging).
- **2 novembre 2026** — GitHub Actions : application automatique du blocage par défaut de `pull_request_target` sur les dépôts publics.
- **17 novembre 2026** — PLF 2027 : vote solennel sur l'ensemble du texte en première lecture (délai constitutionnel de 40 jours).
- **19 novembre 2026** — GitHub Actions : fin de la fenêtre de migration du label `ubuntu-latest` vers Ubuntu 26.04.

## 🧭 Ce qu'il faut retenir

TypeScript continue d'avancer son cycle de versions à un rythme soutenu depuis la 7.0 (juillet), avec une bêta 7.1 qui met l'accent sur la performance du compilateur plutôt que sur de nouvelles fonctionnalités de langage majeures — un changement cassant ciblé mérite d'être testé tôt plutôt qu'au moment de la sortie stable. Côté budget, le calendrier annoncé le 29 septembre continue pour l'instant de tenir dans les grandes lignes (PLFSS toujours en débat en vue d'un vote solennel le 27 octobre), tandis que la partie recettes du PLF reste sans date de reprise officiellement confirmée depuis son report du 20 octobre.
