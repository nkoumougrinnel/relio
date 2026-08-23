import {
  InterventionJournal,
  MissionClient,
  MissionOffer,
  MissionOpportunity,
  MissionStatus,
  MissionSummary,
  MissionTrip,
  OngoingMission,
  ProviderCompletedActivity,
  ProviderDailySummary,
  TimelineStep,
} from '../types';

const BILL_PHOTO_URI =
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop';

const MISSIONS: MissionSummary[] = [
  {
    id: 'm1',
    categoryId: 'electricite',
    categoryLabel: 'Électricité',
    title: 'Panne tableau électrique',
    clientName: 'Marc M.',
    location: 'Akwa, Douala',
    price: '20 000 FCFA',
    status: 'available',
    date: "Aujourd'hui, 14:30",
  },
  {
    id: 'm2',
    categoryId: 'climatisation',
    categoryLabel: 'Climatisation',
    title: 'Entretien & recharge climatiseur',
    clientName: 'Sophie T.',
    location: 'Bonapriso, Douala',
    price: '25 000 FCFA',
    status: 'ongoing',
    date: 'En cours · Arrivé sur place',
  },
  {
    id: 'm3',
    categoryId: 'plomberie',
    categoryLabel: 'Plomberie',
    title: 'Réparation fuite lavabo',
    clientName: 'Paul K.',
    location: 'Bastos, Yaoundé',
    price: '15 000 FCFA',
    status: 'done',
    date: 'Hier, 16:45',
  },
  {
    id: 'm4',
    categoryId: 'climatisation',
    categoryLabel: 'Climatisation',
    title: 'Climatisation réparée',
    clientName: 'Sophie T.',
    location: 'Bonapriso, Douala',
    price: '25 000 FCFA',
    status: 'done',
    date: '18 juin 2026',
  },
];

const OFFER_CLIENT: MissionClient = {
  name: 'Jean Dupont',
  phone: '+237695123456',
  rating: 4.9,
  verified: true,
};

const ONGOING_CLIENT: MissionClient = {
  name: 'Sophie T.',
  phone: '+237695123456',
  rating: 4.9,
  verified: true,
};

const OFFER: MissionOffer = {
  id: 'm1',
  categoryId: 'electricite',
  categoryLabel: 'Électricité',
  title: 'Panne tableau électrique',
  publishedAgo: 'Publié il y a 5 minutes',
  budgetRange: '15 000 – 25 000 FCFA',
  description:
    "Le disjoncteur général saute continuellement depuis ce matin dès qu'on allume les lumières du salon. Besoin d'un diagnostic d'urgence et réparation.",
  location: 'Akwa, Douala',
  distance: 'À 1,2 km de vous',
  client: OFFER_CLIENT,
};

const TRIP: MissionTrip = {
  client: OFFER_CLIENT,
  destination: 'Akwa, Douala (Face Direction Camtel)',
  distance: '1,2 km',
  eta: '12 - 15 min',
};

const ONGOING: OngoingMission = {
  client: ONGOING_CLIENT,
  location: 'Bonapriso, Douala (Rue Marché)',
  categoryLabel: 'Climatisation',
  title: 'Entretien & recharge climatiseur Split',
  price: '25 000 FCFA',
  elapsedSeconds: 1935,
  startedAgo: 'Démarrée il y a 32 min',
};

const PROGRESS_TIMELINE: TimelineStep[] = [
  {
    id: 'accepted',
    title: 'Mission acceptée',
    time: '14:15 · Acceptée par vous',
    state: 'done',
  },
  {
    id: 'en-route',
    title: 'Prestataire en route',
    time: '14:20 · Déplacement vers Bonapriso',
    state: 'done',
  },
  {
    id: 'arrived',
    title: 'Arrivé sur place',
    time: '14:35 · QR Code scanné',
    state: 'done',
  },
  {
    id: 'ongoing',
    title: 'Intervention en cours',
    time: 'Démarrée il y a 32 min',
    state: 'active',
  },
  {
    id: 'closing',
    title: 'Clôture & Paiement client',
    time: 'À venir après fin du travail',
    state: 'pending',
  },
];

