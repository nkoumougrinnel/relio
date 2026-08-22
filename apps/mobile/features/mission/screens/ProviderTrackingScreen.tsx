import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header, Notice } from '../../../components/ui';
import { providerMatchingService } from '../services/provider-matching.service';
import { AssignedProviderCard } from '../components/AssignedProviderCard';
import { LocationPills } from '../components/LocationPills';
import { RouteMapPreview } from '../components/RouteMapPreview';
import { useSimulatedDelay } from '../hooks/useSimulatedDelay';
import { callProvider } from '../utils/call';

const ARRIVAL_DELAY_MS = 4500;

export function ProviderTrackingScreen() {
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

  useSimulatedDelay(ARRIVAL_DELAY_MS, () => {
    router.replace({
      pathname: '/(client)/demande/arrived',
      params: {
        proName: provider.name,
        phone: provider.phone,
        specialty: provider.specialty,
      },
    } as any);
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Prestataire en route" showBack bordered />

      <View style={styles.content}>
        <Text style={styles.title}>
          {provider.name} est en route{'\n'}vers votre position.
        </Text>

        <AssignedProviderCard
          provider={provider}
          onCall={() => callProvider(provider.phone)}
        >
          <LocationPills
            distance={providerMatchingService.getDistanceToClient()}
            eta={`${providerMatchingService.getEtaMinutes()} min arrivée estimée`}
          />
        </AssignedProviderCard>

        <RouteMapPreview providerAvatarUrl={provider.avatarUrl} />

        <Notice
          variant="neutral"
          text="Vous serez notifié à son arrivée."
          icon={
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.primary}
            />
          }
          style={styles.notice}
          textStyle={styles.noticeText}
        />
      </View>

      <BottomBar>
        <Button
          title="Appeler"
          onPress={() => callProvider(provider.phone)}
          leftIcon={<Ionicons name="call" size={18} color={colors.white} />}
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
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  notice: {
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  noticeText: {
    flex: 0,
    fontWeight: '500',
  },
});
