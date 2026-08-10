import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../theme';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // Redirection unique vers l'application
    router.replace('/(client)/tabs' as any);
  };

  const handleGoogleRegister = () => {
    router.replace('/(client)/tabs' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo-horizontal.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Titres */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez Relio en quelques secondes et accédez à l'ensemble de nos services.
            </Text>
          </View>

          {/* Bouton Continuer avec Google */}
          <TouchableOpacity
            style={styles.googleBtn}
            activeOpacity={0.85}
            onPress={handleGoogleRegister}
          >
            <View style={styles.googleIconCircle}>
              <Text style={styles.googleGText}>G</Text>
            </View>
            <Text style={styles.googleBtnText}>S'inscrire avec Google</Text>
          </TouchableOpacity>

          {/* Séparateur */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou avec votre e-mail</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Formulaire unique Relio */}
          <View style={styles.form}>
            {/* Nom complet */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom complet</Text>
              <TextInput
                style={styles.input}
                placeholder="ex. Alice Moreau"
                placeholderTextColor={colors.placeholder}
                value={nom}
                onChangeText={setNom}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse e-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="alice.moreau@email.com"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Téléphone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro de téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="+33 6 12 34 56 78"
                placeholderTextColor={colors.placeholder}
                value={telephone}
                onChangeText={setTelephone}
                keyboardType="phone-pad"
              />
            </View>

            {/* Mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bouton Inscription */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.88}
              onPress={handleRegister}
            >
              <Text style={styles.submitBtnText}>Créer mon compte</Text>
            </TouchableOpacity>
          </View>

          {/* Bas de page : Déjà un compte */}
          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerLinkText}>Vous avez déjà un compte ? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)' as any)}>
              <Text style={styles.footerLinkBold}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logo: {
    width: width * 0.5,
    height: 60,
  },
  titleSection: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 20,
  },

  /* Google Button */
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  googleIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleGText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 14,
  },
  googleBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },

  /* Divider */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: 13,
    color: colors.grayMedium,
    fontWeight: '500',
  },

  /* Form */
  form: {
    gap: spacing.md,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.grayVeryDark,
  },
  passwordInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },

  /* Submit Button */
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },

  /* Footer Link */
  footerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerLinkText: {
    fontSize: 14,
    color: colors.grayDark,
  },
  footerLinkBold: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
