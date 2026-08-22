import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import {
  BrandHeader,
  Button,
  EmptyState,
  ModeSwitchBadge,
  StatCard,
} from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { MissionOpportunityCard } from '../components/MissionOpportunityCard';
import { AvailabilityCard } from '../components/AvailabilityCard';

export function ProviderHomeScreen() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [index, setIndex] = useState(0);

  const opportunities = isAvailable
    ? providerMissionService.getOpportunities()
    : [];
  const summary = providerMissionService.getDailySummary();
  const opportunity = opportunities[index] ?? opportunities[0];

  const isFirst = index === 0;
  const isLast = index === opportunities.length - 1;

  const openMission = (missionId: string) => {
    router.push({
      pathname: '/(prestataire)/mission/detail',
      params: { id: missionId },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader hasNotifications />

        <View style={styles.greetingRow}>
          <Text style={styles.greeting}>Bonjour Jean 👋</Text>
          <ModeSwitchBadge
            label="Prestataire"
            onPress={() => router.replace('/(client)/(tabs)' as any)}
          />
        </View>

        <AvailabilityCard
          available={isAvailable}
          onChange={setIsAvailable}
          style={styles.availability}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Missions disponibles</Text>
              <Text style={styles.sectionSubtitle}>
                {isAvailable
                  ? `${opportunities.length} mission${
                      opportunities.length > 1 ? 's' : ''
                    } près de vous`
                  : 'Mode indisponible actif'}
              </Text>
            </View>

            {opportunities.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  router.push('/(prestataire)/(tabs)/missions' as any)
                }
              >
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            )}
          </View>

          {!isAvailable && (
            <EmptyState
              variant="card"
              icon={<Feather name="moon" size={24} color={colors.grayDark} />}
              title="Vous êtes indisponible"
              description="Activez votre disponibilité pour recevoir des opportunités en temps réel."
              action={
                <Button
                  title="Devenir disponible"
                  size="sm"
                  onPress={() => setIsAvailable(true)}
                />
              }
            />
          )}

          {isAvailable && opportunities.length === 0 && (
            <EmptyState
              variant="card"
              icon={<Feather name="inbox" size={24} color={colors.primary} />}
              title="Aucune mission pour le moment"
              description="Nous vous préviendrons dès qu'une mission correspondant à votre profil sera disponible."
            />
          )}

          {isAvailable && opportunity && (
            <>
              <MissionOpportunityCard
                opportunity={opportunity}
                onPress={() => openMission(opportunity.id)}
              />

              {opportunities.length > 1 && (
                <View style={styles.navRow}>
                  <TouchableOpacity
                    style={[styles.arrowBtn, isFirst && styles.arrowBtnDisabled]}
                    disabled={isFirst}
                    activeOpacity={0.7}
                    onPress={() => setIndex((current) => current - 1)}
                  >
                    <Feather
                      name="chevron-left"
                      size={20}
                      color={isFirst ? colors.grayMedium : colors.grayVeryDark}
                    />
                  </TouchableOpacity>

                  <View style={styles.counter}>
                    <Text style={styles.counterText}>
                      Demande{' '}
                      <Text style={styles.counterHighlight}>{index + 1}</Text>{' '}
                      sur {opportunities.length}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.arrowBtn, isLast && styles.arrowBtnDisabled]}
                    disabled={isLast}
                    activeOpacity={0.7}
                    onPress={() => setIndex((current) => current + 1)}
                  >
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={isLast ? colors.grayMedium : colors.grayVeryDark}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.standaloneTitle]}>
            Aujourd&apos;hui
          </Text>

          <View style={styles.summaryRow}>
            <StatCard
              icon={
                <Feather name="check-circle" size={18} color={colors.primary} />
              }
              label="Missions"
              value={`${summary.missionCount}`}
              hint={summary.missionDetail}
            />
            <StatCard
              icon={
                <Feather name="dollar-sign" size={18} color={colors.success} />
              }
              iconBackground="#E8F8F0"
              label="Revenus"
              value={summary.earnings}
              hint="aujourd'hui"
            />
          </View>
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
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  availability: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  standaloneTitle: {
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  arrowBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBtnDisabled: {
    backgroundColor: '#F7F9FC',
    opacity: 0.5,
  },
  counter: {
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  counterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  counterHighlight: {
    color: colors.primary,
    fontWeight: '800',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
