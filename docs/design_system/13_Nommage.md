# 13 Convention de nommage

Une convention de nommage claire et cohérente facilite la recherche, la réutilisation et la maintenance des actifs de design et de code. Cette section décrit les règles à appliquer pour les différents types de fichiers et de noms utilisés dans le système de design Relio.

## Principes généraux
- Utiliser l’**anglais** ou le **français** de manière cohérente dans tout le projet (ici nous choisissons le français pour les noms de fichiers et de groupes, mais les noms de variables en code peuvent être en anglais selon les conventions du langage).
- Séparer les mots par un **tiret bas** (`_`) pour les fichiers et les groupes, et par un **tiret** (`-`) ou **camelCase** selon le contexte de code.
- Éviter les espaces, les caractères spéciaux (à part `_` et `-`) et les chiffres en début de nom.
- ��tre descriptif mais concis : le nom doit indiquer clairement le rôle ou le contenu sans être trop long.
- Utiliser la **singular** pour les éléments uniques (ex. : `button`) et le **pluriel** pour les collections (ex. : `icons`).

## 13.1 Composants (Components)
- **Format** : `nom_du_composant.vue` (pour les fichiers de composant Vue/React) ou `nom_du_composant.kt` / `swift` selon la plateforme.
- **Cas d’usage** : chaque composant UI réutilisable possède son propre fichier.
- **Exemples** :
  - `button.vue`
  - `text_field.vue`
  - `card.vue`
  - `avatar.vue`
  - `badge.vue`
  - `bottom_navigation.vue`
  - `modal.vue`
  - `tooltip.vue`
- **Variantes** : lorsqu’un composant possède plusieurs variantes, les nommer en ajoutant un descripteur après un tiret bas.
  - Exemple : `button_primary.vue`, `button_secondary.vue`, `button_outline.vue`.
  - Alternative : garder un seul fichier et gérer les variantes via des propriétés (prop `variant`), auquel cas le nom du composant reste générique.
- **États** : ne pas créer de fichiers séparés pour chaque état ; les états sont gérés dans le composant même (via des props ou des classes CSS).

## 13.2 Variables (Variables de style / tokens)
- **Format** : `nom_de_la_variable` en `snake_case` pour les fichiers de configuration (JSON, YAML, SCSS).
- **Exemples** :
  - `color.primary`
  - `spacing.m`
  - `radius.m`
  - `fontSize.titleMedium`
  - `duration.normal`
- **Fichiers de regroupement** : placer les variables liées dans un même fichier.
  - `tokens/color.json`
  - `tokens/spacing.json`
  - `tokens/radius.json`
  - `tokens/typography.json`
  - `tokens/animation.json`

## 13.3 Styles (Styles réutilisables, classes CSS)
- **Format** : utiliser le préfixe `sfx-` (style effect) ou simplement le nom descriptif en `kebab-case` pour les classes CSS, et `snake_case` pour les styles définis dans des fichiers de style natif (ex. : `style.xml` Android).
- **Exemples CSS** :
  - `.sfx-button-primary`
  - `.sfx-text-field`
  - `.sfx-card-elevated`
- **Exemples Android** (`style.xml`) :
  - `<style name="Widget.Relio.Button.Primary">`
  - `<style name="Widget.Relio.TextField.Outlined">`
- **Exemples iOS** (Swift) : utiliser des extensions ou des structs avec des noms en `UpperCamelCase` (ex. : `ReloButtonPrimaryStyle`).

## 13.4 Frames (Cadres dans Figma)
- **Format** : `Nom du cadre – Description` en `Title Case` avec des tirets pour séparer les sous‑sections.
- **Exemples** :
  - `Login – Écran d’accueil`
  - `Mission Card – État normal`
  - `Bottom Navigation – Icônes actifs`
  - `Modal – Confirmation de suppression`
- **Groupes** : imbriquer des cadres dans des groupes nommés de façon logique (ex. : `Group: Missions → Item: Card – Normal`).
- **Utilisation** : éviter les noms génériques comme `Frame 1`, `Frame 2`; chaque cadre doit être identifiable sans ouvrir le fichier.

## 13.5 Pages (Écrans complets)
- **Format** : `Nom de l’écran` en `Title Case`.
- **Exemples** :
  - `Accueil`
  - `Liste des Missions`
  - `Detail Mission`
  - `Profil Prestataire`
  - `Paramètres`
  - `Onboarding – Étape 1`
  - `Onboarding – Étape 2`
