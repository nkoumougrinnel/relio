import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../../theme';
import { ProApplicationStatus } from '../types';

const DEFAULT_ILLUSTRATION = require('../../../assets/images/become-pro-artisan.png');

interface BecomeProPromoCardProps {
  status: ProApplicationStatus;
  onPress: () => void;
  style?: ViewStyle;
  title?: string;
  description?: string;
  ctaLabel?: string;
  badgeLabel?: string;
  illustration?: ImageSourcePropType;
}

/**
 * Carte promotionnelle « devenir prestataire ».
 * Home et profil partagent la même base, avec un contenu propre à chaque contexte.
 */
export function BecomeProPromoCard({
  status,
  onPress,
  style,
  title = 'Vous êtes un pro ?',
  description = 'Proposez vos services et recevez des missions près de chez vous.',
  ctaLabel = 'Devenir prestataire',
  badgeLabel = 'RELIO PRO',
  illustration = DEFAULT_ILLUSTRATION,
}: BecomeProPromoCardProps) {
  const isPending = status === 'pending';
  const resolvedTitle = isPending ? 'Validation en cours' : title;
  const resolvedDescription = isPending
    ? 'Votre candidature est en cours de vérification sous 24h.'
    : description;
  const resolvedCta = isPending ? 'Voir le statut' : ctaLabel;
  const resolvedBadge = isPending ? 'EN COURS' : badgeLabel;

  return (
    <View style={[styles.card, style]}>
      <View style={[styles.blob, styles.blobYellow]} />
      <View style={[styles.blob, styles.blobBlue]} />

      <View style={styles.left}>
        {resolvedBadge ? (
          <View style={[styles.badge, isPending && styles.badgePending]}>
            <View style={[styles.badgeDot, isPending && styles.badgeDotPending]} />
            <Text style={[styles.badgeText, isPending && styles.badgeTextPending]}>
              {resolvedBadge}
            </Text>
          </View>
        ) : null}

        <Text style={styles.title}>{resolvedTitle}</Text>
        <Text style={styles.subtitle}>{resolvedDescription}</Text>

        <TouchableOpacity
          style={[styles.button, isPending && styles.buttonPending]}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text
            style={[styles.buttonText, isPending && styles.buttonTextPending]}
          >
            {resolvedCta}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.right} pointerEvents="none">
        <Image
          source={illustration}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
    minHeight: 156,
    backgroundColor: '#FFF8E6',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#F3E2B0',
    paddingLeft: spacing.lg,
    paddingTop: spacing.md + 2,
    paddingBottom: spacing.md + 2,
  },
  blob: {
    position: 'absolute',
    borderRadius: radius.full,
  },
  blobYellow: {
    width: 120,
    height: 120,
    backgroundColor: colors.secondary,
    opacity: 0.12,
    top: -48,
    right: 36,
  },
  blobBlue: {
    width: 88,
    height: 88,
    backgroundColor: colors.primary,
    opacity: 0.06,
    bottom: -36,
    left: 72,
  },
  left: {
    flex: 1,
    zIndex: 1,
    paddingRight: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
    gap: spacing.xs + 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: '#FFF1C2',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgePending: {
    backgroundColor: '#E8F8F0',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  badgeDotPending: {
    backgroundColor: colors.success,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.6,
    color: '#9A6B00',
  },
  badgeTextPending: {
    color: colors.success,
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    lineHeight: 24,
    color: colors.grayVeryDark,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.grayDark,
    paddingRight: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  buttonPending: {
    backgroundColor: '#E8F8F0',
    borderWidth: 1,
    borderColor: colors.success,
  },
  buttonText: {
    ...typography.label,
    fontSize: 13,
    color: colors.white,
  },
  buttonTextPending: {
    color: colors.success,
  },
  right: {
    width: 124,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  illustration: {
    width: 148,
    height: 158,
    marginRight: -10,
    marginBottom: -22,
  },
});
