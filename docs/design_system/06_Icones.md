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
