# 14 Bibliothèque Figma

Ce chapitre décrit l’organisation recommandée d’un fichier Figma destiné à servir de bibliothèque de design system pour Relio. Une bonne structure permet aux designers de trouver rapidement les éléments, aux développeurs d’inspecter les propriétés et aux équipes de maintenir la cohérence entre design et code.

## Structure générale du fichier Figma

Un fichier Figma typique pour un design system comprend les sections suivantes, présentées sous forme de **pages** (onglets en bas de l’écran) :

1. **Welcome / Documentation** – Page d’accueil avec aperçu, liens, notes de version.
2. **Styles** – Définit les styles de texte, de couleur, d’effet (ombre, blur) et de grille.
3. **Variables** (si utilisation de la fonctionnalité Variables de Figma) – Tokens de couleur, espacement, rayon, etc.
4. **Assets** – Contient les icônes, illustrations, images et autres éléments graphiques réutilisables.
5. **Components** – Bibliothèque principale de composants, organisée par sous‑categories et utilisant les fonctionnalités **Variants** et **Auto Layout**.
6. **Patterns** (optionnel) – Exemples d’assemblages de composants (formules, cartes complexes, écrans types).
7. **Templates** (optionnel) – Écran complet ou partie d’écran réutilisable (ex. : formulaire de connexion, liste de missions).
8. **Changes Log** – Journal des modifications apportées au fichier (ajouts, suppressions, mises à jour).

Chaque page doit être clairement nommée et, si nécessaire, divisée en sections à l’aide de **frames** ou de **groups**.

## Page 1 : Welcome / Documentation
- **Contenu** :
  - Titre du fichier : `Relio Design System – vX.Y.Z`.
  - Description brève du design system et de sa portée.
  - Liens vers la documentation en ligne (ex. : Notion, Confluence, Storybook).
  - Notes de version (what’s new, bug fixes, breaking changes).
  - Règles de base du fichier (ne pas modifier directement les composants de la bibliothèque, créer des instances dans les fichiers de produit).
  - Contact du responsable du design system.
- **Disposition** : Utiliser un cadre centré avec un texte bien lisible, éventuellement un logo en haut.

## Page 2 : Styles
Organiser les styles par type, en utilisant des sections ou des groupes clairement nommés.

### Styles de texte (Text Styles)
- Nommer suivant la hiérarchie typographique définie au chapitre 4.
- Exemples de noms :
  - `Heading / Display Large`
  - `Heading / Heading Medium`
  - `Body / Body Large`
  - `Label / Label Medium`
  - `Caption / Caption`
- Régler la famille de police, la taille, le poids, la hauteur de ligne et l’interlettrage selon les tokens.
- Utiliser le même nom que le token lorsqu’il existe un équivalent direct (ex. : `fontSize.titleMedium`).

### Styles de couleur (Color Styles)
- Créer un style pour chaque couleur de la palette (section 3) ainsi que pour les variantes d’état (ex. : `color.primary`, `color.onPrimary`).
- Noms recommandés :
  - `Color / Primary`
  - `Color / Secondary`
  - `Color / Success`
  - `Color / Error`
  - `Color / Warning`
  - `Color / Info`
  - `Color / Background`
  - `Color / Surface`
  - `Color / On Background`
  - `Color / On Surface`
  - `Color / Disabled`
  - `Color / Placeholder`
- Optionnel : créer des styles pour les combinaisons fréquemment utilisées (ex. : `Color / Primary On Background`).

### Styles d’effet (Effect Styles)
- Regrouper les ombres et les effets de flou définis au chapitre 12.
- Exemples de noms :
  - `Shadow / Level 1`
  - `Shadow / Level 2`
  - `Shadow / Level 3`
  - `Shadow / Level 4`
  - `Blur / Background` (pour le flou derrière les modaux)
- Définir les valeurs de `offset X/Y`, `blur radius`, `spread` et `opacité` conformément aux tokens `shadow.levelN`.

### Styles de grille (Layout Grid)
- Définir les grilles de colonnes utilisées pour les layouts responsives (ex. : 12‑column grid avec gouttière de 24 px).
- Noms : `Grid / 12col md`, `Grid / 6col lg`, etc.
- Inclure les marges extérieure si elles font partie de la grille.

## Page 3 : Variables (Facultatif – si la version de Figma utilisée le supporte)
Figma permet désormais de définir des **variables** (tokens) pouvant être référencés dans les styles et les composants.
- Créer quatre collections de variables : `Colors`, `Spacing`, `Radius`, `Typography`.
- Chaque variable porte un nom correspondant aux tokens du chapitre 12.
- Exemple :
  - Collection `Colors` : variable `primary` avec valeur `#0053F3`.
  - Collection `Spacing` : variable `m` avec valeur `16`.
  - Collection `Radius` : variable `m` avec valeur `8`.
  - Collection `Typography` : variable `fontSizeTitleMedium` avec valeur `16`.
