import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Header } from '../../../components/ui';
import { authService } from '../../auth/services/auth.service';
import { profileService } from '../services/profile.service';
import { proApplicationService } from '../services/pro-application.service';
import { ProfileIdentityCard } from '../components/ProfileIdentityCard';
import {
  ProfileMenuEntry,
  ProfileMenuSection,
} from '../components/ProfileMenuSection';
import { BecomeProPromoCard } from '../components/BecomeProPromoCard';

export function ClientProfileScreen() {
  const router = useRouter();

  const profile = profileService.getClientProfile();
  const proStatus = proApplicationService.getStatus();

  const openPersonalInfo = () =>
    router.push('/(client)/profil/personal-info' as any);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter de Relio ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            router.replace('/(auth)/login' as any);
          },
        },
      ]
    );
  };

  const accountEntries: ProfileMenuEntry[] = [
    {
      id: 'personal-info',
      icon: 'user',
      label: 'Informations personnelles',
      onPress: openPersonalInfo,
    },
  ];

  const otherEntries: ProfileMenuEntry[] = [
    {
      id: 'support',
      icon: 'help-circle',
      label: 'Aide et support',
      tint: 'muted',
      onPress: () =>
        Alert.alert(
          'Aide et support',
          'Contactez le support Relio à support@relio.cm'
        ),
    },
    {
      id: 'about',
      icon: 'info',
      label: 'À propos de Relio',
      tint: 'muted',
      onPress: () =>
        Alert.alert(
          'À propos de Relio',
          'Relio v1.0.0 — Plateforme de mise en relation de confiance.'
        ),
    },
    {
      id: 'terms',
      icon: 'file-text',
      label: "Conditions d'utilisation",
      tint: 'muted',
      onPress: () =>
        Alert.alert(
          "Conditions d'utilisation",
          'CGU disponible sur relio.cm/terms'
        ),
    },
    {
      id: 'privacy',
      icon: 'shield',
      label: 'Politique de confidentialité',
      tint: 'muted',
      onPress: () =>
        Alert.alert(
          'Politique de confidentialité',
          'Politique disponible sur relio.cm/privacy'
        ),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Profil" bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileIdentityCard
          name={profile.fullName}
          avatarUrl={profile.avatarUrl}
          phone={profile.phone}
          email={profile.email}
          onPress={openPersonalInfo}
        />

        <ProfileMenuSection title="Mon compte" entries={accountEntries} />

        <BecomeProPromoCard
          status={proStatus}
          onPress={() => router.push('/(client)/profil/become-pro' as any)}
        />

        <ProfileMenuSection title="Autres" entries={otherEntries} />

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={18} color={colors.error} />
          <Text style={styles.logoutBtnText}>Déconnexion</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    gap: spacing.md,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.error,
    borderRadius: borderRadius.md,
    height: 48,
    marginTop: spacing.xs,
  },
  logoutBtnText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 30,
  },
});
