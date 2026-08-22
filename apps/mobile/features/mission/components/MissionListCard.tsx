import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { MissionSummary } from '../types';
import { serviceCatalogService } from '../services/service-catalog.service';

interface MissionListCardProps {
  mission: MissionSummary;
  onPress: () => void;
}

/**
 * Carte de mission dans la liste de l'espace prestataire.
 */
export function MissionListCard({ mission, onPress }: MissionListCardProps) {
  const category = serviceCatalogService.getCategoryById(mission.categoryId);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.header}>
        <View
          style={[styles.iconBox, { backgroundColor: category.iconBackground }]}
        >
          <Feather name={category.icon} size={18} color={category.iconColor} />
        </View>

        <View style={styles.meta}>
          <Text style={styles.category}>{mission.categoryLabel}</Text>
          <Text style={styles.title}>{mission.title}</Text>
        </View>

        <Text style={styles.price}>{mission.price}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.infoRow}>
          <Feather name="user" size={14} color={colors.grayDark} />
          <Text style={styles.infoText}>{mission.clientName}</Text>
          <Text style={styles.separator}>•</Text>
          <Feather name="map-pin" size={14} color={colors.grayDark} />
          <Text style={styles.infoText}>{mission.location}</Text>
        </View>

        <Feather name="chevron-right" size={18} color={colors.grayMedium} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meta: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    color: colors.grayMedium,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs + 2,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.grayDark,
  },
  separator: {
    color: colors.grayMedium,
    marginHorizontal: 2,
  },
});
