# Product & UX Bible

*Document de référence produit de Relio — Version 1.0*

# Table des matières détaillée

## 0 Executive Summary
- Présentation générale
- Vision
- Objectifs
- Architecture globale
- Résumé du MVP

## 1 Vision Produit
- Pourquoi relio existe
- Le problème
- La solution
- Les valeurs
- Les principes UX

## 2 Personas
- Client
- Prestataire
- Administrateur
  - Objectifs
  - Frustrations
  - Besoins
  - Parcours

## 3 Architecture Produit
- Applications
- Backend
- API
- Back-office
- Matching Engine

## 4 États Utilisateur
- Compte invité
- Compte Client
- Validation Prestataire
- Prestataire
- Suspension
- Suppression

## 5 Navigation
- Navigation Client
- Navigation Prestataire
- Navigation Admin
- Toutes les règles

## 6 Parcours Client
- Décrire toutes les pages
- Leur objectif
- Leur contenu
- Leur navigation
- Leurs états
- Leurs cas d'erreur
- Leurs règles métier

## 7 Parcours Prestataire
- Même niveau de détail

## 8 Back-office Admin
- Toutes les fonctionnalités
- Validation
- Paiement
- Support
- Utilisateurs
- Configuration

## 9 Règles Métier
- Cycle de vie complet d'une mission
- Matching
- Début d'intervention
- Fin d'intervention
- Paiement
- Évaluation
- Notifications
- Annulation
- Suspension

## 10 Notifications
- Toutes les notifications
- Push
- Locales
- In-app

## 11 États spéciaux
- Loading
- Erreur
- Vide
- GPS
- Internet
- Permissions
- Paiement échoué

## 12 Cas particuliers
- Annulation
- Refus
- Aucun prestataire
- Prestataire hors ligne

## 13 Glossaire
- Tous les termes métier

---


---


---


---


---


---


---


---


---


---


---


---


---


---

# 0 Executive Summary

## Présentation générale
Relio est une plateforme intelligente d'attribution automatisée des prestataires de services du quotidien en Afrique urbaine. Elle permet à un utilisateur confronté à un problème du quotidien (panne électrique, fuite d'eau, etc.) de simplement décrire son problème en langage naturel (texte ou voix) et d'être mis en relation automatique avec le professionnel le plus adapté pour le résoudre, sans avoir besoin de chercher ou comparer plusieurs prestataires.

## Vision
Relio ambitionne de devenir l'infrastructure intelligente qui permet à chaque personne de résoudre rapidement les problèmes quotidiens en la mettant automatiquement en relation avec le professionnel adapté. Le modèle inverse celui d'une marketplace traditionnelle : l'utilisateur exprime son problème, Relio le comprend et attribue directement le professionnel le plus pertinent.

## Objectifs du MVP
Le MVP V1 doit démontrer que Relio peut gérer l'intégralité du cycle d'une prestation, de bout en bout :
- Expression du besoin
- Compréhension de la demande
- Attribution d'un professionnel
- Réalisation de l'intervention
- Paiement
- Évaluation

Objectifs secondaires :
- Créer une première base de clients actifs et engagés
- Recruter un réseau initial de prestataires fiables et vérifiés
- Mesurer la demande réelle pour les différentes catégories de services
- Mesurer les performances opérationnelles du modèle d'attribution
- Convaincre les partenaires et investisseurs de la viabilité du modèle

## Architecture globale
Le produit repose sur trois interfaces reliées par un moteur central d'attribution connecté à une base de données commune :
- **Application Client** (React Native/Expo) : saisie texte/vocal, suivi, paiement, évaluation
- **Application Prestataire** (React Native/Expo) : réception et gestion des missions
- **Dashboard Administrateur** (React + Vite) : supervision, validation, arbitrage humain
- **API Backend** (Django + DRF) : orchestrateur des échanges
- **Moteur d'Attribution Relio** : compréhension du besoin + scoring + matching (cœur du produit)
- **Base de données** : PostgreSQL

Le moteur d'attribution fonctionne en cinq couches : collecte de la demande, compréhension du problème, classification du besoin, matching professionnel, attribution optimisée. Il utilise un score dynamique (Score Relio) basé sur compétence (35%), disponibilité (20%), distance (20%), réputation (15%) et historique (10%).

## Résumé du MVP
Le MVP couvre l'intégralité du cycle de prestation à travers trois interfaces complémentaires. Il cible initialement les villes de Douala et Yaoundé (Cameroun) avec un focus sur la simplicité (max 3 clics avant demande), la confiance (profils vérifiés, notes visibles) et la rapidité (création de demande en <60s). Les fonctionnalités volontairement exclues (chat interne, IA avancée, portefeuille paiement propriétaire, assurance intégrée, abonnement premium, marketplace ouverte, géolocalisation temps réel, programme de fidélité, publicité) sont reportées à V2/V3.

La réussite du MVP se mesure à l'acquisition (utilisateurs téléchargent et créent des demandes), l'opération (Relio trouve un professionnel adapté et les interventions sont réalisées) et la qualité (satisfaction >4/5, faible taux d'annulation). Des indicateurs indicatifs à 3 mois : 500 clients inscrits, 50 prestataires actifs, 300 demandes traitées, temps moyen d'attribution <30min, note moyenne de satisfaction 4/5.

---

# 1 Vision Produit

## Pourquoi relio existe
Relio existe pour résoudre le décalage entre l'expression d'un problème quotidien par un utilisateur et la recherche du professionnel adapté. Dans la réalité, les utilisateurs ne pensent pas en termes de métier (« technicien frigoriste ») mais en termes de symptôme (« mon frigo ne marche plus »). Les marketplaces classiques obligent l'utilisateur à connaître le métier, à comparer plusieurs offres et à faire un choix, ce qui constitue une friction importante. Relio inverse ce modèle : l'utilisateur décrit simplement son problème, et la plateforme se charge de comprendre le besoin et d'attribuer le bon professionnel.

## Le problème
Les utilisateurs urbains africains rencontrent fréquemment des pannes ou besoins de services du quotidien (électricité, plomberie, climatisation, automobile, maison). Ils éprouvent souvent des difficultés à :
- Identifier le métier nécessaire
- Trouver un professionnel disponible et compétent
- Faire confiance à un prestataire inconnu
- Comparer les offres et les prix
- Pérenniser une relation de confiance

Ces difficultés sont accentuées par l'informalité du secteur des services, la faible pénétration de l'adresse formelle, et la préférence pour la communication orale plutôt que écrite.

## La solution
Relio offre une plateforme où l'utilisateur exprime son problème en langage naturel (texte ou voix). Le moteur intelligent analyse la demande, comprend l'objet, le symptôme, l'intention et l'urgence, classe le besoin dans sa base de connaissance métier, filtre les professionnels compatibles, calcule un score dynamique (Score Relio) et recommande le meilleur professionnel. Le client confirme l'attribution, le prestataire reçoit une notification, réalise l'intervention, suivi par le client, puis paiement et évaluation.

La solution comprend trois interfaces :
- Application Client : pour exprimer le problème et suivre l'intervention
- Application Prestataire : pour recevoir et gérer les missions
- Dashboard Administrateur : pour supervision humaine et validation des attributions (filet de sécurité)

## Les valeurs
- **Simplicité** : l'utilisateur ne doit jamais avoir besoin de connaître le métier correspondant à son problème. Maximum 3 clics avant la création d'une demande.
- **Confiance** : visibilité des profils professionnels vérifiés, notes, historique d'interventions, vérification d'identité, transparence des informations (prix estimatif, distance, disponibilité).
- **Rapidité** : parcours court à chaque étape ; créer une demande complète en moins de 60 secondes du problème exprimé jusqu'à la confirmation d'envoi.

## Les principes UX
Les principes UX découlent directement des valeurs :
1. **Simplicité** : barre de recherche unique en page d'accueil avec saisie texte/vocale, catégories rapides en raccourci, pas de formulaire long.
2. **Confiance** : photo, note et vérification systématiquement visibles avant la confirmation d'un professionnel.
3. **Rapidité** : saisie vocale disponible en un geste, attribution automatique sans étape de comparaison manuelle.

---

# 2 Personas

## Client
### Description
Particulier urbain, utilisateur Android, à la recherche de simplicité et de confiance face à un besoin ponctuel ou urgent.

### Objectifs
- Résoudre rapidement un problème du quotidien sans avoir à chercher quel métier contacter
- Obtenir une intervention fiable et sécurisée
- ��tre rassuré avant, pendant et après la prestation
- Minimiser les efforts (pas de prospection, pas de comparaison)

### Frustrations
- Ne pas savoir quel professionnel appeler pour un symptôme donné
- Perdre du temps à chercher et comparer plusieurs prestataires
- Craindre l'arnaque ou l'incompétence
- Manque de transparence sur les prix et les délais
- Difficulté à suivre l'intervention en temps réel

### Besoins
- Exprimer son problème en langage naturel (texte ou voix)
- Recevoir une recommandation de professionnel clair et rassurante
- Suivre l'intervention en temps réel (étapes, timeline)
- Effectuer le paiement facilement (Mobile Money ou espèces)
- Évaluer la prestation après intervention
- Avoir un support en cas de problème

### Parcours
1. Ouverture de l'application Client
2. Expression du problème via barre de recherche (texte ou vocal) (<60s)
3. Visualisation de l'analyse en cours (« Relio analyse votre demande »)
4. Visualisation de la recherche du professionnel (« Recherche du professionnel adapté »)
5. Affichage de la recommandation professionnelle (photo, nom, métier, note, expérience, distance, disponibilité, prix estimatif)
6. Confirmation du professionnel ou demande d'une autre proposition
7. Notification au prestataire accepté
8. Suivi de l'intervention côté client (demande reçue, recherche en cours, professionnel trouvé, intervention confirmée, intervention terminée)
9. Paiement (Mobile Money ou espèces) avec affichage du montant et du statut
10. Évaluation de la prestation (note ★★★★★ et commentaire sur qualité, rapidité, comportement)
11. Fin du parcours

## Prestataire
### Description
Artisan, technicien, indépendant ou petite entreprise de services, à la recherche de missions qualifiées sans effort de prospection.

### Objectifs
- Recevoir des missions pertinentes et qualifiées près de chez soi
- Développer son activité sans prospection active
- Bâtir une réputation solide via les notes et historiques
- Gérer efficacement son agenda de missions
- ��tre rémunéré de manière transparente et sécurisée

### Frustrations
- Temps perdu en prospection commerciale
- Difficulté à trouver des clients dans sa zone d'intervention
- Incertitude sur le paiement et les délais
- Manque de visibilité sur sa réputation auprès des clients
- Difficulté à gérer les plannings et les rappels de rendez-vous

### Besoins
- Créer un profil professionnel complet (nom, téléphone, métier, zone d'intervention, expérience)
- Passer par une vérification manuelle de l'équipe Relio (pièce d'identité, justificatifs, références)
- Recevoir des notifications de nouvelles missions avec type de problème, quartier, distance, urgence
- Accepter ou refuser une mission en fonction de sa disponibilité et compétence
- Visualiser un historique d'interventions avec notes moyennes et nombre total de missions
- Consulter son Score Relio (compétence, disponibilité, distance, réputation, historique)
- Gérer son profil (mise à jour des disponibilités, zones, compétences)
- Accéder à un tableau de bord des missions (nouvelles, acceptées, terminées)

### Parcours
1. Création du compte professionnel (informations demandées)
2. Soumission pour vérification manuelle par l'équipe Relio
3. Validation du profil et accès à l'application Prestataire
4. Réception de notifications « Nouveau travail disponible » avec détails
5. Acceptation ou refus de la mission
6. Si acceptée : réalisation de l'intervention, suivi éventuel
7. Notification de fin d'intervention au client
8. Réception du paiement (via Mobile Money ou espèces) après confirmation client
9. Possibilité d'évaluer le client (optionnel, selon évolution future)
10. Mise à jour du profil après chaque intervention (expérience, disponibilité)
11. Consultation régulière de l'historique et du Score Relio

## Administrateur
### Description
Membre de l'équipe opérationnelle Relio, chargé de la supervision humaine du système pendant la phase d'amorçage.

### Objectifs
- Garantir la qualité des attributions et éviter les erreurs qui nuiraient à la confiance
- Valider les profils de prestataires soumis
- Surveiller les indicateurs clés de performance (demandes reçues, traitées, interventions terminées, chiffre d'affaires, satisfaction moyenne)
- Intervenir en cas d'attribution erronée ou de problème signalé
- Optimiser le fonctionnement du moteur d'attribution grâce aux retours humains
- Assurer la montée en compétence du système vers une automatisation progressive

### Frustrations
- Risque d'attribution erronée due à des règles métier imparfaites
- Charge de travail élevée en phase de lancement si volume important
- Difficulté à équilibrer supervision humaine et efficacité
- Manque de visibilité sur les tendances à long terme sans historique suffisant

### Besoins
- Tableau de contrôle général avec indicateurs en temps réel
- Vue reliant chaque demande au professionnel proposé et à son statut (possibilité de modifier une attribution)
- Outils de contact avec le client ou le prestataire
- Fonctions de gestion des prestataires (ajout, validation, suspension, modification des profils)
- Modules d'analyse de performance (temps moyen d'attribution, taux de réussite, satisfaction)
- Alertes en cas d'anomalies (taux d'annulation élevé, note moyenne basse, etc.)

### Parcours
1. Connexion au Dashboard Administrateur
2. Consultation du tableau de contrôle général (indicateurs globaux)
3. Examen de la liste des demandes en attente avec professionnel proposé et statut
4. Modification éventuelle d'une attribution (changer de professionnel, ajouter des commentaires)
5. Contact avec le client ou le prestataire pour clarification ou résolution de problème
6. Validation ou suspension de profils prestataires selon vérification documentaire
7. Analyse des performances (temps d'attribution, taux de réussite, satisfaction)
8. Génération de rapports pour prise de décision stratégique
9. Ajustement des paramètres du moteur d'attribution basé sur les retours (ex. : poids des critères)

---

# 3 Architecture Produit

## Applications
Relio repose sur trois applications clientes légères :
- **Application Client** : interface pour les particuliers exprimant un besoin. Développée en React Native/Expo, elle permet la saisie texte ou vocale du problème, le suivi de l'intervention, le paiement et l'évaluation.
- **Application Prestataire** : interface pour les professionnels receiving missions. Aussi en React Native/Expo, elle affiche les notifications de nouvelles missions, permet l'acceptation/refus, le suivi des missions acceptées/terminées, la consultation du profil professionnel et de l'historique.
- **Dashboard Administrateur** : interface web pour l'équipe opérationnelle Relio. Développée en React.js + Vite, elle offre un tableau de contrôle général, la gestion des demandes, la gestion des prestataires et l'analyse de performance.

## Backend
Le backend central est construit avec **Django** et **Django REST Framework (DRF)**. Il expose une API REST qui orchestre les échanges entre les trois interfaces et le moteur d'attribution. Le backend gère l'authentification, la persistance des données, la logique de contrôle d'accès et l'intégration avec les services externes (notifications, paiement, stockage).

## API
L'API Backend fournit les endpoints suivants (non exhaustifs) :
- Authentification / gestion des utilisateurs (client, prestataire, admin)
- Création et suivi des demandes
- Recommandation d'attribution (appelée par le moteur d'attribution ou le dashboard)
- Confirmation d'attribution par le client
- Notification aux prestataires (via intégration Firebase Cloud Messaging)
- Mise à jour du statut de l'intervention (en cours, terminée)
- Enregistrement du paiement
- Soumission d'évaluation
- Gestion des profils prestataires (création, validation, suspension)
- Statistiques et indicateurs pour le dashboard

Le backend communique avec une base de données **PostgreSQL** pour stocker toutes les entités : utilisateurs, demandes, professionnels, interventions, paiements, évaluations, etc.

## Matching Engine (Moteur d'Attribution Relio)
Le cœur du produit est le **Moteur d'Attribution Relio**, situé au centre de l'architecture fonctionnelle. Il transforme une demande exprimée simplement par un client en une intervention attribuée à un professionnel précis. Le moteur fonctionne en cinq couches :

1. **Collecte de la demande** : texte, voix ou catégorie rapide reçue depuis l'application client.
2. **Compréhension du problème** : extraction de l'objet, du symptôme, de l'intention et de l'urgence à partir du langage naturel.
3. **Classification du besoin** : rattachement à la base de connaissance métier (dictionnaire des problèmes typiques, symptômes, causes probables, métiers associés, urgence par défaut).
4. **Matching professionnel** : filtrage des professionnels compatibles (métier, zone de disponibilité, spécialités) puis scoring.
5. **Attribution optimisée** : recommandation du professionnel ayant le meilleur Score Relio.

Le **Score Relio** est un score dynamique recalculé à chaque attribution, pondéré ainsi :
- Compétence : 35%
- Disponibilité : 20%
- Distance : 20%
- Réputation : 15%
- Historique : 10%

Le moteur peut démarrer avec des règles métier et une validation humaine via le Dashboard Administrateur (filet de sécurité), puis évoluer vers des recommandations automatiques et finalement une intelligence prédictive (Niveau 3).

## Interconnexions
Chaque interface est un client léger de l'API Backend. Aucune logique métier critique n'est dupliquée entre les interfaces : la compréhension du besoin et le calcul d'attribution vivent exclusivement dans le Moteur d'Attribution.

- L'application Client envoie la demande à l'API, reçoit la recommandation professionnelle, affiche le suivi et envoie les confirmations/paiement/évaluation.
- L'application Prestataire reçoit les notifications de nouvelles missions via Firebase Cloud Messaging, envoie les réponses d'acceptation/refus et met à jour le statut des missions.
- Le Dashboard Administrateur consulte l'API pour visualiser les demandes, modifier les attributions, gérer les profils prestataires et analyser les performances.
- L'API interroge le moteur d'attribution pour obtenir des recommandations et met à jour la base de données avec les décisions prises.

## Stack technique recommandée (MVP)
| Composant | Technologie |
|-----------|-------------|
| Application mobile | React Native (Expo) – priorité Android |
| Application Prestataire | React Native (Expo) |
| Dashboard administrateur | React.js + Vite |
| Backend / API | Django + Django REST Framework |
| Base de données | PostgreSQL |
| Stockage de fichiers | Cloud Storage (ex. : AWS S3, Google Cloud Storage) |
| Notifications | Firebase Cloud Messaging (FCM) |
| Paiement | Intégration Mobile Money (MTN, Orange Money) et espèces (manuel) |

Cette stack privilégie des technologies matures, largement documentées, adaptées à une équipe étudiante aux ressources limitées.

---

# 4 États Utilisateur

## Compte invité
### Description
Utilisateur qui visite l'application sans avoir créé de compte. Peut potentiellement voir la page d'accueil et la présentation de Relio mais ne peut pas exprimer de demande ni accéder aux fonctionnalités personnalisées.

### Permissions
- Visualisation de la page d'accueil et du logo
- Lecture de la présentation courte de Relio
- Aucun accès à la barre de recherche pour exprimer un problème
- Aucun accès au suivi, paiement ou évaluation

### Transition
- Vers **Compte Client** : après création de compte (nom, numéro de téléphone, quartier, localisation)
- Reste invité : si l'utilisateur choisit de ne pas s'inscrire

## Compte Client
### Description
Utilisateur ayant créé un compte client et pouvant exprimer des besoins, suivre des interventions, effectuer des paiements et laisser des évaluations.

### Permissions
- Expression du problème via barre de recherche (texte ou vocal)
- Visualisation de l'analyse et de la recherche en cours
- Consultation des recommandations professionnelles
- Confirmation d'attribution ou demande d'une autre proposition
- Suivi de l'intervention côté client (étapes : demande reçue, recherche en cours, professionnel trouvé, intervention confirmée, intervention terminée)
- Paiement de l'intervention (Mobile Money ou espèces)
- Évaluation de la prestation (note ★★★★★ et commentaire)
- Visualisation de l'historique personnel des demandes et interventions
- Option « Devenir prestataire » pour basculer vers le statut prestataire

