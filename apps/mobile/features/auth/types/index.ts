export type UserRole = 'client' | 'prestataire';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface LoginPayload {
  emailOrPhone: string;
  password?: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string;
  cguAccepted: boolean;
  privacyAccepted: boolean;
}
