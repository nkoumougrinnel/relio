import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Badge } from '../../../components/ui';
import { ServiceRequestStatus, ServiceRequestSummary } from '../types';
import { serviceCatalogService } from '../services/service-catalog.service';
import { serviceRequestService } from '../services/service-request.service';

const STATUS_VARIANT: Record<
  ServiceRequestStatus,
  'success' | 'warning' | 'gray'
> = {
  done: 'success',
  ongoing: 'warning',
  pending: 'gray',
};

interface ServiceRequestCardProps {
  request: ServiceRequestSummary;
  onPress: () => void;
  /** `comfortable` aère la carte pour les contextes de mise en avant. */
  size?: 'compact' | 'comfortable';
}

/**
 * Ligne de liste d'une demande client (accueil et « Mes demandes »).
 */
export function ServiceRequestCard({
  request,
  onPress,
  size = 'compact',
}: ServiceRequestCardProps) {
  const category = serviceCatalogService.getCategoryById(request.categoryId);
  const isComfortable = size === 'comfortable';

  return (
    <TouchableOpacity
      style={[styles.card, isComfortable && styles.cardComfortable]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {category.illustration ? (
        <Image
          source={category.illustration}
          style={[
            styles.illustration,
            isComfortable && styles.illustrationComfortable,
          ]}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            styles.iconCircle,
            isComfortable && styles.iconCircleComfortable,
            { backgroundColor: category.iconBackground },
          ]}
        >
          <Feather
            name={category.icon}
            size={isComfortable ? 22 : 18}
            color={category.iconColor}
          />
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {request.title}
          </Text>
          <Badge
            label={serviceRequestService.getStatusLabel(request.status)}
            variant={STATUS_VARIANT[request.status]}
          />
        </View>

        <Text style={styles.location}>{request.location}</Text>
        <Text style={styles.date}>{request.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardComfortable: {
    borderRadius: borderRadius.lg,
    padding: spacing.md + 4,
  },
  illustration: {
    width: 40,
    height: 40,
    marginRight: spacing.md,
  },
  illustrationComfortable: {
    width: 52,
    height: 52,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconCircleComfortable: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    flex: 1,
  },
  location: {
    fontSize: 13,
    color: colors.grayDark,
  },
  date: {
    fontSize: 11,
    color: colors.grayMedium,
    marginTop: 2,
  },
});
