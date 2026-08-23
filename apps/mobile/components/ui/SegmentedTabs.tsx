import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, spacing, radius } from '../../theme';

export interface SegmentedTab<T extends string> {
  id: T;
  label: string;
}

export interface SegmentedTabsProps<T extends string> {
  tabs: SegmentedTab<T>[];
  value: T;
  onChange: (id: T) => void;
  style?: ViewStyle;
}

/**
 * Barre d'onglets pleine largeur, chaque onglet occupant une part égale.
 */
export function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
  style,
}: SegmentedTabsProps<T>) {
  return (
    <View style={[styles.bar, style]}>
      {tabs.map((tab) => {
        const isActive = tab.id === value;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: '#F3F5F8',
    borderRadius: radius.lg,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.md,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  labelActive: {
    color: colors.white,
    fontWeight: '700',
  },
});
