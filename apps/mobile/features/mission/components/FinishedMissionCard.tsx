import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';
import { Badge } from '../../../components/ui';
import { MissionSummary } from '../types';

interface FinishedMissionCardProps {
  mission: MissionSummary;
  onPress: () => void;
}

/**
 * Prestation passée, compacte, pour l'onglet « Terminées ».
 */
export function FinishedMissionCard({
  mission,
  onPress,
}: FinishedMissionCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.check}>
        <Feather name="check" size={14} color={colors.white} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {mission.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {mission.categoryLabel}
          {mission.clientName ? ` · ${mission.clientName}` : ''}
          {` · ${mission.date}`}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{mission.price}</Text>
        <Badge label="Payée" variant="success" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm + 2,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: colors.grayDark,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
});
