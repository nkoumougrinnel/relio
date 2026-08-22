import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors, spacing, radius } from '../../theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'danger'
  | 'dangerOutline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  textStyle,
  ...rest
}) => {
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline' || variant === 'dangerOutline';

  const containerStyles = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    disabled && styles.disabled,
    style,
  ];

  const labelStyles = [
    styles.textBase,
    styles[`textSize_${size}`],
    styles[`textVariant_${variant}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  let spinnerColor: string = colors.white;
  if (variant === 'dangerOutline') {
    spinnerColor = colors.error;
  } else if (isSecondary || isOutline) {
    spinnerColor = colors.primary;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      disabled={disabled || loading}
      style={containerStyles}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text style={labelStyles}>{title}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    gap: spacing.xs,
  },
  size_sm: {
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
  },
  size_md: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
  },

  /* Variants */
  variant_primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  variant_secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.grayLight,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  variant_success: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  variant_danger: {
    backgroundColor: colors.error,
  },
  variant_dangerOutline: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  disabled: {
    backgroundColor: colors.surfaceVariant,
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },

  /* Text Styles */
  textBase: {
    fontWeight: '700',
    textAlign: 'center',
  },
  textSize_sm: {
    fontSize: 14,
  },
  textSize_md: {
    fontSize: 16,
  },
  textSize_lg: {
    fontSize: 17,
  },
  textVariant_primary: {
    color: colors.white,
  },
  textVariant_secondary: {
    color: colors.grayVeryDark,
  },
  textVariant_outline: {
    color: colors.primary,
  },
  textVariant_success: {
    color: colors.white,
  },
  textVariant_danger: {
    color: colors.white,
  },
  textVariant_dangerOutline: {
    color: colors.error,
  },
  textDisabled: {
    color: colors.disabled,
  },
});
