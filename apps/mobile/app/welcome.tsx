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
import { colors, spacing, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* En-tête : Logo Horizontal */}
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo-horizontal.png')}
            style={styles.logoHorizontal}
            resizeMode="contain"
          />
        </View>

        {/* Textes de Bienvenue */}
        <View style={styles.textSection}>
          <Text style={styles.welcomeTitle}>Bienvenue sur Relio 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Trouvez rapidement le bon professionnel pour tous vos besoins.
          </Text>
        </View>

        {/* Illustration au Centre */}
        <View style={styles.mainSection}>
          <View style={styles.illustrationContainer}>
            {/* Éléments décoratifs (nuage bleu pâle) */}
            <View style={styles.cloudBackground}>
              <View style={styles.cloudPart1} />
              <View style={styles.cloudPart2} />
              <View style={styles.cloudPart3} />
            </View>
            <Image 
              source={require('../assets/images/welcome-illustration.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Actions : Commencer & Se connecter */}
        <View style={styles.actionsSection}>
          {/* Bouton Commencer (Onboarding / Sélection profil) */}
          <TouchableOpacity
            style={styles.btnPrimary}
            activeOpacity={0.88}
            onPress={() => router.push('/(onboarding)' as any)}
          >
            <Text style={styles.btnPrimaryText}>Commencer</Text>
          </TouchableOpacity>

          {/* Bouton Se connecter */}
          <TouchableOpacity
            style={styles.btnSecondary}
            activeOpacity={0.88}
            onPress={() => router.push('/(auth)' as any)}
          >
            <Text style={styles.btnSecondaryText}>Se connecter</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },
  logoHorizontal: {
    width: 160,
    height: 150,
  },

  /* Textes de Bienvenue */
  textSection: {
    marginTop: spacing.sm,
    alignItems: 'flex-start',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'left',
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.grayDark,
    textAlign: 'left',
    lineHeight: 24,
  },

  /* Section Centrale & Illustration */
  mainSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: width * 0.85,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.md,
    position: 'relative',
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

  /* Actions */
  actionsSection: {
    width: '100%',
    gap: spacing.sm,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.grayLight,
  },
  btnSecondaryText: {
    color: colors.grayVeryDark,
    fontSize: 16,
    fontWeight: '600',
  },
});
