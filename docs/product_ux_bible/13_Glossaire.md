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

