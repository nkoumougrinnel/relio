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
