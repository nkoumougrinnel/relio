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
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Compte Pro</Text>
        </View>

        <View style={styles.body}>
          <ProfileIdentityCard
            name={profile.fullName}
            avatarUrl={profile.avatarUrl}
            phone={profile.phone}
            specialty={profile.specialty}
            badgeLabel={profile.verified ? 'PRO VÉRIFIÉ' : undefined}
          />

          <ProfileMenuSection
            title="Gestion du compte"
            entries={accountEntries}
          />

          <View style={styles.clientCard}>
            <View style={styles.clientCardText}>
              <Text style={styles.clientCardTitle}>
                Passer à l&apos;espace Client
              </Text>
              <Text style={styles.clientCardSub}>
                Commandez des services pour votre domicile.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.switchClientBtn}
              onPress={() => router.replace('/(client)/(tabs)' as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.switchClientBtnText}>Passer en Client</Text>
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  clientCard: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.md,
  },
  clientCardText: {
    flex: 1,
  },
  clientCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  clientCardSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  switchClientBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
  },
  switchClientBtnText: {
    color: colors.white,
    fontSize: 12,
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
