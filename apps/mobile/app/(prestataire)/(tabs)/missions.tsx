import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather } from '@expo/vector-icons';

const MOCK_ALL_MISSIONS = [
  {
    id: 'm1',
    category: 'Électricité',
    iconName: 'zap',
    iconBg: '#FFF9E6',
    iconColor: '#F59E0B',
    title: 'Panne tableau électrique',
    client: 'Marc M.',
    location: 'Akwa, Douala',
    price: '20 000 FCFA',
    status: 'disponible', // disponible, en_cours, terminee
    date: 'Aujourd\'hui, 14:30',
  },
  {
    id: 'm2',
    category: 'Climatisation',
    iconName: 'wind',
    iconBg: '#E8F8F8',
    iconColor: '#00ACC1',
    title: 'Entretien & recharge climatiseur',
    client: 'Sophie T.',
    location: 'Bonapriso, Douala',
    price: '25 000 FCFA',
    status: 'en_cours',
    date: 'En cours · Arrivé sur place',
  },
  {
    id: 'm3',
    category: 'Plomberie',
    iconName: 'droplet',
    iconBg: '#EEF9FF',
    iconColor: '#0288D1',
    title: 'Réparation fuite lavabo',
    client: 'Paul K.',
    location: 'Bastos, Yaoundé',
    price: '15 000 FCFA',
    status: 'terminee',
    date: 'Hier, 16:45',
  },
];