### Transitions
- Vers **Prestataire** : après validation du profil professionnel (processus de vérification manuelle par l'équipe Relio)
- Vers **Compte Client suspendu** : en cas de comportement abusif, fraude ou non-paiement répété (à définir)
- Vers **Suppression** : sur demande de l'utilisateur ou décision administrative

## Validation Prestataire
### Description
État intermédiaire d'un utilisateur ayant soumis une demande de devenir prestataire mais dont le profil n'a pas encore été vérifié manuellement par l'équipe Relio.

### Permissions
- Visualisation du formulaire de création de profil professionnel
- Soumission des informations (nom, téléphone, métier, zone d'intervention, expérience, documents justificatifs)
- Aucun accès aux notifications de missions
- Aucun accès au tableau de bord prestataire

### Transition
- Vers **Prestataire** : après validation réussie par l'équipe Relio (vérification d'identité, justificatifs, références)
- Retour à **Compte Client** : si la demande est rejetée ou si l'utilisateur choisit de rester client

## Prestataire
### Description
Utilisateur dont le profil professionnel a été validé par l'équipe Relio et qui peut recevoir, accepter, réaliser des missions et suivre son historique.

### Permissions
- Réception de notifications « Nouveau travail disponible » avec type de problème, quartier, distance, urgence
- Acceptation ou refus d'une mission
- Visualisation du historique d'interventions (nombre total de missions, note moyenne)
- Consultation du Score Relio (compétence, disponibilité, distance, réputation, historique)
- Mise à jour du profil (disponibilités, zones, compétences)
- Visualisation des missions acceptées et terminées
- Possibilité d'évaluer le client (fonctionnalité optionnelle, à définir selon évolution future)

### Transitions
- Vers **Prestataire suspendu** : en cas de non-respect des engagements, taux d'annulation élevé, comportement inapproprié ou échec répété de vérification
- Vers **Suppression** : sur demande de l'utilisateur ou décision administrative (ex. : fraude, non-conformité répétée)

## Prestataire suspendu
### Description
Prestataire temporairement interdit de recevoir de nouvelles missions en raison d'un problème de qualité, de fiabilité ou de comportement.

### Permissions
- Consultation de l'historique passé et du Score Relio (en lecture seule)
- Aucun accès aux nouvelles notifications de missions
- Possibilité de soumettre des éléments pour lever la suspension (à définir par l'équipe Relio)

### Transition
- Vers **Prestataire** : après levée de la suspension suite à vérification satisfaisante
- Vers **Suppression** : si les problèmes persistent ou en cas de décision administrative

## Compte Client supprimé / Prestataire supprimé
### Description
Compte définitivement retiré de la plateforme. Toutes les données personnelles sont anonymisées ou supprimées selon les règles de rétention et de conformité (RGPD ou équivalent local).

### Permissions
- Aucune accès à l'application
- Toutes les données associées sont rendues inaccessibles

### Transition
- État terminal ; pas de retour possible sans nouvelle création de compte

## Notes importantes
- Les états de suspension et de suppression nécessitent des règles métier précises qui doivent être définies par l'équipe produit. À ce stade du cahier des charges, ces règles ne sont pas explicitement détaillées.
- **Information non définie.** : Seuils exacts de suspension (taux d'annulation, nombre de signalements, etc.) et procédures de levée de suspension.
  - Recommandation UX : établir un tableau de bord de modération permettant aux administrateurs de visualiser les motifs de suspension et de suivre les actions correctives, avec une procédure claire de rétablissement après amélioration démontrée.

---

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

---

# 6 Parcours Client

## A1. Onboarding
### Objectif
Présenter la proposition de valeur et créer un compte en quelques secondes.

### Contenu
- Écran de bienvenue avec logo Relio (logo_acceuil.png ou logo_app.png selon contexte)
- Texte court de présentation : « Décrivez votre problème. Relio trouve la bonne personne pour le résoudre. »
- Bouton « Commencer » menant à la création de compte
- Formulaire de création de compte :
  - Nom complet (champ texte)
  - Numéro de téléphone (champ texte avec validation format international)
  - Quartier (champ texte ou sélection depuis liste prédéfinie ou géolocalisation)
  - Localisation (permission GPS demandée ; si refusée, saisie manuelle du quartier suffisante)
  - Case à cocher « J'accepte les conditions générales d'utilisation et la politique de confidentialité »
- Bouton « Créer mon compte »

### Navigation
- Depuis l'écran de bienvenue, seul le bouton « Commencer » est actif.
- Après création de compte réussie : redirection vers l'écran Accueil (page d'accueil principale).
- En cas d'erreur de validation (champ manquant, téléphone invalide) : affichage d'un message d'erreur inline sous le champ concerné, blocage de la soumission.

### États
- Chargement pendant l'envoi du formulaire (indicateur d'activité)
- Succès : toast de confirmation « Compte créé avec succès »
- Échec : message d'erreur décrivant le problème (ex. : « Ce numéro de téléphone est déjà utilisé »)

### Règles métier
- Un même numéro de téléphone ne peut être associé qu'à un seul compte (client ou prestataire).
- La création de compte client ne nécessite pas de vérification d'identité immédiate (différée éventuellement pour les prestataires).
- Le quartier/localisation sert au calcul de distance dans le Score Relio.

## A2. Page d'accueil principale
### Objectif
Permettre au client d'exprimer son problème — c'est le cœur de l'expérience Relio.

### Contenu
- Barre de recherche intelligente centrale avec placeholder « Décrivez votre problème... »
- Deux icônes à droite de la barre : icône texte (saisie clavier) et icône vocal (enregistrement audio)
- Sous la barre principale : défilement horizontal des catégories rapides (Plomberie, Électricité, Climatisation, Automobile, Réparation électronique, Maison) – chacune représentée par une icône et un libellé
- Bouton fixe ou flottant en bas d'écran « Devenir prestataire » (navigation vers le flux d'inscription prestataire)
- En haut : éventuellement le prénom de l'utilisateur accueilli (« Bonjour, [Prénom] ! ») et icône de notification (optionnel, à définir)

### Navigation
- Appui sur l'icône texte : ouvre le clavier natif, focus sur la barre de recherche.
- Appui sur l'icône vocal : lance l'enregistrement audio (avec demande de permission microphone si première utilisation) ; après fin d'enregistrement, le audio est envoyé au backend pour transcription.
- Sélection d'une catégorie rapide : remplit la barre de recherche avec le libellé de la catégorie (ex. : « Plomberie ») et lance immédiatement l'analyse (équivalent à appuyer sur le bouton de validation).
- Appui sur le bouton de validation (icône loupe ou touche Entrée) : envoie la demande au moteur d'attribution et affiche l'état « Relio analyse votre demande ».
- Appui sur le bouton « Devenir prestataire » : navigation vers l'écran de création de compte professionnel (flux B1).

### États
- État vide : barre de recherche prête à recevoir l'entrée.
- État saisie en cours : clavier affiché ou enregistrement en cours.
- État envoi : après validation, affichage de « Relio analyse votre demande » (indicateur de chargement).
- État résultat : après analyse, affichage de « Recherche du professionnel adapté » (indicateur de chargement) puis passage à l'écran d'attribution professionnelle.
- Erreur de saisie : si la demande est vide après validation, message d'erreur « Veuillez décrire votre problème ».
- Erreur de transmission : si le backend ne répond pas, affichage d'un message d'erreur avec bouton « Réessayer ».

### Règles métier
- Maximum 3 clics avant la création d'une demande : (1) focus barre de recherche, (2) saisie texte/vocal ou sélection catégorie, (3) validation.
- La saisie vocale doit être disponible en un geste (icône toujours visible) et être prioritaire dans le contexte africain où de nombreux utilisateurs préfèrent parler plutôt qu'écrire.
- Les catégories rapides servent de raccourcis mais ne doivent pas remplacer la recherche libre ; l'utilisateur doit toujours pouvoir taper une description libre.
- La localisation (quartier/GPS) est utilisée pour calculer la distance dans le Score Relio ; si aucune localisation n'est disponible, la distance peut être considérée comme maximale (impact négatif sur le score) ou l'utilisateur doit être invité à fournir une localisation approximative.

## A3. Traitement de la demande
### Objectif
Créer une sensation d'intelligence pendant que le moteur travaille.

### Contenu
- Écran intermédiaire affichant successivement deux messages avec animation de points de suspension :
  1. « Relio analyse votre demande »
  2. « Recherche du professionnel adapté »
- Optionally : petite illustration ou icône représentant le cerveau/engrenage.
- Pas d'interaction possible pendant cet écran (bouton de retour désactivé pour éviter l'interruption du traitement).

