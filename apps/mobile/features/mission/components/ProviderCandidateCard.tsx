import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { RatingSummary } from '../../../components/ui';
import { ProviderCandidate } from '../types';

interface ProviderCandidateCardProps {
  candidate: ProviderCandidate;
}

/**
 * Fiche détaillée d'un professionnel candidat à l'attribution.
 */
export function ProviderCandidateCard({
  candidate,
}: ProviderCandidateCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: candidate.avatarUrl }} style={styles.avatar} />
          {candidate.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={18} color="#27AE60" />
            </View>
          )}
        </View>

        <View style={styles.mainDetails}>
          <Text style={styles.name}>{candidate.name}</Text>
          <Text style={styles.specialty}>{candidate.specialty}</Text>
          <RatingSummary
            value={candidate.rating}
            reviewsCount={candidate.reviewsCount}
          />
        </View>
      </View>

      <Text style={styles.bio}>{candidate.bio}</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Feather name="map-pin" size={16} color={colors.primary} />
          <Text style={styles.statText}>{candidate.distance}</Text>
        </View>
        <View style={styles.statItem}>
          <Feather name="award" size={16} color={colors.primary} />
          <Text style={styles.statText}>{candidate.experience}</Text>
        </View>
        <View style={styles.statItem}>
          <Feather name="shield" size={16} color={colors.primary} />
          <Text style={styles.statText}>Identité & Profil vérifiés</Text>
        </View>
        <View style={styles.statItem}>
          <Feather name="clock" size={16} color={colors.success} />
          <Text style={[styles.statText, styles.statTextAvailable]}>
            {candidate.eta}
          </Text>
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
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  mainDetails: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  specialty: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '500',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 20,
  },
  statsGrid: {
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 13,
    color: colors.grayVeryDark,
    fontWeight: '500',
  },
  statTextAvailable: {
    color: colors.success,
    fontWeight: '700',
  },
});
