import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';
import { Button, EmptyState, Header, SegmentedTabs } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { AvailableMissionCard } from '../components/AvailableMissionCard';
import { FinishedMissionCard } from '../components/FinishedMissionCard';
import { MissionProgressTimeline } from '../components/MissionProgressTimeline';
import { formatDuration } from '../utils/time';
import { MissionStatus } from '../types';

export function ProviderMissionsScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<MissionStatus>('available');

  const opportunities = providerMissionService.getOpportunities();
  const finishedMissions = providerMissionService.getMissionsByStatus('done');
  const ongoing = providerMissionService.getOngoingMission();

  const openMission = (missionStatus: MissionStatus, id: string) => {
    router.push({
      pathname:
        missionStatus === 'ongoing'
          ? '/(prestataire)/mission/ongoing'
          : '/(prestataire)/mission/detail',
      params: { id },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Gestion des missions" style={styles.header} />

      <SegmentedTabs
        tabs={providerMissionService.getTabs()}
        value={status}
        onChange={setStatus}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {status === 'available' ? (
          opportunities.length === 0 ? (
            <EmptyState
              variant="card"
              icon={<Feather name="inbox" size={28} color={colors.primary} />}
              title="Aucune mission disponible"
              description="Nous vous préviendrons dès qu'une opportunité correspondant à votre profil sera proposée."
            />
          ) : (
            <View style={styles.availableList}>
              {opportunities.map((opportunity) => (
                <AvailableMissionCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onPress={() => openMission('available', opportunity.id)}
                />
              ))}
            </View>
          )
        ) : status === 'done' ? (
          finishedMissions.length === 0 ? (
            <EmptyState
              variant="card"
              icon={
                <Feather name="check-circle" size={28} color={colors.success} />
              }
              title="Aucune mission terminée"
              description="Vos prestations passées et leurs rémunérations apparaîtront ici."
            />
          ) : (
            <View style={styles.finishedList}>
              {finishedMissions.map((mission) => (
                <FinishedMissionCard
                  key={mission.id}
                  mission={mission}
                  onPress={() => openMission(mission.status, mission.id)}
                />
              ))}
            </View>
          )
        ) : (
          <>
            <View style={styles.ongoingCard}>
              <Text style={styles.ongoingTitle}>{ongoing.title}</Text>

              <View style={styles.ongoingInfoRow}>
                <Feather name="user" size={15} color={colors.primary} />
                <Text style={styles.ongoingInfoText}>{ongoing.client.name}</Text>
              </View>

              <View style={styles.ongoingInfoRow}>
                <Feather name="map-pin" size={15} color={colors.primary} />
                <Text style={styles.ongoingInfoText}>{ongoing.location}</Text>
              </View>

              <View style={styles.ongoingPriceRow}>
                <Text style={styles.ongoingPriceLabel}>Montant convenu</Text>
                <Text style={styles.ongoingPriceValue}>{ongoing.price}</Text>
              </View>
            </View>

            <View style={styles.chronoBox}>
              <Text style={styles.chronoLabel}>Temps d&apos;intervention</Text>
              <Text style={styles.chronoValue}>
                {formatDuration(ongoing.elapsedSeconds)}
              </Text>
            </View>

            <MissionProgressTimeline
              title="Suivi d'avancement"
              steps={providerMissionService.getProgressTimeline()}
            />

            <Button
              title="Ouvrir le suivi de l'intervention"
              onPress={() =>
                router.push('/(prestataire)/mission/ongoing' as any)
              }
              rightIcon={
                <Feather name="arrow-right" size={18} color={colors.white} />
              }
            />
          </>
        )}
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
    height: 64,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  availableList: {
    gap: spacing.md,
  },
  finishedList: {
    gap: spacing.sm + 2,
  },
  ongoingCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ongoingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.md,
  },
  ongoingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  ongoingInfoText: {
    flex: 1,
    fontSize: 14,
    color: colors.grayDark,
    fontWeight: '600',
  },
  ongoingPriceRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ongoingPriceLabel: {
    fontSize: 13,
    color: colors.grayMedium,
    fontWeight: '600',
  },
  ongoingPriceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  chronoBox: {
    backgroundColor: '#EEF4FF',
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  chronoLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.grayDark,
    textTransform: 'uppercase',
  },
  chronoValue: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
});
