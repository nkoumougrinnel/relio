import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | number;

export interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: AvatarSize;
  verified?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  verified = false,
  style,
}) => {
  const dimension =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 36
      : size === 'lg'
      ? 64
      : 48;

  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const avatarDimensions: ImageStyle & ViewStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
  };

  return (
    <View style={[styles.wrapper, avatarDimensions, style]}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={[styles.image, avatarDimensions]}
        />
      ) : (
        <View style={[styles.fallback, avatarDimensions]}>
          <Text style={[styles.initialsText, { fontSize: dimension * 0.4 }]}>
            {initials}
          </Text>
        </View>
      )}

      {verified && (
        <View
          style={[
            styles.badge,
            {
              width: Math.max(14, dimension * 0.3),
              height: Math.max(14, dimension * 0.3),
              borderRadius: dimension * 0.15,
            },
          ]}
        >
          <Feather name="check" size={Math.max(10, dimension * 0.2)} color={colors.white} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontWeight: '700',
    color: colors.primary,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
