import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows } from '../../../theme';
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
          {category.illustration ? (
            <Image
              source={category.illustration}
              style={styles.categoryIllustration}
              resizeMode="contain"
            />
          ) : (
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: category.iconBackground },
              ]}
            >
              <Feather name={category.icon} size={14} color={category.iconColor} />
            </View>
          )}
          <Text style={styles.categoryLabel}>{opportunity.categoryLabel}</Text>
        </View>

        <Text style={styles.publishedAgo}>{opportunity.publishedAgo}</Text>
      </View>

      <Text style={styles.title}>{opportunity.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {opportunity.description}
      </Text>

      <View style={styles.locationCard}>
        <View style={styles.locationMain}>
          <View style={styles.pinCircle}>
            <Feather name="map-pin" size={14} color={colors.primary} />
          </View>
          <Text style={styles.locationText}>{opportunity.location}</Text>
        </View>
        <View style={styles.distancePill}>
          <Text style={styles.distance}>{opportunity.distance}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceBlock}>
          <Text style={styles.priceLabel}>Rémunération</Text>
          <Text style={styles.priceValue}>{opportunity.amount}</Text>
        </View>

        <TouchableOpacity
          style={styles.openBtn}
          activeOpacity={0.85}
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
    borderRadius: radius.lg,
    padding: spacing.md + 4,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#E1EDFF',
  },
  categoryIllustration: {
    width: 22,
    height: 22,
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
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7FAFF',
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm + 2,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  pinCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  distancePill: {
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  distance: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  priceBlock: {
    flexShrink: 0,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.grayMedium,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md + 2,
    height: 44,
    borderRadius: radius.full,
    gap: 6,
    ...shadows.sm,
    shadowColor: colors.primary,
  },
  openBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
