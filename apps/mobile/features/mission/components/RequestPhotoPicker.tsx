import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';

interface RequestPhotoPickerProps {
  photos: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxPhotos?: number;
}

/**
 * Photos jointes à une demande d'intervention.
 */
export function RequestPhotoPicker({
  photos,
  onAdd,
  onRemove,
  maxPhotos = 3,
}: RequestPhotoPickerProps) {
  const canAdd = photos.length < maxPhotos;

  return (
    <View style={styles.row}>
      {canAdd && (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={onAdd}
          activeOpacity={0.7}
        >
          <Feather name="camera" size={20} color={colors.primary} />
          <Text style={styles.addLabel}>Ajouter</Text>
        </TouchableOpacity>
      )}

      {photos.map((uri, index) => (
        <View key={`${uri}-${index}`} style={styles.photoWrapper}>
          <Image source={{ uri }} style={styles.photo} />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => onRemove(index)}
          >
            <Feather name="x" size={12} color={colors.white} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  addBtn: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',
    gap: 4,
  },
  addLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  photoWrapper: {
    position: 'relative',
    width: 76,
    height: 76,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: radius.md,
  },
  removeBtn: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
