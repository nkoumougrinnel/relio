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
