# 10 Responsive

## Principes généraux
Le design de Relio doit s’adapter à une gamme d’appareils allant des smartphones compacts aux tablettes et aux écrans de bureau (pour le dashboard web). L’approche repose sur :

- Une **grille fluide** de base 4 px qui se traduit en unités dp/sp (Android) ou pt (iOS) et en pixels CSS (web).
- Des **points de rupture (breakpoints)** définis en largeur d’écran minimale pour ajuster l’affichage.
- La prise en compte des **zones sûres (safe areas)** afin d’éviter que le contenu ne soit masqué par les encoches, les barres de statut ou les indicateurs de geste.
- La gestion de l’**orientation** (portrait vs paysage) afin de réorganiser les éléments lorsqu’il y a plus d’espace horizontal.
- L’**adaptabilité du texte** (tailles scalables) pour respecter les préférences de taille de police de l’utilisateur.

## Breakpoints (largeur d’écran minimale)

| Nom | Largeur minimale | Utilisation typique |
|-----|------------------|---------------------|
| `xs` | 0 px | Téléphones très petits (ex. : iPhone SE, anciens Android) |
| `sm` | 576 px | Téléphones en paysage, petits tablets en portrait |
| `md` | 768 px | Tablettes en portrait, petits laptops |
| `lg` | 992 px | Tablettes en paysage, laptops, petits écrans desktop |
| `xl` | 1200 px | Monitors desktop plein écran, grands écrans |
| `xxl` | 1400 px | Écrans larges, configurations multi‑fenêtres |

> Ces valeurs suivent le système de breakpoints de Bootstrap 5, adapté pour garantir suffisamment de points de décision tout en restant simple.

## Règles d’application par plateforme

### Android (dp / sp)
- Utiliser `width` et `height` en `dp` pour les dimensions, `sp` pour les tailles de police afin de respecter les préférences de l’utilisateur.
- Dans les fichiers de layout (`XML`) ou Jetpack Compose, définir des ressources alternatives dans les dossiers `layout-sw600dp` (largeur minimale 600 dp) pour les tablets, `layout-sw720dp` pour les larges tablets, etc.
- Exemple : avoir un layout `res/layout/activity_main.xml` pour téléphone et `res/layout-sw600dp/activity_main.xml` pour tablette où l’on passe d’une colonne unique à une disposition en deux colonnes.

### iOS (pt)
- Utiliser les **size classes** : `Compact` vs `Regular` pour la largeur et la hauteur.
- En taille compacte (iPhone en portrait), afficher une navigation en barre inférieure (Bottom Navigation) et une pile de vues en plein écran.
- En taille régulière (iPad, ou iPhone en paysage avec certaines variantes), permettre une présentation en séparateur (UISplitViewController) avec un maître (liste) et un détail (contenu).
- Utiliser Auto Layout avec des contraintes qui s’ajustent selon le taille de la vue contenante.

### Web (CSS)
- Utiliser des **media queries** basées sur les breakpoints définis ci‑dessus.
- Exemple de structure CSS :

```css
/* Base - mobile first */
.container { padding: 16px; }

@media (min-width: 576px) { /* sm */
  .container { padding: 20px; }
}

@media (min-width: 768px) { /* md */
  .container { padding: 24px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; }
}

@media (min-width: 992px) { /* lg */
  .grid { grid-template-columns: 1fr 1fr 1fr; }
}

@media (min-width: 1200px) { /* xl */
  .container { padding: 32px; }
}
```

## Safe Areas (zones sûres)

### Android
- Utiliser les API `WindowInsets` pour obtenir les insets de la barre de statut, de la barre de navigation gestuelle et de l’encoche.
- Dans Jetpack Compose : `Modifier.padding(it.systemBars)` ou `Modifier.consumableWindowInsets`.
- Dans les vues XML : attribuer `android:fitsSystemWindows="true"` et gérer les paddings via `android:paddingTop` etc.

### iOS
- Utiliser le `safeAreaLayoutGuide` des `UIViewController` pour ancrer le contenu.
- En SwiftUI : `edgesIgnoringSafeArea(.all)` uniquement lorsque l’on veut que l’arrière‑plan déborde (ex. : couleur de fond), sinon respecter le guide.
- S’assurer que les barres de navigation personnalisées respectent le guide supérieur et que les tab bars respectent le guide inférieur.

