---
title: "Brief Exostic — 13 octobre 2026"
date: 2026-10-13T20:15:00+02:00
type: daily
feed: exostic
category: briefing
summary: "La commission des finances a rejeté la partie recettes du PLF 2027 le 9 octobre (31 contre, 3 pour) : la séance publique ouverte le 13 octobre repart donc du texte initial du gouvernement, pas du texte amendé en commission. Rien de retenable ce jour sur la stack, la sécurité ou les secteurs clients ; NIS 2 reste sans date de séance malgré la conférence des présidents réunie aujourd'hui."
---

# Brief Exostic — 13 octobre 2026

**Date de publication :** 13 octobre 2026, 20 h 15 (heure de Paris)

Vérifié ce passage sans résultat retenable en dehors du point ci-dessous : notes
de version Node.js (rien depuis les 26.11.0/26.11.1 du 7 octobre) ; blog
Kubernetes (rien depuis le billet du 6 octobre sur le passage à cgroup v2) ;
page AWS « What's New » et statut AWS (aucune annonce ni panne identifiée pour
cette fenêtre) ; avis CERT-FR du 13 octobre (un seul avis publié, NetApp
StorageGRID, hors stack suivie) ; changelog GitHub (rien sur Actions ni npm
les 12 et 13 octobre) ; statut npm (aucun incident) ; blog TypeScript (toujours
aucune annonce de la bêta 7.1, promise début octobre — à reprendre si elle
sort). Côté NIS 2, la conférence des présidents de l'Assemblée nationale
réunie ce jour pouvait réinscrire le projet de loi « résilience » à l'ordre du
jour ; son relevé de conclusions n'était pas public au moment de ce passage,
donc toujours aucune nouvelle date confirmée depuis le retrait du 6 octobre.
Rien de structurant identifié sur les secteurs clients (fintech, accessibilité
numérique, identité numérique, commande publique) pour cette fenêtre.

## 💼 Marché du conseil

### PLF 2027 : la partie recettes rejetée en commission, la séance publique repart du texte du gouvernement — note 7/10 🟢

Le vendredi 9 octobre 2026 au soir, après trois jours d'examen, la commission
des finances de l'Assemblée nationale a rejeté la première partie (recettes)
du projet de loi de finances 2027, par 31 voix contre, 3 pour (seul le groupe
Ensemble pour la République a voté pour) et 2 abstentions — après avoir
pourtant adopté plus de 200 amendements, dont plusieurs suppressions de
mesures phares du gouvernement. Conséquence mécanique (article 42 de la
Constitution) : la discussion qui s'ouvre en séance publique le 13 octobre
repart du texte initial déposé par le gouvernement le 1er octobre, et non de
celui amendé en commission ; les amendements adoptés en commission devront
être redéposés et revotés en séance.

**Confirmé.** Le rejet du 9 octobre, son décompte de voix et la reprise du
texte initial en séance sont rapportés de façon concordante par trois sources
indépendantes (LCP, LégiFiscal, Fiscal Online) et correspondent au mécanisme
constitutionnel connu pour un texte rejeté en commission.

**Incertain.** Le chiffrage de la perte nette de recettes votée en commission
(environ 9,6 Md€) et la réévaluation du déficit public (5,35–5,4 % du PIB
contre 5 % visés par le gouvernement) ne reposent que sur l'estimation du
rapporteur général du budget, Philippe Juvin (Droite républicaine) — partie
prenante politique commentant un texte que son propre camp a contribué à
retravailler en commission, chiffres provisoires avant le débat en séance. Un
vote solennel sur la première partie est annoncé pour le 20 octobre par une
seule source (LégiFiscal) ; la page officielle de l'Assemblée nationale ne le
mentionne pas encore.

