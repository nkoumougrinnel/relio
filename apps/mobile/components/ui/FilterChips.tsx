import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, spacing, radius } from '../../theme';

export interface FilterChipItem {
  id: string;
  label: string;
}

export interface FilterChipsProps {
  items: FilterChipItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  style?: ViewStyle;
}

/**
 * Barre horizontale de filtres, utilisée au-dessus des listes.
 */
export const FilterChips: React.FC<FilterChipsProps> = ({
  items,
  selectedId,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.bar, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {items.map((item) => {
          const isActive = selectedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onSelect(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.text, isActive && styles.textActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: '#F5F7FA',
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  textActive: {
    color: colors.white,
  },
});
