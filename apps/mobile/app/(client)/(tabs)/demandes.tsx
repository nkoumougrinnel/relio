import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const FILTER_TABS = ['Toutes', 'En attente', 'En cours', 'Terminées'];

const DEMANDS_DATA = [
  {
    id: '1',
    title: 'Climatisation réparée',
    location: 'Bonapriso, Douala',
    date: '12 juin 2026 • 10:35',
    status: 'Terminée',
    icon: '❄',
    proName: 'Jean Mbarga',
    amount: '15 032 FCFA',
    route: '/(client)/demande/mission',
  },
  {
    id: '2',
    title: 'Fuite d\'eau dans la cuisine',
    location: 'Bonanjo, Douala',
    date: '12 juin 2026 • 09:18',
    status: 'En cours',
    icon: '💧',
    proName: 'Patrick Ndong',
    amount: '12 500 FCFA',
    route: '/(client)/demande/mission',
  },
  {
    id: '3',
    title: 'Problème d\'électricité',
    location: 'Akwa, Douala',
    date: '11 juin 2026 • 14:30',
    status: 'Terminée',
    icon: '⚡',
    proName: 'Jean Mbarga',
    amount: '8 000 FCFA',
    route: '/(client)/demande/mission',
  },
  {
    id: '4',
    title: 'Serrure débloquée',
    location: 'Akwa, Douala',
    date: '03 juin 2026 • 16:00',
    status: 'Terminée',
    icon: '🔑',
    proName: 'Alain Biloa',
    amount: '10 000 FCFA',
    route: '/(client)/demande/mission',
  },
];

export default function DemandesScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Toutes');

  const filteredDemands = DEMANDS_DATA.filter((item) => {
    if (selectedFilter === 'Toutes') return true;
    return item.status === selectedFilter;
  });

  const handleOpenMission = (item: typeof DEMANDS_DATA[0]) => {
    router.push({
      pathname: item.route as any,
      params: {
        missionId: item.id,
        title: item.title,
        status: item.status,
        proName: item.proName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 31 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes demandes</Text>
      </View>

      {/* Filtres par Onglets — Maquette 31 */}
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

      {/* Liste des Demandes — Maquette 31 */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeaderTitle}>Aujourd'hui</Text>

        {filteredDemands.slice(0, 2).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.demandCard}
            onPress={() => handleOpenMission(item)}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            </View>

            <View style={styles.demandInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.demandTitle}>{item.title}</Text>
                <View style={[styles.statusBadge, item.status === 'En cours' ? styles.badgeOngoing : styles.badgeDone]}>
                  <Text style={[styles.statusBadgeText, item.status === 'En cours' ? styles.textOngoing : styles.textDone]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.demandSub}>{item.location}</Text>
              <Text style={styles.demandDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionHeaderTitle, { marginTop: spacing.md }]}>Hier</Text>

        {filteredDemands.slice(2, 3).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.demandCard}
            onPress={() => handleOpenMission(item)}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            </View>

            <View style={styles.demandInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.demandTitle}>{item.title}</Text>
                <View style={[styles.statusBadge, item.status === 'En cours' ? styles.badgeOngoing : styles.badgeDone]}>
                  <Text style={[styles.statusBadgeText, item.status === 'En cours' ? styles.textOngoing : styles.textDone]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.demandSub}>{item.location}</Text>
              <Text style={styles.demandDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionHeaderTitle, { marginTop: spacing.md }]}>Plus tôt</Text>

        {filteredDemands.slice(3).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.demandCard}
            onPress={() => handleOpenMission(item)}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            </View>

            <View style={styles.demandInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.demandTitle}>{item.title}</Text>
                <View style={[styles.statusBadge, item.status === 'En cours' ? styles.badgeOngoing : styles.badgeDone]}>
                  <Text style={[styles.statusBadgeText, item.status === 'En cours' ? styles.textOngoing : styles.textDone]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.demandSub}>{item.location}</Text>
              <Text style={styles.demandDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}

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
    gap: spacing.xs,
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 4,
  },
  demandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  demandInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  demandTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  badgeDone: {
    backgroundColor: '#E8F8F0',
  },
  badgeOngoing: {
    backgroundColor: '#FFF9E6',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textDone: {
    color: colors.success,
  },
  textOngoing: {
    color: colors.warning,
  },
  demandSub: {
    fontSize: 13,
    color: colors.grayDark,
  },
  demandDate: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
  },
});