### Navigation
- Entrée automatique depuis la page d'accueil après validation de la demande.
- Sortie automatique vers l'écran d'attribution professionnelle dès que le moteur retourne une recommandation (ou un message d'erreur si aucun professionnel trouvé).
- Le bouton de retour matériel/gestuel est désactivé ; un seul bouton « Annuler » peut être proposé pour abandonner la demande et revenir à l'accueil (avec confirmation si désiré).

### États
- Chargement : indicateur de points de suspension sous chaque message.
- Succès : transition vers l'écran d'attribution professionnelle.
- Échec : si aucun professionnel compatible n'est trouvé après recherche étendue, affichage d'un écran d'erreur « Aucun professionnel disponible pour votre demande actuellement » avec options : « Réessayer plus tard », « Modifier la description », « Contacter le support ».

### Règles métier
- Le moteur doit respecter le temps cible de <60s pour créer une demande complète (expression + attribution). L'écran de traitement doit donc être bref ; si le traitement dépasse quelques secondes, afficher un message de patience (« Nous recherchent le meilleur professionnel pour vous »).
- En cas de surcharge temporaire du moteur, un message d'attente avec estimation du temps restant peut être affiché.

## A4. Attribution professionnelle
### Objectif
Présenter une recommandation claire et rassurante.

### Contenu
- Carte professionnelle affichant les informations suivantes :
  - Photo du professionnel (circulaire, avec bordure indiquant le niveau de vérification si disponible)
  - Nom complet
  - Métier et spécialité éventuelle (ex. : « Plombier – Chauffe-eau »)
  - Note moyenne sous forme d'étoiles (★★★★★) avec nombre d'avis entre parenthèses
  - Expérience affichée (« X ans » ou « Plus de X ans »)
  - Distance affichée (« Y km » ou « Y m ») avec icône de localisation
  - Disponibilité affichée (« Maintenant » ou « Dans Z h ») avec icône d'horloge
  - Prix estimatif de l'intervention (en monnaie locale FCFA) avec icône de monnaie
  - Badge de vérification (si le profil a été validé manuellement par l'équipe Relio) : icône coche verte ou label « Vérifié »
- Bandeau inférieur avec deux boutons :
  - Bouton principal « Confirmer ce professionnel » (couleur jaune ou bleu selon charte)
  - Bouton secondaire « Voir une autre proposition » (couleur grise ou texte souligné)
- En haut : texte rappelant le problème exprimé par le client (ex. : « Votre problème : Mon climatiseur ne marche plus »)
- En bas éventuel : petit texte explicatif « Ce professionnel a été sélectionné selon notre score Relio qui combine compétence, disponibilité, distance, réputation et historique. »

### Navigation
- Depuis l'écran de traitement de la demande, transition automatique vers cet écran dès réception de la recommandation.
- Appui sur « Confirmer ce professionnel » : envoie la confirmation au backend, passe à l'état « Intervention confirmée » côté client et envoie une notification au prestataire sélectionné.
- Appui sur « Voir une autre proposition » : demande au moteur de fournir une alternative (deuxième meilleur score) ; si aucune autre proposition disponible, affichage d'un message « Aucune autre proposition disponible ».
- Bouton de retour matériel/gestuel : permet de revenir à l'écran de traitement de la demande (avec possibilité d'annuler la demande entièrement).

### États
- Chargement : si le moteur doit rechercher une deuxième proposition, affichage d'un indicateur de chargement.
- Succès : confirmation reçue, transition vers le suivi d'intervention.
- Erreur : si le moteur ne retourne aucune recommandation (cas déjà traité dans A3), pas d'affichage de cet écran.
- Aucun professionnel trouvé : déjà géré dans A3.

### Règles métier
- Les informations affichées doivent être à jour en temps réel (disponibilité, distance basée sur localisation actuelle du professionnel si disponible).
- Le prix estimatif est calculé basé sur la catégorie de problème et la région ; il doit être clairement indiqué comme estimatif, le prix final pouvant varier après évaluation sur site.
- Le bouton « Voir une autre proposition » doit respecter la logique de score : présenter le professionnel suivant par ordre décroissant de Score Relio, après exclusion du déjà proposé.
- Le client ne peut voir qu'une seule alternative à la fois ; pour voir davantage, il doit répéter l'action.
- Le professionnel proposé doit être disponible (statut « Maintenant » ou créneau proche) ; sinon, le moteur doit pénaliser fortement la disponibilité dans le score.

## A5. Suivi d'intervention
### Objectif
Donner de la visibilité au client à chaque étape.

### Contenu
- Timeline verticale ou horizontale montrant les étapes suivantes :
  1. **Demande reçue** : icône d'horloge + texte « Votre demande a été reçue et est en cours d'analyse »
  2. **Recherche en cours** : icône de loupe + texte « Relio recherche le professionnel adapté »
  3. **Professionnel trouvé** : icône de personne + texte « Un professionnel a été sélectionné et a été notifié »
  4. **Intervention confirmée** : icône de coche + texte « Le professionnel a accepté la mission et se rend sur place »
  5. **Intervention en cours** : icône de clé ou d'outil + texte « Le professionnel est sur place et réalise l'intervention »
  6. **Intervention terminée** : icône de drapeau + texte « L'intervention est terminée, passage au paiement »
  7. **Paiement en attente** : icône de monnaie + texte « En attente de confirmation de paiement »
  8. **Paiement effectué** : icône de coche + texte « Paiement reçu, passage à l'évaluation »
  9. **Évaluation en attente** : icône de crayon + texte « Merci d'évaluer la prestation »
  10. **Évaluée** : icône d'étoile + texte « Merci pour votre évaluation »

Chaque étape affiche un statut : en cours (animation), terminé (coche verte), à venir (gris clair). Le client peut voir l'heure approximative de chaque étape si disponible.

### Navigation
- Après confirmation d'attribution (A4), le client est redirigé automatiquement vers cet écran de suivi.
- Depuis cet écran, le client peut :
  - Visualiser la timeline en temps réel (mises à jour via WebSocket ou polling régulier)
  - Effectuer le paiement lorsque l'étape atteint « Paiement en attente » (bouton « Payer maintenant » qui ouvre le flux de paiement A6)
  - Laisser une évaluation lorsque l'étape atteint « Évaluation en attente » (bouton « Évaluer maintenant » qui ouvre le flux d'évaluation A7)
  - Signaler un problème (bouton « Signaler un problème » qui ouvre un formulaire de contact avec l'administrateur)
- Bouton de retour matériel/gestuel : permet de revenir à l'écran d'accueil (avec confirmation si l'intervention est en cours ?) – idéalement, permettre le retour mais afficher un bandeau persistant rappelant l'intervention en cours.

### États
- Chaque étape de la timeline passe par les états : à venir → en cours → terminé.
- En cas d'échec à une étape (ex. : le professionnel ne répond pas, annulation) : affichage d'un message d'alerte avec possibilité de reprendre ou d'annuler la mission.
- État d'erreur de connexion : si les mises à jour en temps réel échouent, affichage d'un message « Connexion perdue, tentative de reconnexion... » avec dernier statut connu.
- État d'annulation : si le client annule la mission avant intervention, affichage de raison d'annulation et remboursement le cas échéant (si paiement déjà effectué).
- État de litige : si le professionnel signale un problème sur place (impossibilité d'intervention), affichage d'options : reprogrammer, annuler, escalader vers l'administrateur.

### Règles métier
- Le suivi doit être mis à jour en temps réel idéalement via WebSocket ; sinon, polling toutes les 5-10 secondes.
- Chaque transition d'étape doit être déclenchée par un événement backend : confirmation du professionnel, début d'intervention (ex. : scan QR ou géofencing), fin d'intervention, confirmation paiement, soumission évaluation.
- Le client doit pouvoir intervenir uniquement aux étapes autorisées (paiement à l'étape paiement, évaluation à l'étape évaluation).
- En cas d'annulation du professionnel avant début d'intervention, le client doit être notifié immédiatement et proposé soit de recevoir une nouvelle proposition, soit d'annuler sans frais.
- Les étapes d'intervention en cours et terminée peuvent être déclenchées par des preuves matérielles : scan de QR code du client par le prestataire (début) et scan de QR code du prestataire par le client (fin) – voir règles métier détaillées dans la section 9 Règles Métier.
- Le suivi doit rester accessible même après clôture de l'intervention pour consultation de l'historique.

## A6. Paiement
### Objectif
Formaliser la transaction. Méthodes acceptées : Mobile Money et espèces.

### Contenu
- Écran de confirmation du montant :
  - Texte « Montant à payer : X FCFA »
  - Icône de monnaie et éventuellement ventilation (main d'œuvre, déplacement, pièces si connue)
  - Texte « Ce montant est estimé et pourra être ajusté après intervention si nécessaire »
- Deux boutons de paiement :
  - Bouton « Payer avec Mobile Money » (logo MTN Mobile Money et/ou Orange Money)
  - Bouton « Payer en espèces » (icône de billets)
- En bas : texte explicatif « Le paiement en espèces se fait directement au professionnel à la fin de l'intervention. Vous recevrez un reçu numérique après confirmation du professionnel. »
- Optionally : champ pour entrer un numéro de transaction Mobile Money si paiement effectué à l'avance (pas typique pour espèces).

### Navigation
- Accessible depuis l'écran de suivi d'intervention lorsque l'étape atteint « Paiement en attente » (bouton « Payer maintenant »).
- Après sélection d'un mode de paiement :
  - Si Mobile Money : redirection vers l'application Mobile Money respective ou affichage d'un code à payer (USDT ou numéro de reçu) avec instructions.
  - Si espèces : affichage d'un écran de confirmation « Vous avez choisi le paiement en espèces. Veuillez payer le professionnel directement et confirmer ci-dessous après réception. »
- Après paiement effectué (confirmation via callback Mobile Money ou confirmation manuelle du client pour espèces) :
  - Affichage d'un reçu numérique avec :
    - Numéro de transaction
    - Date et heure
    - Montant payé
    - Nom du professionnel
    - Service rendu
  - Bouton « Télécharger le reçu » (PDF ou image)
  - Bouton « Passer à l'évaluation » qui mène à l'étape d'évaluation.
- Bouton de retour : permet de revenir au suivi d'intervention (avec confirmation si paiement en cours ?).

### États
- Chargement : lors de l'attente de confirmation du paiement Mobile Money (indicateur d'activité).
- Succès : réception du callback de paiement réussi, affichage du reçu.
- Échec : échec du paiement Mobile Money (solde insuffisant, numéro incorrect) : affichage d'erreur avec possibilité de réessayer ou choisir autre mode.
- Annulation : si le client change d'avis avant confirmation paiement, retour au suivi avec message « Paiement annulé ».
- En attente de confirmation professionnel (pour espèces) : après sélection « Payer en espèces », affichage d'un bouton « J'ai payé » que le client appuie après avoir payé le professionnel ; puis le professionnel doit confirmer de son côté (voir règles métier fin d'intervention).

### Règles métier
- Les méthodes de paiement acceptées sont exclusivement Mobile Money (MTN, Orange Money) et espèces. Aucun autre moyen (carte bancaire, virement) n'est disponible dans le MVP.
- Le montant affiché doit être le prix estimatif calculé par le backend basé sur la catégorie de problème et la région ; il doit être clairement indiqué comme estimatif.
- Pour le paiement en espèces :
  - Le client confirme avoir payé en appuyant sur « J'ai payé ».
  - Le professionnel doit confirmer de son côté avoir reçu le paiement (voir scénario fin d'intervention dans la section 9 Règles Métier).
  - Seul après double confirmation (client + professionnel) le paiement est considéré comme effectué et l'étape passe à « Paiement effectué ».
- Pour le paiement Mobile Money :
  - Le client initie le paiement depuis l'application ; réception d'un webhook de succès déclenche la confirmation immédiate.
  - Aucun besoin de confirmation du professionnel côté paiement (le système considère le paiement effectué dès réception du webhook).
- Un reçu numérique doit être généré et stocké dans le compte du client pour référence futura.
- En cas de litige sur le montant (client prétend avoir payé un autre montant), l'administrateur peut intervenir pour vérifier les journaux de transaction.

## A7. Évaluation
### Objectif
Construire la réputation du réseau. Après la prestation, le client attribue une note (★★★★★) et un commentaire, selon trois critères : qualité, rapidité, comportement.

### Contenu
- Écran d'évaluation avec :
  - Titre « Merci pour votre intervention ! Comment évaluez-vous le professionnel ? »
  - Rappel du professionnel : photo, nom, métier
  - Trois lignes de critères avec étoiles sélectionnables :
    - Qualité du travail : ★★★★★ (5 étoiles sélectionnables)
    - Rapidité d'intervention : ★★★★★
    - Comportement et professionnalisme : ★★★★★
  - Zone de commentaire libre (texte multiligne) avec placeholder « Décrivez votre expérience... »
  - Bouton « Soumettre mon avis » (couleur jaune ou bleu)
- Optionally : cases à cocher pour autoriser l'utilisation du commentaire en tant que témoignage anonyme.

### Navigation
- Accessible depuis l'écran de suivi d'intervention lorsque l'étape atteint « Évaluation en attente » (bouton « Évaluer maintenant »).
- Après soumission de l'avis :
  - Affichage d'un message de remerciement « Merci pour votre évaluation ! » avec bouton « Retour à l'accueil ».
  - Bouton de retour matériel/gestuel : retour à l'écran de suivi (affichera l'étape terminée) ou directement à l'accueil selon préférence.
- En cas d'erreur de soumission (réseau) : affichage d'erreur avec bouton « Réessayer ».

### États
- Chargement : lors de l'envoi de l'évaluation au backend (indicateur d'activité).
- Succès : évaluation enregistrée, mise à jour du Score Relio du professionnel (réputation et historique).
- Échec : échec d'envoi (timeout, erreur serveur) : message d'erreur avec possibilité de réessayer.
- Annulation : si l'utilisateur quitte l'écran sans soumettre, retour au suivi avec étape toujours en attente d'évaluation (rappel persistant possible).

### Règles métier
- L'évaluation doit porter sur trois critères distincts : qualité, rapidité, comportement. Chaque critère est noté de 1 à 5 étoiles.
- Le commentaire libre est facultatif mais encouragé.
- La note moyenne du professionnel est mise à jour en temps réel après chaque nouvelle évaluation ; elle entre dans le calcul du Score Relio (composante réputation).
- Le nombre total d'évaluations reçues est comptabilisé dans l'historique (composante historique).
- Les évaluations doivent être associées à une intervention spécifique et ne peuvent être modifiées après soumission (à moins d'un signalement d'erreur pouvant déclencher une révision par l'administrateur).
- En cas de commentaire signalant un problème de sécurité ou de fraude, une alerte doit être remontée à l'équipe administrateur pour examen immédiat.
- L'évaluation ne doit pas être obligatoire pour clôturer l'intervention ; cependant, un rappel persistant (notification ou bandeau) doit encourager l'utilisateur à laisser son avis après un délai raisonnable (ex. : 24h si pas d'évaluation).

## Cas d'erreur spécifiques
### Erreur de saisie vide
- Message : « Veuillez décrire votre problème pour permettre à Relio de vous aider. »
- Action : retour au champ de saisie avec focus.

### Erreur de localisation manquante
- Message : « Pour améliorer la précision du matching, nous avons besoin de votre localisation. Autorisez l'accès au GPS ou indiquez votre quartier. »
- Action : bouton « Autoriser la localisation » qui demande la permission GPS, ou champ de saisie du quartier.

### Aucun professionnel trouvé
- Message : « Aucun professionnel disponible pour votre demande actuellement. »
- Actions : 
  - « Réessayer plus tard » (rafraîchit la recherche après un délai)
  - « Modifier la description » (retour à l'accueil avec champ pré-rempli)
  - « Contacter le support » (ouvre un formulaire de message à l'équipe Relio)

### Échec de paiement Mobile Money
- Message : « Le paiement n'a pas pu être effectué. Vérifiez votre solde ou réessayez. »
- Actions : « Réessayer », « Changer de moyen de paiement » (espèces), « Annuler la demande »

### Paiement espèces non confirmé
- Message : « Nous attendons la confirmation du professionnel que vous avez bien effectué le paiement. »
- Action : bouton « Rappeler le professionnel » (envoie une notification) ou « Signaler un problème ».

### Intervention non commencée après confirmation
- Message : « Le professionnel n'a pas encore confirmé son arrivée. Nous attendons sa localisation ou son signal de début. »
- Action : bouton « Contacter le professionnel » (si fonctionnalité disponible) ou « Signaler un problème » après délai raisonnable (ex. : 30 min).

### Annulation par le professionnel avant intervention
- Message : « Le professionnel a malheureusement dû annuler la mission. Nous recherchons une autre option pour vous. »
- Actions : « Proposer un autre professionnel » (nouvelle recherche), « Annuler sans frais ».

### Annulation par le client avant intervention
- Message : « Souhaitez-vous vraiment annuler cette demande ? Des frais d'annulation peuvent s'appliquer selon le délai. »
- Actions : « Confirmer l'annulation », « Garder la demande ».

### Litige sur le montant espèces
- Message : « Il y a un désaccord sur le montant payé. Veuillez contacter le support pour résolution. »
- Action : bouton « Contacter le support ».

## Résumé du parcours client
Le parcours client couvre l'intégralité du cycle de prestation : expression du besoin → compréhension → attribution → intervention → paiement → évaluation. Chaque étape est volontairement courte pour respecter les principes de simplicité, confiance et rapidité. Les points de contact avec le professionnel sont limités à la confirmation d'attribution et aux étapes de début/fin d'intervention (via mécanismes de vérification tels que QR code ou géofencing). Le suivi en temps réel et les notifications tiennent le client informé sans nécessiter d'actions constantes.

---

# 7 Parcours Prestataire

## B1. Création de compte professionnel
### Objectif
Permettre à un professionnel de s'inscrire sur la plateforme en fournissant les informations nécessaires à la création de son profil.

### Contenu
- Écran de bienvenue avec logo Relio et texte : « Rejoignez le réseau des prestataires qualifiés de Relio »
- Formulaire de création de compte professionnel :
  - Nom complet (champ texte)
  - Numéro de téléphone (champ texte avec validation format international)
  - Métier (liste déroulante ou champ texte avec suggestions : Plomberie, Électricité, Climatisation, Automobile, Réparation électronique, Maison, etc.)
  - Zone d'intervention (champ texte pour quartier ou ville, ou sélection depuis liste prédéfinie, ou géolocalisation)
  - Expérience (champ texte : nombre d'années ou description libre)
  - Téléphone professionnel (optionnel, peut être identique au numéro de téléphone)
  - Adresse e-mail professionnelle (optionnel)
  - Champ « Documents justificatifs » : bouton « Ajouter un document » permettant de télécharger une pièce d'identité (CIN, passeport) et/ou un justificatif de qualification (certificat, carte de professionnel)
  - Case à cocher « J'accepte les conditions générales d'utilisation et la politique de confidentialité »
- Bouton « Soumettre pour vérification »

### Navigation
- Depuis l'écran d'accueil client, le bouton « Devenir prestataire » mène à cet écran.
- Après soumission réussie : affichage d'un message « Votre demande de vérification est en cours de traitement. Nous reviendrons vers vous sous peu. » et retour éventuel à l'accueil client (le professionnel reste en attente de validation).
- En cas d'erreur de validation (champ manquant, format invalide) : affichage d'un message d'erreur inline sous le champ concerné.

### États
- Chargement pendant l'envoi du formulaire (indicateur d'activité)
- Succès : toast de confirmation « Demande de vérification envoyée »
- Échec : message d'erreur décrivant le problème (ex. : « Ce numéro de téléphone est déjà associé à un compte »)

### Règles métier
- Un même numéro de téléphone ne peut être associé qu'à un seul compte (client ou prestataire).
- Les informations fournies servent au calcul du Score Relio (compétence via expérience et spécialités, réputation initialement neutre, historique vierge).
- La zone d'intervention est utilisée pour filtrer les demandes pertinentes (distance dans le Score Relio).
- Les documents justificatifs sont requis pour la vérification manuelle par l'équipe Relio (voir B2).

## B2. Vérification du profil
### Objectif
Validation manuelle par l'équipe Relio, sur la base de documents possibles : pièce d'identité, justificatifs, références professionnelles. C'est cette étape qui construit la confiance décrite en section 5.2.

### Contenu (vue côté administrateur, mais le prestataire voit le statut)
- Le prestataire ne voit pas directement le processus de vérification ; il voit uniquement le statut de son profil :
  - Statut « En attente de vérification » : affichage d'un message « Votre profil est en cours de vérification par notre équipe. Merci de votre patience. »
  - Statut « Validé » : accès complet à l'application Prestataire avec toutes les fonctionnalités.
  - Statut « Rejeté » : affichage du motif de rejet (ex. : « Documents manquants », « Informations incohérentes ») et possibilité de soumettre à nouveau après correction.
- L'équipe Relio utilise une interface interne (potentiellement le Dashboard Administrateur ou un outil dédié) pour examiner les documents soumis :
  - Vérification de la pièce d'identité (nom, photo, date d'expiration)
  - Vérification du justificatif de qualification correspondant au métier déclaré
  - Recherche éventuelle de références professionnelles (contact des références fournies)
  - Validation de la zone d'intervention (cohérente avec les déclarations)

### Navigation
- Le prestataire reste dans l'attente ; aucune action requise de sa part sauf en cas de rejet.
- En cas de validation : notification push « Votre profil a été validé ! Vous pouvez maintenant recevoir des missions. » et changement automatique du statut.
- En cas de rejet : notification push « Votre demande de vérification a été rejetée. Voir les motifs et soumettre à nouveau après correction. » avec lien vers le formulaire de correction.

### États
- En attente de vérification : pas d'accès aux missions, uniquement consultation du profil en lecture seule.
- Validé : accès complet à toutes les fonctionnalités de l'application Prestataire.
- Rejeté : possibilité de modifier le profil et de soumettre à nouveau après avoir corrigé les points rejetés.

### Règles métier
- La vérification manuelle est une étape cruciale pour établir la confiance dès le lancement du MVP.
- Aucun professionnel ne peut recevoir de missions avant d'avoir été validé manuellement.
- Les critères de validation doivent être documentés et appliqués de manière uniforme par l'équipe Relio.
- En cas de doute sur l'authenticité d'un document, l'équipe Relio peut demander des pièces complémentaires ou effectuer un appel de vérification.
- La vérification peut prendre quelques heures à quelques jours selon le volume ; l'équipe doit viser un délai de traitement inférieur à 24h pour maintenir l'engagement des candidats.

## B3. Réception des missions
### Objectif
Notifier le prestataire d'une nouvelle mission disponible correspondant à son profil et lui permettre d'accepter ou de refuser.

### Contenu
- Notification push (titre : « Nouveau travail disponible », corps : texte décrivant le type de problème, quartier, distance, urgence)
- Écran interne de l'application (si l'application est ouverte) affichant une carte de mission similaire à celle vue côté client mais du point de vue prestataire :
  - Icône représentant le type de problème (ex. : goutte d'eau pour plomberie, éclair pour électricité)
  - Texte court du problème exprimé par le client (ex. : « Mon chauffe-eau ne chauffe plus »)
  - Quartier ou localité du client
  - Distance estimée entre le professionnel et le client (ex. : « 850 m » ou « 3,2 km »)
  - Niveau d'urgence (icône couleur : rouge pour critique, orange pour rapide, vert pour planifiable)
  - Boutons « Accepter » et « Refuser »
  - Optionally : bouton « Voir les détails du client » (affichage limité : prénom du client, première lettre du nom, éventuellement note moyenne client si disponible)

### Navigation
- Lorsque l'application Prestataire est en arrière-plan ou fermée, la notification push apparaît ; appuyez dessus ouvre l'application sur l'écran de la mission concernée.
- Lorsque l'application est ouverte, la mission peut apparaître en haut de la liste « Missions nouvelles » ou sous forme de bannière temporaire.
- Après acceptation ou refus : la mission disparaît de la liste « Nouvelles » et apparaît respectivement dans « Acceptées » ou est simplement retirée (refus enregistré).
- Depuis l'écran de détail d'une mission, le prestataire peut :
  - Voir la description complète du problème
  - Voir la localisation du client sur une carte (optionnel, selon évolutions futures)
  - Accepter ou refuser la mission

### États
- Mission nouvellement reçue : icône de notification, badge « Nouveau »
- Mission en attente de réponse : boutons « Accepter » / « Refuser » actifs
- Mission acceptée : disparaît de « Nouvelles », apparaît dans « Acceptées » avec statut « Acceptée »
- Mission refusée : enregistrée dans l'historique des refus (optionnel) et retirée de la liste active
- Erreur de transmission : si la notification échoue à être délivrée, le serveur peut réessayer selon une politique de backoff exponentiel.

### Règles métier
- La réception des missions est basée sur le matching du moteur d'attribution : seuls les professionnels compatibles (métier, zone, disponibilité, spécialités) sont considérés.
- Le Score Relio influence l'ordre de présentation des missions si plusieurs professionnels sont compatibles (le meilleur score reçoit la mission en premier, mais le système peut permettre à plusieurs professionnels de voir la même mission selon paramètres de concurrence à définir).
- Le prestataire doit répondre dans un délai raisonnable (à définir, ex. : 5 minutes) ; après expiration, la mission peut être proposée à un autre professionnel compatible.
- Le refus d'une mission ne doit pas pénaliser le professionnel tant qu'il reste occasionnel ; toutefois, un taux de refus excessif peut entraîner une baisse de visibilité (à définir dans les règles de scoring ou de visibilité).
- Les informations sur le client sont limitées volontairement pour protéger la vie privée : seul le quartier et la distance sont partagés, pas l'adresse exacte ni le nom complet.

## B4. Gestion des missions
### Objectif
Liste organisée en trois vues : missions nouvelles, missions acceptées, missions terminées.

### Contenu
- Écran principal avec trois onglets internes ou sections clairement séparées :
  - **Onglet « Nouvelles »** : liste des missions reçues et non encore répondant (voir B3)
  - **Onglet « Acceptées »** : liste des missions acceptées par le professionnel, subdivisées éventuellement en :
    - « En attente de début » : mission acceptée mais pas encore commencée
    - « En cours » : intervention en cours sur site
    - « Terminée » : intervention terminée, en attente de paiement ou d'évaluation
  - **Onglet « Terminé »** : historique des missions entièrement réalisées (paiement effectué et évaluation soumise, ou au moins intervention terminée selon définition)

### Détails par onglet
- **Onglet Nouvelles** :
  - Chaque carte affiche : icône de problème, texte court du problème, quartier, distance, urgence, boutons « Accepter » / « Refuser »
  - Possibilité de glisser vers la droite pour refuser rapidement (ou gauche pour accepter) selon design choisi
- **Onglet Acceptées** :
  - Chaque carte affiche : photo du client (initiale ou avatar flouté), prénom du client, texte du problème, statut coloré, heure d'acceptation
  - Selon le statut :
    - En attente de début : bouton « Démarrer l'intervention » (peut déclencher le scan QR ou géofencing)
    - En cours : affichage de la durée écoulée depuis le début, bouton « Signaler un problème sur place »
    - Terminée : bouton « Confirmer la fin d'intervention » (peut déclencher le scan QR inverse) ou indication que le client doit confirmer la fin
- **Onglet Terminé** :
  - Chaque carte affiche : photo du client (initiale), prénom du client, texte du problème, note reçue du client (étoiles), date de completion, montant gagné (optionnel)
  - Possibilité de voir le détail complet de l'intervention (timeline, paiement, évaluation)

### Navigation
- Depuis l'écran de détail d'une mission en cours, le prestataire peut :
  - Appuyer sur « Démarrer l'intervention » (si pas encore commencé) ou « Terminer l'intervention » (si prêt à finir)
  - Signaler un problème sur place (envoi d'alerte à l'administrateur avec possibilité d'envoyer des photos ou des notes)
  - Voir le trajet jusqu'au client (optionnel, carte avec tracé)
- Depuis l'écran de détail d'une mission terminée, le prestataire peut :
  - Voir le paiement reçu (si espèces, confirmation du client nécessaire)
  - Voir l'évaluation laissée par le client
  - Télécharger le reçu de paiement (si disponible)
- Bouton de retour matériel/gestuel : permet de revenir à l'écran principal des missions avec préservation de l'onglet actif.

### États
- Chaque mission possède un état dans le cycle de prestation :
  - Réçue → Acceptée → En attente de début → En cours → Terminée → Paiement en attente → Paiement effectué → Évaluation en attente → Évaluée
- Les transitions sont déclenchées par des actions du professionnel ou du client (voir règles métier dans la section 9 Règles Métier et le suivi client A5).
- En cas d'annulation par le professionnel après acceptation mais avant début d'intervention : la mission retourne à l'état « Refusée » (avec motif) et une pénalité légère peut être appliquée (à définir).
- En cas d'annulation par le professionnel après début d'intervention : considéré comme abandon, nécessite une investigation éventuelle et peut entraîner une suspension temporaire.

### Règles métier
- Le professionnel ne doit voir que les missions correspondant à ses paramètres de disponibilité (heure actuelle, zones d'intervention activées).
- La liste « Nouvelles » doit être rafraîchie en temps réel (WebSocket) ou polling fréquent pour éviter les pertes.
- Les actions de début et de fin d'intervention doivent être sécurisées contre les fraudes : idéalement via mécanisme de vérification mutuelle (scan de QR code échange ou géofencing double confirmation).
- Le professionnel doit pouvoir mettre à jour sa disponibilité en temps réel (actif/inactif, pause) depuis son profil.
- Les historiques des missions acceptées et terminées doivent être consultables avec filtrage par date, statut, montant gagné.

## B5. Profil professionnel et historique
### Objectif
Affichage de la note moyenne, de l'historique d'interventions, du nombre total de missions réalisées et du Score Relio (voir section 7.6).

### Contenu
- Écran de profil professionnel avec plusieurs sections :
  - **En-tête** :
    - Photo du professionnel (circulaire)
    - Nom complet
    - Métier et spécialité éventuelle
    - Badge de vérification (si profil validé) : icône coche verte ou label « Vérifié »
  - **Bloc Score Relio** :
    - Affichage du score global sur 100 (ex. : 92/100)
    - Répartition visuelle des cinq critères (compétence, disponibilité, distance, réputation, historique) sous forme de barres ou de camembert simplifié
    - Texte explicatif : « Votre Score Relio détermine votre position dans les recommandations aux clients »
  - **Bloc Notes et avis** :
    - Note moyenne sur 5 sous forme d'étoiles (★★★★★) avec nombre d'avis entre parenthèses
    - Bouton « Voir les avis » menant à une liste détaillée des commentaires clients
  - **Bloc Historique d'interventions** :
    - Nombre total de missions réalisées (ex. : 42 missions)
    - Nombre de missions en cours (optionnel)
    - Dernière mission réalisée (date et texte court du problème)
  - **Bloc Informations de contact** :
    - Téléphone professionnel
    - Adresse e-mail professionnelle (optionnel)
    - Zone d'intervention actuelle
  - **Bloc Documents justificatifs** :
    - Liste des documents soumis pour vérification (pièce d'identité, certificat, etc.)
    - Statut de chaque document (validé, en attente, rejeté)
  - Bouton « Modifier le profil » en bas d'écran permettant de mettre à jour :
    - Zone d'intervention
    - Disponibilités (horaires hebdomadaires)
    - Compétences et spécialités
    - Informations de contact

### Navigation
- Accessible depuis le menu principal de l'application Prestataire (onglet « Profil » ou icône de profil en haut).
- Depuis l'écran de profil, le professionnel peut :
  - Appuyer sur « Modifier le profil » pour mettre à jour ses informations (voir règles métier ci-dessous)
  - Appuyer sur « Voir les avis » pour consulter la liste détaillée des commentaires laissés par les clients
  - Appuyer sur un document justificatif pour le voir en plein écran (si image ou PDF)
- Bouton de retour matériel/gestuel : permet de revenir à l'écran principal des missions.

### États
- Chargement lors de la récupération des données depuis le backend (indicateur d'activité).
- Succès : affichage complet des sections.
- Erreur : si le backend ne répond pas, affichage d'un message d'erreur avec bouton « Réessayer ».

### Règles métier
- Le Score Relio est recalculé à chaque nouvelle attribution où le professionnel est considéré comme candidat (voir formule dans la section 7.6). Il évolue donc dynamiquement en fonction des performances récentes.
- La note moyenne et le nombre d'avis sont mis à jour en temps réel après chaque soumission d'évaluation client.
- Le nombre total de missions réalisées est incrémenté uniquement lorsque l'intervention atteint l'état « Terminée » et que le paiement est confirmé (ou selon règle définie : intervention terminée suffit pour compter dans l'historique).
- Les informations du profil (zone d'intervention, disponibilités, compétences) doivent être synchronisées avec le moteur d'attribution : une mise à jour doit entraîner un nouveau calcul de compatibilité pour les demandes futures.
- Les documents justificatifs restent en lecture seule après validation ; pour les mettre à jour, le professionnel doit soumettre de nouveaux documents via le flux de modification du profil, qui déclenchera une nouvelle vérification manuelle.
- Le professionnel peut choisir de masquer certaines informations publiques (ex. : adresse e-mail) tout en restant joignable via le numéro de téléphone ou le système de notification de l'application.

## Règles métier spécifiques au parcours prestataire (voir également section 9 Règles Métier pour les scénarios de début et fin d'intervention)
### Début d'intervention
Le professionnel, après avoir accepté une mission, doit suivre le processus suivant pour démarrer l'intervention :
1. Le professionnel se rend sur le lieu indiqué par le client (quartier, distance affichée).
2. À son arrivée, il appuie sur le bouton « Je suis arrivé » dans l'application Prestataire (ou le système déclenche automatiquement via géofencing si activé).
3. L'application demande alors une vérification de position : le professionnel doit confirmer qu'il est bien sur place (peut déclencher une demande de localisation précise).
4. Le client, de son côté, affiche un QR code dynamique sur son écran (dans le suivi d'intervention côté client).
5. Le professionnel scanne ce QR code à l'aide de l'application Prestataire (fonction de lecture de QR code intégrée).
6. Dès que le QR code est validé, l'intervention est officiellement démarrée et le chronomètre côté client est lancé.
7. En alternative au QR code, un mécanisme de géofencing peut être utilisé : le professionnel déclenche le début lorsqu'il entre dans un périmètre défini autour de la localisation du client (ex. : 20 mètres) et que le client confirme également sa présence.

### Fin d'intervention
Le professionnel termine l'intervention selon le processus suivant :
1. Le professionnel indique avoir terminé le travail dans l'application Prestataire (bouton « Intervention terminée »).
2. Une facture automatique est générée côté client (montant estimatif ou réel selon éléments convenus sur place).
3. Le client consulte la facture sur son écran et choisit le mode de paiement (Mobile Money ou espèces).
4. Si le client choisit Mobile Money : il effectue le paiement depuis son application ; réception d'un webhook de succès déclenche la confirmation immédiate côté professionnel.
5. Si le client choisit espèces : le professionnel attend que le client lui remette le montant en espèces, puis le client confirme dans son application « J'ai payé ».
6. Dès réception de la confirmation de paiement (webhook Mobile Money ou confirmation client pour espèces), le professionnel voit apparaître un QR code unique à afficher (ou une séquence à communiquer) que le client doit scanner pour confirmer la réception du paiement.
7. Le client scanne le QR code du professionnel (affiché dans l'application Prestataire) ou saisit le code fourni.
8. Dès validation du code par l'application professionnelle, le professionnel confirme : « Paiement reçu ».
9. La mission est alors marquée comme terminée côté professionnel et le client passe à l'étape d'évaluation.
10. Enfin, le professionnel peut demander une évaluation au client (déclenchement de la notification d'évaluation côté client) ou attendre que le client lance spontanément l'évaluation.

### Notes importantes
- Les maquettes détaillées du parcours prestataire (disponibles dans `docs/maquettes/prestataire/`) doivent être consultées pour valider l'agencement exact des éléments, les icônes et les flux d'interaction.
- **Information non définie.** : seuils exacts de temps pour accepter une mission avant qu'elle ne soit proposée à un autre professionnel, mécanismes exacts de géofencing (rayon, précision), et procédures de gestion des litiges en cas de désaccord sur le paiement espèces.
  - Recommandation UX : établir un tableau de bord de résolution des litiges permettant à l'administrateur d'intervenir lorsque le client et le professionnel ne parviennent pas à s'accorder sur le montant espèces, avec mediation basée sur les preuves (reçus, témoignages).

---

# 8 Back-office Admin

## C1. Tableau de contrôle général
### Objectif
Fournir une vue d'ensemble des indicateurs clés de performance pour superviser la santé du système et prendre des décisions opérationnelles.

### Contenu
- Écran principal composé de plusieurs widgets pouvant être réorganisés selon préférence (optionnel) ou disposés en grille fixe.
- Chaque widget affiche un indicateur avec valeur actuelle, tendance (flèche haut/bas ou couleur) et comparaison avec une période précédente (ex. : jour précédent, semaine dernière).
- Indicateurs clés affichés :
  - **Demandes reçues** : nombre total de demandes exprimées par les clients depuis le lancement ou sur la période sélectionnée.
  - **Demandes traitées** : nombre de demandes ayant reçu une attribution professionnelle (statut « professionnel trouvé » ou supérieur).
  - **Interventions terminées** : nombre d'interventions entièrement réalisées (du début à la fin, incluant paiement et évaluation selon définition).
  - **Chiffre d'affaires** : montant total des paiements effectués (estimation basée sur les prix moyens par catégorie ou montant réel si disponible).
  - **Satisfaction moyenne** : note moyenne sur 5 basée sur les évaluations clients reçues.
  - **Temps moyen d'attribution** : durée moyenne entre la réception d'une demande et la confirmation d'un professionnel par le client (en minutes).
  - **Taux de réussite** : pourcentage d'interventions terminées sans annulation côté client ou professionnel (interventions aboutissant à une évaluation ou au moins à une fin confirmée).
  - **Nombre de prestataires actifs** : professionnels ayant réalisé au moins une intervention sur la période sélectionnée ou ayant accepté une mission récemment.
  - **Nombre de clients actifs** : clients ayant exprimé au moins une demande sur la période sélectionnée.
- Chaque widget peut être cliqué pour accéder à la section détaillée correspondante (ex. : cliquer sur « Satisfaction moyenne » ouvre l'analyze de performance avec filtre sur les notes).

### Navigation
- Accessible depuis le menu latéral du Dashboard Administrateur (icône de tableau de bord ou premier élément).
- Depuis le tableau de contrôle, cliquer sur un widget ou son titre redirige vers la section détaillée associée.
- Bouton de rafraîchissement manuel (icône de rotation) permettant de mettre à jour immédiatement toutes les données (utile en cas de suspicion de retard de mise à jour).
- Option d'auto-refresh : intervalle configurable (ex. : 30 secondes, 1 minute, 5 minutes) avec indicateur de dernière mise à jour.

### États
- Chargement des données au démarrage ou lors du rafraîchissement (indicateur d'activité global ou par widget).
- Succès : affichage complet de tous les widgets avec valeurs à jour.
- Erreur de connexion backend : affichage d'un message d'erreur générique avec bouton « Réessayer » pour chaque widget affecté ou globale.
- Données partielles : si certaines métriques ne sont pas disponibles (ex. : chiffre d'affaires en attente d'implémentation du suivi paiement), affichage d'un message « Indicator not yet implemented » avec lien vers la feuille de route.

### Règles métier
- Les indicateurs doivent être calculés à partir des données stockées dans la base de données PostgreSQL via des requêtes agrégées optimisées.
- Le temps moyen d'attribution prend en compte uniquement les demandes qui ont abouti à une attribution confirmée (exclut les demandes encore en analyse ou celles sans professionnel trouvé).
- Le taux de réussite est défini comme (interventions terminées avec paiement confirmé et évaluation soumise) / (interventions terminées) ; des variantes peuvent être suivies selon définition métier.
- Le chiffre d'affaires peut être estimé en attendant l'implémentation détaillée du suivi paiement : somme des prix estimatifs des interventions terminées.
- Les prestataires actifs sont définis comme ceux ayant au moins une mission acceptée sur la période sélectionnée (quel que soit le statut final).
- Les clients actifs sont définis comme ceux ayant au moins une demande exprimée sur la période sélectionnée.

## C2. Gestion des demandes
### Objectif
Vue reliant chaque demande au professionnel proposé et à son statut. L'administrateur peut modifier une attribution, contacter le client ou contacter le prestataire — c'est le filet de sécurité humain du MVP.

### Contenu
- Écran principal avec liste filtrable et triable des demandes.
- Barre de recherche supérieure permettant de filtrer par :
  - ID de demande
  - Texte exprimé par le client (recherche plein texte sur le champ « problème exprimé »)
  - Quartier ou localisation du client
  - Statut de la demande (liste déroulante : reçue, en analyse, professionnel trouvé, attribuée, accepté par professionnel, intervention en cours, terminée, paiement en attente, paiement effectué, évaluation en attente, évaluée, annulée)
  - Plage de dates (date de réception)
  - Professionnel proposé (nom ou ID)
  - Client (nom ou ID)
- Colonnes de la liste (personnalisables selon préférence ou ordre fixe) :
  - ID
  - Date/heure de réception
  - Client (prénom + première lettre du nom ou avatar)
  - Problème exprimé (texte tronqué, avec tooltip complet au survol)
  - Quartier / localisation
  - Statut (texte + icône couleur)
  - Professionnel proposé (nom + métier, avec icône de vérification si applicable)
  - Score Relio du professionnel proposé (le cas échéant)
  - Heure d'attribution (si disponible)
  - Actions (icônes : voir détail, modifier attribution, contacter client, contacter prestataire)
- Chaque ligne de liste représente une demande unique.
- Bouton « Exporter sélection » ou « Exporter tout » pour télécharger un CSV des données affichées.

### Vue détail d'une demande (accessible en cliquant sur une ligne ou une icône « voir détail »)
- En-tête : ID de demande, date/heure de réception, statut actuel.
- Section Client :
  - Photo du client (initiale ou avatar flouté)
  - Prénom et première lettre du nom
  - Numéro de téléphone (masqué partiellement pour privacité, ex. : +237 6XX XXX XXX)
  - Quartier ou localité
  - Localisation précise (si disponible via GPS, affichée sur une carte réduite)
- Section Problème exprimé :
  - Texte complet tel que saisi par le client (texte ou transcription vocale)
  - Indicateur de mode de saisie (icône texte ou vocal)
  - Horodatage de la réception
- Section Compréhension moteur (si disponible) :
  - Objet détecté
  - Symptôme principal
  - Symptôme secondaire
  - Intention déduite
  - Urgence estimée
  - Niveau de confiance du moteur (optionnel)
- Section Classification du besoin :
  - Catégorie de métier associée (ex. : Plomberie)
  - Sous-catégorie ou spécialité éventuelle
  - Niveau d'urgence par défaut selon la base de connaissance métier
- Section Matching professionnel :
  - Liste des professionnels compatibles trouvés par le moteur (triés par score décroissant)
  - Pour chaque professionnel : photo, nom, métier, note moyenne, distance, disponibilité, Score Relio
  - Indication du professionnel actuellement proposé (highlight ou bouton « Sélectionner ce professionnel »)
- Section Historique des modifications d'attribution :
  - Tableau montrant chaque changement de professionnel proposé avec horodatage, ancien professionnel, nouveau professionnel, motif (ex. : « Modification admin », « Refus professionnel », « Client a demandé autre proposition »)
  - Nom de l'administrateur ayant effectué la modification (le cas échéant)
- Section Intervention (si statut ≥ accepté par professionnel) :
  - Heure d'acceptation par le professionnel
  - Heure de début d'intervention (si disponible via mécanisme de début)
  - Heure de fin d'intervention (si disponible)
  - Statut de l'intervention (en cours, terminée, paiement en attente, etc.)
- Section Paiement (si applicable) :
  - Mode de paiement choisi (Mobile Money / espèces)
  - Montant estimatif
  - Statut du paiement (en attente, effectué, échec)
  - Référence de transaction Mobile Money (le cas échéant)
- Section Évaluation (si applicable) :
  - Note moyenne reçue (étoiles)
  - Nombre d'avis
  - Extrait de commentaire le plus récent (optionnel)
- Boutons d'action en bas :
  - « Modifier l'attribution » : ouvre un modal permettant de sélectionner un autre professionnel parmi la liste des compatibles ou de rechercher un nouveau professionnel.
  - « Contacter le client » : ouvre un formulaire de message pré-rempli avec les coordonnées du client (numéro de téléphone) ; l'envoi se fait via SMS ou notification interne selon préférence.
  - « Contacter le prestataire » : ouvre un formulaire de message pré-rempli avec les coordonnées du prestataire (numéro de téléphone) ; l'envoi se fait via SMS ou notification interne.
  - « Marquer comme annulée » : ouvre un modal permettant de choisir un motif d'annulation (client, professionnel, système, autre) et d'ajouter des commentaires.
  - « Rafraîchir les données » : recharge la vue détail depuis le backend pour obtenir les dernières mises à jour.

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Gestion des demandes ».
- Depuis la liste des demandes, cliquer sur une ligne ouvre la vue détail.
- Depuis la vue détail, les boutons d'action ouvrent des modaux ou des panneaux latéraux selon la complexité.
- Bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir à la liste des demandes avec préservation des filtres appliqués.
- Depuis la vue détail, après avoir effectué une action (ex. : modifier attribution), l'écran se rafraîchit automatiquement pour montrer le nouvel état.

### États
- Chargement de la liste lors de l'accès à la section ou lors de l'application de filtres (indicateur d'activité en haut de la liste).
- Succès : affichage de la liste avec toutes les colonnes demandées.
- Erreur de connexion backend : affichage d'un message d'erreur avec bouton « Réessayer » pour recharger la liste.
- Aucun résultat : affichage d'un message « Aucune demande ne correspond aux critères sélectionnés » avec bouton « Effacer les filtres ».
- État de chargement de la vue détail : indicateur d'activité pendant la récupération des données détaillées.
- État d'erreur détail : message d'erreur avec bouton « Retour à la liste ».

### Règles métier
- L'administrateur doit pouvoir modifier une attribution à tout moment avant que l'intervention ne soit marquée comme terminée (ou selon règle définie : avant paiement confirmé). Après certaine étape (ex. : début d'intervention), les modifications peuvent être restreintes pour éviter la confusion.
- Toute modification d'attribution doit être enregistrée avec horodatage, ancien professionnel, nouveau professionnel, motif obligatoire et identité de l'administrateur ayant effectué la modification.
- Les fonctions de contacter le client et le prestataire doivent utiliser les numéros de téléphone stockés dans la base de données ; l'envoi peut se faire via SMS gateway (Twilio, Afrique's Talking) ou via notifications push si les utilisateurs ont l'application en arrière-plan.
- Le système doit prévenir les modifications en boucle : si un administrateur modifie une attribution, le professionnel précédemment proposé doit être notifié (optionnel) uniquement si cela est pertinent (ex. : il avait déjà accepté la mission).
- La liste des professionnels compatibles doit être fournie par le moteur d'attribution sur demande du backend (ou calculée en temps réel à partir des données de profil et de la base de connaissance métier).
- Les statuts de demande doivent suivre un workflow défini (voir diagramme d'états dans la section 9 Règles Métier ou le suivi client A5). Les transitions autorisées doivent être appliquées par le backend pour empêcher les états incohérents.
- L'export CSV doit inclure toutes les colonnes visibles ainsi que les colonnes cachées éventuelles (ID, timestamps complets, etc.) pour permettre des analyses externes.

## C3. Gestion des prestataires
### Objectif
Fonctions : ajout, validation, suspension, modification des profils professionnels.

### Contenu
- Écran principal avec liste filtrable et triable des prestataires.
- Barre de recherche supérieure permettant de filtrer par :
  - Nom complet
  - Numéro de téléphone
  - Métier
  - Zone d'intervention
  - Statut (liste déroulante : en attente de vérification, validé, suspendu, rejeté)
  - Plage de dates (date d'inscription)
  - Score Relio minimum
- Colonnes de la liste :
  - ID
  - Photo (miniature ou initiale)
  - Nom complet
  - Métier
  - Zone d'intervention
  - Note moyenne (étoiles)
  - Nombre de missions réalisées
  - Score Relio
  - Statut (texte + icône couleur)
  - Actions (icônes : voir détail, valider/refuser, suspendre/réactiver, modifier profil, contacter)
- Chaque ligne de liste représente un prestataire unique.
- Bouton « Exporter sélection » ou « Exporter tout » pour télécharger un CSV des données affichées.

### Vue détail d'un prestataire (accessible en cliquant sur une ligne ou une icône « voir détail »)
- En-tête : photo du professionnel, nom complet, métier.
- Section Informations de base :
  - Numéro de téléphone
  - Adresse e-mail professionnelle (optionnel)
  - Zone d'intervention actuelle
  - Date d'inscription
  - Statut actuel (en attente de vérification, validé, suspendu, rejeté)
  - Badge de vérification (si statut validé) : icône coche verte ou label « Vérifié »
- Section Score Relio détaillé :
  - Score global sur 100
  - Répartition des cinq critères (compétence, disponibilité, distance, réputation, historique) sous forme de barres horizontales avec pourcentages
  - Texte explicatif de l'impact de chaque critère sur les recommandations
- Section Notes et avis :
  - Note moyenne sur 5 sous forme d'étoiles avec nombre d'avis entre parenthèses
  - Bouton « Voir les avis » menant à une liste paginée des commentaires laissés par les clients (avec possibilité de trier par date, note, etc.)
  - Indicateur de tendance récente (ex. : dernière note moyenne sur les 10 dernières évaluations)
- Section Historique d'interventions :
  - Nombre total de missions réalisées
  - Nombre de missions en cours (optionnel)
  - Dernière mission réalisée (date, texte court du problème, résultat)
  - Liste paginée des missions avec possibilité de filtrer par statut, date, montant gagné
  - Chaque mission affichée : date, problème du client, statut final, note reçue, montant gagné
- Section Documents justificatifs :
  - Liste des documents soumis lors de la demande de devenir prestataire (pièce d'identité, justificatif de qualification, références)
  - Statut de chaque document (validé, en attente, rejeté, manquants)
  - Aperçu miniature de chaque document (si image) avec bouton pour voir en plein écran
  - Bouton « Demander de nouveaux documents » permettant à l'administrateur de notifier le prestataire de fournir des documents complémentaires ou mis à jour.
- Section Disponibilités et compétences :
  - Tableau des disponibilités hebdomadaires (jours de la semaine avec créneaux horaires : matin, après-midi, soir)
  - Liste des spécialités déclarées (ex. : « Plombier – Chauffe-eau », « Électricien – Domotique »)
  - Zone géographique précise desservie (liste de quartiers ou rayon autour d'un point central)
- Bouton « Modifier le profil » en bas d'écran permettant de mettre à jour les informations modifiables (zone d'intervention, disponibilités, compétences, coordonnées, etc.).
- Bouton « Contacter le prestataire » en bas d'écran ouvrant un formulaire de message pré-rempli.

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Gestion des prestataires ».
- Depuis la liste des prestataires, cliquer sur une ligne ouvre la vue détail.
- Depuis la vue détail, les boutons d'action ouvrent des modaux ou des panneaux latéraux selon la complexité.
- Bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir à la liste des prestataires avec préservation des filtres appliqués.
- Depuis la vue détail, après avoir effectué une action (ex. : modifier profil, suspendre), l'écran se rafraîchit automatiquement pour montrer le nouvel état.

### États
- Chargement de la liste lors de l'accès à la section ou lors de l'application de filtres (indicateur d'activité en haut de la liste).
- Succès : affichage de la liste avec toutes les colonnes demandées.
- Erreur de connexion backend : affichage d'un message d'erreur avec bouton « Réessayer » pour recharger la liste.
- Aucun résultat : affichage d'un message « Aucun prestataire ne correspond aux critères sélectionnés » avec bouton « Effacer les filtres ».
- État de chargement de la vue détail : indicateur d'activité pendant la récupération des données détaillées.
- État d'erreur détail : message d'erreur avec bouton « Retour à la liste ».

### Règles métier
- L'ajout de nouveaux prestataires se fait via le flux d'inscription côté professionnel (B1) suivi de la vérification manuelle (B2). L'administrateur ne crée pas directement de profils mais valide ceux soumis.
- La validation d'un profil nécessite la vérification de :
  - Pièce d'identité valide (CIN, passeport) avec photo clairement identifiable
  - Justificatif de qualification correspondant au métier déclaré (certificat de formation, carte de professionnel, lettre de référence d'employeur précédent)
  - Cohérence entre la zone d'intervention déclarée et la réalité (vérification éventuelle via appel téléphonique ou demande de preuve de résidence)
  - Absent d'antécédents de fraude ou de comportement signalé dans d'autres plateformes (optionnel, selon capacité de l'équipe)
- La suspension d'un profil peut être déclenchée par :
  - Taux d'annulation élevé côté professionnel (ex. : >30% des missions acceptées annulées par le professionnel)
  - Faible note moyenne (<3.0 sur 5) sur un nombre significatif d'évaluations (ex. : <10 évaluations)
  - Signalements répétés de comportement inapproprié (non professionnalisme, retard excessif, demande de paiement supplémentaire non justifié)
  - Non-respect des disponibilités déclarées (professionnel indiqué comme disponible mais ne répond pas aux missions)
  - Fraude suspectée (faux documents, usurpation d'identité)
- La suspension doit être accompagnée d'un motif clair et d'une possibilité de levée de suspension après amélioration démontrée (ex. : suivre un stage, obtenir de nouvelles références, maintenir un bon comportement pendant une période d'essai).
- La réactivation d'un profil suspendu nécessite une revue par l'administrateur (peut être automatisée après certaines conditions : taux d'annulation réduit pendant 2 semaines, note moyenne améliorée, etc.).
- La modification du profil par l'administrateur doit être réservée aux cas exceptionnels (correction d'erreur de saisie, mise à jour de zone d'intervention après déménagement vérifié, ajout de spécialités vérifiées). Toute modification doit être enregistrée avec horodatage et motif.
- Les fonctions de contacter le prestataire utilisent le numéro de téléphone stocké dans la base de données ; l'envoi peut se faire via SMS gateway ou notification push.
- L'historique des interventions doit être conservé conformément aux politiques de rétention des données (ex. : 5 ans pour les données professionnelles, anonymisation après cette période).
- Les documents justificatifs doivent être stockés de manière sécurisée (chiffrement au repos) et accessibles uniquement aux administrateurs autorisés.
- Le Score Relio d'un prestataire suspendu doit être gelé ou continuer à être calculé ? À définir. Recommandation : geler le score pendant la suspension pour éviter qu'il ne profite d'améliorations pendant l'inactivité, mais continuer à mettre à jour l'historique si des missions sont quand même attribuées (éviter).
- Les prestataires rejetés peuvent soumettre à nouveau après correction des motifs de rejet ; le compte reste le même (même numéro de téléphone) ou un nouveau compte peut être créé selon politique (recommandation : permettre une nouvelle soumission avec le même compte après correction).

## C4. Analyse de performance
### Objectif
Fournir des indicateurs détaillés et des visualisations pour comprendre les tendances, identifier les points d'amélioration et soutenir la prise de décision stratégique.

### Contenu
- Écran principal avec sélection de période (liste déroulante : dernières 24h, 7 derniers jours, 30 derniers jours, 3 derniers mois, personnalisée) et bouton « Appliquer ».
- Série de graphiques pouvant être affichés en onglets ou en sections déroulantes :
  - **Onglet 1 : Volume et flux**
    - Courbe du nombre de demandes reçues par jour (ligne)
    - Courbe du nombre de demandes traitées par jour (ligne)
    - Courbe du nombre d'interventions terminées par jour (ligne)
    - Diagramme en barres montrant la répartition des demandes reçues par catégorie de problème (Plomberie, Électricité, Climatisation, Automobile, Réparation électronique, Maison)
    - Diagramme en barres montrant la répartition des interventions terminées par catégorie de problème
  - **Onglet 2 : Performance d'attribution**
    - Courbe du temps moyen d'attribution par jour (ligne) avec objectif <30min en référence
    - Courbe du taux de réussite par jour (ligne) avec objectif >80% en référence
    - Diagramme de dispersion montrant la relation entre distance du professionnel et temps d'attribution (optionnel)
    - Heatmap montrant la densité des demandes reçues par quartier (matrice ou carte thermique simplifiée)
  - **Onglet 3 : Satisfaction et qualité**
    - Courbe de la satisfaction moyenne par jour (ligne) avec objectif >4/5 en référence
    - Courbe du pourcentage d'évaluations 5 étoiles par jour (ligne)
    - Courbe du pourcentage d'évaluations 1 étoile par jour (ligne)
    - Diagramme en barres montrant la répartition des notes par critère (qualité, rapidité, comportement) sur la période sélectionnée
    - Nuage de points montrant la corrélation entre temps d'intervention et note de qualité (optionnel)
  - **Onglet 4 : Réseau de prestataires**
    - Courbe du nombre de prestataires actifs par jour (ligne)
    - Courbe du nombre de nouveaux prestataires inscrits par jour (ligne)
    - Diagramme en camembert montrant la répartition des prestataires par métier sur la période sélectionnée
    - Diagramme en barres montrant la répartition des prestataires par zone d'intervention (quartiers ou villes)
    - Courbe du Score Relio moyen des prestataires actifs par jour (ligne)
    - Diagramme de dispersion montrant la relation entre expérience (années) et note moyenne (optionnel)
  - **Onglet 5 : Financière (optionnel, selon évolutions futures)**
    - Courbe du chiffre d'affaires estimé par jour (ligne)
    - Courbe du montant moyen par intervention par jour (ligne)
    - Diagramme en barres montrant la répartition des revenus par catégorie de problème
    - Tableau des top 10 clients par montant dépensé (optionnel)
    - Tableau des top 10 prestataires par montant gagné (optionnel)
- Chaque graphique dispose de :
  - Titre clair
  - Axes légendés avec unités
  - Légende si plusieurs séries
  - Tooltip affichant les valeurs précises au survol ou au toucher (sur mobile)
  - Bouton « Voir en plein écran » pour afficher le graphique seul avec possibilité de zoomer/panner
  - Bouton « Télécharger l'image » (PNG ou SVG) pour utilisation dans des rapports
  - Bouton « Exporter les données sous-jacentes » (CSV) pour analyse externe

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Analyse de performance ».
- Depuis l'écran d'analyse, choisir la période désirée et cliquer sur « Appliquer » pour rafraîchir tous les graphiques.
- Depuis un onglet de graphique, cliquer sur un graphique ouvre la vue détaillée de ce graphique (plein écran ou panneaux latéraux).
- Depuis la vue détaillée d'un graphique, les boutons d'action permettent de télécharger, exporter ou revenir à la vue d'ensemble.
- Bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir à l'écran de sélection de période avec préservation du choix de période.
- Depuis l'écran d'analyse, bouton « Restaurer les paramètres par défaut » pour remettre la période sur « Derniers 7 jours » et décocher toutes les options avancées.

### États
- Chargement des données lors de l'application de filtres ou du passage à un nouvel onglet (indicateur d'activité global ou par onglet).
- Succès : affichage complet de tous les graphiques demandés avec données à jour.
- Erreur de connexion backend : affichage d'un message d'erreur avec bouton « Réessayer » pour recharger les données nécessaires au graphique affecté.
- Données insuffisantes : si certaines métriques ne sont pas disponibles pour la période sélectionnée (ex. : pas d'évaluations encore), affichage d'un message « Données insuffisantes pour ce graphique » avec suggestion d'élargir la période.
- État de rendu du graphique : indicateur de chargement pendant la génération du graphique côté client (si réalisé en JavaScript) ou simple affichage immédiat si précalculé côté backend.

### Règles métier
- Les données utilisées pour les graphiques doivent être extraites de la base de données via des requêtes agrégées optimisées ; des vues matérialisées peuvent être créées pour améliorer les performances sur les métriques fréquemment utilisées.
- Le temps moyen d'attribution est calculé comme la différence entre le timestamp de réception de la demande et le timestamp de confirmation d'attribution par le client (ou timestamp d'acceptation par le professionnel selon définition métier). Seules les demandes ayant abouti à une attribution confirmée sont prises en compte.
- Le taux de réussite est défini comme le pourcentage d'interventions aboutissant à une fin clairement définie (paiement confirmé et évaluation soumise) parmi les interventions terminées. Des variantes peuvent être suivies : succès basé uniquement sur la fin d'intervention confirmée (sans paiement/évaluation), succès basé sur l'absence d'annulation, etc.
- La satisfaction moyenne est la moyenne arithmétique des notes sur 5 reçues dans les évaluations client.
- La répartition par catégorie de problème doit utiliser la même taxonomie que celle utilisée par le moteur d'attribution pour la classification du besoin (voir section 7.4 Les quatre dimensions analysées).
- La répartition géographique doit utiliser le quartier ou la ville déclarée par le client lors de l'inscription ou mise à jour du profil ; si la localisation GPS est disponible, elle peut être utilisée pour un maillage plus fin.
- Le nombre de prestataires actifs est défini comme ceux ayant au moins une mission acceptée sur la période sélectionnée (quel que soit le statut final). Une variante peut considérer uniquement ceux ayant terminé une intervention avec paiement confirmé.
- Le Score Relio moyen des prestataires actifs doit être calculé uniquement sur les prestataires ayant au moins une évaluation récente (pour éviter de biaiser la moyenne avec des profils neufs n'ayant pas encore de score établi).
- Les graphiques doivent être conçus pour être lisibles sur des écrans de taille moyenne à grande (minimum 1024px largeur) ; sur mobile, une version condensée peut être envisagée (onglets déroulants ou graphiques simplifiés).
- Les couleurs utilisées dans les graphiques doivent respecter la charte d'identité visuelle (bleu pour l'information, jaune pour l'action/énergie, blanc pour la simplicité) afin de maintenir une cohérence visuelle avec le reste de l'application.

## Configuration du Dashboard Administrateur (optionnel)
### Objectif
Permettre à l'équipe Relio de personnaliser certains paramètres du dashboard selon ses besoins opérationnels sans nécessiter de déploiement de code.

### Contenu
- Écran accessible depuis le menu latéral sous « Paramètres » ou une icône d'engrenage.
- Sections de paramètres possibles :
  - **Général** :
    - Nom de l'entreprise affiché dans l'en-tête
    - Logo personnalisé (téléversement d'image)
    - Fusion horaire par défaut (ex. : UTC+1)
    - Langue de l'interface (français, anglais)
  - **Alertes et notifications** :
    - Seuil d'alerte pour temps moyen d'attribution (ex. : >45min déclenche une notification)
    - Seuil d'alerte pour taux de réussite (ex. : <70% déclenche une notification)
    - Seuil d'alerte pour satisfaction moyenne (ex. : <3.5 déclenche une notification)
    - Canal de notification (email, SMS, notification interne du dashboard)
    - Fréquence de relevé des alertes (ex. : toutes les 5 minutes)
  - **Périodes par défaut** :
    - Liste des périodes prédéfinies pour l'analyse de performance (ex. : dernières 24h, 7 derniers jours, 30 derniers jours)
    - Possibilité d'ajouter des périodes personnalisées
  - **Gestion des utilisateurs du dashboard** :
    - Liste des administrateurs connectés avec rôles (super administrateur, analyste, opérateur)
    - Bouton « Inviter un nouvel administrateur » (envoie un lien d'inscription par email)
    - Gestion des rôles et permissions (ex. : seul un super administrateur peut suspendre un prestataire)
  - **Intégrations externes** :
    - Clés API pour services de notification (Twilio, Firebase Cloud Messaging)
    - Clés API pour services de paiement mobile money (si intégration directe)
    - URL de webhook pour réception d'événements externes (optionnel)
- Chaque paramètre dispose d'une description courte, d'une valeur actuelle et d'un bouton « Modifier » ou « Réinitialiser à la valeur par défaut ».

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Paramètres ».
- Depuis l'écran de paramètres, cliquer sur une section pour la développer ou directement sur un paramètre pour le modifier.
- Depuis un paramètre modifié, bouton « Enregistrer les changements » pour appliquer les nouvelles valeurs.
- Bouton « Réinitialiser tous les paramètres » pour revenir aux valeurs définies par défaut lors de l'installation.
- Depuis l'écran de paramètres, bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir au menu latéral principal.

### États
- Chargement des paramètres actuels depuis la base de données ou un fichier de configuration (indicateur d'activité).
- Succès : affichage complet des sections avec valeurs à jour.
- Erreur de sauvegarde : si la sauvegarde des nouveaux paramètres échoue, affichage d'un message d'erreur avec bouton « Réessayer ».
- Retour aux valeurs par défaut : confirmation demandée avant de réinitialiser tous les paramètres afin d'éviter les pertes accidentelles.

### Règles métier
- Les paramètres modifiés doivent être persistés dans la base de données ou un fichier de configuration dédié afin de survivre aux redémarrages du serveur.
- Les changements de paramètres qui affectent le fonctionnement du moteur d'attribution (ex. : poids des critères du Score Relio) doivent être appliqués avec prudence et idéalement déployés pendant une période de faible activité pour éviter les perturbations en cours.
- Les seuils d'alerte doivent être définis en concertation avec l'équipe produit et technique afin de refléter les objectifs opérationnels du MVP.
- La gestion des utilisateurs du dashboard doit respecter le principe du moindre privilège : chaque administrateur ne doit avoir que les permissions nécessaires à ses responsabilités.
- Les intégrations externes doivent être sécurisées (stockage des clés API en variables d'environnement ou gestionnaire de secrets) et faire l'objet de tests préalables en environnement de staging avant déploiement en production.

---

# 9 Règles Métier

## Cycle de vie complet d'une mission
Une mission sur Relio suit le parcours suivant, du point de vue du système (backend) :

1. **Expression du besoin** : le client saisit ou enregistre une description de son problème (texte ou vocal) via l'application Client.
2. **Analyse et compréhension** : le moteur d'attribution reçoit la demande, effectue la collecte, la compréhension du problème (objet, symptôme, intention, urgence) et la classification du besoin.
3. **Matching professionnel** : le moteur filtre les professionnels compatibles (métier, zone, spécialités, disponibilité) puis calcule le Score Relio pour chaque candidat.
4. **Attribution proposée** : le moteur recommande le professionnel ayant le meilleur Score Relio ; le client voit cette proposition dans l'application Client.
5. **Confirmation d'attribution** : le client confirme le professionnel proposé ou demande une autre proposition (nouveau matching avec exclusion du précédent).
6. **Notification au prestataire** : dès confirmation client, le backend envoie une notification push au professionnel sélectionné avec les détails de la mission (type de problème, quartier, distance, urgence).
7. **Réponse du prestataire** : le professionnel accepte ou refuse la mission via l'application Prestataire.
   - Si accepté : la mission passe à l'état « Acceptée » côté professionnel et « Intervention confirmée » côté client.
   - Si refusé : le backend propose automatiquement la prochaine meilleure option au client (étape 4) après un court délai ou immédiatement selon configuration.
8. **Début d'intervention** : une fois la mission acceptée, le professionnel se rend sur place et suit le protocole de début d'intervention (voir section Début d'intervention).
9. **Intervention en cours** : le professionnel réalise le travail sur site ; le client peut suivre l'évolution via le suivi d'intervention (timeline).
10. **Fin d'intervention** : le professionnel indique avoir terminé le travail et suit le protocole de fin d'intervention (voir section Fin d'intervention).
11. **Paiement** : le client choisit le mode de paiement (Mobile Money ou espèces) et effectue le paiement ; le backend confirme la réception du paiement.
12. **Évaluation** : après paiement confirmé, le client est invité à laisser une évaluation (note sur 5 et commentaire) selon trois critères : qualité, rapidité, comportement.
13. **Clôture de la mission** : l'évaluation soumise met à jour le Score Relio du professionnel (réputation et historique) et la marque comme terminée dans l'historique des deux parties.
14. **Archivage** : la mission est archivée pour consultation ultérieure (historique client, historique professionnel, statistiques globales).

Ce cycle peut être interrompu à plusieurs étapes par des événements d'annulation ou de suspension (voir sections Annulation et Suspension).

## Matching
Le processus de matching est détaillé dans la section 7.7 du cahier des charges (Le processus de matching en trois étapes) :

1. **Étape 1 — Compatibilité** : filtrage par métier (le professionnel doit exercer le métier correspondant au problème classé) et par spécialités déclarées (si applicable).
2. **Étape 2 — Contraintes** : élimination des professionnels qui sont trop loin, indisponibles à l'instant considéré, ou ayant une mauvaise spécialité (ex. : un plombier appelé pour un problème électrique).
3. **Étape 3 — Classement** : calcul du Score Relio pour chaque professionnel restant et classement décroissant ; le professionnel ayant le score le plus élevé est proposé en première recommandation.

Le Score Relio est calculé selon la pondération suivante (voir section 7.6) :
- Compétence : 35%
- Disponibilité : 20%
- Distance : 20%
- Réputation : 15%
- Historique : 10%

Chaque critère est normalisé sur une échelle 0-100 avant pondération.

### Règles métier du matching
- Le matching est recalculé à chaque nouvelle demande et peut être rafraîchi en temps réel si les données de disponibilité ou de localisation changent significativement.
- Un professionnel marqué comme « indisponible » (mode hors ligne ou pause active) est exclu du matching jusqu'à ce qu'il rétablisse sa disponibilité.
- La distance utilisée est la distance géographique réelle (ou approximative basée sur le quartier) entre la localisation du professionnel (dernière position connue ou zone d'intervention centrale) et la localisation du client (quartier ou coordonnées GPS si disponible).
- Si aucune localisation précise n'est disponible pour l'une des parties, une distance par défaut maximale peut être appliquée, pénalisant fortement le score.
- Le moteur doit prendre en compte les contraintes horaires : un professionnel ne doit être considéré comme disponible que s'il a déclaré être disponible à l'heure actuelle de la demande (ou dans un créneau proche si la planification est autorisée).
- En cas de égalité de Score Relio entre plusieurs professionnels, le critère de départage peut être la distance (le plus proche) ou la date de dernière intervention (le plus récemment actif) selon décision produit.
- Le matching doit être exempt de biais discriminatoire : seuls les critères objectifs liés à la capacité de réaliser l'intervention (métier, disponibilité, distance, réputation, historique) doivent influencer le score.

## Début d'intervention
Le début d'intervention est le moment où le professionnel commence effectivement le travail sur le site du client. Il doit être tracé de manière fiable pour déclencher le suivi en temps réel côté client et éviter les litiges sur le temps réel passé sur place.

### Scénario officiel (basé sur les instructions fournies)
```
Prestataire
���
Je suis arrivé
���
Vérification GPS
���
Le client affiche son QR
���
Le prestataire scanne le QR du client
���
Mission démarrée
���
Chronomètre lancé
```

### Détails des étapes
1. **Arrivée sur place** : le professionnel, après avoir accepté la mission, se rend à l'adresse ou au quartier indiqué par le client. Il doit indiquer dans l'application Prestataire qu'il est arrivé (bouton « Je suis arrivé » ou détection automatique via géofencing si activé).
2. **Vérification de position** : le système demande une confirmation de localisation précise au professionnel (peut déclencher une demande de permission GPS haute précision ou simplement accepter la déclaration du professionnel si le géofencing est utilisé).
3. **Affichage du QR code client** : simultanément, côté client, l'écran de suivi d'intervention affiche un QR code dynamique généré par le backend, contenant un identifiant unique de la mission et un timestamp.
4. **Scan du QR code par le professionnel** : le professionnel utilise la fonction de lecture de QR code intégrée à l'application Prestataire pour scanner le code affiché sur l'écran du client.
5. **Validation du scan** : le backend reçoit le signal de scan, vérifie que l'identifiant de la mission correspond et que le timestamp est récent (dans une fenêtre de quelques minutes pour éviter les reutilisations). Si le scan est validé, l'intervention est officiellement démarrée.
6. **Lancement du chronomètre** : côté client, le suivi d'intervention passe à l'étape « Intervention en cours » et un chronomètre affiche le temps écoulé depuis le démarrage.

### Alternatives et règles métier
- **Géofencing double confirmation** : au lieu du QR code, le système peut utiliser un périmètre géographique autour de la localisation du client (ex. : rayon de 15 mètres). Le professionnel déclenche le début lorsqu'il entre dans ce périmètre et que le client, de son côté, confirme sa présence (via bouton « Je suis ici » ou détection automatique). Cette méthode nécessite que les deux parties aient activé leur localisation GPS avec précision suffisante.
- **Validation par code PIN** : en l'absence de fonctionnalité QR code (ou en cas de difficulté de lecture), un code numérique à 6 chiffres peut être affiché côté client et demandé au professionnel à saisir dans son application.
- **Timing maximal** : si le professionnel ne parvient pas à démarrer l'intervention dans un délai raisonnable après avoir accepté la mission (ex. : 30 minutes), le système doit proposer une alerte : « Le professionnel n'a pas encore confirmé son arrivée. Nous attendons sa localisation ou son signal de début. » avec options de contacter le professionnel ou d'annuler la mission.
- **Annulation possible avant début** : le client peut annuler la mission avant que le début d'intervention ne soit confirmé, sans frais si aucune intervention n'a commencé.
- **Preuve de début** : le timestamp de validation du scan QR (ou de confirmation géofencing) est enregistré comme heure officielle de début d'intervention dans la base de données.
- **Gestion des échecs de scan** : si le scan échoue après plusieurs tentatives, le système doit proposer une méthode alternative (code PIN ou géofencing) et, en dernier recours, permettre au professionnel de déclarer manuellement le début d'intervention avec une justification (à valider éventuellement par l'administrateur en cas de litige).
- **Sécurité contre la fraude** : le QR code doit être généré de manière aléatoire et à usage unique pour chaque mission ; il ne doit pas être réutilisable même si le client revient sur le même écran plus tard.

## Fin d'intervention
La fin d'intervention correspond à la réalisation complète du travail convenu et au passage au paiement. Elle doit être clairement établie pour déclencher l'étape de paiement et éviter les contestations sur le travail effectué.

### Scénario officiel (basé sur les instructions fournies)
```
Prestataire termine
���
Facture automatique
���
Le client consulte la facture
���
Choix du paiement
���
Paiement effectué
���
Le client confirme :
"J'ai payé"
���
Le QR apparaît uniquement sur le téléphone du prestataire
���
Le client scanne le QR du prestataire
���
Le prestataire confirme :
Paiement reçu
���
Mission clôturée
���
Évaluation
```

### Détails des étapes
1. **Déclaration de fin par le professionnel** : le professionnel, ayant terminé le travail, indique dans l'application Prestataire que l'intervention est terminée (bouton « Intervention terminée » ou « Marquer comme fini »).
2. **Génération automatique de la facture** : le backend génère une facture estimative basée sur le prix moyen de la catégorie de problème et la région, ou un montant préalablement convenu si des éléments spécifiques ont été discutés sur place (optionnel, à définir selon évolutions futures). Cette facture est affichée côté client dans le suivi d'intervention.
3. **Consultation de la facture par le client** : le client voit le montant à payer, la ventilation éventuelle (main d'œuvre, déplacement, pièces) et le mode de paiement proposé (Mobile Money ou espèces).
4. **Choix du mode de paiement** : le client sélectionne soit Mobile Money (MTN Mobile Money ou Orange Money) soit espèces.
5. **Exécution du paiement** :
   - Si Mobile Money : le client initie le paiement depuis son application Mobile Money respective (ou via une interface intégrée si disponible). Le backend reçoit un webhook de confirmation de paiement réussi.
   - Si espèces : le professionnel attend que le client lui remette le montant en espèces en main propre. Une fois reçu, le client confirme dans son application Client avoir effectué le paiement (bouton « J'ai payé »).
6. **Confirmation de réception du paiement côté professionnel** : dès réception de la confirmation de paiement (webhook Mobile Money ou confirmation client « J'ai payé » pour espèces), le backend déclenche l'affichage d'un QR code unique côté professionnel (ou une séquence alphanumérique) que le client doit scanner pour confirmer la réception du paiement.
7. **Scan du QR code professionnel par le client** : le client, toujours dans son application Client, scanne le QR code affiché sur l'écran du professionnel (ou saisit le code fourni).
8. **Validation du scan professionnel** : le backend reçoit le signal de scan, vérifie que l'identifiant de la mission correspond et que le code est valide et à usage unique. Si validé, le paiement est considéré comme reçu par le professionnel.
9. **Clôture de la mission** : dès validation du paiement côté professionnel, la mission passe à l'état « Terminée » pour les deux parties. Le client passe alors à l'étape d'évaluation.
10. **Déclenchement de l'évaluation** : soit le système envoie automatiquement une notification d'évaluation au client après un court délai (ex. : 2 minutes), soit le client voit apparaître un bouton « Évaluer maintenant » dans son suivi d'intervention.

### Alternatives et règles métier
- **Facture détaillée sur place** : si le professionnel et le client parviennent à un accord sur le montant exact sur place (ex. : après vérification des pièces nécessaires), le professionnel peut entrer ce montant dans son application, qui remplace alors la facture estimative. Cette fonctionnalité peut être réservée à des évolutions futures (V2) pour éviter la complexité dans le MVP.
- **Paiement mixte** : permettre une combinaison Mobile Money et espèces est à définir selon évolutions futures.
- **Confirmation du paiement espèces** : le double confirmation (client déclare avoir payé, professionnel confirme réception) est essentielle pour éviter les litiges où l'une des parties prétend ne pas avoir reçu ou donné le paiement.
- **QR code professionnel à usage unique** : le QR code affiché côté professionnel doit être généré aléatoirement pour chaque mission et ne pas être réutilisable ; il doit contenir un identifiant de mission et un timestamp ou un nonce.
- **Timing de paiement** : si le client ne confirme pas le paiement dans un délai raisonnable après avoir choisi le mode (ex. : 10 minutes pour Mobile Money, 15 minutes pour espèces), le système doit proposer un rappel : « Nous attendons la confirmation du paiement. » avec possibilité de réessayer ou de changer de mode de paiement.
- **Échec de paiement Mobile Money** : en cas d'échec (solde insuffisant, numéro incorrect, réseau), le client doit être notifié et proposé de réessayer ou de choisir le paiement en espèces.
- **Non-confirmation du paiement espèces** : si le client déclare avoir payé mais que le professionnel ne confirme pas réception après un délai raisonnable (ex. : 20 minutes), le système doit alerter les deux parties et proposer une intervention de l'administrateur pour médiation.
- **Litige sur le montant espèces** : en cas de désaccord sur le montant payé (client prétend avoir payé X, professionnel prétend avoir reçu Y), le système doit permettre à l'administrateur d'accéder aux journaux de transaction (si paiement Mobile Money) ou de recueillir des témoignages (témoignage du client, témoignage du professionnel, éventuellement témoins présents) pour trancher.
- **Annulation après début mais avant fin** : le client ou le professionnel peut annuler l'intervention après le début mais avant la fin déclarée. Dans ce cas :
  - Si annulation par le client avant paiement : remboursement intégral si paiement déjà effectué (Mobile Money) ou pas de paiement à effectuer (espèces non encore donné).
  - Si annulation par le professionnel après début mais avant fin : considéré comme abandon éventuel ; le professionnel doit fournir une justification (ex. : problème imprévu sur place) qui peut être évaluée par l'administrateur pour déterminer s'il y a faute ou circonstances atténuantes.
  - Toute annulation après début doit être enregistrée avec motif et peut affecter le Score Relio du professionnel (composante historique ou réputation selon décision produit).
- **Preuve de fin d'intervention** : le timestamp de validation du scan QR professionnel (ou de confirmation du code PIN) est enregistré comme heure officielle de fin d'intervention dans la base de données.
- **Gestion des cas où le client ne possède pas de smartphone pour scanner** : alternative permettant au professionnel de lire un code affiché côté client ou de saisir un code court fourni par le client (à définir selon évolutions futures).

## Paiement
Le paiement constitue l'étape de formalisation de la transaction entre le client et le professionnel. Il doit être sécurisé, transparent et conforme aux habitudes de paiement locaux.

### Méthodes acceptées dans le MVP
- **Mobile Money** : MTN Mobile Money et Orange Money (opérateurs principaux au Cameroun). Le paiement se fait depuis l'application respective de l'opérateur ou via une USSD/intégration simplifiée si disponible.
- **Espèces** : paiement en main propre de monnaie locale (Franc CFA BEAC, XAF) directement au professionnel à la fin de l'intervention.

### Règles métier du paiement
- **Montant affiché** : le montant présenté au client est un prix estimatif basé sur la catégorie de problème et la région. Il doit être clairement indiqué comme estimatif, avec une mention pouvant varier après intervention si nécessaire (ex. : « Ce montant est estimé et pourra être ajusté après intervention si nécessaire »).
- **Transparence** : si des éléments spécifiques ont été convenus sur place (ex. : remplacement d'une pièce coûteuse), le professionnel peut ajuster le montant avant que le client ne confirme le paiement ; cette adjustment doit être enregistré avec justification et visible côté client avant confirmation.
- **Confirmation de paiement Mobile Money** : le backend doit écouter les webhooks de succès provenant des opérateurs Mobile Money (ou utiliser une API de vérification de transaction). Dès réception d'un webhook indiquant un paiement réussi correspondant à l'ID de mission, le paiement est marqué comme effectué.
- **Confirmation de paiement espèces** : nécessite une double confirmation :
  1. Le client confirme dans son application avoir remis le montant en espèces au professionnel (bouton « J'ai payé »).
  2. Le professionnel confirme dans son application avoir reçu le montant en espèces du client (bouton « Paiement reçu » déclenché par le scan QR professionnel ou saisie de code).
  Seul lorsque les deux confirmations sont enregistrées, le paiement est considéré comme effectué.
- **Sécurité contre la fraude** : pour éviter qu'un professionnel déclare faussement avoir reçu un paiement espèces, le système doit exiger la confirmation du client avant de considérer le paiement comme effectué. Inversement, pour éviter qu'un client déclare faussement avoir payé, le système doit exiger la confirmation du professionnel.
- **Réception du paiement** : dès que le paiement est confirmé comme effectué, le backend génère un reçu numérique contenant :
  - Numéro de transaction unique (ou ID de mission)
  - Date et heure de confirmation
  - Montant payé
  - Nom du professionnel
  - Service rendu (texte du problème ou catégorie)
  - Mode de paiement utilisé (Mobile Money MTN, Mobile Money Orange, Espèces)
  - Référence de transaction Mobile Money le cas échéant
  Ce reçu est stocké dans le compte du client et peut être téléchargé ou partagé.
- **Gestion des échecs et retries** : en cas d'échec de paiement Mobile Money (webhook d'erreur ou timeout), le système doit permettre au client de réessayer immédiatement ou de choisir une autre méthode de paiement. Un nombre maximal de retries (ex. : 3 essais) doit être défini avant de suggérer l'annulation de la mission.
- **Paiement en attente** : tant que le paiement n'est pas confirmé comme effectué, l'étape de suivi d'intervention reste en « Paiement en attente » avec un rappel périodique (notification ou bandeau) pour encourager le client à finaliser le paiement.
- **Impact sur le Score Relio** : le paiement réussi contribue positivement à l'historique du professionnel (composante historique du Score Relio). Un paiement en échec ou annulé après confirmation peut avoir un impact négatif selon décision produit.
- **Reporting et comptabilité** : toutes les transactions réussies doivent être journalisées pour des fins comptables et de reporting financier (chiffre d'affaires, taxes éventuelles).

## Évaluation
L'évaluation permet de construire la réputation du réseau et d'alimenter le composant réputation du Score Relio. Elle doit être simple, encourageante et riche en informations utiles pour améliorer le service.

### Méthodologie d'évaluation
Après confirmation du paiement, le client est invité à laisser une évaluation selon trois critères distincts :
1. **Qualité du travail** : satisfaction concernant la résolution du problème, la propreté du chantier, la conformité aux attentes.
2. **Rapidité d'intervention** : satisfaction concernant le temps pris pour réaliser l'intervention depuis le début jusqu'à la fin.
3. **Comportement et professionnalisme** : satisfaction concernant la ponctualité, la courtoisie, la communication et le respect du lieu d'intervention.

Chaque critère est noté sur une échelle de 1 à 5 étoiles (★ étant le plus mauvais, ★★★★★ étant le meilleur). Un commentaire libre est également proposé pour permettre au client d'exprimer des précisions ou des suggestions.

### Règles métier de l'évaluation
- **Moment de l'évaluation** : l'évaluation doit être demandée après que le paiement soit confirmé comme effectué, afin d'éviter que le client ne retienne son avis en levier de négociation sur le paiement. Un délai court (ex. : 2-5 minutes après confirmation paiement) est recommandé pour capturer l'expérience immédiate.
- **Obligatoire ou facultatif** : l'évaluation est fortement encouragée mais pas obligatoire pour clôturer la mission du point de vue du système. Cependant, des mécanismes de rappel doivent être mis en place :
  - Notification push « Merci pour votre intervention ! N'oubliez pas d'évaluer le professionnel. » envoyée après un délai si aucune évaluation n'a été soumise (ex. : 30 minutes après paiement).
  - Bandeau persistant dans le suivi d'intervention indiquant que l'évaluation est en attente.
- **Anonymat du commentaire** : le client peut choisir de rendre son commentaire anonyme lorsqu'il est affiché publiquement (ex. : dans la liste des avis du professionnel). Le système doit offrir une case à cocher « Rendre ce commentaire anonyme ».
- **Modération des commentaires** : tout commentaire contenant des propos injurieux, des menaces ou des révélations d'informations personnelles doit être flaggué pour modération par l'équipe Relio. Un processus de revue doit permettre d'accepter, de modifier ou de supprimer le commentaire selon les règles de communauté.
- **Mise à jour du Score Relio** : dès réception d'une évaluation valide, le composant réputation du Score Relio du professionnel concerné est mis à jour. Le calcul exact dépend de la formule de mise à jour du Score Relio (à définir : moyenne glissante des notes de réputation, ou moyenne pondérée avec historique).
- **Historique des évaluations** : chaque évaluation reçue est stockée associée à l'ID de mission, au professionnel et au client (optionnel, pour éviter les biais de double compte). Elle contribue au nombre total d'évaluations (composante historique du Score Relio).
- **Gestion des évaluations manquantes** : si un professionnel réalise de nombreuses interventions mais reçoit peu d'évaluations, son composant réputation peut devenir moins représentatif. Des stratégies d'incitation peuvent être mises en place (ex. : badge « Top évalué » après un certain nombre d'évaluations positives).
- **Litige sur l'évaluation** : si un professionnel conteste une évaluation qu'il juge injuste ou fraudueuse, il peut soumettre une demande de révision à l'équipe Relio avec preuves (photos du chantier, témoignages de témoins, etc.). Une comité de revue peut alors décider de maintenir, d'ajuster ou de supprimer l'évaluation.
- **Affichage des évaluations** : dans le profil professionnel, les évaluations sont affichées sous forme de liste paginée avec les informations suivantes : date, note globale (moyenne des trois critères ou note globale si seulement une note globale est collectée), extrait du commentaire (optionnel), et indication si le commentaire est anonyme.
- **Utilisation des évaluations pour l'amélioration du produit** : les tendances récurrentes dans les commentaires (ex. : retards fréquents, problèmes de communication) doivent être analysées par l'équipe produit pour alimenter les améliorations du moteur d'attribution, les formations des prestataires ou les ajustements de l'interface.

## Notifications
Les notifications tiennent les utilisateurs informés des événements importants sans qu'ils aient besoin d'ouvrir constamment l'application. Elles doivent être pertinentes, timely et non envahissantes.

### Types de notifications
- **Notifications push** : messages affichés par le système d'exploitation du smartphone même lorsque l'application est en arrière-plan ou fermée.
- **Notifications in-app** : messages affichés à l'intérieur de l'application lorsqu'elle est ouverte (bannières, modals, barre de notification).
- **Notifications par SMS** : optionnel, utilisé comme secours lorsque les notifications push échouent ou pour les utilisateurs ayant désactivé les notifications push.
- **Notifications email** : optionnel, utilisé principalement pour les communications administratives (validation de compte, reçus, newsletters).

### Notifications côté Client
| Événement | Type | Contenu | Timing |
|-----------|------|---------|--------|
| Nouvelle réception de demande (côté professionnel) | Push (professionnel) | « Nouveau travail disponible : [type de problème] à [quartier], [distance] » | Immédiat après confirmation client |
| Rappel de paiement en attente | Push (client) | « Nous attendons votre paiement pour terminer l'intervention. » | Après X minutes sans paiement confirmé |
| Confirmation de paiement réussi | Push (client & professionnel) | « Paiement reçu ! Merci pour votre confiance. » | Dès réception du webhook Mobile Money ou double confirmation espèces |
| Invitation à l'évaluation | Push (client) | « Merci pour votre intervention ! Évaluez le professionnel maintenant. » | Après confirmation paiement + délai court |
| Confirmation d'évaluation soumise | Push (client) | « Merci pour votre évaluation ! » | Dès réception de l'évaluation valide |
| Annulation de mission (coté client) | Push (client) | « Votre demande a été annulée. » | Dès confirmation d'annulation |
| Annulation de mission (côté professionnel) | Push (professionnel) | « La mission [ID] a été annulée par le client. » | Dès notification d'annulation du backend |
| Professionnel en retard | Push (client) | « Le professionnel devrait arriver sous peu. Nous attendons son signal de début. » | Après délai raisonnable suivant l'acceptation sans début confirmé |
| Mise à jour du suivi d'intervention | In-app (client) | Mise à jour des étapes de la timeline (ex. : « Intervention en cours » + chronomètre) | En temps réel via WebSocket ou polling fréquent |
| Offre promotionnelle / nouveau service | Push (client) | Selon évolutions futures (V2/V3) | À définir |

### Notifications côté Prestataire
| Événement | Type | Contenu | Timing |
|-----------|------|---------|--------|
| Nouvelle mission disponible | Push (professionnel) | « Nouveau travail disponible : [type de problème] à [quartier], [distance] » | Dès attribution confirmée par le client |
| Rappel de réponse requise | Push (professionnel) | « Nous attendons votre réponse sur la mission [ID]. » | Après X minutes sans acceptation ou refus |
| Confirmation d'acceptation | Push (professionnel) | « Mission acceptée ! Préparez-vous à intervenir. » | Dès réception de l'acceptation |
| Début d'intervention détecté | Push (professionnel & client) | « Intervention démarrée. Chronomètre lancé. » | Dès validation du début (QR code ou géofencing) |
| Fin d'intervention déclarée | Push (professionnel & client) | « Intervention terminée. Passage au paiement. » | Dès déclaration de fin par le professionnel |
| Rappel de paiement en attente | Push (professionnel) | « Nous attendons la confirmation du paiement pour clôturer la mission. » | Après X minutes sans paiement confirmé |
| Confirmation de paiement reçu | Push (professionnel) | « Paiement reçu ! Merci pour votre professionnel. » | Dès double confirmation espèces ou webhook Mobile Money |
| Invitation à l'évaluation | Push (professionnel) | « Votre client a terminé l'évaluation. Consultez votre avis. » | Dès réception de l'évaluation client |
| Suspension de profil | Push (professionnel) | « Votre profil a été suspendu pour [motif]. Voir détails dans l'app. » | Dès décision d'administrateur |
| Réactivation de profil | Push (professionnel) | « Votre profil a été réactivé. Vous pouvez désormais recevoir des missions. » | Dès décision d'administrateur |
| Mise à jour du suivi d'intervention | In-app (professionnel) | Mise à jour des étapes de la mission (ex. : « En cours », « Terminée ») | En temps réel via WebSocket ou polling fréquent |

### Notifications côté Administrateur
| Événement | Type | Contenu | Timing |
|-----------|------|---------|--------|
| Nouveau prestataire en attente de vérification | Push (admin) | « Un nouveau profil professionnel est en attente de vérification. » | Dès soumission d'un nouveau compte professionnel |
| Alerte de performance | Push (admin) | Selon seuils définis (ex. : temps moyen d'attribution >45min) | Périodique selon fréquence de relevé |
| Signalement de problème | Push (admin) | « Un signalement de problème a été reçu concernant la mission [ID]. » | Dès réception d'un formulaire de signalement |
| Décision de suspension/réactivation | Push (admin) | « Vous avez suspendu/réactivé le profil [ID]. » | Dès action d'administrateur |
| Résumé quotidien | Email (admin) | Synthèse des indicateurs clés de la journée | Chaque matin à heure fixe |

### Règles métier des notifications
- **Pertinence** : chaque notification doit apporter une information utile ou nécessiter une action de l'utilisateur. Éviter les notifications purement informatives sans valeur ajoutée.
- **Timing** : les notifications doivent être envoyées au moment le plus approprié pour maximiser l'engagement et minimiser l'ennui (ex. : ne pas envoyer une notification de paiement en attente au milieu de la nuit sauf si critique).
- **Fréquence** : limiter le nombre de notifications par utilisateur et par période pour éviter le fatigue de notification. Par exemple, ne pas envoyer plus de X rappels de paiement en attente avant de suggérer une autre action.
- **Personnalisation** : utiliser le prénom ou le nom d'affiché lorsqu'appelé (ex. : « Bonjour [Prénom], » dans le contenu de la notification).
- **Clarté d'action** : chaque notification doit indiquer clairement ce que l'utilisateur doit faire (ex. : « Appuyez pour payer », « Appuyez pour évaluer », « Appuyez pour voir les détails »).
- **Possibilité de désactivation** : les utilisateurs doivent pouvoir désactiver les types de notifications qu'ils souhaitent (ex. : désactiver les notifications promotionnelles tout en conservant les notifications critiques).
- **Fall-back SMS** : en cas d'échec de notification push après plusieurs tentatives, envisager l'envoi d'un SMS comme secours (coût à considérer).
- **Consentement explicite** : lors de la première ouverture de l'application, demander la permission d'envoyer des notifications push avec une explication claire des bénéfices.
- **Gestion du taux de répétition** : si un même événement se produit plusieurs fois en courte période (ex. : plusieurs rappels de paiement), regrouper les notifications ou augmenter l'intervalle entre elles.
- **Localisation du contenu** : toutes les notifications doivent être rédigées en français (langue principale du MVP) ; prévoir des emplacements pour des traductions futures si l'expansion géographique est envisagée.
- **Icônes et sons** : utiliser des icônes adaptées au type de notification (ex. : icône de monnaie pour paiement, icône d'étoile pour évaluation, icône d'alerte pour problème) et un son discret mais perceptible.

## Annulation
L'annulation permet à l'une des parties de mettre fin à une mission avant son terme naturel. Elle doit être gérée de manière équitable, avec des règles claires sur les frais, les remboursements et les impacts sur la réputation.

### Scénarios d'annulation
1. **Annulation par le client avant début d'intervention** :
   - Le client décide d'annuler la mission alors que le professionnel n'a pas encore commencé le travail.
   - Aucun frais d'annulation ne doit être appliqué si aucune intervention n'a été entamée.
   - Le professionnel est notifié immédiatement et la mission est marquée comme annulée.
   - Le professionnel peut proposer immédiatement une nouvelle mission similaire si disponible (optionnel).
   - Impact sur le Score Relio : aucun impact négatif pour le professionnel (pas de mission réalisée, pas de refus).
   - Le client reçoit une confirmation d'annulation et éventuellement un remboursement si un paiement anticipé avait été effectué (non applicable dans le MVP actuel où le paiement intervient après intervention).

2. **Annulation par le professionnel avant début d'intervention** :
   - Le professionnel déclare qu'il ne peut pas réaliser la mission après l'avoir acceptée (ex. : indisponibilité de dernière minute, problème personnel, manque de compétence spécifique).
   - Un frais d'annulation léger peut être appliqué pour décourager les annulations abusives, mais doit être proportionné (à définir selon décision produit).
   - Le client est notifié immédiatement et proposé soit de recevoir une nouvelle proposition professionnelle, soit d'annuler sans frais.
   - Impact sur le Score Relio : potentiellement négatif selon fréquence et motifs (à intégrer dans la composante historique ou réputation du Score Relio avec une pénalité pour annulation non justifiée).
   - Le professionnel doit fournir un motif obligatoire lors de l'annulation (liste déroulante : indisponibilité, urgence personnelle, manque de compétence, déplacement impossible, autre avec champ texte libre).

3. **Annulation après début d'intervention mais avant fin déclarée** :
   - L'une des parties décide d'arrêter l'intervention alors que le travail a déjà commencé.
   - Si annulation par le client :
     - Le professionnel doit être payé pour le travail déjà effectué (au prorata du temps ou selon accord sur place).
     - Le client reçoit un remboursement partiel correspondant au travail non réalisé.
     - Impact sur le Score Relio : potentiellement négatif pour le professionnel si l'annulation est jugée injustifiée (ex. : client change d'avis sans raison valable).
   - Si annulation par le professionnel :
     - Le client doit être remboursé intégralement si aucun paiement n'a encore été effectué, ou recevoir un remboursement partiel si un paiement partiel a déjà été effectué.
     - Le professionnel doit fournir une justification détaillée (ex. : problème imprévu sur place, risque de sécurité, matériel manquant).
     - Impact sur le Score Relio : potentiellement négatif si l'annulation est jugée injustifiée (abandon de poste).
   - Dans les deux cas, une médiation de l'administrateur peut être requise en cas de désaccord sur le montant à rembourser ou sur la justification.

4. **Annulation après paiement effectué mais avant évaluation** :
   - Rare dans le flux actuel car le paiement intervient avant l'évaluation, mais possible si le client souhaite annuler après avoir payé mais avant de laisser un avis.
   - Le professionnel doit conserver le paiement pour le travail réalisé.
     - Le client peut demander un remboursement partiel ou total selon accord ; toute demande de remboursement doit être justifiée et peut être soumise à l'administrateur pour médiation.
   - Impact sur le Score Relio : le professionnel conserve les points positifs de l'historique pour le travail réalisé ; le client perd l'opportunité d'évaluer.

### Règles métier de l'annulation
- **Motif obligatoire** : toute annulation doit être accompagnée d'un motif sélectionné parmi une liste prédéfinie, avec possibilité d'ajouter un commentaire libre pour préciser.
- **Notification immédiate** : dès réception d'une demande d'annulation, le backend doit notifier l'autre partie en temps réel (push ou in-app).
- **Gestion des paiements** :
  - Pour les paiements Mobile Money : le backend doit pouvoir déclencher un remboursement via l'API de l'opérateur si le paiement a déjà été confirmé et que l'annulation est justifiée (à définir selon capacités d'intégration).
  - Pour les paiements espèces : le remboursement se fait en main propre ; le système doit faciliter la mise en contact des deux parties pour organiser le remboursement (optionnel : fournir un moyen de générer un reçu de remboursement).
- **Impact sur le Score Relio** : chaque annulation doit être enregistrée dans l'historique du professionnel et du client. L'algorithme de calcul du Score Relio doit décider si les annulations comptent négativement (par réduction de la composante historique ou ajout d'une pénalité spécifique).
- **Seuil de tolérance** : définir un nombre maximal d'annulations autorisées sur une période donnée avant d'appliquer des sanctions (ex. : plus de 3 annulations non justifiées sur le mois entraîne une baisse de visibilité dans les recommandations).
- **Preuve d'annulation** : enregistrer le timestamp de l'annulation et, si possible, la géolocalisation de l'utilisateur au moment de l'annulation pour vérifier la cohérence avec le prétendu motif (ex. : annulation pour « déplacement impossible » alors que l'utilisateur est en déplacement).
- **Option de report** : proposer au client de reporter la mission à une date ultérieure plutôt que d'annuler totalement (à définir selon évolutions futures).
- **Communication empathique** : les messages d'annulation doivent être rédigés de manière à ne pas accuser l'utilisateur, mais à présenter les faits et les options disponibles.

## Suspension
La suspension est une mesure temporaire qui empêche un utilisateur (principalement un professionnel) de recevoir de nouvelles missions en raison de problèmes de qualité, de fiabilité ou de comportement. Elle diffère de l'annulation qui concerne une mission spécifique.

### Raisons de suspension
- **Qualité insuffisante** : note moyenne persistante en dessous d'un seuil défini (ex. : <2.5 sur 5 sur au moins 10 évaluations).
- **Taux d'annulation élevé** : pourcentage d'annulations déclarées par le professionnel supérieur à un seuil défini (ex. : >40% des missions acceptées annulées par le professionnel) sur une période significative.
- **Comportement inapproprié** : signalements répétés de retard excessif, manque de professionnalisme, demandes de paiement supplémentaire non justifié, ou toute autre violation des règles de bonne conduite.
- **Non-respect des engagements** : échec répété à commencer ou terminer une intervention dans les délais raisonnables après acceptation.
- **Fraude ou usurpation d'identité** : preuve de faux documents, d'utilisation d'un compte appartenant à quelqu'un d'autre, ou de tentative de tromperie du système.
- **Inactivité prolongée** : absence totale d'activité (aucune mission acceptée) sur une période définie (ex. : 3 mois) pouvant indiquer un abandon du compte.

### Processus de suspension
1. **Détection** : le système surveille en continu les indicateurs mentionnés ci-dessus (note moyenne, taux d'annulation, signalements, etc.) via des tâches de fond ou des déclencheurs lors de chaque nouvel événement (nouvelle évaluation, nouvelle annulation, nouveau signalement).
2. **Seuil déclencheur** : lorsqu'un indicateur dépasse son seuil défini pendant une période définie (ex. : deux semaines consécutives au-dessus du seuil), le système marque le profil comme « À reviewer » pour suspension.
3. **Revue par l'administrateur** : l'équipe Relio examine le cas présenté (historique complet, motifs des signalements, éventuelles échanges avec le professionnel) et décide :
   - Suspension temporaire (durée définie ou jusqu'à amélioration démontrée)
   - Avertissement préalable (dernière chance avant suspension)
   - Aucune action (si les données sont trompeuses ou si le professionnel a déjà corrigé le problème)
4. **Notification de suspension** : dès décision d'administrateur, le backend envoie une notification push au professionnel concerné avec le motif de la suspension et les étapes possibles pour la levée de suspension.
5. **Application de la suspension** : le professionnel ne reçoit plus de nouvelles missions tant que la suspension est active. Ses missions en cours (si aucune) sont laissées telles quelles (doivent être terminées normalement si déjà en cours). Son profil reste accessible en consultation mais avec un badge « Suspendu » visible.
6. **Période de suspension** : la durée peut être fixe (ex. : 7 jours, 14 jours, 30 jours) ou indéfinie jusqu'à preuve d'amélioration (ex. : maintien d'une note moyenne >3.5 pendant 2 semaines consécutives).
7. **Levée de suspension** : après la période définie ou après démonstration d'amélioration (ex. : nouvelles évaluations positives, réduction du taux d'annulation, réponse satisfaisante aux signalements), l'administrateur peut réactiver le profil. Une notification push informe le professionnel de la réactivation.
8. **Archivage** : les suspensions restent enregistrées dans l'historique du professionnel pour référence futura et peuvent être prises en compte dans les décisions futures de suspension ou de réactivation.

### Règles métier de la suspension
- **Motif obligatoire** : toute suspension doit être accompagnée d'un motif clair sélectionné parmi une liste de raisons prédéfinies, avec possibilité d'ajouter un commentaire libre détaillant la situation.
- **Notification immédiate** : dès décision d'administrateur, le professionnel doit être notifié en temps réel (push) et voir son statut mis à jour dans l'application.
- **Possibilité de faire appel** : le professionnel doit avoir la possibilité de contester la suspension en fournissant des preuves ou des explications supplémentaires (ex. : nouveau témoignage, correction d'un problème technique). Un processus de revue doit être mis en place.
- **Impact sur le Score Relio** : pendant la suspension, le Score Relio peut être gelé (ne plus évoluer) ou continuer à être calculé basé sur les données disponibles (à définir selon décision produit). Recommandation : geler le composant historique lié aux nouvelles missions (puisque aucune nouvelle mission n'est attribuée) mais permettre aux composants réputation et disponibilité de continuer à évoluer si des mises à jour de profil ou des évaluations historiques sont toujours prises en compte.
- **Seuils adaptatifs** : les seuils de suspension doivent être révisés périodiquement en fonction de l'évolution du réseau et des retours de l'équipe opérationnelle afin de rester pertinents (ex. : ajuster le seuil de note moyenne si la qualité globale du réseau s'améliore).
- **Transparence** : les critères de suspension doivent être communiqués clairement aux prestataires lors de l'inscription et dans le centre d'aide de l'application.
- **Prévention plutôt que punition** : idéalement, le système doit intervenir avant que la situation ne devienne critique : envoyer des avertissements lorsqu'un indicateur approche du seuil (ex. : « Votre note moyenne a baissé récemment ; pensez à demander des feedbacks à vos clients »).
- **Gestion des cas limites** : pour les nouveaux professionnels ayant peu d'évaluations, éviter de suspendre uniquement sur la base de la note moyenne ; privilégier le taux d'annulation et les signalements de comportement.
- **Journalisation** : chaque décision de suspension ou de levée de suspension doit être enregistrée avec horodatage, motif, identité de l'administrateur ayant pris la décision, et éventuellement les preuves considérées.

---

# 10 Notifications

## Vue d'ensemble
Les notifications tiennent les utilisateurs informés des événements importants sans qu'ils aient besoin d'ouvrir constamment l'application. Elles doivent être pertinentes, opportunes et non envahissantes. Le système utilise principalement des notifications push (iOS/Android) complétées par des notifications in-app lorsqu'une application est ouverte. En cas d'échec des notifications push, un fallback SMS peut être envisagé (à évaluer selon coût et couverture). Des notifications email sont réservées aux communications administratives (validation de compte, reçus, newsletters).

## Types de notifications
Le tableau suivant recense les principaux événements déclenchant une notification, leur type, leur contenu typique et leur timing relatif à l'événement.

### Notifications côté Client
| Événement | Type | Contenu | Timing |
|-----------|------|---------|--------|
| Nouvelle mission disponible (côté professionnel) | Push (professionnel) | « Nouveau travail disponible : [type de problème] à [quartier], [distance] » | Immédiat après confirmation client |
| Rappel de paiement en attente | Push (client) | « Nous attendons votre paiement pour terminer l'intervention. » | Après X minutes sans paiement confirmé (ex. : 10 min) |
| Confirmation de paiement réussi | Push (client & professionnel) | « Paiement reçu ! Merci pour votre confiance. » | Dès réception du webhook Mobile Money ou double confirmation espèces |
| Invitation à l'évaluation | Push (client) | « Merci pour votre intervention ! Évaluez le professionnel maintenant. » | Après confirmation paiement + délai court (ex. : 2-5 min) |
| Confirmation d'évaluation soumise | Push (client) | « Merci pour votre évaluation ! » | Dès réception de l'évaluation valide |
| Annulation de mission (coté client) | Push (client) | « Votre demande a été annulée. » | Dès confirmation d'annulation |
| Annulation de mission (côté professionnel) | Push (professionnel) | « La mission [ID] a été annulée par le client. » | Dès notification d'annulation du backend |
| Professionnel en retard | Push (client) | « Le professionnel devrait arriver sous peu. Nous attendons son signal de début. » | Après délai raisonnable suivant l'acceptation sans début confirmé (ex. : 20 min) |
| Mise à jour du suivi d'intervention | In-app (client) | Mise à jour des étapes de la timeline (ex. : « Intervention en cours » + chronomètre) | En temps réel via WebSocket ou polling fréquent (ex. : toutes les 5 secondes) |
| Offre promotionnelle / nouveau service | Push (client) | Selon évolutions futures (V2/V3) | À définir |
| Rappel de localisation manquante | Push (client) | « Pour améliorer la précision du matching, nous avons besoin de votre localisation. Autorisez l'accès au GPS ou indiquez votre quartier. » | Lorsque la demande est vide de localisation après saisie du problème |
| Aucune professionnelle trouvé | Push (client) | « Aucun professionnel disponible pour votre demande actuellement. » | Après recherche exhaustive du moteur d'attribution |
| Confirmation de début d'intervention | Push (client & professionnel) | « Intervention démarrée. Chronomètre lancé. » | Dès validation du début (scan QR client ou géofencing) |
| Confirmation de fin d'intervention | Push (client & professionnel) | « Intervention terminée. Passage au paiement. » | Dès déclaration de fin par le professionnel et validation (scan QR professionnel ou géofencing inverse) |
| Rappel de paiement espèces en attente | Push (client) | « Nous attendons la confirmation du professionnel que vous avez bien effectué le paiement. » | Après sélection du mode espèces sans confirmation du professionnel |
| Notification de litige paiement espèces | Push (client & professionnel) | « Il y a un désaccord sur le montant payé. Veuillez contacter le support pour résolution. » | Dès détection d'un désaccord (ex. : client déclare avoir payé, professionnel nie réception après délai) |

### Notifications côté Prestataire
| Événement | Type | Contenu | Timing |
|-----------|------|---------|--------|
| Nouvelle mission disponible | Push (professionnel) | « Nouveau travail disponible : [type de problème] à [quartier], [distance] » | Dès attribution confirmée par le client |
| Rappel de réponse requise | Push (professionnel) | « Nous attendons votre réponse sur la mission [ID]. » | Après X minutes sans acceptation ou refus (ex. : 5 min) |
| Confirmation d'acceptation | Push (professionnel) | « Mission acceptée ! Préparez-vous à intervenir. » | Dès réception de l'acceptation |
| Début d'intervention détecté | Push (professionnel & client) | « Intervention démarrée. Chronomètre lancé. » | Dès validation du début (scan QR client ou géofencing) |
| Fin d'intervention déclarée | Push (professionnel & client) | « Intervention terminée. Passage au paiement. » | Dès déclaration de fin par le professionnel et validation (scan QR professionnel ou géofencing inverse) |
| Rappel de paiement en attente | Push (professionnel) | « Nous attendons la confirmation du paiement pour clôturer la mission. » | Après X minutes sans paiement confirmé (ex. : 10 min) |
| Confirmation de paiement reçu | Push (professionnel) | « Paiement reçu ! Merci pour votre professionnel. » | Dès double confirmation espèces ou webhook Mobile Money |
| Invitation à l'évaluation | Push (professionnel) | « Votre client a terminé l'évaluation. Consultez votre avis. » | Dès réception de l'évaluation client |
| Suspension de profil | Push (professionnel) | « Votre profil a été suspendu pour [motif]. Voir détails dans l'app. » | Dès décision d'administrateur |
| Réactivation de profil | Push (professionnel) | « Votre profil a été réactivé. Vous pouvez désormais recevoir des missions. » | Dès décision d'administrateur |
| Mise à jour du suivi d'intervention | In-app (professionnel) | Mise à jour des étapes de la mission (ex. : « En cours », « Terminée ») | En temps réel via WebSocket ou polling fréquent |
| Rappel de mise à jour de profil | Push (professionnel) | « N'oubliez pas de mettre à jour votre disponibilité et vos compétences pour recevoir des missions pertinentes. » | Périodique (ex. : chaque lundi matin) |
| Signalement de comportement | Push (professionnel) | « Un signalement concernant votre comportement a été reçu. Veuillez consulter les détails. » | Dès réception d'un signalement valide par un client ou un administrateur |

### Notifications côté Administrateur
| Événement | Type | Contenu | Timing |
|-----------|------|---------|--------|
| Nouveau prestataire en attente de vérification | Push (admin) | « Un nouveau profil professionnel est en attente de vérification. » | Dès soumission d'un nouveau compte professionnel |
| Alerte de performance | Push (admin) | Selon seuils définis (ex. : temps moyen d'attribution >45min, taux de réussite <70%, satisfaction moyenne <3.5) | Périodique selon fréquence de relevé (ex. : toutes les 30 min) |
| Signalement de problème | Push (admin) | « Un signalement de problème a été reçu concernant la mission [ID]. » | Dès réception d'un formulaire de signalement (client ou professionnel) |
| Décision de suspension/réactivation | Push (admin) | « Vous avez suspendu/réactivé le profil [ID]. » | Dès décision d'administrateur |
| Résumé quotidien | Email (admin) | Synthèse des indicateurs clés de la journée (demandes reçues, interventions terminées, chiffre d'affaires estimé, satisfaction moyenne) | Chaque matin à heure fixe (ex. : 07:00) |
| Rappel de vérification de documents | Push (admin) | « Certains documents professionnels nécessitent une mise à jour ou sont manquants. Veuillez les examiner. » | Périodique (ex. : première semaine du mois) |
| Notification de mise à jour système | Push (admin) | « Une mise à jour du backend est planifiée pour [date/heure]. Prévoir une fenêtre de maintenance. » | Dès planification d'une maintenance |

## Règles métier des notifications
### Pertinence et utilité
- Chaque notification doit apporter une information utile ou nécessiter une action claire de l'utilisateur. Éviter les notifications purement informatives sans valeur ajoutée (ex. : « Votre application fonctionne correctement »).
- Les notifications doivent être rédigées dans un langage clair, concis et actionnable.

### Timing et fréquence
- **Timing optimal** : envoyer la notification au moment où l'utilisateur est le plus susceptible de pouvoir agir (ex. : ne pas envoyer une demande de paiement en pleine nuit sauf si critique).
- **Fréquence limitée** : limiter le nombre de notifications similaires sur une courte période pour éviter la fatigue de notification. Par exemple :
  - Maximum de 3 rappels de paiement en attente avant de suggérer une autre action (changer de moyen de paiement ou contacter le support).
  - Maximum de 2 rappels de réponse requise pour une mission avant de considérer la mission comme expirée et de la proposer à un autre professionnel.
  - Les notifications de mise à jour du suivi d'intervention (in-app) sont exemptes de cette limite car elles reflètent l'état en temps réel.
- **Regroupement** : lorsque plusieurs événements du même type se produisent en courte période, envisager de regrouper les notifications (ex. : « Vous avez reçu 3 nouvelles évaluations » au lieu de trois notifications séparées).

### Personnalisation et clarté
- **Personnalisation** : utiliser le prénom ou le nom d'affiché lorsqu'appelé (ex. : « Bonjour [Prénom], votre paiement a été reçu »).
- **Clarté d'action** : chaque notification doit indiquer clairement ce que l'utilisateur doit faire (ex. : « Appuyez pour payer », « Appuyez pour évaluer », « Appuyez pour voir les détails »).
- **Options de désactivation** : les utilisateurs doivent pouvoir désactiver les types de notifications qu'ils souhaitent via les paramètres de l'application (ex. : désactiver les notifications promotionnelles tout en conservant les notifications critiques liées aux paiements et aux évaluations).
- **Consentement explicite** : lors de la première ouverture de l'application, demander la permission d'envoyer des notifications push avec une explication claire des bénéfices (« Nous vous enverrons des alertes importantes pour suivre vos interventions et recevoir vos paiements »).

### Sécurité et fiabilité
- **Fall-back SMS** : en cas d'échec de notification push après plusieurs tentatives (ex. : 3 échecs consécutifs), envisager l'envoi d'un SMS comme secours. Le coût par SMS doit être évalué et réservé aux notifications critiques (ex. : échec de paiement, suspension de profil).
- **Gestion du taux de répétition** : si un même événement se produit plusieurs fois en courte période (ex. : plusieurs rappels de paiement), augmenter l'intervalle entre les notifications plutôt que d'envoyer une notification à chaque occurrence.
- **Localisation du contenu** : toutes les notifications doivent être rédigées en français (langue principale du MVP) ; prévoir des emplacements pour des traductions futures si l'expansion géographique est envisagée.
- **Icônes et sons** : utiliser des icônes adaptées au type de notification (ex. : icône de monnaie pour paiement, icône d'étoile pour évaluation, icône d'alerte pour problème) et un son discret mais perceptible (durée <1 seconde, volume moyen). Le son peut être désactivé indépendamment de la notification dans les paramètres du téléphone.

### Gestion des erreurs
- **Échec de livraison** : si une notification push ne peut pas être livrée (appareil hors ligne, token invalide), le backend doit conserver la notification et essayer à nouveau selon une politique de backoff exponentiel (ex. : retry après 1 min, 4 min, 10 min).
- **Journalisation** : chaque tentative de notification (envoi, échec, succès) doit être journalisée pour permettre le débogage et l'analyse de l'engagement.
- **Limitation du taux** : respecter les limites imposées par les fournisseurs de services de notifications push (ex. : Firebase Cloud Messaging) afin d'éviter le blocage du compte d'expéditeur.

## Exemples de maquettes de notification (à titre indicatif)
Bien que les maquettes détaillées ne soient pas disponibles dans le dossier fourni, voici comment pourraient apparaître les notifications les plus courantes :

### Notification de nouvelle mission (professionnel)
```
[Icône de relais] Nouveau travail disponible
Plomberie à Bonamoussadi, 850 m
[Accepter]   [Refuser]
```

### Notification de rappel de paiement (client)
```
[Icône d'horloge] Nous attendons votre paiement
Appuyez pour payer maintenant
```

### Notification d'invitation à l'évaluation (client)
```
[Icône d'étoile] Merci pour votre intervention !
Évaluez le professionnel maintenant
[Évaluer maintenant]
```

### Notification de suspension (professionnel)
```
[Icône d'avertissement] Votre profil a été suspendu
Motif : Taux d'annulation élevé (>40%)
[Voir détails]
```

Ces exemples servent à illustrer le ton, la longueur et la structure attendue pour les notifications du MVP Relio.

---

# 11 États spéciaux

## Loading (Chargement)
### Description
État indiquant que l'application attend une réponse du backend ou effectue une opération en cours (chargement de données, envoi de formulaire, traitement d'une demande).

### Apparition
- Lors de l'envoi d'un formulaire de création de compte (client ou prestataire)
- Pendant l'analyse de la demande par le moteur d'attribution (écrans « Relio analyse votre demande » et « Recherche du professionnel adapté »)
- Lors de la récupération de listes longues (historique des missions, liste des prestataires, etc.)
- Lors de l'initialisation de l'application au démarrage (chargement des paramètres, vérification de la session)
- Lors de l'envoi d'une évaluation ou d'un paiement Mobile Money en attente de webhook
- Lors de la récupération de données pour le Dashboard Administrateur (graphiques, listes)

### Règles métier
- Doit être accompagné d'un indicateur visuel d'activité (spinner, barre de progression, ou animation de points de suspension).
- L'écran ne doit pas bloquer complètement l'interaction utilisateur si possible : permettre le retour en arrière ou l'annulation de l'opération en cours (ex. : bouton « Annuler » lors de l'envoi d'un formulaire).
- Doit disparaître dès réception de la réponse réussie ou d'une erreur clairement communiquée.
- En cas de délai prolongé (>10 secondes), envisager un message explicatif (« Nous rencontrons un léger délai, merci de votre patience ») plutôt qu'un simple spinner indéfini.
- L'état de chargement ne doit pas masquer des informations critiques déjà disponibles (ex. : afficher la liste partiellement chargée avec des lignes squelettes).

## Erreur
### Description
État indiquant que quelque chose s'est mal passé : erreur de saisie, échec de connexion, réponse d'erreur du backend, validation échouée, etc.

### Types d'erreurs courants
- **Erreur de saisie** : champ manquant, format invalide (ex. : numéro de téléphone incorrect), valeur hors plage.
- **Erreur de connexion** : impossibilité de joindre le backend (timeout, erreur DNS, refus de connexion).
- **Erreur du backend** : réponse HTTP 4xx ou 5xx (ex. : 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).
- **Erreur de validation** : les données soumises ne passent pas les règles métier (ex. : tentative de création de compte avec un téléphone déjà utilisé, tentative d'attribution avec aucun professionnel compatible).
- **Erreur de traitement** : échec interne lors de l'analyse de la demande, du calcul du Score Relio, ou de l'envoi d'une notification.
- **Erreur de notification** : échec d'envoi d'une notification push après plusieurs tentatives.
- **Erreur de paiement** : échec de webhook Mobile Money, timeout de paiement espèces, confirmation manquante.

### Apparition
- En ligne sous le champ concerné pour les erreurs de saisie (validation inline).
- En bandeau supérieur ou modal pour les erreurs bloquantes (ex. : échec de connexion empêchant toute action).
- Dans un écran dédié d'erreur lorsqu'une opération critique échoue (ex. : échec de paiement après plusieurs tentatives).
- Dans le Dashboard Administrateur sous forme d'alerte ou de message d'erreur dans le widget concerné.

### Règles métier
- Doit fournir un message clair, compréhensible par l'utilisateur final, évitant le jargon technique.
- Doit suggérer une action corrective lorsque possible (ex. : « Veuillez vérifier votre numéro de téléphone », « Réessayer dans quelques minutes », « Contacter le support »).
- Doit préserver l'état antérieur autant que possible pour permettre à l'utilisateur de corriger et de réessayer sans tout recommencer.
- Les erreurs de connexion doivent indiquer que l'utilisateur peut vérifier sa connexion internet et réessayer.
- Les erreurs du backend doivent être journalisées côté serveur pour permettre le débogage par l'équipe technique.
- En cas d'erreur de validation bloquante (ex. : aucun professionnel trouvé), proposer des alternatives pertinentes (modifier la description, réessayer plus tard, contacter le support).
- Les messages d'erreur doivent être localisés en français et éviter les termes anglais non traduits (ex. : éviter « 404 Not Found » au profit de « Page non trouvée »).
- Doit ne pas révéler de détails internes excessifs qui pourraient compromettre la sécurité (ex. : ne pas afficher la trace complète de l'exception).

## Vide (Empty State)
### Description
État affiché lorsqu'une liste ou une collection est vide, mais que l'attente légitime est qu'elle puisse contenir des éléments (ex. : historique vide, aucune mission disponible, aucun prestataire trouvé).

### Apparition
- Historique des missions client ou professionnel lorsqu'aucune mission n'a encore été réalisée.
- Liste des missions nouvelles lorsqu'aucune demande ne correspond aux critères du professionnel actuellement connecté.
- Liste des missions acceptées ou terminées lorsqu'aucune mission n'est dans cet état.
- Liste des avis ou commentaires lorsqu'aucune évaluation n'a encore été reçue.
- Liste des prestataires dans le Dashboard Administrateur lorsqu'aucun professionnel ne correspond aux filtres appliqués.
- Tableau de bord du Dashboard Administrateur lorsqu'aucune donnée n'est encore disponible (ex. : au lancement du MVP).

### Règles métier
- Doit contenir une illustration ou une icône générique représentant le vide (ex. : boîte vide, feuille blanche).
- Doit contenir un message explicite amical et encourageant expliquant pourquoi l'affichage est vide et quelle action l'utilisateur peut entreprendre pour changer cela.
- Exemples de messages :
  - « Vous n'avez encore effectué aucune mission. Acceptez votre première demande pour commencer à construire votre historique. »
  - « Aucun travail disponible correspondant à vos critères pour le moment. Élargissez votre zone d'intervention ou mettez à jour vos disponibilités pour augmenter vos chances. »
  - « Vous n'avez encore reçu aucune évaluation. Encouragez vos clients à laisser leur avis après chaque intervention. »
  - « Aucune donnée ne correspond aux filtres sélectionnés. Essayez d'élargir la période ou de modifier les critères. »
- Doit proposer une action concrète lorsque pertinent (ex. : bouton « Accepter une mission », bouton « Mettre à jour mon profil », bouton « Effacer les filtres »).
- Doit éviter le ton décourageant ou accusateur ; rester bienveillant et orienté solution.
- L'état vide ne doit pas être confondu avec un état d'erreur ; il s'agit d'une condition normale et attendue dans le cycle d'utilisation de l'application.

## GPS
### Description
État lié à la disponibilité et à la précision du signal de localisation géographique (GPS) de l'appareil utilisateur.

### Scénarios
- **Autorisation accordée, signal fort** : le GPS fournit des coordonnées précises (précision <20 mètres) utiles pour le calcul de distance dans le Score Relio et pour les fonctionnalités de géofencing.
- **Autorisation accordée, signal faible ou indisponible** : le GPS est activé mais les coordonnées sont imprécises ou indisponibles (ex. : à l'intérieur d'un bâtiment, entouré de bâtiments hauts).
- **Autorisation refusée** : l'utilisateur a refusé l'accès à la localisation lors de la demande de permission.
- **Service de localisation désactivé** : le GPS est éteint au niveau du système d'exploitation.

### Apparition
- Lors de la création de compte (demande de permission GPS pour préciser le quartier ou la localisation).
- Lors de l'expression d'un problème (si l'application utilise la localisation automatique pour améliorer le matching).
- Lors du début d'intervention (vérification de position via géofencing ou confirmation manuelle).
- Lors de la fin d'intervention (vérification éventuelle de la position pour confirmer la présence sur place).
- Dans le Dashboard Administrateur pour afficher la répartition géographique des demandes ou des prestataires.

### Règles métier
- Doit demander la permission GPS avec une explication claire des bénéfices (« Nous utilisons votre localisation pour vous proposer des professionnels proches de vous et réduire le temps d'attente »).
- Doit fonctionner correctement même lorsque l'utilisateur refuse l'accès au GPS : dans ce cas, l'application doit solliciter une saisie manuelle du quartier ou de la ville et utiliser cette approximation pour le calcul de distance.
- Doit indiquer clairement lorsque la localisation est utilisée (ex. : icône de localisation active dans la barre d'état) et permettre à l'utilisateur de la désactiver dans les paramètres.
- Doit gérer les cas de drift ou de perte de signal pendant une intervention : si la localisation devient indisponible après le début, le système doit se baser sur la dernière position connue ou sur la déclaration de l'utilisateur (via bouton « Je suis ici »).
- Doit éviter de présenter une précision factice : si le signal GPS est faible, indiquer une précision faible ou utiliser une localisation basée sur le quartier uniquement.
- Doit respecter les consignes d'économie de batterie : demander les mises à jour de localisation uniquement lorsque nécessaire (ex. : lors du suivi d'intervention en temps réel) et utiliser des intervalles raisonnables (ex. : chaque 10 secondes) plutôt qu'un suivi continu à haute fréquence.
- Doit journaliser les échecs d'acquisition de localisation pour permettre l'amélioration de l'algorithme de fallback (ex. : passage à la localisation basée sur le quartier).

## Internet
### Description
État lié à la disponibilité de la connexion internet de l'appareil utilisateur (Wi-Fi ou données mobiles).

### Scénarios
- **Connexion disponible et stable** : l'application peut communiquer avec le backend sans interruption.
- **Connexion lente ou intermittente** : le débit est faible ou la connexion subit des pertes périodiques.
- **Connexion indisponible** : l'appareil n'a pas accès à internet (mode avion, hors couverture, données mobiles épuisées).

### Apparition
- À chaque tentative de communication avec le backend (envoi de demande, récupération de données, envoi de paiement, etc.).
- Lors du lancement de l'application (vérification de la capacité à atteindre le serveur).
- En arrière-plan pour les synchronisations périodiques (ex. : rafraîchissement du suivi d'intervention, réception de notifications push).

### Règles métier
- Doit détecter la perte de connexion dès que possible et afficher un état approprié plutôt que de faire croire que l'opération réussit.
- Doit proposer une action de réessayer lorsque la connexion est rétablie (ex. : bouton « Réessayer » qui apparaît après une détection de retour de connexion).
- Doit permettre la poursuite limitée de l'expérience hors ligne lorsque cela est logique (ex. : visualisation de l'historique déjà chargé, lecture de messages déjà reçus) mais doit clairement indiquer les éléments qui ne sont pas disponibles (ex. : « Vous êtes hors ligne ; certaines actions nécessitent une connexion internet »).
- Doit éviter de perdre des données critiques en cours de saisie : sauvegarder localement les formulaires en cours (ex. : texte de la demande en cours) afin de permettre une récupération après rétablissement de la connexion.
- Doit indiquer clairement lorsque l'application est en mode hors ligne (ex. : bandeau en haut ou en bas avec icône de wifi barré et texte « Hors ligne »).
- Doit synchroniser automatiquement les données en arrière-plan dès que la connexion est rétablie (ex. : envoyer les demandes en attente, mettre à jour l'historique).
- Doit respecter les consignes d'utilisation des données mobiles : éviter les téléchargements volumineux en arrière-plan sans consentement explicite (ex. : ne pas télécharger tout l'historique d'un coup lors de la reconnexion).
- Doit fournir un moyen de tester la connexion dans les paramètres (bouton « Tester ma connexion » qui effectue un ping léger vers le backend).

## Permissions
### Description
État lié aux autorisations système que l'application nécessite pour fonctionner correctement (localisation, microphone, stockage, notifications, etc.).

### Permissions requises dans le MVP
- **Localisation (GPS)** : pour améliorer le précision du matching et permettre les fonctionnalités de géofencing (début/fin d'intervention).
- **Microphone** : pour permettre la saisie vocale du problème.
- **Notifications push** : pour recevoir les alertes importantes (nouvelle mission, paiement reçu, invitation à l'évaluation, etc.).
- **Stockage externe** : optionnel, pour permettre l'enregistrement de reçus ou d'images (ex. : reçu de paiement, photo du chantier) si évolution future.
- **Appel téléphonique** : optionnel, pour permettre au professionnel d'appeler le client directement depuis l'application si évolution future.

### Apparition
- Lors de la première utilisation de chaque fonctionnalité nécessitant une permission (ex. : première tentative de saisie vocale déclenche la demande de permission microphone).
- Lors du lancement de l'application si une permission préalablement refusée est nécessaire pour une fonctionnalité de base (ex. : localisation refusée mais l'utilisateur veut utiliser la saisie vocale uniquement ; l'application peut toujours fonctionner sans localisation).
- Dans les paramètres de l'application où l'utilisateur peut voir l'état de chaque permission et la modifier si le système d'exploitation le permet.

### Règles métier
- Doit expliquer clairement pourquoi chaque permission est nécessaire avant de la demander (ex. : « Nous avons besoin de votre enregistrement vocal pour permettre aux utilisateurs qui préfèrent parler plutôt qu'écrire de décrire leur problème »).
- Doit fonctionner de manière dégradée lorsque une permission est refusée :
  - Sans localisation : utiliser la saisie manuelle du quartier ou de la ville pour le calcul de distance ; désactiver les fonctionnalités de géofencing et baser le début/fin d'intervention sur des mécanismes alternatifs (code PIN, confirmation manuelle).
  - Sans microphone : désactiver la saisie vocale et ne proposer que la saisie texte ; informer l'utilisateur que cette option n'est pas disponible.
  - Sans notifications push : l'application doit toujours fonctionner mais l'utilisateur devra l'ouvrir régulièrement pour vérifier les nouvelles missions, les paiements en attente, etc. Encourager l'utilisateur à activer les notifications dans les paramètres du système.
- Doit ne pas bloquer l'utilisation de l'application entière si une permission non critique est refusée (ex. : refuser le stockage externe ne doit pas empêcher l'envoi de demandes ou la réception de missions).
- Doit fournir un accès facile aux paramètres de permission depuis l'application (ex. : lien « Ouvrir les paramètres de localisation » qui redirige vers l'écran de permission du système d'exploitation).
- Doit respecter les choix de l'utilisateur : si une permission est refusée de manière définitive (choix « Ne plus demander »), ne pas redemander constamment mais offrir un moyen de rétablir la permission via les paramètres de l'application si l'utilisateur change d'avis.
- Doit journaliser les refus de permission pour comprendre les obstacles à l'adoption et améliorer les explications fournies.

## Paiement échoué
### Description
État indiquant que la tentative de paiement n'a pas abouti à une transaction réussie.

### Scénarios d'échec
- **Échec de paiement Mobile Money** :
  - Solde insuffisant sur le compte Mobile Money de l'utilisateur.
  - Numéro de compte Mobile Money incorrect ou non associé à l'utilisateur.
  - Problème technique chez l'opérateur (réseau, service indisponible).
  - Timeout de réponse du webhook de confirmation.
- **Échec de paiement espèces** :
  - Le client n'a pas confirmé avoir payé après un délai raisonnable.
  - Le professionnel n'a pas confirmé avoir reçu le paiement après que le client ait déclaré avoir payé.
  - Désaccord sur le montant payé entre le client et le professionnel.
  - Perte ou vol des espèces avant la confirmation mutuelle.

### Apparition
- Après sélection d'un mode de paiement Mobile Money et tentative d'initiation du paiement.
- Après expiration d'un délai d'attente sans confirmation de paiement (Mobile Money ou espèces).
- Après réception d'un webhook d'erreur de l'opérateur Mobile Money.
- Après expiration du délai de confirmation du paiement espèces sans réception des deux confirmations nécessaires.
- Lors de la tentative de remboursement d'un paiement déjà effectué (si évolution future).

### Règles métier
- Doit fournir un message clair indiquant la cause probable de l'échec et proposer des actions correctives.
- Exemples de messages :
  - « Le paiement n'a pas pu être effectué. Vérifiez votre solde Mobile Money ou réessayez. »
  - « Le paiement Mobile Money a échoué. Veuillez vérifier votre numéro ou réessayer plus tard. »
  - « Nous attendons toujours votre confirmation de paiement en espèces. »
  - « Il y a un désaccord sur le montant payé. Veuillez contacter le support pour résolution. »
- Doit permettre à l'utilisateur de réessayer immédiatement le même mode de paiement (bouton « Réessayer ») ou de choisir un autre mode de paiement disponible (ex. : passer de Mobile Money à espèces ou vice-versa).
- Doit limiter le nombre de tentatives consécutives pour éviter les frais répétés ou la frustration (ex. : maximum de 3 essais de paiement Mobile Money avant de suggérer fortement une autre méthode ou l'annulation de la mission).
- Doit journaliser les échecs de paiement avec suffisamment de détails pour permettre le réconcilation avec les opérateurs Mobile Money (ID de transaction, timestamp, code d'erreur retour).
- Doit préserver l'état de l'intervention avant l'échec de paiement : la mission reste en état « Paiement en attente » permettant à l'utilisateur de corriger et de réessayer sans perdre le suivi effectué.
- Doit proposer un moyen de contacter le support directement depuis l'écran d'erreur de paiement (bouton « Contacter le support »).
- Doit éviter de facturer deux fois le même paiement en cas de retry réussi après un premier échec apparente (idémpotence des appels de paiement).
- Doit, en cas d'échec répété, suggérer l'annulation de la mission avec remboursement éventuel si un paiement anticipé avait été effectué (non applicable dans le flux actuel où le paiement intervient après intervention).
- Doit clairement indiquer que l'échec de paiement n'annule pas l'intervention en cours : le professionnel peut toujours terminer le travail et attendre un paiement réussi plus tard.

---

# 12 Cas particuliers

## Annulation
L'annulation permet à l'une des parties de mettre fin à une mission avant son terme naturel. Elle doit être gérée de manière équitable, avec des règles claires sur les frais, les remboursements et les impacts sur la réputation. Les scénarios détaillés se trouvent dans la section 9 Règles Métier (voir partie Annulation). Pour rappel :

- **Annulation par le client avant début d'intervention** : aucun frais, professionnel notifié immédiatement.
- **Annulation par le professionnel avant début d'intervention** : possible frais léger, client proposé à recevoir une autre proposition ou annuler sans frais.
- **Annulation après début d'intervention mais avant fin déclarée** : nécessite une médiation éventuelle sur le travail réalisé et le paiement dû.
- **Annulation après paiement effectué mais avant évaluation** : le professionnel conserve le paiement pour le travail réalisé ; le client perd l'opportunité d'évaluer.

### Règles métier rapides
- Motif obligatoire pour toute annulation.
- Notification immédiate à l'autre partie.
- Gestion des paiements selon le mode (Mobile Money avec possibilité de remboursement via API, espèces en main propre).
- Impact sur le Score Relio défini dans l'algorithme de calcul (à préciser selon décision produit).
- Seuil de tolérance pour éviter les abus (ex. : max 3 annulations non justifiées par mois).
- Option de report plutôt que d'annulation totale (à définir selon évolutions futures).

## Refus
Le refus désigne le fait qu'un professionnel décline une mission qui lui a été proposée après qu'il ait accepté auparavant ? En réalité, le refus intervient généralement après réception de la notification de nouvelle mission mais avant acceptation. Dans le flux Relio, le professionnel reçoit une notification « Nouveau travail disponible » et peut choisir d'accepter ou de refuser.

### Scénarios de refus
- **Refus après réception de la notification** : le professionnel examine les détails de la mission (type de problème, quartier, distance, urgence) et décide de ne pas l'accepter.
- **Refus après acceptation mais avant début d'intervention** : moins courant, mais possible si le professionnel réalise soudainement qu'il ne peut pas intervenir (ex. : indisponibilité de dernière minute, double réservation). Ce cas est traité comme une annulation par le professionnel avant début d'intervention (voir ci-dessus).

### Règles métier du refus
- Le professionnel doit pouvoir refuser une mission sans pénalité immédiate, mais un taux de refus excessif peut entraîner une baisse de visibilité dans les recommandations (à définir dans l'algorithme de scoring ou de visibilité).
- Le refus doit être accompagné d'un motif obligatoire (liste déroulante : indisponible, trop loin, spécialité inadéquate, urgence personnelle, autre avec champ texte libre).
- Dès réception du refus, le backend doit proposer automatiquement la prochaine meilleure option au client (nouveau matching avec exclusion du professionnel ayant refusé) après un court délai ou immédiatement selon configuration.
- Le professionnel doit être notifié que sa réponse a été prise en compte (optionnel : remerciement pour sa réponse).
- Les refus doivent être journalisés pour permettre l'analyse des motifs récurrents (ex. : trop de refus pour « trop loin » pouvant indiquer un besoin d'ajuster les paramètres de distance ou d'élargir la zone d'intervention déclarée).

## Aucun prestataire
Le cas où le moteur d'attribution ne trouve aucun professionnel compatible pour répondre à une demande client.

### Causes possibles
- Aucun professionnel inscrit ne correspond au métier catégorisé par le moteur d'attribution (ex. : demande de plomberie mais aucun plombier enregistré dans la zone).
- Tous les professionnels compatibles sont actuellement indisponibles (mode hors ligne, pause active, ou en intervention sur une autre mission).
- Tous les professionnels compatibles se trouvent à une distance au-delà d'un seuil acceptable (ex. : >20 km) et le moteur considère cela comme incompatibilité (à définir selon décision produit).
- Les filtres de spécialité déclarée excluent tous les candidats (ex. : demande de chauffe-eau mais aucun plombier ne déclare spécialité « Chauffe-eau »).
- Problème de données : localisation du professionnel manquante ou erronée empêchant le calcul de distance.

### Règles métier
- Dès détermination qu'aucun professionnel compatible n'est disponible après recherche exhaustive, le backend doit retourner un résultat « aucun professionnel trouvé » au frontend.
- L'application Client doit afficher un message clair et amical : « Aucun professionnel disponible pour votre demande actuellement. »
- Proposer des actions constructives :
  - « Réessayer plus tard » : permet de relancer la recherche après un délai (ex. : 10, 30, 60 minutes) dans l'espoir que des professionnels deviennent disponibles.
  - « Modifier la description » : retour à l'écran d'accueil avec le problème pré-rempli afin que l'utilisateur puisse affiner ou corriger sa description (ex. : ajouter des détails qui pourraient changer la classification du métier).
  - « Contacter le support » : ouvre un formulaire de message à l'équipe Relio pour signaler le problème et obtenir de l'aide ou une escalade éventuelle.
- Doit journaliser l'événement « aucun professionnel trouvé » avec les caractéristiques de la demande (ID, texte exprimé, catégorie détectée, localisation) afin d'identifier les lacunes du réseau ou les besoins de recrutement dans certaines zones ou métiers.
- En cas de récurrence fréquente pour une certaine catégorie de problème ou une certaine zone, déclencher une alerte interne à l'équipe Relio pour envisager un recrutement ciblé ou une campagne d'acquisition de prestataires.
- Doit éviter de laisser l'utilisateur dans une impasse sans option de secours ; toujours fournir au moins une voie de recours.

## Prestataire hors ligne
État où un professionnel dont le profil est valide et actif apparaît comme indisponible pour recevoir de nouvelles missions en raison d'une connexion internet absente, d'une application fermée ou d'un mode hors ligne activé délibérément.

### Causes
- L'application Prestataire est fermée ou en arrière-plan sans traitement des notifications push (ex. : utilisateur a tué l'application).
- L'appareil n'a pas accès à internet (mode avion, hors couverture, données mobiles épuisées).
- Le professionnel a activé délibérément un mode « Ne pas déranger » ou « Hors ligne » dans l'application pour ne pas recevoir de nouvelles missions temporairement.
- Problème technique empêchant la réception des notifications push (token invalide, erreur de configuration).

### Règles métier
- Le backend doit considérer un professionnel comme indisponible pour le matching s'il n'a pas confirmé sa disponibilité via un heartbeat périodique ou s'il n'a pas répondu à une notification de mission dans un délai défini (ex. : 5 minutes après envoi de la notification).
- Le professionnel hors ligne ne doit pas recevoir de nouvelles missions tant que son statut de disponibilité est indisponible.
- Dès que le professionnel retrouve une connexion internet et que l'application est en mesure de traiter les notifications, son statut de disponibilité doit être mis à jour à « disponible » si aucune autre contrainte (pause active, intervention en cours) ne s'applique.
- Le système doit envoyer une notification de rappel « Nous attendons votre réponse sur la mission [ID] » après un délai raisonnable suivant l'envoi de la notification initiale, afin de relancer un professionnel éventuellement occupé ou ayant manqué la première notification.
- Doit journaliser les événements de perte de disponibilité (timeout de réponse) afin d'identifier les problèmes de couverture réseau ou les comportements d'utilisation de l'application.
- Doit proposer au professionnel un moyen de se déclarer explícitement « indisponible » ou « en pause » depuis son profil (ex. : bouton « Prendre une pause » qui désactive temporairement la réception de nouvelles missions). Cette pause doit être distinguée d'une indisponibilité due à une connexion perdue.
- En cas de prolongation de l'indisponibilité (ex. : professionnel hors ligne pendant plus de 24 heures), envisager une notification de rappel « Vous n'avez pas reçu de nouvelles missions depuis un certain temps. Vérifiez votre connexion internet et votre statut dans l'application. »
- Le professionnel hors ligne doit toujours pouvoir accéder à son historique, consulter son profil et mettre à jour ses informations disponibles (zone d'intervention, compétences) tant que l'application fonctionne en mode hors ligne avec les données en cache.
- Dès rétablissement de la connexion, toute modification effectuée hors ligne doit être synchronisée avec le backend (ex. : mise à jour de disponibilité après fin de pause).

---

# 13 Glossaire

## Termes métier du produit Relio

**Attribution**  
Action de désigner automatiquement un professionnel pour répondre à une demande client, à l'issue du processus de matching.

**Base de connaissance métier**  
Cartographie des problèmes qui fonctionne comme un dictionnaire métier : chaque problème identifié possède ses symptômes typiques, ses causes probables, les métiers associés et un niveau d'urgence par défaut.

**Bon de commande**  
Document généré automatiquement récapitulant les détails de l'intervention à réaliser (client, problème, adresse, professionnel assigné, estimatif de coût). Peut être utilisé comme référence sur place.

**Catégorie de problème**  
Classification haut niveau du problème exprimé par le client (ex. : Plomberie, Électricité, Climatisation, Automobile, Réparation électronique, Maison).

**Chronomètre d'intervention**  
Outil affichant le temps écoulé depuis le début confirmé de l'intervention jusqu'à sa fin ou jusqu'à l'instant présent.

**Client**  
Particulier urbain utilisant l'application Client pour exprimer un besoin de suivi d'intervention et de paiement.

**Comportement et professionnalisme**  
Critère d'évaluation relatif à la ponctualité, la courtoisie, la communication et le respect du lieu d'intervention.

**Compétence**  
Critère du Score Relio mesurant l'adéquation du professionnel avec le problème déclaré (métier, spécialités, expérience, qualifications).

**Cycle de prestation**  
Ensemble des sept étapes couvertes par le MVP : expression du besoin, compréhension, attribution, intervention, paiement, évaluation.

**Demande**  
Expression du besoin faite par un client via l'application Client (texte ou vocal) visant à obtenir une intervention professionnelle.

**Distance**  
Critère du Score Relio mesurant la proximité géographique entre le client et le professionnel (en mètres ou kilomètres).

**Disponibilité**  
Critère du Score Relio mesurant la capacité du professionnel à accepter une nouvelle mission à l'instant considéré (en fonction de son statut actif/inactif, de ses horaires déclarés et de ses missions en cours).

**Évaluation**  
Processus laissé par le client après une intervention terminée pour noter le professionnel sur trois critères (qualité, rapidité, comportement) et laisser un commentaire optionnel.

**Historique**  
Critère du Score Relio mesurant le volume et la régularité des interventions réalisées par le professionnel (nombre total de missions, fréquence récente, évaluations reçues).

**ID de mission**  
Identifiant unique attribué à chaque demande lorsqu'elle est reçue par le système, permettant de suivre son parcours à travers toutes les étapes.

**Intervention**  
Réalisation concrète du travail convenu sur le site du client par le professionnel agréé.

**Matching**  
Processus de mise en correspondance entre une demande client et les professionnels compatibles, en trois étapes (section 7.7 du cahier des charges) : compatibilité, contraintes, classement.

**Moteur Relio**  
Composant central du produit chargé de comprendre le besoin exprimé et d'attribuer le professionnel le plus pertinent.

**MVP**  
Minimum Viable Product : version initiale du produit, suffisante pour valider le modèle auprès d'utilisateurs réels.

**Note moyenne**  
Moyenne arithmétique des étoiles reçues dans les évaluations clients (sur une échelle de 1 à 5).

**Notification push**  
Message envoyé par le serveur et affiché par le système d'exploitation du smartphone même lorsque l'application est en arrière-plan ou fermée.

**Professionnel**  
Utilisateur dont le profil a été validé par l'équipe Relio et qui peut recevoir, accepter, réaliser des missions et suivre son historique (artisan, technicien, indépendant ou petite entreprise de services).

**Prix estimatif**  
Montant affiché avant l'intervention, basé sur la catégorie de problème et la région, susceptible d'être ajusté après intervention si nécessaire.

**Périphérie de service**  
Zone géographique déclarée par le professionnel comme étant celle dans laquelle il est disposé à intervenir (quartiers, villes ou rayon autour d'un point central).

**Qualité du travail**  
Critère d'évaluation relatif à la résolution du problème, la propreté du chantier, la conformité aux attentes et la durabilité de la réparation.

**QR code**  
Code à deux dimensions utilisé dans le MVP pour vérifier matériellement le début et la fin d'intervention (scan du QR code client par le professionnel pour démarrer, scan du QR code professionnel par le client pour confirmer la réception du paiement).

**Réactivité**  
Mesure du délai entre une action utilisateur et la réponse du système (ex. : temps entre la confirmation d'attribution et la réception de la notification par le professionnel).

**Réputation**  
Critère du Score Relio mesurant la satisfaction moyenne exprimée par les clients à travers les évaluations reçues.

**Score Relio**  
Note dynamique attribuée à chaque professionnel compatible avec une demande, combinant compétence (35%), disponibilité (20%), distance (20%), réputation (15%) et historique (10%).

**Service**  
Type d'intervention offert par le professionnel (ex. : réparation de chauffe-eau, installation de prise électrique, débouchage de canalisation).

**Session**  
Période d'utilisation continue de l'application par un utilisateur, du lancement à la fermeture ou à l'inactivité prolongée.

**Spécialité**  
Sous-domaine ou expertise précise au sein d'un métier déclaré (ex. : « Plombier – Chauffe-eau », « Électricien – Domotique »).

**Statut de la demande**  
État actuel d'une demande dans le cycle de prestation (ex. : reçue, en analyse, professionnel trouvé, attribuée, accepté par professionnel, intervention en cours, terminée, paiement en attente, paiement effectué, évaluation en attente, évaluée, annulée).

**Statut du professionnel**  
État d'un professionnel concernant sa capacité à recevoir de nouvelles missions (ex. : actif, en pause, indisponible, suspendu, en attente de vérification).

**Taux de réussite**  
Pourcentage d'interventions aboutissant à une fin clairement définie (paiement confirmé et évaluation soumise) parmi les interventions terminées.

**Telechargement de reçu**  
Action permettant à l'utilisateur de sauvegarder ou partager le reçu numérique de paiement généré par le système.

**Timing d'attribution**  
Durée moyenne entre la réception d'une demande par le système et la confirmation d'un professionnel par le client (en minutes).

**Token de notification**  
Identifiant unique permettant au backend d'envoyer une notification push vers une application mobile spécifique via un service de notifications (ex. : Firebase Cloud Messaging).

**Utilisateur**  
Personne interagissant avec l'application Relio, pouvant être un client, un professionnel ou un administrateur selon le contexte.

**Zone d'intervention**  
Zone géographique déclarée par le professionnel comme étant celle dans laquelle il est disposé à intervenir (quartiers, villes ou rayon autour d'un point central).

**Zone de couverture**  
Zone géographique totale dans laquelle le moteur d'attribution recherche des professionnels compatibles pour une demande donnée (souvent basée sur la localisation du client et un rayon de recherche maximal).


---

