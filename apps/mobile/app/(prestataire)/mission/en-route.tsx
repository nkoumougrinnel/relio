import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireEnRouteScreen() {
  const router = useRouter();

  const clientName = 'Jean Dupont';
  const clientPhone = '+237695123456';
  const destination = 'Akwa, Douala (Face Direction Camtel)';
  const distance = '1,2 km';
  const eta = '12 - 15 min';

  const handleCallClient = () => {
    Linking.openURL(`tel:${clientPhone}`).catch(() => {
      Alert.alert('Appel client', `Composer le : ${clientPhone}`);
    });
  };

  const handleArrivedOnSite = () => {
    router.push('/(prestataire)/mission/arrived' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Prestataire en route</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Carte / Visualisation Trajet */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <View style={styles.enRouteBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.enRouteBadgeText}>GPS Actif · En déplacement</Text>
            </View>
            <Text style={styles.etaText}>⏱️ Arrivée estimée : {eta}</Text>
          </View>

          {/* Faux tracé carte épuré */}
          <View style={styles.mapVisualContainer}>
            <View style={styles.mapPinRow}>
              <View style={styles.proPinBox}>
                <Feather name="navigation" size={16} color={colors.white} />
              </View>
              <View style={styles.mapLineDashed} />
              <View style={styles.clientPinBox}>
                <Feather name="map-pin" size={16} color={colors.primary} />
              </View>
            </View>
            <Text style={styles.mapSubtext}>Trajet vers {destination} ({distance})</Text>
          </View>
        </View>

        {/* Fiche Client */}
        <View style={styles.clientCard}>
          <View style={styles.clientAvatarCircle}>
            <Text style={styles.clientInitials}>JD</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.clientSub}>Client Vérifié ⭐ 4.9</Text>
            <Text style={styles.locationText}>📍 {destination}</Text>
          </View>
          <TouchableOpacity style={styles.callIconBtn} onPress={handleCallClient} activeOpacity={0.8}>
            <Ionicons name="call" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Consignes d'intervention */}
        <View style={styles.infoBox}>
          <Feather name="info" size={18} color={colors.primary} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoBoxTitle}>Arrivée chez le client</Text>
            <Text style={styles.infoBoxText}>
              Une fois sur place, cliquez sur "Je suis arrivé" puis scannez le QR Code présent sur le téléphone du client pour démarrer le chrono.
            </Text>
          </View>
        </View>

        {/* Bouton d'action principal : Je suis arrivé sur place */}
        <TouchableOpacity
          style={styles.arrivedBtn}
          activeOpacity={0.85}
          onPress={handleArrivedOnSite}
        >
          <Text style={styles.arrivedBtnText}>Je suis arrivé sur place</Text>
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
  mapCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  enRouteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  enRouteBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  mapVisualContainer: {
    backgroundColor: '#F5F8FF',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1EDFF',
  },
  mapPinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  proPinBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLineDashed: {
    width: 100,
    height: 2,
    backgroundColor: colors.primary,
    marginHorizontal: 8,
  },
  clientPinBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapSubtext: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  clientCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  clientAvatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientInitials: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  clientSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 1,
  },
  locationText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 3,
  },
  callIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#D4E5FF',
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 2,
  },
  infoBoxText: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 17,
  },
  arrivedBtn: {
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
  arrivedBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
