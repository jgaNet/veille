---
title: "⚖️ Société — OpenAI : un cookie lié au compte ChatGPT accompagnerait les visites sur les sites des annonceurs, selon un chercheur indépendant"
date: 2026-09-21T11:35:00+02:00
type: alert
feed: ia
category: societe
confidence: 6
summary: "Vérifié sur les documents d'OpenAI : un pixel publicitaire est proposé aux annonceurs, et la politique de cookies mise à jour le 10 septembre liste un cookie `__obi` d'un an, classé « analytics ». Qu'il soit rattaché au compte ChatGPT et transmis depuis les sites tiers ne repose que sur les captures réseau d'un seul chercheur, non reproduites ; l'usage qu'OpenAI en fait côté serveur n'a été observé par personne, et OpenAI n'a pas répondu."
---

# ⚖️ Société — OpenAI : un cookie lié au compte ChatGPT accompagnerait les visites sur les sites des annonceurs, selon un chercheur indépendant

**Date de publication :** 21 septembre 2026, 11 h 35 (heure de Paris)
**Nature : fait de société (vie privée, publicité)**
**Note de vérité : 6/10 🟠** (sur le mécanisme de suivi décrit ; l'existence du pixel et du cookie est notée 9/10, l'usage côté serveur 4/10, voir la décomposition)

Un billet technique publié le 20 septembre par le site Buchodi's Threat Intel, signé Jamie Larson, décrit comment le dispositif publicitaire de ChatGPT permettrait à OpenAI de relier l'activité d'un utilisateur sur des sites marchands à son compte ChatGPT. Selon l'auteur, lorsqu'un utilisateur ouvre ChatGPT, le service génère un identifiant aléatoire et appelle un point d'accès interne (`/backend-api/bazaar/obi/sync-token`) qui renvoie un jeton signé (JWT) contenant à la fois cet identifiant et un champ `sub` désignant le compte (`subject_type: account_user`). L'identifiant est ensuite déposé comme cookie `__obi` sur le domaine `.openai.com`, valable un an, avec l'attribut `SameSite=None` — c'est-à-dire transmissible depuis d'autres sites. Quand l'utilisateur visite ensuite un site qui a installé le pixel de conversion d'OpenAI, le navigateur joint automatiquement ce cookie aux requêtes envoyées à `bzr.openai.com`.

L'auteur dit avoir observé un même identifiant `__obi` sur douze sites marchands (il cite notamment Chewy, Wayfair, ThriftBooks, Eventbrite, HelloFresh, Coursera et SeatGeek), et avoir recensé 936 pixels d'annonceurs sur 1 029 noms d'hôtes en plusieurs mois. Les événements transmis comprendraient l'URL réduite à son origine et son chemin, des données de localisation en clair et, lorsque le site les expose, l'e-mail, le téléphone et le nom hachés en SHA-256.

Le titre du billet — « ChatGPT sait désormais ce que vous faites sur d'autres sites » — va plus loin que ce que l'auteur démontre : il écrit lui-même ne pas avoir vu OpenAI rattacher ces événements au compte côté serveur. Ce passage a vérifié ce qui pouvait l'être dans les documents publics d'OpenAI.

## Confirmé

