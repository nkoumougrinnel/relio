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
