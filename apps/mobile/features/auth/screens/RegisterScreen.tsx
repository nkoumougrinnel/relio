import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Button, Input, Header } from '../../../components/ui';
import { authService } from '../services/auth.service';

export function RegisterScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cguAccepted, setCguAccepted] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      await authService.register({
        firstName,
        lastName,
        phone,
        email,
        password,
        cguAccepted,
        privacyAccepted,
      });
      router.push('/(auth)/verify' as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Créer mon compte" showBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Input
              label="Prénom"
              placeholder="Jean"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Input
              label="Nom"
              placeholder="Dupont"
              value={lastName}
              onChangeText={setLastName}
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Téléphone</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryEmoji}>🇨🇲</Text>
                  <Text style={styles.countryPrefix}>+237</Text>
                </View>
                <Input
                  placeholder="6 95 12 34 56"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  containerStyle={{ flex: 1 }}
                />
              </View>
            </View>

            <Input
              label="Email"
              placeholder="jean.dupont@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              rightIcon={
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.grayDark}
                />
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />
          </View>

          {/* Conditions */}
          <View style={styles.conditionsBlock}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setCguAccepted(!cguAccepted)}
            >
              <View style={[styles.checkbox, cguAccepted && styles.checkboxActive]}>
                {cguAccepted && <Feather name="check" size={14} color={colors.white} />}
              </View>
              <Text style={styles.checkboxText}>
                J&apos;accepte les <Text style={styles.linkText}>Conditions Générales d&apos;Utilisation</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setPrivacyAccepted(!privacyAccepted)}
            >
              <View style={[styles.checkbox, privacyAccepted && styles.checkboxActive]}>
                {privacyAccepted && <Feather name="check" size={14} color={colors.white} />}
              </View>
              <Text style={styles.checkboxText}>
                J&apos;accepte la <Text style={styles.linkText}>Politique de confidentialité</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Continuer"
            variant="primary"
            loading={loading}
            onPress={handleContinue}
            style={styles.submitBtn}
          />
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
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 52,
    gap: 6,
  },
  countryEmoji: {
    fontSize: 18,
  },
  countryPrefix: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  conditionsBlock: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    fontSize: 14,
    color: colors.grayDark,
    flex: 1,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: spacing.xl,
  },
});