- **Le pixel existe et OpenAI le documente.** La documentation développeur d'OpenAI (« Measurement Pixel », consultée lors de ce passage) décrit un script chargé depuis `bzrcdn.openai.com/sdk/oaiq.min.js`, qui communique avec `bzr.openai.com` et transmet des événements (`page_viewed`, `contents_viewed`, `order_created`, `lead_created`, etc.) avec montants, identifiants de produits et, en option, e-mail, téléphone, nom et localisation — les identifiants personnels étant hachés en SHA-256 dans le navigateur. Les noms de domaine et de script sont ceux que donne le chercheur.
- **Le cookie `__obi` existe et OpenAI le déclare.** La politique de cookies d'OpenAI, datée du 10 septembre 2026 et consultée lors de ce passage, liste `__obi` : source OpenAI, durée un an, domaines `chatgpt.com` et `openai.com`, finalité « Analytics », dans la catégorie « Analytics cookies » — et non dans la catégorie « Marketing Performance cookies », qui existe par ailleurs dans le même document.
- **La publicité dans ChatGPT concerne la France.** OpenAI a annoncé le 18 août 2026 l'extension des publicités à 31 pays européens, dont la France, pour les offres Free et Go ; le même texte mentionne la mesure « au-delà des clics » par l'« OpenAI Pixel » et une API de conversions. Les offres Plus, Pro et Enterprise restent sans publicité.
- **Présence du pixel chez un annonceur cité.** Le site Notebookcheck indique avoir constaté lui-même, le 21 septembre, la présence de l'objet `window.oaiq` sur wayfair.com. Cela confirme que le pixel y est installé, pas que le cookie `__obi` y est transmis.

## Incertain ou contesté

