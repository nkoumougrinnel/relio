import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

const STAR_COLOR = '#FFB800';
const MAX_RATING = 5;

function formatRating(value: number): string {
  return value.toFixed(1).replace('.', ',');
}

export interface RatingStarsProps {
  value: number;
  size?: number;
  onChange?: (value: number) => void;
  style?: ViewStyle;
}

/**
 * Rangée de 5 étoiles, en lecture seule ou sélectionnable.
 */
export const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  size = 16,
  onChange,
  style,
}) => {
  return (
    <View style={[styles.starsRow, style]}>
      {Array.from({ length: MAX_RATING }, (_, index) => index + 1).map(
        (position) => {
          const star = (
            <Ionicons
              name={position <= value ? 'star' : 'star-outline'}
              size={size}
              color={position <= value ? STAR_COLOR : colors.grayMedium}
            />
          );

          if (!onChange) {
            return <View key={position}>{star}</View>;
          }

          return (
            <TouchableOpacity
              key={position}
              onPress={() => onChange(position)}
              activeOpacity={0.7}
            >
              {star}
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
};

export interface RatingSummaryProps {
  value: number;
  reviewsCount?: number;
  size?: number;
  style?: ViewStyle;
}

/**
 * Note condensée : une étoile, la valeur, et le nombre d'avis.
 */
export const RatingSummary: React.FC<RatingSummaryProps> = ({
  value,
  reviewsCount,
  size = 16,
  style,
}) => {
  return (
    <View style={[styles.summaryRow, style]}>
      <Ionicons name="star" size={size} color={STAR_COLOR} />
      <Text style={[styles.value, { fontSize: size - 2 }]}>
        {formatRating(value)}
      </Text>
      {reviewsCount !== undefined && (
        <Text style={[styles.count, { fontSize: size - 3 }]}>
          ({reviewsCount} avis)
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  count: {
    color: colors.grayDark,
  },
});
