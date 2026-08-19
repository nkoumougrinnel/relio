import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const PROS = [
  {
    id: '1',
    name: 'Jean Mbarga',
    specialty: 'Technicien Électricien',
    rating: '4,8',
    reviews: '128 avis',
    distance: '850 m de vous',
    eta: '15–20 min arrivée estimée',
    description: 'Installations et dépannages électriques avec 6 ans d\'expérience.',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop',
    phone: '+237695123456',
  },
  {
    id: '2',
    name: 'Patrick Ndong',
    specialty: 'Électricien & Domotique',
    rating: '4,9',
    reviews: '94 avis',
    distance: '1.4 km de vous',
    eta: '20–25 min arrivée estimée',
    description: 'Spécialiste de la rénovation électrique et des tableaux basse tension.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    phone: '+237698765432',
  },
];

export default function ProFoundScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ problemText?: string; category?: string }>();
  const [proIndex, setProIndex] = useState(0);

  const pro = PROS[proIndex];

  const handleConfirmPro = () => {
    router.replace({
      pathname: '/(client)/demande/tracking',
      params: {
        proName: pro.name,
        specialty: pro.specialty,
        phone: pro.phone,
      },
    } as any);
  };

  const handleNextPro = () => {
    setProIndex((prev) => (prev + 1) % PROS.length);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* En-tête — Maquette 19 */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Professionnel trouvé 🎉</Text>
          <Text style={styles.subtitle}>Nous avons trouvé le bon professionnel pour vous.</Text>
        </View>

        {/* Carte Professionnel — Maquette 19 */}
        <View style={styles.proCard}>
          <Image source={{ uri: pro.avatar }} style={styles.proAvatar} />
          
          <Text style={styles.proName}>{pro.name}</Text>
          <Text style={styles.proSpecialty}>{pro.specialty}</Text>

          {/* Étoiles & avis */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <Text style={styles.ratingText}>{pro.rating}</Text>
            <Text style={styles.reviewsText}>({pro.reviews})</Text>
          </View>

          {/* Badges Distance & ETA */}
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Ionicons name="location-outline" size={14} color={colors.primary} />
              <Text style={styles.pillText}>{pro.distance}</Text>
            </View>
            <View style={styles.pill}>
              <Ionicons name="time-outline" size={14} color={colors.primary} />
              <Text style={styles.pillText}>{pro.eta}</Text>
            </View>
          </View>
        </View>

        {/* Bloc Spécialité — Maquette 19 */}
        <View style={styles.specialtyCard}>
          <Text style={styles.specialtyTitle}>Spécialité</Text>
          <Text style={styles.specialtyText}>{pro.description}</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Action Bar — Maquette 19 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmPro} activeOpacity={0.88}>
          <Text style={styles.confirmBtnText}>Confirmer ce professionnel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.altBtn} onPress={handleNextPro} activeOpacity={0.7}>
          <Text style={styles.altBtnText}>Autre professionnel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
  },

  /* Carte Pro */
  proCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  proAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: spacing.md,
  },
  proName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  proSpecialty: {
    fontSize: 14,
    color: colors.grayDark,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.md,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  reviewsText: {
    fontSize: 13,
    color: colors.grayDark,
  },

  /* Pills */
  pillsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    width: '100%',
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F6FF',
    paddingVertical: 10,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  /* Spécialité */
  specialtyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  specialtyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  specialtyText: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 19,
  },

  /* Bottom Bar */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.xs,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  altBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
