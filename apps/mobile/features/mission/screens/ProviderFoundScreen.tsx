import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button } from '../../../components/ui';
import { providerMatchingService } from '../services/provider-matching.service';
import { ProviderMatchCard } from '../components/ProviderMatchCard';

export function ProviderFoundScreen() {
  const router = useRouter();

  const matches = providerMatchingService.getMatches();
  const [matchIndex, setMatchIndex] = useState(0);

  const provider = matches[matchIndex];

  const handleConfirm = () => {
    router.replace({
      pathname: '/(client)/demande/tracking',
      params: {
        proName: provider.name,
        specialty: provider.specialty,
        phone: provider.phone,
      },
    } as any);
  };

  const handleNext = () => {
    setMatchIndex((previous) => (previous + 1) % matches.length);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Professionnel trouvé 🎉</Text>
          <Text style={styles.subtitle}>
            Nous avons trouvé le bon professionnel pour vous.
          </Text>
        </View>

        <ProviderMatchCard provider={provider} />

        <View style={styles.specialtyCard}>
          <Text style={styles.specialtyTitle}>Spécialité</Text>
          <Text style={styles.specialtyText}>{provider.bio}</Text>
        </View>
      </ScrollView>

      <BottomBar style={styles.bottomBar}>
        <Button title="Confirmer ce professionnel" onPress={handleConfirm} />
        <Button
          title="Autre professionnel"
          variant="outline"
          onPress={handleNext}
          style={styles.altBtn}
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
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
  },
  specialtyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  specialtyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  specialtyText: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 19,
  },
  bottomBar: {
    gap: spacing.xs,
  },
  altBtn: {
    borderWidth: 0,
  },
});
