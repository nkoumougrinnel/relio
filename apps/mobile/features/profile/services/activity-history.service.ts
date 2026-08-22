import { ActivityHistoryEntry, ActivityHistoryFilter } from '../types';

const FILTERS: ActivityHistoryFilter[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'requests', label: 'Demandes' },
  { id: 'payments', label: 'Paiements' },
  { id: 'reviews', label: 'Évaluations' },
];

const ENTRIES: ActivityHistoryEntry[] = [
  {
    id: '1',
    title: 'Climatisation réparée',
    location: 'Bonapriso, Douala',
    date: '12 juin 2026 • 10:35',
    amount: '15 032 FCFA',
    status: 'paid',
    emoji: '❄',
  },
  {
    id: '2',
    title: "Fuite d'eau dans la cuisine",
    location: 'Bonanjo, Douala',
    date: '12 juin 2026 • 09:18',
    amount: '12 500 FCFA',
    status: 'ongoing',
    emoji: '💧',
  },
  {
    id: '3',
    title: "Problème d'électricité",
    location: 'Akwa, Douala',
    date: '11 juin 2026 • 14:30',
    amount: '8 000 FCFA',
    status: 'paid',
    emoji: '⚡',
  },
];

export const activityHistoryService = {
  getFilters(): ActivityHistoryFilter[] {
    return FILTERS;
  },

  getEntries(): ActivityHistoryEntry[] {
    return ENTRIES;
  },
};
