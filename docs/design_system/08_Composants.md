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
