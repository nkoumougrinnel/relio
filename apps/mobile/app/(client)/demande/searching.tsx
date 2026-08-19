import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const SEARCH_STEPS = [
  'Analyse de votre demande',
  'Recherche de professionnels',
  'Comparaison des profils',
  'Sélection du meilleur match',
];

export default function SearchingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ problemText?: string; category?: string }>();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < SEARCH_STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    const timeout = setTimeout(() => {
      router.replace({
        pathname: '/(client)/demande/found',
        params: {
          problemText: params.problemText || 'Ex. : Ma prise ne fonctionne plus...',
          category: params.category || 'Électricité',
        },
      } as any);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 18 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recherche en cours</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Illustration centrale Relio — Maquette 18 */}
        <View style={styles.illustrationCircle}>
          <View style={styles.outerRing} />
          <View style={styles.middleRing} />
          <View style={styles.innerCircle}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={styles.relioLogoIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Message principal */}
        <Text style={styles.mainMessage}>
          Nous recherchons le meilleur{'\n'}professionnel pour vous...
        </Text>

        {/* Liste des étapes — Maquette 18 */}
        <View style={styles.stepsCard}>
          {SEARCH_STEPS.map((stepText, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <View key={idx} style={styles.stepRow}>
                <View
                  style={[
                    styles.stepIndicator,
                    isDone && styles.stepDone,
                    isCurrent && styles.stepCurrent,
                  ]}
                >
                  {isDone ? (
                    <Ionicons name="checkmark" size={14} color={colors.white} />
                  ) : (
                    <View style={[styles.stepDot, isCurrent && styles.stepDotActive]} />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    isDone && styles.stepDoneText,
                    isCurrent && styles.stepCurrentText,
                  ]}
                >
                  {stepText}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Note d'information bas de page — Maquette 18 */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeText}>
            Cela peut prendre jusqu'à 1 minute. Merci de patienter.
          </Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },

  /* Illustration Relio */
  illustrationCircle: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0F6FF',
  },
  middleRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E1EDFF',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  relioLogoIcon: {
    width: 44,
    height: 44,
  },

  /* Texte */
  mainMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },

  /* Liste Étapes */
  stepsCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.grayMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  stepCurrent: {
    borderColor: colors.primary,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
  },
  stepText: {
    fontSize: 14,
    color: colors.grayDark,
  },
  stepDoneText: {
    color: colors.grayVeryDark,
    fontWeight: '600',
  },
  stepCurrentText: {
    color: colors.primary,
    fontWeight: '700',
  },

  /* Notice */
  noticeCard: {
    width: '100%',
    backgroundColor: '#F5F7FA',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
  },
});
