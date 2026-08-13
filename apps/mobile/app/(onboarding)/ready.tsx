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
        {/* En-tête : Logo Horizontal à gauche */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo-horizontal.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bloc central avec Illustration et Titre */}
        <View style={styles.mainSection}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../assets/images/ready.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Prêt à simplifier{'\n'}votre quotidien ?</Text>
        </View>

        {/* Actions en bas */}
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
            <Text style={styles.btnSecondaryText}>J’ai déjà un compte</Text>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    alignItems: 'flex-start',
  },
  logo: {
    width: 140,
    height: 45,
  },

  /* Section Centrale */
  mainSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  illustrationContainer: {
    width: width * 0.8,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary, // Texte bleu comme demandé ("bleu foncé") ou primary
    textAlign: 'center',
    lineHeight: 36,
  },

  /* Actions */
  actionsBlock: {
    width: '100%',
    paddingHorizontal: spacing.lg,
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
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.grayLight,
  },
  btnSecondaryText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
});
