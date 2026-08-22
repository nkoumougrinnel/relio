import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { Header, Notice } from '../../../components/ui';
import { paymentService } from '../services/payment.service';
import { PaymentMethodId } from '../types';
import { SavedPaymentMethodRow } from '../components/SavedPaymentMethodRow';

export function PaymentMethodsScreen() {
  const savedMethods = paymentService.getSavedMethods();
  const [defaultMethod, setDefaultMethod] = useState<PaymentMethodId>(
    paymentService.getDefaultMethodId()
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header
        title="Moyens de paiement"
        showBack
        bordered
        rightElement={
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Nouveau moyen',
                'Saisissez vos identifiants Mobile Money'
              )
            }
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="plus" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {savedMethods.map((method) => (
          <SavedPaymentMethodRow
            key={method.id}
            method={method}
            isDefault={defaultMethod === method.id}
            onPress={() => setDefaultMethod(method.id)}
          />
        ))}

        <Notice
          text="Vos paiements sont sécurisés. Relio ne conserve pas vos fonds."
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.primary}
            />
          }
          style={styles.notice}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  notice: {
    marginTop: spacing.md,
  },
});
