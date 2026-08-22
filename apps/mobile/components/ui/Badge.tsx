import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'gray';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  live?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  icon,
  live = false,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.base, styles[`bg_${variant}`], style]}>
      {live && <View style={[styles.liveDot, styles[`dot_${variant}`]]} />}
      {icon}
      <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    gap: 6,
    alignSelf: 'flex-start',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* Backgrounds */
  bg_primary: {
    backgroundColor: '#EBF3FF',
  },
  bg_secondary: {
    backgroundColor: '#FFF8E6',
  },
  bg_success: {
    backgroundColor: '#E8F5E9',
  },
  bg_warning: {
    backgroundColor: '#FFF3E0',
  },
  bg_error: {
    backgroundColor: '#FFEBEE',
  },
  bg_info: {
    backgroundColor: '#E1F5FE',
  },
  bg_gray: {
    backgroundColor: colors.surfaceVariant,
  },

  /* Text Colors */
  text_primary: {
    color: colors.primary,
  },
  text_secondary: {
    color: '#B78103',
  },
  text_success: {
    color: colors.success,
  },
  text_warning: {
    color: colors.warning,
  },
  text_error: {
    color: colors.error,
  },
  text_info: {
    color: colors.info,
  },
  text_gray: {
    color: colors.grayDark,
  },

  /* Dots */
  dot_primary: { backgroundColor: colors.primary },
  dot_secondary: { backgroundColor: colors.secondary },
  dot_success: { backgroundColor: colors.success },
  dot_warning: { backgroundColor: colors.warning },
  dot_error: { backgroundColor: colors.error },
  dot_info: { backgroundColor: colors.info },
  dot_gray: { backgroundColor: colors.grayDark },
});
