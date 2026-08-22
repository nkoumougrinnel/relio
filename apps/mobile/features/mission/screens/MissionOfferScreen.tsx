import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { serviceCatalogService } from '../services/service-catalog.service';

export function MissionOfferScreen() {
  const router = useRouter();

  const offer = providerMissionService.getOffer();
  const category = serviceCatalogService.getCategoryById(offer.categoryId);

  const handleAccept = () => {
    router.push('/(prestataire)/mission/en-route' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header title="Détail de la mission" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: category.iconBackground },
            ]}
          >
            <Feather name={category.icon} size={16} color={category.iconColor} />
            <Text style={[styles.categoryText, { color: category.iconColor }]}>
              {offer.categoryLabel}
            </Text>
          </View>

          <Text style={styles.title}>{offer.title}</Text>
          <Text style={styles.publishedAgo}>{offer.publishedAgo}</Text>

          <View style={styles.budgetBox}>
            <Text style={styles.budgetLabel}>Budget estimé Tarif Relio</Text>
            <Text style={styles.budgetValue}>{offer.budgetRange}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails de la demande</Text>

          <View style={styles.infoCard}>
            <Text style={styles.description}>{offer.description}</Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Feather name="map-pin" size={16} color={colors.primary} />
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Localisation</Text>
                <Text style={styles.rowValue}>
                  {offer.location} · {offer.distance}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Feather name="user" size={16} color={colors.primary} />
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Client</Text>
                <Text style={styles.rowValue}>
                  {offer.client.name} (
                  {offer.client.verified ? 'Client Vérifié' : 'Client'} ⭐{' '}
                  {offer.client.rating})
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          title="Accepter la mission"
          variant="success"
          onPress={handleAccept}
          rightIcon={
            <Feather name="check-circle" size={20} color={colors.white} />
          }
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
    padding: spacing.lg,
    gap: spacing.lg,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: 4,
  },
  publishedAgo: {
    fontSize: 12,
    color: colors.grayMedium,
    marginBottom: spacing.md,
  },
  budgetBox: {
    backgroundColor: '#EEF4FF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#D4E3FF',
  },
  budgetLabel: {
    fontSize: 11,
    color: colors.grayDark,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  budgetValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  description: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 21,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    color: colors.grayMedium,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginTop: 1,
  },
  bottomSpacer: {
    height: 40,
  },
});
