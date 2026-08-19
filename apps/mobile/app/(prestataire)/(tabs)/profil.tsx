import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather } from '@expo/vector-icons';

export default function PrestataireProfilScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter de votre compte prestataire ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => router.replace('/welcome' as any),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Compte Pro</Text>
        </View>

        {/* 1. CARTE D'IDENTITÉ DU COMPTE PRESTATAIRE */}
        <View style={styles.identityCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }}
            style={styles.avatar}
          />
          <View style={styles.identityInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Jean Mbarga</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO VÉRIFIÉ</Text>
              </View>
            </View>
            <Text style={styles.userRole}>Électricien & Climatisation</Text>
            <Text style={styles.userPhone}>+237 6 99 00 11 22</Text>
          </View>
        </View>

        {/* 2. SECTION MON COMPTE PRO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion du compte</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconCircle}>
                <Feather name="user" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuLabel}>Informations personnelles</Text>
              <Feather name="chevron-right" size={18} color={colors.grayMedium} />
            </TouchableOpacity>

            <View style={styles.menuSep} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconCircle}>
                <Feather name="award" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuLabel}>Documents & Qualifications</Text>
              <Feather name="chevron-right" size={18} color={colors.grayMedium} />
            </TouchableOpacity>

            <View style={styles.menuSep} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconCircle}>
                <Feather name="credit-card" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuLabel}>Coordonnées bancaires & RIB</Text>
              <Feather name="chevron-right" size={18} color={colors.grayMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. SWITCH VERS ESPACE CLIENT */}
        <View style={styles.clientCard}>
          <View style={styles.clientCardText}>
            <Text style={styles.clientCardTitle}>Passer à l'espace Client</Text>
            <Text style={styles.clientCardSub}>Commandez des services pour votre domicile.</Text>
          </View>
          <TouchableOpacity
            style={styles.switchClientBtn}
            onPress={() => router.replace('/(client)/(tabs)' as any)}
          >
            <Text style={styles.switchClientBtnText}>Passer en Client</Text>
          </TouchableOpacity>
        </View>

        {/* 4. SECTION AUTRES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autres</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconCircle}>
                <Feather name="help-circle" size={18} color={colors.grayDark} />
              </View>
              <Text style={styles.menuLabel}>Support Prestataires</Text>
              <Feather name="chevron-right" size={18} color={colors.grayMedium} />
            </TouchableOpacity>

            <View style={styles.menuSep} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconCircle}>
                <Feather name="shield" size={18} color={colors.grayDark} />
              </View>
              <Text style={styles.menuLabel}>Conditions & Assurance</Text>
              <Feather name="chevron-right" size={18} color={colors.grayMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. DÉCONNEXION */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7} onPress={handleLogout}>
          <Feather name="log-out" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
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
  identityCard: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  identityInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  proBadge: {
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.success,
  },
  userRole: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },
  userPhone: {
    fontSize: 12,
    color: colors.grayMedium,
    marginTop: 2,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  menuIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  menuSep: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 54,
  },
  clientCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
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
