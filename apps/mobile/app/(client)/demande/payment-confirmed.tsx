import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PaymentConfirmedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; amount?: string; method?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const amount = params.amount || '10 000';

  const handleGoToCloseQR = () => {
    router.push({
      pathname: '/(client)/demande/qrcode-close',
      params: { proName, amount },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 27 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement confirmé</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Large Green Check Circle — Maquette 27 */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={54} color={colors.white} />
        </View>

        <Text style={styles.mainTitle}>Paiement confirmé !</Text>
        <Text style={styles.subtitle}>Votre paiement a été enregistré avec succès.</Text>

        {/* Box Montant Payé — Maquette 27 */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Montant payé</Text>
          <Text style={styles.amountVal}>{amount} FCFA</Text>
        </View>

        {/* Badge QR Disponible — Maquette 27 */}
        <View style={styles.badgeBox}>
          <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} style={{ marginRight: 6 }} />
          <Text style={styles.badgeText}>Le QR Code de clôture est disponible.</Text>
        </View>
      </View>

      {/* Bottom Bar — Maquette 27 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.qrBtn} onPress={handleGoToCloseQR} activeOpacity={0.88}>
          <Text style={styles.qrBtnText}>Voir le QR Code</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Circle */
  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  /* Amount Card */
  amountCard: {
    width: '100%',
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  amountLabel: {
    fontSize: 13,
    color: colors.grayDark,
    marginBottom: 4,
  },
  amountVal: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.grayVeryDark,
  },

  /* Badge Box */
  badgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F0',
    borderWidth: 1,
    borderColor: '#B8EAD0',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    width: '100%',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.success,
  },

  /* Bottom Bar */
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  qrBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
