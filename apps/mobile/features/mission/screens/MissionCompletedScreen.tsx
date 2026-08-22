import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge, Button } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';

export function MissionCompletedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    totalAmount?: string;
    clientName?: string;
  }>();

  const settlement = providerMissionService.getDefaultSettlement();
  const totalAmount = params.totalAmount || settlement.totalAmount;
  const clientName = params.clientName || settlement.clientName;

  const handleReturnHome = () => {
    router.replace('/(prestataire)/(tabs)' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.content}>
        <View style={styles.successHeader}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark-done" size={42} color={colors.success} />
          </View>
          <Text style={styles.title}>Paiement reçu & Mission terminée !</Text>
          <Text style={styles.subtitle}>
            Le règlement de {clientName} a été validé avec succès sur votre
            portefeuille Relio.
          </Text>
        </View>

        <View style={styles.receiptCard}>
          <Text style={styles.receiptLabel}>Montant crédité</Text>
          <Text style={styles.receiptAmount}>{totalAmount}</Text>
          <Badge
            label="Transféré sur votre solde"
            variant="success"
            icon={<Feather name="check" size={12} color={colors.success} />}
            style={styles.receiptBadge}
          />
        </View>

        <Button
          title="Retour à l'accueil Prestataire"
          onPress={handleReturnHome}
          rightIcon={<Feather name="home" size={18} color={colors.white} />}
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
  successHeader: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  successIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E8F8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: spacing.md,
  },
  receiptCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  receiptLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  receiptAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: spacing.xs,
  },
  receiptBadge: {
    marginTop: spacing.xs,
  },
  action: {
    width: '100%',
  },
});
