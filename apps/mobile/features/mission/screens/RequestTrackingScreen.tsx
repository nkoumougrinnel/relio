import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { providerMatchingService } from '../services/provider-matching.service';
import { serviceRequestService } from '../services/service-request.service';
import { AssignedProviderCard } from '../components/AssignedProviderCard';
import { MissionTimeline } from '../components/MissionTimeline';
import { callProvider } from '../utils/call';

export function RequestTrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    title?: string;
    proName?: string;
    status?: string;
  }>();

  const title = params.title || serviceRequestService.getDefaultRequestTitle();
  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
  });

  const handleJoinActiveStep = () => {
    router.push({
      pathname: '/(client)/demande/ongoing',
      params: { proName: provider.name },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Suivi de ma prestation" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Demande</Text>
          <Text style={styles.requestTitle}>{title}</Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.grayDark}
            />
            <Text style={styles.locationText}>
              {serviceRequestService.getDefaultRequestLocation()}
            </Text>
          </View>
        </View>

        <AssignedProviderCard
          provider={provider}
          onCall={() => callProvider(provider.phone)}
          rating={providerMatchingService.getAssignedProviderRating()}
        />

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Suivi en temps réel</Text>
          <MissionTimeline steps={serviceRequestService.getTimelineSteps()} />
        </View>
      </ScrollView>

      <BottomBar>
        <Button
          title="Rejoindre l'intervention en cours"
          onPress={handleJoinActiveStep}
          leftIcon={
            <Ionicons
              name="play-circle-outline"
              size={20}
              color={colors.white}
            />
          }
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: colors.grayDark,
  },
});
