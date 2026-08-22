import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';

export interface BottomBarProps {
  children: React.ReactNode;
  floating?: boolean;
  style?: ViewStyle;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  children,
  floating = false,
  style,
}) => {
  return (
    <View style={[styles.container, floating && styles.floating, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  floating: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
