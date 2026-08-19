import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data pour les missions disponibles
const MOCK_AVAILABLE_MISSIONS = [
  {
    id: 'm1',
    category: 'Électricité',
    categoryIcon: 'zap',
    iconBg: '#FFF9E6',
    iconColor: '#F59E0B',
    title: 'Panne tableau électrique',
    description: 'Disjoncteur général qui saute continuellement depuis ce matin.',
    location: 'Akwa, Douala',
    distance: '1,2 km',
    priceRange: '15 000 – 25 000 FCFA',
    timeAgo: 'Il y a 4 min',
  },
  {
    id: 'm2',
    category: 'Climatisation',
    categoryIcon: 'wind',
    iconBg: '#E8F8F8',
    iconColor: '#00ACC1',
    title: 'Fuite d\'eau climatiseur Split',
    description: 'Le spit fuit goutte à goutte à l\'intérieur du salon.',
    location: 'Bonapriso, Douala',
    distance: '2,8 km',
    priceRange: '20 000 – 35 000 FCFA',
    timeAgo: 'Il y a 12 min',
  },
  {
    id: 'm3',
    category: 'Plomberie',
    categoryIcon: 'droplet',
    iconBg: '#EEF9FF',
    iconColor: '#0288D1',
    title: 'Remplacement robinet cuisine',
    description: 'Robinet cassé au niveau du raccord tuyau.',
    location: 'Bally, Douala',
    distance: '3,5 km',
    priceRange: '12 000 – 18 000 FCFA',
    timeAgo: 'Il y a 25 min',
  },
];

