import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { TariffBreakdown } from '../types';

interface TariffBreakdownCardProps {
  breakdown: TariffBreakdown;
}

/**
 * Détail du Tarif Relio réglé dans l'application.
 */
export function TariffBreakdownCard({ breakdown }: TariffBreakdownCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
        <Text style={styles.title}>Tarif Relio (Paiement In-App)</Text>
      </View>

      {breakdown.lines.map((line) => (
        <View key={line.label} style={styles.lineRow}>
          <Text style={styles.lineLabel}>{line.label}</Text>
          <Text style={styles.lineValue}>{line.amount}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL TARIF RELIO</Text>
        <Text style={styles.totalValue}>{breakdown.total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  lineLabel: {
    fontSize: 14,
    color: colors.grayDark,
  },
  lineValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
});
