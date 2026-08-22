import React from 'react';
import { View, Text, StyleSheet, Switch, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';

interface AvailabilityCardProps {
  available: boolean;
  onChange: (available: boolean) => void;
  style?: ViewStyle;
}

/**
 * Disponibilité du prestataire à recevoir de nouvelles missions.
 */
export function AvailabilityCard({
  available,
  onChange,
  style,
}: AvailabilityCardProps) {
  return (
    <View style={[styles.card, !available && styles.cardOff, style]}>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <View style={[styles.dot, available ? styles.dotOn : styles.dotOff]} />
          <Text style={styles.title}>
            {available ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
        <Text style={styles.subtitle}>
          {available
            ? 'Vous recevez des missions en temps réel.'
            : 'Vous ne recevez pas de nouvelles missions.'}
        </Text>
      </View>

      <Switch
        value={available}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: '#D1E4FF' }}
        thumbColor={available ? colors.primary : colors.grayMedium}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D8E8FF',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardOff: {
    borderColor: colors.border,
    backgroundColor: '#FAFBFD',
  },
  info: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  dotOn: {
    backgroundColor: colors.success,
  },
  dotOff: {
    backgroundColor: colors.grayMedium,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.grayDark,
  },
});
