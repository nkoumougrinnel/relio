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
