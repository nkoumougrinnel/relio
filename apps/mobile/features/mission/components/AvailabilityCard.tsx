import React from 'react';
import { View, Text, StyleSheet, Switch, ViewStyle } from 'react-native';
import { colors, spacing, radius, shadows } from '../../../theme';

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
    <View style={[styles.card, available ? styles.cardOn : styles.cardOff, style]}>
      <View style={styles.info}>
        <Text style={styles.title}>
          {available ? 'Disponible' : 'Indisponible'}
        </Text>
        <Text style={styles.subtitle}>
          {available
            ? 'Vous recevez des missions en temps réel.'
            : 'Vous ne recevez pas de nouvelles missions.'}
        </Text>
      </View>

      <Switch
        value={available}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: '#A8E6C3' }}
        thumbColor={available ? colors.success : colors.grayMedium}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    ...shadows.sm,
  },
  cardOn: {
    backgroundColor: '#F3FBF6',
    borderColor: '#E3F4EA',
  },
  cardOff: {
    backgroundColor: '#FAFBFD',
    borderColor: colors.border,
  },
  info: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.grayDark,
  },
});
