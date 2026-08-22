import React from 'react';
import { View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { interventionService } from '../services/intervention.service';
import { providerMatchingService } from '../services/provider-matching.service';

export function RecategorizationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string }>();

  const provider = providerMatchingService.getAssignedProvider({
    name: params.proName,
  });
  const proposal = interventionService.getRecategorizationProposal(
    provider.name
  );

  const handleConfirm = () => {
    Alert.alert(
      'Nouveau tarif confirmé',
      `Le Tarif Relio de ${proposal.suggestedPrice} a été validé. L'intervention continue.`,
      [{ text: "Continuer l'intervention", onPress: () => router.back() }]
    );
  };

  const handleDisagreement = () => {
    Alert.alert(
      'Signaler un désaccord',
      "Un conseiller Relio va intervenir pour étudier la demande avec l'artisan.",
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Contacter le support', onPress: () => router.back() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Recatégorisation" showBack bordered />

      <View style={styles.content}>
        <View style={styles.alertCard}>
          <Ionicons name="information-circle" size={24} color="#D97706" />
          <Text style={styles.alertText}>{proposal.reason}</Text>
        </View>

        <View style={styles.comparisonCard}>
          <Text style={styles.sectionTitle}>Ajustement du Tarif Relio</Text>

          <View style={styles.categoryItem}>
            <Text style={styles.categoryTag}>Initiale</Text>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryName}>{proposal.currentCategory}</Text>
              <Text style={styles.oldPrice}>{proposal.currentPrice}</Text>
            </View>
          </View>

          <View style={styles.arrowRow}>
            <Feather name="arrow-down" size={20} color={colors.grayMedium} />
          </View>

          <View style={[styles.categoryItem, styles.categoryItemNew]}>
            <Text style={styles.categoryTagNew}>
              Nouvelle catégorie détectée
            </Text>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryNameNew}>
                {proposal.suggestedCategory}
              </Text>
              <Text style={styles.newPrice}>{proposal.suggestedPrice}</Text>
            </View>
          </View>

          <Text style={styles.gridNotice}>
            Le nouveau Tarif Relio est calculé automatiquement selon la grille
            officielle (main d&apos;œuvre + déplacement).
          </Text>
        </View>
      </View>

      <BottomBar style={styles.bottomBar}>
        <Button
          title={`Confirmer le nouveau tarif (${proposal.suggestedPrice})`}
          onPress={handleConfirm}
        />
        <Button
          title="Signaler un désaccord"
          variant="secondary"
          onPress={handleDisagreement}
          style={styles.disagreeBtn}
          textStyle={styles.disagreeBtnText}
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
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FCD34D',
    gap: spacing.sm,
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
  comparisonCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  categoryItem: {
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryItemNew: {
    backgroundColor: '#F0F6FF',
    borderColor: colors.primary,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.grayDark,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  categoryTagNew: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 14,
    color: colors.grayVeryDark,
    fontWeight: '500',
  },
  categoryNameNew: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  oldPrice: {
    fontSize: 14,
    color: colors.grayDark,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  arrowRow: {
    alignItems: 'center',
  },
  gridNotice: {
    fontSize: 12,
    color: colors.grayDark,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  bottomBar: {
    gap: spacing.xs,
  },
  disagreeBtn: {
    borderWidth: 0,
  },
  disagreeBtnText: {
    color: colors.error,
    fontSize: 14,
  },
});
