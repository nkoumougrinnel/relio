import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header, Notice } from '../../../components/ui';

export function PaymentConfirmedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proName?: string;
    amount?: string;
    method?: string;
  }>();

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

      <Header title="Paiement confirmé" showBack bordered />

      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={54} color={colors.white} />
        </View>

        <Text style={styles.mainTitle}>Paiement confirmé !</Text>
        <Text style={styles.subtitle}>
          Votre paiement a été enregistré avec succès.
        </Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Montant payé</Text>
          <Text style={styles.amountVal}>{amount} FCFA</Text>
        </View>

        <Notice
          variant="success"
          text="Le QR Code de clôture est disponible."
          icon={
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={colors.success}
            />
          }
        />
      </View>

      <BottomBar>
        <Button title="Voir le QR Code" onPress={handleGoToCloseQR} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});
