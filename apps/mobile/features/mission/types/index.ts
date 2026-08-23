import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

/**
 * Famille de métier proposée au client (électricité, plomberie…).
 *
 * `illustration` n'existe que pour les familles mises en avant sur l'accueil ;
 * les autres retombent sur l'icône.
 */
export interface ServiceCategory {
  id: string;
  label: string;
  icon: FeatherIconName;
  iconBackground: string;
  iconColor: string;
  illustration?: ImageSourcePropType;
}

/**
 * Demande en cours de saisie par le client, avant recherche d'un professionnel.
 */
export interface ServiceRequestDraft {
  description: string;
  category: string;
  address: string;
  addressDetails: string;
  photos: string[];
}

/**
 * Cycle de vie d'une demande, tel que le client le voit.
 */
export type ServiceRequestStatus = 'pending' | 'ongoing' | 'done';

export interface ServiceRequestSummary {
  id: string;
  title: string;
  location: string;
  date: string;
  status: ServiceRequestStatus;
  categoryId: string;
  providerName?: string;
  amount?: string;
}

export interface ServiceRequestTab {
  id: ServiceRequestStatus;
  label: string;
}

/**
 * Étape du suivi d'une intervention, partagée entre client et prestataire.
 */
export type TimelineStepState = 'done' | 'active' | 'pending';

export interface TimelineStep {
  id: string;
  title: string;
  time: string;
  state: TimelineStepState;
  route?: string;
}

/**
 * Professionnel proposé au client pour une demande.
 */
export interface ProviderMatch {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  eta: string;
  bio: string;
  avatarUrl: string;
  phone: string;
}

/**
 * Professionnel candidat présenté avec son score d'attribution.
 */
export interface ProviderCandidate extends ProviderMatch {
  verified: boolean;
  experience: string;
  indicativePrice: string;
  matchScore: string;
}

/**
 * Professionnel assigné à l'intervention en cours, tel qu'affiché au client.
 */
export interface AssignedProvider {
  name: string;
  specialty: string;
  phone: string;
  avatarUrl: string;
}

/**
 * Rapport rédigé par le prestataire à la fin de l'intervention.
 */
export interface InterventionJournal {
  diagnostic: string;
  solution: string;
  material: string;
  materialCost: string;
  comment: string;
  billPhoto: string | null;
}

/**
 * Décomposition du Tarif Relio présentée avant paiement.
 */
export interface TariffLine {
  label: string;
  amount: string;
}

export interface TariffBreakdown {
  lines: TariffLine[];
  total: string;
  totalAmount: number;
}

/**
 * Cycle de vie d'une mission, tel que le prestataire le voit.
 */
export type MissionStatus = 'available' | 'ongoing' | 'done';

export interface MissionSummary {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  clientName: string;
  location: string;
  price: string;
  status: MissionStatus;
  date: string;
}

/**
 * Mission proposée sur l'accueil prestataire, avant ouverture du détail.
 */
export interface MissionOpportunity {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  description: string;
  location: string;
  distance: string;
  amount: string;
  publishedAgo: string;
}

/**
 * Activité du jour du prestataire.
 */
export interface ProviderDailySummary {
  missionCount: number;
  missionDetail: string;
  earnings: string;
  averageRating: string;
  ratingDetail: string;
  responseRate: string;
  responseDetail: string;
}

/**
 * Mission terminée et payée, affichée dans l'activité récente de l'accueil.
 */
export interface ProviderCompletedActivity {
  id: string;
  categoryId: string;
  title: string;
  date: string;
  amount: string;
}

/**
 * Client d'une mission, vu depuis l'espace prestataire.
 */
export interface MissionClient {
  name: string;
  phone: string;
  rating: number;
  verified: boolean;
}

/**
 * Mission proposée au prestataire, avant acceptation.
 */
export interface MissionOffer {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  publishedAgo: string;
  budgetRange: string;
  description: string;
  location: string;
  distance: string;
  client: MissionClient;
}

/**
 * Trajet en cours vers le client.
 */
export interface MissionTrip {
  client: MissionClient;
  destination: string;
  distance: string;
  eta: string;
}

/**
 * Intervention en cours, côté prestataire.
 */
export interface OngoingMission {
  client: MissionClient;
  location: string;
  categoryLabel: string;
  title: string;
  price: string;
  elapsedSeconds: number;
  startedAgo: string;
}

/**
 * Proposition de recatégorisation faite sur place par le prestataire.
 */
export interface RecategorizationProposal {
  providerName: string;
  currentCategory: string;
  currentPrice: string;
  suggestedCategory: string;
  suggestedPrice: string;
  reason: string;
}
