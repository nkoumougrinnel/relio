import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function QrCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; phone?: string; specialty?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const [timerSeconds, setTimerSeconds] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Simulation: scan validé par le prestataire après 4s -> Ongoing
    const scanTimeout = setTimeout(() => {
      router.replace({
        pathname: '/(client)/demande/ongoing',
        params: { proName, phone: params.phone, specialty: params.specialty },
      } as any);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(scanTimeout);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 23 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Code d'ouverture</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Instruction haut de page — Maquette 23 */}
        <Text style={styles.instructionText}>
          Montrez ce QR Code à {proName}{'\n'}pour démarrer l'intervention.
        </Text>

        {/* Grand QR Code Carré — Maquette 23 */}
        <View style={styles.qrCard}>
          <View style={styles.qrMatrix}>
            {/* Markers corners */}
            <View style={[styles.qrMarker, { top: 12, left: 12 }]}>
              <View style={styles.qrMarkerInner} />
            </View>
            <View style={[styles.qrMarker, { top: 12, right: 12 }]}>
              <View style={styles.qrMarkerInner} />
            </View>
            <View style={[styles.qrMarker, { bottom: 12, left: 12 }]}>
              <View style={styles.qrMarkerInner} />
            </View>

            {/* Relio Center Badge */}
            <View style={styles.qrCenterBadge}>
              <Text style={styles.qrCenterBadgeText}>relio</Text>
            </View>
          </View>
        </View>

        {/* Badge QR Code Valide + Timer — Maquette 23 */}
        <View style={styles.timerBadge}>
          <Text style={styles.timerBadgeLabel}>QR Code valide</Text>
          <Text style={styles.timerBadgeVal}>{formatTimer(timerSeconds)}</Text>
        </View>

        {/* Note d'expiration — Maquette 23 */}
        <View style={styles.noticeBox}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.noticeText}>
            Le QR Code expire dans 2 minutes pour des raisons de sécurité.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },

  /* QR Code */
  qrCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: spacing.lg,
  },
  qrMatrix: {
    width: 220,
    height: 220,
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrMarker: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrMarkerInner: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  qrCenterBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qrCenterBadgeText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 14,
  },

  /* Timer Badge */
  timerBadge: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerBadgeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 2,
  },
  timerBadgeVal: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },

  /* Notice */
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    maxWidth: '90%',
  },
  noticeText: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 16,
    flex: 1,
  },
});
