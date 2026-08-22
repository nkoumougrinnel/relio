import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { Header, Notice } from '../../../components/ui';
import { interventionService } from '../services/intervention.service';
import { providerMatchingService } from '../services/provider-matching.service';
import { useCountdown } from '../hooks/useCountdown';
import { useSimulatedDelay } from '../hooks/useSimulatedDelay';
import { QrCodeMatrix } from '../components/QrCodeMatrix';
import { QrCodeValidity } from '../components/QrCodeValidity';

const SCAN_DELAY_MS = 4500;

export function OpeningQrCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proName?: string;
    phone?: string;
    specialty?: string;
  }>();

  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
    specialty: params.specialty,
    phone: params.phone,
  });

  const { seconds } = useCountdown(
    interventionService.getQrCodeValiditySeconds()
  );

  useSimulatedDelay(SCAN_DELAY_MS, () => {
    router.replace({
      pathname: '/(client)/demande/ongoing',
      params: {
        proName: provider.name,
        phone: provider.phone,
        specialty: provider.specialty,
      },
    } as any);
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="QR Code d'ouverture" showBack bordered />

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Montrez ce QR Code à {provider.name}
          {'\n'}pour démarrer l&apos;intervention.
        </Text>

        <QrCodeMatrix style={styles.matrix} />

        <QrCodeValidity seconds={seconds} style={styles.validity} />

        <Notice
          variant="neutral"
          text="Le QR Code expire dans 2 minutes pour des raisons de sécurité."
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