export default function PrestataireMissionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'disponibles' | 'en_cours' | 'historique'>('disponibles');

  const filteredMissions = MOCK_ALL_MISSIONS.filter((m) => {
    if (activeTab === 'disponibles') return m.status === 'disponible';
    if (activeTab === 'en_cours') return m.status === 'en_cours';
    return m.status === 'terminee';
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion des missions</Text>
      </View>

      {/* Onglets de filtrage */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'disponibles' && styles.activeTabBtn]}
          onPress={() => setActiveTab('disponibles')}
        >
          <Text style={[styles.tabText, activeTab === 'disponibles' && styles.activeTabText]}>
            Disponibles (1)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'en_cours' && styles.activeTabBtn]}
          onPress={() => setActiveTab('en_cours')}
        >
          <Text style={[styles.tabText, activeTab === 'en_cours' && styles.activeTabText]}>
            En cours (1)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'historique' && styles.activeTabBtn]}
          onPress={() => setActiveTab('historique')}
        >
          <Text style={[styles.tabText, activeTab === 'historique' && styles.activeTabText]}>
            Historique
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* VUE DÉDIÉE : MISSION EN COURS AVEC TIMELINE */}
        {activeTab === 'en_cours' ? (
          <View style={styles.ongoingWrapper}>
            {/* Carte synthétique mission en cours */}
            <View style={styles.ongoingHeaderCard}>
              <View style={styles.ongoingBadgeRow}>
                <View style={styles.livePulse} />
                <Text style={styles.ongoingBadgeText}>En cours · Intervenant sur place</Text>
              </View>

              <Text style={styles.ongoingTitle}>Entretien & recharge climatiseur Split</Text>

              <View style={styles.ongoingInfoRow}>
                <Feather name="user" size={14} color={colors.primary} />
                <Text style={styles.ongoingInfoText}>Client : Sophie T. (⭐ 4.9)</Text>
              </View>

              <View style={styles.ongoingInfoRow}>
                <Feather name="map-pin" size={14} color={colors.primary} />
                <Text style={styles.ongoingInfoText}>Bonapriso, Douala</Text>
              </View>

              <View style={styles.ongoingPriceBox}>
                <Text style={styles.ongoingPriceLabel}>Montant convenu</Text>
                <Text style={styles.ongoingPriceVal}>25 000 FCFA</Text>
              </View>
            </View>

            {/* Timers & Actions rapides */}
            <View style={styles.chronoBox}>
              <Text style={styles.chronoLabel}>Temps d'intervention</Text>
              <Text style={styles.chronoVal}>00:32:15</Text>
            </View>

            {/* TIMELINE COMPLÈTE DU SUIVI */}
            <View style={styles.timelineCard}>
              <Text style={styles.timelineHeaderTitle}>Suivi d'avancement</Text>

              {/* Étape 1 : Acceptée */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineNode, styles.nodeDone]}>
                    <Feather name="check" size={12} color={colors.white} />
                  </View>
                  <View style={[styles.timelineLine, styles.lineDone]} />
                </View>
                <View style={styles.timelineRight}>
                  <Text style={styles.stepTitleDone}>Mission acceptée</Text>
                  <Text style={styles.stepSub}>14:15 · Acceptée par vous</Text>
                </View>
              </View>

              {/* Étape 2 : En route */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineNode, styles.nodeDone]}>
                    <Feather name="check" size={12} color={colors.white} />
                  </View>
                  <View style={[styles.timelineLine, styles.lineDone]} />
                </View>
                <View style={styles.timelineRight}>
                  <Text style={styles.stepTitleDone}>En route vers le client</Text>
                  <Text style={styles.stepSub}>14:20 · Trajet vers Bonapriso</Text>
                </View>
              </View>

              {/* Étape 3 : Arrivé chez le client */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineNode, styles.nodeDone]}>
                    <Feather name="check" size={12} color={colors.white} />
                  </View>
                  <View style={[styles.timelineLine, styles.lineDone]} />
                </View>
                <View style={styles.timelineRight}>
                  <Text style={styles.stepTitleDone}>Arrivé & QR Code scanné</Text>
                  <Text style={styles.stepSub}>14:35 · Début officiel</Text>
                </View>
              </View>

              {/* Étape 4 : Intervention en cours (Actuelle) */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineNode, styles.nodeActive]}>
                    <View style={styles.activeDot} />
                  </View>
                  <View style={styles.timelineLine} />
                </View>
                <View style={styles.timelineRight}>
                  <Text style={styles.stepTitleActive}>Intervention en cours</Text>
                  <Text style={styles.stepSubActive}>Travail sur le matériel (32 min)</Text>
                </View>
              </View>

              {/* Étape 5 : Clôture & Paiement */}
              <View style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineNode}>
                    <View style={styles.futureDot} />
                  </View>
                </View>
                <View style={styles.timelineRight}>
                  <Text style={styles.stepTitleFuture}>Clôture & Paiement client</Text>
                  <Text style={styles.stepSub}>À venir après fin du travail</Text>
                </View>
              </View>
            </View>

            {/* Bouton pour ouvrir la page plein écran / déclarer fin */}
            <TouchableOpacity
              style={styles.openOngoingBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/(prestataire)/mission/ongoing' as any)}
            >
              <Text style={styles.openOngoingBtnText}>Ouvrir le suivi de l'intervention</Text>
              <Feather name="arrow-right" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : filteredMissions.length === 0 ? (
          <View style={styles.emptyBox}>
            <Feather name="folder" size={32} color={colors.grayMedium} />
            <Text style={styles.emptyText}>Aucune mission dans cette catégorie</Text>
          </View>
        ) : (
          filteredMissions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname:
                    item.status === 'en_cours'
                      ? '/(prestataire)/mission/ongoing'
                      : '/(prestataire)/mission/detail',
                  params: { id: item.id },
                } as any)
              }
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <Feather name={item.iconName as any} size={18} color={item.iconColor} />
                </View>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardCategory}>{item.category}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.infoRow}>
                  <Feather name="user" size={14} color={colors.grayDark} />
                  <Text style={styles.infoText}>{item.client}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Feather name="map-pin" size={14} color={colors.grayDark} />
                  <Text style={styles.infoText}>{item.location}</Text>
                </View>

                <Feather name="chevron-right" size={18} color={colors.grayMedium} />
              </View>
            </TouchableOpacity>
          ))
        )}
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
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTabBtn: {
    backgroundColor: '#EEF4FF',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMeta: {
    flex: 1,
  },
  cardCategory: {
    fontSize: 11,
    color: colors.grayMedium,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs + 2,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.grayDark,
  },
  dot: {
    color: colors.grayMedium,
    marginHorizontal: 2,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: spacing.md,
  },
  emptyText: {
    fontSize: 14,
    color: colors.grayMedium,
  },

  /* Vue Spécifique En Cours avec Timeline */
  ongoingWrapper: {
    gap: spacing.md,
  },
  ongoingHeaderCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ongoingBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  livePulse: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  ongoingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  ongoingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.xs,
  },
  ongoingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  ongoingInfoText: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '600',
  },
  ongoingPriceBox: {
    marginTop: spacing.md,
    paddingTop: spacing.xs + 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ongoingPriceLabel: {
    fontSize: 12,
    color: colors.grayMedium,
  },
  ongoingPriceVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  chronoBox: {
    backgroundColor: '#EEF4FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  chronoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.grayDark,
    textTransform: 'uppercase',
  },
  chronoVal: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  timelineCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timelineHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 22,
  },
  timelineNode: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeDone: {
    backgroundColor: colors.success,
  },
  nodeActive: {
    backgroundColor: '#EEF4FF',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  futureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: '#E5E7EB',
    marginVertical: 2,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  stepTitleDone: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  stepTitleActive: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  stepTitleFuture: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayMedium,
  },
  stepSub: {
    fontSize: 11,
    color: colors.grayDark,
    marginTop: 1,
  },
  stepSubActive: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  openOngoingBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  openOngoingBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
