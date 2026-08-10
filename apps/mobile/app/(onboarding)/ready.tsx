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

const { width } = Dimensions.get('window');

export default function ReadyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* Header : Logo Horizontal */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo-horizontal.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bloc central "Vous y êtes !" */}
        <View style={styles.centerBlock}>
          {/* Badge Succès Certifié */}
          <View style={styles.successBadgeCircle}>
            <Text style={styles.checkmarkIcon}>✓</Text>
          </View>

          <Text style={styles.title}>Prêt à commencer !</Text>
          <Text style={styles.subtitle}>
            Créez votre compte en quelques secondes pour accéder à tous les services de proximité et professionnels certifiés.
          </Text>

          {/* Cartes d'Avantages / Confirmation */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureRow}>
              <View style={styles.bulletCheck}>
                <Text style={styles.bulletCheckText}>✓</Text>
              </View>
              <Text style={styles.featureText}>Recherche vocale & textuelle active</Text>
            </View>

            <View style={styles.featureRow}>
              <View style={styles.bulletCheck}>
                <Text style={styles.bulletCheckText}>✓</Text>
              </View>
              <Text style={styles.featureText}>Prestataires vérifiés dans votre zone</Text>
            </View>

            <View style={styles.featureRow}>
              <View style={styles.bulletCheck}>
                <Text style={styles.bulletCheckText}>✓</Text>
              </View>
              <Text style={styles.featureText}>Paiement sécurisé & devis transparents</Text>
            </View>
          </View>
        </View>

        {/* Actions : Créer un compte & J'ai déjà un compte */}
        <View style={styles.actionsBlock}>
          {/* Bouton Créer un compte */}
          <TouchableOpacity
            style={styles.btnPrimary}
            activeOpacity={0.88}
            onPress={() => router.push('/(auth)/register' as any)}
          >
            <Text style={styles.btnPrimaryText}>Créer un compte</Text>
          </TouchableOpacity>

          {/* Bouton J'ai déjà un compte */}
          <TouchableOpacity
            style={styles.btnSecondary}
            activeOpacity={0.88}
            onPress={() => router.push('/(auth)' as any)}
          >
            <Text style={styles.btnSecondaryText}>J'ai déjà un compte</Text>
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
  },
  logo: {
    width: width * 0.5,
    height: 60,
  },

  /* Center Block */
  centerBlock: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  successBadgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F8F0',
    borderWidth: 2,
    borderColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  checkmarkIcon: {
    fontSize: 40,
    color: colors.success,
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: '90%',
    marginBottom: spacing.lg,
  },

  /* Features List */
  featuresContainer: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bulletCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletCheckText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },

  /* Actions */
  actionsBlock: {
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
