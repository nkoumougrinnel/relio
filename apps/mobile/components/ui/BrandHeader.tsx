import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

export interface BrandHeaderProps {
  onNotificationsPress?: () => void;
  hasNotifications?: boolean;
}

/**
 * En-tête d'accueil : logo Relio et accès aux notifications.
 */
export const BrandHeader: React.FC<BrandHeaderProps> = ({
  onNotificationsPress,
  hasNotifications = false,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-horizontal.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.notificationBtn}
        activeOpacity={0.7}
        onPress={onNotificationsPress}
      >
        <Feather name="bell" size={24} color={colors.grayVeryDark} />
        {hasNotifications && <View style={styles.notificationDot} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  logo: {
    width: 96,
    height: 54,
  },
  notificationBtn: {
    position: 'relative',
    padding: spacing.xs,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4B4B',
    borderWidth: 2,
    borderColor: colors.white,
  },
});
