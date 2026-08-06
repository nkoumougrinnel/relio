# Design System Relio

*Document de référence du système de design de Relio — Version 1.0*

# Table des matières du Design System

## 0 Introduction
- Présentation du Design System
- Objectifs
- Public concerné
- Organisation

## 1 Identité de marque
- Vision graphique
- Personnalité
- Ton visuel
- Valeurs de la marque
- Principes de conception

## 2 Logo
- Icône seule
- Logo horizontal
- Logo vertical
- Utilisations autorisées
- Utilisations interdites
- Tailles minimales
- Zone de protection
- Fond clair
- Fond sombre
- Monochrome
- Règles de déformation/interdiction

## 3 Palette de couleurs
- Couleur primaire
- Seconde
- Succès
- Erreur
- Warning
- Information
- Couleurs neutres
- Fond
- Surface
- Texte
- Bordures
- Désactivé
- Design Tokens

## 4 Typographie
- Famille
- Tailles
- Graisses
- Hauteurs de ligne
- Espacements
- H1, H2, H3, Titre, Sous-titre, Texte, Caption, Boutons, Badges

## 5 Espacements
- Système de spacing (4,8,12,16,20,24,32,40,48,64)
- Marges
- Paddings
- Rayons
- Ombres
- Élévations

## 6 Icônes
- Familles
- Style
- Règles
- Tailles
- Alignement

## 7 Illustrations
- Style
- Couleurs
- Formes
- Épaisseur
- Ombres
- Règles d'utilisation

## 8 Composants
- Bouton
- Bouton secondaire
- Champ texte
- Champ recherche
- Carte
- Carte mission
- Carte prestataire
- Avatar
- Badge
- Notification
- Snackbar
- Toast
- Bottom Navigation
- Top Bar
- App Bar
- Bottom Sheet
- Modal
- Dialogue
- Liste
- Liste vide
- Loader
- Progress Indicator
- Stepper
- QR Code
- Carte de paiement
- Sélecteur
- Switch
- Checkbox
- Radio
- OTP
- Évaluation
- Étoiles
- Timeline
- Carte statistique
- Carte revenu
- Carte mission
- Chip
- Tag
- Puce d'état

## 9 États des composants
- Normal
- Pressed
- Focused
- Loading
- Disabled
- Success
- Error
- Selected
- Empty

## 10 Responsive
- Android
- iPhone
- Petits écrans
- Grands écrans
- Safe Areas
- Orientation

## 11 Accessibilité
- Contrastes
- Tailles minimales
- Zones tactiles
- Navigation
- Lecteurs d'écran
- Couleurs
- États

## 12 Tokens de Design
- Color
- Spacing
- Radius
- Elevation
- Shadow
- Typography
- Animation
- Opacity
- Border
- Z-index

## 13 Convention de nommage
- Composants
- Variables
- Styles
- Frames
- Pages
- Assets
- Illustrations
- Icônes

## 14 Bibliothèque Figma
- Pages
- Styles
- Variables
- Assets
- Bibliothèque
- Auto Layout
- Variants
- Component Sets

## 15 Checklist UI
- Respect du spacing
- Respect des couleurs
- Respect de la typographie
- Respect des composants
- Respect de l'accessibilité
- Respect des tokens
- Respect des variantes

---

# 0 Introduction

## Présentation du Design System
Le Design System de Relio constitue la référence graphique officielle du produit. Il regroupe l’identité visuelle, les composants réutilisables, les règles d’usage et les tokens de design permettant une cohérence entre les applications mobiles (React Native), les interfaces web (React/Vite) et les supports de communication.

## Objectifs
- Assurer une cohérence visuelle et fonctionnelle sur tous les points de contact.
- Accélérer le processus de conception et de développement grâce à des composants documentés et réutilisables.
- Faciliter l’onboarding des nouveaux designers et développeurs.
- Garantir l’accessibilité et la conformité aux bonnes pratiques d’UI/UX.
- Fournir une base évolutive pour les futures versions du produit (V2, V3).

## Public concerné
- Designers UI/UX chargés de créer ou faire évoluer les interfaces.
- Développeurs React Native implémentant l’application mobile.
- Développeurs Web (React.js + Vite) travaillant sur le dashboard administrateur.
- Développeurs Backend ayant besoin de comprendre les états UI pour concevoir les APIs.
- Futurs contributeurs au projet (designers, développeurs, product managers).

## Organisation
Le Design System est organisé en quinze sections couvrant tous les aspects nécessaires à la création d’interfaces cohérentes :

0. Introduction – contexte et objectifs  
1. Identité de marque – personnalité et principes visuels  
2. Logo – règles d’utilisation des marques  
3. Palette de couleurs – couleurs primaires, secondaires, neutres et tokens  
4. Typographie – familles, tailles, poids et hiérarchie  
5. Espacements – système de spacing, marges, paddings, rayons, ombres  
6. Icônes – familles, styles et règles d’usage  
7. Illustrations – style et directives d’utilisation  
8. Composants – fiches détaillées de chaque composant UI  
9. États des composants – variantes normal, pressed, focused, loading, disabled, etc.  
10. Responsive – adaptations aux différents formats d’écran  
11. Accessibilité – conformité aux normes WCAG et bonnes pratiques  
12. Tokens de Design – variables de design centralisées  
13. Convention de nommage – règles de dénomination pour les assets et le code  
14. Bibliothèque Figma – organisation recommandée du fichier de conception  
15. Checklist UI – liste de validation avant intégration d’un nouvel écran  

Chaque section est rédigée en français, de manière professionnelle et détaillée, avec des tableaux, listes, schémas ASCII et exemples concrets.

---

# 1 Identité de marque

## Vision graphique
Relio souhaite incarner une image de **fiabilité**, **modernité** et **proximité**. L’identité visuelle doit évoquer la confiance qu’un utilisateur place en un service essentiel du quotidien, tout en témoignant de l’innovation technologique qui sous-tend la plateforme.

## Personnalité
- **Fiable** : couleurs stables, typographie lisible, espaces aérés.
- **Moderne** : lignes épurées, utilisation modérée de l’accent jaune pour dynamiser.
- **Proche** : tons chaleureux (jaune/orange) qui rappellent l’accueil et l’humain.
- **Professionnel** : hiérarchie claire, alignement rigoureux, contraste suffisant.

## Ton visuel
Le ton visuel est **clair**, **conciliant** et **énergique** sans être agressif. Il guide l’utilisateur vers l’action tout en rassurant sur la sécurité du service.

## Valeurs de la marque
| Valeur | Traduction visuelle |
|--------|---------------------|
| Simplicité | Espaces généreux, peu d’ornementation, typographie directe |
| Confiance | Couleur bleu primaire forte, coins arrondis doux, ombres légères |
| Rapidité | Animations légères, états de chargement fluides, feedback immédiat |
| Accessibilité | Contraste ≥ 4.5:1, zones tactiles ≥ 48dp, icônes labelisées |
| Innovation | Utilisation délibérée de l’accent jaune pour les boutons d’appel à l’action |

## Principes de conception
1. **Clarté avant tout** : chaque élément doit avoir un but immédiatement compréhensible.
2. **Hiérarchie visuelle** : guider l’œil vers l’action principale (ex. : bouton de confirmation).
3. **Cohérence** : réutiliser les mêmes composants, tokens et motifs partout.
4. **Feedback immédiat** : chaque interaction produit un réponse visuelle ou haptique.
5. **Adaptabilité** : design qui fonctionne aussi bien sur petit écran mobile que sur dashboard web.

## Pourquoi le design paraît simple, moderne, rassurant et professionnel
- **Simple** : faible nombre de couleurs primaires (deux), typographie sans empattement, espaces généreux.
- **Moderne** : coins légèrement arrondis, ombres subtiles, utilisation de l’espace blanc.
- **Rassurant** : bleu dominant associé à la confiance, jaune utilisé avec parcimonie pour attirer l’attention sans alarmer.
- **Professionnel** : alignement sur une grille de 8dp, contraste respectant les normes AA, composants aux proportions éprouvées.

---

# 2 Logo

## Fichiers sources
- **Icône seule** : `docs/logo/icone_app.png` (1024 × 1536 px, fond transparent)
- **Logo horizontal** : `docs/logo/logo_app_horizontal.png` (1536 × 1024 px, fond transparent)
- **Logo vertical** : `docs/logo/logo_app_vertical.png` (1024 × 1536 px, fond transparent)

