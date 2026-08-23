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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Header } from '../../../components/ui';
import { authService } from '../../auth/services/auth.service';
import { profileService } from '../services/profile.service';
import { ProfileIdentityCard } from '../components/ProfileIdentityCard';
import {
  ProfileMenuEntry,
  ProfileMenuSection,
} from '../components/ProfileMenuSection';

export function ProviderProfileScreen() {
  const router = useRouter();

  const profile = profileService.getProviderProfile();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter de votre compte prestataire ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            router.replace('/welcome' as any);
          },
        },
      ]
    );
  };

  const accountEntries: ProfileMenuEntry[] = [
    { id: 'personal-info', icon: 'user', label: 'Informations personnelles' },
    { id: 'documents', icon: 'award', label: 'Documents & Qualifications' },
    {
      id: 'bank-details',
      icon: 'credit-card',
      label: 'Coordonnées bancaires & RIB',
    },
  ];

  const otherEntries: ProfileMenuEntry[] = [
    {
      id: 'support',
      icon: 'help-circle',
      label: 'Support Prestataires',
      tint: 'muted',
    },
    {
      id: 'terms',
      icon: 'shield',
      label: 'Conditions & Assurance',
      tint: 'muted',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Mon Compte Pro" bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <ProfileIdentityCard
            name={profile.fullName}
            avatarUrl={profile.avatarUrl}
            phone={profile.phone}
            specialty={profile.specialty}
          />

          <ProfileMenuSection
            title="Gestion du compte"
            entries={accountEntries}
          />

          <View style={styles.clientCard}>
            <View style={styles.clientIcon}>
              <Feather name="home" size={20} color={colors.primary} />
            </View>
            <Text style={styles.clientCardTitle}>Espace Client</Text>
            <Text style={styles.clientCardSub}>
              Commandez des services pour votre domicile.
            </Text>
            <TouchableOpacity
              style={styles.switchClientBtn}
              onPress={() => router.replace('/(client)/(tabs)' as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.switchClientBtnText}>
                Passer à l&apos;espace Client
              </Text>
            </TouchableOpacity>
          </View>

          <ProfileMenuSection title="Autres" entries={otherEntries} />

          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={18} color={colors.error} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: spacing.xl,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  clientCard: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E5FF',
  },
  clientIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
  },
  clientCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
  },
  clientCardSub: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: spacing.md,
  },
  switchClientBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: borderRadius.full,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  switchClientBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  logoutBtn: {
    backgroundColor: '#FFF0F0',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '700',
  },
});
