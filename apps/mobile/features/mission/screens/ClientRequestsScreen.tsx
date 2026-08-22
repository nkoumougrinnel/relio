import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';
import { FilterChips, Header } from '../../../components/ui';
import { serviceRequestService } from '../services/service-request.service';
import { ServiceRequestCard } from '../components/ServiceRequestCard';
import { ServiceRequestSummary } from '../types';

export function ClientRequestsScreen() {
  const router = useRouter();

  const filters = serviceRequestService.getFilters();
  const [selectedFilter, setSelectedFilter] = useState(filters[0].id);

  const requests = serviceRequestService.filterRequests(
    serviceRequestService.getRequests(),
    selectedFilter
  );
  const groups = serviceRequestService.groupByPeriod(requests);

  const handleOpenRequest = (request: ServiceRequestSummary) => {
    router.push({
      pathname: '/(client)/demande/mission',
      params: {
        missionId: request.id,
        title: request.title,
        status: request.status,
        proName: request.providerName,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Mes demandes" bordered />

      <FilterChips
        items={filters}
        selectedId={selectedFilter}
        onSelect={setSelectedFilter}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => (
          <View key={group.label} style={styles.group}>
            <Text style={styles.groupLabel}>{group.label}</Text>

            {group.requests.map((request) => (
              <ServiceRequestCard
                key={request.id}
                request={request}
                onPress={() => handleOpenRequest(request)}
              />
            ))}
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  group: {
    gap: spacing.xs,
  },
  groupLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 4,
  },
  bottomSpacer: {
    height: 40,
  },
});