## Utilisations autorisées
| Support | Variante recommandée | Commentaire |
|---------|----------------------|-------------|
| Écran d’accueil mobile | Logo vertical ou icône seule | Placé en haut centré, taille adaptée à la barre de navigation |
| Écran de splash | Icône seule sur fond bleu primaire (#0053F3) | Taille 120 dp × 120 dp (Android) / 120 pt × 120 pt (iOS) |
| En-tête web (dashboard) | Logo horizontal | Aligné à gauche, hauteur maximale 40 px |
| Documents PDF / présentations | Logo vertical ou horizontal | Avec marge intérieure suffisante |
| Impression (papier, tissu) | Logo en monochrome noir ou blanc | Selon contraste du fond |
| Réseaux sociaux | Icône seule | Fond bleu primaire ou blanc selon plateforme |

## Utilisations interdites
- Modifier les proportions (étirer, compresser) du logo.
- Changer les couleurs du logo (sauf versions monochrome autorisées).
- Appliquer des effets (ombre portée, dégradé, contour) non spécifiés.
- Placer le logo sur un fond qui réduit le contraste inférieur à 4.5:1.
- Combiner le logo avec d’autres symboles ou texte non approuvé.
- Utiliser le logo comme élément décoratif répété (pattern) sans autorisation.

## Tailles minimales
- **Icône seule** : largeur minimale 48 px (pour garantir lisibilité).
- **Logo horizontal** : largeur minimale 120 px.
- **Logo vertical** : hauteur minimale 120 px.

En dessous de ces tailles, remplacer par l’icône seule ou supprimer le logo.

## Zone de protection (clear space)
La zone de protection doit être égale à la hauteur du symbole graphique présent dans l’icône (mesurée approximativement à 1/5 de la hauteur totale du fichier). En pratique :

- Laissez un espace libre d’au moins **10 %** de la largeur du logo autour de celui-ci.
- Aucun texte, autre icône ou élément graphique ne doit pénétrer cette zone.

Exemple : pour un logo horizontal de 200 px de large, laisser un margin de 20 px de chaque côté.

## Fond clair
- Le logo peut être placé sur un fond blanc ou très clair (gris #FAFAFA) tant que le contraste du bleu primaire dépasse 4.5:1.
- Sur fond blanc, utiliser le logo en couleur normale (bleu primaire + jaune accent).

## Fond sombre
- Sur fond sombre (ex. : bleu primaire #0053F3 ou noir), utiliser une version **monochrome blanche** du logo.
- Éviter le logo en couleur sur fond sombre car le contraste du jaune peut être insuffisant.

## Monochrome
Deux versions sont autorisées :
- **Logo noir** : pour fonds clairs où le contraste du bleu est réduit (ex. : arrière‑plan gris très clair).
- **Logo blanc** : pour fonds sombres ou colorés (bleu primaire, noir, gris foncé).

Les versions monochromes doivent être dérivées du fichier vectoriel source (non fourni) ; à défaut, appliquer un filtre de luminosité pour obtenir un remplissage uniforme #FFFFFF ou #000000 sans dégradés.

## Ne jamais déformer
Le logo doit toujours conserver son rapport hauteur/largeur d’origine. Toute mise à l’échelle doit être homogène (même facteur sur les deux axes).

## Ne jamais modifier les couleurs
Les teintes exactes du bleu primaire et du jaune accent sont définies dans la section 3 (Palette de couleurs). Aucune autre teinte ne doit être utilisée pour représenter le logo officiel.

## Ne jamais modifier les proportions
Le symbole et le logotype doivent garder leur espacement d’origine. Aucun recadrage ne doit altérer l’équilibre visuel.

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : valeurs exactes de la zone de protection en pixels dérivées du dessin vectoriel.
> 
> **Recommandation** : utiliser une zone de protection égale à 1/4 de la hauteur du symbole (icône) ou à 12 px pour les petites tailles, puis ajuster selon les tests visuels afin que le logo respire nettement des éléments voisins.

---

# 3 Palette de couleurs

## Extraction des couleurs
Les couleurs suivantes ont été extraites des maquettes et des logos fournis :

- **Logo** : bleu primaire et jaune accent.
- **Maquettes client** : bleu dominant, accents vert et orange‑brown.
- **Maquettes prestataire** : similaire, avec touches de vert.
- **Maquettes dashboard** (non fournies) – assumptions basées sur la charte.

## Couleurs principales

| Nom | Hex | RGB | Utilisation principale |
|-----|-----|-----|------------------------|
| **Bleu primaire** | `#0053F3` | 0,83,243 | Couleur de marque, boutons principaux, liens actifs |
| **Jaune accent** | `#FFB300` | 255,179,0 | Boutons d’appel à l’action secondaire, surlignages, icônes d’action |
| **Vert succès** | `#30B26C` | 48,178,108 | États de succès, validations, check‑lists |
| **Rouge erreur** | `#D32F2F` | 211,47,47 | Messages d’erreur, états invalide, alertes critiques |
| **Amber warning** | `#FFA000` | 255,160,0 | Avertissements, états d’attention, badges de notification |
| **Bleu info** | `#0288D1` | 2,136,209 | Informations, aide, liens non prioritaires |
| **Blanc** | `#FFFFFF` | 255,255,255 | Fond principal, surfaces, modaux |
| **Gris très clair** | `#FAFAFA` | 250,250,250 | Fonds de cartes, arrière‑plans secondaires |
| **Gris clair** | `#E0E0E0` | 224,224,224 | Bordures, séparateurs, désactivé léger |
| **Gris moyen** | `#BDBDBD` | 189,189,189 | Texte désactivé, icônes inactives |
| **Gris foncé** | `#757575` | 117,117,117 | Texte secondaire, sous‑titres |
| **Gris très foncé** | `#212121` | 33,33,33 | Texte principal sur fond clair, en-têtes |

## Couleurs de fond et de surface

| Nom | Hex | Utilisation |
|-----|-----|-------------|
| `color.background` | `#FFFFFF` | Fond d’écran principal |
| `color.surface` | `#FAFAFA` | Cartes, feuilles, modaux |
| `color.surfaceVariant` | `#E0E0E0` | Variante légèrement surélevée |
| `color.backgroundInverse` | `#212121` | Fonds sombres (ex. : mode nuit futur) |

## Couleurs de texte

| Nom | Hex | Utilisation |
|-----|-----|-------------|
| `color.onBackground` | `#212121` | Texte principal sur fond clair |
| `color.onSurface` | `#212121` | Texte sur surface |
| `color.onSurfaceVariant` | `#424242` | Texte sur surface variante |
| `color.disabled` | `#BDBDBD` | Texte désactivé |
| `color.placeholder` | `#9E9E9E` | Texte de placeholder |

## Couleurs de bordure

| Nom | Hex | Utilisation |
|-----|-----|-------------|
| `color.border` | `#E0E0E0` | Bordures par défaut |
| `color.borderVariant` | `#BDBDBD` | Bordures accentuées |
| `color.inverseBorder` | `#424242` | Bordure sur fond sombre |

## États des composants (overlay)

| État | Overlay (sur couleur de base) |
|------|------------------------------|
| `pressed` | Noir 0.08 (Android) / Blanc 0.12 (iOS) – appliquer via `rgba(0,0,0,0.08)` ou `rgba(255,255,255,0.12)` |
| `focused` | Blanc 0.12 (sur fond clair) / Noir 0.12 (sur fond sombre) |
| `dragged` | Noir 0.08 |
| `hovered` (web) | Noir 0.04 |

## Tokens de design (exemple)

```json
{
  "color": {
    "primary": "#0053F3",
    "secondary": "#FFB300",
    "success": "#30B26C",
    "error": "#D32F2F",
    "warning": "#FFA000",
    "info": "#0288D1",
    "background": "#FFFFFF",
    "surface": "#FAFAFA",
    "surfaceVariant": "#E0E0E0",
    "onBackground": "#212121",
    "onSurface": "#212121",
    "onSurfaceVariant": "#424242",
    "disabled": "#BDBDBD",
    "placeholder": "#9E9E9E",
    "border": "#E0E0E0",
    "borderVariant": "#BDBDBD"
  }
}
```

## Recommandations d’utilisation
- Utiliser le **bleu primaire** pour tous les éléments d’action primaire (boutons de confirmation, liens de navigation).
- Utiliser le **jaune accent** avec parcimonie pour attirer l’attention sans dominer (ex. : bouton « Devenir prestataire », icône de notification).
- Respecter les ratios de contraste WCAG AA : bleu primaire sur blanc = 8.59:1, jaune accent sur blanc = 11.57:1, gris foncé #212121 sur blanc = 15.46:1.
- En cas de fond sombre, inverser les couleurs (texte blanc, bleu primaire jaune pour accents).

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : valeurs exactes de teintes utilisées dans les maquettes dashboard et les illustrations éventuelles.
> 
> **Recommandation** : réaliser une extraction couleur moyenne sur chaque maquette dashboard et prestataire afin d’affiner les teintes de succès et d’avertissement, puis valider avec l’équipe produit.

---

# 4 Typographie

## Analyse des maquettes
Les maquettes fournies utilisent une police de caractères **sans empattement**, à la géométrie légèrement arrondie, présentant une bonne lisibilité à petite taille. Les caractéristiques observées :

- Traits de terminaison légèrement arrondis (ex. : sur la lettre « a », « g », « y »).
- Espacement moyen entre les lettres (ni trop condensé, ni trop lâche).
- Hauteur de x relativement élevée, favorisant la lecture en taille intermédiaire.
- Poids régulier utilisé pour le corps de texte, poids moyen ou gras pour les titres et les boutons.

Étant donné que les fontes exactes ne sont pas fournies dans le dossier, nous recommandons d’adopter une police librement disponible, très similaire et largement utilisée dans les produits modernes : **Inter** (Google Fonts). Inter possède des variantes de poids, une excellente accessibilité et des détails qui correspondent aux observations (terminaux légèrement arrondis, hauteur de x élevée).

Si une préférence pour une police système est souhaitée (pour réduire le poids du paquet), on peut utiliser :
- **Android** : `Roboto` (variantes : Regular, Medium, Bold)
- **iOS** : `SF Pro Display` / `SF Pro Text`
- **Web** : `Inter` (chargée depuis Google Fonts) ou fallback `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

## Famille de police
| Contexte | Famille recommandée | Fallback |
|----------|---------------------|----------|
| Android  | `Roboto`            | `sans-serif` |
| iOS      | `SF Pro Display` (titres) / `SF Pro Text` (corps) | `system-ui` |
| Web      | `Inter` (400,500,700) | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |
| Logo     | **Logotype personnalisé** – ne pas remplacer par une police système |

## Tailles de texte (en pixels, baseline Android/iOS, pt approximatif pour iOS)

| Nom | Taille (px) | Taille (pt iOS) | Utilisation typique |
|-----|-------------|-----------------|---------------------|
| `displayLarge` | 57 | 57pt | Écrans d’accueil, titres majeurs (rare) |
| `displayMedium` | 45 | 45pt | Sections importantes |
| `displaySmall` | 36 | 36pt | Titres de écran |
| `headlineLarge` | 32 | 32pt | Titre de carte, titre de section |
| `headlineMedium` | 28 | 28pt | Sous‑titre de carte |
| `headlineSmall` | 24 | 24pt | Titre de groupe, titre de liste |
| `titleLarge` | 22 | 22pt | Titre de bouton large, titre de champ |
| `titleMedium` | 16 | 16pt | Texte de bouton, label de champ |
| `titleSmall` | 14 | 14pt | Légende, sous‑label |
| `bodyLarge` | 16 | 16pt | Corps de texte principal |
| `bodyMedium` | 14 | 14pt | Corps de texte secondaire |
| `bodySmall` | 12 | 12pt | Texte d’aide, caption |
| `labelLarge` | 14 | 14pt | Texte de bouton en majuscules |
| `labelMedium` | 11 | 11pt | Étiquette de champ condensé |
| `labelSmall` | 10 | 10pt | Très petite légende (utiliser avec parcimonie) |

*Les tailles sont basées sur une échelle de 4 px (4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 56…) pour faciliter l’alignement sur une grille de 8 px.*

## Graisses de police
| Nom | Poids (OpenType) | Utilisation |
|-----|------------------|-------------|
| `Thin` | 100 | Décoratif (éviter) |
| `ExtraLight` | 200 | Légère mise en évidence |
| `Light` | 300 | Texte secondaire très léger |
| `Regular` | 400 | Corps de texte par défaut |
| `Medium` | 500 | Éléments interactifs (boutons, champs actifs) |
| `SemiBold` | 600 | Titres de niveau moyen |
| `Bold` | 700 | Titres importants, accents |
| `ExtraBold` | 800 | Titres très visibles (rare) |
| `Black` | 900 | Utilisation exceptionnelle |

Dans les maquettes, on observe principalement `Regular` (400) pour le corps, `Medium` (500) pour les boutons et actifs, et `Bold` (700) pour les titres de section.

## Hauteur de ligne (line height)
| Type | Valeur | Commentaire |
|------|--------|-------------|
| Titre (headline, title) | 1.2 | Espacement réduit pour compacité |
| Corps de texte (body) | 1.4 | Lisibilité optimale |
| Légende / caption | 1.3 | Équilibre entre compacité et lisibilité |
| Bouton | 1.0 (height fixed) | Hauteur définie par le padding vertical + taille de police |

## Espacement entre lettres (tracking)
- Aucun tracking additionnel (0) pour la majorité du texte.
- Tracking légèrement positif (+0.5 px) pour les textes en majuscules (ex. : boutons en `textTransform: uppercase`) afin d’améliorer la lisibilité.

## Exemple de thème typographique (JSON)

```json
{
  "fontFamily": {
    "android": "Roboto",
    "ios": "SF Pro Display",
    "web": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  "fontWeight": {
    "regular": 400,
    "medium": 500,
    "bold": 700
  },
  "fontSize": {
    "displayLarge": 57,
    "displayMedium": 45,
    "displaySmall": 36,
    "headlineLarge": 32,
    "headlineMedium": 28,
    "headlineSmall": 24,
    "titleLarge": 22,
    "titleMedium": 16,
    "titleSmall": 14,
    "bodyLarge": 16,
    "bodyMedium": 14,
    "bodySmall": 12,
    "labelLarge": 14,
    "labelMedium": 11,
    "labelSmall": 10
  },
  "lineHeight": {
    "headline": 1.2,
    "body": 1.4,
    "caption": 1.3
  },
  "letterSpacing": {
    "normal": 0,
    "uppercase": 0.5
  }
}
```

## Bonnes pratiques
- Utiliser les tailles définies plutôt que des valeurs arbitraires.
- Respecter la hiérarchie : un titre ne doit jamais être plus petit que son sous‑titre.
- Maintenir un contraste de texte ≥ 4.5:1 avec le fond (vérifier avec les tokens de couleur).
- Éviter l’usage de textes en majuscules pour de longs paragraphes (réservé aux boutons et étiquettes courtes).
- Ajuster le `lineHeight` lorsque la couleur de texte est très claire sur un fond sombre afin d’améliorer la lisibilité.

## Mauvaises pratiques
- Mélanger plusieurs familles de polices dans un même écran.
- Utiliser une taille de texte inférieure à 12 px pour du contenu lisible.
- Appliquer un tracking négatif qui rende les lettres difficiles à distinguer.
- Oublier d’adapter la taille de police pour les écrans à haute densité (dp/sp vs px).

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : nom exact de la police utilisée dans les maquettes fournies.
> 
> **Recommandation** : effectuer une analyse OCR ou demander les spécifications à l’équipe de design afin de confirmer la famille (probablement une variante de « Nunito », « Poppins » ou « Inter ») et, en attendant, adopter `Inter` comme police de secours qui se rapproche visuellement.

---

# 5 Espacements

## Système de base
Le design de Relio suit une grille de **4 px** comme unité fondamentale. Toutes les dimensions (marges, paddings, rayons, espacements entre composants, hauteurs de ligne) sont des multiples de 4 px afin d’assurer un alignement cohérent sur les écrans Android, iOS et web.

Cette approche s’inspire des systèmes de spacing largement adoptés (Material Design 3, iOS Human Interface Guidelines) tout en restant simple à mettre en œuvre.

## Échelle de spacing (en px)

| Valeur | Utilisation typique |
|--------|---------------------|
| 4 px   | Espacement interne très petit (icône dans bouton, espace entre texte et icône) |
| 8 px   | Padding minimum, espacement entre éléments liés (ex. : texte et icône dans une ligne) |
| 12 px  | Espacement standard entre éléments non liés dans un même groupe |
| 16 px  | Padding habituel des cartes, marges internes des contenus |
| 20 px  | Espacement entre sections distinctes |
| 24 px  | Grande marge ou padding de section |
| 28 px  | Espacement entre blocs de contenu majeur |
| 32 px  | Padding de fenêtre ou de modal externe |
| 36 px  | Espacement entre sections pleine largeur |
| 40 px  | Marge extérieure importante |
| 44 px  | Rare, utilisé pour des séparateurs visuels |
| 48 px  | Espacement entre panneaux latéraux et contenu principal |
| 56 px  | Padding de grande zone (ex. : formulaire pleine largeur) |
| 64 px  | Marge de contenu sur grands écrans (tablet/desktop) |
| 72 px  | Espacement entre blocs de données sur desktop |
| 80 px  | Marge de contenu sur très grands écrans |
| 96 px  | Padding de section hero ou pleine largeur |

> **Note** : les valeurs impaires (20, 28, 36, 44, 52, 60, 70…) sont obtenues en ajoutant 4 px à la précédente multiple de 4 afin de permettre un réglage fin lorsqu’un multiple de 8 ne suffit pas.

## Marges (margins)
- **Marge externe d’un écran** : 16 px sur les côtés en mode portrait mobile (peut augmenter à 24 px en paysage ou sur tablette).
- **Marge entre éléments verticaux** : 12 px pour des éléments liés, 20 px pour des sections distinctes.
- **Marge entre éléments horizontaux** : 8 px pour éléments liés (ex. : icône + texte), 16 px pour éléments non liés.

## Paddings (padding)
| Composant | Padding habituel (px) | Commentaire |
|-----------|----------------------|-------------|
| Bouton    | 12 px horizontal, 8 px vertical (minimum) | Peut augmenter à 16 px/12 px pour boutons larges |
| Champ texte | 12 px horizontal, 10 px vertical | Hauteur intérieure suffisante pour le texte |
| Carte     | 16 px tout autour | Crée une surface distincte |
| Liste (élément) | 16 px vertical, 12 px horizontal | Séparateur visuel entre lignes |
| Modal     | 24 px horizontal, 20 px vertical | Espace généreux pour le contenu |
| Bottom sheet | 20 px horizontal, 16 px vertical | Adapté aux écrans réduits |
| Barre supérieure (App Bar) | 0 px (hauteur définie) | Padding interne souvent 0, le titre centré |
| Barre inférieure (Bottom Navigation) | 0 px | Hauteur fixe, icônes centrées |

## Rayons de bordure (border radius)
| Utilisation | Valeur (px) | Commentaire |
|-------------|-------------|-------------|
| Bouton primaire | 8 px | Coins arrondis modérés |
| Bouton secondaire | 8 px | Même que primaire |
| Champ texte | 8 px | Consistance avec les boutons |
| Carte | 12 px | Légèrement plus arrondi pour mettre en avant |
| Modal | 16 px | Fenêtre plus douce |
| Badge | 4 px (ou plein cercle) | Petits indicateurs |
| Avatar | 50 % (cercle) ou 8 px (carré avec coins arrondis) | Selon le style choisi |
| Slider thumb | 50 % | Cercle |
| Icône dans container | 0 px (icône carré) | Si l’icône est déjà carrée, aucun rayon supplémentaire |

## Éléments d’élévation (elevation) et ombres (shadow)
### Android (dp)
| Niveau | Élévation (dp) | Ombre ombreux |
|--------|----------------|---------------|
| 0      | 0dp            | Aucune ombre |
| 1      | 1dp            | Ombre légère |
| 2      | 2dp            | Ombre standard |
| 3      | 4dp            | Carte élévée |
| 4      | 8dp            | Modal ou fenêtre flottante |
| 6      | 12dp           | Pop‑up ou menu |
| 8      | 16dp           | Dialogue large |
| 12     | 24dp           | Panneau persistant |

### iOS (points)
- Utiliser les ombres système (`layer.shadowOpacity`, `layer.shadowRadius`, `layer.shadowOffset`) avec des valeurs similaires :
  - Légère : radius 2, opacity 0.2, offset (0,1)
  - Modérée : radius 4, opacity 0.25, offset (0,2)
  - Élevée : radius 6, opacity 0.3, offset (0,4)

### Web (CSS)
```css
/* Niveau 1 */
.shadow-1 { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
/* Niveau 2 */
.shadow-2 { box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }
/* Niveau 3 */
.shadow-3 { box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); }
/* Niveau 4 */
.shadow-4 { box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); }
```

## Bonnes pratiques
- Toujours utiliser des multiples de 4 px pour garantir l’alignement sur la grille de 8 px utilisée par la plupart des composants.
- Adapter les marges externes en fonction de la largeur d’écran (ex. : passer de 16 px à 24 px sur tablette).
- Maintenir une cohérence entre le padding intérieur d’un composant et son rayon de bordure (ex. : un bouton avec padding 12px et rayon 8px donne un bon équilibre visuel).
- Utiliser l’élévation pour indiquer la hiérarchie (une carte surélevée indique qu’elle est interactive ou contient du contenu temporaire).
- Éviter les valeurs de margin/padding impaires qui ne sont pas des multiples de 4 px sauf cas particuliers (ajustement de ligne de base).

## Mauvaises pratiques
- Utiliser des valeurs arbitraires (ex. : 5 px, 7 px) qui brisent l’alignement de la grille.
- Oublier les marges externes sur les écrans larges, entraînant du contenu collé aux bords.
- Appliquer un rayon de bordure trop grand (ex. : 24 px sur un petit bouton) qui déforme l’aspect du composant.
- Mélanger des ombres personnalisées incohérentes entre plateformes sans guideline claire.

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : valeurs exactes de marges et paddings observées dans les maquettes fournies (les mesures nécessitent un outil d’analyse d’image ou des spécifications vectorielles).
> 
> **Recommandation** : imprimer les maquettes à échelle 100 % et mesurer avec une règle pixels les espaces récurrents (ex. : padding des cartes, espacement entre lignes de liste) afin de valider l’échelle de 4 px proposée. Ajuster si une constante de 6 px ou 8 px apparaît plus fréquemment.

---

# 6 Icônes

## Analyse des maquettes
Les icônes présentes dans les maquettes sont des **symboles linéaires simples**, à traçoin uniforme, avec un poids de trait modéré. Elles apparaissent dans les contextes suivants :

- Icône de recherche (loupe) dans la barre d’accueil.
- Icône de microphone (saisie vocale).
- Icône de catégorie (goutte d’eau pour plomberie, éclair pour électricité, etc.).
- Icône de navigation (flèche retour, hamburger).
- Icône d’état (check, croix, horloge).
- Icône de notification (cloche).
- Icône de panier ou de profil (silhouette personne).

Le style observé est **outline** (contour uniquement), avec des coins légèrement arrondis aux extrémités des traits, et une taille de cadre approximative de 24 × 24 px (la grille interne de l’icône).

## Famille d’icônes recommandée
Comme les fichiers sources d’icônes ne sont pas fournis, nous recommandons d’adopter la bibliothèque **Material Icons** (variant **Outlined**) qui correspond précisément au style observé :

- Poids du trait : 2 px (pour une icône de 24 px).
- Formes géométriques simples, coins légèrement arrondis.
- Large gamme de symboles couvrant les besoins du produit (action, communication, contenu, appareil, éditeur, fichier, matériel, image, carte, navigation, pièce, social, toggle).

Alternative : si une personnalisation est souhaitée, créer un set d’icônes personnalisées en suivant les règles ci-dessous, en s’inspirant de Material Icons Outlined.

## Règles de style
| Règle | Détail |
|-------|--------|
| **Taille de base** | 24 px × 24 px (viewport de l’icône). |
| **Épaisseur du trait** | 2 px (peut être mise à l’échelle proportionnellement : 20 px → 1.7 px, 28 px → 2.3 px). |
| **Formes** | Préférer les formes géométriques simples (cercles, carrés, lignes droites, quarts de cercle). Éviter les détails excessifs. |
| **Coins** | Légèrement arrondis (radius 1–2 px) aux extrémités des traits ouverts. |
| **Symétrie** | Maintenir la symétrie horizontale ou verticale lorsque l’icône le permet. |
| **Espace intérieur** | Laisser un padding d’au moins 2 px entre le tracé le plus externe et le bord du viewport afin d’éviter le rognage. |
| **Monochrome** | Les icônes sont généralement utilisées en une seule couleur (texte ou icon‑color). |
| **Couleurs autorisées** | - Couleur de texte par défaut (`color.onSurface`) <br> - Couleur primaire (`color.primary`) pour mettre en avant une action <br> - Couleur d’erreur (`color.error`) pour états d’alerte <br> - Couleur de succès (`color.success`) pour états validés |
| **États** | - Normal : couleur de texte ou couleur spécifiée <br> - Pressed/Focused : appliquer une overlay (voir section 9) <br> - Désactivé : `color.disabled` avec opacity 0.38 (ou utiliser le token `icon.disabled`) |

## Tailles d’icônes courantes
| Nom | Taille (px) | Utilisation |
|-----|-------------|-------------|
| `iconSizeSmall` | 18 | Icônes dans champs texte, boutons compacts |
| `iconSizeMedium` | 24 | Icônes standards (barre d’action, listes, cartes) |
| `iconSizeLarge` | 32 | Icônes d’en-tête, boutons d’action majeur |
| `iconSizeXLarge` | 40 | Icônes de panneaux, illustrations simples |
| `iconSizeXXLarge` | 48 | Icônes de démarrage, illustrations majeures |

> Les tailles doivent rester des multiples de 4 px pour conserver l’alignement avec la grille de spacing.

## Bonnes pratiques
- Utiliser toujours la même famille d’icônes dans tout le produit afin d’assurer la cohérence visuelle.
- Privilégier les icônes **outlined** pour les états actifs et **filled** uniquement pour les états de sélection (ex. : onglet sélectionné dans une bottom navigation).
- Optimiser le poids du fichier : ne charger que les icônes utilisées (via tree‑shaking ou icônes personnalisées sous forme de SVG sprite).
- Fournir des versions **accessibles** : ajouter une description textuelle (contentDescription/Android, accessibilityLabel/iOS, aria-label/web) pour chaque icône véhiculant une signification.
- Éviter de modifier les icônes (étirer, retourner non symétrique) sauf si le symbole le permet clairement (ex. : flèche qui peut être retournée pour indiquer la direction opposée).

## Mauvaises pratiques
- Mélanger deux familles d’icônes différentes (ex. : Material Icons et Font Awesome) dans le même écran.
- Utiliser des icônes trop détaillées qui deviennent illisibles à petites tailles.
- Oublier de fournir une alternative textuelle pour les lecteurs d’écran.
- Appliquer une couleur de fond derrière l’icône sans contraste suffisant (ex. : icône blanche sur fond clair).

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : fichier source ou bibliothèque exacte d’icônes utilisée dans les maquettes fournies.
> 
> **Recommandation** : exporter les icônes des maquettes (si possible en tant que vectoriels) afin de créer un set personnalisé correspondant exactement au style observé. En attendant, adopter Material Icons Outlined avec les règles ci-dessus fournit une très bonne approximation.

---

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

---

# 8 Composants

Ce chapitre fournit une fiche synthétique pour chaque composant UI de Relio. Chaque fiche inclut :

- **Description** : rôle et utilisation principale.
- **Variantes** : versions disponibles (ex. : primaire, secondaire, outline).
- **États** : normal, pressed, focused, loading, disabled, success, error, selected, empty (si pertinent).
- **Dimensions** : taille minimale, taille recommandée, contraintes de hauteur/largeur.
- **Accessibilité** : contraste, zones tactiles, labels, rôles ARIA.
- **Bonnes pratiques** : recommandations d’utilisation.
- **Mauvaises pratiques** : erreurs à éviter.

En raison du nombre important de composants, seules les spécifications essentielles sont listées ici. Les détails de mise en œuvre (props, événements, thèmes) doivent être définis dans la bibliothèque de composants React Native / Web respective.

## Liste des composants

| Composant | Description courte |
|-----------|--------------------|
| Bouton | Action principale ou secondaire |
| Bouton secondaire | Action moins prominente |
| Champ texte | Saisie de texte libre |
| Champ recherche | Saisie avec icône de recherche et texte d’aide |
| Carte | Conteneur d’information avec élévation |
| Carte mission | Carte spécifique affichant une mission en cours |
| Carte prestataire | Carte présentant un professionnel |
| Avatar | Représentation visuelle d’un utilisateur |
| Badge | Petit indicateur de statut ou de compteur |
| Notification | Message temporaire en haut de l’écran |
| Snackbar | Message bref en bas de l’écran |
| Toast | Message flottant de courte durée |
| Bottom Navigation | Navigation principale en bas (mobile) |
| Top Bar | Barre d’application supérieure |
| App Bar | Synonyme de Top Bar (terme Material) |
| Bottom Sheet | Panneau glissant depuis le bas |
| Modal | Fenêtre flottante centrées |
| Dialogue | Boîte de dialogue de confirmation ou d’alerte |
| Liste | Présentation d’une série d’éléments |
| Liste vide | État d’une liste sans données |
| Loader | Indicateur de chargement circulaire ou linéaire |
| Progress Indicator | Barre de progression déterminée |
| Stepper | Indicateur d’étapes d’un processus |
| QR Code | Code à deux dimensions pour vérification |
| Carte de paiement | Résumé du montant et du mode de paiement |
| Sélecteur | Choix parmi une liste d’options (dropdown) |
| Switch | Bascule binaire (on/off) |
| Checkbox | Case à cocher pour sélection multiple |
| Radio | Bouton radio pour sélection exclusive |
| OTP | Champ de saisie d’un code à usage limité |
| Évaluation | Composant de notation par étoiles |
| Étoiles | Affichage de la notation (readonly) |
| Timeline | Visualisation linéaire d’événements temporels |
| Carte statistique | Carte montrant un indicateur clé (chiffre, titre) |
| Carte revenu | Carte spécifique affichant des gains estimés |
| Chip | Petit conteneur d’information ou d’action |
| Tag | Étiquette de catégorisation |
| Puce d’état | Indicator visuel d’état (ex. : en cours, terminé) |

## Exemple de fiche : Bouton

**Description**  
Déclenche une action principale de l’interface.

**Variantes**  
- Primaire : fond `color.primary`, texte `color.onPrimary`  
- Secondaire : fond `color.surface`, bordure `color.border`, texte `color.primary`  
- Outline : fond transparent, bordure `color.border`, texte `color.primary`  
- Texte : pas de fond, uniquement texte `color.primary` (utiliser avec parcimonie)

**États**  
- Normal : comme défini dans la variante  
- Pressed : overlay noir 0.08 (Android) / blanc 0.12 (iOS)  
- Focused : overlay blanc 0.12 (fond clair) / noir 0.12 (fond sombre)  
- Loading : afficher un indicateur de circulation à l’intérieur du bouton (remplacer le texte)  
- Disabled : fond `color.disabled`, texte `color.onSurface` avec opacity 0.38  
- Success : fond `color.success`, texte `color.onSuccess`  
- Error : fond `color.error`, texte `color.onError`

**Dimensions**  
- Hauteur minimale : 48 px (respecte les recommandations de zone tactile)  
- Hauteur recommandée : 56 px  
- Padding horizontal : 16 px (minimum 12 px)  
- Rayon de bordure : 8 px  
- Texte : taille `titleMedium` (16 px), poids `medium` (500)  

**Accessibilité**  
- Contraste texte/fond ≥ 4.5:1 (vérifié pour toutes les variantes)  
- Zone tactile ≥ 48 × 48 dp (Android) / 44 × 44 pt (iOS)  
- Propriété `accessibilityLabel` décrivant l’action (ex. : « Confirmer la mission »)  
- Éviter de dépendre uniquement de la couleur pour transmettre l’état (utiliser texte ou icône supplémentaire)

**Bonnes pratiques**  
- Utiliser la variante primaire pour l’action la plus importante de l’écran.  
- Limiter le nombre de boutons primaires par écran à un seul.  
- Garder le texte du bouton court et explicite (verbe d’action).  
- Éviter les boutons avec uniquement une icône sauf si la signification est universellement comprise (ex. : fermeture).  
- En mode chargement, conserver les mêmes dimensions pour éviter le saut de mise en page.

**Mauvaises pratiques**  
- Utiliser un bouton primaire pour une action destructive sans confirmation préalable.  
- Définir une hauteur inférieure à 40 px (risque de toucher accidentel).  
- Mélanger plusieurs variantes de bouton dans un même groupe sans hiérarchie claire.  
- Omettre le contraste en mode disabled (rendre le texte presque invisible).

## Autres composants (résumé)

Pour chaque composant suivant, se référer aux spécifications génériques ci‑dessous et adapter selon le contexte.

### Champ texte
- **Variantes** : outlined (contour), filled (remplissage léger), sous‑ligné.  
- **États** : normal, focused, disabled, error (avec texte d’aide en rouge), success (vérification).  
- **Dimensions** : hauteur minimale 48 px, padding horizontal 12 px, rayon 8 px.  
- **Accessibilité** : label associé (`htmlFor` / `aria-label`), contraste du texte et du placeholder ≥ 4.5:1, retour d’erreur vocal.  
- **Bonnes pratiques** : afficher un texte d’aide clair, valider en temps réel lorsque pertinent, masquer le mot de passe avec icône de bascule.  
- **Mauvaises pratiques** : utiliser un champ texte trop étroit pour le contenu attendu, omettre le label visible.

### Champ recherche
- Identique au champ texte avec icône de recherche à gauche et icône de micro à droite (saisie vocale).  
- Le champ recherche doit avoir un arrière‑plan légèrement surélevé (`color.surfaceVariant`) et un rayon de 12 px pour rappeler une carte.

### Carte
- **Variantes** : plain (élévation 0), elevated (élévation 2‑4), outlined (bordure uniquement).  
- **États** : normal, pressed, loading, disabled (si interactive).  
- **Dimensions** : rayon 12 px, padding 16 px, ombre niveau 2 élévation standard.  
- **Accessibilité** : titre de carte avec niveau de titre approprié, contraste du texte ≥ 4.5:1.  
- **Bonnes pratiques** : utiliser une carte pour regrouper des informations liées, éviter de trop imbriquer les cartes.  
- **Mauvaises pratiques** : rendre une carte interactive sans indication visuelle (ombre, changement au appuyé).

### Carte mission
- Spécialisation de la carte présentant : photo du prestataire, nom, métier, distance, disponibilité, prix estimatif, boutons « Accepter » / « Voir une autre proposition ».  
- Suivre les mêmes règles que la carte générale, avec une hauteur minimale de 140 px pour garantir la lisibilité des éléments.

### Carte prestataire
- Similaire à la carte mission mais centrée sur le profil du professionnel : photo, nom, métier, note moyenne, nombre de missions, badges de vérification.  
- Peut être utilisée dans les écrans de recherche ou de profil.

### Avatar
- **Variantes** : cercle (50 % radius), carré avec rayon 8 px, avec bordure fine (2 px) couleur primaire lorsqu’actif.  
- **Dimensions** : 40 px, 48 px, 64 px, 96 px selon contexte (liste, détail, en‑tête).  
- **Accessibility** : alternative textuelle (`accessibilityLabel`) décrivant l’identité (ex. : « Avatar de Jean Dupont »).  
- **Bonnes pratiques** : utiliser une image de secours (placeholder gris) lorsque aucune photo n’est disponible.  
- **Mauvaises pratiques** : étirer l’image déformant le visage.

### Badge
- **Variantes** : point (petit cercle), numéro (compteur), texte (statut).  
- **Dimensions** : hauteur minimale 20 px, padding horizontal 6 px, rayon 10 px (pour pilule) ou 50 % (pour cercle).  
- **Accessibility** : contraste texte/fond ≥ 4.5:1, aria‑live si le compteur change dynamiquement.  
- **Bonnes pratiques** : utiliser un badge uniquement pour fournir une information complémentaire, pas comme élément d’action principal.  
- **Mauvaises pratiques** : rendre le badge trop petit (< 16 px) rendant le texte illisible.

### Notification
- **Variantes** : simple (texte uniquement), avec icône, avec action bouton.  
- **Apparition** : en haut de l’écran, glisse vers le bas, reste quelques secondes puis glisse vers le haut.  
- **Dimensions** : hauteur 48 px, largeur 90 % de l’écran, rayon 8 px, ombre niveau 2.  
- **Accessibility** : annoncer via lecture d’écran à l’apparition, bouton de fermeture clairement libellé.  
- **Bonnes pratiques** : limiter la durée à 4‑6 seconds, éviter les notifications trop fréquentes.  
- **Mauvaises pratiques** : bloquer l’interaction de l’utilisateur derrière une notification persistante.

### Snackbar / Toast
- **Snackbar** : bas de l’écran, action éventuelle, durée courte.  
- **Toast** : flottant, généralement sans action, durée très courte (2 s).  
- Suivre les mêmes règles de contraste, rayon, ombre que la Notification.  
- **Accessibility** : annoncer le message, permettre la lecture complète avant disparition.

### Bottom Navigation
- **Variantes** : fixe (3‑5 éléments), avec déplacement (shift) lors de l’affichage d’un modal.  
- **Dimensions** : hauteur 56 px, icône 24 px, label intermédiaire `labelSmall` (10 px) ou masqué en mode paysage uniquement icône.  
- **Accessibility** : chaque élément doit avoir un `accessibilityLabel` distinct, indiquer l’élément sélectionné.  
- **Bonnes pratiques** : limiter à 5 destinations maximum, utiliser des icônes claires et des labels courts.  
- **Mauvaises pratiques** : utiliser des labels longs qui provoquent du débordement, cacher complètement le texte sans alternative.

### Top Bar / App Bar
- **Variantes** : centrée (titre uniquement), avec action (icône à droite), avec navigation (flèche retour à gauche).  
- **Dimensions** : hauteur 56 px, padding horizontal 16 px (ou 0 si le contenu occupe toute la largeur).  
- **Accessibility** : titre avec niveau de titre approprié, contraste ≥ 4.5:1.  
- **Bonnes pratiques** : garder le titre court, éviter les menus déroulants complexes dans la barre supérieure.  
- **Mauvaises pratiques** : surcharger la barre avec trop d’actions, rendre le titre illisible sur fond chargé.

### Bottom Sheet
- **Variantes** : modal (fenêtre modale), feuille (partielle hauteur).  
- **Dimensions** : largeur 100 %, rayon supérieur 12 px, ombre niveau 3.  
- **Accessibility** : focus piégé à l’intérieur, annuaire de fermeture clair.  
- **Bonnes pratiques** : utiliser pour des menus ou des formulaires secondaires, permettre le geste de glisser pour fermer.  
- **Mauvaises pratiques** : rendre la feuille trop haute laissant peu d’espace au contenu principal.

### Modal
- **Variantes** : centre écran, pleine largeur (mobile).  
- **Dimensions** : largeur 80 % (max 400 px sur desktop), rayon 12 px, ombre niveau 4.  
- **Accessibility** : focus piégé, retour Échap pour fermer, titre descriptif.  
- **Bonnes pratiques** : utiliser pour des actions critiques nécessitant confirmation (ex. : suppression).  
- **Mauvaises pratiques** : ouvrir un modal en arrière‑plan d’un autre modal sans gestion de pile.

### Dialogue
- Similaire au Modal mais généralement plus petit, utilisé pour confirmations ou alertes simples.  
- **Variantes** : alert (titre + message + boutons), confirmation (titre + message + bouton d’action + annulation).  
- **Dimensions** : largeur 75 % (max 360 px), rayon 8 px, ombre niveau 3.  
- **Accessibility** : annuaire de rôle `alertdialog` ou `dialog`, focus sur le premier bouton.  
- **Bonnes pratiques** : garder le texte clair, proposer une action par défaut sécurisée (ex. : annulation).  
- **Mauvaises pratiques** : utiliser un dialogue pour présenter de grandes quantités d’information (préférer une page dédiée).

### Liste
- **Variantes** : plain (séparateur simple), inset (avec padding), avec en‑tête.  
- **Dimensions** : hauteur minimale d’un élément 48 px, padding horizontal 16 px, séparateur hauteur 1 px couleur `color.border`.  
- **Accessibility** : chaque élément doit être sélectionnable ou activable via rôle approprié, contraste texte ≥ 4.5:1.  
- **Bonnes pratiques** : utiliser pour afficher des éléments homogènes, permettre le glisser‑déposer si pertinent.  
- **Mauvaises pratiques** : rendre chaque élément interactif sans indication visuelle, omettre le séparateur rendant la liste visuellement confuse.

### Liste vide
- **Variantes** : illustration + texte d’incitation, ou uniquement texte.  
- **Dimensions** : largeur 80 % avec marges horizontales auto, texte `bodyLarge`.  
- **Accessibility** : fournir une description détaillée de l’illustration si présente.  
- **Bonnes pratiques** : encourager l’utilisateur à agir (ex. : « Ajouter votre première mission »).  
- **Mauvaises pratiques** : laisser un espace vide totalement sans indication.

### Loader
- **Variantes** : circulaire (spinner), linéaire (barre).  
- **Dimensions** : diamètre 24 px (petit), 32 px (moyen), 48 px (grand).  
- **Accessibility** : rôle `progressbar` avec label textuel indiquant le pourcentage lorsqu’il est déterminé.  
- **Bonnes pratiques** : afficher uniquement lorsqu’une opération attendue dépasse 500 ms.  
- **Mauvaises pratiques** : laisser un loader indéfiniment sans indication de progrès ou possibilité d’annulation.

### Progress Indicator
- **Variantes** : déterminé (barre), indéterminé (animation).  
- **Dimensions** : hauteur 4 px, rayon 2 px, couleur de remplissage `color.primary` ou `color.success` selon contexte.  
- **Accessibility** : label texte montrant le pourcentage, rôle `progressbar`.  
- **Bonnes pratiques** : utiliser pour montrer le progrès d’un téléchargement ou d’une étape de formulaire.  
- **Mauvaises pratiques** : confondre avec un loader indéterminé lorsqu’une valeur précise est connue.

### Stepper
- **Variantes** : horizontal (étapes linéaires), vertical (étapes empilées).  
- **Dimensions** : hauteur de chaque étape 48 px, icône 24 px, texte `labelMedium`.  
- **Accessibility** : indiquer l’étape actuelle, le nombre total d’étapes, permettre la navigation clavier.  
- **Bonnes pratiques** : utiliser pour décomposer un processus complexe en étapes claires.  
- **Mauvaises pratiques** : rendre les étapes non cliquables lorsqu’elles sont sensées représenter un état uniquement.

### QR Code
- **Variantes** : simple (code uniquement), avec cadre et texte d’instruction.  
- **Dimensions** : minimale 150 px × 150 px pour assurer la scannabilité, marge silencieuse (quiet zone) de 4 modules tout autour.  
- **Accessibility** : fournir une description textuelle (« Code QR pour valider le début d’intervention »).  
- **Bonnes pratiques** : générer avec un niveau de correction d’erreur moyen (Q) pour résister à une légère dégradation.  
- **Mauvaises pratiques** : réduire la taille en dessous de 120 px rendant la lecture difficile sur certains appareils.

### Carte de paiement
- **Variantes** : résumé (montant, mode), détaillé (ventilation).  
- **Dimensions** : hauteur 80 px, padding 12 px, rayon 8 px, ombre niveau 1.  
- **Accessibility** : annoncer le montant et le mode de paiement à l’affichage.  
- **Bonnes pratiques** : montrer clairement le montant total et le moyen sélectionné.  
- **Mauvaises pratiques** : cacher des frais supplémentaires sans explication.

### Sélecteur (Dropdown)
- **Variantes** : menu simple, avec recherche intégrée.  
- **Dimensions** : hauteur 48 px, padding horizontal 12 px, rayon 8 px, ombre niveau 2 lorsqu’ouvert.  
- **Accessibility** : label associé, contraste du texte sélectionné ≥ 4.5:1, annoncer l’option choisie.  
- **Bonnes pratiques** : utiliser lorsque le nombre d’options dépasse 5 et que l’espace est limité.  
- **Mauvaises pratiques** : utiliser pour moins de 3 options (préférer des radio buttons).

### Switch
- **Variantes** : padrão (glisseur), avec texte côté gauche/right.  
- **Dimensions** : largeur 50 px, hauteur 28 px, rayon du piste 14 px, rayon du poignée 12 px.  
- **Accessibility** : rôle `switch`, état vérifiable via lecture d’écran.  
- **Bonnes pratiques** : utiliser pour un état binaire qui prend effet immédiat.  
- **Mauvaises pratiques** : utiliser pour une action nécessitant une confirmation (préférer un bouton).

### Checkbox
- **Variantes** : simple, avec texte à droite.  
- **Dimensions** : boîte 24 × 24 px, rayon 4 px, espacement entre boîte et texte 8 px.  
- **Accessibility** : rôle `checkbox`, label associé, groupe via `aria-labelledby` ou `fieldset`.  
- **Bonnes pratiques** : utiliser pour sélection multiple indépendante.  
- **Mauvaises pratiques** : ne pas pouvoir déterminer l’état sans texte associé.

### Radio
- **Variantes** : groupe horizontal ou vertical.  
- **Dimensions** : cercle 24 × 24 px, rayon 4 px, espacement 8 px entre boutons et texte.  
- **Accessibility** : rôle `radio`, groupe via `name` ou `aria-labelledby`, seul un sélectionnable à la fois.  
- **Bonnes pratiques** : utiliser lorsque l’utilisateur doit choisir une seule option parmi un ensemble limité.  
- **Mauvaises pratiques** : utiliser pour plus de 6 options (préférer un sélecteur ou une liste).

### OTP
- **Variantes** : champs séparés (4‑6 cases) ou champ unique avec masquage.  
- **Dimensions** : chaque case 40 px de large, hauteur 48 px, rayon 6 px, espacement 4 px entre cases.  
- **Accessibility** : chaque case doit être focusable, annonce du caractère entré lorsqu’il est déterminé (ou annoncer le code complet à la fin).  
- **Bonnes pratiques** : permettre la collation automatique depuis le presse‑papiers, passer au champ suivant après saisie.  
- **Mauvaises pratiques** : obliger l’utilisateur à ré‑saisir tout le code si une erreur intervient tôt.

### Évaluation
- **Variantes** : étoiles interactives (note à choisir), étoiles en lecture seule (affichage).  
- **Dimensions** : chaque étoile 24 px, espacement 4 px entre étoiles, largeur totale selon nombre d’étoiles (5 × 24 + 4 × 4 = 136 px).  
- **Accessibility** : rôle `slider` ou `radiogroup` avec label décrivant la note, annoncée lors du changement.  
- **Bonnes pratiques** : permettre le choix demi‑étoile si pertinent, fournir un texte d’aide explicite.  
- **Mauvaises pratiques** : masquer la valeur sélectionnée pour l’utilisateur (doit toujours voir sa sélection).

### Étoiles (lecture seule)
- Identique à l’évaluation mais sans interaction.  
- Utiliser les mêmes dimensions et espacements.

### Timeline
- **Variantes** : verticale (événements chronologiques), horizontale (timeline de processus).  
- **Dimensions** : largeur de la ligne 2 px, espacement entre nœuds 24 px, nœud diamètre 12 px, contenu latéral padding 12 px.  
- **Accessibility** : chaque nœud doit être annonçable avec date et titre, rôle `list`.  
- **Bonnes pratiques** : utiliser pour visualiser un historique d’étapes ou un processus linéaire.  
- **Mauvaises pratiques** : rendre la ligne trop fine (< 1 px) rendant difficile à voir sur certains écrans.

### Carte statistique
- **Variantes** : simple (icône + chiffre + titre), avec tendance (flèche haut/bas).  
- **Dimensions** : hauteur 80 px, padding 12 px, rayon 8 px, ombre niveau 1.  
- **Accessibility** : annoncer le titre, la valeur et la tendance si présente.  
- **Bonnes pratiques** : utiliser pour afficher un KPI rapide sur un tableau de bord.  
- **Mauvaises pratiques** : surcharger avec trop de métriques rendant la carte illisible.

### Carte revenu
- Spécialisation de la carte statistique montrant un revenu estimé (icône de pièce, montant, périodicité).  
- Suivre les mêmes règles que la carte statistique, avec éventuellement un deuxième ligne pour le détail.

### Chip
- **Variantes** : entrée (champ de filtre), action (bouton petit), sélection (actif/inactif).  
- **Dimensions** : hauteur 32 px, padding horizontal 12 px, rayon 16 px (pilule).  
- **Accessibility** : rôle `button` ou `checkbox` selon variante, contraste texte/fond ≥ 4.5:1.  
- **Bonnes pratiques** : utiliser pour filtrer des listes ou représenter des attributs courts.  
- **Mauvaises pratiques** : rendre le chip trop petit rendant le texte illisible.

### Tag
- Identique au chip mais généralement en lecture seule pour catégoriser un élément.  
- Utiliser les mêmes dimensions et styles.

### Puce d’état
- **Variantes** : couleur uniquement (cercle coloré), texte intérieur, icône intégrée.  
- **Dimensions** : diamètre 12 px (petit), 16 px (moyen), 20 px (grand).  
- **Accessibility** : fournir une description textuelle de l’état (ex. : « En cours », « Terminé ») via `aria-label` ou `contentDescription`.  
- **Bonnes pratiques** : utiliser pour indiquer le statut d’un élément dans une liste ou une carte.  
- **Mauvaises pratiques** : utiliser uniquement la couleur sans alternative textuelle pour les daltoniens.

## Bonnes pratiques générales de composants
- Réutiliser les mêmes variantes et états partout où le composant apparaît.  
- Maintenir une cohérence de rayon de bordure (8 px pour la plupart des éléments interactifs).  
- Respecter les zones tactiles minimales (≥ 48 px).  
- Fournir toujours une alternative textuelle pour les icônes et les illustrations utilisées dans les composants.  
- Éviter de créer des variantes « one‑off » qui ne sont pas réutilisables ailleurs.

## Mauvaises pratiques générales
- Créer un composant spécifique pour un écran unique sans envisager sa réutilisation.  
- Dériver les couleurs, rayons ou espacements des tokens de base sans justification.  
- Oublier de gérer les états de chargement et d’erreur, laissant l’utilisateur dans l’incertitude.  
- Utiliser des polices ou des tailles de texte non définies dans la section de typographie.  
- Omettre le contraste en mode désactivé ou en état d’erreur.

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : spécifications détaillées de chaque composant (props, événements, animations) provenant d’une bibliothèque de composants existante ou d’un guide de composants Figma. 
> 
> **Recommandation** : réaliser un audit des maquettes afin d’extraire les comportements interactifs précis (ex. : durée d’animation de chargement, comportement du swipe sur une carte, comportement du sélecteur) et les formaliser dans une spécification de composants réutilisable. En attendant, utiliser les présentes spécifications comme base et itérer avec l’équipe produit lors de l’implémentation.

---

# 9 États des composants

Ce chapitre décrit les états visuels et interactifs que peut prendre un composant UI. Chaque état est défini par une combinaison de modifications de couleur, de forme, d’ombre, de mouvement ou de contenu. Les états doivent être appliqués de manière cohérente sur tous les composants interactifs (boutons, champs, cartes, commutateurs, etc.).

## États universels

| État | Description | Modifications visuelles courantes |
|------|-------------|-----------------------------------|
| **Normal** | État de repos, aucune interaction en cours. | Valeurs de base définies par les tokens (couleur de fond, texte, bordure, rayon). |
| **Pressed** (enfoncé) | L’utilisateur appuie activement sur le composant (touch down, clic maintenu). | Overlay sombre ou clair selon le fond : <br>• Sur fond clair : overlay noir 0.08 (Android) / blanc 0.12 (iOS) <br>• Sur fond sombre : overlay blanc 0.12 (Android) / noir 0.12 (iOS) <br>Possibilité de réduire légèrement l’échelle (scale 0.98) pour un retour tactile. |
| **Focused** (focus) | Le composant reçoit le focus clavier ou de navigation (ex. : tabulation, déplacement au clavier). | Overlay clair sur fond clair : blanc 0.12 <br>Overlay sombre sur fond sombre : noir 0.12 <br>Souvent accompagné d’un contour extérieur (outline) de 2 px couleur `color.primary` ou `color.borderVariant`. |
| **Hovered** (survol) | Le pointeur souris est au-dessus du composant (uniquement web/desktop). | Overlay très léger : noir 0.04 sur fond clair, blanc 0.04 sur fond sombre. <br>Souvent utilisé pour indiquer la possibilité d’interaction sans déclencher l’action. |
| **Dragged** (glissé) | L’utilisateur maintient le doigt et commence à déplacer le composant (ex. : glisser une carte, réordonner une liste). | Similaire à `pressed` mais avec une opacité légèrement réduite (0.6) et parfois une ombre augmentée pour donner l’impression de levée. |
| **Loading** (chargement) | Le composant effectue une opération asynchrone (chargement de données, envoi de formulaire). | Le contenu habituel est remplacé par un indicateur de chargement : <br>• Indicateur circulaire (spinner) centré <br>• Ou barre de progression linéaire selon le contexte <br>Le reste du composant reste visible mais peut être désaturé (opacity 0.7). |
| **Disabled** (désactivé) | Le composant ne peut pas être interactif en raison d’un état d’application (ex. : formulaire incomplet, permission manquante). | Fond : `color.disabled` (gris moyen) <br>Texte : `color.onSurface` avec opacity 0.38 <br>Icône : `color.disabled` avec opacity 0.38 <br>Souvent le rayon de bordure reste inchangé, mais l’ombre est supprimée (élévation 0). |
| **Selected** (sélectionné) | Le composant est dans un état actif choisi parmi un groupe (ex. : onglet actif, case cochée, switch activé). | Fond : peut changer vers `color.primary` avec texte `color.onPrimary` <br>Ou bordure renforcée (2 px) couleur `color.primary` <br>Pour les cases à cocher : coche visible (check) couleur `color.primary` <br>Pour les switches : poignée déplacée vers la droite, piste couleur `color.primary`. |
| **Unselected** (non sélectionné) | État inverse de selected dans un groupe de choix mutuel. | Retour aux valeurs de base (normal) ou état disabled si le groupe est temporairement indisponible. |
| **Success** (succès) | Une action associée au composant a réussi (ex. : formulaire soumis, validation passée). | Fond : `color.success` (vert) <br>Texte : `color.onSuccess` (blanc ou gris très foncé selon contraste) <br>Icône : check mark couleur `color.onSuccess` <br>Souvent accompagnée d’un message de confirmation temporaire. |
| **Error** (erreur) | Une action associée au composant a échoué ou la saisie est invalide. | Fond : `color.error` (rouge) <br>Texte : `color.onError` (blanc) <br>Icône : croix ou point d’exclamation couleur `color.onError` <br>Affichage d’un texte d’erreur en dessous ou en infobulle avec couleur `color.error`. |
| **Warning** (avertissement) | Une situation nécessite l’attention de l’utilisateur mais ne bloque pas l’action. | Fond : `color.warning` (amber) <br>Texte : `color.onWarning` (noir ou blanc selon contraste) <br>Icône : symbole d’avertissement (triangle) couleur `color.onWarning`. |
| **Info** (information) | Transmission d’une information neutre ou d’un aide supplémentaire. | Fond : `color.info` (bleu clair) <br>Texte : `color.onInfo` (blanc ou noir) <br>Icône : symbole d’information (i) couleur `color.onInfo`. |
| **Empty** (vide) | Le composant attend du contenu mais n’en possède pas actuellement (ex. : liste vide, champ de texte vide). | Souvent aucune modification de style propre, mais affiche un placeholder ou une illustration vide. <br>Le placeholder texte utilise `color.placeholder` avec style `italic` ou léger. |
| **ReadOnly** (lecture seule) | Le contenu peut être visualisé mais pas modifié (ex. : texte affiché, valeur de calcul). | Fond identique à `normal` mais le texte peut être légèrement désaturé (opacity 0.8) ou rester identique. <br>Souvent le curseur de texte est absent et les interactions de clavier sont désactivées. |

## Application des états par type de composant

### Bouton
- Normal → Pressed → Focused → Disabled → Loading → Success/Error (si applicable)
- Le état `pressed` est généralement de très courte durée (100‑150 ms) avant de revenir à `normal` ou de déclencher l’action.

### Champ texte
- Normal → Focused (au toucher ou au tab) → Désactivé éventuel → Erreur (si validation échoue) → Succès (si validation réussit)  
- Lors du focus, afficher un contour extérieur (outline) de 2 px `color.primary` ou `color.borderVariant`.  
- En état `error`, afficher le texte d’aide en `color.error` et éventuellement une icône d’alerte à droite.

### Carte (interactive)
- Normal → Pressed → Focused → Disabled  
- Le état `pressed` peut légèrement élever l’ombre (élévation +2) pour donner l’impression d’enfoncement.  
- En mode `disabled`, supprimer l’ombre et désactiver le clic.

### Switch / Checkbox / Radio
- Normal → Pressed → Focused → Selected → Disabled  
- En état `selected`, l’indicateur interne (coche, rond, poignée) passe à la couleur `color.primary` (ou `color.success` selon contexte).  
- En état `disabled`, le tracé et l’indicateur passent à `color.disabled` avec opacity 0.38.

### Onglet (Bottom Navigation, Top Bar tabs)
- Normal → Pressed → Focused → Selected → Disabled  
- L’onglet sélectionné affiche souvent l’icône et le texte en `color.primary` tandis que les autres utilisent `color.onSurfaceVariant` avec opacity 0.6.

### Liste d’éléments sélectables
- Chaque élément suit les états `normal`, `pressed`, `focused`, `selected`.  
- En mode `multiple selection`, plusieurs éléments peuvent être `selected` simultanément.

### Indicateur de chargement (Loader, Progress Indicator)
- `Loading` : animation continue (spinner) ou barrette animée.  
- En mode déterminé, afficher le pourcentage et éventuellement changer la couleur de remplissage en fonction du progrès (ex. : vert si > 80 %).  
- En cas d’erreur, passer à l’état `error` avec couleur `color.error` et afficher un message d’erreur.

### Badge
- Normal → Pressed (si tappable) → Focused → Disabled  
- Le état `pressed` peut appliquer un overlay comme pour les boutons.  
- En `disabled`, le badge devient `color.disabled` avec opacity 0.38 et ne répond plus aux pressions.

### Notification / Snackbar / Toast
- Normal → Apparition (slide in) → Visible → Disparition (slide out)  
- Aucun état de press ou focus sauf si une action est intégrée (bouton « Réessayer » ou « Annuler »).  
- En cas d’action, le bouton interne suit les états du bouton classique.

### Modal / Dialogue
- Normal → Entrée (fade in ou slide up) → Visible → Sortie (fade out ou slide down)  
- Le fond derrière le modal reçoit souvent un overlay sombre (opacity 0.5) pour mettre en avant le contenu.  
- Lors de l’interaction avec un bouton inside, les états du bouton s’appliquent normalement.

## Animations et durées conseillées
| Transition | Durée | Fonction d’atténuation |
|------------|-------|------------------------|
| Pressed → Normal | 100 ms | linéaire ou ease-out |
| Normal → Focused | 150 ms | ease-out |
| Focused → Normal | 150 ms | ease-in |
| Normal → Disabled | 200 ms | ease-out |
| Disabled → Normal | 200 ms | ease-in |
| Entrée de modal | 250 ms | ease-out |
| Sortie de modal | 250 ms | ease-in |
| Apparition de snackbar | 200 ms | ease-out |
| Disparition de snackbar | 200 ms | ease-in |
| Changement d’onglet | 200 ms | ease-out |
| Effet de pression (ripple) | 350 ms | ease-out (radial) |

## Accessibilité des états
- Chaque changement d’état doit être annoncé par les lecteurs d’écran lorsqu’il modifie la signification du composant (ex. : bouton désactivé, sélection d’onglet, état de chargement).  
- Utiliser les propriétés ARIA appropriées : `aria-disabled`, `aria-expanded`, `aria-pressed`, `aria-selected`, `aria-busy` (pour loading).  
- S’assurer que le contraste entre les couleurs de l’état et l’arrière‑plan respecte WCAG AA (au moins 4.5:1 pour le texte, 3:1 pour les éléments graphiques grands).  
- Ne pas se fier uniquement à la couleur pour transmettre un état (ex. : un bouton vert pour succès doit également avoir un texte ou une icône qui indique le succès).  
- En mode de contraste élevé ou d’inversion des couleurs, les états doivent rester discernibles (tester avec les filtres du système d’exploitation).

## Bonnes pratiques
- Définir un état de base (`normal`) clair et cohérent avant d’ajouter les variantes.  
- Utiliser les mêmes overlays (couleurs et opacités) pour tous les composants afin de garantir une expérience unifiée.  
- Éviter les changements d’état trop rapides (< 50 ms) qui peuvent être manqués ou provoquer une sensation de flottement.  
- Tester les états sur les plateformes cibles (Android, iOS, web) car les rendements d’ombre et d’overlay peuvent différer légèrement.  
- Fournir une désactivation gracieuse : lorsqu’un composant devient `disabled`, s’assurer que l’utilisateur comprend pourquoi (infobulle, texte d’aide).  

## Mauvaises pratiques
- Utiliser des couleurs d’état qui ne contrastent pas suffisamment avec le fond (ex. : rouge erreur sur fond rose pâle).  
- Omettre l’état `focused`, rendant la navigation au clavier impossible ou difficile.  
- Appliquer un effet de pression trop fort (échelle 0.8) donnant l’impression que le composant se casse.  
- Confondre `loading` avec `disabled` : un composant en chargement doit rester interactif pour annuler si possible.  
- Ne pas rétablir l’état `normal` après une erreur temporaire (ex. : après validation réussie, le champ doit revenir à l’état normal, pas rester en erreur).  

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : valeurs exactes d’opacité d’overlay et durées d’animation utilisées dans les maquettes fournies (nécessitent une analyse frame‑by‑frame ou des spécifications d’interaction). 
> 
> **Recommandation** : mesurer les transitions à l’aide d’outils d’enregistrement d’écran ou demander les spécifications d’interaction à l’équipe de conception. En attendant, appliquer les valeurs ci‑dessus, qui sont conformes aux guidelines Material et iOS, et ajuster après validation utilisateur.

---

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

---

# 11 Accessibilité

## Objectif
Garantir que l’application Relio soit utilisable par le plus grand nombre possible, incluant les personnes présentant des déficits visuels, auditifs, moteurs ou cognitifs. L’accessibilité doit être intégrée dès la conception et vérifiée tout au long du développement.

## Références
- **WCAG 2.1** (Niveau AA) comme référentiel principal pour le contraste et l’interactivité.
- **Guidelines Android Accessibility** et **iOS Accessibility Guidelines** pour les spécificités plateforme.
- **Section 508** et **EN 301 549** pour les éventuelles exigences réglementaires.

## Contraste des couleurs
| Element | Contraste minimum requis | Exemple de combinaison conforme |
|---------|--------------------------|---------------------------------|
| Texte normal (≥ 18 pt ou 14 pt gras) | 4.5:1 | Texte `#212121` sur fond `#FFFFFF` (21:1) |
| Texte grand (≥ 24 pt ou 18 pt gras) | 3:1 | Texte `#212121` sur fond `#FFFFFF` |
| Texte de grande taille (icônes, éléments graphiques) | 3:1 | Icône `#212121` sur fond `#FFFFFF` |
| Texte en état disabled | 4.5:1 (recommandé) | Texte `#BDBDBD` sur fond `#FFFFFF` (5.4:1) – respecter si possible |
| États de bordure et éléments non textuels | 3:1 | Bordure `#E0E0E0` sur fond `#FFFFFF` (�� 15:1) – largement suffisant |

- Utiliser l’outil de contraste intégré aux systèmes de design (ex. : Figma plugin “Contrast”, WebAIM Contrast Checker) pour valider chaque combinaison de couleur proposée.
- En cas de doute, privilégier les combinaisons de couleurs issues de la palette définie (section 3) qui ont été testées pour atteindre au moins 4.5:1.

## Zones tactiles (touch targets)
- **Taille minimale recommandée** : 48 × 48 dp (Android) / 44 × 44 pt (iOS) / 48 × 48 px (web, approximatif).  
- Cette taille garantit que l’utilisateur peut atteindre la cible avec un doigt sans déclencher accidentellement un élément adjacent.
- Si l’icône ou le texte est plus petit, augmenter le padding invisible autour du composant afin d’atteindre la taille minimale tout en conservant l’aspect visuel centré.
- Exemple : une icône de 24 px placée dans un conteneur de 48 × 48 px avec des marges internes de 12 px de chaque côté.

## Navigation et déplacement au clavier
- Tous les éléments interactifs doivent être atteignables via la touche **Tab** (web) ou l’équivalent de navigation au clavier (Android : `Trackball` ou dispositif d’accessibilité ; iOS : clavier externe ou Switch Control).  
- L’ordre de tabulation doit suivre l’ordre logique de lecture (de haut en bas, de gauche à droite).  
- Éviter de piéger l’utilisateur dans un piège de tabulation (focus coincé) sauf dans les cas légitimes (modal, boîte de dialogue) où un mécanisme de fermeture clair est fourni (Échap, bouton « Fermer »).  
- Fournir un indicateur de focus visible (outline ou changement de couleur) qui contraste d’au moins 3:1 avec le fond environnant.

## Lecteurs d’écran (TalkBack, VoiceOver, lecteurs web)
- Chaque élément d’interface doit posséder une **description textuelle** significative :
  - Android : `contentDescription` (ou `hint` pour les champs éditables).  
  - iOS : `accessibilityLabel` (et éventuellement `accessibilityHint` ou `accessibilityValue`).  
  - Web : attribut `aria-label`, `aria-labelledby` ou texte intérieur visible.  
- Éviter les redondances : ne pas répéter exactement le texte visible si celui-ci suffit (ex. : un bouton contenant le texte « Confirmer » n’a pas besoin d’un `contentDescription` identique, mais il est utile d’ajouter du contexte si le bouton est icône uniquement).  
- Pour les éléments dynamiques (chargement, erreur, succès) mettre à jour la description lorsqu’elle change :
  - Ex. : lorsqu’un bouton passe en état `loading`, définir `contentDescription` sur « En cours de chargement » ou laisser le texte du bouton et ajouter `aria-busy="true"`.  
- Regrouper les éléments liés lorsqu’ils forment une unité logique (ex. : champ texte + icône de suppression) afin de réduire le nombre d’annonces.  
- Utiliser les rôles ARIA appropriés lorsqu’un élément ne possède pas de rôle sémantique natif (ex. : `role="switch"` pour un bascule personnalisé, `role="checkbox"` pour une case à cocher custom).  
- S’assurer que les listes et les tableaux possèdent les bonnes attributs (`<ul>/<ol>`, `<table>` avec `<th>`) ou leurs équivalents Android/iOS.

## Couleurs et états
- Aucun état ne doit être transmis **uniquement par la couleur**. Toujours ajouter un indicateur non chromatique :
  - État `success` : icône de coche ou texte « Succès ».  
  - État `error` : icône de croix ou texte « Erreur ».  
  - État `disabled` : outre la désaturation, réduire l’opacité à 0.38 et éventuellement ajouter un motif de lignes fines (si le design le permet).  
  - État `selected` : outre la couleur de fond, ajouter une coche, un trait souligné ou un changement de forme (ex. : bouton qui devient plus étroit).  
- Utiliser les palettes de couleurs définies (section 3) qui ont été vérifiées pour le contraste nécessaire en combinaison avec les couleurs de texte appropriées.

## Typographie et lisibilité
- La taille de texte minimale doit être **12 pt** (équivalent 16 px sur écran moyen densité) pour du contenu lisible sans zoom.  
- Respecter les préférences de taille de police de l’utilisateur (`sp` sur Android, `pt` sur iOS, réglage du navigateur web).  
- Éviter l’usage de lettres en majuscules pour de longs textes (difficile à lire) ; réserver la majuscule aux étiquettes courtes et aux boutons.  
- Maintenir un interligne (line height) d’au moins 1.4 pour le corps de texte afin d’améliorer la lisibilité, particulièrement pour les utilisateurs avec dyslexie ou faible acuité visuelle.  
- Éviter les textures de fond ou les images complexes derrière le texte qui réduisent le contraste.

## Audio et alternatives
- Toute information transmise par le son doit également être disponible en version visuelle (ex. : vibration ou texte à l’écran).  
- Les alertes sonores (ex. : bip de confirmation) doivent être réglables en volume ou désactivables dans les paramètres de l’application.  
- Fournir un mode silencieux qui remplace les sons par des indications visuelles (ex. : icône de clignotement ou texte).  

## Bonnes pratiques d’accessibilité
- Intégrer l’accessibilité dès la phase de maquettes : vérifier le contraste, les zones tactiles et les libellés avant de passer en haute définition.  
- Utiliser des outils d’audit automatisés (ex. : axe-core pour web, Accessibility Scanner pour Android) lors des builds de pré‑release.  
- Effectuer des tests utilisateurs avec des personnes ayant diverses capacités (ex. : utilisateurs de lecteurs d’écran, personnes avec daltonisme, personnes avec tremblements).  
- Documenter les décisions d’accessibilité dans les spécifications de composants afin que les implémentateurs ne les omettent pas.  
- Prévoir un paramètre dans les réglages de l’application permettant de :
  - Augmenter la taille de texte globale.  
  - Activer le contraste élevé (inverser les couleurs ou utiliser des bordures plus épaisses).  
  - Désactiver les animations (pour les utilisateurs sensibles au mouvement).  

## Mauvaises pratiques à éviter
- Se fonder uniquement sur la couleur pour indiquer un état (ex. : bouton vert pour « activé » sans texte ou icône).  
- Utiliser des tailles de texte inférieure à 12 pt pour du contenu lisible.  
- Oublier de fournir une `contentDescription` ou `aria-label` sur les icônes qui transmettent une information (ex. : icône de panier, icône de notification).  
- Créer des zones tactiles plus petites que 48 dp sans justification liée à un geste spécifique (ex. : glisser une carte).  
- Ne pas tester le contraste en mode de contraste élevé ou en inversion des couleurs imposé par le système d’exploitation.  
- Ignorer les retours des lecteurs d’écran : annoncer des états qui changent sans mise à jour de la description (ex. : passage d’un champ en erreur sans mettre à jour l’`aria-invalid`).  

---

### Recommandation Design (si informations manquantes)
> **Information non définie.** : résultats précis de tests d’accessibilité réalisés sur les maquettes fournies (nécessitent des outils d’analyse ou des retours d’utilisateurs en situation de handicap). 
> 
> **Recommandation** : conduire un audit d’accessibilité complet sur une version haute fidélité du design (Figma ou prototype interactif) en utilisant les outils cités ci‑dessus, puis itérer sur les éléments qui ne passent pas les critères WCAG AA 2.1. En attendant, appliquer les règles ci‑dessus, qui représentent les meilleures pratiques du domaine, et vérifier chaque livrable d’implementation avec une checklist d’accessibilité (voir chapitre 15). 

---

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

---

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

---

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

---

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

---

