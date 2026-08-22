import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { RatingSummary } from '../../../components/ui';
import { ProviderMatch } from '../types';

interface ProviderMatchCardProps {
  provider: ProviderMatch;
}

/**
 * Fiche du professionnel proposé après matching automatique.
 */
export function ProviderMatchCard({ provider }: ProviderMatchCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: provider.avatarUrl }} style={styles.avatar} />

      <Text style={styles.name}>{provider.name}</Text>
      <Text style={styles.specialty}>{provider.specialty}</Text>

      <RatingSummary
        value={provider.rating}
        reviewsCount={provider.reviewsCount}
        style={styles.rating}
      />

      <View style={styles.pillsRow}>
        <View style={styles.pill}>
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text style={styles.pillText}>{provider.distance}</Text>
        </View>
        <View style={styles.pill}>
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <Text style={styles.pillText}>{provider.eta}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: colors.grayDark,
    marginBottom: spacing.xs,
  },
  rating: {
    marginBottom: spacing.md,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    width: '100%',
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F6FF',
    paddingVertical: 10,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
