import { AssignedProvider, ProviderCandidate, ProviderMatch } from '../types';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop';

const MATCHES: ProviderMatch[] = [
  {
    id: '1',
    name: 'Jean Mbarga',
    specialty: 'Technicien Électricien',
    rating: 4.8,
    reviewsCount: 128,
    distance: '850 m de vous',
    eta: '15–20 min arrivée estimée',
    bio: "Installations et dépannages électriques avec 6 ans d'expérience.",
    avatarUrl: DEFAULT_AVATAR,
    phone: '+237695123456',
  },
  {
    id: '2',
    name: 'Patrick Ndong',
    specialty: 'Électricien & Domotique',
    rating: 4.9,
    reviewsCount: 94,
    distance: '1.4 km de vous',
    eta: '20–25 min arrivée estimée',
    bio: 'Spécialiste de la rénovation électrique et des tableaux basse tension.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    phone: '+237698765432',
  },
];

const CANDIDATES: ProviderCandidate[] = [
  {
    id: '1',
    name: 'Jean Mbarga',
    specialty: 'Technicien Frigoriste & Climatisation',
    rating: 4.9,
    reviewsCount: 48,
    distance: '1.2 km (Bonapriso)',
    eta: 'Disponible immédiatement',
    bio: 'Expert en maintenance et réparation de climatiseurs individuels et industriels.',
    avatarUrl:
      'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=300&auto=format&fit=crop',
    phone: '+237695123456',
    verified: true,
    experience: "8 ans d'expérience",
    indicativePrice: '18 000 FCFA',
    matchScore: 'Score Relio : 98% de compatibilité',
  },
  {
    id: '2',
    name: 'Samuel Eboa',
    specialty: 'Artisan Climatisation & Plomberie',
    rating: 4.8,
    reviewsCount: 32,
    distance: '2.4 km (Akwa)',
    eta: 'Disponible immédiatement',
    bio: 'Spécialiste agréé dépannage rapide et rechargement gaz réfrigérant.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    phone: '+237698765432',
    verified: true,
    experience: "6 ans d'expérience",
    indicativePrice: '20 000 FCFA',
    matchScore: 'Score Relio : 98% de compatibilité',
  },
];

const DEFAULT_ASSIGNED: AssignedProvider = {
  name: 'Jean Mbarga',
  specialty: 'Technicien Électricien',
  phone: '+237695123456',
  avatarUrl: DEFAULT_AVATAR,
};

export interface AssignedProviderSeed {
  name?: string;
  specialty?: string;
  phone?: string;
}

/**
 * Mise en relation client / prestataire (frontière d'accès aux données, simulée).
 */
export const providerMatchingService = {
  /**
   * Professionnels retenus par le matching automatique.
   */
  getMatches(): ProviderMatch[] {
    return MATCHES;
  },

  /**
   * Propositions détaillées présentées avec leur score d'attribution.
   */
  getCandidates(): ProviderCandidate[] {
    return CANDIDATES;
  },

  /**
   * Professionnel rattaché à l'intervention en cours. Les écrans de suivi ne
   * reçoivent aujourd'hui qu'une partie de l'identité par la navigation : le
   * service complète le reste.
   */
  getAssignedProvider(seed: AssignedProviderSeed = {}): AssignedProvider {
    return {
      name: seed.name || DEFAULT_ASSIGNED.name,
      specialty: seed.specialty || DEFAULT_ASSIGNED.specialty,
      phone: seed.phone || DEFAULT_ASSIGNED.phone,
      avatarUrl: DEFAULT_ASSIGNED.avatarUrl,
    };
  },

  /**
   * Réputation du professionnel assigné, affichée sur le suivi de prestation.
   */
  getAssignedProviderRating(): { rating: number; reviewsCount: number } {
    return { rating: 4.8, reviewsCount: 128 };
  },

  getDistanceToClient(): string {
    return '850 m de vous';
  },

  getEtaMinutes(): number {
    return 15;
  },
};
