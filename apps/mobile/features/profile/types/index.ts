/**
 * Identité affichée sur l'espace compte d'un client.
 */
export interface ClientProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

/**
 * Identité affichée sur l'espace compte d'un prestataire.
 */
export interface ProviderProfile {
  id: string;
  fullName: string;
  specialty: string;
  phone: string;
  avatarUrl: string;
  verified: boolean;
}

/**
 * Informations éditables par l'utilisateur depuis son compte.
 */
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

export type ProApplicationStatus = 'none' | 'pending';

export type ActivityStatus = 'paid' | 'ongoing';

export interface ActivityHistoryEntry {
  id: string;
  title: string;
  location: string;
  date: string;
  amount: string;
  status: ActivityStatus;
  emoji: string;
}

export interface ActivityHistoryFilter {
  id: string;
  label: string;
}

export interface GivenReview {
  id: string;
  proName: string;
  specialty: string;
  date: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}
