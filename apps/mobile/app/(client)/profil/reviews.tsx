import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const REVIEWS_GIVEN = [
  {
    id: '1',
    proName: 'Jean Mbarga',
    specialty: 'Technicien Électricien',
    date: '12 juin 2026',
    stars: 5,
    comment: 'Excellent travail, rapide et efficace.',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    proName: 'Patrick Ndong',
    specialty: 'Plombier',
    date: '16 juin 2026',
    stars: 5,
    comment: 'Dépannage parfait en moins de 30 minutes. Je recommande fortement !',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '3',
    proName: 'Alain Biloa',
    specialty: 'Technicien Climatisation',
    date: '10 juin 2026',
    stars: 4,
    comment: 'Intervention propre et soignée.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
];

export default function ReviewsGivenScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'given' | 'received'>('given');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 36 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Évaluations données</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs Données / Reçues — Maquette 36 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'given' && styles.tabBtnActive]}
          onPress={() => setTab('given')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, tab === 'given' && styles.tabTextActive]}>Données</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'received' && styles.tabBtnActive]}
          onPress={() => setTab('received')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, tab === 'received' && styles.tabTextActive]}>Reçues</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {tab === 'given' ? (
          REVIEWS_GIVEN.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.proHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.proName}>{item.proName}</Text>
                  <Text style={styles.proSpecialty}>{item.specialty}</Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>

              {/* Étoiles */}
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= item.stars ? 'star' : 'star-outline'}
                    size={16}
                    color={s <= item.stars ? '#FFB800' : colors.grayMedium}
                  />
                ))}
              </View>

              <Text style={styles.commentText}>"{item.comment}"</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <Ionicons name="chatbox-ellipses-outline" size={40} color={colors.grayMedium} />
            <Text style={styles.emptyText}>Aucune évaluation reçue pour le moment.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.8}>
          <Text style={styles.moreBtnText}>Voir toutes mes évaluations</Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  tabBtnActive: {
    backgroundColor: '#F0F6FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayDark,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  proHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  proName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  proSpecialty: {
    fontSize: 12,
    color: colors.grayDark,
  },
  dateText: {
    fontSize: 11,
    color: colors.grayMedium,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 2,
  },
  commentText: {
    fontSize: 13,
    color: colors.grayVeryDark,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  emptyBox: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: colors.grayDark,
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
