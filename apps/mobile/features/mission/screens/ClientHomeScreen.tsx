import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, typography, shadows } from '../../../theme';
import { BrandHeader, ModeSwitchBadge } from '../../../components/ui';
import { BecomeProPromoCard } from '../../profile/components/BecomeProPromoCard';
import { proApplicationService } from '../../profile/services/pro-application.service';
import { serviceCatalogService } from '../services/service-catalog.service';
import { serviceRequestService } from '../services/service-request.service';
import { ServiceCategoryGrid } from '../components/ServiceCategoryGrid';
import { ServiceRequestCard } from '../components/ServiceRequestCard';

interface SectionHeaderProps {
  title: string;
  onSeeAll: () => void;
}

function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <TouchableOpacity
        style={styles.seeAllBtn}
        activeOpacity={0.7}
        onPress={onSeeAll}
      >
        <Text style={styles.seeAllText}>Voir tout</Text>
        <Feather name="arrow-right" size={15} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

interface VoiceActionButtonProps {
  mode: 'mic' | 'send';
  onPress: () => void;
}

function VoiceActionButton({ mode, onPress }: VoiceActionButtonProps) {
  const isMic = mode === 'mic';

  return (
    <View style={styles.voiceAction}>
      {isMic && (
        <>
          <View style={[styles.voiceWave, styles.voiceWaveOuter]} />
          <View style={[styles.voiceWave, styles.voiceWaveInner]} />
          <View style={[styles.voiceDot, styles.voiceDotA]} />
          <View style={[styles.voiceDot, styles.voiceDotB]} />
          <View style={[styles.voiceDot, styles.voiceDotC]} />
        </>
      )}

      <TouchableOpacity
        style={[
          styles.ctaAction,
          isMic ? styles.ctaActionMic : styles.ctaActionSend,
        ]}
        activeOpacity={0.85}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          isMic ? 'Dicter votre problème' : 'Envoyer la demande'
        }
      >
        <Feather
          name={isMic ? 'mic' : 'send'}
          size={22}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

export function ClientHomeScreen() {
  const router = useRouter();
  const [problem, setProblem] = useState('');

  const categories = serviceCatalogService.getPopularCategories();
  const recentRequests = serviceRequestService.getRecentRequests(2);
  const proStatus = proApplicationService.getStatus();
  const hasProblem = problem.trim().length > 0;

  const startRequest = (categoryLabel?: string, asAudio = false) => {
    router.push({
      pathname: '/(client)/demande',
      params: {
        initialText:
          problem || (categoryLabel ? `Besoin en ${categoryLabel}` : ''),
        isAudio: asAudio ? 'true' : 'false',
        category:
          categoryLabel || serviceCatalogService.getDefaultCategoryLabel(),
      },
    } as any);
  };

  const openRequests = () => {
    router.push('/(client)/(tabs)/demandes' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <BrandHeader hasNotifications />

        <View style={styles.greetingRow}>
          <Text style={styles.greeting}>Bonjour Jean 👋</Text>
          <ModeSwitchBadge
            label="Client"
            onPress={() => router.replace('/(prestataire)/(tabs)' as any)}
          />
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Quel problème devons-nous{'\n'}
            <Text style={styles.heroAccent}>résoudre</Text> aujourd&apos;hui ?
          </Text>
          <Text style={styles.heroSubtitle}>
            Décrivez votre besoin, nous trouvons le bon professionnel pour vous.
          </Text>
        </View>

        <View style={styles.ctaCard}>
          <TextInput
            style={styles.ctaInput}
            placeholder="Décrivez votre problème..."
            placeholderTextColor={colors.placeholder}
            value={problem}
            onChangeText={setProblem}
            multiline
            maxLength={200}
            textAlignVertical="top"
          />

          <View style={styles.ctaFooter}>
            <VoiceActionButton
              mode={hasProblem ? 'send' : 'mic'}
              onPress={() => startRequest(undefined, !hasProblem)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Catégories populaires"
            onSeeAll={() => startRequest()}
          />

          <ServiceCategoryGrid
            categories={categories}
            onSelect={(category) => startRequest(category.label)}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Dernières demandes" onSeeAll={openRequests} />

          <View style={styles.requestList}>
            {recentRequests.map((request) => (
              <ServiceRequestCard
                key={request.id}
                request={request}
                size="comfortable"
                onPress={() =>
                  router.push(
                    serviceRequestService.getRequestRoute(request) as any
                  )
                }
              />
            ))}
          </View>
        </View>

        <BecomeProPromoCard
          status={proStatus}
          title="Vous êtes un pro ?"
          description="Rejoignez Relio et développez votre activité."
          ctaLabel="Devenir prestataire"
          onPress={() => router.push('/(client)/profil/become-pro' as any)}
          style={styles.promo}
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
    paddingBottom: spacing.xl,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  greeting: {
    ...typography.bodyMedium,
    color: colors.grayDark,
  },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  heroTitle: {
    ...typography.h1,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  heroAccent: {
    color: colors.primary,
  },
  heroSubtitle: {
    ...typography.bodySmall,
    color: colors.grayDark,
    marginTop: spacing.sm,
    paddingRight: spacing.md,
  },

  /* Point d'entrée principal : décrire son problème */
  ctaCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
  },
  ctaInput: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 26,
    color: colors.grayVeryDark,
    minHeight: 132,
    maxHeight: 200,
  },
  ctaFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.md,
    minHeight: 72,
  },
  voiceAction: {
    width: 88,
    height: 72,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  voiceWave: {
    position: 'absolute',
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  voiceWaveOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1.5,
    opacity: 0.14,
    right: -14,
  },
  voiceWaveInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    opacity: 0.22,
    right: -7,
  },
  voiceDot: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  voiceDotA: {
    width: 5,
    height: 5,
    top: 8,
    right: 62,
    opacity: 0.35,
  },
  voiceDotB: {
    width: 3,
    height: 3,
    top: 20,
    right: 74,
    opacity: 0.22,
  },
  voiceDotC: {
    width: 4,
    height: 4,
    bottom: 10,
    right: 68,
    backgroundColor: colors.secondary,
    opacity: 0.45,
  },
  ctaAction: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
    shadowColor: colors.primary,
  },
  ctaActionMic: {
    backgroundColor: colors.primary,
  },
  ctaActionSend: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },

  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  seeAllText: {
    ...typography.label,
    fontSize: 13,
    color: colors.primary,
  },
  requestList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  promo: {
    marginHorizontal: spacing.lg,
  },
  bottomSpacer: {
    height: spacing.md,
  },
});
