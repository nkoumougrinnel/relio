import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';
import { MissionOpportunity } from '../types';
import { serviceCatalogService } from '../services/service-catalog.service';

interface AvailableMissionCardProps {
  opportunity: MissionOpportunity;
  onPress: () => void;
}

/**
 * Opportunité compacte dans l'onglet « Disponibles ».
 */
export function AvailableMissionCard({
  opportunity,
  onPress,
}: AvailableMissionCardProps) {
  const category = serviceCatalogService.getCategoryById(
    opportunity.categoryId
  );

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.header}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: category.iconBackground },
          ]}
        >
          {category.illustration ? (
            <Image
              source={category.illustration}
              style={styles.categoryIllustration}
              resizeMode="contain"
            />
          ) : (
            <Feather name={category.icon} size={13} color={category.iconColor} />
          )}
          <Text style={styles.categoryLabel}>{opportunity.categoryLabel}</Text>
        </View>
        <Text style={styles.publishedAgo}>{opportunity.publishedAgo}</Text>
      </View>

      <Text style={styles.title}>{opportunity.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {opportunity.description}
      </Text>

      <View style={styles.locationRow}>
        <Feather name="map-pin" size={14} color={colors.primary} />
        <Text style={styles.location}>{opportunity.location}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.distance}>{opportunity.distance}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.amount}>{opportunity.amount}</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Voir la mission</Text>
          <Feather name="arrow-right" size={14} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  categoryIllustration: {
    width: 16,
    height: 16,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  publishedAgo: {
    fontSize: 12,
    color: colors.grayMedium,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.grayDark,
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing.md,
  },
  location: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  dot: {
    color: colors.grayMedium,
  },
  distance: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm + 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
});
