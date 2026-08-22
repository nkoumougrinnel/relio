import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { interventionService } from '../services/intervention.service';
import { providerMatchingService } from '../services/provider-matching.service';
import { InterventionJournalForm } from '../components/InterventionJournalForm';
import { InterventionJournal } from '../types';

export function InterventionJournalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proName?: string;
    phone?: string;
    specialty?: string;
  }>();

  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
  });

  const [journal, setJournal] = useState<InterventionJournal>(
    interventionService.getJournal()
  );

  const updateJournal = (patch: Partial<InterventionJournal>) => {
    setJournal((previous) => ({ ...previous, ...patch }));
  };

  const handleValidate = () => {
    router.push({
      pathname: '/(client)/demande/summary',
      params: {
        proName: provider.name,
        diagnostic: journal.diagnostic,
        solution: journal.solution,
        material: journal.material,
        materialCost: journal.materialCost,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Journal d'intervention" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={colors.primary}
          />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>
              Rapport rédigé par {provider.name}
            </Text>
            <Text style={styles.bannerSubtitle}>
              Ce journal est obligatoire avant d&apos;accéder au paiement.
            </Text>
          </View>
        </View>

        <InterventionJournalForm
          journal={journal}
          onChange={updateJournal}
          samplePhotoUri={interventionService.getBillPhotoUri()}
          materialNote="* Le matériel est tracé pour référence et sera réglé directement au prestataire."
        />
      </ScrollView>

      <BottomBar>
        <Button
          title="Valider le journal & voir le récapitulatif"
          onPress={handleValidate}
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.sm,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
});
