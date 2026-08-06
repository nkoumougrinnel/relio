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
