import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Header, Notice } from '../../../components/ui';
import { serviceRequestService } from '../services/service-request.service';
import { useSimulatedDelay } from '../hooks/useSimulatedDelay';
import { useSteppedProgress } from '../hooks/useSteppedProgress';
import { MatchingProgressSteps } from '../components/MatchingProgressSteps';

const STEP_INTERVAL_MS = 800;
const MATCHING_DURATION_MS = 3200;

export function ProviderSearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    problemText?: string;
    category?: string;
    watch?: string;
  }>();
  const isWatching = params.watch === 'true';

  const steps = serviceRequestService.getMatchingSteps();
  const currentStepIndex = useSteppedProgress(steps.length, STEP_INTERVAL_MS);

  useSimulatedDelay(MATCHING_DURATION_MS, () => {
    if (isWatching) {
      return;
    }

    router.replace({
      pathname: '/(client)/demande/found',
      params: {
        problemText:
          params.problemText || serviceRequestService.getDefaultDescription(),
        category: params.category || 'Électricité',
      },
    } as any);
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Recherche en cours" showBack bordered />

      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.outerRing} />
          <View style={styles.middleRing} />
          <View style={styles.innerCircle}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.message}>
          Nous recherchons le meilleur{'\n'}professionnel pour vous...
        </Text>

        <MatchingProgressSteps steps={steps} currentIndex={currentStepIndex} />

        <Notice
          variant="neutral"
          text="Cela peut prendre jusqu'à 1 minute. Merci de patienter."
          style={styles.notice}
          textStyle={styles.noticeText}
        />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  illustration: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  outerRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0F6FF',
  },
  middleRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E1EDFF',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 44,
    height: 44,
  },
  message: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  notice: {
    width: '100%',
    marginTop: spacing.xl,
    borderRadius: borderRadius.md,
  },
  noticeText: {
    textAlign: 'center',
  },
});
