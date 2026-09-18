# Affirmations déjà vérifiées

Mémoire anti-doublon du flux `presidentielle-2027-factcheck`, régénérée par
`scripts/factcheck-record.mjs`. Chaque passage la lit avant de chercher.
Format : `- ID | verdict | note | premier auteur (parti) | occurrences | dernière occurrence | affirmation`

Une affirmation déjà listée n'est jamais republiée : une reprise, par le même
auteur ou par un autre, s'enregistre en réutilisant son `id`. Les fiches
complètes vivent dans `presidentielle-2027-factcheck/claims/` et ne sont jamais supprimées. Cet
index n'est pas élagué et n'est jamais agrégé par candidat ou par parti.
