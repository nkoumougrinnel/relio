import { GivenReview } from '../types';

const GIVEN_REVIEWS: GivenReview[] = [
  {
    id: '1',
    proName: 'Jean Mbarga',
    specialty: 'Technicien Électricien',
    date: '12 juin 2026',
    rating: 5,
    comment: 'Excellent travail, rapide et efficace.',
    avatarUrl:
      'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    proName: 'Patrick Ndong',
    specialty: 'Plombier',
    date: '16 juin 2026',
    rating: 5,
    comment:
      'Dépannage parfait en moins de 30 minutes. Je recommande fortement !',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '3',
    proName: 'Alain Biloa',
    specialty: 'Technicien Climatisation',
    date: '10 juin 2026',
    rating: 4,
    comment: 'Intervention propre et soignée.',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
];

/**
 * Évaluations vues depuis l'espace compte.
 *
 * `review` reste une question de domaine ouverte : ce service ne fait
 * qu'exposer les données nécessaires aux écrans de profil.
 */
export const reviewsService = {
  getGivenReviews(): GivenReview[] {
    return GIVEN_REVIEWS;
  },

  getReceivedReviews(): GivenReview[] {
    return [];
  },
};
