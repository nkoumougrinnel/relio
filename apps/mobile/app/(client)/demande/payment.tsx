import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; amount?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const amount = params.amount || '10 000';

  const handleSelectMethod = (method: 'cash' | 'om' | 'momo') => {
    router.push({
      pathname: '/(client)/demande/payment-confirmed',
      params: {
        proName,
        amount,
        method,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 25D */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choix du paiement</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Illustration Choix de paiement — Maquette 25D */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556742049-0a670c480775?q=80&w=300&auto=format&fit=crop' }}
            style={styles.illustrationImg}
          />
        </View>

        <Text style={styles.mainTitle}>Choisissez votre mode de paiement</Text>

        {/* Option 1 : Espèces — Maquette 25D */}
        <TouchableOpacity style={styles.optionCard} onPress={() => handleSelectMethod('cash')} activeOpacity={0.8}>
          <View style={[styles.optionIconBox, { backgroundColor: '#E8F8F0' }]}>
            <Text style={{ fontSize: 22 }}>💵</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Espèces</Text>
            <Text style={styles.optionSub}>Payez directement au professionnel.</Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.grayMedium} />
        </TouchableOpacity>

        {/* Option 2 : Orange Money — Maquette 25D */}
        <TouchableOpacity style={styles.optionCard} onPress={() => handleSelectMethod('om')} activeOpacity={0.8}>
          <View style={[styles.optionIconBox, { backgroundColor: '#FFF3E0' }]}>
            <Text style={{ fontSize: 22 }}>🍊</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Orange Money</Text>
            <Text style={styles.optionSub}>Paiement rapide et sécurisé via Orange Money.</Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.grayMedium} />
        </TouchableOpacity>

        {/* Option 3 : MTN MoMo — Maquette 25D */}
        <TouchableOpacity style={styles.optionCard} onPress={() => handleSelectMethod('momo')} activeOpacity={0.8}>
          <View style={[styles.optionIconBox, { backgroundColor: '#FFFDE7' }]}>
            <Text style={{ fontSize: 22 }}>🟡</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>MTN MoMo</Text>
            <Text style={styles.optionSub}>Paiement rapide et sécurisé via MTN MoMo.</Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.grayMedium} />
        </TouchableOpacity>

        {/* Notice bas de page — Maquette 25D */}
        <View style={styles.noticeBox}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.noticeText}>Le paiement déclenche l'émission du QR code de clôture.</Text>
        </View>
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

  /* Options */
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  optionSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },

  /* Notice */
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  noticeText: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 16,
  },
});
