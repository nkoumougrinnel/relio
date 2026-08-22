import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { RatingSummary } from '../../../components/ui';
import { AssignedProvider } from '../types';

interface AssignedProviderCardProps {
  provider: AssignedProvider;
  onCall: () => void;
  rating?: { rating: number; reviewsCount: number };
  children?: React.ReactNode;
}

/**
 * Carte compacte du professionnel assigné, présente sur tous les écrans de
 * suivi d'intervention.
 */
export function AssignedProviderCard({
  provider,
  onCall,
  rating,
  children,
}: AssignedProviderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: provider.avatarUrl }} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.specialty}>{provider.specialty}</Text>
          {rating && (
            <RatingSummary
              value={rating.rating}
              reviewsCount={rating.reviewsCount}
              size={13}
              style={styles.rating}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.callBtn}
          onPress={onCall}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {children}
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
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  specialty: {
    fontSize: 13,
    color: colors.grayDark,
  },
  rating: {
    marginTop: 2,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
