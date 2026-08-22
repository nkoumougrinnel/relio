import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { interventionService } from '../services/intervention.service';
import { providerMatchingService } from '../services/provider-matching.service';
import { TariffBreakdownCard } from '../components/TariffBreakdownCard';
import { DeclaredMaterialCard } from '../components/DeclaredMaterialCard';

export function InterventionSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proName?: string;
    diagnostic?: string;
    solution?: string;
    material?: string;
    materialCost?: string;
  }>();

  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
  });

  const tariff = interventionService.getTariffBreakdown();
  const materialCost =
    params.materialCost || interventionService.getDefaultMaterialCost();
  const material =
    params.material || interventionService.getDefaultMaterialLabel();
  const solution =
    params.solution || interventionService.getDefaultSolution();

  const handleProceedToPayment = () => {
    router.push({
      pathname: '/(client)/demande/payment',
      params: {
        proName: provider.name,
        amount: tariff.totalAmount.toString(),
        materialCost,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Récapitulatif d'intervention" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Intervention réalisée</Text>

          <View style={styles.providerRow}>
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={colors.primary}
            />
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.solutionLabel}>Solution apportée :</Text>
          <Text style={styles.solutionText}>{solution}</Text>
        </View>

        <TariffBreakdownCard breakdown={tariff} />

        <DeclaredMaterialCard label={material} amount={materialCost} />
      </ScrollView>

      <BottomBar>
        <Button
          title={`Procéder au paiement (${tariff.total})`}
          onPress={handleProceedToPayment}
        />
      </BottomBar>
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
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: 4,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  providerSpecialty: {
    fontSize: 12,
    color: colors.grayDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  solutionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayDark,
  },
  solutionText: {
    fontSize: 13,
    color: colors.grayVeryDark,
    lineHeight: 18,
  },
});
