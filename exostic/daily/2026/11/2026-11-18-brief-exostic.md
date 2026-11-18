---
title: "Brief Exostic — 18 novembre 2026"
date: 2026-11-18T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Le Sénat adopte le PLFSS 2027 et renvoie le texte en commission mixte paritaire ; l'Assemblée adopte la loi « résilience » (NIS 2) et supprime l'article sur le chiffrement ; trois failles de déni de service, de faible gravité, corrigées dans OpenSSL, dont la branche utilisée par Node.js."
---

# Brief Exostic — 18 novembre 2026

**Récapitulatif quotidien — 20 h 15 (heure de Paris)**

## 💼 Marché du conseil

### PLFSS 2027 : le Sénat adopte le texte en première lecture, commission mixte paritaire annoncée — note 8/10 🟢

Le Sénat a adopté l'ensemble du projet de loi de financement de la sécurité sociale (PLFSS) pour 2027 le 18 novembre, par 201 voix contre 124.

**Confirmé.** Le résultat du vote (201 contre 124) est rapporté à l'identique par deux articles de presse indépendants publiés le jour même. Une commission mixte paritaire (CMP), chargée de proposer un texte commun entre les deux chambres, doit se réunir — le 26 novembre selon Public Sénat, « prochainement » selon une seconde source qui ne précise pas de date.

**Incertain.** La date du 26 novembre pour la CMP ne repose que sur une seule source à ce stade. Le résultat de la CMP elle-même est jugé peu probable par la presse, compte tenu des écarts entre les deux versions (retraites, allègements de cotisations patronales). Aucune mesure du texte adopté au Sénat ne vise spécifiquement les sociétés de conseil (SAS) ou leurs dirigeants ; la seule mesure touchant les cotisations patronales (prise en compte des compléments de salaire dans le calcul des allègements généraux, reportée au 1ᵉʳ avril par le Sénat) concerne tous les employeurs, sans disposition propre aux petites structures de conseil.

**Ce que ça change pour Exostic : à surveiller.** Le texte n'est pas définitif — ni la CMP ni un éventuel retour à l'Assemblée n'ont eu lieu. Rien à préparer dans l'immédiat ; revérifier après la CMP si elle aboutit, ou lors d'une nouvelle lecture sinon.

**Sources :**
- **Primaire** — Public Sénat, « Budget 2027 de la Sécurité sociale : les modifications à retenir après le passage du projet de loi au Sénat », 18 novembre 2026 : https://www.publicsenat.fr/actualites/politique/budget-2027-de-la-securite-sociale-les-modifications-a-retenir-apres-le-passage-du-projet-de-loi-au-senat
- **Indépendante** — presseagence.fr, « Budget Sécurité sociale 2027 : le Sénat adopte sa version », 18 novembre 2026 : https://presseagence.fr/paris-budget-de-la-securite-sociale-le-senat-adopte-sa-version-du-projet-pour-2027/
- **Indépendante** — Libnanews, « PLFSS 2027 : le Sénat adopte le budget de la Sécurité sociale pour 2027 », 18 novembre 2026 : https://libnanews.com/france-le-senat-adopte-le-budget-de-la-securite-sociale-pour-2027/

### Loi « résilience » (NIS 2 / DORA / CER) : adoptée par l'Assemblée nationale, article sur le chiffrement supprimé — note 8/10 🟢

L'Assemblée nationale a adopté, le 17 novembre, le projet de loi relatif à la résilience des infrastructures critiques et au renforcement de la cybersécurité (transposition de NIS 2, DORA et de la directive REC), par 464 voix contre 64 (16 abstentions).

**Confirmé.** Le résultat du vote et son adoption définitive en première lecture sont rapportés par plusieurs sources de presse indépendantes et apparaissent sur le dossier législatif officiel du Sénat. Les députés ont supprimé l'article 16 bis, ajouté par les sénateurs, qui interdisait d'imposer aux fournisseurs de chiffrement des clés maîtresses ou tout accès non consenti aux données — les deux chambres ont donc adopté des versions différentes du texte.

**Incertain.** Comme le Sénat et l'Assemblée ont voté des textes différents, le passage en commission mixte paritaire est l'étape suivante logique, mais aucune date n'est encore officiellement fixée. Le périmètre exact des « entités importantes » soumises aux obligations (déclaration d'incident à l'ANSSI, mesures de remédiation, sanctions) reste à préciser par décret ; l'échéance de conformité évoquée dans la presse (fin 2028) n'est pas, à ce stade, un texte officiel mais une déclaration de la ministre chargée du numérique.

**Ce que ça change pour Exostic : à surveiller.** Le statut d'Exostic au regard de NIS 2 dépend de sa taille et de son secteur (elle n'est a priori pas elle-même une entité couverte), mais le texte crée des obligations pour ses clients potentiels dans les secteurs régulés (énergie, santé, finance, administration) — donc une demande probable pour des prestations de mise en conformité logicielle. Rien à faire avant les décrets d'application ; revérifier le périmètre une fois la CMP et les décrets publiés.

