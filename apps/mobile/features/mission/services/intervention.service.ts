import {
  InterventionJournal,
  RecategorizationProposal,
  TariffBreakdown,
} from '../types';

const BILL_PHOTO_URI =
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop';

const CLIENT_JOURNAL: InterventionJournal = {
  diagnostic:
    'Surtension électrique ayant endommagé la prise principale et le câble de dérivation.',
  solution:
    'Remplacement complet du bloc prise 16A, réalignement de la ligne neutre et contrôle de tension.',
  material: 'Prise encastrée Legrand 16A + 2m câble 2.5mm²',
  materialCost: '3 500',
  comment: 'Installation testée sous charge, aucun risque résiduel.',
  billPhoto: BILL_PHOTO_URI,
};

const RELIO_TARIFF: TariffBreakdown = {
  lines: [
    { label: 'Frais de déplacement', amount: '2 000 FCFA' },
    { label: "Main d'œuvre (1h)", amount: '8 000 FCFA' },
  ],
  total: '10 000 FCFA',
  totalAmount: 10000,
};

/**
 * Déroulé d'une intervention : journal, tarification, QR Codes.
 * Frontière d'accès aux données, actuellement simulée.
 */
export const interventionService = {
  /**
   * Journal rédigé par le prestataire, tel que le client le consulte.
   */
  getJournal(): InterventionJournal {
    return CLIENT_JOURNAL;
  },

  getBillPhotoUri(): string {
    return BILL_PHOTO_URI;
  },

  /**
   * Tarif Relio (main d'œuvre + déplacement), hors matériel.
   */
  getTariffBreakdown(): TariffBreakdown {
    return RELIO_TARIFF;
  },

  getDefaultMaterialLabel(): string {
    return 'Prise Legrand 16A + câble 2.5mm²';
  },

  getDefaultMaterialCost(): string {
    return '3 500';
  },

  getDefaultSolution(): string {
    return 'Remplacement de la prise monophasée 16A et contrôle de sécurité.';
  },

  /**
   * Durée de validité d'un QR Code d'ouverture ou de clôture, en secondes.
   */
  getQrCodeValiditySeconds(): number {
    return 120;
  },

  /**
   * Durée déjà écoulée quand le client ouvre le suivi d'intervention.
   */
  getElapsedSeconds(): number {
    return 1638;
  },

  getStartedAtLabel(): string {
    return '09:27';
  },

  getRecategorizationProposal(providerName: string): RecategorizationProposal {
    return {
      providerName,
      currentCategory: '⚡ Électricité (Prise murale)',
      currentPrice: '15 000 FCFA',
      suggestedCategory: '⚡ Électricité (Tableau Général)',
      suggestedPrice: '22 000 FCFA',
      reason: `${providerName} a identifié un problème différent de celui décrit initialement après diagnostic sur place.`,
    };
  },
};
