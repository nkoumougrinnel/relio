import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireQrCodeCloseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ totalAmount?: string; clientName?: string }>();

  const totalAmount = params.totalAmount || '28 500 FCFA';
  const clientName = params.clientName || 'Jean Dupont';

  const [timerSeconds, setTimerSeconds] = useState(180);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleScanCompleted = () => {
    router.push({
      pathname: '/(prestataire)/mission/completed',
      params: { totalAmount, clientName },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>QR Code de clôture</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Banner Instructions */}
        <View style={styles.instructionCard}>
          <Ionicons name="qr-code-outline" size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.instructionTitle}>Montrez ce QR Code au client</Text>
            <Text style={styles.instructionSub}>
              Paiement de {totalAmount} reçu ! Le client {clientName} doit scanner ce code pour valider la clôture finale.
            </Text>
          </View>
        </View>

        {/* Grand QR Code Carré */}
        <View style={styles.qrCard}>
          <View style={styles.qrMatrix}>
            <View style={[styles.qrMarker, { top: 12, left: 12 }]}>
              <View style={styles.qrMarkerInner} />
            </View>
            <View style={[styles.qrMarker, { top: 12, right: 12 }]}>
              <View style={styles.qrMarkerInner} />
            </View>
            <View style={[styles.qrMarker, { bottom: 12, left: 12 }]}>
              <View style={styles.qrMarkerInner} />
            </View>

            <View style={styles.qrCenterBadge}>
              <Text style={styles.qrCenterBadgeText}>relio PRO</Text>
            </View>
          </View>
        </View>

        {/* Timer & Notice */}
        <View style={styles.timerBadge}>
          <Text style={styles.timerBadgeLabel}>QR Code de clôture valide</Text>
          <Text style={styles.timerBadgeVal}>{formatTimer(timerSeconds)}</Text>
        </View>

        {/* Action Bar */}
        <TouchableOpacity
          style={styles.confirmScanBtn}
          activeOpacity={0.85}
          onPress={handleScanCompleted}
        >
          <Ionicons name="checkmark-done-circle-outline" size={20} color={colors.white} />
          <Text style={styles.confirmScanBtnText}>Le client a scanné le QR Code</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
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
  instructionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E3FF',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  instructionSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
    lineHeight: 16,
  },
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
    fontSize: 13,
  },
  timerBadge: {
    alignItems: 'center',
  },
  timerBadgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 2,
  },
  timerBadgeVal: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  confirmScanBtn: {
    width: '100%',
    backgroundColor: colors.success,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmScanBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
