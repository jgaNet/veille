---
title: "Brief Exostic — 8 novembre 2026"
date: 2026-11-08T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "GitHub Actions reporte d'un mois (au 2 décembre) le blocage par défaut de pull_request_target et teste deux fenêtres de blocage les 9 et 16 novembre ; côté budget, la première partie du PLF 2027 a été rejetée le 4 novembre et repart du texte initial au Sénat, qui examine aussi le PLFSS 2027 du 9 au 18 novembre ; le projet de loi transposant NIS 2 revient en séance à l'Assemblée le 9 novembre."
---

# Brief Exostic — 8 novembre 2026

**Date de publication :** 8 novembre 2026, 20 h 15 (heure de Paris)

Onze jours sans récapitulatif depuis le brief du 28 octobre : la période a été calme sur les failles touchant directement la stack (aucun nouveau CVE Node.js ou Kubernetes depuis les releases du 21 octobre), mais cinq informations structurantes se sont accumulées sur le calendrier d'une politique de sécurité GitHub Actions et sur trois textes suivis au Parlement — budget 2027 et transposition de NIS 2.

## 🔐 Sécurité

### GitHub Actions : le blocage par défaut de `pull_request_target` est reporté d'un mois, au 2 décembre, avec deux fenêtres de test les 9 et 16 novembre — 9/10 🟢

Selon le changelog officiel de GitHub, l'application de la règle par défaut bloquant l'événement `pull_request_target` sur les dépôts publics sans politique d'événements explicite — initialement annoncée pour le 2 novembre 2026 — est reportée au 2 décembre 2026. Deux fenêtres de test (« brownouts ») sont intercalées, les 9 et 16 novembre, chacune de 16 h à 18 h UTC : pendant ces deux heures, les workflows qui utiliseraient `pull_request_target` dans un dépôt public concerné échoueraient avec une erreur, pour laisser le temps d'identifier les workflows affectés avant le blocage permanent. En dehors de ces fenêtres, la règle reste en mode évaluation (avertissements sans blocage) jusqu'au 2 décembre. Seuls les dépôts publics sont concernés (GitHub Free, Team, Enterprise Cloud) ; les dépôts privés, internes, et GitHub Enterprise Server ne le sont pas. Le motif technique rappelé par GitHub : `pull_request_target` s'exécute dans le contexte du dépôt de base et peut accéder à ses secrets — un code non fiable exécuté depuis un fork peut alors compromettre le pipeline ou voler ces secrets (risque dit « pwn request »).

**Confirmé :** le report au 2 décembre et les deux fenêtres de test des 9 et 16 novembre, lus directement sur le changelog officiel de GitHub (fait documentaire directement vérifiable, source primaire).

