# Journal des déclarations analysées

Journal anti-doublon des déclarations traitées par le flux
`presidentielle-2027-factcheck`, y compris celles qui n'ont donné lieu à aucune
publication. Il est tenu par les passages de veille, jamais par
`scripts/factcheck-record.mjs`.

## Un fichier par passage

Chaque passage écrit **un fichier neuf** et ne réécrit jamais un fichier
existant :

```
state/declarations-analysees/AAAA-MM-JJ/HH-MM.md
```

`AAAA-MM-JJ` et `HH-MM` sont la date et l'heure de Paris du passage. Le fichier
s'ouvre par `# Passage du AAAA-MM-JJ, HH h MM`, puis porte une ligne par
déclaration traitée, la date étant celle de la déclaration :

```
- AAAA-MM-JJ — Auteur (Parti) — contexte — URL — résultat
```

Un passage qui n'a rien trouvé écrit tout de même son fichier, avec sa ligne de
balayage : c'est ainsi que le passage suivant sait ce qui a déjà été regardé.

## Pourquoi cette découpe

Le journal tenait auparavant dans un fichier unique,
`state/declarations-analysees.md`. L'API GitHub ne met à jour un fichier qu'en
le renvoyant en entier ; à 87 kilo-octets, ce fichier n'était plus réécrivable
sans risque de le tronquer, et un passage a dû renoncer à s'y journaliser le
2026-09-20. Un fichier par passage pèse quelques kilo-octets, s'écrit d'un seul
coup et n'est plus jamais touché ensuite.

## Élagage

Supprimer les dossiers de jour vieux de plus de 30 jours, en bloc. Ne jamais
réécrire un fichier de passage pour en retirer des lignes.

## Archive

`state/declarations-analysees.md`, à côté de ce dossier, contient les passages
antérieurs à la mise en place de cette découpe, le 2026-09-20. Elle se lit — le
passage suivant y cherche les déclarations déjà traitées —, ne se modifie plus,
et se supprime en bloc une fois toutes ses lignes vieilles de plus de 30 jours,
soit à partir du 2026-10-21.
