import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import {
  Badge,
  Button,
  EmptyState,
  Header,
  SegmentedTabs,
} from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { MissionListCard } from '../components/MissionListCard';
import { MissionProgressTimeline } from '../components/MissionProgressTimeline';
import { formatDuration } from '../utils/time';
import { MissionStatus } from '../types';

export function ProviderMissionsScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<MissionStatus>('available');

  const missions = providerMissionService.getMissionsByStatus(status);
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Gestion des missions" bordered />

      <SegmentedTabs
        tabs={providerMissionService.getTabs()}
        value={status}
        onChange={setStatus}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {status === 'ongoing' ? (
          <>
            <View style={styles.ongoingCard}>
              <Badge
                label="En cours · Intervenant sur place"
                variant="success"
                live
              />

              <Text style={styles.ongoingTitle}>{ongoing.title}</Text>

              <View style={styles.ongoingInfoRow}>
                <Feather name="user" size={14} color={colors.primary} />
                <Text style={styles.ongoingInfoText}>
                  Client : {ongoing.client.name} (⭐ {ongoing.client.rating})
                </Text>
              </View>

              <View style={styles.ongoingInfoRow}>
                <Feather name="map-pin" size={14} color={colors.primary} />
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
              size="sm"
              onPress={() =>
                router.push('/(prestataire)/mission/ongoing' as any)
              }
              rightIcon={
                <Feather name="arrow-right" size={18} color={colors.white} />
              }
            />
          </>
        ) : missions.length === 0 ? (
          <EmptyState
            icon={<Feather name="folder" size={32} color={colors.grayMedium} />}
            description="Aucune mission dans cette catégorie"
          />
        ) : (
          missions.map((mission) => (
            <MissionListCard
              key={mission.id}
              mission={mission}
              onPress={() => openMission(mission.status, mission.id)}
            />
          ))
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
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  ongoingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  ongoingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  ongoingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ongoingInfoText: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '600',
  },
  ongoingPriceRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs + 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ongoingPriceLabel: {
    fontSize: 12,
    color: colors.grayMedium,
  },
  ongoingPriceValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  chronoBox: {
    backgroundColor: '#EEF4FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  chronoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.grayDark,
    textTransform: 'uppercase',
  },
  chronoValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
});
