import { User, LoginPayload, RegisterPayload } from '../types';

/**
 * Service d'authentification (Abstrait / Simulated API boundary)
 */
export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    // Simulation d'une réponse API
    return {
      id: 'usr_1',
      firstName: 'Sophie',
      lastName: 'T.',
      email: payload.emailOrPhone,
      phone: '+237695123456',
      role: 'client',
    };
  },

  async register(payload: RegisterPayload): Promise<{ requiresOtp: boolean }> {
    return { requiresOtp: true };
  },

  async verifyOtp(code: string): Promise<User> {
    return {
      id: 'usr_1',
      firstName: 'Sophie',
      lastName: 'T.',
      email: 'sophie@relio.cm',
      phone: '+237695123456',
      role: 'client',
    };
  },

  async logout(): Promise<void> {
    // La session est encore simulée : rien à révoquer côté client pour l'instant.
  },
};