const JOURNAL_DRAFT: InterventionJournal = {
  diagnostic:
    "Surtension électrique ayant provoqué la fonte du disjoncteur différentiel 32A et l'endommagement du bornier.",
  solution:
    'Remplacement du disjoncteur général, ré-isolation des raccordements et resserrage complet du tableau.',
  material: 'Disjoncteur Schneider 32A + Bornier de répartition',
  materialCost: '3 500',
  comment: 'Tableau testé en charge pleine. Installation 100% conforme.',
  billPhoto: BILL_PHOTO_URI,
};

const OPPORTUNITIES: MissionOpportunity[] = [
  {
    id: 'm1',
    categoryId: 'electricite',
    categoryLabel: 'Électricité',
    title: 'Panne tableau électrique',
    description:
      'Disjoncteur général qui saute continuellement depuis ce matin.',
    location: 'Akwa, Douala',
    distance: '1,2 km',
    amount: '25 000 FCFA',
    publishedAgo: 'Il y a 4 min',
  },
  {
    id: 'm2',
    categoryId: 'climatisation',
    categoryLabel: 'Climatisation',
    title: "Fuite d'eau climatiseur Split",
    description: "Le split fuit goutte à goutte à l'intérieur du salon.",
    location: 'Bonapriso, Douala',
    distance: '2,8 km',
    amount: '25 000 FCFA',
    publishedAgo: 'Il y a 12 min',
  },
  {
    id: 'm3',
    categoryId: 'plomberie',
    categoryLabel: 'Plomberie',
    title: 'Remplacement robinet cuisine',
    description: 'Robinet cassé au niveau du raccord tuyau.',
    location: 'Bally, Douala',
    distance: '3,5 km',
    amount: '15 000 FCFA',
    publishedAgo: 'Il y a 25 min',
  },
];

const DAILY_SUMMARY: ProviderDailySummary = {
  missionCount: 2,
  missionDetail: '1 en cours · 1 terminée',
  earnings: '28 500',
  averageRating: '4,9',
  ratingDetail: '12 avis',
  responseRate: '92 %',
  responseDetail: 'cette semaine',
};

const RECENT_COMPLETED: ProviderCompletedActivity[] = [
  {
    id: 'c1',
    categoryId: 'climatisation',
    title: 'Climatisation réparée',
    date: '18 juin · 10:35',
    amount: '18 000 FCFA',
  },
  {
    id: 'c2',
    categoryId: 'plomberie',
    title: "Fuite d'eau réparée",
    date: '17 juin · 16:20',
    amount: '12 500 FCFA',
  },
];

export interface MissionTab {
  id: MissionStatus;
  label: string;
}

/**
 * Missions vues depuis l'espace prestataire (frontière d'accès aux données,
 * actuellement simulée).
 */
export const providerMissionService = {
  getMissions(): MissionSummary[] {
    return MISSIONS;
  },

  getMissionsByStatus(status: MissionStatus): MissionSummary[] {
    return MISSIONS.filter((mission) => mission.status === status);
  },

  getTabs(): MissionTab[] {
    return [
      {
        id: 'available',
        label: `Disponibles (${this.getOpportunities().length})`,
      },
      {
        id: 'ongoing',
        label: 'En cours',
      },
      { id: 'done', label: 'Terminées' },
    ];
  },

  /**
   * Missions ouvertes proposées sur l'accueil prestataire.
   */
  getOpportunities(): MissionOpportunity[] {
    return OPPORTUNITIES;
  },

  getDailySummary(): ProviderDailySummary {
    return DAILY_SUMMARY;
  },

  getRecentCompletedMissions(): ProviderCompletedActivity[] {
    return RECENT_COMPLETED;
  },

  /**
   * Mission proposée, encore à accepter.
   */
  getOffer(): MissionOffer {
    return OFFER;
  },

  getTrip(): MissionTrip {
    return TRIP;
  },

  getOngoingMission(): OngoingMission {
    return ONGOING;
  },

  /**
   * Avancement en 5 étapes, du point de vue prestataire.
   */
  getProgressTimeline(): TimelineStep[] {
    return PROGRESS_TIMELINE;
  },

  getJournalDraft(): InterventionJournal {
    return JOURNAL_DRAFT;
  },

  getBillPhotoUri(): string {
    return BILL_PHOTO_URI;
  },

  /**
   * Durée de validité du QR Code de clôture, en secondes.
   */
  getClosingQrValiditySeconds(): number {
    return 180;
  },

  getDefaultSettlement(): { totalAmount: string; clientName: string } {
    return { totalAmount: '28 500 FCFA', clientName: 'Jean Dupont' };
  },
};
