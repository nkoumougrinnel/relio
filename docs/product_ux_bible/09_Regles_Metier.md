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
