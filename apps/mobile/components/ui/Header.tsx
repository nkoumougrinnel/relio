import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  transparent?: boolean;
  bordered?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightElement,
  style,
  titleStyle,
  transparent = false,
  bordered = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        transparent && styles.transparent,
        bordered && styles.bordered,
        style,
      ]}
    >
      {showBack ? (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={24} color={colors.grayVeryDark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      {title ? (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {rightElement ? (
        <View style={styles.rightContainer}>{rightElement}</View>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  spacer: {
    width: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
    textAlign: 'center',
  },
  rightContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
