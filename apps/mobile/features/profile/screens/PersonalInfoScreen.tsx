import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header, Input } from '../../../components/ui';
import { profileService } from '../services/profile.service';
import { AvatarPicker } from '../components/AvatarPicker';

export function PersonalInfoScreen() {
  const router = useRouter();

  const [personalInfo, setPersonalInfo] = useState(
    profileService.getPersonalInfo()
  );
  const [saving, setSaving] = useState(false);

  const updateField = (field: keyof typeof personalInfo, value: string) =>
    setPersonalInfo((current) => ({ ...current, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await profileService.updatePersonalInfo(personalInfo);
      Alert.alert(
        'Modifications enregistrées',
        'Vos informations personnelles ont été mises à jour.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Informations personnelles" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <AvatarPicker uri={personalInfo.avatarUrl} />
        </View>

        <View style={styles.formCard}>
          <Input
            label="Prénom"
            value={personalInfo.firstName}
            onChangeText={(value) => updateField('firstName', value)}
            placeholder="Prénom"
          />

          <Input
            label="Nom"
            value={personalInfo.lastName}
            onChangeText={(value) => updateField('lastName', value)}
            placeholder="Nom"
          />

          <Input
            label="Numéro de téléphone"
            value={personalInfo.phone}
            onChangeText={(value) => updateField('phone', value)}
            keyboardType="phone-pad"
            placeholder="+237 ..."
          />

          <Input
            label="Adresse email"
            value={personalInfo.email}
            onChangeText={(value) => updateField('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="email@domaine.com"
          />
        </View>
      </ScrollView>

      <BottomBar>
        <Button
          title="Enregistrer les modifications"
          loading={saving}
          onPress={handleSave}
        />
      </BottomBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
});
