import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function RecategorizeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string }>();
  const proName = params.proName || 'Jean Mbarga';

  const handleConfirm = () => {
    Alert.alert(
      'Nouveau tarif confirmé',
      'Le Tarif Relio de 22 000 FCFA a été validé. L\'intervention continue.',
      [
        {
          text: 'Continuer l\'intervention',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleDisagreement = () => {
    Alert.alert(
      'Signaler un désaccord',
      'Un conseiller Relio va intervenir pour étudier la demande avec l\'artisan.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Contacter le support', onPress: () => router.back() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recatégorisation</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Banner Alert */}
        <View style={styles.alertCard}>
          <Ionicons name="information-circle" size={24} color="#D97706" />
          <Text style={styles.alertText}>
            {proName} a identifié un problème différent de celui décrit initialement après diagnostic sur place.
          </Text>
        </View>

        {/* Comparaison de Catégorie & Tarif Relio */}
        <View style={styles.comparisonCard}>
          <Text style={styles.cardSectionTitle}>Ajustement du Tarif Relio</Text>

          {/* Ancienne Catégorie */}
          <View style={styles.categoryItem}>
            <Text style={styles.categoryTagLabel}>Initiale</Text>
            <View style={styles.categoryDetailsRow}>
              <Text style={styles.categoryName}>⚡ Électricité (Prise murale)</Text>
              <Text style={styles.categoryOldPrice}>15 000 FCFA</Text>
            </View>
          </View>

          <View style={styles.arrowRow}>
            <Feather name="arrow-down" size={20} color={colors.grayMedium} />
          </View>

          {/* Nouvelle Catégorie */}
          <View style={[styles.categoryItem, styles.categoryItemNew]}>
            <Text style={styles.categoryTagLabelNew}>Nouvelle catégorie détectée</Text>
            <View style={styles.categoryDetailsRow}>
              <Text style={styles.categoryNameNew}>⚡ Électricité (Tableau Général)</Text>
              <Text style={styles.categoryNewPrice}>22 000 FCFA</Text>
            </View>
          </View>

          <Text style={styles.gridNotice}>
            Le nouveau Tarif Relio est calculé automatiquement selon la grille officielle (main d'œuvre + déplacement).
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.88}>
          <Text style={styles.confirmBtnText}>Confirmer le nouveau tarif (22 000 FCFA)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disagreeBtn} onPress={handleDisagreement} activeOpacity={0.7}>
          <Text style={styles.disagreeBtnText}>Signaler un désaccord</Text>
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
  cardSectionTitle: {
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
  categoryTagLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.grayDark,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  categoryTagLabelNew: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  categoryDetailsRow: {
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
  categoryOldPrice: {
    fontSize: 14,
    color: colors.grayDark,
    textDecorationLine: 'line-through',
  },
  categoryNewPrice: {
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.xs,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  disagreeBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disagreeBtnText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
});
