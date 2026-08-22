import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../../theme';
import { ServiceCategory } from '../types';

interface ServiceCategoryGridProps {
  categories: ServiceCategory[];
  onSelect: (category: ServiceCategory) => void;
  style?: ViewStyle;
}

/**
 * Grille de catégories affichée sur l'accueil client.
 */
export function ServiceCategoryGrid({
  categories,
  onSelect,
  style,
}: ServiceCategoryGridProps) {
  return (
    <View style={[styles.row, style]}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => onSelect(category)}
        >
          {category.illustration ? (
            <Image
              source={category.illustration}
              style={styles.illustration}
              resizeMode="contain"
            />
          ) : (
            <View
              style={[
                styles.iconBox,
                { backgroundColor: category.iconBackground },
              ]}
            >
              <Feather
                name={category.icon}
                size={22}
                color={category.iconColor}
              />
            </View>
          )}

          <Text style={styles.label} numberOfLines={1}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm + 2,
  },
  card: {
    flex: 1,
    aspectRatio: 0.86,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  illustration: {
    width: '72%',
    height: '48%',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.grayVeryDark,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
});
