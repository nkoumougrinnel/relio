# 8 Back-office Admin

## C1. Tableau de contrôle général
### Objectif
Fournir une vue d'ensemble des indicateurs clés de performance pour superviser la santé du système et prendre des décisions opérationnelles.

### Contenu
- Écran principal composé de plusieurs widgets pouvant être réorganisés selon préférence (optionnel) ou disposés en grille fixe.
- Chaque widget affiche un indicateur avec valeur actuelle, tendance (flèche haut/bas ou couleur) et comparaison avec une période précédente (ex. : jour précédent, semaine dernière).
- Indicateurs clés affichés :
  - **Demandes reçues** : nombre total de demandes exprimées par les clients depuis le lancement ou sur la période sélectionnée.
  - **Demandes traitées** : nombre de demandes ayant reçu une attribution professionnelle (statut « professionnel trouvé » ou supérieur).
  - **Interventions terminées** : nombre d'interventions entièrement réalisées (du début à la fin, incluant paiement et évaluation selon définition).
  - **Chiffre d'affaires** : montant total des paiements effectués (estimation basée sur les prix moyens par catégorie ou montant réel si disponible).
  - **Satisfaction moyenne** : note moyenne sur 5 basée sur les évaluations clients reçues.
  - **Temps moyen d'attribution** : durée moyenne entre la réception d'une demande et la confirmation d'un professionnel par le client (en minutes).
  - **Taux de réussite** : pourcentage d'interventions terminées sans annulation côté client ou professionnel (interventions aboutissant à une évaluation ou au moins à une fin confirmée).
  - **Nombre de prestataires actifs** : professionnels ayant réalisé au moins une intervention sur la période sélectionnée ou ayant accepté une mission récemment.
  - **Nombre de clients actifs** : clients ayant exprimé au moins une demande sur la période sélectionnée.
