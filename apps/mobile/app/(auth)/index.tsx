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
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Redirection vers le dashboard client après connexion
    router.replace('/(client)/(tabs)' as any);
  };

  const handleGoogleLogin = () => {
    // Logique auth Google
    router.replace('/(client)/(tabs)' as any);
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
          {/* Header : Logo Horizontal */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo-horizontal.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Titre & Introduction */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour accéder à votre espace Relio.
            </Text>
          </View>

          {/* Formulaire */}
          <View style={styles.form}>
            {/* Champ Email ou téléphone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email ou téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="jean.dupont@email.com"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Champ Mot de passe */}
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
                  <Feather 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color={colors.grayDark} 
                  />
                </TouchableOpacity>
              </View>
              {/* Mot de passe oublié ? */}
              <TouchableOpacity activeOpacity={0.7} style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>

            {/* Bouton Se connecter */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.88}
              onPress={handleLogin}
            >
              <Text style={styles.submitBtnText}>Se connecter</Text>
            </TouchableOpacity>
          </View>

          {/* Séparateur */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Bouton Continuer avec Google */}
          <TouchableOpacity
            style={styles.googleBtn}
            activeOpacity={0.85}
            onPress={handleGoogleLogin}
          >
            <View style={styles.googleIconCircle}>
              <Text style={styles.googleGText}>G</Text>
            </View>
            <Text style={styles.googleBtnText}>Continuer avec Google</Text>
          </TouchableOpacity>

          {/* Bas de page : Lien vers création de compte */}
          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerLinkText}>
              Vous n'avez pas encore de compte ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/register' as any)}
            >
              <Text style={styles.footerLinkBold}>Créer un compte</Text>
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
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 140,
    height: 45,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayDark,
    lineHeight: 24,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  input: {
    backgroundColor: colors.white,
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
  forgotBtn: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  forgotText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: 14,
    color: colors.grayMedium,
    fontWeight: '500',
  },
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
