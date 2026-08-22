import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export interface StatCardProps {
  icon: React.ReactNode;
  iconBackground?: string;
  label: string;
  value: string;
  hint?: string;
  style?: ViewStyle;
}

/**
 * Carte de statistique compacte (libellé, valeur, précision).
 */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBackground = '#EEF4FF',
  label,
  value,
  hint,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconBox, { backgroundColor: iconBackground }]}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 12,
    color: colors.grayDark,
    fontWeight: '600',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginTop: 2,
  },
  hint: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
  },
});