- Chaque widget peut être cliqué pour accéder à la section détaillée correspondante (ex. : cliquer sur « Satisfaction moyenne » ouvre l'analyze de performance avec filtre sur les notes).

### Navigation
- Accessible depuis le menu latéral du Dashboard Administrateur (icône de tableau de bord ou premier élément).
- Depuis le tableau de contrôle, cliquer sur un widget ou son titre redirige vers la section détaillée associée.
- Bouton de rafraîchissement manuel (icône de rotation) permettant de mettre à jour immédiatement toutes les données (utile en cas de suspicion de retard de mise à jour).
- Option d'auto-refresh : intervalle configurable (ex. : 30 secondes, 1 minute, 5 minutes) avec indicateur de dernière mise à jour.

### États
- Chargement des données au démarrage ou lors du rafraîchissement (indicateur d'activité global ou par widget).
- Succès : affichage complet de tous les widgets avec valeurs à jour.
- Erreur de connexion backend : affichage d'un message d'erreur générique avec bouton « Réessayer » pour chaque widget affecté ou globale.
- Données partielles : si certaines métriques ne sont pas disponibles (ex. : chiffre d'affaires en attente d'implémentation du suivi paiement), affichage d'un message « Indicator not yet implemented » avec lien vers la feuille de route.

### Règles métier
- Les indicateurs doivent être calculés à partir des données stockées dans la base de données PostgreSQL via des requêtes agrégées optimisées.
- Le temps moyen d'attribution prend en compte uniquement les demandes qui ont abouti à une attribution confirmée (exclut les demandes encore en analyse ou celles sans professionnel trouvé).
- Le taux de réussite est défini comme (interventions terminées avec paiement confirmé et évaluation soumise) / (interventions terminées) ; des variantes peuvent être suivies selon définition métier.
- Le chiffre d'affaires peut être estimé en attendant l'implémentation détaillée du suivi paiement : somme des prix estimatifs des interventions terminées.
- Les prestataires actifs sont définis comme ceux ayant au moins une mission acceptée sur la période sélectionnée (quel que soit le statut final).
- Les clients actifs sont définis comme ceux ayant au moins une demande exprimée sur la période sélectionnée.

## C2. Gestion des demandes
### Objectif
Vue reliant chaque demande au professionnel proposé et à son statut. L'administrateur peut modifier une attribution, contacter le client ou contacter le prestataire — c'est le filet de sécurité humain du MVP.

### Contenu
- Écran principal avec liste filtrable et triable des demandes.
- Barre de recherche supérieure permettant de filtrer par :
  - ID de demande
  - Texte exprimé par le client (recherche plein texte sur le champ « problème exprimé »)
  - Quartier ou localisation du client
  - Statut de la demande (liste déroulante : reçue, en analyse, professionnel trouvé, attribuée, accepté par professionnel, intervention en cours, terminée, paiement en attente, paiement effectué, évaluation en attente, évaluée, annulée)
  - Plage de dates (date de réception)
  - Professionnel proposé (nom ou ID)
  - Client (nom ou ID)
- Colonnes de la liste (personnalisables selon préférence ou ordre fixe) :
  - ID
  - Date/heure de réception
  - Client (prénom + première lettre du nom ou avatar)
  - Problème exprimé (texte tronqué, avec tooltip complet au survol)
  - Quartier / localisation
  - Statut (texte + icône couleur)
  - Professionnel proposé (nom + métier, avec icône de vérification si applicable)
  - Score Relio du professionnel proposé (le cas échéant)
  - Heure d'attribution (si disponible)
  - Actions (icônes : voir détail, modifier attribution, contacter client, contacter prestataire)
- Chaque ligne de liste représente une demande unique.
- Bouton « Exporter sélection » ou « Exporter tout » pour télécharger un CSV des données affichées.

### Vue détail d'une demande (accessible en cliquant sur une ligne ou une icône « voir détail »)
- En-tête : ID de demande, date/heure de réception, statut actuel.
- Section Client :
  - Photo du client (initiale ou avatar flouté)
  - Prénom et première lettre du nom
  - Numéro de téléphone (masqué partiellement pour privacité, ex. : +237 6XX XXX XXX)
  - Quartier ou localité
  - Localisation précise (si disponible via GPS, affichée sur une carte réduite)
- Section Problème exprimé :
  - Texte complet tel que saisi par le client (texte ou transcription vocale)
  - Indicateur de mode de saisie (icône texte ou vocal)
  - Horodatage de la réception
- Section Compréhension moteur (si disponible) :
  - Objet détecté
  - Symptôme principal
  - Symptôme secondaire
  - Intention déduite
  - Urgence estimée
  - Niveau de confiance du moteur (optionnel)
- Section Classification du besoin :
  - Catégorie de métier associée (ex. : Plomberie)
  - Sous-catégorie ou spécialité éventuelle
  - Niveau d'urgence par défaut selon la base de connaissance métier
- Section Matching professionnel :
  - Liste des professionnels compatibles trouvés par le moteur (triés par score décroissant)
  - Pour chaque professionnel : photo, nom, métier, note moyenne, distance, disponibilité, Score Relio
  - Indication du professionnel actuellement proposé (highlight ou bouton « Sélectionner ce professionnel »)
- Section Historique des modifications d'attribution :
  - Tableau montrant chaque changement de professionnel proposé avec horodatage, ancien professionnel, nouveau professionnel, motif (ex. : « Modification admin », « Refus professionnel », « Client a demandé autre proposition »)
  - Nom de l'administrateur ayant effectué la modification (le cas échéant)
- Section Intervention (si statut ≥ accepté par professionnel) :
  - Heure d'acceptation par le professionnel
  - Heure de début d'intervention (si disponible via mécanisme de début)
  - Heure de fin d'intervention (si disponible)
  - Statut de l'intervention (en cours, terminée, paiement en attente, etc.)
- Section Paiement (si applicable) :
  - Mode de paiement choisi (Mobile Money / espèces)
  - Montant estimatif
  - Statut du paiement (en attente, effectué, échec)
  - Référence de transaction Mobile Money (le cas échéant)
- Section Évaluation (si applicable) :
  - Note moyenne reçue (étoiles)
  - Nombre d'avis
  - Extrait de commentaire le plus récent (optionnel)
- Boutons d'action en bas :
  - « Modifier l'attribution » : ouvre un modal permettant de sélectionner un autre professionnel parmi la liste des compatibles ou de rechercher un nouveau professionnel.
  - « Contacter le client » : ouvre un formulaire de message pré-rempli avec les coordonnées du client (numéro de téléphone) ; l'envoi se fait via SMS ou notification interne selon préférence.
  - « Contacter le prestataire » : ouvre un formulaire de message pré-rempli avec les coordonnées du prestataire (numéro de téléphone) ; l'envoi se fait via SMS ou notification interne.
  - « Marquer comme annulée » : ouvre un modal permettant de choisir un motif d'annulation (client, professionnel, système, autre) et d'ajouter des commentaires.
  - « Rafraîchir les données » : recharge la vue détail depuis le backend pour obtenir les dernières mises à jour.

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Gestion des demandes ».
- Depuis la liste des demandes, cliquer sur une ligne ouvre la vue détail.
- Depuis la vue détail, les boutons d'action ouvrent des modaux ou des panneaux latéraux selon la complexité.
- Bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir à la liste des demandes avec préservation des filtres appliqués.
- Depuis la vue détail, après avoir effectué une action (ex. : modifier attribution), l'écran se rafraîchit automatiquement pour montrer le nouvel état.

### États
- Chargement de la liste lors de l'accès à la section ou lors de l'application de filtres (indicateur d'activité en haut de la liste).
- Succès : affichage de la liste avec toutes les colonnes demandées.
- Erreur de connexion backend : affichage d'un message d'erreur avec bouton « Réessayer » pour recharger la liste.
- Aucun résultat : affichage d'un message « Aucune demande ne correspond aux critères sélectionnés » avec bouton « Effacer les filtres ».
- État de chargement de la vue détail : indicateur d'activité pendant la récupération des données détaillées.
- État d'erreur détail : message d'erreur avec bouton « Retour à la liste ».

### Règles métier
- L'administrateur doit pouvoir modifier une attribution à tout moment avant que l'intervention ne soit marquée comme terminée (ou selon règle définie : avant paiement confirmé). Après certaine étape (ex. : début d'intervention), les modifications peuvent être restreintes pour éviter la confusion.
- Toute modification d'attribution doit être enregistrée avec horodatage, ancien professionnel, nouveau professionnel, motif obligatoire et identité de l'administrateur ayant effectué la modification.
- Les fonctions de contacter le client et le prestataire doivent utiliser les numéros de téléphone stockés dans la base de données ; l'envoi peut se faire via SMS gateway (Twilio, Afrique's Talking) ou via notifications push si les utilisateurs ont l'application en arrière-plan.
- Le système doit prévenir les modifications en boucle : si un administrateur modifie une attribution, le professionnel précédemment proposé doit être notifié (optionnel) uniquement si cela est pertinent (ex. : il avait déjà accepté la mission).
- La liste des professionnels compatibles doit être fournie par le moteur d'attribution sur demande du backend (ou calculée en temps réel à partir des données de profil et de la base de connaissance métier).
- Les statuts de demande doivent suivre un workflow défini (voir diagramme d'états dans la section 9 Règles Métier ou le suivi client A5). Les transitions autorisées doivent être appliquées par le backend pour empêcher les états incohérents.
- L'export CSV doit inclure toutes les colonnes visibles ainsi que les colonnes cachées éventuelles (ID, timestamps complets, etc.) pour permettre des analyses externes.

## C3. Gestion des prestataires
### Objectif
Fonctions : ajout, validation, suspension, modification des profils professionnels.

### Contenu
- Écran principal avec liste filtrable et triable des prestataires.
- Barre de recherche supérieure permettant de filtrer par :
  - Nom complet
  - Numéro de téléphone
  - Métier
  - Zone d'intervention
  - Statut (liste déroulante : en attente de vérification, validé, suspendu, rejeté)
  - Plage de dates (date d'inscription)
  - Score Relio minimum
- Colonnes de la liste :
  - ID
  - Photo (miniature ou initiale)
  - Nom complet
  - Métier
  - Zone d'intervention
  - Note moyenne (étoiles)
  - Nombre de missions réalisées
  - Score Relio
  - Statut (texte + icône couleur)
  - Actions (icônes : voir détail, valider/refuser, suspendre/réactiver, modifier profil, contacter)
- Chaque ligne de liste représente un prestataire unique.
- Bouton « Exporter sélection » ou « Exporter tout » pour télécharger un CSV des données affichées.

### Vue détail d'un prestataire (accessible en cliquant sur une ligne ou une icône « voir détail »)
- En-tête : photo du professionnel, nom complet, métier.
- Section Informations de base :
  - Numéro de téléphone
  - Adresse e-mail professionnelle (optionnel)
  - Zone d'intervention actuelle
  - Date d'inscription
  - Statut actuel (en attente de vérification, validé, suspendu, rejeté)
  - Badge de vérification (si statut validé) : icône coche verte ou label « Vérifié »
- Section Score Relio détaillé :
  - Score global sur 100
  - Répartition des cinq critères (compétence, disponibilité, distance, réputation, historique) sous forme de barres horizontales avec pourcentages
  - Texte explicatif de l'impact de chaque critère sur les recommandations
- Section Notes et avis :
  - Note moyenne sur 5 sous forme d'étoiles avec nombre d'avis entre parenthèses
  - Bouton « Voir les avis » menant à une liste paginée des commentaires laissés par les clients (avec possibilité de trier par date, note, etc.)
  - Indicateur de tendance récente (ex. : dernière note moyenne sur les 10 dernières évaluations)
- Section Historique d'interventions :
  - Nombre total de missions réalisées
  - Nombre de missions en cours (optionnel)
  - Dernière mission réalisée (date, texte court du problème, résultat)
  - Liste paginée des missions avec possibilité de filtrer par statut, date, montant gagné
  - Chaque mission affichée : date, problème du client, statut final, note reçue, montant gagné
- Section Documents justificatifs :
  - Liste des documents soumis lors de la demande de devenir prestataire (pièce d'identité, justificatif de qualification, références)
  - Statut de chaque document (validé, en attente, rejeté, manquants)
  - Aperçu miniature de chaque document (si image) avec bouton pour voir en plein écran
  - Bouton « Demander de nouveaux documents » permettant à l'administrateur de notifier le prestataire de fournir des documents complémentaires ou mis à jour.
- Section Disponibilités et compétences :
  - Tableau des disponibilités hebdomadaires (jours de la semaine avec créneaux horaires : matin, après-midi, soir)
  - Liste des spécialités déclarées (ex. : « Plombier – Chauffe-eau », « Électricien – Domotique »)
  - Zone géographique précise desservie (liste de quartiers ou rayon autour d'un point central)
- Bouton « Modifier le profil » en bas d'écran permettant de mettre à jour les informations modifiables (zone d'intervention, disponibilités, compétences, coordonnées, etc.).
- Bouton « Contacter le prestataire » en bas d'écran ouvrant un formulaire de message pré-rempli.

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Gestion des prestataires ».
- Depuis la liste des prestataires, cliquer sur une ligne ouvre la vue détail.
- Depuis la vue détail, les boutons d'action ouvrent des modaux ou des panneaux latéraux selon la complexité.
- Bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir à la liste des prestataires avec préservation des filtres appliqués.
- Depuis la vue détail, après avoir effectué une action (ex. : modifier profil, suspendre), l'écran se rafraîchit automatiquement pour montrer le nouvel état.

### États
- Chargement de la liste lors de l'accès à la section ou lors de l'application de filtres (indicateur d'activité en haut de la liste).
- Succès : affichage de la liste avec toutes les colonnes demandées.
- Erreur de connexion backend : affichage d'un message d'erreur avec bouton « Réessayer » pour recharger la liste.
- Aucun résultat : affichage d'un message « Aucun prestataire ne correspond aux critères sélectionnés » avec bouton « Effacer les filtres ».
- État de chargement de la vue détail : indicateur d'activité pendant la récupération des données détaillées.
- État d'erreur détail : message d'erreur avec bouton « Retour à la liste ».

### Règles métier
- L'ajout de nouveaux prestataires se fait via le flux d'inscription côté professionnel (B1) suivi de la vérification manuelle (B2). L'administrateur ne crée pas directement de profils mais valide ceux soumis.
- La validation d'un profil nécessite la vérification de :
  - Pièce d'identité valide (CIN, passeport) avec photo clairement identifiable
  - Justificatif de qualification correspondant au métier déclaré (certificat de formation, carte de professionnel, lettre de référence d'employeur précédent)
  - Cohérence entre la zone d'intervention déclarée et la réalité (vérification éventuelle via appel téléphonique ou demande de preuve de résidence)
  - Absent d'antécédents de fraude ou de comportement signalé dans d'autres plateformes (optionnel, selon capacité de l'équipe)
- La suspension d'un profil peut être déclenchée par :
  - Taux d'annulation élevé côté professionnel (ex. : >30% des missions acceptées annulées par le professionnel)
  - Faible note moyenne (<3.0 sur 5) sur un nombre significatif d'évaluations (ex. : <10 évaluations)
  - Signalements répétés de comportement inapproprié (non professionnalisme, retard excessif, demande de paiement supplémentaire non justifié)
  - Non-respect des disponibilités déclarées (professionnel indiqué comme disponible mais ne répond pas aux missions)
  - Fraude suspectée (faux documents, usurpation d'identité)
- La suspension doit être accompagnée d'un motif clair et d'une possibilité de levée de suspension après amélioration démontrée (ex. : suivre un stage, obtenir de nouvelles références, maintenir un bon comportement pendant une période d'essai).
- La réactivation d'un profil suspendu nécessite une revue par l'administrateur (peut être automatisée après certaines conditions : taux d'annulation réduit pendant 2 semaines, note moyenne améliorée, etc.).
- La modification du profil par l'administrateur doit être réservée aux cas exceptionnels (correction d'erreur de saisie, mise à jour de zone d'intervention après déménagement vérifié, ajout de spécialités vérifiées). Toute modification doit être enregistrée avec horodatage et motif.
- Les fonctions de contacter le prestataire utilisent le numéro de téléphone stocké dans la base de données ; l'envoi peut se faire via SMS gateway ou notification push.
- L'historique des interventions doit être conservé conformément aux politiques de rétention des données (ex. : 5 ans pour les données professionnelles, anonymisation après cette période).
- Les documents justificatifs doivent être stockés de manière sécurisée (chiffrement au repos) et accessibles uniquement aux administrateurs autorisés.
- Le Score Relio d'un prestataire suspendu doit être gelé ou continuer à être calculé ? À définir. Recommandation : geler le score pendant la suspension pour éviter qu'il ne profite d'améliorations pendant l'inactivité, mais continuer à mettre à jour l'historique si des missions sont quand même attribuées (éviter).
- Les prestataires rejetés peuvent soumettre à nouveau après correction des motifs de rejet ; le compte reste le même (même numéro de téléphone) ou un nouveau compte peut être créé selon politique (recommandation : permettre une nouvelle soumission avec le même compte après correction).

## C4. Analyse de performance
### Objectif
Fournir des indicateurs détaillés et des visualisations pour comprendre les tendances, identifier les points d'amélioration et soutenir la prise de décision stratégique.

### Contenu
- Écran principal avec sélection de période (liste déroulante : dernières 24h, 7 derniers jours, 30 derniers jours, 3 derniers mois, personnalisée) et bouton « Appliquer ».
- Série de graphiques pouvant être affichés en onglets ou en sections déroulantes :
  - **Onglet 1 : Volume et flux**
    - Courbe du nombre de demandes reçues par jour (ligne)
    - Courbe du nombre de demandes traitées par jour (ligne)
    - Courbe du nombre d'interventions terminées par jour (ligne)
    - Diagramme en barres montrant la répartition des demandes reçues par catégorie de problème (Plomberie, Électricité, Climatisation, Automobile, Réparation électronique, Maison)
    - Diagramme en barres montrant la répartition des interventions terminées par catégorie de problème
  - **Onglet 2 : Performance d'attribution**
    - Courbe du temps moyen d'attribution par jour (ligne) avec objectif <30min en référence
    - Courbe du taux de réussite par jour (ligne) avec objectif >80% en référence
    - Diagramme de dispersion montrant la relation entre distance du professionnel et temps d'attribution (optionnel)
    - Heatmap montrant la densité des demandes reçues par quartier (matrice ou carte thermique simplifiée)
  - **Onglet 3 : Satisfaction et qualité**
    - Courbe de la satisfaction moyenne par jour (ligne) avec objectif >4/5 en référence
    - Courbe du pourcentage d'évaluations 5 étoiles par jour (ligne)
    - Courbe du pourcentage d'évaluations 1 étoile par jour (ligne)
    - Diagramme en barres montrant la répartition des notes par critère (qualité, rapidité, comportement) sur la période sélectionnée
    - Nuage de points montrant la corrélation entre temps d'intervention et note de qualité (optionnel)
  - **Onglet 4 : Réseau de prestataires**
    - Courbe du nombre de prestataires actifs par jour (ligne)
    - Courbe du nombre de nouveaux prestataires inscrits par jour (ligne)
    - Diagramme en camembert montrant la répartition des prestataires par métier sur la période sélectionnée
    - Diagramme en barres montrant la répartition des prestataires par zone d'intervention (quartiers ou villes)
    - Courbe du Score Relio moyen des prestataires actifs par jour (ligne)
    - Diagramme de dispersion montrant la relation entre expérience (années) et note moyenne (optionnel)
  - **Onglet 5 : Financière (optionnel, selon évolutions futures)**
    - Courbe du chiffre d'affaires estimé par jour (ligne)
    - Courbe du montant moyen par intervention par jour (ligne)
    - Diagramme en barres montrant la répartition des revenus par catégorie de problème
    - Tableau des top 10 clients par montant dépensé (optionnel)
    - Tableau des top 10 prestataires par montant gagné (optionnel)
- Chaque graphique dispose de :
  - Titre clair
  - Axes légendés avec unités
  - Légende si plusieurs séries
  - Tooltip affichant les valeurs précises au survol ou au toucher (sur mobile)
  - Bouton « Voir en plein écran » pour afficher le graphique seul avec possibilité de zoomer/panner
  - Bouton « Télécharger l'image » (PNG ou SVG) pour utilisation dans des rapports
  - Bouton « Exporter les données sous-jacentes » (CSV) pour analyse externe

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Analyse de performance ».
- Depuis l'écran d'analyse, choisir la période désirée et cliquer sur « Appliquer » pour rafraîchir tous les graphiques.
- Depuis un onglet de graphique, cliquer sur un graphique ouvre la vue détaillée de ce graphique (plein écran ou panneaux latéraux).
- Depuis la vue détaillée d'un graphique, les boutons d'action permettent de télécharger, exporter ou revenir à la vue d'ensemble.
- Bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir à l'écran de sélection de période avec préservation du choix de période.
- Depuis l'écran d'analyse, bouton « Restaurer les paramètres par défaut » pour remettre la période sur « Derniers 7 jours » et décocher toutes les options avancées.

### États
- Chargement des données lors de l'application de filtres ou du passage à un nouvel onglet (indicateur d'activité global ou par onglet).
- Succès : affichage complet de tous les graphiques demandés avec données à jour.
- Erreur de connexion backend : affichage d'un message d'erreur avec bouton « Réessayer » pour recharger les données nécessaires au graphique affecté.
- Données insuffisantes : si certaines métriques ne sont pas disponibles pour la période sélectionnée (ex. : pas d'évaluations encore), affichage d'un message « Données insuffisantes pour ce graphique » avec suggestion d'élargir la période.
- État de rendu du graphique : indicateur de chargement pendant la génération du graphique côté client (si réalisé en JavaScript) ou simple affichage immédiat si précalculé côté backend.

### Règles métier
- Les données utilisées pour les graphiques doivent être extraites de la base de données via des requêtes agrégées optimisées ; des vues matérialisées peuvent être créées pour améliorer les performances sur les métriques fréquemment utilisées.
- Le temps moyen d'attribution est calculé comme la différence entre le timestamp de réception de la demande et le timestamp de confirmation d'attribution par le client (ou timestamp d'acceptation par le professionnel selon définition métier). Seules les demandes ayant abouti à une attribution confirmée sont prises en compte.
- Le taux de réussite est défini comme le pourcentage d'interventions aboutissant à une fin clairement définie (paiement confirmé et évaluation soumise) parmi les interventions terminées. Des variantes peuvent être suivies : succès basé uniquement sur la fin d'intervention confirmée (sans paiement/évaluation), succès basé sur l'absence d'annulation, etc.
- La satisfaction moyenne est la moyenne arithmétique des notes sur 5 reçues dans les évaluations client.
- La répartition par catégorie de problème doit utiliser la même taxonomie que celle utilisée par le moteur d'attribution pour la classification du besoin (voir section 7.4 Les quatre dimensions analysées).
- La répartition géographique doit utiliser le quartier ou la ville déclarée par le client lors de l'inscription ou mise à jour du profil ; si la localisation GPS est disponible, elle peut être utilisée pour un maillage plus fin.
- Le nombre de prestataires actifs est défini comme ceux ayant au moins une mission acceptée sur la période sélectionnée (quel que soit le statut final). Une variante peut considérer uniquement ceux ayant terminé une intervention avec paiement confirmé.
- Le Score Relio moyen des prestataires actifs doit être calculé uniquement sur les prestataires ayant au moins une évaluation récente (pour éviter de biaiser la moyenne avec des profils neufs n'ayant pas encore de score établi).
- Les graphiques doivent être conçus pour être lisibles sur des écrans de taille moyenne à grande (minimum 1024px largeur) ; sur mobile, une version condensée peut être envisagée (onglets déroulants ou graphiques simplifiés).
- Les couleurs utilisées dans les graphiques doivent respecter la charte d'identité visuelle (bleu pour l'information, jaune pour l'action/énergie, blanc pour la simplicité) afin de maintenir une cohérence visuelle avec le reste de l'application.

## Configuration du Dashboard Administrateur (optionnel)
### Objectif
Permettre à l'équipe Relio de personnaliser certains paramètres du dashboard selon ses besoins opérationnels sans nécessiter de déploiement de code.

### Contenu
- Écran accessible depuis le menu latéral sous « Paramètres » ou une icône d'engrenage.
- Sections de paramètres possibles :
  - **Général** :
    - Nom de l'entreprise affiché dans l'en-tête
    - Logo personnalisé (téléversement d'image)
    - Fusion horaire par défaut (ex. : UTC+1)
    - Langue de l'interface (français, anglais)
  - **Alertes et notifications** :
    - Seuil d'alerte pour temps moyen d'attribution (ex. : >45min déclenche une notification)
    - Seuil d'alerte pour taux de réussite (ex. : <70% déclenche une notification)
    - Seuil d'alerte pour satisfaction moyenne (ex. : <3.5 déclenche une notification)
    - Canal de notification (email, SMS, notification interne du dashboard)
    - Fréquence de relevé des alertes (ex. : toutes les 5 minutes)
  - **Périodes par défaut** :
    - Liste des périodes prédéfinies pour l'analyse de performance (ex. : dernières 24h, 7 derniers jours, 30 derniers jours)
    - Possibilité d'ajouter des périodes personnalisées
  - **Gestion des utilisateurs du dashboard** :
    - Liste des administrateurs connectés avec rôles (super administrateur, analyste, opérateur)
    - Bouton « Inviter un nouvel administrateur » (envoie un lien d'inscription par email)
    - Gestion des rôles et permissions (ex. : seul un super administrateur peut suspendre un prestataire)
  - **Intégrations externes** :
    - Clés API pour services de notification (Twilio, Firebase Cloud Messaging)
    - Clés API pour services de paiement mobile money (si intégration directe)
    - URL de webhook pour réception d'événements externes (optionnel)
- Chaque paramètre dispose d'une description courte, d'une valeur actuelle et d'un bouton « Modifier » ou « Réinitialiser à la valeur par défaut ».

### Navigation
- Depuis le menu latéral du Dashboard Administrateur, sélectionner « Paramètres ».
- Depuis l'écran de paramètres, cliquer sur une section pour la développer ou directement sur un paramètre pour le modifier.
- Depuis un paramètre modifié, bouton « Enregistrer les changements » pour appliquer les nouvelles valeurs.
- Bouton « Réinitialiser tous les paramètres » pour revenir aux valeurs définies par défaut lors de l'installation.
- Depuis l'écran de paramètres, bouton de retour matériel/gestuel ou icône de flèche retour : permet de revenir au menu latéral principal.

### États
- Chargement des paramètres actuels depuis la base de données ou un fichier de configuration (indicateur d'activité).
- Succès : affichage complet des sections avec valeurs à jour.
- Erreur de sauvegarde : si la sauvegarde des nouveaux paramètres échoue, affichage d'un message d'erreur avec bouton « Réessayer ».
- Retour aux valeurs par défaut : confirmation demandée avant de réinitialiser tous les paramètres afin d'éviter les pertes accidentelles.

### Règles métier
- Les paramètres modifiés doivent être persistés dans la base de données ou un fichier de configuration dédié afin de survivre aux redémarrages du serveur.
- Les changements de paramètres qui affectent le fonctionnement du moteur d'attribution (ex. : poids des critères du Score Relio) doivent être appliqués avec prudence et idéalement déployés pendant une période de faible activité pour éviter les perturbations en cours.
- Les seuils d'alerte doivent être définis en concertation avec l'équipe produit et technique afin de refléter les objectifs opérationnels du MVP.
- La gestion des utilisateurs du dashboard doit respecter le principe du moindre privilège : chaque administrateur ne doit avoir que les permissions nécessaires à ses responsabilités.
- Les intégrations externes doivent être sécurisées (stockage des clés API en variables d'environnement ou gestionnaire de secrets) et faire l'objet de tests préalables en environnement de staging avant déploiement en production.
