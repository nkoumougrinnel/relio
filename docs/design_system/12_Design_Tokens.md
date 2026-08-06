# 12 Tokens de Design

Les tokens de design sont les variables de base qui définissent les propriétés visuelles et d’interaction du système. Ils permettent une mise à jour centralisée et une cohérence entre les plateformes (Android, iOS, web). Les valeurs ci‑dessous sont exprimées dans les unités natives de chaque plateforme, mais peuvent être traduites facilement.

## 12.1 Couleurs (Color)

| Token | Valeur (Hex) | Description |
|-------|--------------|-------------|
| `color.primary` | `#0053F3` | Bleu primaire – boutons principaux, liens actifs |
| `color.secondary` | `#FFB300` | Jaune accent – boutons secondaires, surbrillages |
| `color.success` | `#30B26C` | Vert succès – états validés, confirmations |
| `color.error` | `#D32F2F` | Rouge erreur – états d’erreur, validation échouée |
| `color.warning` | `#FFA000` | Amber warning – alertes d’attention |
| `color.info` | `#0288D1` | Bleu info – infos, aide, liens secondaires |
| `color.background` | `#FFFFFF` | Fond d’écran principal |
| `color.surface` | `#FAFAFA` | Surface des cartes, feuilles, modaux |
| `color.surfaceVariant` | `#E0E0E0` | Surface légèrement surélevée |
| `color.onBackground` | `#212121` | Texte principal sur fond clair |
| `color.onSurface` | `#212121` | Texte sur surface |
| `color.onSurfaceVariant` | `#424242` | Texte sur surface variante |
| `color.disabled` | `#BDBDBD` | Gris moyen pour états désactivés |
| `color.placeholder` | `#9E9E9E` | Texte de placeholder |
| `color.border` | `#E0E0E0` | Bordure par défaut |
| `color.borderVariant` | `#BDBDBD` | Bordure accentuée |
| `color.scrim` | `#000000CC` | Overlay sombre pour modaux (opacity 0.8) |
| `color.highlight` | `#FFFF0044` | Surbrillance sélectionnée (optionnel) |

## 12.2 Espacements (Spacing)

Tous les espacements sont des multiples de 4 px. Les valeurs ci‑dessous sont en pixels (px) ; convertir en `dp` (Android), `pt` (iOS) ou garder en `px` (web) selon la plateforme.

| Token | Valeur (px) | Utilisation typique |
|-------|-------------|----------------------|
| `spacing.xxxs` | 2 | Rare, utilisé pour ajustements fins (ex. : offset d’icône) |
| `spacing.xxs` | 4 | Espacement très petit (icône dans bouton, espace entre texte et icône) |
| `spacing.xs` | 8 | Padding minimum, espace entre éléments liés |
| `spacing.s` | 12 | Espacement standard entre éléments non liés dans un groupe |
| `spacing.m` | 16 | Padding habituel des cartes, marges internes |
| `spacing.l` | 20 | Espacement entre sections distinctes |
| `spacing.xl` | 24 | Grande marge ou padding de section |
| `spacing.xxl` | 28 | Espacement entre blocs de contenu majeur |
| `spacing.xxxl` | 32 | Padding de fenêtre ou de modal externe |
| `spacing.xxxxl` | 36 | Espacement entre sections pleine largeur |
| `spacing.xxxxl` | 40 | Marge extérieure importante |
| `spacing.xxxxxl` | 44 | Rare, séparateur visuel |
| `spacing.xxxxxx l` | 48 | Espacement entre panneaux latéraux et contenu principal |
| `spacing.xxxxxxx l` | 56 | Padding de grande zone (formulaire pleine largeur) |
| `spacing.xxxxxxxx l` | 64 | Marge de contenu sur grands écrans (tablet/desktop) |
| `spacing.xxxxxxxxx l` | 72 | Espacement entre blocs de données sur desktop |
| `spacing.xxxxxxxxxxl` | 80 | Marge de contenu sur très grands écrans |
| `spacing.xxxxxxxxxxx l` | 96 | Padding de section hero ou pleine largeur |

> En pratique, on utilise principalement les tokens `spacing.xs` (8), `spacing.s` (12), `spacing.m` (16), `spacing.l` (20), `spacing.xl` (24), `spacing.xxxl` (32), `spacing.xxxxl` (36) et `spacing.xxxxxx l` (48).

## 12.3 Rayons (Radius)

