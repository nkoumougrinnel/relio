import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';

interface InfoCalloutProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  style?: ViewStyle;
}

/**
 * Encart bleu titré, utilisé pour les consignes d'intervention.
 */
export function InfoCallout({ icon, title, text, style }: InfoCalloutProps) {
  return (
    <View style={[styles.box, style]}>
      {icon}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#D4E5FF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 2,
  },
  text: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 17,
  },
});
