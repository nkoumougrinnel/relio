import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../theme';

interface AvatarPickerProps {
  uri: string;
  onPress?: () => void;
}

export function AvatarPicker({ uri, onPress }: AvatarPickerProps) {
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri }} style={styles.image} />
      <TouchableOpacity
        style={styles.cameraBtn}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Feather name="camera" size={14} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
});
