import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius } from '../../theme';

export interface ModeSwitchBadgeProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

/**
 * Bascule de démonstration entre les espaces client et prestataire.
 */
export const ModeSwitchBadge: React.FC<ModeSwitchBadgeProps> = ({
  label,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.badge, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.dot} />
      <Text style={styles.label}>{label}</Text>
      <Feather name="chevron-down" size={14} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#D4E3FF',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
});