- Utiliser ces variables lors de la création des styles afin que toute modification du token se répercute automatiquement.

## Page 4 : Assets
Organiser les fichiers graphiques importés (icônes, illustrations, images) en sous‑dossiers ou en frames clairement nommés.

### Icônes
- Créer un frame nommé `Icons / Action`, `Icons / Navigation`, `Icons / Alert`, etc.
- Chaque icône doit être un **vectoriel** (SVG importé ou tracé directement dans Figma) afin de pouvoir changer sa couleur via les remplissages.
- Nommer chaque icône suivant la convention du chapitre 13 (ex. : `icone_search`, `icone_menu`, `icone_check`).
- Garder une taille de base de 24 × 24 px (viewport) avec un padding interne de 2 px pour éviter le rognage au redimensionnement.

### Illustrations
- Frame `Illustrations / Onboarding`, `Illustrations / Empty States`, `Illustrations / Success`, etc.
- Utiliser des illustrations en style linéaire et plat (voir chapitre 7).
- Nommer suivant la convention : `illustration_onboarding_welcome`, `illustration_etat_vide_missions`, etc.
- S’assurer que l’arrière‑plan est transparent (ou blanc si destiné à être placé sur un fond spécifique).

### Images raster
- Frame `Images / Logos`, `Images / Photos`, `Images / Banner`.
- Nommer suivant la convention du chapitre 13 (ex. : `logo_app_vertical`, `banner_promo_noel`).
- Indiquer éventuellement la densité dans le nom si plusieurs versions sont fournies (ex. : `logo_app_vertical_2x.png`).

## Page 5 : Components (Bibliothèque principale)
C’est le cœur du fichier. Utiliser les fonctionnalités **Components**, **Variants** et **Auto Layout** afin de créer des composants réductibles et facilement personnalisables.

### Organisation par sous‑ catégories
Créer des frames ou des groupes pour chaque famille de composants :

- `Buttons`
- `Text Fields`
- `Cards`
- `Avatars`
- `Badges`
- `Notifications`
- `Bottom Navigation`
- `Top Bar / App Bar`
- `Modals / Dialogues`
- `Lists`
- `Loaders`
- `Steppers`
- `QR Code`
- `Switches / Checkboxes / Radios`
- `Chips / Tags`
- `Tooltips`
- etc.

### Création des composants
Pour chaque composant :

1. **Créer le composant de base** (sélectionner les éléments → clic droit → `Create component`).
2. **Définir les variantes** :
   - Utiliser le panneau `Properties` pour ajouter des propriétés variantes (ex. : `variant` avec valeurs `primary`, `secondary`, `outline`, `text`).
   - Alternativement, créer des variantes manuellement en dupliquant le composant et en modifiant les propriétés (couleur, état, icône, texte).
   - Nommer chaque variante clairement (ex. : `Button / Primary`, `Button / Secondary`, `Button / Outline`).
3. **Configurer l’Auto Layout** :
   - Activer l’Auto Layout sur le cadre principal du composant afin que le padding, l’espacement entre enfants et l’alignement soient réglables via des propriétés.
   - Définir le direction (vertical ou horizontal), l’alignement (packed, space between), l’espace entre items et le padding autour.
   - Exemple : un bouton avec Auto Layout horizontal, padding 12 px horizontal et 8 px vertical, espace entre icône et texte de 8 px.
4. **Définir les états** :
   - Utiliser la propriété `state` (ou créer une variante dédiée) pour les états `normal`, `pressed`, `focused`, `hovered`, `disabled`, `loading`, `success`, `error`.
   - Chaque état doit appliquer les overlays, les changements de couleur et les éventuelles modifications de texte ou d’icône comme décrit au chapitre 9.
   - Si le nombre d’états devient important, envisager de créer un composant « state‑agnétique » qui accepte une prop `state` et applique les changements via des conditionnels (dans le code) ; en Figma, on peut simplement montrer les états comme des variantes séparées.
5. **Définir les valeurs par défaut** :
   - Sélectionner la variante qui représente l’état normal et la définir comme `Default variant` dans le panneau du composant.
   - Cela permet lors de l’instance du composant d’obtenir directement l’état attendu.
6. **Ajouter une description** :
   - Dans le panneau du composant, remplir le champ `Description` avec un résumé du rôle, des variantes clés et des consignes d’utilisation (peut être copié depuis le chapitre 8).
   - Ajouter des liens vers la documentation en ligne si disponible.

### Utilisation des propriétés personnalisées (Custom Properties)
Figma permet d’ajouter des propriétés de type `boolean`, `instance` (pour échanger un icône), `enum` (pour choisir une variante) ou `string`.
- Exemple : propriété `showIcon` de type boolean pour afficher ou masquer une icône à gauche du bouton.
- Exemple : propriété `icon` de type instance permettant de choisir parmi un ensemble d’icônes prédéfinies (utile pour les boutons icône uniquement).
- Exemple : propriété `label` de type string pour permettre de changer le texte sans détacher l’instance.

