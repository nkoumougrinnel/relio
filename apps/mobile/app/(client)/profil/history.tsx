import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const FILTER_TABS = ['Toutes', 'Demandes', 'Paiements', 'Évaluations'];

const HISTORY_DATA = [
  {
    id: '1',
    title: 'Climatisation réparée',
    location: 'Bonapriso, Douala',
    date: '12 juin 2026 • 10:35',
    price: '15 032 FCFA',
    status: 'Payé',
    icon: '❄',
  },
  {
    id: '2',
    title: 'Fuite d\'eau dans la cuisine',
    location: 'Bonanjo, Douala',
    date: '12 juin 2026 • 09:18',
    price: '12 500 FCFA',
    status: 'En cours',
    icon: '💧',
  },
  {
    id: '3',
    title: 'Problème d\'électricité',
    location: 'Akwa, Douala',
    date: '11 juin 2026 • 14:30',
    price: '8 000 FCFA',
    status: 'Payé',
    icon: '⚡',
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Toutes');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 35 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historique</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs — Maquette 35 */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTER_TABS.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setSelectedFilter(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.monthHeader}>Juin 2026</Text>

        {HISTORY_DATA.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemLocation}>{item.location}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>

            <View style={styles.rightCol}>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <View style={[styles.statusBadge, item.status === 'Payé' ? styles.badgePaid : styles.badgeOngoing]}>
                <Text style={[styles.statusText, item.status === 'Payé' ? styles.textPaid : styles.textOngoing]}>
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Action Button — Maquette 35 */}
        <TouchableOpacity
          style={styles.moreBtn}
          onPress={() => {}}
          activeOpacity={0.8}
        >
          <Text style={styles.moreBtnText}>Voir plus d'historique</Text>
        </TouchableOpacity>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  filterBar: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: '#F5F7FA',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  monthHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 2,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  itemLocation: {
    fontSize: 13,
    color: colors.grayDark,
  },
  itemDate: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  badgePaid: {
    backgroundColor: '#E8F8F0',
  },
  badgeOngoing: {
    backgroundColor: '#FFF9E6',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textPaid: {
    color: colors.success,
  },
  textOngoing: {
    color: colors.warning,
  },
  moreBtn: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  moreBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});
