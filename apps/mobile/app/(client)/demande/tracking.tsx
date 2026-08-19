import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function TrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; phone?: string; specialty?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const specialty = params.specialty || 'Technicien Électricien';
  const phone = params.phone || '+237695123456';

  const [eta, setEta] = useState(15);

  useEffect(() => {
    // Auto navigate to Arrived screen after simulation timeout
    const timeout = setTimeout(() => {
      router.replace({
        pathname: '/(client)/demande/arrived',
        params: { proName, phone, specialty },
      } as any);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  const handleCallPro = () => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert('Appel', `Composer le : ${phone}`);
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 21 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prestataire en route</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Titre — Maquette 21 */}
        <Text style={styles.subHeaderTitle}>
          {proName} est en route{'\n'}vers votre position.
        </Text>

        {/* Card Pro Compacte — Maquette 21 */}
        <View style={styles.proCard}>
          <View style={styles.proRow}>
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

          {/* Info Pills */}
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Ionicons name="location-outline" size={14} color={colors.primary} />
              <Text style={styles.pillText}>850 m de vous</Text>
            </View>
            <View style={styles.pill}>
              <Ionicons name="time-outline" size={14} color={colors.primary} />
              <Text style={styles.pillText}>{eta} min arrivée estimée</Text>
            </View>
          </View>
        </View>

        {/* Map View Visual — Maquette 21 */}
        <View style={styles.mapContainer}>
          {/* Visual Route Representation */}
          <View style={styles.mapBackground} />
          <View style={styles.mapMarkerHome}>
            <Ionicons name="home" size={18} color={colors.white} />
          </View>
          <View style={styles.mapMarkerPro}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }}
              style={styles.mapProAvatar}
            />
          </View>
          <View style={styles.routePathLine} />
        </View>

        {/* Notice — Maquette 21 */}
        <View style={styles.noticeBanner}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.noticeText}>Vous serez notifié à son arrivée.</Text>
        </View>
      </View>

      {/* Bottom Bar — Maquette 21 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.callBtn} onPress={handleCallPro} activeOpacity={0.88}>
          <Ionicons name="call" size={18} color={colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.callBtnText}>Appeler</Text>
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
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },

  /* Card Pro */
  proCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  pillsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },

  /* Map Visual */
  mapContainer: {
    flex: 1,
    backgroundColor: '#EBF3FF',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E3EDFC',
  },
  mapMarkerHome: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mapMarkerPro: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
    zIndex: 10,
  },
  mapProAvatar: {
    width: '100%',
    height: '100%',
  },
  routePathLine: {
    position: 'absolute',
    width: 140,
    height: 3,
    backgroundColor: colors.primary,
    transform: [{ rotate: '-35deg' }],
  },

  /* Notice */
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  noticeText: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '500',
  },

  /* Bottom Bar */
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  callBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
