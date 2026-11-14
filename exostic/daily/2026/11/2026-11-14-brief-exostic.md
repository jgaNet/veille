---
title: "Brief Exostic — 14 novembre 2026"
date: 2026-11-14T20:15:00+01:00
type: daily
feed: exostic
category: briefing
summary: "Release de sécurité Node.js du 11 novembre (16 failles corrigées, 7 de gravité élevée) et contenu dévoilé du projet de loi résilience (NIS2) en débat à l'Assemblée depuis le 9 novembre (amendes, article chiffrement contesté)."
---

# Brief Exostic — 14 novembre 2026

**Date de publication :** 14 novembre 2026, 20 h 15 (heure de Paris)

## 🔐 Sécurité

### Node.js : release de sécurité du 11 novembre — 16 failles corrigées, 7 de gravité élevée — note 9/10 🟢

Node.js a publié le 11 novembre les versions correctives **22.23.5, 24.22.3 et 26.13.1**, corrigeant 16 failles (7 HIGH, 6 MEDIUM, 3 LOW). Les plus notables, toutes HIGH : plusieurs problèmes HTTP/2 permettant un arrêt à distance du serveur, des fuites mémoire ou un use-after-free (CVE-2026-123863, -123865, -123866, -123874) ; une fuite mémoire via une écriture TLS de longueur nulle (CVE-2026-123864) ; une exception non interceptée à distance pendant le handshake TLS (CVE-2026-126051) ; et, pour la ligne 1.2, un contournement de l'authentification par certificat client via la renégociation TLS (CVE-2026-123872).

**Établi :** liste des CVE, versions touchées et corrigées, et gravité publiées directement par nodejs.org (source primaire, fait documentaire directement vérifiable).

**Incertain :** aucune exploitation active n'est mentionnée dans le billet ; rien n'indique que ces failles aient été exploitées avant correction.

**Ce que ça change :** à faire — mettre à jour vers 22.23.5 / 24.22.3 / 26.13.1 sans attendre, en particulier pour tout service exposant du HTTP/2 ou du TLS mutuel (mTLS) côté serveur.

**Sources croisées :** source primaire — [Node.js, releases de sécurité du 11 novembre 2026](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases).

## 💼 Marché du conseil

### Projet de loi résilience (NIS2) : débat à l'Assemblée depuis le 9 novembre, contenu précisé — note 7/10 🟢

Le projet de loi « résilience », qui transpose NIS2 et deux autres directives européennes, est bien entré en débat en séance publique à l'Assemblée nationale le 9 novembre comme annoncé le 8 novembre, après plusieurs reports. Le texte élargit le périmètre réglementé de 6 à 18 secteurs et concernerait environ 15 000 organisations (contre quelques centaines aujourd'hui). Les amendes prévues : jusqu'à 10 M€ ou 2 % du chiffre d'affaires mondial pour les « entités essentielles », jusqu'à 7 M€ ou 1,4 % pour les « entités importantes ». Un article 16 bis, ajouté par le Sénat, interdirait d'imposer des portes dérobées aux fournisseurs de solutions de chiffrement ; le gouvernement en demande la suppression par amendement, le jugeant hors sujet (« cavalier législatif »).

**Établi :** reprise du débat le 9 novembre (dossier législatif officiel de l'Assemblée nationale), élargissement à 18 secteurs, montants des amendes et existence de l'article 16 bis — confirmés par deux sources de presse spécialisée indépendantes l'une de l'autre (Siècle Digital, Le Monde Informatique).

**Incertain :** aucune date de vote à l'Assemblée n'est encore connue ; le texte n'est pas adopté définitivement — un projet n'est pas une loi. Les délais précis de notification à l'ANSSI en cas d'incident, évoqués par une seule des deux sources, ne sont pas corroborés ici et ne sont donc pas repris.

**Ce que ça change :** à surveiller — pour les clients des secteurs listés par Exostic qui entreraient dans le périmètre NIS2 (élargi à la santé, l'industrie, les infrastructures numériques notamment), les obligations de notification d'incident et les amendes encourues sont un argument qui pourra justifier d'intégrer des exigences de sécurité et de traçabilité dès la conception. Rien d'applicable tant que le texte n'est pas adopté ; pour une analyse de la portée exacte pour une organisation donnée, se référer au texte officiel une fois promulgué ou consulter un avocat spécialisé.

**Sources croisées :** [Dossier législatif officiel, Assemblée nationale](https://www.assemblee-nationale.fr/dyn/17/dossiers/DLR5L17N50731) ; indépendante — [Siècle Digital, 10 novembre 2026](https://siecledigital.fr/2026/11/10/la-france-veut-mieux-se-proteger-des-cyberattaques-un-projet-de-loi-enfin-examine/) ; indépendante — [Le Monde Informatique](https://www.lemondeinformatique.fr/cybersecurite-conformite/nis-2-la-loi-resilience-arrive-enfin-a-l-assemblee).

## 📅 Échéances à venir

- 2026-11-16 — GitHub Actions : dernière fenêtre de test (« brownout ») du blocage par défaut de `pull_request_target` sur les dépôts publics, 16 h-18 h UTC.
- 2026-11-18 — PLFSS 2027 : scrutin public solennel au Sénat sur l'ensemble du texte, 16 h 30.
- 2026-11-19 — GitHub Actions : fin de la fenêtre de migration progressive du label `ubuntu-latest` d'Ubuntu 24.04 vers 26.04.
- 2026-11-19 — PLF 2027 : examen définitif de la seconde partie en commission des finances du Sénat ; aucune date de séance publique encore connue.
- 2026-11-26 — Amazon EKS 1.31 : fin du support étendu, mise à niveau automatique du plan de contrôle.
- 2026-12-02 — GitHub Actions : application du blocage par défaut de `pull_request_target` sur les dépôts publics.
- 2026-12-02 — Amazon EKS 1.34 : fin du support standard, bascule en support étendu facturé.

## 🧭 Ce qu'il faut retenir

- Le cycle de sécurité Node.js reste soutenu (16 failles en une seule release) : les équipes qui suivent les lignes 22/24/26 LTS doivent garder leurs pipelines de mise à jour automatisés plutôt que de reporter.
- NIS2 avance enfin en France après plus d'un an de reports, avec un périmètre sectoriel large (18 secteurs) ; l'issue reste incertaine sur au moins un point sensible (chiffrement), le gouvernement et le Sénat n'étant pas alignés.
- Les calendriers budgétaires (PLF et PLFSS 2027) restent heurtés — rejets, reports, navette entre les deux chambres — sans que cela change, à ce stade, le droit applicable à une SAS de conseil.
