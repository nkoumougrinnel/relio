import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

interface DeclaredMaterialCardProps {
  label: string;
  amount: string;
}

/**
 * Matériel déclaré par le prestataire, réglé hors application.
 */
export function DeclaredMaterialCard({
  label,
  amount,
}: DeclaredMaterialCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name="build-outline" size={18} color={colors.grayDark} />
        <Text style={styles.title}>Matériel déclaré (Règlement direct)</Text>
      </View>

      <View style={styles.lineRow}>
        <Text style={styles.lineLabel}>{label}</Text>
        <Text style={styles.lineValue}>{amount} FCFA</Text>
      </View>

      <View style={styles.notice}>
        <Ionicons
          name="information-circle-outline"
          size={16}
          color={colors.grayDark}
          style={styles.noticeIcon}
        />
        <Text style={styles.noticeText}>
          Le matériel est réglé directement au prestataire. Il est tracé
          ci-dessus pour référence et ne fait pas partie du paiement Relio.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAFCFF',
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    gap: spacing.sm,
  },
  lineLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.grayDark,
  },
  lineValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F7FA',
    padding: 8,
    borderRadius: borderRadius.sm,
    marginTop: 6,
  },
  noticeIcon: {
    marginRight: 4,
  },
  noticeText: {
    flex: 1,
    fontSize: 11,
    color: colors.grayDark,
    lineHeight: 15,
  },
});
