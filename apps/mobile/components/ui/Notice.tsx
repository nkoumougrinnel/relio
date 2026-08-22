import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export type NoticeVariant = 'info' | 'success' | 'neutral';

export interface NoticeProps {
  text: string;
  variant?: NoticeVariant;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Notice: React.FC<NoticeProps> = ({
  text,
  variant = 'info',
  icon,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.base, styles[`box_${variant}`], style]}>
      {icon}
      <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  text: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },

  box_info: {
    backgroundColor: '#F0F6FF',
    borderWidth: 1,
    borderColor: '#D4E5FF',
  },
  box_success: {
    backgroundColor: '#E8F8F0',
    borderWidth: 1,
    borderColor: '#B8EAD0',
  },
  box_neutral: {
    backgroundColor: '#F5F7FA',
  },

  text_info: {
    color: colors.primary,
  },
  text_success: {
    color: colors.success,
    fontWeight: '600',
  },
  text_neutral: {
    color: colors.grayDark,
  },
});
