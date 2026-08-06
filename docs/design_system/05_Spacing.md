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
