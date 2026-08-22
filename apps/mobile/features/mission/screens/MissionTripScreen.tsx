import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { MissionClientCard } from '../components/MissionClientCard';
import { TripPreview } from '../components/TripPreview';
import { InfoCallout } from '../components/InfoCallout';
import { callProvider } from '../utils/call';

export function MissionTripScreen() {
  const router = useRouter();

  const trip = providerMissionService.getTrip();

  const handleArrived = () => {
    router.push('/(prestataire)/mission/arrived' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Prestataire en route" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TripPreview trip={trip} />

        <MissionClientCard
          client={trip.client}
          location={trip.destination}
          onCall={() => callProvider(trip.client.phone)}
        />

        <InfoCallout
          icon={<Feather name="info" size={18} color={colors.primary} />}
          title="Arrivée chez le client"
          text={
            'Une fois sur place, cliquez sur "Je suis arrivé" puis scannez le QR Code présent sur le téléphone du client pour démarrer le chrono.'
          }
        />

        <Button
          title="Je suis arrivé sur place"
          variant="success"
          onPress={handleArrived}
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
  bottomSpacer: {
    height: 40,
  },
});
