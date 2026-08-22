import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Header, Notice } from '../../../components/ui';
import { paymentService } from '../services/payment.service';
import { PaymentMethodId } from '../types';
import { PaymentMethodOptionRow } from '../components/PaymentMethodOptionRow';

export function PaymentMethodChoiceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; amount?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const amount = params.amount || '10 000';

  const methods = paymentService.getMethodOptions();

  const handleSelectMethod = (method: PaymentMethodId) => {
    router.push({
      pathname: '/(client)/demande/payment-confirmed',
      params: { proName, amount, method },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Choix du paiement" showBack bordered />

      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1556742049-0a670c480775?q=80&w=300&auto=format&fit=crop',
            }}
            style={styles.illustrationImg}
          />
        </View>

        <Text style={styles.mainTitle}>Choisissez votre mode de paiement</Text>

        {methods.map((method) => (
          <PaymentMethodOptionRow
            key={method.id}
            option={method}
            onPress={() => handleSelectMethod(method.id)}
          />
        ))}

        <Notice
          variant="neutral"
          text="Le paiement déclenche l'émission du QR code de clôture."
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
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  illustrationImg: {
    width: 140,
    height: 100,
    borderRadius: borderRadius.md,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  notice: {
    marginTop: spacing.md,
  },
});
