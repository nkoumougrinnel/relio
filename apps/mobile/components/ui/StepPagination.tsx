import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

export interface StepPaginationProps {
  totalSteps: number;
  currentStep: number; // 0-based or 1-based index
  style?: ViewStyle;
}

export const StepPagination: React.FC<StepPaginationProps> = ({
  totalSteps,
  currentStep,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        return (
          <View
            key={index}
            style={[styles.dot, isActive ? styles.activeDot : styles.inactiveDot]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.grayLight,
  },
});
