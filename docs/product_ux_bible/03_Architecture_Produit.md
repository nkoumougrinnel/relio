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