**Ce que ça change pour Exostic.** **À surveiller.** Rien n'est voté
définitivement : qui facture des prestations dont la rentabilité dépend d'un
dispositif fiscal ou social actuellement en débat (crédits recherche, charges
sociales, seuils de TVA) n'a rien à ajuster avant l'issue du vote solennel
annoncé le 20 octobre et, plus largement, avant l'adoption définitive du
PLF — généralement en fin d'année, avec un recours à l'article 49.3 ou à une
ordonnance budgétaire si le délai constitutionnel de 70 jours (art. 47) n'est
pas tenu. Anticiper un dispositif encore amendable serait prématuré ; vérifier
le texte définitif une fois promulgué, avec l'expert-comptable si une décision
chiffrée en dépend.

**Sources :**
- **Primaire (lue directement)** — [Assemblée nationale, dossier législatif PLF 2027](https://www.assemblee-nationale.fr/dyn/17/dossiers/PLF_2027)
- **Indépendante** — [LCP, « Budget 2027 : les députés rejettent en commission la partie "recettes" du projet de loi de finances », 9 octobre 2026](https://lcp.fr/actualites/budget-2027-les-deputes-rejettent-en-commission-la-partie-recettes-du-projet-de-loi-de)
- **Indépendante** — [LégiFiscal, 10 octobre 2026](https://www.legifiscal.fr/actualites-fiscales/4684-plf-2027-commission-finances-rejette-partie-recettes-creuse-deficit-environ-10-md.html)
- **Référence corroborante** — [Fiscal Online, 10 octobre 2026](https://fiscalonline.com/outils-fiscaux/partie-recettes-plf-2027-rejetee-commission-place-seance-publique)

## ✅ À faire

- **GitHub Actions — label `ubuntu-latest`.** Tester les workflows sur
  `ubuntu-26.04` ou épingler explicitement `ubuntu-24.04` avant le début de la
  migration, le 19 octobre 2026.
- **GitHub Actions — `pull_request_target`.** Vérifier les workflows de dépôts
  publics qui déclenchent sur cet événement avant l'application automatique de
  la règle de blocage, le 2 novembre 2026.

## 📅 Échéances à venir

- 2026-10-13 — NIS 2 : conférence des présidents réunie ce jour, issue non
  connue au moment de la publication ; toujours aucune nouvelle date de
  séance confirmée depuis le retrait du 6 octobre.
- 2026-10-13 — PLF 2027 : discussion générale en séance publique sur le texte
  initial du gouvernement (partie recettes rejetée en commission) ; PLFSS
  2027 toujours en commission des affaires sociales, sans date de séance.
- 2026-10-19 — GitHub Actions : début de la migration progressive du label
  `ubuntu-latest` d'Ubuntu 24.04 vers Ubuntu 26.04 (achèvement prévu le
  19 novembre).
- 2026-10-20 — Node.js 24 passe d'Active LTS à maintenance.
- 2026-10-20 — PLF 2027 : vote solennel annoncé sur la première partie
  (source unique, non confirmé par l'Assemblée nationale).
- 2026-10-27 — Kubernetes 1.34 : fin de vie côté projet amont.
- 2026-10-28 — Node.js 26 devient Active LTS.
- 2026-10-30 — Amazon Pinpoint : retrait du service (les API SMS, voix, push
  et OTP restent servies par AWS End User Messaging).
- 2026-11-02 — GitHub Actions : application automatique de la règle par
  défaut bloquant `pull_request_target` sur les dépôts publics sans politique
  d'événements.

## 🧭 Ce qu'il faut retenir

Le budget 2027 entre dans sa phase la plus visible : après un rejet en
commission, le débat revient au texte non amendé du gouvernement — un
scénario déjà vu pour de précédents budgets, qui ne présage pas à lui seul du
texte final puisque les amendements peuvent être revotés en séance. Rien de
nouveau côté stack ou sécurité cette fois-ci ; le calendrier reste dominé par
deux dossiers parlementaires qui continuent de glisser (NIS 2 toujours sans
date, budget désormais au milieu d'une navette classique) pendant que les
échéances techniques déjà connues (migration `ubuntu-latest`, bascules
Node.js/Kubernetes) continuent d'approcher sans changement.
