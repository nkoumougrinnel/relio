import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '../../../theme';
import { Avatar } from '../../../components/ui';

interface ProfileIdentityCardProps {
  name: string;
  avatarUrl: string;
  phone: string;
  email?: string;
  specialty?: string;
  onPress?: () => void;
}

export function ProfileIdentityCard({
  name,
  avatarUrl,
  phone,
  email,
  specialty,
  onPress,
}: ProfileIdentityCardProps) {
  const content = (
    <>
      <Avatar source={avatarUrl} name={name} size={60} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {specialty && <Text style={styles.specialty}>{specialty}</Text>}
        <Text style={styles.phone}>{phone}</Text>
        {email && <Text style={styles.email}>{email}</Text>}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 13,
    color: colors.grayDark,
  },
  phone: {
    fontSize: 13,
    color: colors.grayDark,
  },
  email: {
    fontSize: 12,
    color: colors.grayMedium,
    marginTop: 2,
  },
});