- **Lorsqu’un écran possède des variantes** (ex. : état vide, état d’erreur), ajouter un descripteur entre parenthèses ou après un tiret bas.
  - Exemples : `Liste des Missions (Vide)`, `Liste des Missions (Erreur)`, `Profil Prestataire (Édition)`.
- **Flux** : représenter le flux dans l’ordre de navigation dans le nom du fichier de prototype si pertinent (ex. : `Onboarding_01_Accueil.fig`, `Onboarding_02_Email.fig`).

## 13.6 Assets (Images, icônes, illustrations)
### Images raster (PNG, JPG, WebP)
- **Format** : `description_objet_contexte` en `snake_case`, avec indication de la taille ou du facteur d’échelle si nécessaire.
- **Exemples** :
  - `logo_app_vertical.png`
  - `icone_search.png`
  - `illustration_onboarding_1.png`
  - `avatar_placeholder.png`
  - `banner_promo_noel.jpg`
- **Échelle** : lorsqu’on fournit plusieurs densités, utiliser le suffixe `@2x`, `@3x` (iOS) ou `drawable-mdpi`, `drawable-hdpi`, etc. (Android). Le nom de base reste identique.
  - Exemple : `icone_search@2x.png`, `icone_search@3x.png`.

### Icônes vectorielles (SVG)
- **Format** : `nom_de_l_icone.svg` en `snake_case`.
- **Exemples** :
  - `icone_search.svg`
  - `icone_menu.svg`
  - `icone_check.svg`
  - `icone_warning.svg`
- **Catégorisation** : placer les icônes dans des dossiers selon leur fonction ou leur collection.
  - `icons/action/`
  - `icons/navigation/`
  - `icons/alert/`
  - `icons/avatar/`

### Illustrations (illustrations dédiées, onboarding, états vides)
- **Format** : `illustration_nom_contexte` en `snake_case`.
- **Exemples** :
  - `illustration_onboarding_bienvenue.svg`
  - `illustration_etat_vide_missions.svg`
  - `illustration_success_payment.svg`
  - `illustration_error_network.svg`
- **Organisation** : placer dans un dossier `illustrations/` avec sous‑dossiers si nécessaire (ex. : `illustrations/onboarding/`, `illustrations/empty_states/`).

## 13.7 Fichiers de projet (configuration, scripts, documentation)
- **Format** : utiliser des noms descriptifs en `snake_case` avec extension appropriée.
- **Exemples** :
  - `readme.md`
  - `design_system.md`
  - `tokens.json`
  - `styleguide.pdf`
  - `build.gradle`
  - `podfile`
  - `vite.config.js`
  - `netlify.toml`

## Bonnes pratiques de nommage
- ��tre **consistant** dans tout le projet : choisir une forme (snake_case, kebab-case, camelCase) et s’y tenir pour chaque type d’actif.
- Utiliser des **préfixes** pour indiquer l’appartenance à un sous‑système (ex. : `ui_` pour composants UI, `tok_` pour tokens, `ic_` pour icônes).
- Éviter les **abréviations obscures** qui ne sont pas immédiatement compréhensibles par un nouvel arrivant.
- Lorsqu’un nom devient trop long, envisager une **taxonomie** (ex. : `component/button/primary.vue` plutôt que `component_button_primary.vue` si la structure de dossiers le permet).
- Garder les noms en **lowercase** pour les fichiers afin d’éviter les problèmes de sensibilité à la casse sur certains systèmes de fichiers (Linux, certains serveurs web).

## Mauvaises pratiques à éviter
- Utiliser des noms génériques comme `new1.png`, `copy_of_icon.svg`, `style2.css`.
- Mélanger des conventions différentes dans le même répertoire (ex. : certains fichiers en `camelCase`, d’autres en `snake_case`).
- Donner le même nom à deux actifs différents situés dans des dossiers différents sans raison claire (risque de confusion lors de l’import).
- Utiliser des caractères spéciaux non supportés dans les URLs (ex. : espaces, accents) qui provoquent des problèmes lors du déploiement web.
- Nommer un composant d’après son emplacement plutôt que sa fonction (ex. : `header_left_button.vue` au lieu de `menu_button.vue`).

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : conventions de nommage exactes utilisées dans les maquettes Figma fournies (si un fichier Figma était disponible, on pourrait extraire les noms des calques et des frames). 
> 
> **Recommandation** : établir une convention de nommage dès le début du projet et l’appliquer à tous les actifs créés ou importés. En l’absence de spécifications figma, adopter les règles ci‑dessus, qui sont éprouvées dans l’industrie, et les faire valider par l’équipe de design lors de la revue initiale.
