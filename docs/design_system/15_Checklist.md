# 15 Checklist UI

Cette checklist doit être utilisée **avant de valider** un nouvel écran ou une modification importante d’une interface dans le produit Relio. Elle permet de s’assurer que l’écran respecte les règles du design system, les bonnes pratiques d’accessibilité et les attentes fonctionnelles décrites dans la Product & UX Bible.

## ��� Prérequis
- Avoir accès à la maquette haute fidélité (Figma, Sketch, Adobe XD) ou au prototype interactif.
- Disposer de la dernière version du design system (tokens, composants, styles).
- Prévoir un appareil réel ou un émulateur pour tester le rendu et l’interaction.

## �� Liste de vérification

| # | Domaine | Critère | Oui / Non | Commentaires / Preuve |
|---|---------|---------|-----------|-----------------------|
| 1 | **Général** | L’écran possède un titre clair et hiérarchisé (niveau de titre approprié). |   |   |
| 2 | **Général** | Toutes les textes utilisent les tailles de police définies dans la typographie (chapitre 4). |   |   |
| 3 | **Général** | Aucune taille de texte en dessous de 12 pt (équivalent 16 px) n’est utilisée pour du contenu lisible. |   |   |
| 4 | **Typographie** | Les poids de police (regular, medium, bold) respectent ceux définis (chapitre 4). |   |   |
| 5 | **Typographie** | L’interligne (line height) est conforme aux valeurs du tableau (1.2 pour titres, 1.4 pour corps, 1.3 pour légendes). |   |   |
| 6 | **Couleurs** | Toutes les couleurs utilisées proviennent de la palette définie (chapitre 3) ou sont des dérivés autorisés (overlays, états). |   |   |
| 7 | **Couleurs** | Le contraste texte/fond ≥ 4.5:1 pour le texte normal, ≥ 3:1 pour les textes grands et les éléments graphiques. |   |   |
| 8 | **Couleurs** | Aucun état ne repose uniquement sur la couleur (ex. : un bouton vert pour succès doit aussi avoir une icône ou un texte explicite). |   |   |
| 9 | **Espacements** | Toutes les marges, paddings, espacements entre éléments sont des multiples de 4 px (chapitre 5). |   |   |
| 10 | **Espacements** | Le padding interne des boutons est au moins 8 px vertical et 12 px horizontal (ou les valeurs définies dans les tokens). |   |   |
| 11 | **Espacements** | Les marges externes de l’écran respectent les valeurs recommandées pour le facteur de forme (mobile, tablette, web). |   |   |
| 12 | **Rayons** | Les rayons de bordure utilisés correspondent à ceux définis dans le tableau des tokens (chapitre 12) : 4 px, 8 px, 12 px, etc. |   |   |
| 13 | **Rayons** | Les boutons et champs texte utilisent un rayon de 8 px sauf indication contraire justifiée. |   |   |
| 14 | **Ombres / Élévation** | Les ombres appliquées correspondent aux niveaux définis (chapitre 12) : niveau 1 pour boutons, niveau 2 pour cartes, niveau 3 pour modaux, etc. |   |   |
| 15 | **Icônes** | Toutes les icônes proviennent de la bibliothèque d’icônes autorisée (chapitre 6) ou sont des vectoriels simples de même style. |   |   |
| 16 | **Icônes** | Chaque icône qui transmet une information possède une description textuelle (contentDescription / aria-label). |   |   |
| 17 | **État des composants** | Chaque composant interactif affiche correctement les états normal, pressed, focused, disabled, loading, success, error selon le contexte. |   |   |
| 18 | **État des composants** | Les états de chargement sont affichés dès qu’une opération asynchrone dépasse 500 ms. |   |   |
| 19 | **Accessibilité** | La zone tactile minimale de chaque élément interactif est ≥ 48 × 48 dp (Android) / 44 × 44 pt (iOS) / 48 × 48 px (web). |   |   |
| 20 | **Accessibilité** | L’ordre de tabulation suit une logique de lecture (de haut en bas, de gauche à droite). |   |   |
| 21 | **Accessibilité** | Les lecteurs d’écran annoncent les changements d’état importants (ex. : bouton désactivé, sélection d’onglet, message d’erreur). |   |   |
| 22 | **Accessibilité** | Aucune information n’est transmise uniquement par le son ; une alternative visuelle est présente. |   |   |
| 23 | **Responsive** | L’écran s’adapte aux différents points de rupture définis (chapitre 10) : xs, sm, md, lg, xl, xxl. |   |   |
| 24 | **Responsive** | Les zones sûres (safe areas) sont respectées : aucun contenu essentiel n’est placé sous les encoches, barres de statut ou gestes de navigation. |   |   |
| 25 | **Responsive** | En orientation paysage, la mise en page réorganise les éléments de façon logique (ex. : passage d’une colonne simple à une grille à deux colonnes). |   |   |
| 26 | **Composants** | Tous les composants utilisés sont des instances de la bibliothèque du design system (chapitre 8) ; aucun composant « one‑off » n’est présent sans justification. |   |   |
| 27 | **Composants** | Les variantes des composants (primaire, secondaire, outline, etc.) respectent les définitions du chapitre 8. |   |   |
| 28 | **Composants** | Les composants qui possèdent plusieurs états (bouton, champ texte, switch, etc.) montrent clairement ces états dans la maquette. |   |   |
| 29 | **Composants** | Les listes et les cartes utilisent les mêmes espacements, rayons et élévations définis dans les tokens. |   |   |
| 30 | **Composants** | Les champs de texte possèdent un label associé (pas uniquement un placeholder). |   |   |
| 31 | **Composants** | Les champs de saisie de mots de passe offrent une possibilité de basculer la visibilité (icône d’œil). |   |   |
| 32 | **Composants** | Les boutons d’action primaire sont limités à un seul par écran (ou clairement hiérarchisés lorsqu’il y en a plusieurs). |   |   |
| 33 | **Lisibilité** | Aucun texte n’est superposé sur une image ou un dégradé qui réduit le contraste en dessous du seuil requis. |   |   |
| 34 | **Lisibilité** | Les textes en majuscules sont réservés aux étiquettes courtes (boutons, onglets) et ne sont pas utilisés pour des phrases longues. |   |   |
| 35 | **Performance** | Les images utilisées sont aux dimensions appropriées et possèdent des versions @2x/@3x pour les densités d’écran élevées. |   |   |
| 36 | **Performance** | Les icônes et illustrations sont en format vectoriel (SVG) lorsque cela est possible, afin d’éviter le poids inutile. |   |   |
| 37 | **Documentation** | Tous les composants personnalisés (non présents dans la bibliothèque) sont documentés avec leur rôle, leurs variantes et leurs états. |   |   |
| 38 | **Documentation** | Les décisions de design qui s’écartent des tokens sont justifiées dans une colonne « Commentaires / Preuve » de cette checklist. |   |   |
| 39 | **Validation fonctionnelle** | L’écran respecte les parcours utilisateurs et les règles métier décrits dans la Product & UX Bible (chapitres 6‑9). |   |   |
| 40 | **Validation fonctionnelle** | Les états d’erreur et de vide sont présentés avec un texte d’incitation à l’action approprié. |   |   |

