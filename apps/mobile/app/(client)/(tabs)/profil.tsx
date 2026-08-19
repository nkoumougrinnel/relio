import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather } from '@expo/vector-icons';

export default function ProfilScreen() {
  const router = useRouter();

  // Simule l'état de la candidature pro : 'none' | 'pending'
  const [proStatus, setProStatus] = useState<'none' | 'pending'>('none');

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter de Relio ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login' as any),
        },
      ]
    );
  };

  const handleBecomeProAction = () => {
    router.push('/(client)/profil/become-pro' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Carte d'identité du compte */}
        <TouchableOpacity
          style={styles.userCard}
          activeOpacity={0.7}
          onPress={() => router.push('/(client)/profil/personal-info' as any)}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jean Dupont</Text>
            <Text style={styles.userPhone}>+237 6 95 12 34 56</Text>
            <Text style={styles.userEmail}>jean.dupont@email.com</Text>
          </View>
          <Feather name="chevron-right" size={22} color={colors.grayDark} />
        </TouchableOpacity>

        {/* 2. Section MON COMPTE */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>MON COMPTE</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => router.push('/(client)/profil/personal-info' as any)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Feather name="user" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuLabel}>Informations personnelles</Text>
              <Feather name="chevron-right" size={18} color={colors.grayDark} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Petite carte "Vous êtes un pro ?" — Promotionnelle et compacte */}
        <View style={styles.proPromoCard}>
          <View style={styles.proPromoLeft}>
            <Text style={styles.proPromoTitle}>
              {proStatus === 'pending' ? 'Validation en cours' : 'Vous êtes un pro ?'}
            </Text>
            <Text style={styles.proPromoSub}>
              {proStatus === 'pending'
                ? 'Votre candidature est en cours de vérification sous 24h.'
                : 'Proposez vos services et recevez des missions près de chez vous.'}
            </Text>

            <TouchableOpacity
              style={[styles.proPromoBtn, proStatus === 'pending' && styles.proPromoBtnPending]}
              onPress={handleBecomeProAction}
              activeOpacity={0.85}
            >
              <Text style={[styles.proPromoBtnText, proStatus === 'pending' && styles.proPromoBtnTextPending]}>
                {proStatus === 'pending' ? 'Voir le statut' : 'Devenir prestataire'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.proPromoRight}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }}
              style={styles.proArtisanImg}
            />
          </View>
        </View>

        {/* 4. Section AUTRES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>AUTRES</Text>
          <View style={styles.cardGroup}>
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => Alert.alert('Aide et support', 'Contactez le support Relio à support@relio.cm')}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Feather name="help-circle" size={18} color={colors.grayDark} />
              </View>
              <Text style={styles.menuLabel}>Aide et support</Text>
              <Feather name="chevron-right" size={18} color={colors.grayDark} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => Alert.alert('À propos de Relio', 'Relio v1.0.0 — Plateforme de mise en relation de confiance.')}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Feather name="info" size={18} color={colors.grayDark} />
              </View>
              <Text style={styles.menuLabel}>À propos de Relio</Text>
              <Feather name="chevron-right" size={18} color={colors.grayDark} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => Alert.alert('Conditions d\'utilisation', 'CGU disponible sur relio.cm/terms')}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Feather name="file-text" size={18} color={colors.grayDark} />
              </View>
              <Text style={styles.menuLabel}>Conditions d'utilisation</Text>
              <Feather name="chevron-right" size={18} color={colors.grayDark} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => Alert.alert('Politique de confidentialité', 'Politique disponible sur relio.cm/privacy')}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Feather name="shield" size={18} color={colors.grayDark} />
              </View>
              <Text style={styles.menuLabel}>Politique de confidentialité</Text>
              <Feather name="chevron-right" size={18} color={colors.grayDark} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Déconnexion */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Feather name="log-out" size={18} color={colors.error} style={{ marginRight: 8 }} />
          <Text style={styles.logoutBtnText}>Déconnexion</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },

  /* 1. Carte d'identité */
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 13,
    color: colors.grayDark,
  },
  userEmail: {
    fontSize: 12,
    color: colors.grayMedium,
  },

  /* Sections */
  sectionContainer: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayDark,
    textTransform: 'uppercase',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  cardGroup: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    gap: spacing.md,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 56,
  },

  /* 3. Petite carte Devenir Prestataire */
  proPromoCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    alignItems: 'center',
    gap: spacing.md,
  },
  proPromoLeft: {
    flex: 1,
    gap: 6,
  },
  proPromoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  proPromoSub: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 16,
  },
  proPromoBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  proPromoBtnPending: {
    backgroundColor: '#E8F8F0',
    borderWidth: 1,
    borderColor: colors.success,
  },
  proPromoBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  proPromoBtnTextPending: {
    color: colors.success,
  },
  proPromoRight: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.white,
  },
  proArtisanImg: {
    width: '100%',
    height: '100%',
  },

  /* 5. Déconnexion */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
