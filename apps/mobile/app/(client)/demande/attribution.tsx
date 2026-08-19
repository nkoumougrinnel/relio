import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PROS_LIST = [
  {
    id: '1',
    name: 'Jean Mbarga',
    specialty: 'Technicien Frigoriste & Climatisation',
    rating: 4.9,
    reviewsCount: 48,
    distance: '1.2 km (Bonapriso)',
    experience: '8 ans d\'expérience',
    price: '18 000 FCFA',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=300&auto=format&fit=crop',
    bio: 'Expert en maintenance et réparation de climatiseurs individuels et industriels.',
  },
  {
    id: '2',
    name: 'Samuel Eboa',
    specialty: 'Artisan Climatisation & Plomberie',
    rating: 4.8,
    reviewsCount: 32,
    distance: '2.4 km (Akwa)',
    experience: '6 ans d\'expérience',
    price: '20 000 FCFA',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    bio: 'Spécialiste agréé dépannage rapide et rechargement gaz réfrigérant.',
  },
];

export default function AttributionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ problemText?: string; category?: string }>();
  const [proIndex, setProIndex] = useState(0);

  const currentPro = PROS_LIST[proIndex];

  const handleNextPro = () => {
    setProIndex((prev) => (prev + 1) % PROS_LIST.length);
  };

  const handleConfirmPro = () => {
    // Redirection vers le suivi de l'intervention (Page 21 : Professionnel en route)
    router.replace({
      pathname: '/(client)/demande/tracking',
      params: {
        proName: currentPro.name,
      },
    } as any);
  };

  const handleClose = () => {
    router.replace('/(client)/(tabs)' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header : Navigation & Titre */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleClose} activeOpacity={0.7}>
          <Feather name="x" size={24} color={colors.grayVeryDark} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Professionnel trouvé !</Text>
          <Text style={styles.headerSubtitle}>Recommandation certifiée Relio</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Badge de Match Score */}
        <View style={styles.matchBadgeRow}>
          <View style={styles.matchBadge}>
            <Ionicons name="sparkles" size={14} color={colors.white} style={{ marginRight: 4 }} />
            <Text style={styles.matchBadgeText}>Score Relio : 98% de compatibilité</Text>
          </View>
        </View>

        {/* Fiche Principale du Prestataire */}
        <View style={styles.proCard}>
          <View style={styles.proHeaderRow}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: currentPro.avatar }} style={styles.avatarImage} />
              {currentPro.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={18} color="#27AE60" />
                </View>
              )}
            </View>

            <View style={styles.proMainDetails}>
              <Text style={styles.proName}>{currentPro.name}</Text>
              <Text style={styles.proSpecialty}>{currentPro.specialty}</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FFB800" />
                <Text style={styles.ratingValue}>{currentPro.rating}</Text>
                <Text style={styles.reviewsCount}>({currentPro.reviewsCount} avis)</Text>
              </View>
            </View>
          </View>

          <Text style={styles.proBio}>{currentPro.bio}</Text>

          {/* Grille des caractéristiques */}
          <View style={styles.proStatsGrid}>
            <View style={styles.statItem}>
              <Feather name="map-pin" size={16} color={colors.primary} />
              <Text style={styles.statText}>{currentPro.distance}</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="award" size={16} color={colors.primary} />
              <Text style={styles.statText}>{currentPro.experience}</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="shield" size={16} color={colors.primary} />
              <Text style={styles.statText}>Identité & Profil vérifiés</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="clock" size={16} color={colors.success} />
              <Text style={[styles.statText, { color: colors.success, fontWeight: '700' }]}>
                Disponible immédiatement
              </Text>
            </View>
          </View>
        </View>

        {/* Bloc Tarif Proposé */}
        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.priceLabel}>Tarif indicatif de l'intervention</Text>
            <Text style={styles.priceAmount}>{currentPro.price}</Text>
          </View>
          <Text style={styles.priceNote}>
            Ce montant inclut le déplacement et le diagnostic sur place. Le devis final est confirmé avec vous avant tout début de travaux.
          </Text>
        </View>

        {/* Rappel de la demande client */}
        <View style={styles.requestSummaryCard}>
          <Text style={styles.requestSummaryLabel}>Votre problème :</Text>
          <Text style={styles.requestSummaryText}>
            "{params.problemText || 'Mon climatiseur split ne refroidit plus depuis ce matin et fait un bruit anormal.'}"
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer Boutons d'Action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmPro} activeOpacity={0.88}>
          <Text style={styles.confirmBtnText}>Confirmer ce professionnel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.altBtn} onPress={handleNextPro} activeOpacity={0.7}>
          <Text style={styles.altBtnText}>Voir une autre proposition</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  matchBadgeRow: {
    alignItems: 'center',
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  matchBadgeText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  
  /* Pro Card */
  proCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: spacing.md,
  },
  proHeaderRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  proMainDetails: {
    flex: 1,
  },
  proName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  proSpecialty: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  reviewsCount: {
    fontSize: 13,
    color: colors.grayMedium,
  },
  proBio: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 20,
  },
  proStatsGrid: {
    backgroundColor: '#FAFCFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 13,
    color: colors.grayVeryDark,
    fontWeight: '500',
  },

  /* Price Card */
  priceCard: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.xs,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '600',
  },
  priceAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  priceNote: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 17,
  },

  /* Request Summary Card */
  requestSummaryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  requestSummaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayMedium,
    textTransform: 'uppercase',
  },
  requestSummaryText: {
    fontSize: 14,
    color: colors.grayVeryDark,
    fontStyle: 'italic',
    lineHeight: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  altBtn: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altBtnText: {
    color: colors.grayDark,
    fontSize: 14,
    fontWeight: '600',
  },
});