export default function PrestataireHomeScreen() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const missions = isAvailable ? MOCK_AVAILABLE_MISSIONS : [];
  const currentMission = missions[activeCardIndex] || missions[0];

  const handleNextCard = () => {
    if (activeCardIndex < missions.length - 1) {
      setActiveCardIndex((prev) => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex((prev) => prev - 1);
    }
  };

  const handleViewMission = (missionId: string) => {
    router.push({
      pathname: '/(prestataire)/mission/detail',
      params: { id: missionId },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER — Logo & Cloche Notifications ═══ */}
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

        {/* ═══ GREETING & SWITCH CLIENT/PRESTATAIRE DE DÉMO ═══ */}
        <View style={styles.greetingRow}>
          <Text style={styles.greetingText}>Bonjour Jean 👋</Text>

          {/* Switch de mode — Passerelle de démo sans backend */}
          <TouchableOpacity
            style={styles.modeSwitchBadge}
            activeOpacity={0.8}
            onPress={() => router.replace('/(client)/(tabs)' as any)}
          >
            <View style={styles.modeDot} />
            <Text style={styles.modeSwitchText}>Prestataire</Text>
            <Feather name="chevron-down" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* ═══ CARTE DE DISPONIBILITÉ (COMPACTE) ═══ */}
        <View style={[styles.availabilityCard, !isAvailable && styles.availabilityCardOff]}>
          <View style={styles.availabilityLeft}>
            <View style={styles.statusTitleRow}>
              <View style={[styles.statusDot, isAvailable ? styles.dotGreen : styles.dotGray]} />
              <Text style={styles.availabilityTitle}>
                {isAvailable ? 'Disponible' : 'Indisponible'}
              </Text>
            </View>
            <Text style={styles.availabilitySub}>
              {isAvailable
                ? 'Vous recevez des missions en temps réel.'
                : 'Vous ne recevez pas de nouvelles missions.'}
            </Text>
          </View>

          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: colors.border, true: '#D1E4FF' }}
            thumbColor={isAvailable ? colors.primary : colors.grayMedium}
          />
        </View>

        {/* ═══ SECTION MISSIONS DISPONIBLES — PILE DE CARTES ═══ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Missions disponibles</Text>
              <Text style={styles.sectionSub}>
                {isAvailable
                  ? `${missions.length} mission${missions.length > 1 ? 's' : ''} près de vous`
                  : 'Mode indisponible actif'}
              </Text>
            </View>

            {isAvailable && missions.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/(prestataire)/(tabs)/missions' as any)}
              >
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* CAS 1 : Disponible + Missions présentes → Carte directe avec navigation flèches */}
          {isAvailable && missions.length > 0 && (
            <View style={styles.cardContainer}>
              {/* Carte Principale */}
              <TouchableOpacity
                style={styles.mainMissionCard}
                activeOpacity={0.95}
                onPress={() => handleViewMission(currentMission.id)}
              >
                {/* En-tête de la carte : Catégorie + Temps */}
                <View style={styles.cardHeader}>
                  <View style={styles.categoryPill}>
                    <View style={[styles.categoryIconCircle, { backgroundColor: currentMission.iconBg }]}>
                      <Feather name={currentMission.categoryIcon as any} size={14} color={currentMission.iconColor} />
                    </View>
                    <Text style={styles.categoryPillText}>{currentMission.category}</Text>
                  </View>

                  <Text style={styles.timeAgoText}>{currentMission.timeAgo}</Text>
                </View>

                {/* Titre & Description */}
                <Text style={styles.missionTitle}>{currentMission.title}</Text>
                <Text style={styles.missionDesc} numberOfLines={2}>
                  {currentMission.description}
                </Text>

                {/* Localisation & Distance */}
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={15} color={colors.primary} />
                  <Text style={styles.locationText}>{currentMission.location}</Text>
                  <Text style={styles.dotSep}>•</Text>
                  <Text style={styles.distanceBadge}>📍 {currentMission.distance}</Text>
                </View>

                {/* Prix & Bouton d'action */}
                <View style={styles.cardFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Budget estimé</Text>
                    <Text style={styles.priceValue}>{currentMission.priceRange}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.viewMissionBtn}
                    activeOpacity={0.8}
                    onPress={() => handleViewMission(currentMission.id)}
                  >
                    <Text style={styles.viewMissionBtnText}>Voir la mission</Text>
                    <Feather name="arrow-right" size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Navigation Flèches Précédent / Suivant + Compteur */}
              {missions.length > 1 && (
                <View style={styles.navBarRow}>
                  <TouchableOpacity
                    style={[styles.arrowBtn, activeCardIndex === 0 && styles.arrowBtnDisabled]}
                    disabled={activeCardIndex === 0}
                    onPress={handlePrevCard}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="chevron-left"
                      size={20}
                      color={activeCardIndex === 0 ? colors.grayMedium : colors.grayVeryDark}
                    />
                  </TouchableOpacity>

                  <View style={styles.counterBadge}>
                    <Text style={styles.counterText}>
                      Demande <Text style={styles.counterHighlight}>{activeCardIndex + 1}</Text> sur {missions.length}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.arrowBtn, activeCardIndex === missions.length - 1 && styles.arrowBtnDisabled]}
                    disabled={activeCardIndex === missions.length - 1}
                    onPress={handleNextCard}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={activeCardIndex === missions.length - 1 ? colors.grayMedium : colors.grayVeryDark}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {/* CAS 2 : Indisponible */}
          {!isAvailable && (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Feather name="moon" size={24} color={colors.grayDark} />
              </View>
              <Text style={styles.emptyTitle}>Vous êtes indisponible</Text>
              <Text style={styles.emptySub}>
                Activez votre disponibilité pour recevoir des opportunités en temps réel.
              </Text>
              <TouchableOpacity
                style={styles.enableBtn}
                activeOpacity={0.8}
                onPress={() => setIsAvailable(true)}
              >
                <Text style={styles.enableBtnText}>Devenir disponible</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* CAS 3 : Disponible mais 0 mission */}
          {isAvailable && missions.length === 0 && (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Feather name="inbox" size={24} color={colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>Aucune mission pour le moment</Text>
              <Text style={styles.emptySub}>
                Nous vous préviendrons dès qu'une mission correspondant à votre profil sera disponible.
              </Text>
            </View>
          )}
        </View>

        {/* ═══ RÉSUMÉ DE LA JOURNÉE — Aujourd'hui (2 cartes compactes) ═══ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleHeader}>Aujourd'hui</Text>

          <View style={styles.summaryGrid}>
            {/* Carte 1 : Missions */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconBox}>
                <Feather name="check-circle" size={18} color={colors.primary} />
              </View>
              <Text style={styles.summaryLabel}>Missions</Text>
              <Text style={styles.summaryMainVal}>2</Text>
              <Text style={styles.summarySubVal}>1 en cours · 1 terminée</Text>
            </View>

            {/* Carte 2 : Revenus */}
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIconBox, { backgroundColor: '#E8F8F0' }]}>
                <Feather name="dollar-sign" size={18} color={colors.success} />
              </View>
              <Text style={styles.summaryLabel}>Revenus</Text>
              <Text style={styles.summaryMainVal}>28 500 FCFA</Text>
              <Text style={styles.summarySubVal}>aujourd'hui</Text>
            </View>
          </View>
        </View>

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

  /* Header */
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

  /* Greeting + Switch Mode */
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
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

  /* Carte de disponibilité compacte */
  availabilityCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D8E8FF',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  availabilityCardOff: {
    borderColor: colors.border,
    backgroundColor: '#FAFBFD',
  },
  availabilityLeft: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  statusTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  dotGreen: {
    backgroundColor: colors.success,
  },
  dotGray: {
    backgroundColor: colors.grayMedium,
  },
  availabilityTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  availabilitySub: {
    fontSize: 12,
    color: colors.grayDark,
  },

  /* Section */
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sectionTitleHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  sectionSub: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  /* Navigation Carte direct avec flèches */
  cardContainer: {
    width: '100%',
  },
  mainMissionCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  navBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  arrowBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBtnDisabled: {
    backgroundColor: '#F7F9FC',
    borderColor: colors.border,
    opacity: 0.5,
  },
  counterBadge: {
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  counterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  counterHighlight: {
    color: colors.primary,
    fontWeight: '800',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#E1EDFF',
  },
  categoryIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  timeAgoText: {
    fontSize: 12,
    color: colors.grayMedium,
  },
  missionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  missionDesc: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.md,
    backgroundColor: '#FAFCFF',
    padding: spacing.xs + 2,
    borderRadius: borderRadius.sm,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  dotSep: {
    color: colors.grayMedium,
    marginHorizontal: 4,
  },
  distanceBadge: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm + 2,
    marginTop: 4,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.grayMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  viewMissionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  viewMissionBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  paginationRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: spacing.md + 4,
    zIndex: 3,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border,
  },

  /* Empty States */
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 19,
  },
  enableBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
  },
  enableBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  /* Aujourd'hui (Résumé) */
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.grayDark,
    fontWeight: '600',
  },
  summaryMainVal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginTop: 2,
  },
  summarySubVal: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
  },
});
