import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { useCountdown } from '../hooks/useCountdown';
import { InfoCallout } from '../components/InfoCallout';
import { QrCodeMatrix } from '../components/QrCodeMatrix';
import { QrCodeValidity } from '../components/QrCodeValidity';

export function ProviderClosingQrCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    totalAmount?: string;
    clientName?: string;
  }>();

  const settlement = providerMissionService.getDefaultSettlement();
  const totalAmount = params.totalAmount || settlement.totalAmount;
  const clientName = params.clientName || settlement.clientName;

  const { seconds } = useCountdown(
    providerMissionService.getClosingQrValiditySeconds()
  );

  const handleScanned = () => {
    router.push({
      pathname: '/(prestataire)/mission/completed',
      params: { totalAmount, clientName },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="QR Code de clôture" bordered />

      <View style={styles.content}>
        <InfoCallout
          icon={
            <Ionicons name="qr-code-outline" size={24} color={colors.primary} />
          }
          title="Montrez ce QR Code au client"
          text={`Paiement de ${totalAmount} reçu ! Le client ${clientName} doit scanner ce code pour valider la clôture finale.`}
          style={styles.callout}
        />

        <QrCodeMatrix badgeLabel="relio PRO" />

        <QrCodeValidity seconds={seconds} label="QR Code de clôture valide" />

        <Button
          title="Le client a scanné le QR Code"
          variant="success"
          onPress={handleScanned}
          leftIcon={
            <Ionicons
              name="checkmark-done-circle-outline"
              size={20}
              color={colors.white}
            />
          }
          style={styles.action}
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
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  callout: {
    width: '100%',
    marginTop: spacing.sm,
  },
  action: {
    width: '100%',
  },
});
