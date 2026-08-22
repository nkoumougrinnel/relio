import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { QrScannerFrame } from '../components/QrScannerFrame';

const SCAN_DURATION_MS = 1200;

export function MissionArrivalScreen() {
  const router = useRouter();

  const trip = providerMissionService.getTrip();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      router.push('/(prestataire)/mission/ongoing' as any);
    }, SCAN_DURATION_MS);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Validation d'arrivée" showBack bordered />

      <View style={styles.content}>
        <View style={styles.headerBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="qr-code-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>Scannez le QR Code Client</Text>
          <Text style={styles.subtitle}>
            Présentez la caméra du téléphone devant le QR Code généré par{' '}
            {trip.client.name} pour démarrer automatiquement le chrono.
          </Text>
        </View>

        <QrScannerFrame scanning={isScanning} />

        <Button
          title="Scanner le QR Code"
          onPress={handleScan}
          loading={isScanning}
          style={styles.scanBtn}
          rightIcon={<Feather name="camera" size={20} color={colors.white} />}
        />
      </View>
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
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  headerBox: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: spacing.sm,
  },
  scanBtn: {
    width: '100%',
  },
});
