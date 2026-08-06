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
