import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireArrivedScreen() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const handleScanQRCode = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Redirection automatique vers l'intervention en cours avec le chrono
      router.push('/(prestataire)/mission/ongoing' as any);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Validation d'arrivée</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* En-tête statut */}
        <View style={styles.headerBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="qr-code-outline" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>Scannez le QR Code Client</Text>
          <Text style={styles.subtext}>
            Présentez la caméra du téléphone devant le QR Code généré par Jean Dupont pour démarrer automatiquement le chrono.
          </Text>
        </View>

        {/* Visualisation Viseur QR Code */}
        <View style={styles.qrScannerBox}>
          <View style={styles.qrCornerTL} />
          <View style={styles.qrCornerTR} />
          <View style={styles.qrCornerBL} />
          <View style={styles.qrCornerBR} />

          {isScanning ? (
            <View style={styles.scanningOverlay}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.scanningText}>Scan du QR Code en cours...</Text>
            </View>
          ) : (
            <Ionicons name="scan-outline" size={80} color={colors.grayMedium} />
          )}
        </View>

        {/* Bouton d'action scan */}
        <TouchableOpacity
          style={styles.scanBtn}
          activeOpacity={0.85}
          disabled={isScanning}
          onPress={handleScanQRCode}
        >
          {isScanning ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <>
              <Text style={styles.scanBtnText}>Scanner le QR Code</Text>
              <Feather name="camera" size={20} color={colors.white} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: spacing.xs,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
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
  subtext: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: spacing.sm,
  },
  qrScannerBox: {
    width: 220,
    height: 220,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: spacing.xl,
  },
  qrCornerTL: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.primary,
  },
  qrCornerTR: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.primary,
  },
  qrCornerBL: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.primary,
  },
  qrCornerBR: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.primary,
  },
  scanningOverlay: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  scanningText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  scanBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  scanBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
