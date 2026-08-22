import { ProApplicationStatus } from '../types';

/**
 * Candidature « devenir prestataire ».
 *
 * La frontière de domaine de `become-pro` est encore ouverte : la logique est
 * volontairement isolée dans ce service pour pouvoir être déplacée sans
 * toucher aux écrans.
 */
export const proApplicationService = {
  getStatus(): ProApplicationStatus {
    return 'none';
  },

  async submit(): Promise<ProApplicationStatus> {
    return 'pending';
  },
};
