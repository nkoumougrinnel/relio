import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [defaultMethod, setDefaultMethod] = useState<'om' | 'momo' | 'cash'>('om');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 34 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Moyens de paiement</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => Alert.alert('Nouveau moyen', 'Saisissez vos identifiants Mobile Money')}
          activeOpacity={0.7}
        >
          <Feather name="plus" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Option Orange Money — Maquette 34 */}
        <TouchableOpacity
          style={[styles.card, defaultMethod === 'om' && styles.cardActive]}
          onPress={() => setDefaultMethod('om')}
          activeOpacity={0.8}
        >
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 24 }}>🍊</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text style={styles.methodName}>Orange Money</Text>
              {defaultMethod === 'om' && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Par défaut</Text>
                </View>
              )}
            </View>
            <Text style={styles.methodNumber}>+237 6 95 12 34 56</Text>
          </View>
          <Ionicons
            name={defaultMethod === 'om' ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={defaultMethod === 'om' ? colors.primary : colors.grayMedium}
          />
        </TouchableOpacity>

        {/* Option MTN MoMo — Maquette 34 */}
        <TouchableOpacity
          style={[styles.card, defaultMethod === 'momo' && styles.cardActive]}
          onPress={() => setDefaultMethod('momo')}
          activeOpacity={0.8}
        >
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 24 }}>🟡</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text style={styles.methodName}>MTN MoMo</Text>
              {defaultMethod === 'momo' && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Par défaut</Text>
                </View>
              )}
            </View>
            <Text style={styles.methodNumber}>+237 6 98 54 32 10</Text>
          </View>
          <Ionicons
            name={defaultMethod === 'momo' ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={defaultMethod === 'momo' ? colors.primary : colors.grayMedium}
          />
        </TouchableOpacity>

        {/* Option Espèces — Maquette 34 */}
        <TouchableOpacity
          style={[styles.card, defaultMethod === 'cash' && styles.cardActive]}
          onPress={() => setDefaultMethod('cash')}
          activeOpacity={0.8}
        >
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 24 }}>💵</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text style={styles.methodName}>Espèces</Text>
              {defaultMethod === 'cash' && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Par défaut</Text>
                </View>
              )}
            </View>
            <Text style={styles.methodNumber}>Paiement direct en espèces</Text>
          </View>
          <Ionicons
            name={defaultMethod === 'cash' ? 'radio-button-on' : 'radio-button-off'}
            size={22}
            color={defaultMethod === 'cash' ? colors.primary : colors.grayMedium}
          />
        </TouchableOpacity>

        {/* Banner Sécurité — Maquette 34 */}
        <View style={styles.securityBox}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
          <Text style={styles.securityText}>
            Vos paiements sont sécurisés. Relio ne conserve pas vos fonds.
          </Text>
        </View>
      </ScrollView>
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
  addBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FAFCFF',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  defaultBadge: {
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
  },
  methodNumber: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
    lineHeight: 16,
  },
});
