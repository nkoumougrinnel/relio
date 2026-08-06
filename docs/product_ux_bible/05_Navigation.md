# 5 Navigation

## Navigation Client
### Structure générale
L'application Client suit une navigation basée sur un onglet inférieur (bottom tab) avec trois sections principales :
1. **Accueil** : barre de recherche pour exprimer un problème, catégories rapides, bouton « Devenir prestataire »
2. **Suivi** : liste des demandes en cours et récentes avec statut (demande reçue, recherche en cours, professionnel trouvé, intervention confirmée, intervention terminée, paiement en attente, évaluée)
3. **Profil** : informations du client, historique complet, paramètres, option de basculer en mode prestataire, déconnexion

### Détails par écran
- **Accueil** : 
  - Barre de recherche centrale avec placeholder « Décrivez votre problème... »
  - Deux icônes de saisie : texte et vocal
  - Défilement horizontal des catégories rapides (Plomberie, Électricité, Climatisation, Automobile, Réparation électronique, Maison)
  - Bouton flottant ou fixe en bas « Devenir prestataire » (navigation vers le flux d'inscription prestataire)
- **Suivi** :
  - Liste déroulante avec séparateurs de date
  - Chaque carte d'intervention affiche : photo du professionnel, nom, métier, statut coloré, date/heure
  - En tapant sur une carte : vue détaillée de l'intervention (timeline étape par étape, possibilité de paiement ou d'évaluation selon étape)
- **Profil** :
  - Informations personnelles : nom, numéro de téléphone, quartier
  - Bouton « Modifier le profil »
  - Section « Historique » : liste des demandes avec statut et notes
  - Section « Paramètres » : notifications, langue, thème (clair/sombre), aide, déconnexion
  - Bandeau « Devenir prestataire » avec explication des avantages et bouton d'appel à l'action

