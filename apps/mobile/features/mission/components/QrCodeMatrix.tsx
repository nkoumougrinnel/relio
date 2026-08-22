import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';

interface QrCodeMatrixProps {
  badgeLabel?: string;
  style?: ViewStyle;
}

/**
 * Représentation visuelle d'un QR Code Relio, en attendant la génération réelle.
 */
export function QrCodeMatrix({ badgeLabel = 'relio', style }: QrCodeMatrixProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.matrix}>
        <View style={[styles.marker, styles.markerTopLeft]}>
          <View style={styles.markerInner} />
        </View>
        <View style={[styles.marker, styles.markerTopRight]}>
          <View style={styles.markerInner} />
        </View>
        <View style={[styles.marker, styles.markerBottomLeft]}>
          <View style={styles.markerInner} />
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  matrix: {
    width: 220,
    height: 220,
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerTopLeft: {
    top: 12,
    left: 12,
  },
  markerTopRight: {
    top: 12,
    right: 12,
  },
  markerBottomLeft: {
    bottom: 12,
    left: 12,
  },
  markerInner: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 14,
  },
});
