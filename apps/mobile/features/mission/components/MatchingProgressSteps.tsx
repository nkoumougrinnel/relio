import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

interface MatchingProgressStepsProps {
  steps: string[];
  currentIndex: number;
}

/**
 * Étapes animées de la recherche d'un professionnel.
 */
export function MatchingProgressSteps({
  steps,
  currentIndex,
}: MatchingProgressStepsProps) {
  return (
    <View style={styles.card}>
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <View key={step} style={styles.row}>
            <View
              style={[
                styles.indicator,
                isDone && styles.indicatorDone,
                isCurrent && styles.indicatorCurrent,
              ]}
            >
              {isDone ? (
                <Ionicons name="checkmark" size={14} color={colors.white} />
              ) : (
                <View style={[styles.dot, isCurrent && styles.dotActive]} />
              )}
            </View>

            <Text
              style={[
                styles.text,
                isDone && styles.textDone,
                isCurrent && styles.textCurrent,
              ]}
            >
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  indicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.grayMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  indicatorCurrent: {
    borderColor: colors.primary,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 14,
    color: colors.grayDark,
  },
  textDone: {
    color: colors.grayVeryDark,
    fontWeight: '600',
  },
  textCurrent: {
    color: colors.primary,
    fontWeight: '700',
  },
});