### Règles de navigation
- Depuis n'importe quel écran, le bouton de retour matériel ou geste mène à l'écran précédent, sauf dans les flux modaux (confirmation de paiement, évaluation) où il annule l'action et revient à l'écran précédent.
- La navigation entre onglets doit préserver l'état de chaque onglet (ex. : revenir à l'onglet Suivant conserve le défilement de la liste).
- Les actions critiques (confirmation d'attribution, paiement, évaluation) nécessitent une confirmation explicite (bouton « Confirmer ») et offrent une option d'annulation.

## Navigation Prestataire
### Structure générale
L'application Prestataire utilise également un onglet inférieur avec trois sections :
1. **Missions** : liste des missions nouvelles, acceptées et terminées
2. **Profil** : informations professionnelles, Score Relio, historique, paramètres
3. **Calendrier** (optionnel) : vue quotidienne/hebdomadaire des missions acceptées (à définir selon évolutions futures)

### Détails par écran
- **Missions** :
  - Trois onglets internes ou sections : « Nouvelles », « Acceptées », « Terminé »
  - « Nouvelles » : carte de mission avec type de problème, quartier, distance, niveau d'urgence, boutons « Accepter » / « Refuser »
  - « Acceptées » : liste des missions en cours avec statut (acceptée, en intervention, terminée) et possibilité de voir les détails
  - « Terminé » : historique des missions terminées avec note reçue du client
- **Profil** :
  - Photo professionnelle, nom, métier
  - Note moyenne affichée en étoiles
  - Nombre total de missions réalisées
  - Score Relio affiché avec répartition des critères (compétence, disponibilité, distance, réputation, historique)
  - Bouton « Mettre à jour le profil » (zone d'intervention, disponibilités, compétences)
  - Section « Documents » : liste des justificatifs soumis pour vérification
  - Bouton « Contacter le support » (en cas de problème)
- **Calendrier** (si implémenté) :
  - Vue mensuelle avec points indiquant les jours contenant des missions
  - Vue jour avec liste horaire des missions acceptées
  - Possibilité de filtrer par statut (acceptée, terminée)

### Règles de navigation
- Retour matériel ou geste : revient à l'écran précédent, quitte les écrans de détail de mission.
- Depuis l'écran de détail d'une mission en cours, un bouton « Signaler un problème » permet d'alerter l'administrateur.
- Les notifications push ouvrent directement l'onglet « Missions » sur la carte concernée si l'application est en arrière-plan.

## Navigation Admin (Dashboard)
### Structure générale
Le Dashboard Administrateur est une application web avec une navigation latérale (sidebar) et une barre supérieure (header).

### Détails par écran
- **Sidebar** :
  - Tableau de bord (vue d'ensemble)
  - Gestion des demandes
  - Gestion des prestataires
  - Analyse de performance
  - Paramètres (optionnel)
- **Header** :
  - Logo Relio
  - Nom de l'utilisateur connecté et rôle
  - Bouton de déconnexion
  - Notifications système (alertes, messages)

### Détails par écran principal
- **Tableau de bord** : widgets affichant les KPI en temps réel ou rafraîchis toutes les X minutes :
  - Demandes reçues aujourd'hui / total
  - Demandes traitées (avec professionnel attribué) aujourd'hui / total
  - Interventions terminées aujourd'hui / total
  - Chiffre d'affaires aujourd'hui / total (estimation basée sur prix moyens)
  - Satisfaction moyenne (note sur 5)
  - Temps moyen d'attribution (en minutes)
  - Taux de réussite (% interventions terminées sans annulation)
  - Nombre de prestataires actifs / total
- **Gestion des demandes** :
  - Liste filtrable et triable des demandes avec colonnes : ID, client, problème exprimé, quartier, statut, professionnel proposé, heure de réception
  - Chaque ligne possède des actions : voir détail, modifier attribution, contacter client, contacter prestataire
  - Vue détail d'une demande : informations client, texte/vocal original, compréhension moteur (objet, symptôme, intention, urgence), liste des professionnels compatibles avec leurs scores, historique des modifications d'attribution
- **Gestion des prestataires** :
  - Liste filtrable et triable des prestataires avec colonnes : nom, métier, zone, note moyenne, nombre de missions, statut (actif, suspendu, en attente de vérification), date d'inscription
  - Actions : voir détail, valider/refuser, suspendre/réactiver, modifier profil, contacter
  - Vue détail prestataire : profil complet, documents justificatifs, historique des interventions avec notes, évolution du Score Relio, répartition des zones d'intervention
- **Analyse de performance** :
  - Graphiques temporels (courbes, barres) pour :
    - Nombre de demandes reçues par jour
    - Temps moyen d'attribution par jour
    - Taux de réussite par jour
    - Satisfaction moyenne par jour
    - Répartition des catégories de problèmes (plomberie, électricité, etc.)
    - Répartition géographique (quartiers, villes)
  - Filtres par période, catégorie de service, zone géographique
  - Export des données en CSV

### Règles de navigation
- La navigation latérale permet de passer d'une section à l'autre sans perdre l'état de la page actuelle (ex. : revenir à Gestion des demandes conserve les filtres appliqués).
- Les boutons d'action sur les lignes de liste ouvrent généralement un modal ou une panneaux latéral pour éviter de perdre le contexte.
- Les modifications critiques (changement d'attribution, suspension de prestataire) nécessitent une confirmation explicite avec motif obligatoire.
- Le dashboard doit être accessible depuis un navigateur web moderne (Chrome, Firefox, Safari) et adapté aux écrans de taille moyenne à grande (minimum 1024px largeur).

## Notes importantes
- Les maquettes détaillées de navigation (disponibles dans le dossier `docs/maquettes/`) doivent être consultées pour valider l'agencement exact des éléments, les espacements et les comportements d'interaction.
- **Information non définie.** : spécifications exactes des transitions animées, des états de chargement entre les onglets, et des raccourcis gestuels (swipe pour rafraîchir, etc.).
  - Recommandation UX : établir un guide de motion détaillant les transitions de base (fondus, glissements) pour maintenir une cohérence visuelle entre les applications mobile et web.
