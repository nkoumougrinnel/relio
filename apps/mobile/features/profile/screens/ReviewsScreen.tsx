import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import {
  Button,
  EmptyState,
  Header,
  SegmentedTabs,
  type SegmentedTab,
} from '../../../components/ui';
import { reviewsService } from '../services/reviews.service';
import { ReviewCard } from '../components/ReviewCard';

type ReviewsTab = 'given' | 'received';

const TABS: SegmentedTab<ReviewsTab>[] = [
  { id: 'given', label: 'Données' },
  { id: 'received', label: 'Reçues' },
];

export function ReviewsScreen() {
  const [tab, setTab] = useState<ReviewsTab>('given');

  const reviews =
    tab === 'given'
      ? reviewsService.getGivenReviews()
      : reviewsService.getReceivedReviews();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Évaluations données" showBack bordered />

      <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <EmptyState
            icon={
              <Ionicons
                name="chatbox-ellipses-outline"
                size={40}
                color={colors.grayMedium}
              />
            }
            description="Aucune évaluation reçue pour le moment."
          />
        )}

        <Button
          title="Voir toutes mes évaluations"
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
  moreBtn: {
    marginTop: spacing.sm,
  },
  bottomSpacer: {
    height: 40,
  },
});
