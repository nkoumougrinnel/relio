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
