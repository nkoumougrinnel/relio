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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather } from '@expo/vector-icons';

export default function MissionDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleAcceptMission = () => {
    router.push('/(prestataire)/mission/en-route' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Navigation Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Détail de la mission</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* En-tête mission */}
        <View style={styles.headerCard}>
          <View style={styles.categoryBadge}>
            <Feather name="zap" size={16} color="#F59E0B" />
            <Text style={styles.categoryBadgeText}>Électricité</Text>
          </View>

          <Text style={styles.title}>Panne tableau électrique</Text>
          <Text style={styles.timeAgo}>Publié il y a 5 minutes</Text>

          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Budget estimé Tarif Relio</Text>
            <Text style={styles.priceValue}>15 000 – 25 000 FCFA</Text>
          </View>
        </View>

        {/* Détails intervention */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails de la demande</Text>
          <View style={styles.infoCard}>
            <Text style={styles.descriptionText}>
              Le disjoncteur général saute continuellement depuis ce matin dès qu'on allume les lumières du salon.
              Besoin d'un diagnostic d'urgence et réparation.
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Feather name="map-pin" size={16} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Localisation</Text>
                <Text style={styles.rowSub}>Akwa, Douala · À 1,2 km de vous</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Feather name="user" size={16} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Client</Text>
                <Text style={styles.rowSub}>Jean Dupont (Client Vérifié ⭐ 4.9)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bouton d'action */}
        <TouchableOpacity
          style={styles.acceptBtn}
          activeOpacity={0.85}
          onPress={handleAcceptMission}
        >
          <Text style={styles.acceptBtnText}>Accepter la mission</Text>
          <Feather name="check-circle" size={20} color={colors.white} />
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: spacing.xs,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.grayMedium,
    marginBottom: spacing.md,
  },
  priceBox: {
    backgroundColor: '#EEF4FF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  priceLabel: {
    fontSize: 11,
    color: colors.grayDark,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 21,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowTitle: {
    fontSize: 12,
    color: colors.grayMedium,
    fontWeight: '600',
  },
  rowSub: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginTop: 1,
  },
  acceptBtn: {
    backgroundColor: colors.success,
    paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
