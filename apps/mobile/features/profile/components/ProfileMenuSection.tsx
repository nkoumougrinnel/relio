import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

export interface ProfileMenuEntry {
  id: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  tint?: 'primary' | 'muted';
  onPress?: () => void;
}

interface ProfileMenuSectionProps {
  title: string;
  entries: ProfileMenuEntry[];
}

export function ProfileMenuSection({ title, entries }: ProfileMenuSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.group}>
        {entries.map((entry, index) => (
          <React.Fragment key={entry.id}>
            {index > 0 && <View style={styles.divider} />}
            <TouchableOpacity
              style={styles.row}
              onPress={entry.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <Feather
                  name={entry.icon}
                  size={18}
                  color={
                    entry.tint === 'muted' ? colors.grayDark : colors.primary
                  }
                />
              </View>
              <Text style={styles.label}>{entry.label}</Text>
              <Feather name="chevron-right" size={18} color={colors.grayDark} />
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayDark,
    textTransform: 'uppercase',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  group: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    gap: spacing.md,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 54,
  },
});
