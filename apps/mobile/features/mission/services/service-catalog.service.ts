import { ServiceCategory } from '../types';

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'electricite',
    label: 'Électricité',
    icon: 'zap',
    iconBackground: '#FFF9E6',
    iconColor: '#F59E0B',
    illustration: require('../../../assets/images/categories/electricite.png'),
  },
  {
    id: 'plomberie',
    label: 'Plomberie',
    icon: 'droplet',
    iconBackground: '#EEF9FF',
    iconColor: '#0288D1',
    illustration: require('../../../assets/images/categories/plomberie.png'),
  },
  {
    id: 'climatisation',
    label: 'Climatisation',
    icon: 'wind',
    iconBackground: '#E8F8F8',
    iconColor: '#00ACC1',
    illustration: require('../../../assets/images/categories/climatisation.png'),
  },
  {
    id: 'automobile',
    label: 'Automobile',
    icon: 'truck',
    iconBackground: '#F0F4FF',
    iconColor: '#3F51B5',
  },
  {
    id: 'electronique',
    label: 'Électronique',
    icon: 'smartphone',
    iconBackground: '#F5F0FF',
    iconColor: '#7C3AED',
  },
  {
    id: 'maison',
    label: 'Maison',
    icon: 'home',
    iconBackground: '#EFFFF5',
    iconColor: '#10B981',
  },
  {
    id: 'serrurerie',
    label: 'Serrurerie',
    icon: 'key',
    iconBackground: '#FFF5F5',
    iconColor: '#E53E3E',
    illustration: require('../../../assets/images/categories/serrurerie.png'),
  },
  {
    id: 'autres',
    label: 'Autres',
    icon: 'grid',
    iconBackground: '#F5F7FA',
    iconColor: '#757575',
  },
];

const FALLBACK_CATEGORY = CATEGORIES[0];

const POPULAR_IDS = ['plomberie', 'climatisation', 'electricite', 'serrurerie'];

/**
 * Catalogue des familles de métier (frontière d'accès aux données, simulée).
 */
export const serviceCatalogService = {
  getCategories(): ServiceCategory[] {
    return CATEGORIES;
  },

  /**
   * Catégories mises en avant sur l'accueil client, dans l'ordre d'affichage.
   */
  getPopularCategories(): ServiceCategory[] {
    return POPULAR_IDS.map((id) => this.getCategoryById(id));
  },

  getCategoryById(id: string): ServiceCategory {
    return CATEGORIES.find((category) => category.id === id) ?? FALLBACK_CATEGORY;
  },

  getDefaultCategoryLabel(): string {
    return FALLBACK_CATEGORY.label;
  },
};
