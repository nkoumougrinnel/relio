import React from 'react';
import { DimensionValue, ImageSourcePropType, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';
import { OnboardingIllustration, OnboardingOption } from './OnboardingIllustration';
import { OnboardingProgress } from './OnboardingProgress';

interface OnboardingSlideProps {
  title: string;
  subtitle: React.ReactNode;
  image: ImageSourcePropType;
  options: OnboardingOption[];
  currentStep: number;
  onNext: () => void;
  illustrationWidth?: DimensionValue;
}

export function OnboardingSlide({
  title,
  subtitle,
  image,
  options,
  currentStep,
  onNext,
  illustrationWidth = '90%',
}: OnboardingSlideProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.mainSection}>
          <OnboardingIllustration
            image={image}
            options={options}
            width={illustrationWidth}
          />
        </View>

        <OnboardingProgress currentStep={currentStep} onNext={onNext} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'left',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayDark,
    textAlign: 'left',
    lineHeight: 24,
  },
  mainSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});