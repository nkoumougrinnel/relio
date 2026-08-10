import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { colors, spacing } from '../theme';

const { width } = Dimensions.get('window');
const DISPLAY_DURATION = 2000; // 2 secondes avant redirection

export default function AnimatedSplashScreen() {
  const router = useRouter();

  // Animations d'entrée (Logo & Accroche)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Animation indéterminée du loader (défile en boucle)
  const loopAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Masquer le splash screen natif dès que React Native est prêt
    SplashScreen.hideAsync().catch(() => {});

    // 2. Animer le logo et l'accroche
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Lancer l'animation de défilement en boucle (loader indéterminé)
    const loopAnimation = Animated.loop(
      Animated.timing(loopAnim, {
        toValue: 1,
        duration: 900, // Vitesse d'un aller complet
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      })
    );
    loopAnimation.start();

    // 4. Après 2 secondes, stopper l'animation et rediriger vers le Welcome Screen
    const timer = setTimeout(() => {
      loopAnimation.stop();
      router.replace('/welcome' as any);
    }, DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, []);

  // Déplacement du curseur lumineux (du début à la fin de la barre)
  const TRACK_WIDTH = width * 0.6;
  const INDICATOR_WIDTH = TRACK_WIDTH * 0.35;

  const translateX = loopAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-INDICATOR_WIDTH, TRACK_WIDTH],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* Logo & Accroche Officielle */}
        <Animated.View
          style={[
            styles.brandContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('../assets/images/logo-horizontal.png')}
            style={styles.logoHorizontal}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>
            La bonne personne pour le bon service au bon moment
          </Text>
        </Animated.View>

        {/* Loader Indéterminé (Défile du début à la fin en boucle) */}
        <View style={styles.progressContainer}>
          <View style={[styles.track, { width: TRACK_WIDTH }]}>
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: INDICATOR_WIDTH,
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  logoHorizontal: {
    width: width * 0.75,
    height: 110,
  },
  tagline: {
    marginTop: spacing.md,
    fontSize: 16,
    fontWeight: '500',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
  },
  track: {
    height: 4,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 2,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
