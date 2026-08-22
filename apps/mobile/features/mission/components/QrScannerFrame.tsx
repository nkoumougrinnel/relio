import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

interface QrScannerFrameProps {
  scanning: boolean;
}

/**
 * Viseur de scan du QR Code client, côté prestataire.
 */
export function QrScannerFrame({ scanning }: QrScannerFrameProps) {
  return (
    <View style={styles.frame}>
      <View style={[styles.corner, styles.cornerTopLeft]} />
      <View style={[styles.corner, styles.cornerTopRight]} />
      <View style={[styles.corner, styles.cornerBottomLeft]} />
      <View style={[styles.corner, styles.cornerBottomRight]} />

      {scanning ? (
        <View style={styles.scanning}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.scanningText}>Scan du QR Code en cours...</Text>
        </View>
      ) : (
        <Ionicons name="scan-outline" size={80} color={colors.grayMedium} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 220,
    height: 220,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: spacing.xl,
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.primary,
  },
  cornerTopLeft: {
    top: 10,
    left: 10,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    top: 10,
    right: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBottomRight: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanning: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  scanningText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
