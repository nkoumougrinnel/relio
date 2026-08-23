import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { EmptyState, Header, SegmentedTabs } from '../../../components/ui';
import { serviceRequestService } from '../services/service-request.service';
import { ServiceRequestCard } from '../components/ServiceRequestCard';
import {
  FeatherIconName,
  ServiceRequestStatus,
  ServiceRequestSummary,
} from '../types';

const EMPTY_COPY: Record<
  ServiceRequestStatus,
  { title: string; description: string; icon: FeatherIconName }
> = {
  pending: {
    icon: 'clock',
    title: 'Aucune demande en attente',
    description:
      'Vos recherches de professionnel apparaîtront ici le temps de trouver un prestataire.',
  },
  ongoing: {
    icon: 'play-circle',
    title: 'Aucune intervention en cours',
    description:
      "Dès qu'un professionnel sera attribué, le suivi de la mission s'affichera ici.",
  },
  done: {
    icon: 'check-circle',
    title: 'Aucune demande terminée',
    description: 'Vos interventions passées et leurs détails apparaîtront ici.',
  },
};

export function ClientRequestsScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<ServiceRequestStatus>('pending');

  const requests = serviceRequestService.getRequestsByStatus(status);
  const empty = EMPTY_COPY[status];

  const handleOpenRequest = (request: ServiceRequestSummary) => {
    router.push(serviceRequestService.getRequestRoute(request) as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Mes demandes" style={styles.header} />

      <SegmentedTabs
        tabs={serviceRequestService.getTabs()}
        value={status}
        onChange={setStatus}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {requests.length === 0 ? (
          <EmptyState
            variant="card"
            icon={
              <Feather
                name={empty.icon}
                size={28}
                color={status === 'done' ? colors.success : colors.primary}
              />
            }
            title={empty.title}
            description={empty.description}
          />
        ) : (
          <View style={styles.list}>
            {requests.map((request) => (
              <ServiceRequestCard
                key={request.id}
                request={request}
                onPress={() => handleOpenRequest(request)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 64,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
});
