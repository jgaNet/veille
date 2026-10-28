---
title: "Brief Exostic — 28 octobre 2026"
date: 2026-10-28T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Node.js 24 passe en maintenance LTS et Node.js 26 devient la version Active LTS ; le débat budgétaire 2027 a repris à l'Assemblée nationale, avec un vote solennel sur la première partie désormais fixé au 3 novembre."
---

# Brief Exostic — 28 octobre 2026

**Date de publication :** 28 octobre 2026, 20 h 15 (heure de Paris)

Journée calme sur la sécurité de la stack (aucune nouvelle CVE Node.js, Kubernetes ou npm depuis le brief du 24 octobre) ; deux informations structurelles justifient malgré tout ce récapitulatif : un changement de version dans l'écosystème Node.js et une mise à jour du calendrier budgétaire 2027.

## 🛠️ Stack

### Node.js : la version 24 passe en maintenance LTS, la version 26 devient Active LTS — 10/10 🟢

Selon le calendrier officiel du dépôt `nodejs/Release`, Node.js 24 (« Krypton ») a quitté le statut d'Active LTS pour entrer en maintenance le 20 octobre 2026 : seuls les correctifs de sécurité et les bugs critiques y seront désormais apportés, jusqu'à sa fin de vie prévue le 30 avril 2028. Node.js 26, sorti le 5 mai 2026, devient à son tour Active LTS ce 28 octobre et le restera jusqu'en octobre 2027 (fin de vie prévue le 30 avril 2029). Node.js 22 (« Jod ») reste en maintenance LTS jusqu'au 30 avril 2027. Aucune nouvelle release de sécurité n'a été publiée depuis celle du 21 octobre (déjà signalée dans le brief du 24 octobre) ; aucun nouveau CVE Kubernetes n'est apparu depuis le 14 septembre.

**Confirmé :** les dates de transition, lues directement dans `schedule.json` du dépôt officiel `nodejs/Release` (source primaire, fait documentaire directement vérifiable).

**Incertain :** le calendrier reste « susceptible de changer » selon la page officielle, comme pour toute date de ce calendrier ; en pratique, les changements de dernière minute sont rares et annoncés au moins 14 jours à l'avance.

**Ce que ça change pour Exostic.** **À surveiller.** Pour un projet encore en Node.js 24, rien ne casse aujourd'hui, mais les correctifs non critiques (hors sécurité) s'arrêtent : c'est le moment de planifier une migration vers la 26 plutôt que de la découvrir à l'occasion d'un incident. Pour un nouveau projet démarré maintenant, Node.js 26 est le choix par défaut le plus couvert dans le temps (support jusqu'en 2029). Un projet encore sur Node.js 22 reste en maintenance jusqu'au 30 avril 2027 — fin de vie à anticiper, déjà suivie dans nos échéances.

**Sources :** **Primaire** — [nodejs/Release — schedule.json](https://github.com/nodejs/Release) (github.com) ; **primaire** — [Node.js Releases](https://nodejs.org/en/about/previous-releases) (nodejs.org).

## 💼 Marché du conseil

### Budget 2027 : reprise confirmée du débat à l'Assemblée, vote solennel sur la première partie fixé au 3 novembre — 9/10 🟢

Le débat sur la première partie (recettes) du PLF 2027 a repris en séance publique à l'Assemblée nationale le 27 octobre 2026, après la suspension du 19 octobre au soir (environ 2 600 à 2 800 amendements restant alors à examiner) et le détour par l'examen — puis le rejet, le 23 octobre — de la partie recettes du PLFSS. La page officielle de l'Assemblée nationale consacrée à l'examen du PLF 2027 inscrit désormais le vote solennel sur la première partie au mardi 3 novembre, après-midi. Le vote solennel sur l'ensemble du texte reste, selon le document « Organisation de la discussion budgétaire » déjà signalé, prévu le 17 novembre — dans la limite des 40 jours constitutionnels pour la première lecture à l'Assemblée.

**Confirmé :** la reprise du débat le 27 octobre et la date du 3 novembre pour le vote solennel sur la première partie, lues sur la page officielle de l'Assemblée nationale consacrée à l'examen du texte.

**Incertain :** aucune date officielle n'est encore donnée pour l'ouverture de la seconde partie (dépenses) ni pour son déroulé ; le calendrier reste par nature modifiable par la conférence des présidents, comme il l'a déjà été le 20 octobre.

**Qui parle, et avec quel intérêt.** Information institutionnelle et procédurale (calendrier des débats), sans partie intéressée au sens du § 5 : neutralité politique conservée, aucune appréciation sur le contenu du texte.

**Ce que ça change pour Exostic.** **Rien à faire.** Aucune mesure fiscale ou sociale n'est adoptée à ce stade ; la première partie (recettes, dont les dispositions fiscales touchant une SAS de conseil et son dirigeant) n'est pas encore votée. À reprendre lorsque la première partie sera votée ou de nouveau reportée.

**Sources :** **Primaire** — [Examen du projet de loi de finances pour 2027](https://www.assemblee-nationale.fr/dyn/actualites-accueil-hub/examen-du-projet-de-loi-de-finances-pour-2027) (assemblee-nationale.fr) ; **primaire** — [Compte rendu, première séance du mardi 27 octobre 2026](https://www.assemblee-nationale.fr/dyn/17/comptes-rendus/seance/session-ordinaire-de-2026-2027/premiere-seance-du-mardi-27-octobre-2026) (assemblee-nationale.fr) ; **indépendante** — [Budget 2027 : calendrier à l'Assemblée](https://nosparlementaires.fr/actualites/budget-2027-calendrier-assemblee-cinq-semaines) (NosParlementaires, site citoyen indépendant s'appuyant sur l'ordre du jour officiel).

## 📅 Échéances à venir

- 2026-10-30 — Amazon Pinpoint : retrait du service (segments, campagnes, parcours, analytique).
- 2026-11-02 — GitHub Actions : application automatique du blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements.
- 2026-11-03 — PLF 2027 : vote solennel sur la première partie (recettes).
- 2026-11-09 — PLFSS 2027 : début de l'examen par le Sénat, dans la version initiale du gouvernement.
- 2026-11-17 — PLF 2027 : vote solennel sur l'ensemble du texte en première lecture.
- 2026-11-19 — GitHub Actions : fin de la fenêtre de migration du label `ubuntu-latest` vers Ubuntu 26.04.
- 2026-11-26 — Amazon EKS 1.31 : fin du support étendu, mise à niveau automatique du plan de contrôle.

## 🧭 Ce qu'il faut retenir

Le calendrier Node.js suit son cours sans surprise : la bascule 24 → maintenance / 26 → Active LTS était annoncée depuis des mois et ne change rien dans l'urgence, mais c'est le repère naturel pour planifier une migration plutôt que d'attendre une fin de vie. Côté budget, le texte n'a toujours pas franchi sa première étape de vote après plusieurs reports depuis le 20 octobre — une situation qui, à ce stade de la législature, ne permet aucune anticipation fiscale avant un vote effectif.
