import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';
import { formatDuration } from '../utils/time';

interface InterventionTimerCardProps {
  seconds: number;
  caption: string;
}

/**
 * Chronomètre de l'intervention en cours.
 */
export function InterventionTimerCard({
  seconds,
  caption,
}: InterventionTimerCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Temps d&apos;intervention</Text>
      <Text style={styles.digits}>{formatDuration(seconds)}</Text>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
    marginBottom: 4,
  },
  digits: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.success,
    letterSpacing: 1,
    marginVertical: 4,
  },
  caption: {
    fontSize: 12,
    color: colors.grayDark,
  },
});
