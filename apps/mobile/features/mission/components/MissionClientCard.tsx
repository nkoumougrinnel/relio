import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Avatar } from '../../../components/ui';
import { MissionClient } from '../types';

interface MissionClientCardProps {
  client: MissionClient;
  location: string;
  onCall: () => void;
}

/**
 * Fiche du client d'une mission, affichée pendant le trajet et l'intervention.
 */
export function MissionClientCard({
  client,
  location,
  onCall,
}: MissionClientCardProps) {
  return (
    <View style={styles.card}>
      <Avatar name={client.name} />

      <View style={styles.info}>
        <Text style={styles.name}>{client.name}</Text>
        <Text style={styles.status}>
          {client.verified ? 'Client Vérifié' : 'Client'} ⭐ {client.rating}
        </Text>
        <Text style={styles.location}>📍 {location}</Text>
      </View>

      <TouchableOpacity
        style={styles.callBtn}
        onPress={onCall}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={18} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  status: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
