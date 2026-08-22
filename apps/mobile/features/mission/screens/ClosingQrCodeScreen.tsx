import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { BottomBar, Button, Header, Notice } from '../../../components/ui';
import { interventionService } from '../services/intervention.service';
import { providerMatchingService } from '../services/provider-matching.service';
import { useCountdown } from '../hooks/useCountdown';
import { useSimulatedDelay } from '../hooks/useSimulatedDelay';
import { QrCodeMatrix } from '../components/QrCodeMatrix';
import { QrCodeValidity } from '../components/QrCodeValidity';

const SCAN_DELAY_MS = 4500;

export function ClosingQrCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; amount?: string }>();

  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
  });

  const { seconds, reset } = useCountdown(
    interventionService.getQrCodeValiditySeconds()
  );

  useSimulatedDelay(SCAN_DELAY_MS, () => {
    router.replace({
      pathname: '/(client)/demande/review',
      params: { proName: provider.name },
    } as any);
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="QR Code de clôture" showBack bordered />

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Montrez ce QR Code au professionnel{'\n'}pour clôturer
          l&apos;intervention.
        </Text>

        <QrCodeMatrix style={styles.matrix} />

        <QrCodeValidity seconds={seconds} style={styles.validity} />

        <Notice
          variant="neutral"
          text="Le QR code expire dans 2 minutes pour des raisons de sécurité."
          icon={
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
            />
          }
          style={styles.notice}
        />
      </View>

      <BottomBar>
        <Button
          title="Actualiser le QR Code"
          variant="outline"
          onPress={reset}
          leftIcon={
            <Feather name="refresh-cw" size={16} color={colors.primary} />
          }
        />
      </BottomBar>
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
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  matrix: {
    marginBottom: spacing.lg,
  },
  validity: {
    marginBottom: spacing.xl,
  },
  notice: {
    maxWidth: '90%',
  },
});
