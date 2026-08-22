import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

interface LocationPillsProps {
  distance: string;
  eta: string;
}

/**
 * Distance et heure d'arrivée estimée du professionnel en route.
 */
export function LocationPills({ distance, eta }: LocationPillsProps) {
  return (
    <View style={styles.row}>
      <View style={styles.pill}>
        <Ionicons name="location-outline" size={14} color={colors.primary} />
        <Text style={styles.text}>{distance}</Text>
      </View>
      <View style={styles.pill}>
        <Ionicons name="time-outline" size={14} color={colors.primary} />
        <Text style={styles.text}>{eta}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
});