- **Le rattachement au compte ne repose que sur un seul chercheur.** Le contenu du jeton (champ `sub` de compte), l'attribut `SameSite=None` et la transmission de `__obi` depuis des sites tiers viennent des captures réseau de l'auteur, qui dit les avoir recoupées par deux méthodes de capture. Aucun tiers nommé ne les a reproduites à ce stade : les reprises trouvées (36Kr, agrégateurs, Notebookcheck pour l'essentiel) paraphrasent le billet. La méthode est cependant décrite avec assez de détails pour être rejouée par quiconque dispose d'un compte gratuit et d'un outil d'inspection réseau.
- **Ce qu'OpenAI fait de ces données n'a été observé par personne.** L'auteur l'écrit : la résolution de l'identifiant vers le compte côté serveur « découle de la conception », il ne l'a pas vue. Rien n'établit que ces événements servent à autre chose qu'à attribuer des conversions publicitaires, ni qu'ils alimentent les réponses de ChatGPT ou un profil.
- **La documentation publique du pixel ne mentionne pas `__obi`.** Elle décrit deux cookies déposés sur le site de l'annonceur (`__oppref`, 30 jours, et `__obref`, 365 jours) et un « identifiant d'attribution préservant la vie privée » ; elle ne dit rien d'un lien avec le compte ChatGPT. Cet écart entre la documentation et le comportement rapporté est le cœur de la question, et il n'est pas tranché.
- **Portée limitée par les navigateurs.** L'auteur a testé uniquement Chrome sur Android. Safari et tous les navigateurs sous iOS bloquent ce type de cookie tiers ; Chrome sur ordinateur n'a pas été testé ; environ 20 % seulement des sessions ChatGPT observées ont produit un jeton de synchronisation. Par construction, le blocage des cookies tiers dans le navigateur coupe la transmission de `__obi` vers les autres sites, et Notebookcheck relève que le bouton « Manage cookies » des pages d'OpenAI permet de refuser la catégorie « analytics » où il figure.
- **Pays du test et régime de consentement inconnus.** Le billet ne dit pas dans quel pays les captures ont été faites et ne traite ni du RGPD ni de la directive ePrivacy. L'auteur relève que tous les jetons observés portaient `consent_decision: analytics_allowed`, et demande pourquoi un cookie servant à la mesure publicitaire est classé « analytics » ; il ne sait pas ce qui se passe en cas de refus. Rien, dans ce qui a été lu, ne permet d'affirmer que le dispositif est contraire au droit européen, ni qu'il s'y conforme. Aucune prise de position d'une autorité de protection des données n'a été trouvée lors de ce passage.
- **Silence d'OpenAI.** Selon l'auteur, ses questions envoyées le 14 septembre n'ont reçu qu'un accusé de réception du support. Aucune déclaration d'OpenAI n'a été trouvée lors de ce passage.

## Qui parle, et avec quel intérêt

- **Buchodi's Threat Intel** est une publication de veille en sécurité fonctionnant par abonnement, avec contenus réservés aux membres. Son auteur n'a pas de lien apparent avec OpenAI ni avec un concurrent, mais un titre accrocheur sert son audience. Indépendant d'OpenAI ne veut pas dire exact : un seul observateur, un seul environnement de test.
- **OpenAI** est source primaire de ce que décrivent sa documentation et sa politique de cookies, pas de la conformité ni de l'innocuité du dispositif. Son intérêt commercial est direct : la mesure des conversions est ce qui permet de vendre la publicité.
- **Notebookcheck** est un site d'actualité technologique sans lien connu avec le sujet ; sa vérification propre se limite à la présence du pixel sur un site.

## Décomposition des affirmations

- OpenAI propose aux annonceurs un pixel de mesure chargé depuis `bzrcdn.openai.com` et documenté publiquement — 9/10
- La politique de cookies d'OpenAI (10 septembre 2026) déclare un cookie `__obi` d'un an, classé « analytics » — 9/10
- Les publicités ChatGPT et le pixel sont déployés en France et dans 30 autres pays européens depuis août 2026 (annonce d'OpenAI, reprise par la presse spécialisée) — 8/10
- `__obi` est lié au compte par un jeton signé et transmis depuis les sites d'annonceurs sous Chrome Android — 6/10 (un seul chercheur, méthode détaillée, non reproduit)
- OpenAI rattache effectivement l'activité hors ChatGPT au compte et l'exploite — 4/10 (inférence de l'auteur, non observée)
- « ChatGPT sait ce que vous faites sur d'autres sites » — 3/10 en l'état (limité aux sites équipés du pixel, à certains navigateurs, et sans preuve d'usage au-delà de la mesure publicitaire)

## Pourquoi 6/10 ?

Les deux briques du mécanisme — pixel et cookie — sont attestées par les documents d'OpenAI eux-mêmes. Le lien entre les deux et avec le compte repose sur les observations détaillées, mais non reproduites, d'un seul chercheur ; l'usage côté serveur est une déduction.

## Ce qui ferait bouger la note

Une reproduction par un tiers nommé (chercheur, média, association de défense de la vie privée), idéalement depuis un pays de l'UE et en testant le refus des cookies ; une réponse d'OpenAI sur la finalité de `__obi` et son classement ; une plainte ou une prise de position d'une autorité de protection des données (CNIL, autorité irlandaise) ; une modification de la politique de cookies ou de la documentation du pixel.

## Sources

- **Source primaire (chercheur indépendant)** — [Buchodi's Threat Intel, « ChatGPT now knows what you do on other websites via ad collector », 20 septembre 2026](https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/)
- **Partie intéressée (document primaire)** — [OpenAI, politique de cookies, mise à jour du 10 septembre 2026](https://openai.com/policies/cookie-policy/)
- **Partie intéressée (document primaire)** — [OpenAI Developers, « Measurement Pixel »](https://developers.openai.com/ads/measurement-pixel)
- **Partie intéressée** — [OpenAI, « ChatGPT Ads expands across Europe », 18 août 2026](https://openai.com/index/chatgpt-ads-expands-across-europe/)
- **Partie intéressée** — [OpenAI Help Center, « Ads in ChatGPT: The Basics »](https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics)
- **Indépendante (vérification partielle)** — [Notebookcheck, « ChatGPT's __obi cookie follows you to other websites », 21 septembre 2026](https://www.notebookcheck.net/ChatGPT-s_obi-cookie-follows-you-to-other-websites.1404436.0.html)
- **Reprise sans vérification propre** — [36Kr / Machine Heart, reprise du billet](https://eu.36kr.com/en/p/3992601441942274)

Les pages ont été lues au moyen d'un outil d'extraction automatique ; les citations techniques du billet (noms de champs, attributs du cookie) n'ont pas été vérifiées par une capture réseau propre à cette veille.
