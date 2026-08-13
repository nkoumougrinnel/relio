import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../theme';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function OnboardingStep3Screen() {
  const router = useRouter();

  const handleNext = () => {
    // Navigue vers la dernière étape (ready) ou l'authentification
    router.push('/(onboarding)/ready' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* En-tête : Titre & Sous-titre (Pas de logo) */}
        <View style={styles.header}>
          <Text style={styles.title}>Le bon professionnel intervient</Text>
          <Text style={styles.subtitle}>
            Suivez votre intervention en temps réel, échangez avec le professionnel et évaluez la prestation.
          </Text>
        </View>

        {/* Illustration principale */}
        <View style={styles.mainSection}>
          <View style={styles.illustrationWrapper}>
            <View style={styles.cloudBackground}>
              <View style={styles.cloudPart1} />
              <View style={styles.cloudPart2} />
              <View style={styles.cloudPart3} />
            </View>
            <Image
              source={require('../../assets/images/onboarding-3.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Les 3 options en bas de l'illustration (non cliquables) */}
          <View style={styles.optionsRow}>
            <View style={styles.optionItem}>
              <View style={styles.optionCircle}>
                <Feather name="shield" size={24} color={colors.primary} />
              </View>
              <Text style={styles.optionLabel}>Paiement</Text>
              <Text style={styles.optionLabel}>sécurisé</Text>
            </View>

            <View style={styles.optionItem}>
              <View style={styles.optionCircle}>
                <Feather name="life-buoy" size={24} color={colors.primary} />
              </View>
              <Text style={styles.optionLabel}>Support</Text>
            </View>

            <View style={styles.optionItem}>
              <View style={styles.optionCircle}>
                <Feather name="star" size={24} color={colors.primary} />
              </View>
              <Text style={styles.optionLabel}>Évaluation</Text>
            </View>
          </View>
        </View>

        {/* Footer : Indicateurs de page & Bouton Suivant */}
        <View style={styles.footer}>
          {/* Puces de pagination (3 dots, 3ème actif) */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>

          {/* Bouton Suivant */}
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.88}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>Suivant</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'left',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayDark,
    textAlign: 'left',
    lineHeight: 24,
  },
  mainSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  illustrationWrapper: {
    width: width * 0.75,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: spacing.xl,
  },
  cloudBackground: {
    position: 'absolute',
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudPart1: {
    position: 'absolute',
    width: '90%',
    height: '45%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '15%',
  },
  cloudPart2: {
    position: 'absolute',
    width: '55%',
    height: '55%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '35%',
    left: '12%',
  },
  cloudPart3: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '30%',
    right: '15%',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    marginTop: spacing.md,
  },
  optionItem: {
    alignItems: 'center',
    flex: 1,
  },
  optionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EBF3FF', // light blue circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xs,
    gap: spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.grayLight,
  },
  nextBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  nextBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
