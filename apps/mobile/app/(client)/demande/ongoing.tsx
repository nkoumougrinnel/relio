import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function OngoingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; phone?: string; specialty?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const specialty = params.specialty || 'Technicien Électricien';
  const phone = params.phone || '+237695123456';

  const [seconds, setSeconds] = useState(1638); // 00:27:18

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallPro = () => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert('Appel', `Composer le : ${phone}`);
    });
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Signaler un problème',
      'Un administrateur Relio va être notifié pour vous contacter.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => Alert.alert('Signalement envoyé') },
      ]
    );
  };

  const handleFinishIntervention = () => {
    // Redirection directe vers le Récapitulatif Client (summary.tsx)
    router.push({
      pathname: '/(client)/demande/summary',
      params: { proName, phone, specialty },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 24 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Intervention en cours</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card Prestataire — Maquette 24 */}
        <View style={styles.proCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }}
            style={styles.proAvatar}
          />
          <View style={styles.proInfo}>
            <Text style={styles.proName}>{proName}</Text>
            <Text style={styles.proSpecialty}>{specialty}</Text>
          </View>
          <TouchableOpacity style={styles.callIconBtn} onPress={handleCallPro} activeOpacity={0.8}>
            <Ionicons name="call" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Section Temps d'intervention (Chronomètre) — Maquette 24 */}
        <View style={styles.chronoCard}>
          <Text style={styles.chronoLabel}>Temps d'intervention</Text>
          <Text style={styles.chronoDigits}>{formatTimer(seconds)}</Text>
          <Text style={styles.chronoSubtext}>Intervention en cours depuis 09:27</Text>
        </View>

        {/* Section Statut — Maquette 24 */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeaderRow}>
            <Text style={styles.statusHeaderTitle}>Statut</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>En cours</Text>
            </View>
          </View>

          <Text style={styles.statusDesc}>
            {proName} travaille sur votre problème. Vous serez notifié à la fin de l'intervention.
          </Text>
        </View>

        {/* Bouton pour simuler la fin de l'intervention et passer au Récapitulatif Client */}
        <TouchableOpacity style={styles.proFinishSimBtn} onPress={handleFinishIntervention} activeOpacity={0.85}>
          <Ionicons name="checkmark-done-circle-outline" size={20} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.proFinishSimText}>Terminer l'intervention (Voir récapitulatif)</Text>
        </TouchableOpacity>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bouton Signaler un problème — Maquette 24 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.reportBtn} onPress={handleReportIssue} activeOpacity={0.88}>
          <Text style={styles.reportBtnText}>Signaler un problème</Text>
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
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  proAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  proInfo: {
    flex: 1,
  },
  proName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  proSpecialty: {
    fontSize: 13,
    color: colors.grayDark,
  },
  callIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chronoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chronoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
    marginBottom: 4,
  },
  chronoDigits: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.success,
    letterSpacing: 1,
    marginVertical: 4,
  },
  chronoSubtext: {
    fontSize: 12,
    color: colors.grayDark,
  },
  statusCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  statusBadge: {
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.success,
  },
  statusDesc: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 18,
  },
  proFinishSimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F6FF',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
  },
  proFinishSimText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  reportBtn: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.error,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportBtnText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '700',
  },
});
