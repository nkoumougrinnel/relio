import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireCompletedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ totalAmount?: string; clientName?: string }>();

  const totalAmount = params.totalAmount || '28 500 FCFA';
  const clientName = params.clientName || 'Jean Dupont';

  const handleReturnHome = () => {
    router.replace('/(prestataire)/(tabs)' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.content}>
        {/* En-tête succès */}
        <View style={styles.successHeader}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark-done" size={42} color={colors.success} />
          </View>
          <Text style={styles.title}>Paiement reçu & Mission terminée !</Text>
          <Text style={styles.subtext}>
            Le règlement de {clientName} a été validé avec succès sur votre portefeuille Relio.
          </Text>
        </View>

        {/* Reçu synthétique */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptLabel}>Montant crédité</Text>
          <Text style={styles.receiptAmount}>{totalAmount}</Text>

          <View style={styles.statusBadge}>
            <Feather name="check" size={12} color={colors.success} />
            <Text style={styles.statusBadgeText}>Transféré sur votre solde</Text>
          </View>
        </View>

        {/* Action principale */}
        <TouchableOpacity
          style={styles.homeBtn}
          activeOpacity={0.85}
          onPress={handleReturnHome}
        >
          <Text style={styles.homeBtnText}>Retour à l'accueil Prestataire</Text>
          <Feather name="home" size={18} color={colors.white} />
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
  subtext: {
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    gap: 4,
    marginTop: spacing.xs,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.success,
  },
  homeBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  homeBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
