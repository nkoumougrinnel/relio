import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, StepPagination } from '../../../components/ui';
import { spacing } from '../../../theme';

interface OnboardingProgressProps {
  currentStep: number;
  onNext: () => void;
}

export function OnboardingProgress({ currentStep, onNext }: OnboardingProgressProps) {
  return (
    <View style={styles.footer}>
      <StepPagination totalSteps={3} currentStep={currentStep} />
      <Button title="Suivant" variant="primary" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xs,
    gap: spacing.lg,
  },
});