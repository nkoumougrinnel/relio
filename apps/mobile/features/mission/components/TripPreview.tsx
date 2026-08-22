import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge } from '../../../components/ui';
import { MissionTrip } from '../types';

interface TripPreviewProps {
  trip: MissionTrip;
}

/**
 * Trajet du prestataire vers le client, schématisé en attendant le GPS réel.
 */
export function TripPreview({ trip }: TripPreviewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Badge label="GPS Actif · En déplacement" variant="primary" live />
        <Text style={styles.eta}>⏱️ Arrivée estimée : {trip.eta}</Text>
      </View>

      <View style={styles.mapVisual}>
        <View style={styles.pinRow}>
          <View style={styles.providerPin}>
            <Feather name="navigation" size={16} color={colors.white} />
          </View>
          <View style={styles.line} />
          <View style={styles.clientPin}>
            <Feather name="map-pin" size={16} color={colors.primary} />
          </View>
        </View>

        <Text style={styles.caption}>
          Trajet vers {trip.destination} ({trip.distance})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  eta: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  mapVisual: {
    backgroundColor: '#F5F8FF',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1EDFF',
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  providerPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 100,
    height: 2,
    backgroundColor: colors.primary,
    marginHorizontal: 8,
  },
  clientPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
});
