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

        {/* Message de Bienvenue & Section Centrale */}
        <View style={styles.mainSection}>
          <Text style={styles.welcomeTitle}>Bienvenue</Text>
          <Text style={styles.welcomeSubtitle}>
            Trouvez les meilleurs prestataires de service qualifiés près de chez vous en quelques clics.
          </Text>

          {/* Placeholder Illustration Bonhomme */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationPlaceholder}>
              {/* Icône / Motif temporaire en attendant l'image du bonhomme */}
              <View style={styles.characterHead} />
              <View style={styles.characterBody} />
              <Text style={styles.illustrationText}>[ Image Bonhomme ]</Text>
            </View>
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
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  logoHorizontal: {
    width: width * 0.55,
    height: 70,
  },

  /* Section Centrale */
  mainSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '85%',
    marginBottom: spacing.lg,
  },

  /* Illustration Bonhomme Placeholder */
  illustrationContainer: {
    width: width * 0.7,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  illustrationPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F6FF',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: '#D4E4FF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterHead: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    marginBottom: 8,
    opacity: 0.8,
  },
  characterBody: {
    width: 80,
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.secondary,
    opacity: 0.8,
  },
  illustrationText: {
    marginTop: spacing.md,
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
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
