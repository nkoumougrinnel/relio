import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Checkboxes state
  const [cguAccepted, setCguAccepted] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  const handleContinue = () => {
    // Navigation vers la vérification OTP
    router.push('/(auth)/verify' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header : Retour + Titre */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color={colors.grayVeryDark} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Créer mon compte</Text>
        </View>
        
        {/* Un View vide pour équilibrer le header avec la flèche */}
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Formulaire */}
          <View style={styles.form}>
            {/* Prénom */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Jean"
                placeholderTextColor={colors.placeholder}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            {/* Nom */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Dupont"
                placeholderTextColor={colors.placeholder}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            {/* Téléphone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Téléphone</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryEmoji}>🇨🇲</Text>
                  <Text style={styles.countryPrefix}>+237</Text>
                </View>
                <TextInput
                  style={[styles.input, styles.phoneInput]}
                  placeholder="6 95 12 34 56"
                  placeholderTextColor={colors.placeholder}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
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
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={colors.grayDark}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Conditions */}
          <View style={styles.conditionsBlock}>
            {/* CGU */}
            <TouchableOpacity 
              style={styles.checkboxRow} 
              activeOpacity={0.8}
              onPress={() => setCguAccepted(!cguAccepted)}
            >
              <View style={[styles.checkbox, cguAccepted && styles.checkboxActive]}>
                {cguAccepted && <Feather name="check" size={14} color={colors.white} />}
              </View>
              <Text style={styles.checkboxText}>
                J'accepte les <Text style={styles.linkText}>Conditions Générales d'Utilisation</Text>
              </Text>
            </TouchableOpacity>

            {/* Politique */}
            <TouchableOpacity 
              style={styles.checkboxRow} 
              activeOpacity={0.8}
              onPress={() => setPrivacyAccepted(!privacyAccepted)}
            >
              <View style={[styles.checkbox, privacyAccepted && styles.checkboxActive]}>
                {privacyAccepted && <Feather name="check" size={14} color={colors.white} />}
              </View>
              <Text style={styles.checkboxText}>
                J'accepte la <Text style={styles.linkText}>Politique de confidentialité</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bouton Continuer */}
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.88}
            onPress={handleContinue}
          >
            <Text style={styles.submitBtnText}>Continuer</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // fond blanc
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  backBtn: {
    padding: spacing.xs,
    width: 40,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  subtitle: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  form: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 14,
    gap: 4,
  },
  countryEmoji: {
    fontSize: 16,
  },
  countryPrefix: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.grayVeryDark,
  },
  phoneInput: {
    flex: 1,
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
  
  /* Checkboxes */
  conditionsBlock: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1, // alignement optique
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: colors.grayVeryDark,
    lineHeight: 20,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },

  /* Bouton */
  submitBtn: {
    backgroundColor: colors.primary,
    height: 48, // hauteur demandée
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
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
});
