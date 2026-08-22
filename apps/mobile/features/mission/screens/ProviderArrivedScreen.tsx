import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { providerMatchingService } from '../services/provider-matching.service';

export function ProviderArrivedScreen() {
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

  const handleShowQrCode = () => {
    router.push({
      pathname: '/(client)/demande/qrcode',
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

      <Header title="Prestataire arrivé" bordered />

      <View style={styles.content}>
        <View style={styles.illustration}>
          <Image
            source={{ uri: provider.avatarUrl }}
            style={styles.providerImage}
          />
          <View style={styles.door}>
            <View style={styles.doorKnob} />
          </View>
        </View>

        <Text style={styles.title}>{provider.name} est arrivé !</Text>
        <Text style={styles.subtitle}>
          Présentez-lui le QR Code pour commencer l&apos;intervention.
        </Text>
      </View>

      <BottomBar>
        <Button title="Voir le QR Code" onPress={handleShowQrCode} />
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
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 200,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  providerImage: {
    width: 140,
    height: 180,
    borderRadius: 20,
    zIndex: 2,
  },
  door: {
    position: 'absolute',
    right: 10,
    width: 70,
    height: 200,
    borderWidth: 3,
    borderColor: colors.grayMedium,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  doorKnob: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.grayDark,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
  },
});
