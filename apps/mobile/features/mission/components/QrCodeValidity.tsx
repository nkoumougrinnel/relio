import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../../theme';
import { formatCountdown } from '../utils/time';

interface QrCodeValidityProps {
  seconds: number;
  label?: string;
  style?: ViewStyle;
}

/**
 * Compte à rebours de validité d'un QR Code.
 */
export function QrCodeValidity({
  seconds,
  label = 'QR Code valide',
  style,
}: QrCodeValidityProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{formatCountdown(seconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
});
