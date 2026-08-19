import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';

export default function ArrivedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; phone?: string; specialty?: string }>();

  const proName = params.proName || 'Jean Mbarga';

  const handleGoToQR = () => {
    router.push({
      pathname: '/(client)/demande/qrcode',
      params: { proName, phone: params.phone, specialty: params.specialty },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 22 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prestataire arrivé</Text>
      </View>

      <View style={styles.content}>
        {/* Illustration Prestataire à la porte — Maquette 22 */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop' }}
            style={styles.proImage}
          />
          <View style={styles.doorGraphic}>
            <View style={styles.doorKnob} />
          </View>
        </View>

        {/* Titre & Sous-titre — Maquette 22 */}
        <Text style={styles.mainTitle}>{proName} est arrivé !</Text>
        <Text style={styles.subtitle}>
          Présentez-lui le QR Code pour commencer l'intervention.
        </Text>
      </View>

      {/* Bouton bas de page — Maquette 22 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.qrBtn} onPress={handleGoToQR} activeOpacity={0.88}>
          <Text style={styles.qrBtnText}>Voir le QR Code</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Illustration */
  illustrationWrapper: {
    width: 200,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  proImage: {
    width: 140,
    height: 180,
    borderRadius: 20,
    zIndex: 2,
  },
  doorGraphic: {
    position: 'absolute',
    right: 10,
    width: 70,
    height: 200,
    borderWidth: 3,
    borderColor: colors.grayMedium,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  doorKnob: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.grayDark,
  },

  /* Texte */
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
  },

  /* Bottom Bar */
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  qrBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
