import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge, BottomBar, Button, Header } from '../../../components/ui';
import { interventionService } from '../services/intervention.service';
import { providerMatchingService } from '../services/provider-matching.service';
import { useElapsedTime } from '../hooks/useElapsedTime';
import { AssignedProviderCard } from '../components/AssignedProviderCard';
import { InterventionTimerCard } from '../components/InterventionTimerCard';
import { callProvider } from '../utils/call';

export function InterventionInProgressScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    proName?: string;
    phone?: string;
    specialty?: string;
  }>();

  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
    specialty: params.specialty,
    phone: params.phone,
  });

  const seconds = useElapsedTime(interventionService.getElapsedSeconds());

  const handleReportIssue = () => {
    Alert.alert(
      'Signaler un problème',
      'Un administrateur Relio va être notifié pour vous contacter.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => Alert.alert('Signalement envoyé') },
      ]
    );
  };

  const handleSeeSummary = () => {
    router.push({
      pathname: '/(client)/demande/summary',
      params: {
        proName: provider.name,
        phone: provider.phone,
        specialty: provider.specialty,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Intervention en cours" bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AssignedProviderCard
          provider={provider}
          onCall={() => callProvider(provider.phone)}
        />

        <InterventionTimerCard
          seconds={seconds}
          caption={`Intervention en cours depuis ${interventionService.getStartedAtLabel()}`}
        />

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Statut</Text>
            <Badge label="En cours" variant="success" />
          </View>

          <Text style={styles.statusDescription}>
            {provider.name} travaille sur votre problème. Vous serez notifié à la
            fin de l&apos;intervention.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.summaryBtn}
          onPress={handleSeeSummary}
          activeOpacity={0.85}
        >
          <Ionicons
            name="checkmark-done-circle-outline"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.summaryBtnText}>
            Terminer l&apos;intervention (Voir récapitulatif)
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomBar>
        <Button
          title="Signaler un problème"
          variant="dangerOutline"
          onPress={handleReportIssue}
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
  statusCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  statusDescription: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 18,
  },
  summaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F6FF',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    gap: 6,
  },
  summaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
