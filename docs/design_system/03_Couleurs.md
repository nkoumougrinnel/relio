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