| Token | Valeur (px) | Utilisation |
|-------|-------------|-------------|
| `radius.none` | 0 | Angles vifs (rare) |
| `radius.xxs` | 2 | Petits coins (badge, pointe) |
| `radius.xs` | 4 | Champs, boutons légers |
| `radius.s` | 6 | Boutons standards, entrées |
| `radius.m` | 8 | Boutons principaux, cartes, champs texte (valeur courante) |
| `radius.l` | 12 | Cartes elevées, modaux, feuilles |
| `radius.xl` | 16 | Modaux grands, panneaux |
| `radius.xxl` | 24 | Éléments très arrondis (ex. : bouton circulaire grand) |
| `radius.circle` | 50 % | Cercle complet (avatar, badge rond) |

## 12.4 Élévation (Elevation) et Ombres (Shadow)

### Android (dp)
| Token | Élévation (dp) | Description |
|-------|----------------|-------------|
| `elevation.level0` | 0 | Aucun relief |
| `elevation.level1` | 1 | Ombre très légère |
| `elevation.level2` | 2 | Ombre standard (bouton, carte) |
| `elevation.level3` | 4 | Carte elevée, feuille |
| `elevation.level4` | 8 | Modal, fenêtre flottante |
| `elevation.level6` | 12 | Pop‑up, menu |
| `elevation.level8 | 16 | Dialogue large, panneau persistant |
| `elevation.level12` | 24 | Élévation importante (ex. : flottant fixe) |

### iOS (points) – valeurs approximatives
| Token | Rayon (pt) | Opacité | Offset (x, y) |
|-------|------------|----------|---------------|
| `shadow.level1` | 2 | 0.15 | (0,1) |
| `shadow.level2` | 4 | 0.20 | (0,2) |
| `shadow.level3` | 6 | 0.25 | (0,4) |
| `shadow.level4` | 8 | 0.30 | (0,6) |

### Web (CSS) – classe d’ombre utilisable
```css
/* Level 1 */
.shadow-1 { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
/* Level 2 */
.shadow-2 { box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }
/* Level 3 */
.shadow-3 { box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); }
/* Level 4 */
.shadow-4 { box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); }
```
On peut associer un token `shadow.levelN` à la classe correspondante.

## 12.5 Typographie (Typography)

| Token | Valeur | Description |
|-------|--------|-------------|
| `fontFamily.android` | `Roboto` | Famille de police Android |
| `fontFamily.ios` | `SF Pro Display` (titres) / `SF Pro Text` (corps) | Famille iOS |
| `fontFamily.web` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | Famille web |
| `fontWeight.regular` | 400 | Poids régulier |
| `fontWeight.medium` | 500 | Poids moyen |
| `fontWeight.bold` | 700 | Poids gras |
| `fontSize.displayLarge` | 57px | Très grand titre |
| `fontSize.displayMedium` | 45px | Grand titre |
| `fontSize.displaySmall` | 36px | Titre de section |
| `fontSize.headlineLarge` | 32px | Titre de carte |
| `fontSize.headlineMedium` | 28px | Sous‑titre de carte |
| `fontSize.headlineSmall` | 24px | Titre de groupe |
| `fontSize.titleLarge` | 22px | Titre de bouton large |
| `fontSize.titleMedium` | 16px | Texte de bouton standard |
| `fontSize.titleSmall` | 14px | Légende, sous‑label |
| `fontSize.bodyLarge` | 16px | Corps de texte principal |
| `fontSize.bodyMedium` | 14px | Corps de texte secondaire |
| `fontSize.bodySmall` | 12px | Texte d’aide, caption |
| `fontSize.labelLarge` | 14px | Texte de bouton en majuscules |
| `fontSize.labelMedium` | 11px | Étiquette de champ condensé |
| `fontSize.labelSmall` | 10px | Très petite légende |
| `lineHeight.headline` | 1.2 | Hauteur de ligne pour titres |
| `lineHeight.body` | 1.4 | Hauteur de ligne pour corps de texte |
| `lineHeight.caption` | 1.3 | Hauteur de ligne pour légendes |
| `letterSpacing.normal` | 0 | Espacement entre lettres normal |
| `letterSpacing.uppercase` | 0.5px | Espacement supplémentaire pour texte en majuscules |

## 12.6 Animation et durée (Animation)

| Token | Valeur (ms) | Fonction d’atténuation courante | Utilisation |
|-------|-------------|--------------------------------|-------------|
| `duration.fast` | 50 | linéaire | Changements très rapides (ex. : ripple démarrage) |
| `duration.slow` | 100 | ease-out | Pression de bouton, bascule d’état |
| `duration.normal` | 200 | ease-out | Entrée/sortie de snackbar, changement d’onglet |
| `duration.moderate` | 250 | ease-out | Ouverture/fermeture de modal, dialogue |
| `duration.slow` | 300 | ease-out | Animation de liste (insertion/suppression) |
| `duration.latency` | 350 | ease-out | Effet de pression (ripple) complet |
| `duration.loading` | 1000 | linéaire | Rotation d’indicateur de chargement (vitesse) |

## 12.7 Opacité (Opacity)

| Token | Valeur | Utilisation |
|-------|--------|-------------|
| `opacity.none` | 0 | Totalement transparent |
| `opacity.low` | 0.08 | Overlay pressed sur fond clair |
| `opacity.medium` | 0.12 | Overlay focused ou pressed sur fond sombre |
| `opacity.disabled` | 0.38 | Texte et icônes désactivés |
| `opacity.placeholder` | 0.5 | Texte de placeholder |
| `opacity.scrim` | 0.5 | Fond sombre derrière modal/dialogue |
| `opacity.highlight` | 0.2 | Surbrillance sélectionnée (optionnel) |
| `opacity.full` | 1.0 | Opaque |

## 12.8 Bordure (Border)

| Token | Valeur (px) | Utilisation |
|-------|-------------|-------------|
| `border.width.none` | 0 | Aucune bordure |
| `border.width.xs` | 1 | Bordure fine (champ texte, entrée) |
| `border.width.s` | 2 | Bordure standard (bouton outlined, carte) |
| `border.width.m` | 3 | Bordure accentuée (optionnel) |
| `border.width.l` | 4 | Bordure lourde (rare) |
| `border.style.solid` | `solid` | Style de bordure par défaut |
| `border.style.dashed` | `dashed` | Bordure pointillée (optionnel) |
| `border.style.dotted` | `dotted` | Bordure ponctuée (rare) |

## 12.9 Z-index (Z-index)

| Token | Valeur | Utilisation |
|-------|--------|-------------|
| `zIndex.background` | 0 | Arrière‑plan, éléments décoratifs |
| `zIndex.content` | 1 | Contenu principal (texte, images) |
| `zIndex.floating` | 2 | Barres flottantes (ex. : FAB) |
| `zIndex.modal` | 3 | Modaux, dialogues, pop‑ups |
| `zIndex.toast` | 4 | Toasts, snackbar (au‑dessus des modaux) |
| `zIndex.system` | 5 | Éléments système (ex. : barre de statut, navigation gestuelle) |
| `zIndex.tooltip` | 6 | Info‑bulles, aide contextuelle |
| `zIndex.drag` | 7 | Élément en cours de glisser‑déposer (au‑dessus de tout) |

## Bonnes pratiques d’utilisation des tokens
- Toujours référencer un token plutôt qu’une valeur en dur dans le code ou les fichiers de style.
- Lorsque une valeur n’existe pas exactement dans la liste des tokens, choisir le token le plus proche et ajouter un commentaire expliquant l’écart (ex. : utiliser `spacing.l` (20 px) lorsqu’un design demande 22 px).
- Documenter toute déviation dans la spécification du composant afin de garantir la traçabilité.
- Utiliser des noms de tokens explicites et hiérarchisés (ex. : `color.borderVariant`) afin d’éviter les collisions.
- Mettre à jour les tokens de manière centralisée lorsqu’une décision de design change (ex. : modification du rayon de bordure de tous les boutons).

## Mauvaises pratiques
- Définir des valeurs « one‑off » directement dans les styles de composants sans passer par les tokens.
- Créer des tokens avec des noms ambigus ou redondants (ex. : `color.grey` vs `color.gray`).
- Ne pas convertir les tokens lors du passage d’une plateforme à l’autre (ex. : oublier de multiplier par la densité d’écran sur Android).
- Utiliser des tokens de couleur pour des états qui devraient être décrits par des overlays (ex. : définir un nouveau vert pour le succès au lieu d’utiliser l’état success avec overlay).

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : valeurs exactes de certains tokens (ex. : rayon de bordure utilisé dans les maquettes, élévation exacte des cartes, durées d’animation observées) provenant d’une mesure précise ou d’une spécification d’interaction. 
> 
> **Recommandation** : extraire ces valeurs à l’aide d’outils d’analyse de maquettes (plugins Figma « Measure », ou en exportant les maquettes en PDF et mesurant avec une règle pixel) puis ajuster les tokens ci‑dessus. En attendant, utiliser les valeurs proposées, qui sont conformes aux guidelines Material et iOS, et itérer après validation sur dispositif réel.
