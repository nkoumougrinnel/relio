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
