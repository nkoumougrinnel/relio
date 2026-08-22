import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';
import { Avatar, RatingStars } from '../../../components/ui';
import { GivenReview } from '../types';

interface ReviewCardProps {
  review: GivenReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar source={review.avatarUrl} name={review.proName} size={44} />

        <View style={styles.identity}>
          <Text style={styles.proName}>{review.proName}</Text>
          <Text style={styles.specialty}>{review.specialty}</Text>
        </View>

        <Text style={styles.date}>{review.date}</Text>
      </View>

      <RatingStars value={review.rating} style={styles.stars} />

      <Text style={styles.comment}>&quot;{review.comment}&quot;</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  identity: {
    flex: 1,
  },
  proName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  specialty: {
    fontSize: 12,
    color: colors.grayDark,
  },
  date: {
    fontSize: 11,
    color: colors.grayMedium,
  },
  stars: {
    marginVertical: 2,
  },
  comment: {
    fontSize: 13,
    color: colors.grayVeryDark,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
