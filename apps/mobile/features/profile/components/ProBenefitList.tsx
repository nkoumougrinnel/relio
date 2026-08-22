import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';

const BENEFITS = [
  {
    emoji: '⚡',
    title: 'Plus de missions',
    description: 'Accédez à un réseau de clients qualifiés en temps réel.',
  },
  {
    emoji: '🛡️',
    title: 'Paiements sécurisés',
    description:
      'Recevez vos gains automatiquement après chaque intervention.',
  },
  {
    emoji: '🎧',
    title: 'Support dédié',
    description: 'Une équipe réactive pour vous accompagner 7j/7.',
  },
];

export function ProBenefitList() {
  return (
    <View style={styles.list}>
      {BENEFITS.map((benefit) => (
        <View key={benefit.title} style={styles.item}>
          <View style={styles.emojiBox}>
            <Text style={styles.emoji}>{benefit.emoji}</Text>
          </View>
          <View style={styles.texts}>
            <Text style={styles.title}>{benefit.title}</Text>
            <Text style={styles.description}>{benefit.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    gap: spacing.md,
  },
  item: {
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
  texts: {
    flex: 1,
  },
  title: {
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
