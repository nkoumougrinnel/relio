import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Catégories — icônes vectorielles, pas d'emoji
// Les 8 catégories tiennent sur 2 rangées de 4 dans la grille
const CATEGORIES = [
  { id: 'electricite',    label: 'Électricité',   icon: 'zap',         iconLib: 'feather',  bg: '#FFF9E6', iconColor: '#F59E0B' },
  { id: 'plomberie',      label: 'Plomberie',     icon: 'droplet',     iconLib: 'feather',  bg: '#EEF9FF', iconColor: '#0288D1' },
  { id: 'climatisation',  label: 'Climatisation', icon: 'wind',        iconLib: 'feather',  bg: '#E8F8F8', iconColor: '#00ACC1' },
  { id: 'automobile',     label: 'Automobile',    icon: 'truck',       iconLib: 'feather',  bg: '#F0F4FF', iconColor: '#3F51B5' },
  { id: 'electronique',   label: 'Électronique',  icon: 'smartphone',  iconLib: 'feather',  bg: '#F5F0FF', iconColor: '#7C3AED' },
  { id: 'maison',         label: 'Maison',        icon: 'home',        iconLib: 'feather',  bg: '#EFFFF5', iconColor: '#10B981' },
  { id: 'serrurerie',     label: 'Serrurerie',    icon: 'key',         iconLib: 'feather',  bg: '#FFF5F5', iconColor: '#E53E3E' },
  { id: 'autres',         label: 'Autres',        icon: 'grid',        iconLib: 'feather',  bg: '#F5F7FA', iconColor: '#757575' },
];


const RECENT_DEMANDS = [
  {
    id: '1',
    title: 'Climatisation réparée',
    location: 'Bonapriso, Douala',
    date: '12 juin 2026',
    status: 'Terminée',
    iconName: 'wind',
    iconBg: '#E8F8F8',
    iconColor: '#00ACC1',
  },
  {
    id: '2',
    title: 'Problème d\'électricité',
    location: 'Akwa, Douala',
    date: '11 juin 2026',
    status: 'En attente',
    iconName: 'zap',
    iconBg: '#FFF9E6',
    iconColor: '#F59E0B',
  },
];

