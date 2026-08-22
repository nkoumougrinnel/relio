import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export type EmptyStateVariant = 'plain' | 'card';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: EmptyStateVariant;
  style?: ViewStyle;
}

/**
 * État vide : icône, message et action facultative.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  variant = 'plain',
  style,
}) => {
  const isCard = variant === 'card';

  return (
    <View style={[styles.container, isCard && styles.card, style]}>
      <View style={[styles.iconCircle, isCard && styles.iconCircleCard]}>
        {icon}
      </View>

      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconCircleCard: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5F8FF',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 19,
  },
  action: {
    marginTop: spacing.md,
  },
});
