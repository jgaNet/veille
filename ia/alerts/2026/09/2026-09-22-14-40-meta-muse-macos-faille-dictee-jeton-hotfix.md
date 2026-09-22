---
title: "⚖️ Société — Meta Muse : une faille de l'application Mac permettait à tout programme local de détourner la dictée de l'agent et d'en voler le jeton ; Meta dit avoir corrigé"
date: 2026-09-22T14:40:00+02:00
type: alert
feed: ia
category: societe
confidence: 7
summary: "Le chercheur en sécurité macOS Patrick Wardle a publié le 21 septembre une démonstration publique montrant qu'un programme sans privilège, déjà exécuté sur le Mac, pouvait modifier un réglage non documenté de Muse, l'agent personnel de Meta lancé sur Mac le 17 septembre, pour rediriger la dictée vocale vers un serveur tiers et récupérer le jeton d'authentification de l'agent, qui a accès aux fichiers, messages, calendrier et appareils liés. Meta a reconnu le rapport, publié un correctif à chaud et qualifie la faille d'élévation de privilège locale. Le mécanisme est vérifiable dans le code publié et reconnu par l'éditeur ; aucun tiers nommé ne l'a reproduit, l'efficacité du correctif n'est pas vérifiée, et la gravité réelle est contestée entre deux parties intéressées."
---

# ⚖️ Société — Meta Muse : une faille de l'application Mac permettait à tout programme local de détourner la dictée de l'agent et d'en voler le jeton ; Meta dit avoir corrigé

