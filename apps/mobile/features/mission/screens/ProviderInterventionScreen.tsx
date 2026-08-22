import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge, Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { useElapsedTime } from '../hooks/useElapsedTime';
import { MissionClientCard } from '../components/MissionClientCard';
import { MissionProgressTimeline } from '../components/MissionProgressTimeline';
import { formatDuration } from '../utils/time';
import { callProvider } from '../utils/call';

export function ProviderInterventionScreen() {
  const router = useRouter();

  const mission = providerMissionService.getOngoingMission();
  const seconds = useElapsedTime(mission.elapsedSeconds);

  const handleFinish = () => {
    router.push('/(prestataire)/mission/journal' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Intervention en cours" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MissionClientCard
          client={mission.client}
          location={mission.location}
          onCall={() => callProvider(mission.client.phone)}
        />

        <View style={styles.chronoCard}>
          <Text style={styles.chronoLabel}>Durée de l&apos;intervention</Text>
          <Text style={styles.chronoDigits}>{formatDuration(seconds)}</Text>
          <Badge label="Intervention active" variant="success" live />
        </View>

        <View style={styles.serviceCard}>
          <Text style={styles.serviceCategory}>{mission.categoryLabel}</Text>
          <Text style={styles.serviceTitle}>{mission.title}</Text>
          <Text style={styles.servicePrice}>Tarif : {mission.price}</Text>
        </View>

        <MissionProgressTimeline
          title="Avancement de l'intervention"
          steps={providerMissionService.getProgressTimeline()}
        />

        <Button
          title="Déclarer la fin du travail"
          variant="success"
          onPress={handleFinish}
          rightIcon={
            <Feather name="check-circle" size={20} color={colors.white} />
          }
        />

        <View style={styles.bottomSpacer} />
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
    padding: spacing.lg,
    gap: spacing.lg,
  },
  chronoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D4E3FF',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  chronoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chronoDigits: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    marginVertical: 4,
  },
  serviceCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginTop: 2,
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 40,
  },
});
