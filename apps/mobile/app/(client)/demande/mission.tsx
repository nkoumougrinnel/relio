import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const TIMELINE_STEPS = [
  { id: 1, title: 'Demande reçue', time: '12 juin à 09:21', status: 'done' },
  { id: 2, title: 'Recherche et analyse', time: '12 juin à 09:22', status: 'done' },
  { id: 3, title: 'Professionnel attribué', time: '12 juin à 09:25', status: 'done' },
  { id: 4, title: 'Professionnel en route', time: '12 juin à 09:30', status: 'done' },
  { id: 5, title: 'Prestataire arrivé', time: '12 juin à 09:45', status: 'done' },
  { id: 6, title: 'Intervention en cours', time: 'En cours', status: 'active', route: '/(client)/demande/ongoing' },
  { id: 7, title: 'Intervention terminée', time: 'À venir', status: 'pending' },
  { id: 8, title: 'Journal d\'intervention', time: 'À venir', status: 'pending' },
  { id: 9, title: 'Paiement', time: 'À venir', status: 'pending' },
  { id: 10, title: 'Évaluation', time: 'À venir', status: 'pending' },
];

export default function MissionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string; proName?: string; status?: string }>();

  const title = params.title || 'Fuite d\'eau dans la cuisine';
  const proName = params.proName || 'Jean Mbarga';

  const handleCallPro = () => {
    Linking.openURL('tel:+237695123456').catch(() => {
      Alert.alert('Appel', 'Composer le : +237695123456');
    });
  };

  const handleGoToActiveStep = () => {
    // Redirige vers l'écran contextuel de la mission active (ongoing.tsx)
    router.push({
      pathname: '/(client)/demande/ongoing',
      params: { proName },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Suivi Global Persistant */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suivi de ma prestation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card Infos Demande */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Demande</Text>
          <Text style={styles.missionTitle}>{title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.grayDark} />
            <Text style={styles.locationText}>Bonanjo, Douala</Text>
          </View>
        </View>

        {/* Card Prestataire */}
        <View style={styles.card}>
          <View style={styles.proRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }}
              style={styles.proAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.proNameText}>{proName}</Text>
              <Text style={styles.proRoleText}>Technicien Électricien</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color="#FFB800" />
                <Text style={styles.ratingText}>4.8 (128 avis)</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.callIconBtn} onPress={handleCallPro} activeOpacity={0.8}>
              <Ionicons name="call" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Timeline Globale Persistante */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Suivi en temps réel</Text>

          <View style={styles.timelineList}>
            {TIMELINE_STEPS.map((step, idx) => {
              const isDone = step.status === 'done';
              const isActive = step.status === 'active';
              const isLast = idx === TIMELINE_STEPS.length - 1;

              return (
                <View key={step.id}>
                  <View style={styles.stepRow}>
                    <View
                      style={[
                        styles.circleIndicator,
                        isDone && styles.circleDone,
                        isActive && styles.circleActive,
                      ]}
                    >
                      {isDone ? (
                        <Ionicons name="checkmark" size={14} color={colors.white} />
                      ) : isActive ? (
                        <View style={styles.innerDotActive} />
                      ) : (
                        <View style={styles.innerDotPending} />
                      )}
                    </View>

                    <View style={styles.stepTextContent}>
                      <View style={styles.stepTitleRow}>
                        <Text style={[styles.stepTitle, isActive && styles.stepTitleActive]}>
                          {step.title}
                        </Text>
                        <Text style={styles.stepTime}>{step.time}</Text>
                      </View>
                    </View>
                  </View>

                  {!isLast && (
                    <View
                      style={[
                        styles.connectorLine,
                        isDone && styles.connectorDone,
                        isActive && styles.connectorActive,
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Footer Button pour rejoindre l'écran contextuel actif */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.activeStepBtn} onPress={handleGoToActiveStep} activeOpacity={0.88}>
          <Ionicons name="play-circle-outline" size={20} color={colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.activeStepBtnText}>Rejoindre l'intervention en cours</Text>
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
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  missionTitle: {
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

  /* Pro Row */
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  proAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  proNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  proRoleText: {
    fontSize: 12,
    color: colors.grayDark,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  callIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Timeline List */
  timelineList: {
    marginTop: spacing.xs,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  circleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  circleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  innerDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  innerDotPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 13,
    color: colors.grayDark,
  },
  stepTitleActive: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  stepTime: {
    fontSize: 11,
    color: colors.grayMedium,
  },
  connectorLine: {
    width: 2,
    height: 18,
    backgroundColor: colors.border,
    marginLeft: 11,
    marginVertical: 2,
  },
  connectorDone: {
    backgroundColor: colors.success,
  },
  connectorActive: {
    backgroundColor: colors.primary,
  },

  /* Bottom Bar */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  activeStepBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
