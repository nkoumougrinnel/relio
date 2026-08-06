# 7 Illustrations

## Présence d’illustrations dans le dossier fourni
Après examen du répertoire `docs/`, aucun fichier d’illustration indépendante (svg, png, jpg) n’a été trouvé en dehors des dossiers `brouillon`, `logo` et `maquettes`. Les maquettes fournies sont des captures d’écran d’interface et ne contiennent pas d’illustrations isolées pouvant être réutilisées comme assets graphiques.

## Style observé dans les maquettes
Bien que aucune illustration dédiée ne soit disponible, les maquettes montrent un certain style graphique qui peut servir de référence pour d’éventuelles illustrations futures (onboarding, états vides, contenus promotionnels) :

- **Trait linéaire** : les éléments décoratifs (ex. : icônes de catégorie) utilisent un trait de largeur uniforme, similaire aux icônes outlined.
- **Couleurs plates** : les couleurs sont appliquées en aplats sans dégradés visibles (bleu primaire, jaune accent, gris neutre).
- **Formes simples** : les silhouettes sont géométriques ou légèrement arrondies, évitant les détails excessifs.
- **Espace négatif** : bonne utilisation de l’espace blanc autour des éléments pour garantir la lisibilité.
- **Perspective plate** : aucune utilisation de perspective 3D ou d’ombrage complexe ; tout est en vue orthogonale ou plat.

## Recommandations pour la création d’illustrations futures
Si le besoin d’illustrations se manifeste (ex. : écrans d’onboarding vide, illustrations de succès, storytelling), suivre les directives ci-dessous afin de maintenir la cohérence avec l’identité visuelle de Relio :

### Style
- **Linéaire et plat** : privilégier des traits de largeur constante (2 px pour une base de 24 px) et des aplats de couleur.
- **Palette de couleurs** : utiliser exclusivement les couleurs définies dans la section 3 (Palette de couleurs). Limiter soi-même à deux ou trois couleurs par illustration afin de ne pas surcharger visuellement.
- **Niveau de détail** : garder les formes simples et lisibles même à petite taille (ex. : 96 px de hauteur). Éviter les textures, les ombres portées ou les détails minutieux.
- **Arrondi** : appliquer un rayon d’arrondi de 2–4 px aux coins des formes lorsque cela convient (ex. : bulles, cartes).
- **Espace intérieur** : maintenir une marge d’au moins 10 % de la taille de l’illustration entre les éléments les plus externes et le bord du viewport.

### Formats recommandés
- **SVG** : format privilégié pour sa scalabilité et sa capacité à être estilé via CSS ou JS (remplissage dynamique de couleur).
- **PNG** : uniquement pour des cas particuliers où le SVG n’est pas supporté, avec export en arrière‑plan transparent et résolution minimale de 2× la taille d’affichage prévue.

### Utilisation
- **États vides** : illustrer l’absence de données avec une illustration amicale accompagnée d’un texte d’incitation à l’action.
- **Onboarding** : utiliser des illustrations séquenceelles pour expliquer le fonctionnement du produit (expression du problème → attribution → paiement → évaluation).
- **Messages d’erreur** : accompagner les messages d’erreur d’une illustration légère (ex. : nuage avec éclair) pour réduire la tension.
- **Contenu marketing** : respecter la même ligne directrice afin que le matériel promotionnel soit immédiatement reconnaissable comme appartenant à Relio.

### Bonnes pratiques
- Toujours fournir une version **accessible** : ajouter une description détaillée (title/desc dans SVG, alt text dans PNG) pour les lecteurs d’écran.
- Éviter d’utiliser du texte intégré dans l’image qui serait difficile à localiser ; préférer superposer du texte HTML/CSS par-dessus l’illustration lorsqu’il doit être traduit.
- Garder les illustrations légères en termes de poids de fichier (< 15 ko SVG optimisé) pour ne pas impacter les performances de lancement.

### Mauvaises pratiques
- Utiliser des illustrations détaillées de style réaliste ou 3D qui jurent avec l’interface plate et linéaire.
- Appliquer des dégradés complexes ou des textures qui augmentent le poids et réduisent la lisibilité.
- Mélanger plusieurs styles d’illustration dans le même écran (ex. : une icône outline avec une illustration réaliste).
- Oublier d’exporter les arrière‑plans transparents, provoquant des rectangles blancs indésirables sur des fonds colorés.

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : aucun fichier d’illustration source n’a été fourni dans le projet.
> 
> **Recommandation** : créer une bibliothèque d’illustrations dédiée (format SVG) basée sur le style linéaire et plat observé dans les maquettes, en utilisant exclusivement les couleurs de la palette définie. Commencer par les cas d’utilisation les plus courants (état vide, onboarding, succès, erreur) et faire valider chaque illustration par l’équipe produit avant intégration.
