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
