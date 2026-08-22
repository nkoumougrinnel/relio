import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { MissionOpportunity } from '../types';
import { serviceCatalogService } from '../services/service-catalog.service';

interface MissionOpportunityCardProps {
  opportunity: MissionOpportunity;
  onPress: () => void;
}

/**
 * Mission ouverte mise en avant sur l'accueil prestataire.
 */
export function MissionOpportunityCard({
  opportunity,
  onPress,
}: MissionOpportunityCardProps) {
  const category = serviceCatalogService.getCategoryById(
    opportunity.categoryId
  );

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.95} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.categoryPill}>
          <View
            style={[
              styles.categoryIcon,
              { backgroundColor: category.iconBackground },
            ]}
          >
            <Feather name={category.icon} size={14} color={category.iconColor} />
          </View>
          <Text style={styles.categoryLabel}>{opportunity.categoryLabel}</Text>
        </View>

        <Text style={styles.publishedAgo}>{opportunity.publishedAgo}</Text>
      </View>

      <Text style={styles.title}>{opportunity.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {opportunity.description}
      </Text>

      <View style={styles.locationRow}>
        <Feather name="map-pin" size={15} color={colors.primary} />
        <Text style={styles.locationText}>{opportunity.location}</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.distance}>📍 {opportunity.distance}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceBlock}>
          <Text style={styles.priceLabel}>Budget estimé</Text>
          <Text style={styles.priceValue}>{opportunity.priceRange}</Text>
        </View>

        <TouchableOpacity
          style={styles.openBtn}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Text style={styles.openBtnText}>Voir la mission</Text>
          <Feather name="arrow-right" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#E1EDFF',
  },
  categoryIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.md,
    backgroundColor: '#FAFCFF',
    padding: spacing.xs + 2,
    borderRadius: borderRadius.sm,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  separator: {
    color: colors.grayMedium,
    marginHorizontal: 4,
  },
  distance: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm + 2,
    marginTop: 4,
  },
  priceBlock: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.grayMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  openBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
