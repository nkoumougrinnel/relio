import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { InterventionJournalForm } from '../components/InterventionJournalForm';
import { InfoCallout } from '../components/InfoCallout';
import { InterventionJournal } from '../types';

export function ProviderJournalScreen() {
  const router = useRouter();

  const { clientName } = providerMissionService.getDefaultSettlement();
  const [journal, setJournal] = useState<InterventionJournal>(
    providerMissionService.getJournalDraft()
  );

  const updateJournal = (patch: Partial<InterventionJournal>) => {
    setJournal((current) => ({ ...current, ...patch }));
  };

  const handleSubmit = () => {
    if (!journal.diagnostic.trim()) {
      Alert.alert('Champ requis', 'Veuillez saisir le diagnostic obligatoire.');
      return;
    }

    router.push({
      pathname: '/(prestataire)/mission/waiting-payment',
      params: { clientName, materialCost: journal.materialCost },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Journal d'intervention" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <InfoCallout
          icon={
            <Ionicons
              name="document-text-outline"
              size={22}
              color={colors.primary}
            />
          }
          title="Remplissez le journal obligatoire"
          text={`Le client ${clientName} verra la facture et le récapitulatif pour procéder au paiement.`}
        />

        <InterventionJournalForm
          journal={journal}
          onChange={updateJournal}
          samplePhotoUri={providerMissionService.getBillPhotoUri()}
          materialLabel="Matériel & Fournitures installés"
          materialCostLabel="Montant total du matériel (FCFA)"
          materialNote="* Le matériel est facturé en supplément du Tarif Relio et remboursé directement."
          commentLabel="Commentaires / Recommandations au client"
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomBar>
        <Button
          title="Transmettre le journal au client"
          onPress={handleSubmit}
          rightIcon={<Feather name="send" size={18} color={colors.white} />}
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
    padding: spacing.lg,
    gap: spacing.md,
  },
  bottomSpacer: {
    height: 20,
  },
});
