import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge, BottomBar, Button } from '../../../components/ui';
import { providerMatchingService } from '../services/provider-matching.service';
import { ProviderCandidateCard } from '../components/ProviderCandidateCard';

const DEFAULT_PROBLEM_TEXT =
  'Mon climatiseur split ne refroidit plus depuis ce matin et fait un bruit anormal.';

export function ProviderAttributionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    problemText?: string;
    category?: string;
  }>();

  const candidates = providerMatchingService.getCandidates();
  const [candidateIndex, setCandidateIndex] = useState(0);

  const candidate = candidates[candidateIndex];

  const handleConfirm = () => {
    router.replace({
      pathname: '/(client)/demande/tracking',
      params: { proName: candidate.name },
    } as any);
  };

  const handleNext = () => {
    setCandidateIndex((previous) => (previous + 1) % candidates.length);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.replace('/(client)/(tabs)' as any)}
          activeOpacity={0.7}
        >
          <Feather name="x" size={24} color={colors.grayVeryDark} />
        </TouchableOpacity>

        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Professionnel trouvé !</Text>
          <Text style={styles.headerSubtitle}>Recommandation certifiée Relio</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Badge
          label={candidate.matchScore}
          icon={<Ionicons name="sparkles" size={14} color={colors.white} />}
          style={styles.matchBadge}
          textStyle={styles.matchBadgeText}
        />

        <ProviderCandidateCard candidate={candidate} />

        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.priceLabel}>Tarif indicatif de l&apos;intervention</Text>
            <Text style={styles.priceAmount}>{candidate.indicativePrice}</Text>
          </View>
          <Text style={styles.priceNote}>
            Ce montant inclut le déplacement et le diagnostic sur place. Le devis
            final est confirmé avec vous avant tout début de travaux.
          </Text>
        </View>

        <View style={styles.requestCard}>
          <Text style={styles.requestLabel}>Votre problème :</Text>
          <Text style={styles.requestText}>
            &quot;{params.problemText || DEFAULT_PROBLEM_TEXT}&quot;
          </Text>
        </View>
      </ScrollView>

      <BottomBar style={styles.bottomBar}>
        <Button
          title="Confirmer ce professionnel"
          onPress={handleConfirm}
          size="lg"
        />
        <Button
          title="Voir une autre proposition"
          variant="secondary"
          onPress={handleNext}
          style={styles.altBtn}
          textStyle={styles.altBtnText}
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
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitles: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  matchBadge: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  matchBadgeText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  priceCard: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.xs,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '600',
  },
  priceAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  priceNote: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 17,
  },
  requestCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  requestLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
  },
  requestText: {
    fontSize: 14,
    color: colors.grayVeryDark,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  bottomBar: {
    gap: spacing.xs,
  },
  altBtn: {
    borderWidth: 0,
  },
  altBtnText: {
    color: colors.grayDark,
    fontSize: 14,
  },
});
