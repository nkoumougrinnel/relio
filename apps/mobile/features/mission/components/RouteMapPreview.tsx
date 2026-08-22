import React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius } from '../../../theme';

interface RouteMapPreviewProps {
  providerAvatarUrl: string;
  style?: ViewStyle;
}

/**
 * Représentation schématique du trajet prestataire → client, en attendant
 * l'intégration d'une vraie carte.
 */
export function RouteMapPreview({
  providerAvatarUrl,
  style,
}: RouteMapPreviewProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.background} />

      <View style={styles.homeMarker}>
        <Ionicons name="home" size={18} color={colors.white} />
      </View>

      <View style={styles.providerMarker}>
        <Image source={{ uri: providerAvatarUrl }} style={styles.avatar} />
      </View>

      <View style={styles.routeLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF3FF',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E3EDFC',
  },
  homeMarker: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  providerMarker: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
    zIndex: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  routeLine: {
    position: 'absolute',
    width: 140,
    height: 3,
    backgroundColor: colors.primary,
    transform: [{ rotate: '-35deg' }],
  },
});
