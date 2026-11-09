---
title: "Brief Exostic — 9 novembre 2026"
date: 2026-11-09T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Semaine calme sur le fond : rien de nouveau ne franchit le critère d'entrée depuis le brief du 8 novembre. Point hebdomadaire du lundi : neuf échéances suivies tombent dans les 30 jours, dont trois dès cette semaine (Sénat, Assemblée, Node.js)."
---

# Brief Exostic — 9 novembre 2026

**Nature : récapitulatif quotidien (point hebdomadaire du lundi)**

Aucune information nouvelle ne franchit le critère d'entrée (changer une décision) depuis le brief du 8 novembre : les recherches du jour sur la stack, la sécurité, le marché du conseil et les secteurs clients n'ont rien trouvé d'établi qui ne soit déjà suivi. Conformément à la règle du lundi, ce récapitulatif est publié quand même, sous forme de point hebdomadaire sur les échéances suivies — plusieurs tombent précisément cette semaine.

Ce qui a été vérifié aujourd'hui, sans y trouver d'évolution par rapport à ce qui était déjà noté le 8 novembre :

- **PLFSS 2027 au Sénat** — le calendrier officiel de la commission des finances (Sénat, document du 30 octobre) confirme un début d'examen ce lundi 9 novembre à 15 h et un scrutin public solennel le 18 novembre à 16 h 30. Rien de nouveau par rapport à la semaine dernière.
- **Projet de loi « résilience » (NIS 2)** — le dossier législatif officiel de l'Assemblée nationale confirme une discussion en séance publique ce lundi 9 novembre, sur le texte de la commission spéciale (n° 1779-A0). Résultat du débat non encore connu au moment de ce passage.
- **Node.js, publication de sécurité** — le billet officiel (mis à jour le 3 novembre) confirme une publication le 11 novembre ou peu après, sur les lignes 22.x/24.x/26.x, gravité maximale annoncée « élevée » pour chacune. Aucun identifiant CVE ni version corrigée n'est encore publié.
- **GitHub Actions, blocage de `pull_request_target`** — la page officielle confirme les deux fenêtres de test (9 et 16 novembre, 16 h-18 h UTC) et l'application définitive reportée au 2 décembre ; aucun changement depuis le report annoncé le 2 novembre.
- **PLF 2027 au Sénat** — le même document confirme l'examen des articles de la première partie en commission le 12 novembre et l'examen définitif de la seconde partie le 19 novembre. Rien de nouveau.

Ces cinq points recoupent exactement ce qui figurait déjà dans `exostic/state/echeances.md` : ils ne constituent pas une évolution significative et ne donnent donc pas lieu à une nouvelle entrée, conformément à la règle anti-doublon du flux.

## 📅 Échéances à venir

- **2026-11-09** — PLFSS 2027 : début de l'examen par le Sénat (sous réserve de transmission), jusqu'au 18 novembre ; scrutin public solennel le 18 novembre à 16 h 30.
- **2026-11-09** — Projet de loi « résilience » (NIS 2) : reprise de la discussion en séance publique à l'Assemblée nationale.
- **2026-11-09 et 2026-11-16** — GitHub Actions : fenêtres de test (16 h-18 h UTC) du blocage par défaut de `pull_request_target` sur les dépôts publics.
- **2026-11-11** (ou peu après) — Node.js : publication de sécurité sur les lignes 22.x/24.x/26.x, gravité maximale annoncée « élevée », CVE non encore publiés.
- **2026-11-12** — PLF 2027 : au Sénat, début de l'examen des articles de la première partie en commission des finances (sous réserve de transmission).
- **2026-11-19** — GitHub Actions : fin de la fenêtre de migration progressive du label `ubuntu-latest` vers Ubuntu 26.04.
- **2026-11-26** — Amazon EKS 1.31 : fin du support étendu.
- **2026-12-02** — GitHub Actions : application définitive du blocage de `pull_request_target` sur les dépôts publics sans politique d'événements (reporté du 2 novembre).
- **2026-12-02** — Amazon EKS 1.34 : fin du support standard, bascule en support étendu facturé.

## 🧭 Ce qu'il faut retenir

Trois textes budgétaires et réglementaires entrent cette semaine dans leur phase décisive au Parlement (PLFSS au Sénat, NIS 2 en séance à l'Assemblée, PLF en commission au Sénat), sans qu'aucun ne soit encore adopté définitivement — un projet de texte reste un projet de texte tant qu'il n'est pas promulgué. Côté stack, la fenêtre de sécurité Node.js du 11 novembre est confirmée mais encore sans détail technique : la publication officielle sera à vérifier dès sa sortie pour en tirer, le cas échéant, une action concrète. Les deux fenêtres de test GitHub Actions (9 et 16 novembre) préparent un changement de comportement par défaut qui ne s'appliquera réellement qu'au 2 décembre — rien à faire dans l'urgence pour qui a déjà testé ou épinglé sa politique d'événements.
