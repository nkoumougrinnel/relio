import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';

interface RequestPhotoPickerProps {
  photos: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

/**
 * Photos jointes à une demande d'intervention.
 */
export function RequestPhotoPicker({
  photos,
  onAdd,
  onRemove,
}: RequestPhotoPickerProps) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={onAdd}
        activeOpacity={0.7}
      >
        <Feather name="camera" size={22} color={colors.primary} />
      </TouchableOpacity>

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

      {photos.length < 2 && (
        <TouchableOpacity
          style={styles.placeholderBtn}
          onPress={onAdd}
          activeOpacity={0.7}
        >
          <Feather name="plus" size={22} color={colors.grayMedium} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  addBtn: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
  },
  placeholderBtn: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
  },
  photoWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.sm,
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
