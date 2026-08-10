import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../theme';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  step: string;
  title: string;
  description: string;
  badge: string;
  iconSymbol: string;
  accentColor: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    step: 'Étape 1 sur 3',
    title: 'Exprimez votre besoin en toute simplicité',
    description:
      'Par texte ou directement par message vocal, décrivez votre problème. Relio comprend et formule votre demande instantanément.',
    badge: 'Recherche Intelligente & Vocale',
    iconSymbol: '🎙️',
    accentColor: colors.primary,
  },
  {
    id: '2',
    step: 'Étape 2 sur 3',
    title: 'Un professionnel certifié attribué sur-mesure',
    description:
      'Relio sélectionne le meilleur artisan vérifié près de chez vous en croisant compétences, réputation et disponibilité immédiate.',
    badge: 'Algorithme & Pros Vérifiés',
    iconSymbol: '⚡',
    accentColor: colors.secondary,
  },
  {
    id: '3',
    step: 'Étape 3 sur 3',
    title: 'Suivi en direct & Paiement 100% sécurisé',
    description:
      'Suivez la venue de votre prestaire sur la carte, validez le devis et réglez en toute sérénité à la fin de l’intervention.',
    badge: 'Transparence & Sécurité',
    iconSymbol: '🛡️',
    accentColor: colors.success,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      flatListRef.current?.scrollToIndex({ index: nextIdx, animated: true });
    } else {
      // Aller à la page 7 (Prêt !)
      router.push('/(onboarding)/ready' as any);
    }
  };

  const handleSkip = () => {
    router.push('/(onboarding)/ready' as any);
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header : Logo & Passer */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo-horizontal.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={styles.skipBtn}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      </View>

      {/* Carrousel de Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Badge de l'étape */}
            <View style={[styles.stepBadge, { backgroundColor: item.accentColor + '18' }]}>
              <Text style={[styles.stepBadgeText, { color: item.accentColor }]}>
                {item.step}
              </Text>
            </View>

            {/* Visual / Illustration Placeholder */}
            <View style={styles.illustrationContainer}>
              <View style={[styles.illustrationCard, { borderColor: item.accentColor + '40' }]}>
                <View style={[styles.iconCircle, { backgroundColor: item.accentColor + '20' }]}>
                  <Text style={styles.iconEmoji}>{item.iconSymbol}</Text>
                </View>
                <View style={styles.featureBadge}>
                  <Text style={styles.featureBadgeText}>{item.badge}</Text>
                </View>
              </View>
            </View>

            {/* Titre & Description */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Footer : Indicateurs de page & Bouton Suivant */}
      <View style={styles.footer}>
        {/* Puces de pagination */}
        <View style={styles.pagination}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Bouton Suivant / Terminer */}
        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.88}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {currentIndex === SLIDES.length - 1 ? 'Terminer' : 'Suivant'}
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  logo: {
    width: 120,
    height: 40,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayDark,
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  stepBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  illustrationContainer: {
    width: width * 0.78,
    height: width * 0.65,
    marginVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconEmoji: {
    fontSize: 38,
  },
  featureBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 28,
  },
  description: {
    fontSize: 15,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '90%',
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
