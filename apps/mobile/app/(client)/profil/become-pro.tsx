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

export default function BecomeProScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'initial' | 'pending'>('initial');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 37/38 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {status === 'pending' ? 'Validation en cours' : 'Devenir prestataire'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {status === 'initial' ? (
          /* Vue 37 : Rejoignez Relio */
          <View style={styles.initialView}>
            <View style={styles.proIllustrationWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop' }}
                style={styles.proImg}
              />
            </View>

            <Text style={styles.mainTitle}>Rejoignez Relio</Text>
            <Text style={styles.subtitle}>
              Proposez vos services et recevez des missions près de chez vous.
            </Text>

            {/* Avantages — Maquette 37 */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={{ fontSize: 18 }}>⚡</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>Plus de missions</Text>
                  <Text style={styles.featureSub}>Accédez à un réseau de clients qualifiés en temps réel.</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={{ fontSize: 18 }}>🛡️</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>Paiements sécurisés</Text>
                  <Text style={styles.featureSub}>Recevez vos gains automatiquement après chaque intervention.</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Text style={{ fontSize: 18 }}>🎧</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>Support dédié</Text>
                  <Text style={styles.featureSub}>Une équipe réactive pour vous accompagner 7j/7.</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* Vue 38 : Validation en cours */
          <View style={styles.pendingView}>
            <View style={styles.clipboardIconBox}>
              <Ionicons name="clipboard-outline" size={48} color={colors.primary} />
            </View>

            <Text style={styles.mainTitle}>Votre demande est en cours de validation</Text>
            <Text style={styles.subtitle}>
              Nous vérifions vos documents et informations. Vous recevrez une réponse sous 24 heures.
            </Text>

            {/* Stepper Timeline — Maquette 38 */}
            <View style={styles.stepperContainer}>
              <View style={styles.stepCol}>
                <View style={[styles.stepDot, styles.dotDone]}>
                  <Ionicons name="checkmark" size={12} color={colors.white} />
                </View>
                <Text style={styles.stepLabel}>Documents</Text>
              </View>

              <View style={[styles.stepLine, styles.lineDone]} />

              <View style={styles.stepCol}>
                <View style={[styles.stepDot, styles.dotDone]}>
                  <Ionicons name="checkmark" size={12} color={colors.white} />
                </View>
                <Text style={styles.stepLabel}>Profil</Text>
              </View>

              <View style={[styles.stepLine, styles.lineActive]} />

              <View style={styles.stepCol}>
                <View style={[styles.stepDot, styles.dotActive]} />
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>Validation</Text>
              </View>

              <View style={styles.stepLine} />

              <View style={styles.stepCol}>
                <View style={styles.stepDot} />
                <Text style={styles.stepLabel}>Réponse</Text>
              </View>
            </View>

            {/* Notice — Maquette 38 */}
            <View style={styles.noticeBox}>
              <Ionicons name="notifications-outline" size={18} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.noticeText}>
                Vous serez notifié dès que votre profil sera validé.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.bottomBar}>
        {status === 'initial' ? (
          <TouchableOpacity style={styles.submitBtn} onPress={() => setStatus('pending')} activeOpacity={0.88}>
            <Text style={styles.submitBtnText}>Devenir prestataire</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStatus('initial')} activeOpacity={0.8}>
            <Text style={styles.secondaryBtnText}>Modifier ma candidature</Text>
          </TouchableOpacity>
        )}
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
  scrollContent: {
    padding: spacing.lg,
  },

  /* Initial View */
  initialView: {
    alignItems: 'center',
  },
  proIllustrationWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  proImg: {
    width: '100%',
    height: '100%',
  },
  mainTitle: {
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
    lineHeight: 20,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  featuresList: {
    width: '100%',
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  featureSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },

  /* Pending View */
  pendingView: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  clipboardIconBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  stepCol: {
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotDone: {
    backgroundColor: colors.success,
  },
  dotActive: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: '#D4E5FF',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontSize: 11,
    color: colors.grayDark,
    fontWeight: '500',
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    width: '100%',
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: colors.primary,
    lineHeight: 18,
  },

  /* Bottom Bar */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});
