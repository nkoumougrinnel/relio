import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { serviceRequestService } from '../services/service-request.service';
import { serviceCatalogService } from '../services/service-catalog.service';
import { RequestPhotoPicker } from '../components/RequestPhotoPicker';

const SPOKEN_TRANSCRIPTION = 'Ma prise ne fonctionne plus depuis ce matin.';

export function NewRequestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    initialText?: string;
    isAudio?: string;
    category?: string;
  }>();

  const draft = serviceRequestService.createDraft({
    initialText: params.initialText,
    category: params.category,
  });
  const categories = serviceCatalogService.getCategories();

  const [description, setDescription] = useState(
    params.initialText || (params.isAudio === 'true' ? SPOKEN_TRANSCRIPTION : '')
  );
  const [category, setCategory] = useState(
    serviceCatalogService.getCategoryByLabel(draft.category)
  );
  const [address] = useState(draft.address);
  const [addressDetails, setAddressDetails] = useState(draft.addressDetails);
  const [photos, setPhotos] = useState<string[]>(draft.photos);

  const handleAddPhoto = () => {
    if (photos.length < serviceRequestService.getMaxPhotos()) {
      setPhotos([...photos, serviceRequestService.getSamplePhotoUri()]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, position) => position !== index));
  };

  const handleCycleCategory = () => {
    const currentIndex = categories.findIndex((item) => item.id === category.id);
    setCategory(categories[(currentIndex + 1) % categories.length]);
  };

  const handleDictate = () => {
    setDescription((current) => current.trim() || SPOKEN_TRANSCRIPTION);
  };

  const handleSearchProvider = () => {
    router.push({
      pathname: '/(client)/demande/searching',
      params: { problemText: description, category: category.label },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Nouvelle demande" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Décrivez votre problème</Text>
          <View style={styles.descriptionField}>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Décrivez votre problème…"
              placeholderTextColor={colors.placeholder}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.micBtn}
              activeOpacity={0.8}
              onPress={handleDictate}
              accessibilityLabel="Dicter la description"
            >
              <Feather name="mic" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.helpText}>
            Écrivez ou utilisez le micro pour parler
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégorie</Text>
          <TouchableOpacity
            style={styles.categoryCard}
            activeOpacity={0.8}
            onPress={handleCycleCategory}
          >
            {category.illustration ? (
              <Image
                source={category.illustration}
                style={styles.categoryIllustration}
                resizeMode="contain"
              />
            ) : (
              <View
                style={[
                  styles.categoryFallback,
                  { backgroundColor: category.iconBackground },
                ]}
              >
                <Feather
                  name={category.icon}
                  size={20}
                  color={category.iconColor}
                />
              </View>
            )}
            <Text style={styles.categoryName}>{category.label}</Text>
            <Feather name="chevron-right" size={20} color={colors.grayDark} />
          </TouchableOpacity>
          <Text style={styles.helpText}>Appuyez pour changer de catégorie</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prix de la prestation</Text>
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>Montant de la prestation</Text>
            <Text style={styles.priceValue}>
              {serviceRequestService.getPrestationPrice()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse</Text>
          <View style={styles.addressCard}>
            <View style={styles.positionRow}>
              <Feather name="navigation" size={16} color={colors.primary} />
              <Text style={styles.positionText}>Ma position actuelle</Text>
            </View>

            <View style={styles.addressRow}>
              <Text style={styles.addressText}>{address}</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.editBtn}>
                <Feather name="edit-2" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.addressDetailsInput}
              value={addressDetails}
              onChangeText={setAddressDetails}
              placeholder="Complément d'adresse (optionnel)"
              placeholderTextColor={colors.placeholder}
            />

            <View style={styles.mapSnippet}>
              <View style={styles.mapPin}>
                <Feather name="map-pin" size={16} color={colors.white} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos (optionnel)</Text>
          <RequestPhotoPicker
            photos={photos}
            onAdd={handleAddPhoto}
            onRemove={handleRemovePhoto}
            maxPhotos={serviceRequestService.getMaxPhotos()}
          />
        </View>

      </ScrollView>

      <BottomBar>
        <View style={styles.ctaBlock}>
          <View style={styles.ctaPrice}>
            <Text style={styles.ctaPriceLabel}>Vous payez</Text>
            <Text style={styles.ctaPriceValue}>
              {serviceRequestService.getPrestationPrice()}
            </Text>
          </View>
          <Button
            title="Rechercher un professionnel"
            onPress={handleSearchProvider}
            style={styles.ctaButton}
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.sm,
  },
  descriptionField: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    minHeight: 140,
    padding: spacing.md,
    paddingBottom: 56,
  },
  textArea: {
    flex: 1,
    fontSize: 17,
    lineHeight: 26,
    color: colors.grayVeryDark,
    minHeight: 84,
  },
  micBtn: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    marginTop: spacing.sm,
    fontSize: 13,
    color: colors.grayDark,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  categoryIllustration: {
    width: 44,
    height: 44,
  },
  categoryFallback: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  addressCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  positionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    color: colors.grayVeryDark,
  },
  editBtn: {
    padding: 4,
  },
  addressDetailsInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.grayVeryDark,
    marginBottom: spacing.md,
  },
  mapSnippet: {
    height: 72,
    backgroundColor: '#E8F1FF',
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCard: {
    backgroundColor: '#EEF4FF',
    borderWidth: 1.5,
    borderColor: '#C5D8FF',
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.4,
  },
  priceHint: {
    marginTop: 6,
    fontSize: 13,
    color: colors.grayDark,
  },
  ctaBlock: {
    gap: spacing.sm,
  },
  ctaPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  ctaPriceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.grayDark,
  },
  ctaPriceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  ctaButton: {
    width: '100%',
  },
});