### Documentation inline
- Utiliser des **text notes** placés près du composant pour expliquer des points particuliers (ex. : « Le rayon de bordure est de 8 px pour tous les boutons interactifs »).
- Créer une section `Docs` dans chaque frame de composant contenant un texte détaillé si nécessaire.

## Page 6 : Patterns (Optionnel)
Regrouper des assemblages de composants qui représentent des schémas récurrents mais qui ne méritent pas forcément un composant dédié.
- Exemples :
  - `Pattern / Login Form` (champ email, champ mot de passe, bouton se connecter).
  - `Pattern / Mission Card` (avatar, nom, métier, distance, boutons accepter/refuser).
  - `Pattern / Empty State` (illustration, texte d’incitation, bouton d’action primaire).
- Chaque pattern doit être constitué d’instances de composants de la bibliothèque, ainsi que des textes et des images éventuels.
- Nommer clairement et fournir une description brève de l’usage prévu.

## Page 7 : Templates (Optionnel)
Écrans complets ou grandes parties d’écran qui servent de point de départ pour la conception de nouvelles fonctionnalités.
- Exemples :
  - `Template / Écran d’accueil` (barre de recherche, catégories rapides, bouton devenir prestataire).
  - `Template / Liste des missions` (en-tête, liste de cartes mission, bouton de rechargement).
  - `Template / Profil prestataire` (en-tête, onglets, statistiques, liste de missions).
- Ces templates utilisent exclusivement des instances de composants de la bibliothèque, ainsi que des textes et images spécifiques au contenu.
- Ils doivent être mis à jour lorsqu’un composant de la bibliothèque change afin de garantir qu’ils restent fidèles.

## Page 8 : Changes Log
- Un simple tableau ou une liste de notes récapitulant les modifications apportées au fichier à chaque version.
- Colonnes : `Version`, `Date`, `Auteur`, `Description des changements` (ajout de composant, modification de token, correction de bug, etc.).
- Exemple :
  - `v1.0.0 – 2026-08-06 – Alice – Création initiale du design system basé sur les maquettes fournies`.

## Bonnes pratiques d’utilisation de la bibliothèque Figma
- Toujours créer une **instance** d’un composant de la bibliothèque plutôt que de copier-coller le composant lui‑dans‑le‑fichier de produit. Ainsi, les mises à jour du composant se répercutent automatiquement.
- Ne pas modifier directement les propriétés d’un composant de la bibliothèque (couleur, texte, taille) dans une instance sauf si l’intention est de créer une variante locale (dans ce cas, envisager de promouvoir la variante en tant que nouveau composant dans la bibliothèque si elle sera réutilisée).
- Utiliser la fonctionnalité `Swap instance` pour changer rapidement le variant d’un composant (ex. : passer d’un bouton primaire à un secondaire).
- Activer et utiliser les **styles** et **variables** définis afin que les changements de design se propagent sans avoir à sélectionner chaque élément manuellement.
- Garder la bibliothèque à jour : supprimer les composants obsolètes, ajouter les nouveaux, réviser les descriptions après chaque itération.
- Partager la bibliothèque avec l’équipe de design via les bibliothèques Figma (clic sur `Assets` → `Bibliothèques` → activer la bibliothèque Relio).
- Dans les fichiers de produit, désactiver la bibliothèque temporairement si l’on doit expérimenter des variantes qui ne seront pas intégrées.

## Mauvaises pratiques à éviter
- Dupliquer un composant de la bibliothèque dans un fichier de produit puis le modifier indépendamment (cela crée une divergence difficile à suivre).
- Laisser des éléments « orphelins » (groupes ou frames non nommés) dans les pages, rendant la navigation confuse.
- Modifier directement les styles de couleur ou de texte dans un instance sans mettre à jour le token source (cela crée une incohérence).
- Nommer les frames de façon générique (`Frame 1`, `Frame 2`) rendant impossible la recherche d’un élément spécifique.
- Oublier de détacher une instance lorsqu’on a besoin de faire une modification qui doit rester spécifique à cet endroit (dans ce cas, penser à créer un nouveau composant dans la bibliothèque si la variante sera réutilisée).

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : structure exacte du fichier Figma fourni (si un fichier Figma existait, on pourrait décrire précisément les pages, les groupes et les noms utilisés). 
> 
> **Recommandation** : suivre l’organisation ci‑dessus comme point de départ, puis l’adapter en fonction des besoins spécifiques de l’équipe et de la taille du projet. En l’absence de fichier Figma de référence, constituer progressivement la bibliothèque en ajoutant les pages et les éléments décrits ci‑dessus, puis faire valider l’organisation par l’ensemble de l’équipe design lors d’une revue de mise en place.
