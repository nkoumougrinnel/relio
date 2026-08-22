import { ClientProfile, PersonalInfo, ProviderProfile } from '../types';

const CLIENT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';

const PROVIDER_AVATAR =
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop';

const CLIENT_PROFILE: ClientProfile = {
  id: 'usr_1',
  fullName: 'Jean Dupont',
  phone: '+237 6 95 12 34 56',
  email: 'jean.dupont@email.com',
  avatarUrl: CLIENT_AVATAR,
};

const PROVIDER_PROFILE: ProviderProfile = {
  id: 'pro_1',
  fullName: 'Jean Mbarga',
  specialty: 'Électricien & Climatisation',
  phone: '+237 6 99 00 11 22',
  avatarUrl: PROVIDER_AVATAR,
  verified: true,
};

/**
 * Service de profil (frontière d'accès aux données, actuellement simulée).
 */
export const profileService = {
  getClientProfile(): ClientProfile {
    return CLIENT_PROFILE;
  },

  getProviderProfile(): ProviderProfile {
    return PROVIDER_PROFILE;
  },

  getPersonalInfo(): PersonalInfo {
    return {
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: CLIENT_PROFILE.phone,
      email: CLIENT_PROFILE.email,
      avatarUrl: CLIENT_PROFILE.avatarUrl,
    };
  },

  async updatePersonalInfo(info: PersonalInfo): Promise<PersonalInfo> {
    return info;
  },
};
