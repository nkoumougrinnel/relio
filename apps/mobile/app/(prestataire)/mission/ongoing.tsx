import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireOngoingMissionScreen() {
  const router = useRouter();

  const [seconds, setSeconds] = useState(1935); // 00:32:15
  const clientName = 'Sophie T.';
  const clientPhone = '+237695123456';
  const location = 'Bonapriso, Douala (Rue Marché)';
  const serviceTitle = 'Entretien & recharge climatiseur Split';
  const priceEstimate = '25 000 FCFA';

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallClient = () => {
    Linking.openURL(`tel:${clientPhone}`).catch(() => {
      Alert.alert('Appel client', `Composer le : ${clientPhone}`);
    });
  };

  const handleFinishIntervention = () => {
    router.push('/(prestataire)/mission/journal' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Intervention en cours</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Carte Client */}
        <View style={styles.clientCard}>
          <View style={styles.clientAvatarCircle}>
            <Text style={styles.avatarInitials}>ST</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.clientRole}>Client Vérifié ⭐ 4.9</Text>
            <Text style={styles.locationText}>📍 {location}</Text>
          </View>
          <TouchableOpacity style={styles.callBtn} onPress={handleCallClient} activeOpacity={0.8}>
            <Ionicons name="call" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Chronomètre d'intervention */}
        <View style={styles.chronoCard}>
          <Text style={styles.chronoLabel}>Durée de l'intervention</Text>
          <Text style={styles.chronoDigits}>{formatTimer(seconds)}</Text>
          <View style={styles.liveBadge}>
            <View style={styles.livePulse} />
            <Text style={styles.liveBadgeText}>Intervention active</Text>
          </View>
        </View>

        {/* Détails du service */}
        <View style={styles.serviceBox}>
          <Text style={styles.serviceCategory}>Climatisation</Text>
          <Text style={styles.serviceTitle}>{serviceTitle}</Text>
          <Text style={styles.servicePrice}>Tarif : {priceEstimate}</Text>
        </View>

        {/* Timeline des 5 Étapes — Perspective Prestataire */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avancement de l'intervention</Text>

          <View style={styles.timelineCard}>
            {/* Étape 1 : Acceptée */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, styles.nodeDone]}>
                  <Feather name="check" size={14} color={colors.white} />
                </View>
                <View style={[styles.timelineLine, styles.lineDone]} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.stepTitleDone}>Mission acceptée</Text>
                <Text style={styles.stepTime}>14:15 · Acceptée par vous</Text>
              </View>
            </View>

            {/* Étape 2 : En route */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, styles.nodeDone]}>
                  <Feather name="check" size={14} color={colors.white} />
                </View>
                <View style={[styles.timelineLine, styles.lineDone]} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.stepTitleDone}>Prestataire en route</Text>
                <Text style={styles.stepTime}>14:20 · Déplacement vers Bonapriso</Text>
              </View>
            </View>

            {/* Étape 3 : Arrivé chez le client */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, styles.nodeDone]}>
                  <Feather name="check" size={14} color={colors.white} />
                </View>
                <View style={[styles.timelineLine, styles.lineDone]} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.stepTitleDone}>Arrivé sur place</Text>
                <Text style={styles.stepTime}>14:35 · QR Code scanné</Text>
              </View>
            </View>

            {/* Étape 4 : Intervention en cours (Actif) */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, styles.nodeActive]}>
                  <View style={styles.activeInnerDot} />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.stepTitleActive}>Intervention en cours</Text>
                <Text style={styles.stepTimeActive}>Démarrée il y a 32 min</Text>
              </View>
            </View>

            {/* Étape 5 : Clôture & Paiement (À venir) */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={styles.timelineNode}>
                  <View style={styles.futureInnerDot} />
                </View>
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.stepTitleFuture}>Clôture & Paiement client</Text>
                <Text style={styles.stepTime}>À venir après fin du travail</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bouton d'action principal : Déclarer la fin du travail */}
        <TouchableOpacity
          style={styles.finishBtn}
          activeOpacity={0.85}
          onPress={handleFinishIntervention}
        >
          <Text style={styles.finishBtnText}>Déclarer la fin du travail</Text>
          <Feather name="check-circle" size={20} color={colors.white} />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  clientCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  clientAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  clientRole: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chronoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D4E3FF',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  chronoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chronoDigits: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    marginVertical: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 6,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  serviceBox: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginTop: 2,
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  timelineCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
  },
  timelineNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeDone: {
    backgroundColor: colors.success,
  },
  nodeActive: {
    backgroundColor: '#EEF4FF',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  activeInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  futureInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 30,
    backgroundColor: '#E5E7EB',
    marginVertical: 2,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  stepTitleDone: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  stepTitleActive: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  stepTitleFuture: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayMedium,
  },
  stepTime: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  stepTimeActive: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  finishBtn: {
    backgroundColor: colors.success,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  finishBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