export default function ClientHomeScreen() {
  const router = useRouter();
  const [problemText, setProblemText] = useState('');

  const handleSendProblem = (categoryId?: string, categoryLabel?: string) => {
    router.push({
      pathname: '/(client)/demande',
      params: {
        initialText: problemText || (categoryLabel ? `Besoin en ${categoryLabel}` : ''),
        isAudio: 'false',
        category: categoryLabel || 'Électricité',
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER — Scrollable avec le contenu — Maquette 16 ═══ */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/logo-horizontal.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
            <Feather name="bell" size={24} color={colors.grayVeryDark} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        {/* ═══ GREETING & SWITCH DE DÉMO ═══ */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingHeaderRow}>
            <Text style={styles.greetingText}>Bonjour Jean 👋</Text>

            {/* Switch de mode — Passerelle de démo sans backend */}
            <TouchableOpacity
              style={styles.modeSwitchBadge}
              activeOpacity={0.8}
              onPress={() => router.replace('/(prestataire)/(tabs)' as any)}
            >
              <View style={styles.modeDot} />
              <Text style={styles.modeSwitchText}>Client</Text>
              <Feather name="chevron-down" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.mainTitle}>
            Quel problème devons-nous{'\n'}résoudre aujourd'hui ?
          </Text>
        </View>

        {/* ═══ BARRE DE SAISIE PRINCIPALE — Point focal ═══ */}
        <View style={styles.inputCard}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Décrivez votre problème..."
              placeholderTextColor={colors.placeholder}
              value={problemText}
              onChangeText={setProblemText}
              multiline
              maxLength={200}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={[styles.actionBtn, problemText.length > 0 ? styles.sendBtn : styles.micBtn]}
              activeOpacity={0.8}
              onPress={() => handleSendProblem()}
            >
              {problemText.length > 0 ? (
                <Feather name="send" size={18} color={colors.white} />
              ) : (
                <Feather name="mic" size={20} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ═══ CATÉGORIES POPULAIRES — Grille carrée — Maquette 16 ═══ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories populaires</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {/* 4 catégories fixes, pas de scroll */}
          <View style={styles.categoriesRow}>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => handleSendProblem(cat.id, cat.label)}
              >
                <View style={[styles.categoryIconBox, { backgroundColor: cat.bg }]}>
                  <Feather name={cat.icon as any} size={20} color={cat.iconColor} />
                </View>
                <Text style={styles.categoryLabel} numberOfLines={1}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ═══ DERNIÈRES DEMANDES — Maquette 16 ═══ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dernières demandes</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/(client)/(tabs)/demandes' as any)}
            >
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.requestsContainer}>
            {RECENT_DEMANDS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.requestCard}
                activeOpacity={0.7}
                onPress={() => router.push('/(client)/(tabs)/demandes' as any)}
              >
                <View style={[styles.requestIconCircle, { backgroundColor: item.iconBg }]}>
                  <Feather name={item.iconName as any} size={18} color={item.iconColor} />
                </View>
                <View style={styles.requestInfo}>
                  <Text style={styles.requestTitle}>{item.title}</Text>
                  <Text style={styles.requestSubtitle}>{item.location}</Text>
                  <Text style={styles.requestDate}>{item.date}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  item.status === 'Terminée' ? styles.badgeDone : styles.badgePending,
                ]}>
                  <Text style={[
                    styles.statusBadgeText,
                    item.status === 'Terminée' ? styles.textDone : styles.textPending,
                  ]}>
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ═══ BLOC "VOUS ÊTES UN PRO ?" — Compacte, maquette E37 ═══ */}
        <View style={styles.proPromoCard}>
          <View style={styles.proPromoLeft}>
            <Text style={styles.proPromoTitle}>Vous êtes un professionnel ?</Text>
            <Text style={styles.proPromoSub}>
              Recevez des missions près de chez vous.
            </Text>
            <TouchableOpacity
              style={styles.proPromoBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/(client)/profil/become-pro' as any)}
            >
              <Text style={styles.proPromoBtnText}>Devenir prestataire</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }}
            style={styles.proPromoImg}
          />
        </View>

        <View style={{ height: 40 }} />
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

  /* ══ HEADER — dans le scroll ══ */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  logo: {
    height: 38,
    width: 100,
  },
  notifBtn: {
    position: 'relative',
    padding: spacing.xs,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4B4B',
    borderWidth: 2,
    borderColor: colors.white,
  },

  /* ══ GREETING — Hero section ══ */
  greetingSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.white,
  },
  greetingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 18,
    color: colors.grayDark,
    fontWeight: '600',
  },
  modeSwitchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#D4E3FF',
    gap: 6,
  },
  modeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  modeSwitchText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.grayVeryDark,
    lineHeight: 36,
  },

  /* ══ INPUT CARD — Point focal hero ══ */
  inputCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.lg,
    gap: spacing.sm,
    minHeight: 120,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    color: colors.grayVeryDark,
    minHeight: 96,
    maxHeight: 160,
    lineHeight: 25,
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  micBtn: {
    backgroundColor: colors.primary,
  },
  sendBtn: {
    backgroundColor: colors.success,
  },

  /* ══ SECTIONS ══ */
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  /* ══ CATÉGORIES — 4 cases fixes pleine largeur ══ */
  categoriesRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  categoryIconBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.grayVeryDark,
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  /* ══ DEMANDES RÉCENTES ══ */
  requestsContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  requestIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 1,
  },
  requestSubtitle: {
    fontSize: 12,
    color: colors.grayDark,
  },
  requestDate: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  badgeDone: {
    backgroundColor: '#E8F8F0',
  },
  badgePending: {
    backgroundColor: '#FFF9E6',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textDone: {
    color: colors.success,
  },
  textPending: {
    color: colors.warning,
  },

  /* ══ BLOC PRO COMPACT ══ */
  proPromoCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.md,
    overflow: 'hidden',
  },
  proPromoLeft: {
    flex: 1,
    gap: 5,
  },
  proPromoTitle: {
    fontSize: 14,
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
    paddingVertical: 7,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  proPromoBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  proPromoImg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
