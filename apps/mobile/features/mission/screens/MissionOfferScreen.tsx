import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { providerMissionService } from '../services/provider-mission.service';
import { serviceCatalogService } from '../services/service-catalog.service';
import { serviceRequestService } from '../services/service-request.service';

const VISIBLE_PHOTOS = 3;

export function MissionOfferScreen() {
  const router = useRouter();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const offer = providerMissionService.getOffer();
  const category = serviceCatalogService.getCategoryById(offer.categoryId);
  const opportunity = providerMissionService
    .getOpportunities()
    .find((item) => item.id === offer.id);
  const amount = opportunity?.amount ?? offer.budgetRange;
  const publishedAgo = opportunity?.publishedAgo ?? offer.publishedAgo;
  const photos = [
    serviceRequestService.getSamplePhotoUri(),
    providerMissionService.getBillPhotoUri(),
    serviceRequestService.getSamplePhotoUri(),
    providerMissionService.getBillPhotoUri(),
    serviceRequestService.getSamplePhotoUri(),
  ];
  const hiddenPhotos = Math.max(0, photos.length - VISIBLE_PHOTOS);

  const handleAccept = () => {
    router.push('/(prestataire)/mission/en-route' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Détails de la mission" showBack style={styles.header} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaRow}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: category.iconBackground },
            ]}
          >
            {category.illustration ? (
              <Image
                source={category.illustration}
                style={styles.categoryIllustration}
                resizeMode="contain"
              />
            ) : (
              <Feather
                name={category.icon}
                size={16}
                color={category.iconColor}
              />
            )}
            <Text style={styles.categoryText}>{offer.categoryLabel}</Text>
          </View>
          <Text style={styles.publishedAgo}>{publishedAgo}</Text>
        </View>

        <View style={styles.introRow}>
          <View style={styles.introCopy}>
            <Text style={styles.title}>{offer.title}</Text>
          </View>
          {category.illustration ? (
            <Image
              source={category.illustration}
              style={styles.introIllustration}
              resizeMode="contain"
            />
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description détaillée</Text>
          <Text
            style={styles.description}
            numberOfLines={descriptionExpanded ? undefined : 4}
          >
            {offer.description}
          </Text>
          <TouchableOpacity
            onPress={() => setDescriptionExpanded((current) => !current)}
            activeOpacity={0.7}
          >
            <Text style={styles.moreLink}>
              {descriptionExpanded ? 'Réduire' : 'Afficher plus'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photoRow}>
            {photos.slice(0, VISIBLE_PHOTOS).map((uri, index) => {
              const isOverflow =
                index === VISIBLE_PHOTOS - 1 && hiddenPhotos > 0;
              return (
                <View key={`${uri}-${index}`} style={styles.photo}>
                  <Image source={{ uri }} style={styles.photoImage} />
                  {isOverflow && (
                    <View style={styles.photoOverlay}>
                      <Text style={styles.photoOverlayText}>
                        +{hiddenPhotos}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationMap}>
            <View style={styles.locationPin}>
              <Feather name="map-pin" size={18} color={colors.white} />
            </View>
            <View style={styles.locationRipple} />
          </View>
          <View style={styles.locationMeta}>
            <Text style={styles.locationText}>{offer.location}</Text>
            <Text style={styles.locationDot}>•</Text>
            <Text style={styles.locationDistance}>{offer.distance}</Text>
          </View>
        </View>

        <View style={styles.payCard}>
          <Text style={styles.payLabel}>Rémunération</Text>
          <Text style={styles.payValue}>{amount}</Text>
        </View>
      </ScrollView>

      <BottomBar>
        <View style={styles.actions}>
          <Button
            title="Décliner"
            variant="dangerOutline"
            style={styles.declineBtn}
            onPress={() => router.back()}
            leftIcon={<Feather name="x" size={18} color={colors.error} />}
          />
          <Button
            title="Accepter la mission"
            variant="primary"
            style={styles.acceptBtn}
            onPress={handleAccept}
            leftIcon={<Feather name="check" size={18} color={colors.white} />}
          />
        </View>
      </BottomBar>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF6DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  categoryIllustration: {
    width: 18,
    height: 18,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  publishedAgo: {
    fontSize: 13,
    color: colors.grayDark,
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  introCopy: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    color: colors.grayVeryDark,
  },
  introIllustration: {
    width: 72,
    height: 72,
    marginTop: 2,
  },
  locationCard: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  locationMap: {
    height: 132,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRipple: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#D4E4FF',
  },
  locationPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  locationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 6,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  locationDot: {
    color: colors.grayMedium,
  },
  locationDistance: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  payCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  payLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.grayMedium,
    marginBottom: 6,
  },
  payValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.sm + 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.grayVeryDark,
  },
  moreLink: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  photoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(33, 33, 33, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoOverlayText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  declineBtn: {
    flex: 0.9,
  },
  acceptBtn: {
    flex: 1.4,
  },
});
