import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

const WAVEFORM_HEIGHTS = [
  12, 24, 18, 30, 42, 28, 16, 35, 45, 20, 14, 28, 38, 22, 16, 32,
];
const PLAYED_BARS = 7;

interface VoiceNoteCardProps {
  duration: string;
}

/**
 * Message vocal joint à la demande, avec sa transcription automatique.
 */
export function VoiceNoteCard({ duration }: VoiceNoteCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Feather name="mic" size={14} color={colors.primary} />
          <Text style={styles.badgeText}>Message vocal enregistré</Text>
        </View>
        <Text style={styles.duration}>{duration}</Text>
      </View>

      <View style={styles.playerRow}>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={0.8}
        >
          <Feather
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={colors.white}
          />
        </TouchableOpacity>

        <View style={styles.waveform}>
          {WAVEFORM_HEIGHTS.map((height, index) => (
            <View
              key={`${height}-${index}`}
              style={[
                styles.waveBar,
                { height },
                isPlaying && index < PLAYED_BARS && styles.waveBarActive,
              ]}
            />
          ))}
        </View>
      </View>

      <Text style={styles.transcription}>
        Transcription automatique IA (modifiable ci-dessous) :
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  duration: {
    fontSize: 12,
    color: colors.grayDark,
    fontWeight: '600',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 36,
  },
  waveBar: {
    flex: 1,
    backgroundColor: colors.grayLight,
    borderRadius: 2,
  },
  waveBarActive: {
    backgroundColor: colors.primary,
  },
  transcription: {
    fontSize: 12,
    color: colors.grayDark,
    fontStyle: 'italic',
  },
});