### Web
- Sur mobile, le navigateur expose déjà la zone sûre via les variables d’environnement CSS :
  - `env(safe-area-inset-top)`
  - `env(safe-area-inset-right)`
  - `env(safe-area-inset-bottom)`
  - `env(safe-area-inset-left)`
- Exemple d’utilisation :

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
```

## Orientation

### Portrait vs Paysage
- **Portrait** : largeur < hauteur. Utilisé majoritairement en téléphone.
- **Paysage** : largeur > hauteur. Utilisé lors de la rotation du téléphone, sur tablets en mode paysage, et sur desktop.

#### Adaptations courantes
| Élément | Portrait | Paysage |
|---------|----------|---------|
| Navigation principale | Bottom Navigation (icônes + texte) | Navigation latérale (drawer) ou Top Bar avec onglets |
| Affichage des listes | Colonnes simples | Grille à deux ou trois colonnes |
| Formulaires | Champs empilés verticalement | Champs côte à côte (ex. : nom et prénom) |
| Cartes | Grande hauteur, largeur pleine | Hauteur réduite, largeur pouvant contenir plusieurs cartes côte à côte |
| Barre d’application | Titre centré, actions à droite | Titre à gauche, actions à droite, éventuellement menu déroulant |

#### Gestion de la rotation
- Sur Android : gérer `onConfigurationChanged` ou utiliser `ViewModel` qui survit à la rotation.
- Sur iOS : utiliser `viewWillTransition(to:with:)` ou la taille de la vue dans `UIViewController`.
- Sur web : écouter l’événement `window.resize` ou utiliser les media queries qui se déclenchent automatiquement au changement d’orientation.

## Typographie responsive
- Les tailles de police définies en `sp` (Android) ou `pt` (iOS) évoluent automatiquement avec les préférences de l’utilisateur.
- Sur web, utiliser `rem` basé sur la taille de racine (`html { font-size: 16px; }`) permettre un scaling relatif aux préférences du navigateur via la taille de base du navigateur.
- Éviter de fixer la taille de police en pixels absolus (`px`) sauf pour les icônes ou les éléments où la netteté est critique.

## Espacements responsive
- Les valeurs de spacing (marges, paddings) définies en multiples de 4 dp/pt peuvent être augmentées selon les breakpoints :
  - Ex. : padding de 16 px sur téléphone, 24 px sur tablette, 32 px sur desktop.
- Utiliser des tokens de spacing qui varient selon le breakpoint (ex. : `spacing.marginHorizontal.xs = 16`, `spacing.marginHorizontal.md = 24`).

## Bonnes pratiques
- Toujours commencer par une mise en page **mobile first** (styles de base pour les petits écrans) puis ajouter des règles pour les écrans plus larges.
- Tester sur une gamme réelle d’appareils : petits téléphones (�� 320 px largeur), téléphones standards (�� 360‑410 px), grandes phablettes (�� 420‑460 px), tablets portrait (�� 600‑800 px), tablets paysage (�� 800‑1280 px), écrans desktop (�� 1280 px+).
- Veiller à ce que le contenu essentiel reste accessible sans zoom ou défilement horizontal excessif.
- S’assurer que les zones interactives restent ≥ 48 dp même après adaptation (ex. : un bouton qui devient plus étroit en paysage doit rester au moins 48 dp de large).
- Utiliser des images vectorielles (SVG) ou des images multi‑résolution afin de garantir la netteté sur tous les densités d’écran.

## Mauvaises pratiques
- Supposer que tous les téléphones ont la même largeur et oublier les appareils à encoche ou à bordures arrondies.
- Fixer des largeurs en pixels absolus qui provoquent un débordement sur les écrans plus petits.
- Négliger l’orientation paysage lors de la conception d’écrans contenant des tableaux ou des formulaires complexes.
- Utiliser des pop‑ups ou des modaux qui dépassent la zone sûre sans tenir compte des barres de geste.
- Ignorer les préférences de taille de police de l’utilisateur, rendant le texte illisible pour ceux qui nécessitent un agrandissement.

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : valeurs exactes de breakpoints, paddings et marges observés dans les maquettes fournies pour différents formats d’écran (les maquettes montrent probablement uniquement une taille de référence, sans variantes paysage/tablette). 
> 
> **Recommandation** : établir un ensemble de maquettes de référence pour les principaux formats (mobile portrait, mobile paysage, tablet portrait, tablet desktop) afin de définir précisément les adaptations de layout. En attendant, appliquer les règles ci‑dessus, qui suivent les meilleures pratiques du secteur, et itérer après tests utilisateurs sur divers appareils.
