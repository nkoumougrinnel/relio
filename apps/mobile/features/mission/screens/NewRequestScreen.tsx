import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { BottomBar, Button, Header } from '../../../components/ui';
import { serviceRequestService } from '../services/service-request.service';
import { VoiceNoteCard } from '../components/VoiceNoteCard';
import { RequestPhotoPicker } from '../components/RequestPhotoPicker';

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

  const [description, setDescription] = useState(draft.description);
  const [isAudio, setIsAudio] = useState(params.isAudio === 'true');
  const [category] = useState(draft.category);
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

  const handleSearchProvider = () => {
    router.push({
      pathname: '/(client)/demande/searching',
      params: { problemText: description, category },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Nouvelle demande" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isAudio && (
          <VoiceNoteCard duration={serviceRequestService.getVoiceNoteDuration()} />
        )}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Décrivez votre problème</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder={serviceRequestService.getDefaultDescription()}
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.micBtn}
              activeOpacity={0.7}
              onPress={() => setIsAudio(!isAudio)}
            >
              <Feather name="mic" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Catégorie suggérée</Text>
          <TouchableOpacity style={styles.categoryRow} activeOpacity={0.7}>
            <View style={styles.categoryLeft}>
              <Text style={styles.categoryIcon}>⚡</Text>
              <Text style={styles.categoryName}>{category}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.grayDark} />
          </TouchableOpacity>
          <Text style={styles.categoryFootnote}>
            Vous pouvez changer de catégorie
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Adresse</Text>

          <View style={styles.positionBadge}>
            <Ionicons
              name="navigate-circle"
              size={18}
              color={colors.primary}
              style={styles.positionIcon}
            />
            <Text style={styles.positionText}>Ma position actuelle</Text>
          </View>

          <View style={styles.addressRow}>
            <Text style={styles.addressText}>{address}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Feather name="edit-2" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.addressDetailsInput}
            value={addressDetails}
            onChangeText={setAddressDetails}
            placeholder="Précisions d'accès (bâtiment, repère...)"
            placeholderTextColor={colors.placeholder}
          />

          <View style={styles.mapSnippet}>
            <View style={styles.mapOverlay} />
            <Ionicons name="location" size={24} color={colors.primary} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Photos (optionnel)</Text>
          <RequestPhotoPicker
            photos={photos}
            onAdd={handleAddPhoto}
            onRemove={handleRemovePhoto}
          />
        </View>

        <View style={styles.tariffCard}>
          <View style={styles.tariffHeader}>
            <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
            <Text style={styles.tariffTitle}>Fourchette de tarif attendue</Text>
          </View>
          <Text style={styles.tariffAmount}>
            {serviceRequestService.getIndicativeTariffRange()}
          </Text>
          <Text style={styles.tariffSubtext}>
            Le Tarif Relio exact sera confirmé après analyse de votre problème.
          </Text>
        </View>
      </ScrollView>

      <BottomBar>
        <Button
          title="Rechercher un professionnel"
          onPress={handleSearchProvider}
        />
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
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    position: 'relative',
  },
  textArea: {
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    paddingRight: 40,
    fontSize: 15,
    color: colors.grayVeryDark,
    minHeight: 80,
  },
  micBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 6,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  categoryFootnote: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 6,
  },
  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  positionIcon: {
    marginRight: 6,
  },
  positionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
    flex: 1,
  },
  addressDetailsInput: {
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.grayVeryDark,
    marginBottom: spacing.sm,
  },
  mapSnippet: {
    height: 70,
    backgroundColor: '#EBF3FF',
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,83,243,0.05)',
  },
  tariffCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FFE8A3',
    gap: 4,
  },
  tariffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tariffTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  tariffAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: 2,
  },
  tariffSubtext: {
    fontSize: 12,
    color: colors.grayDark,
    lineHeight: 16,
  },
});