**Date de publication :** 22 septembre 2026, 14 h 40 (heure de Paris)
**Nature : fait sociétal — vulnérabilité documentée dans un agent grand public**
**Note de vérité : 7/10 🟢** (sur le fait central : un programme local sans privilège pouvait rediriger la dictée de Muse et obtenir son jeton d'authentification ; Meta a reconnu et corrigé)

Muse est l'« agent personnel » de Meta, lancé le 8 septembre sur iPhone, Android et muse.ai, puis le 17 septembre sur Mac. Sur Mac, l'application agit dans les fichiers, les applications, les onglets du navigateur, Messages, le calendrier et les notes, avec l'autorisation de l'utilisateur ; les déclarations de confidentialité de l'App Store citées par la presse indiquent qu'elle peut collecter des données de santé, financières, de localisation, de contacts et d'historique de navigation. Meta a publié le 8 septembre un billet décrivant son architecture de sécurité : machine virtuelle dédiée, un composant « Sentinel » présenté comme « l'unique autorité de permission », jetons de substitution pour que le modèle ne voie jamais les identifiants réels, validation humaine de chaque paiement.

Le 21 septembre, Patrick Wardle, chercheur en sécurité macOS et fondateur de la fondation Objective-See, a publié sur GitHub un outil de démonstration nommé « not-a-mused ». Le mécanisme décrit est simple : l'application Mac de Muse lit un réglage non documenté, `endo_voyager_dictation_endpoint`, qui désigne le serveur vers lequel la dictée vocale est envoyée pour transcription. Ce réglage peut être modifié par n'importe quel processus tournant sous le compte de l'utilisateur, sans droits d'administrateur ni autorisation supplémentaire. Un programme malveillant déjà présent sur la machine peut donc pointer ce réglage vers un serveur qu'il contrôle et, selon le chercheur, lire ce que l'utilisateur dicte, injecter des consignes supplémentaires dans le flux transmis à l'agent et récupérer le jeton d'authentification de Muse, avec lequel il hérite des accès que l'utilisateur a accordés à l'agent. Le chercheur dit avoir démontré la redirection de la dictée, la prise de photos et l'écriture de fichiers sans avertissement, la récupération de la localisation d'un iPhone lié au compte et un balayage Bluetooth à distance ; il affirme que l'agent expose « plus de 50 commandes » dont son outil n'exploite qu'une partie, et annonce d'autres détails et « d'autres bugs » pour la conférence Objective by the Sea en novembre. Son propre dépôt précise : « il s'agit d'une attaque locale ; l'attaquant doit déjà pouvoir exécuter du code en tant qu'utilisateur local ».

Selon les titres relayés par Techmeme le 22 septembre au matin, Meta a répondu par la voix de David Singleton : « Nous apprécions ce rapport et avons publié un correctif à chaud (hotfix) pour l'application Muse Mac. Il s'agissait d'une attaque par élévation de privilège locale, pas d'une exploitation à distance. » The Verge écrit que le correctif est venu « en quelques heures » après l'article d'Ars Technica et que Meta parle d'un « risque pratique minimal ». Ni l'article d'Ars Technica ni celui de The Verge n'ont pu être lus directement ici (sites bloqués) ; leur contenu est connu par Techmeme et par une reprise de The Verge. Aucun identifiant CVE n'est mentionné dans les sources lues, et aucune source ne précise si le chercheur avait prévenu Meta avant de publier son outil.

## Confirmé

- Le réglage `endo_voyager_dictation_endpoint` existe et peut être modifié par un processus local sans privilège pour rediriger la dictée : décrit avec le nom exact du réglage par le chercheur, code de démonstration public sur GitHub (vérifiable par quiconque dispose de l'application), rapporté de façon concordante par The Register, Malwarebytes et The Hacker News, et reconnu par Meta, qui a publié un correctif.
- L'attaque suppose un code déjà exécuté sur la machine : dit par le chercheur lui-même et par Meta.
- Muse pour Mac a accès, avec l'autorisation de l'utilisateur, aux fichiers, applications, messages, calendrier et notes : présentation de Meta, cohérente avec les descriptions de la presse.

## Incertain

- **Reproduction indépendante** : aucun des médias lus n'indique avoir exécuté l'outil ni vérifié lui-même le vol du jeton ; ils rapportent les affirmations du chercheur. Le code étant public, une reproduction est possible mais n'a pas été trouvée sous un nom identifiable.
- **Portée réelle du jeton** : ce que le jeton permet exactement (photos, fichiers, localisation d'un iPhone lié, « plus de 50 commandes ») repose sur les démonstrations et déclarations du chercheur. Meta affirmait le 8 septembre que les identifiants réels ne sont jamais visibles du modèle grâce à des jetons de substitution ; la faille porte sur le jeton de session de l'application, non sur les mots de passe ou moyens de paiement, et aucune source ne dit qu'un achat ait pu être déclenché.
- **Efficacité du correctif** : Meta dit avoir corrigé ; ni la version corrigée, ni le contenu du correctif, ni une vérification par le chercheur ou un tiers ne sont connus.
- **Gravité** : « backdoor ultime » et « n'installez pas » pour le chercheur, « risque pratique minimal » pour Meta. Les deux qualifications viennent de parties intéressées. Le point factuel non contesté est qu'un programme local ordinaire, sans élévation de droits, pouvait hériter des accès étendus consentis à l'agent — ce qui est la question centrale posée par les agents installés avec de larges permissions, indépendamment de cette faille précise.
- **Notification préalable** : aucune source ne dit si Meta a été prévenue avant la publication du 21 septembre.

## Qui parle, et avec quel intérêt

- **Patrick Wardle** (Objective-See) : chercheur reconnu sur macOS, sans lien connu avec un concurrent de Meta. Il organise la conférence Objective by the Sea où il annonce présenter d'autres failles de Muse ; une divulgation spectaculaire sert sa notoriété. Son dépôt est la source primaire du mécanisme.
- **Meta** (David Singleton) : éditeur du produit, qui a intérêt à minimiser la gravité ; sa reconnaissance de la faille et la publication d'un correctif vont contre cet intérêt et pèsent donc en faveur de la réalité du mécanisme. Le billet du 8 septembre sur la sécurité de Muse est une communication d'entreprise.
- **Malwarebytes** : vend des logiciels de sécurité et a intérêt à un récit de menace ; **The Hacker News**, **The Register**, **iTnews** : presse spécialisée, sans reproduction propre déclarée.
- **Ars Technica**, **The Verge** : non lus directement ; cités via Techmeme et une reprise.

## Décomposition des affirmations

- Muse pour Mac est sorti le 17 septembre et Meta a publié une architecture de sécurité le 8 septembre — 10/10
- Un réglage non documenté permettait à un processus local sans privilège de rediriger la dictée de Muse — 8/10 (code public, presse concordante, reconnu par Meta ; pas de reproduction nommée)
- Cette redirection permettait de récupérer le jeton d'authentification et d'hériter des accès de l'agent (fichiers, photos, iPhone lié) — 6/10 (démonstrations et déclarations du chercheur, non reproduites)
- Meta a publié un correctif — 7/10 (déclaration de Meta relayée par Techmeme, The Verge non lu directement)
- Le correctif ferme la faille — 4/10 (parole de Meta, non vérifiée)
- « Muse peut devenir la backdoor ultime » / « risque pratique minimal » — qualifications de parties intéressées, non notées

## Pourquoi 7/10 ?

Le mécanisme est décrit avec précision, son code de démonstration est public et l'éditeur l'a reconnu en corrigeant, ce qui suffit à établir le fait central ; il manque une reproduction par un tiers nommé, les deux articles de référence n'ont pas pu être lus directement, et l'étendue exacte de ce que le jeton permettait n'est connue que par le chercheur.

## Ce qui ferait bouger la note

À la hausse : reproduction publiée par un chercheur ou un média sans lien avec les parties ; analyse du correctif ; attribution d'un CVE ; confirmation par Meta ou par le chercheur que la version corrigée ferme le chemin d'attaque. À la baisse : démonstration que le jeton ne donnait pas les accès décrits, ou que le réglage n'était modifiable que dans des conditions particulières.

## Sources

- **Source primaire** — [pwardle/not-a-mused, outil de démonstration (GitHub)](https://github.com/pwardle/not-a-mused)
- **Partie intéressée** — [Meta AI Research, « How We Built Safety Into Muse », 8 septembre 2026](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)
- **Indépendante** — [The Register, « Meta Muse AI app flaw lets local malware redirect dictation traffic », 21 septembre 2026](https://www.theregister.com/ai-and-ml/2026/09/21/meta-muse-ai-app-flaw-lets-local-malware-redirect-dictation-traffic/5297980)
- **Indépendante** — [The Hacker News, « One Hidden Meta Muse Setting Could Let Attackers Turn the AI Assistant Into a Backdoor », 22 septembre 2026](https://thehackernews.com/2026/09/one-hidden-meta-muse-setting-could-let.html)
- **Partie intéressée (éditeur de sécurité)** — [Malwarebytes, « Meta's Muse AI assistant has a zero-day that can turn it into a Mac backdoor », 22 septembre 2026](https://www.malwarebytes.com/blog/bugs/2026/09/metas-muse-ai-assistant-has-a-zero-day-that-can-turn-it-into-a-mac-backdoor)
- **Indépendante** — [RuntimeWire, « Meta's Muse flaw lets Mac malware reach linked iPhones, researcher says », 21 septembre 2026](https://runtimewire.com/article/meta-muse-mac-flaw-linked-iphone-access)
- **Indépendante** — [iTnews, « Security researcher says don't install Meta's Muse AI assistant », 22 septembre 2026](https://www.itnews.com.au/news/security-researcher-says-dont-install-metas-muse-ai-assistant-629088)
- **Indépendante (non lue directement, citée via Techmeme)** — [Ars Technica, Dan Goodin, faille de Muse et déclaration de Meta](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day) ; [Techmeme, 22 septembre 2026, 7 h 15](https://www.techmeme.com/260922/p14)
- **Indépendante (non lue directement, reprise)** — [The Verge, « Meta patches Muse exploit that let attackers control the AI agent », 22 septembre 2026](https://www.theverge.com/tech/998679/meta-muse-patch-zero-day-exploit-ai-agent) ; [reprise par ua.news](https://ua.news/en/technologies/meta-usunula-vrazlivist-muse-shcho-dozvoliala-kontroliuvati-shi-agenta-the-verge)
- **Indépendante (contexte)** — [9to5Mac, lancement de Muse pour Mac, 17 septembre 2026](https://9to5mac.com/2026/09/17/meta-ai-launches-muse-personal-agent-including-a-new-mobile-app-for-iphone/) ; [Unite.AI, accès demandés par l'application Mac](https://www.unite.ai/meta-launches-muse-mac-app-with-file-messages-and-calendar-access/)
