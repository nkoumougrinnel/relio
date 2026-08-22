import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';
import { Button, FilterChips, Header } from '../../../components/ui';
import { activityHistoryService } from '../services/activity-history.service';
import { ActivityHistoryCard } from '../components/ActivityHistoryCard';

export function ActivityHistoryScreen() {
  const filters = activityHistoryService.getFilters();
  const entries = activityHistoryService.getEntries();

  const [selectedFilter, setSelectedFilter] = useState(filters[0].id);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Historique" showBack bordered />

      <FilterChips
        items={filters}
        selectedId={selectedFilter}
        onSelect={setSelectedFilter}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.monthHeader}>Juin 2026</Text>

        {entries.map((entry) => (
          <ActivityHistoryCard key={entry.id} entry={entry} />
        ))}

        <Button
          title="Voir plus d'historique"
          variant="outline"
          onPress={() => {}}
          style={styles.moreBtn}
        />

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
  monthHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 2,
  },
  moreBtn: {
    marginTop: spacing.sm,
  },
  bottomSpacer: {
    height: 40,
  },
});
