export type PaymentMethodId = 'cash' | 'om' | 'momo';

/**
 * Moyen de paiement proposé au client au moment de régler une intervention.
 */
export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description: string;
  emoji: string;
  emojiBackground: string;
}

/**
 * Moyen de paiement déjà enregistré sur le compte.
 */
export interface SavedPaymentMethod {
  id: PaymentMethodId;
  label: string;
  detail: string;
  emoji: string;
}

export interface PaymentBreakdownLine {
  label: string;
  amount: string;
}

/**
 * Montant qu'un prestataire attend pour une intervention terminée.
 */
export interface PendingPayment {
  clientName: string;
  totalAmount: string;
  breakdown: PaymentBreakdownLine[];
}

export interface PendingPaymentQuery {
  clientName: string;
  materialCost: string;
}
