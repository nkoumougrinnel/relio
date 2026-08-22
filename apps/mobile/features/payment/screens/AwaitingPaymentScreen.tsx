import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Button, Header } from '../../../components/ui';
import { paymentService } from '../services/payment.service';

export function AwaitingPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    clientName?: string;
    materialCost?: string;
  }>();

  const pendingPayment = paymentService.getPendingPayment({
    clientName: params.clientName || 'Jean Dupont',
    materialCost: params.materialCost || '3 500',
  });

  const handlePaymentCompleted = () => {
    router.push({
      pathname: '/(prestataire)/mission/qrcode-close',
      params: {
        totalAmount: pendingPayment.totalAmount,
        clientName: pendingPayment.clientName,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Attente de paiement" bordered />

      <View style={styles.content}>
        <View style={styles.statusBox}>
          <View style={styles.spinnerCircle}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
          <Text style={styles.statusTitle}>En attente du paiement client</Text>
          <Text style={styles.statusSub}>
            Le journal d&apos;intervention a été transmis avec succès. Le client{' '}
            {pendingPayment.clientName} consulte le récapitulatif et effectue le
            paiement.
          </Text>
        </View>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Montant à percevoir</Text>
          <Text style={styles.amountValue}>{pendingPayment.totalAmount}</Text>

          <View style={styles.breakdownDivider} />

          {pendingPayment.breakdown.map((line) => (
            <View key={line.label} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{line.label}</Text>
              <Text style={styles.breakdownVal}>{line.amount}</Text>
            </View>
          ))}
        </View>

        <Button
          title="Simuler : Paiement client reçu"
          variant="success"
          onPress={handlePaymentCompleted}
          leftIcon={
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={colors.white}
            />
          }
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
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  statusBox: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  spinnerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  statusSub: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: spacing.md,
  },
  amountCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.success,
    marginVertical: 4,
  },
  breakdownDivider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  breakdownRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  breakdownLabel: {
    fontSize: 12,
    color: colors.grayDark,
  },
  breakdownVal: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
});
