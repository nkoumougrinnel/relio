import {
  ServiceRequestDraft,
  ServiceRequestStatus,
  ServiceRequestSummary,
  ServiceRequestTab,
  TimelineStep,
} from '../types';
import { serviceCatalogService } from './service-catalog.service';

const SAMPLE_PHOTO_URI =
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop';

const DEFAULT_DESCRIPTION =
  'Ex. : Ma prise ne fonctionne plus depuis ce matin...';

const MATCHING_STEPS = [
  'Analyse de votre demande',
  'Recherche de professionnels',
  'Comparaison des profils',
  'Sélection du meilleur match',
];

const REQUESTS: ServiceRequestSummary[] = [
  {
    id: '5',
    title: 'Prise électrique HS',
    location: 'Bonapriso, Douala',
    date: '23 août 2026 • 08:12',
    status: 'pending',
    categoryId: 'electricite',
  },
  {
    id: '1',
    title: 'Climatisation réparée',
    location: 'Bonapriso, Douala',
    date: '12 juin 2026 • 10:35',
    status: 'done',
    categoryId: 'climatisation',
    providerName: 'Jean Mbarga',
    amount: '15 032 FCFA',
  },
  {
    id: '2',
    title: "Fuite d'eau dans la cuisine",
    location: 'Bonanjo, Douala',
    date: '12 juin 2026 • 09:18',
    status: 'ongoing',
    categoryId: 'plomberie',
    providerName: 'Patrick Ndong',
    amount: '12 500 FCFA',
  },
  {
    id: '3',
    title: "Problème d'électricité",
    location: 'Akwa, Douala',
    date: '11 juin 2026 • 14:30',
    status: 'done',
    categoryId: 'electricite',
    providerName: 'Jean Mbarga',
    amount: '8 000 FCFA',
  },
  {
    id: '4',
    title: 'Serrure débloquée',
    location: 'Akwa, Douala',
    date: '03 juin 2026 • 16:00',
    status: 'done',
    categoryId: 'serrurerie',
    providerName: 'Alain Biloa',
    amount: '10 000 FCFA',
  },
];

const TIMELINE_STEPS: TimelineStep[] = [
  { id: '1', title: 'Demande reçue', time: '12 juin à 09:21', state: 'done' },
  {
    id: '2',
    title: 'Recherche et analyse',
    time: '12 juin à 09:22',
    state: 'done',
  },
  {
    id: '3',
    title: 'Professionnel attribué',
    time: '12 juin à 09:25',
    state: 'done',
  },
  {
    id: '4',
    title: 'Professionnel en route',
    time: '12 juin à 09:30',
    state: 'done',
  },
  {
    id: '5',
    title: 'Prestataire arrivé',
    time: '12 juin à 09:45',
    state: 'done',
  },
  {
    id: '6',
    title: 'Intervention en cours',
    time: 'En cours',
    state: 'active',
    route: '/(client)/demande/ongoing',
  },
  {
    id: '7',
    title: 'Intervention terminée',
    time: 'À venir',
    state: 'pending',
  },
  {
    id: '8',
    title: "Journal d'intervention",
    time: 'À venir',
    state: 'pending',
  },
  { id: '9', title: 'Paiement', time: 'À venir', state: 'pending' },
  { id: '10', title: 'Évaluation', time: 'À venir', state: 'pending' },
];

export interface RequestDraftSeed {
  initialText?: string;
  category?: string;
}

/**
 * Demandes d'intervention côté client (frontière d'accès aux données, simulée).
 */
export const serviceRequestService = {
  createDraft({ initialText, category }: RequestDraftSeed): ServiceRequestDraft {
    return {
      description: initialText || DEFAULT_DESCRIPTION,
      category: category || serviceCatalogService.getDefaultCategoryLabel(),
      address: 'Avenue de la République, Bonapriso, Douala',
      addressDetails: 'Bâtiment bleu, 2ème étage',
      photos: [],
    };
  },

  getDefaultDescription(): string {
    return DEFAULT_DESCRIPTION;
  },

  /**
   * Photo simulée tant que la galerie native n'est pas branchée.
   */
  getSamplePhotoUri(): string {
    return SAMPLE_PHOTO_URI;
  },

  getMaxPhotos(): number {
    return 3;
  },

  getVoiceNoteDuration(): string {
    return '0:14';
  },

  /**
   * Fourchette annoncée avant confirmation du Tarif Relio.
   */
  getIndicativeTariffRange(): string {
    return '15 000 – 25 000 FCFA';
  },

  /**
   * Montant unique affiché au client, aligné sur la rémunération prestataire.
   */
  getPrestationPrice(): string {
    return '25 000 FCFA';
  },

  getMatchingSteps(): string[] {
    return MATCHING_STEPS;
  },

  getRequests(): ServiceRequestSummary[] {
    return REQUESTS;
  },

  getRecentRequests(count = 2): ServiceRequestSummary[] {
    return REQUESTS.slice(0, count);
  },

  getRequestsByStatus(status: ServiceRequestStatus): ServiceRequestSummary[] {
    return REQUESTS.filter((request) => request.status === status);
  },

  /**
   * Demandes qui justifient un badge sur l'onglet (en attente ou en cours).
   */
  hasActionableRequests(): boolean {
    return REQUESTS.some(
      (request) => request.status === 'pending' || request.status === 'ongoing'
    );
  },

  getTabs(): ServiceRequestTab[] {
    const pendingCount = this.getRequestsByStatus('pending').length;
    const ongoingCount = this.getRequestsByStatus('ongoing').length;

    return [
      { id: 'pending', label: `En attente (${pendingCount})` },
      { id: 'ongoing', label: `En cours (${ongoingCount})` },
      { id: 'done', label: 'Terminées' },
    ];
  },

  /**
   * Destination du détail : matching Relio tant que la demande est en attente,
   * suivi de mission une fois un prestataire attribué.
   */
  getRequestRoute(request: ServiceRequestSummary) {
    if (request.status === 'pending') {
      return {
        pathname: '/(client)/demande/searching',
        params: {
          problemText: request.title,
          category: serviceCatalogService.getCategoryById(request.categoryId)
            .label,
          watch: 'true',
        },
      };
    }

    return {
      pathname: '/(client)/demande/mission',
      params: {
        missionId: request.id,
        title: request.title,
        status: request.status,
        proName: request.providerName,
      },
    };
  },

  getStatusLabel(status: ServiceRequestStatus): string {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'ongoing':
        return 'En cours';
      case 'done':
        return 'Terminée';
    }
  },

  getTimelineSteps(): TimelineStep[] {
    return TIMELINE_STEPS;
  },

  getDefaultRequestTitle(): string {
    return "Fuite d'eau dans la cuisine";
  },

  getDefaultRequestLocation(): string {
    return 'Bonanjo, Douala';
  },
};