**Incertain :** le changelog ne donne pas la raison du report ; il ne précise que la finalité des fenêtres de test (« identifier les workflows affectés avant que l'application ne devienne permanente »).

**Ce que ça change pour Exostic.** **À faire — avant le 9 novembre si possible, sinon avant le 2 décembre.** Tout projet avec des workflows GitHub Actions sur un dépôt public utilisant `pull_request_target` est concerné. Avant la première fenêtre de test (9 novembre, 16 h-18 h UTC), vérifier dans l'onglet Insights du dépôt quels workflows seraient bloqués, puis soit accepter le blocage par défaut (cas général, recommandé), soit définir explicitement une politique d'événements autorisant `pull_request_target` pour les seuls workflows qui en ont réellement besoin, en ciblant le fichier de workflow précis. Le report d'un mois donne une marge supplémentaire mais ne change pas l'action à mener ni son urgence réelle : un workflow mal configuré reste une porte d'entrée vers les secrets du dépôt.

**Sources :** **Primaire** — [`pull_request_target` blocked by default: December 2](https://github.blog/changelog/2026-11-02-pull_request_target-blocked-by-default-december-2) (github.blog) ; **primaire** — [About Actions policies](https://docs.github.com/en/actions/concepts/about-actions-policies) (docs.github.com).

### Node.js : prochaine publication de sécurité annoncée pour le 11 novembre, gravité maximale « élevée », détails non encore publiés — 7/10 🟢

Le 3 novembre 2026, l'équipe sécurité de Node.js a publié une pré-alerte (reprise sur la liste de diffusion oss-security le 4 novembre) annonçant une publication de sécurité sur les lignes 22.x, 24.x et 26.x « le 11 novembre 2026, ou peu après ». La gravité maximale annoncée pour cette fournée est « élevée » (« high »), sans identifiant CVE ni liste de versions corrigées à ce stade — ces éléments ne sont publiés qu'au moment de la publication effective, pratique habituelle de divulgation responsable chez Node.js. Aucune publication de sécurité n'est intervenue depuis celle du 21 octobre (12 failles corrigées dont CVE-2026-111497, déjà signalée dans le brief du 24 octobre).

**Confirmé :** la date annoncée (11 novembre ou peu après) et la gravité maximale « élevée », lues sur la page officielle `nodejs.org/en/blog/vulnerability/november-2026-security-releases` et sur la pré-alerte de l'équipe sécurité relayée sur oss-security (sources primaires).

**Incertain :** aucun CVE ni version corrigée n'est encore publié ; la pratique habituelle de Node.js est de ne les communiquer qu'au jour de la publication.

**Ce que ça change pour Exostic.** **À surveiller — publication attendue le 11 novembre.** Rien à corriger aujourd'hui, faute de détail technique. Revenir sur le sujet une fois la publication effective pour vérifier si elle concerne les versions 22.x/24.x/26.x réellement déployées et planifier la mise à jour si la gravité se confirme.

**Sources :** **Primaire** — [November 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) (nodejs.org) ; **primaire** — [Node.js security release pre-alert](https://openwall.com/lists/oss-security/2026/11/04/3) (liste oss-security, relais de l'annonce officielle de l'équipe sécurité Node.js, signée Antoine du Hamel).

## 💼 Marché du conseil

### Budget 2027 : la première partie du PLF est rejetée le 4 novembre à l'Assemblée, le texte repart au Sénat sur la version initiale du gouvernement — 8/10 🟢

Selon la page officielle de l'Assemblée nationale, celle-ci n'a pas adopté la première partie (recettes) du projet de loi de finances pour 2027 le mercredi 4 novembre 2026 ; en application du troisième alinéa de l'article 119 du Règlement de l'Assemblée, le texte est de ce fait considéré comme rejeté en première lecture — ce qui clôt l'examen à l'Assemblée sans attendre le vote sur l'ensemble du texte qui restait programmé au 17 novembre. Le vote solennel sur la seule première partie, qui avait été plusieurs fois reporté depuis le 20 octobre et était redonné pour le 3 novembre, n'a donc finalement pas eu lieu sous cette forme. Le texte est transmis au Sénat, qui l'examine désormais en commission des finances : d'après le programme de travail de cette commission (daté du 30 octobre), l'examen des articles de la première partie a débuté le 12 novembre et l'examen définitif de la seconde partie en commission est annoncé pour le 19 novembre, sans date de séance publique encore fixée à ce stade. Une source de presse spécialisée (Fiscal Online, non confirmée officiellement) indique que le Sénat se prononcera sur le texte initial du gouvernement, les amendements adoptés à l'Assemblée depuis la mi-octobre tombant avec le rejet.

**Confirmé :** le rejet de la première partie le 4 novembre et son fondement réglementaire (article 119, alinéa 3), lus directement sur la page officielle de l'Assemblée nationale consacrée à l'examen du texte (source primaire) ; le calendrier de la commission des finances du Sénat (12 et 19 novembre), lu sur son programme de travail officiel, document qui se qualifie lui-même d'« indicatif ».

**Incertain :** le fait que le Sénat reparte du texte initial du gouvernement (plutôt que du texte amendé) ne repose que sur une source de presse spécialisée non confirmée par une page officielle de l'Assemblée ou du Sénat ; aucune date de séance publique au Sénat n'est encore connue.

**Qui parle, et avec quel intérêt.** Information institutionnelle et procédurale sur le déroulement du débat budgétaire ; neutralité politique conservée, aucune appréciation sur le contenu fiscal du texte.

**Ce que ça change pour Exostic.** **Rien à faire.** Aucune mesure fiscale ou sociale concernant une SAS de conseil ou son dirigeant n'est adoptée à ce stade ; le texte reste en discussion. À reprendre lorsqu'une première partie sera effectivement votée, que ce soit à l'Assemblée ou au Sénat.

**Sources :** **Primaire** — [Rejet, en première lecture, du projet de loi de finances pour 2027](https://www.assemblee-nationale.fr/dyn/actualites-accueil-hub/examen-du-projet-de-loi-de-finances-pour-2027) (assemblee-nationale.fr) ; **primaire** — [Programme de travail de la commission des finances](https://www.senat.fr/fileadmin/cru-1792598966/Commissions/Finances/programme_de_travail.pdf) (senat.fr, 30 octobre 2026) ; **indépendante, non officielle** — [PLF 2027 : suite au rejet de la partie recettes par les députés, le texte repart de zéro au Sénat](https://fiscalonline.com/outils-fiscaux/plf-2027-suite-rejet-partie-recettes-deputes-texte-repart-zero-senat) (Fiscal Online, pour le seul point du retour au texte initial).

### PLFSS 2027 : le calendrier sénatorial est confirmé officiellement, du 9 au 18 novembre — 8/10 🟢

Après le rejet de la partie « recettes » du PLFSS par l'Assemblée nationale le 23 octobre (déjà signalé), le programme de travail de la commission des finances du Sénat confirme, sous réserve de la transmission du texte, un début d'examen le lundi 9 novembre à 15 h et des explications de vote puis un scrutin public solennel annoncés pour le mercredi 18 novembre à 16 h 30. C'est la première confirmation par un document officiel du Sénat de ce calendrier, jusqu'ici connu seulement par deux sources de presse concordantes (LCP, Le Club des Juristes).

**Confirmé :** les dates du 9 et du 18 novembre, lues sur le programme de travail officiel de la commission des finances du Sénat — document qui se présente lui-même comme indicatif, seule la convocation hebdomadaire faisant foi.

**Incertain :** le document reste « sous réserve de [la] transmission » du texte ; comme pour tout calendrier parlementaire, ces dates peuvent encore glisser.

**Qui parle, et avec quel intérêt.** Information institutionnelle et procédurale ; neutralité politique conservée.

**Ce que ça change pour Exostic.** **Rien à faire.** Aucune mesure sociale n'est votée à ce stade ; les cotisations et contributions applicables à une SAS de conseil et à son dirigeant restent celles en vigueur. À reprendre au moment du scrutin solennel du 18 novembre.

**Sources :** **Primaire** — [Programme de travail de la commission des finances](https://www.senat.fr/fileadmin/cru-1792598966/Commissions/Finances/programme_de_travail.pdf) (senat.fr, 30 octobre 2026) ; **indépendante** — [La matinale du 6 novembre 2026](https://www.legifiscal.fr/la-matinale/2026-11-06.html) (Legifiscal, article en partie réservé aux abonnés, confirme le même calendrier).

### NIS 2 : le projet de loi « résilience » revient en séance publique à l'Assemblée le 9 novembre, un mois après son retrait — 8/10 🟢

Le dossier législatif officiel de l'Assemblée nationale confirme une discussion en séance publique à partir du lundi 9 novembre 2026, sur le texte de la commission spéciale, un mois après le retrait de l'ordre du jour décidé par la conférence des présidents le 6 octobre (déjà signalé, calendrier parlementaire chargé invoqué à l'époque). Selon la presse spécialisée, les débats sont annoncés jusqu'au vendredi 13 novembre (hors 11 novembre, jour férié), avec près de 400 amendements à examiner sur le texte de la commission ; des amendements adoptés en séance pourraient encore modifier ce texte avant une éventuelle commission mixte paritaire avec le Sénat, qui avait adopté sa propre version en mars 2025.

**Confirmé :** la date du 9 novembre pour la reprise en séance publique, lue directement sur le dossier législatif officiel de l'Assemblée nationale (source primaire).

**Incertain :** la date de fin des débats (13 novembre) et le nombre d'amendements restent des informations de presse spécialisée, non lues directement sur une page officielle listant le calendrier complet de la semaine ; ce texte a déjà été reporté deux fois depuis l'été, ce qui invite à la prudence sur le respect du calendrier annoncé.

**Qui parle, et avec quel intérêt.** Information institutionnelle ; neutralité politique conservée, aucune appréciation sur le contenu du texte.

**Ce que ça change pour Exostic.** **À surveiller.** Le texte transpose la directive NIS 2 et crée des obligations de cybersécurité (et donc de la demande pour des prestations de mise en conformité) pour les entités qu'il désignera comme essentielles ou importantes — périmètre encore incertain tant que le texte n'est pas adopté. Rien à faire avant une adoption effective ; à reprendre si un vote a lieu avant le 13 novembre ou si le texte est de nouveau reporté.

**Sources :** **Primaire** — [Dossier législatif — projet de loi résilience](https://www.assemblee-nationale.fr/dyn/17/dossiers/DLR5L17N50731) (assemblee-nationale.fr) ; **indépendante** — [NIS 2 : le projet de loi Résilience revient à l'Assemblée nationale le 9 novembre](https://www.leto.legal/news/nis-2-projet-loi-resilience-assemblee-nationale-9-novembre-2026) (Leto Legal, citant Silicon.fr).

## ✅ À faire

- **Avant le 9 novembre 2026 (première fenêtre de test), au plus tard avant le 2 décembre 2026 :** sur tout dépôt public utilisant `pull_request_target`, vérifier via Insights les workflows qui seraient bloqués et décider d'accepter le blocage par défaut ou de poser une politique d'événements explicite ciblée. Voir la rubrique Sécurité ci-dessus.

## 📅 Échéances à venir

- 2026-11-09 — PLFSS 2027 : début de l'examen par le Sénat, jusqu'au 18 novembre ; scrutin public solennel annoncé le 18 novembre.
- 2026-11-09 — Projet de loi « résilience » (NIS 2) : reprise de la discussion en séance publique à l'Assemblée nationale, jusqu'au 13 novembre selon la presse spécialisée.
- 2026-11-09 et 2026-11-16 — GitHub Actions : fenêtres de test du blocage par défaut de `pull_request_target`, 16 h-18 h UTC.
- 2026-11-11 (ou peu après) — Node.js : prochaine publication de sécurité sur les lignes 22.x/24.x/26.x, gravité maximale « élevée » annoncée.
- 2026-11-12 — PLF 2027 : au Sénat, début de l'examen de la première partie en commission des finances.
- 2026-11-19 — GitHub Actions : fin de la fenêtre de migration du label `ubuntu-latest` vers Ubuntu 26.04.
- 2026-11-26 — Amazon EKS 1.31 : fin du support étendu, mise à niveau automatique du plan de contrôle.
- 2026-12-02 — GitHub Actions : application du blocage par défaut de `pull_request_target` (date reportée depuis le 2 novembre).
- 2026-12-02 — Amazon EKS 1.34 : fin du support standard, bascule en support étendu facturé.

## 🧭 Ce qu'il faut retenir

Le report d'un mois de la politique GitHub Actions sur `pull_request_target`, assorti de deux fenêtres de test grandeur réelle les 9 et 16 novembre, est la façon la plus concrète qu'ait trouvée GitHub de laisser le temps aux mainteneurs de corriger leurs workflows sans attendre un blocage surprise — une bonne pratique à noter pour d'autres transitions de ce type. Côté budget, le PLF 2027 vient de connaître à l'Assemblée le même sort que le PLFSS un peu plus tôt : rejet de la partie recettes, sans qu'aucune mesure fiscale ou sociale ne soit à ce stade entrée en vigueur ni même votée — la prudence reste donc la même qu'au brief précédent, malgré l'agitation parlementaire. Le retour de la transposition de NIS 2 en séance, après deux reports, mérite d'être suivi sans anticiper son issue : ce texte a déjà déçu plusieurs échéances annoncées.
