import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';

type StepState = 'done' | 'active' | 'upcoming';

const STEPS: { label: string; state: StepState }[] = [
  { label: 'Documents', state: 'done' },
  { label: 'Profil', state: 'done' },
  { label: 'Validation', state: 'active' },
  { label: 'Réponse', state: 'upcoming' },
];

export function ProApplicationStepper() {
  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => (
        <React.Fragment key={step.label}>
          {index > 0 && (
            <View
              style={[
                styles.line,
                step.state === 'done' && styles.lineDone,
                step.state === 'active' && styles.lineActive,
              ]}
            />
          )}

          <View style={styles.step}>
            <View
              style={[
                styles.dot,
                step.state === 'done' && styles.dotDone,
                step.state === 'active' && styles.dotActive,
              ]}
            >
              {step.state === 'done' && (
                <Ionicons name="checkmark" size={12} color={colors.white} />
              )}
            </View>
            <Text
              style={[
                styles.label,
                step.state === 'active' && styles.labelActive,
              ]}
            >
              {step.label}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  step: {
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotDone: {
    backgroundColor: colors.success,
  },
  dotActive: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: '#D4E5FF',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 11,
    color: colors.grayDark,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
