import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, radius } from '../../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      inputStyle,
      labelStyle,
      style,
      multiline,
      numberOfLines,
      ...rest
    },
    ref
  ) => {
    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

        <View
          style={[
            styles.inputContainer,
            multiline && styles.multilineContainer,
            Boolean(error) && styles.inputError,
          ]}
        >
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              inputStyle,
              style,
            ]}
            placeholderTextColor={colors.placeholder}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? 'top' : 'center'}
            {...rest}
          />

          {rightIcon && (
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!onRightIconPress}
              onPress={onRightIconPress}
              style={styles.rightIconContainer}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  multilineContainer: {
    minHeight: 110,
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  inputError: {
    borderColor: colors.error,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
  },
  rightIconContainer: {
    marginLeft: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.grayVeryDark,
    paddingVertical: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
