import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge } from '../../../components/ui';
import { ActivityHistoryEntry } from '../types';

interface ActivityHistoryCardProps {
  entry: ActivityHistoryEntry;
}

export function ActivityHistoryCard({ entry }: ActivityHistoryCardProps) {
  const isPaid = entry.status === 'paid';

  return (
    <View style={styles.card}>
      <View style={styles.emojiCircle}>
        <Text style={styles.emoji}>{entry.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.location}>{entry.location}</Text>
        <Text style={styles.date}>{entry.date}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{entry.amount}</Text>
        <Badge
          label={isPaid ? 'Payé' : 'En cours'}
          variant={isPaid ? 'success' : 'warning'}
        />
      </View>
    </View>
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
  emojiCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: colors.grayDark,
  },
  date: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
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
