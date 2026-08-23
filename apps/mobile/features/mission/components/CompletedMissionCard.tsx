import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';
import { ProviderCompletedActivity } from '../types';
import { serviceCatalogService } from '../services/service-catalog.service';

interface CompletedMissionCardProps {
  activity: ProviderCompletedActivity;
}

/**
 * Mission terminée et payée, pour l'activité récente de l'accueil prestataire.
 */
export function CompletedMissionCard({ activity }: CompletedMissionCardProps) {
  const category = serviceCatalogService.getCategoryById(activity.categoryId);

  return (
    <View style={styles.card}>
      {category.illustration ? (
        <Image
          source={category.illustration}
          style={styles.illustration}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: category.iconBackground },
          ]}
        >
          <Feather name={category.icon} size={18} color={category.iconColor} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {activity.title}
        </Text>
        <Text style={styles.date}>{activity.date}</Text>
      </View>

      <Text style={styles.amount}>+{activity.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  illustration: {
    width: 40,
    height: 40,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: colors.grayDark,
  },
  amount: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.success,
  },
});
