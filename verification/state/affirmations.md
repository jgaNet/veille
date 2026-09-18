# Affirmations suivies

Mémoire anti-doublon du flux `verification`, régénérée par
`scripts/verif-record.mjs`. Chaque passage la lit avant de chercher.
Format : `- CLAIM_ID | note | statut | suivi | dernière vérification | affirmation`

Les fiches complètes vivent dans `verification/claims/` et ne sont jamais
supprimées. Cet index n'énumère que les affirmations encore utiles au
dédoublonnage : une affirmation `clos` en sort après 30 jours.
