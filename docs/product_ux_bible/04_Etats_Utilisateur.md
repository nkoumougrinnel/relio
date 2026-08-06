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
