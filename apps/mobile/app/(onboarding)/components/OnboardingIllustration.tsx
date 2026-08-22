import React from 'react';
import {
  DimensionValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../../../theme';

export interface OnboardingOption {
  icon: React.ReactNode;
  label: string;
}

interface OnboardingIllustrationProps {
  image: ImageSourcePropType;
  options: OnboardingOption[];
  width: DimensionValue;
}

export function OnboardingIllustration({ image, options, width }: OnboardingIllustrationProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.illustrationWrapper, { width }]}>
        <View style={styles.cloudBackground}>
          <View style={styles.cloudPart1} />
          <View style={styles.cloudPart2} />
          <View style={styles.cloudPart3} />
        </View>
        <Image source={image} style={styles.illustrationImage} resizeMode="contain" />
      </View>

      <View style={styles.optionsRow}>
        {options.map((option) => (
          <View style={styles.optionItem} key={option.label}>
            <View style={styles.optionCircle}>{option.icon}</View>
            <Text style={styles.optionLabel}>{option.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  illustrationWrapper: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: spacing.xl,
  },
  cloudBackground: {
    position: 'absolute',
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudPart1: {
    position: 'absolute',
    width: '90%',
    height: '45%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '15%',
  },
  cloudPart2: {
    position: 'absolute',
    width: '55%',
    height: '55%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '35%',
    left: '12%',
  },
  cloudPart3: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '30%',
    right: '15%',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: spacing.md,
  },
  optionItem: {
    alignItems: 'center',
    flex: 1,
  },
  optionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
});