## ��� Instructions d’utilisation
1. Ouvrez la maquette ou le prototype à valider.
2. Parcourez chaque ligne de la checklist et indiquez **Oui** ou **Non** dans la colonne correspondante.
3. Pour chaque **Non**, apportez une explication dans la colonne « Commentaires / Preuve » et indiquez la mesure corrective nécessaire.
4. Une fois toutes les lignes remplies, si le nombre de **Non** est nul ou que les réserves sont mineures et justifiées, vous pouvez considérer l’écran comme prêt pour le développement.
5. Transmettez la checklist remplie au responsable du design system ou au lead développeur pour archivage et suivi des éventuelles actions correctives.

## ��� Bonnes pratiques
- Effectuer cette checklist **à chaque itération** de maquette (pas seulement à la version finale).
- Utiliser un outil de suivi (ex. : tableau partagé, feuille de calcul) pour conserver l’historique des validations.
- Intégrer la checklist dans votre processus de revue de design (ex. : avant la revue de paire, avant la présentation au produit).
- Encourager les développeurs à réaliser une vérification similaire lors de l’implémentation (vérifier que le code respecte les tokens et les composants de la bibliothèque).

## ��� Mauvaises pratiques à éviter
- Valider un écran uniquement sur l’aspect esthétique sans vérifier les règles de contraste, de taille de touche ou d’accessibilité.
- Supposer que les développeurs « sauront » appliquer les bons tokens sans preuve écrite dans la checklist.
- Laisser des éléments « à vérifier » en attente sans suivi clair (cela entraîne de la dette de design).
- Utiliser la checklist comme une simple formalité sans vraiment appliquer les corrections demandées.

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : résultats précis de tests d’accessibilité ou de contraste réalisés sur les maquettes fournies (nécessitent des outils ou des retours d’utilisateurs). 
> 
> **Recommandation** : utiliser cette checklist comme base et l’adapter au fil du projet en ajoutant des critères spécifiques découvertes lors des revues (ex. : vérification de l’animation de chargement, validation du comportement du geste de glisser‑déposer). En l’absence de données de test réelle, appliquer les critères ci‑dessus, qui représentent les meilleures pratiques du domaine, et itérer après chaque revue d’implémentation.
