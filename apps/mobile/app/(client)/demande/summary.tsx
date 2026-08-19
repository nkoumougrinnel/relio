import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proName?: string;
    diagnostic?: string;
    solution?: string;
    material?: string;
    materialCost?: string;
  }>();

  const proName = params.proName || 'Jean Mbarga';
  const materialCost = params.materialCost || '3 500';

  const relioTariff = 10000; // 2 000 déplacement + 8 000 main d'œuvre

  const handleProceedPayment = () => {
    router.push({
      pathname: '/(client)/demande/payment',
      params: {
        proName,
        amount: relioTariff.toString(),
        materialCost,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 25 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Récapitulatif d'intervention</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Résumé de l'Intervention */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Intervention réalisée</Text>
          <View style={styles.proRow}>
            <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.proNameText}>{proName}</Text>
              <Text style={styles.proRoleText}>Technicien Électricien</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.summaryLabel}>Solution apportée :</Text>
          <Text style={styles.summaryVal}>
            {params.solution || 'Remplacement de la prise monophasée 16A et contrôle de sécurité.'}
          </Text>
        </View>

        {/* Tarif Relio (Main d'œuvre + Déplacement) */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
            <Text style={styles.cardSectionTitle}>Tarif Relio (Paiement In-App)</Text>
          </View>

          <View style={styles.lineRow}>
            <Text style={styles.lineLabel}>Frais de déplacement</Text>
            <Text style={styles.lineVal}>2 000 FCFA</Text>
          </View>
          <View style={styles.lineRow}>
            <Text style={styles.lineLabel}>Main d'œuvre (1h)</Text>
            <Text style={styles.lineVal}>8 000 FCFA</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL TARIF RELIO</Text>
            <Text style={styles.totalVal}>10 000 FCFA</Text>
          </View>
        </View>

        {/* Matériel & Fournitures (Séparé du paiement Relio) */}
        <View style={styles.materialCard}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="build-outline" size={18} color={colors.grayDark} />
            <Text style={styles.materialCardTitle}>Matériel déclaré (Règlement direct)</Text>
          </View>

          <View style={styles.lineRow}>
            <Text style={styles.lineLabel}>
              {params.material || 'Prise Legrand 16A + câble 2.5mm²'}
            </Text>
            <Text style={styles.materialVal}>{materialCost} FCFA</Text>
          </View>

          <View style={styles.materialNoticeBox}>
            <Ionicons name="information-circle-outline" size={16} color={colors.grayDark} style={{ marginRight: 4 }} />
            <Text style={styles.materialNoticeText}>
              Le matériel est réglé directement au prestataire. Il est tracé ci-dessus pour référence et ne fait pas partie du paiement Relio.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payBtn} onPress={handleProceedPayment} activeOpacity={0.88}>
          <Text style={styles.payBtnText}>Procéder au paiement (10 000 FCFA)</Text>
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
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  cardSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: 4,
  },
  proNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  proRoleText: {
    fontSize: 12,
    color: colors.grayDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayDark,
  },
  summaryVal: {
    fontSize: 13,
    color: colors.grayVeryDark,
    lineHeight: 18,
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  lineLabel: {
    fontSize: 14,
    color: colors.grayDark,
  },
  lineVal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },

  /* Matériel Card */
  materialCard: {
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  materialCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  materialVal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  materialNoticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F7FA',
    padding: 8,
    borderRadius: borderRadius.sm,
    marginTop: 6,
  },
  materialNoticeText: {
    flex: 1,
    fontSize: 11,
    color: colors.grayDark,
    lineHeight: 15,
  },

  /* Bottom Bar */
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
