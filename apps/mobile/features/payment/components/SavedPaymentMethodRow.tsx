import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge } from '../../../components/ui';
import { SavedPaymentMethod } from '../types';

interface SavedPaymentMethodRowProps {
  method: SavedPaymentMethod;
  isDefault: boolean;
  onPress: () => void;
}

export function SavedPaymentMethodRow({
  method,
  isDefault,
  onPress,
}: SavedPaymentMethodRowProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isDefault && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{method.emoji}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{method.label}</Text>
          {isDefault && <Badge label="Par défaut" variant="success" />}
        </View>
        <Text style={styles.detail}>{method.detail}</Text>
      </View>

      <Ionicons
        name={isDefault ? 'radio-button-on' : 'radio-button-off'}
        size={22}
        color={isDefault ? colors.primary : colors.grayMedium}
      />
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
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FAFCFF',
  },
  emojiBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  detail: {
    fontSize: 13,
    color: colors.grayDark,
    marginTop: 2,
  },
});
