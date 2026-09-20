---
title: "💼 Marché — Cyber Resilience Act : le signalement sous 24 h des vulnérabilités exploitées s'applique depuis le 11 septembre 2026"
date: 2026-09-20T10:55:00+02:00
type: alert
feed: exostic
category: marche
confidence: 9
summary: "Depuis le 11 septembre 2026, les fabricants de produits comportant des éléments numériques doivent signaler sous 24 h toute vulnérabilité activement exploitée ou incident grave, via la plateforme unique de l'ENISA — y compris pour les produits déjà sur le marché. À faire, sans date butoir : repérer les projets qui sont des « produits » au sens du règlement et clarifier par contrat qui détecte et qui notifie ; pleine application le 11 décembre 2027."
---

# 💼 Marché — Cyber Resilience Act : le signalement sous 24 h des vulnérabilités exploitées s'applique depuis le 11 septembre 2026

**Date de publication :** 20 septembre 2026, 10 h 55 (heure de Paris)
**Nature : marché du conseil — réglementation qui s'impose aux logiciels livrés**
**Note de vérité : 9/10 🟢**
**Pour Exostic : à faire (sans date butoir — l'obligation court déjà) ; prochaine échéance le 11 décembre 2027**

Le règlement (UE) 2024/2847 sur la cyberrésilience (*Cyber Resilience Act*, CRA) est entré en vigueur le 10 décembre 2024, avec une application échelonnée. Sa première obligation opérationnelle pour les entreprises, l'article 14, s'applique depuis le **11 septembre 2026** : le **fabricant** d'un « produit comportant des éléments numériques » doit signaler toute **vulnérabilité activement exploitée** et tout **incident grave** affectant la sécurité de ce produit. Le reste du règlement (exigences essentielles de sécurité, évaluation de conformité, marquage CE, gestion des vulnérabilités pendant la période de support) s'applique le **11 décembre 2027**.

Les délais : alerte précoce **sous 24 heures** après en avoir eu connaissance, notification détaillée **sous 72 heures**, rapport final **14 jours** au plus tard après la disponibilité d'un correctif (vulnérabilité) ou **un mois** après la notification de 72 heures (incident grave). Le signalement se fait une seule fois, sur la **plateforme unique de signalement** (*Single Reporting Platform*) opérée par l'ENISA, ouverte le 11 septembre 2026 ; elle transmet simultanément au CSIRT coordinateur de l'État d'établissement du fabricant — en France, le **CERT-FR de l'ANSSI** — et à l'ENISA.

## Confirmé

- **Date et contenu de l'obligation.** La page « CRA — Reporting obligations » de la Commission européenne (mise à jour le 11 septembre 2026), la synthèse officielle du texte et le communiqué de l'ENISA du 11 septembre concordent sur la date, les délais (24 h / 72 h / 14 jours / un mois) et le canal.
- **Les produits déjà sur le marché sont couverts.** La FAQ de l'ENISA l'écrit explicitement : l'article 14 s'applique depuis le 11 septembre 2026 à tous les produits dans le champ du règlement, y compris ceux mis sur le marché avant le 11 décembre 2027. Pas de rétroactivité : une exploitation dont le fabricant avait déjà connaissance avant le 11 septembre n'a pas à être signalée après coup.
- **Qui est « fabricant ».** Selon la synthèse de la Commission : la personne qui développe ou fabrique un produit comportant des éléments numériques, **ou qui le fait concevoir, développer ou fabriquer**, et le commercialise sous son nom ou sa marque. C'est donc celui qui met le produit sur le marché sous son nom qui porte l'obligation, pas le prestataire qui l'a développé pour lui.
- **Champ.** Un produit logiciel ou matériel **et ses solutions de traitement de données à distance** — c'est-à-dire le traitement distant conçu sous la responsabilité du fabricant et sans lequel le produit ne remplirait pas l'une de ses fonctions (typiquement le back-end d'un objet connecté ou d'une application distribuée). Les produits non commercialisés sont exclus ; les logiciels libres ont un régime propre, et les « *stewards* » de logiciels libres ne sont soumis au signalement qu'à partir du 11 décembre 2027.
- **Micro et petites entreprises.** La synthèse de la Commission indique que les fabricants qui sont des micro ou petites entreprises ne peuvent pas se voir infliger d'amende pour le non-respect du seul délai de 24 heures. L'obligation de signaler, elle, s'applique à tous.
- **État de la plateforme.** Selon Help Net Security (14 septembre), la première version ne propose pas d'API, n'existe qu'en anglais et impose une notification distincte par événement.

## Incertain

- **La frontière du champ pour le logiciel « en service ».** Un service en ligne pur (SaaS) qui n'est pas le traitement distant d'un produit mis sur le marché n'est en principe pas un « produit comportant des éléments numériques » ; la qualification se fait au cas par cas, et aucune des pages officielles lues ne tranche les situations mixtes. La Commission a publié un guide pratique le 27 juillet 2026, non lu en détail pour ce passage.
- **Le texte du règlement n'a pas pu être lu directement** : la page EUR-Lex s'est chargée tronquée (considérants seulement). Les articles 3, 14, 64, 69 et 71 sont cités ici d'après les pages officielles de la Commission, de l'ENISA et de l'ANSSI, qui concordent — d'où 9 et non 10.
- **Articulation avec NIS 2 et le RGPD** : un même événement peut relever de plusieurs régimes de notification. D'après Freshfields (31 août 2026), le « *Digital Omnibus* » n'a pas encore fusionné ces canaux. En France, le projet de loi de transposition de NIS 2 n'était toujours pas adopté fin août 2026 selon une source secondaire non officielle — point non vérifié sur Légifrance pour ce passage.
- **Montant des amendes pour manquement à l'article 14** : non vérifié sur une source officielle lue directement ; il n'est donc pas cité ici.

## Qui parle, et avec quel intérêt

La Commission, l'ENISA et l'ANSSI sont les autorités chargées du texte : sources primaires sur ce qu'il impose. Les cabinets d'avocats (Freshfields) et les éditeurs d'outils de conformité, très présents sur ce sujet depuis l'été, vendent de l'accompagnement à la mise en conformité : leurs rappels de calendrier sont exacts, leur ton d'urgence est commercial. L'OpenSSF (Linux Foundation) défend les intérêts de l'écosystème du logiciel libre. Exostic, qui vend du conseil en ingénierie, est elle aussi une partie intéressée : cette entrée ne doit pas être lue comme un argument de vente.

## Décomposition des affirmations

- L'article 14 du CRA s'applique depuis le 11 septembre 2026 ; pleine application le 11 décembre 2027 — 10/10 (Commission, ENISA, ANSSI)
- Délais de 24 h, 72 h, 14 jours, un mois ; signalement via la plateforme unique, vers le CERT-FR pour un fabricant établi en France — 10/10 (Commission, ENISA, ANSSI)
- Les produits mis sur le marché avant le 11 décembre 2027 sont couverts, sans rétroactivité avant le 11 septembre 2026 — 9/10 (FAQ de l'ENISA, synthèse de la Commission ; article 69 non lu directement)
- Le fabricant est celui qui commercialise sous son nom, y compris s'il a fait développer le produit par un tiers — 9/10 (synthèse de la Commission, OpenSSF ; article 3 non lu directement)
- Pas d'amende pour les micro et petites entreprises sur le seul délai de 24 h — 8/10 (synthèse de la Commission ; article 64 non lu directement)
- Un SaaS pur est hors champ — 6/10 (lecture courante du texte, à qualifier au cas par cas)

## Pourquoi 9/10 ?

Trois autorités officielles lues directement (Commission européenne, ENISA, ANSSI) concordent, et une source de presse indépendante confirme l'ouverture de la plateforme. Un point retiré parce que le texte du règlement sur EUR-Lex n'a pas pu être lu directement lors de ce passage.

## Ce que ça change pour Exostic

**À faire — sans date butoir, l'obligation court depuis le 11 septembre 2026.** *Analyse.* Une société de conseil qui développe pour le compte d'un client n'est en principe pas le « fabricant » : c'est le client qui commercialise sous son nom qui doit notifier. Mais un délai de 24 heures ne se tient que si celui qui développe et exploite le logiciel remonte l'information immédiatement. Il est raisonnable de repérer, parmi les projets en cours ou à venir, ceux qui sont des produits au sens du règlement — objet connecté et son back-end, application ou jeu distribué commercialement — et de vérifier que les contrats de développement et de maintenance disent qui surveille les vulnérabilités des dépendances, sous quel délai le prestataire prévient, et qui saisit la plateforme. D'ici le 11 décembre 2027, les exigences de conception (inventaire des composants, mises à jour de sécurité, période de support) pèseront sur les cahiers des charges : autant les intégrer aux nouveaux projets concernés. Sur-réaction : considérer que tout développement web ou SaaS sur mesure relève du CRA, ou qu'Exostic doit elle-même s'enregistrer sur la plateforme. La qualification d'un produit donné et la rédaction des clauses relèvent d'un avocat.

## Sources

- **Source primaire (lue directement)** — [Commission européenne, « Cyber Resilience Act — Reporting obligations », mise à jour le 11 septembre 2026](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting)
- **Source primaire (lue directement)** — [Commission européenne, « The Cyber Resilience Act — Summary of the legislative text »](https://digital-strategy.ec.europa.eu/en/policies/cra-summary)
- **Source primaire (lue directement)** — [Commission européenne, page générale du Cyber Resilience Act, mise à jour le 7 septembre 2026](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)
- **Source primaire (lue directement)** — [ENISA, « The CRA Single Reporting Platform is launched », 11 septembre 2026](https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched)
- **Source primaire (lue directement)** — [ENISA, FAQ de la plateforme unique de signalement](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions)
- **Source primaire (lue directement)** — [ANSSI, « Cadre règlementaire du CRA »](https://cyber.gouv.fr/reglementation/cybersecurite-des-produits/cyber-resilience-act/cadre-r%C3%A8glementaire-du-cra/)
- **Texte officiel (page chargée tronquée, articles non lus directement)** — [Règlement (UE) 2024/2847, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng)
- **Indépendante** — [Help Net Security, « ENISA launched the CRA Single Reporting Platform for actively exploited vulnerabilities », 14 septembre 2026](https://www.helpnetsecurity.com/2026/09/14/enisa-cra-single-reporting-platform/)
- **Indépendante (fondation, défend l'écosystème du logiciel libre)** — [OpenSSF, « CRA Reporting Obligations for Manufacturers — Resource Guide »](https://policy.openssf.org/CRA/checklists/Manufacturers_September_Checklist.html)
- **Partie intéressée (cabinet d'avocats)** — [Freshfields, « Cyber Resilience Act reporting obligations take effect on 11 September 2026 », 31 août 2026](https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/cyber-resilience-act-reporting-obligations-take-effect-on-11-september-2026-102nzmk)
- **Secondaire, non officielle (état de la transposition de NIS 2)** — [Leto, « NIS 2 France : transposition, loi et calendrier 2026 », mise à jour le 28 août 2026](https://www.leto.legal/guides/nis-2-transposition-france)