**Sources :**
- **Primaire** — Sénat, dossier législatif du projet de loi résilience : https://www.senat.fr/dossier-legislatif/pjl24-033.html
- **Indépendante** — Leto.legal, « Loi Résilience NIS 2 : adoptée à l'Assemblée par 464 voix contre 64 », 17 novembre 2026 : https://www.leto.legal/news/nis-2-loi-resilience-adoptee-assemblee-464-voix-17-novembre-2026
- **Indépendante** — Siècle Digital, « Des milliers d'entreprises vont devoir renforcer leur cybersécurité après un vote majeur des députés », 18 novembre 2026 : https://siecledigital.fr/2026/11/18/des-milliers-dentreprises-vont-devoir-renforcer-leur-cybersecurite-apres-un-vote-majeur-des-deputes

## 🔐 Sécurité

### OpenSSL : trois failles de déni de service, gravité « faible », touchant la branche utilisée par Node.js — note 6/10 🟠

L'OpenSSL Project a publié, le 17 novembre, un avis de sécurité pour trois CVE affectant les branches 3.5, 4.0 et 4.1 (CVE-2026-35190, CVE-2026-107493, CVE-2026-124709), corrigées dans les versions 3.5.10, 4.0.4 et 4.1.1, attendues le 1ᵉʳ décembre 2026.

**Confirmé.** Les trois vulnérabilités sont classées « Low » par l'éditeur lui-même, qui ne documente aucune exploitation active. Node.js embarque la branche OpenSSL 3.5.x (version 3.5.8 dans les dernières releases LTS), donc potentiellement concernée tant que Node n'a pas intégré le correctif.

**Incertain.** Les trois failles demandent des conditions précises peu probables dans un usage standard de Node.js : une lecture hors limites qui ne fuite aucune donnée et ne touche qu'une configuration de certificat Suite B non par défaut (CVE-2026-35190) ; un use-after-free qu'OpenSSL lui-même ne déclenche jamais et qu'un attaquant ne peut pas forcer (CVE-2026-107493) ; une fuite mémoire côté serveur QUIC (CVE-2026-124709), fonctionnalité que Node.js n'expose pas nativement via OpenSSL. Aucune release de sécurité Node.js n'a encore intégré ces correctifs au 18 novembre.

**Ce que ça change pour Exostic : à surveiller.** Pas d'action avant une éventuelle release de sécurité Node.js intégrant OpenSSL 3.5.10 — à vérifier lors de la prochaine publication `nodejs.org/en/blog/vulnerability`.

**Sources :**
- **Primaire** — OpenSSL Project, avis de sécurité du 17 novembre 2026 : https://openssl-library.org/news/secadv/20261117.txt
- **Primaire** — CERT-FR (CERT.cyber.gouv.fr), CERTFR-2026-AVI-1554 : https://cert.cyber.gouv.fr/avis/CERTFR-2026-AVI-1554

## 📅 Échéances à venir

- **2026-11-19** — GitHub Actions : fin de la fenêtre de migration du label `ubuntu-latest` vers Ubuntu 26.04.
- **2026-11-19** — PLF 2027 : examen définitif de la seconde partie en commission des finances au Sénat.
- **2026-11-26** — PLFSS 2027 : commission mixte paritaire annoncée (voir ci-dessus).
- **2026-11-26** — Amazon EKS 1.31 : fin du support étendu.
- **2026-12-02** — GitHub Actions : blocage par défaut de `pull_request_target` sur les dépôts publics sans politique d'événements.
- **2026-12-02** — Amazon EKS 1.34 : fin du support standard (bascule en support étendu facturé).
- **2026-12-09** — PLF 2027 : séance publique au Sénat, scrutin public sur l'ensemble du texte.

## 🧭 Ce qu'il faut retenir

- Les deux grands textes budgétaires et le texte cybersécurité avancent en parallèle sans être définitifs : PLFSS 2027 et loi résilience partent (ou devraient partir) en commission mixte paritaire, le PLF 2027 reste en cours d'examen au Sénat. Aucun des trois ne modifie encore concrètement une obligation ou un coût pour une SAS de conseil — la navette parlementaire peut encore changer le texte final.
- La loi résilience confirme un écart entre les deux chambres sur le chiffrement (article supprimé par l'Assemblée), signe que ce point reste disputé jusqu'à la CMP.
- Rien dans la stack technique (Node.js, TypeScript, Kubernetes, AWS, npm) ne justifie une action aujourd'hui : les failles OpenSSL identifiées sont de faible gravité, non exploitées, et leur portée réelle sur Node.js reste incertaine en l'absence de correctif Node publié.
