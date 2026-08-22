import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { PaymentMethodOption } from '../types';

interface PaymentMethodOptionRowProps {
  option: PaymentMethodOption;
  onPress: () => void;
}

export function PaymentMethodOptionRow({
  option,
  onPress,
}: PaymentMethodOptionRowProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View
        style={[styles.emojiBox, { backgroundColor: option.emojiBackground }]}
      >
        <Text style={styles.emoji}>{option.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>{option.label}</Text>
        <Text style={styles.description}>{option.description}</Text>
      </View>

      <Feather name="chevron-right" size={20} color={colors.grayMedium} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  emojiBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  description: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
});
