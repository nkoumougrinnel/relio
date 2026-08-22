import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors, spacing, radius, shadows } from '../../theme';

export type CardVariant = 'outlined' | 'elevated' | 'flat';

export interface CardProps extends TouchableOpacityProps {
  variant?: CardVariant;
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'outlined',
  style,
  children,
  onPress,
  ...rest
}) => {
  const cardStyles = [
    styles.base,
    styles[`variant_${variant}`],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={cardStyles}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  variant_outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  variant_elevated: {
    ...shadows.sm,
  },
  variant_flat: {
    backgroundColor: colors.surface,
  },
});
