import {
  PaymentMethodId,
  PaymentMethodOption,
  PendingPayment,
  PendingPaymentQuery,
  SavedPaymentMethod,
} from '../types';

const METHOD_OPTIONS: PaymentMethodOption[] = [
  {
    id: 'cash',
    label: 'Espèces',
    description: 'Payez directement au professionnel.',
    emoji: '💵',
    emojiBackground: '#E8F8F0',
  },
  {
    id: 'om',
    label: 'Orange Money',
    description: 'Paiement rapide et sécurisé via Orange Money.',
    emoji: '🍊',
    emojiBackground: '#FFF3E0',
  },
  {
    id: 'momo',
    label: 'MTN MoMo',
    description: 'Paiement rapide et sécurisé via MTN MoMo.',
    emoji: '🟡',
    emojiBackground: '#FFFDE7',
  },
];

const SAVED_METHODS: SavedPaymentMethod[] = [
  {
    id: 'om',
    label: 'Orange Money',
    detail: '+237 6 95 12 34 56',
    emoji: '🍊',
  },
  {
    id: 'momo',
    label: 'MTN MoMo',
    detail: '+237 6 98 54 32 10',
    emoji: '🟡',
  },
  {
    id: 'cash',
    label: 'Espèces',
    detail: 'Paiement direct en espèces',
    emoji: '💵',
  },
];

/**
 * Service de paiement (frontière d'accès aux données, actuellement simulée).
 */
export const paymentService = {
  getMethodOptions(): PaymentMethodOption[] {
    return METHOD_OPTIONS;
  },

  getSavedMethods(): SavedPaymentMethod[] {
    return SAVED_METHODS;
  },

  getDefaultMethodId(): PaymentMethodId {
    return 'om';
  },

  getPendingPayment({
    clientName,
    materialCost,
  }: PendingPaymentQuery): PendingPayment {
    return {
      clientName,
      totalAmount: '28 500 FCFA',
      breakdown: [
        {
          label: "Main d'œuvre & Déplacement Tarif Relio",
          amount: '25 000 FCFA',
        },
        {
          label: `Matériel remboursé (${materialCost} FCFA)`,
          amount: '3 500 FCFA',
        },
      ],
    };
  },
};
