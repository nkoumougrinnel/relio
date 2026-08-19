import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireWaitingPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ clientName?: string; materialCost?: string }>();

  const clientName = params.clientName || 'Jean Dupont';
  const materialCost = params.materialCost || '3 500';
  const totalAmount = '28 500 FCFA';

  const handlePaymentCompleted = () => {
    router.push({
      pathname: '/(prestataire)/mission/qrcode-close',
      params: { totalAmount, clientName },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={{ width: 40 }} />
        <Text style={styles.topBarTitle}>Attente de paiement</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Loader Animation */}
        <View style={styles.statusBox}>
          <View style={styles.spinnerCircle}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
          <Text style={styles.statusTitle}>En attente du paiement client</Text>
          <Text style={styles.statusSub}>
            Le journal d'intervention a été transmis avec succès. Le client {clientName} consulte le récapitulatif et effectue le paiement.
          </Text>
        </View>

        {/* Détails du montant à percevoir */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Montant à percevoir</Text>
          <Text style={styles.amountValue}>{totalAmount}</Text>

          <View style={styles.breakdownDivider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Main d'œuvre & Déplacement Tarif Relio</Text>
            <Text style={styles.breakdownVal}>25 000 FCFA</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Matériel remboursé ({materialCost} FCFA)</Text>
            <Text style={styles.breakdownVal}>3 500 FCFA</Text>
          </View>
        </View>

        {/* Simulation du paiement reçu pour la démo */}
        <TouchableOpacity
          style={styles.simulatePaymentBtn}
          activeOpacity={0.85}
          onPress={handlePaymentCompleted}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color={colors.white} />
          <Text style={styles.simulatePaymentBtnText}>Simuler : Paiement client reçu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
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
  simulatePaymentBtn: {
    width: '100%',
    backgroundColor: colors.success,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  simulatePaymentBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
