import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function NewDemandScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ initialText?: string; isAudio?: string; category?: string }>();

  const [description, setDescription] = useState(
    params.initialText || 'Ex. : Ma prise ne fonctionne plus depuis ce matin...'
  );
  const [isAudio, setIsAudio] = useState(params.isAudio === 'true');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(params.category || 'Électricité');
  const [address, setAddress] = useState('Avenue de la République, Bonapriso, Douala');
  const [addressDetails, setAddressDetails] = useState('Bâtiment bleu, 2ème étage');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleAddPhoto = () => {
    if (photos.length < 3) {
      setPhotos([
        ...photos,
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop',
      ]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSearchPro = () => {
    router.push({
      pathname: '/(client)/demande/searching',
      params: {
        problemText: description,
        category: selectedCategory,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 17 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle demande</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Audio Card (Si venu du bouton vocal) */}
        {isAudio && (
          <View style={styles.audioCard}>
            <View style={styles.audioHeader}>
              <View style={styles.audioBadge}>
                <Feather name="mic" size={14} color={colors.primary} />
                <Text style={styles.audioBadgeText}>Message vocal enregistré</Text>
              </View>
              <Text style={styles.audioDuration}>0:14</Text>
            </View>

            <View style={styles.audioPlayerRow}>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => setIsPlayingAudio(!isPlayingAudio)}
                activeOpacity={0.8}
              >
                <Feather name={isPlayingAudio ? 'pause' : 'play'} size={18} color={colors.white} />
              </TouchableOpacity>

              <View style={styles.waveformContainer}>
                {[12, 24, 18, 30, 42, 28, 16, 35, 45, 20, 14, 28, 38, 22, 16, 32].map((h, i) => (
                  <View key={i} style={[styles.waveBar, { height: h }, isPlayingAudio && i < 7 ? styles.waveBarActive : null]} />
                ))}
              </View>
            </View>
            <Text style={styles.transcriptionLabel}>Transcription automatique IA (modifiable ci-dessous) :</Text>
          </View>
        )}

        {/* Section 1 : Décrivez votre problème */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Décrivez votre problème</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Ex. : Ma prise ne fonctionne plus depuis ce matin..."
              placeholderTextColor={colors.placeholder}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.micInputBtn} activeOpacity={0.7} onPress={() => setIsAudio(!isAudio)}>
              <Feather name="mic" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2 : Catégorie suggérée */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Catégorie suggérée</Text>
          <TouchableOpacity style={styles.categoryRow} activeOpacity={0.7}>
            <View style={styles.catLeft}>
              <Text style={styles.catIcon}>⚡</Text>
              <Text style={styles.catName}>{selectedCategory}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.grayDark} />
          </TouchableOpacity>
          <Text style={styles.catFootnote}>Vous pouvez changer de catégorie</Text>
        </View>

        {/* Section 3 : Adresse */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Adresse</Text>
          
          <View style={styles.positionBadge}>
            <Ionicons name="navigate-circle" size={18} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.positionBadgeText}>Ma position actuelle</Text>
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

          {/* Snippet Carte Visuelle */}
          <View style={styles.mapSnippet}>
            <View style={styles.mapPin}>
              <Ionicons name="location" size={24} color={colors.primary} />
            </View>
            <View style={styles.mapDotGrid} />
          </View>
        </View>

        {/* Section 4 : Photos (optionnel) */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Photos (optionnel)</Text>
          <View style={styles.photosRow}>
            <TouchableOpacity style={styles.photoAddBtn} onPress={handleAddPhoto} activeOpacity={0.7}>
              <Feather name="camera" size={22} color={colors.primary} />
            </TouchableOpacity>

            {photos.map((uri, idx) => (
              <View key={idx} style={styles.photoWrapper}>
                <Image source={{ uri }} style={styles.photoImg} />
                <TouchableOpacity style={styles.photoRemoveBtn} onPress={() => handleRemovePhoto(idx)}>
                  <Feather name="x" size={12} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}

            {photos.length < 2 && (
              <TouchableOpacity style={styles.photoAddBtnPlaceholder} onPress={handleAddPhoto} activeOpacity={0.7}>
                <Feather name="plus" size={22} color={colors.grayMedium} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Section 5 : Fourchette de tarif attendue */}
        <View style={styles.tariffCard}>
          <View style={styles.tariffHeader}>
            <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
            <Text style={styles.tariffTitle}>Fourchette de tarif attendue</Text>
          </View>
          <Text style={styles.tariffAmount}>15 000 – 25 000 FCFA</Text>
          <Text style={styles.tariffSubtext}>
            Le Tarif Relio exact sera confirmé après analyse de votre problème.
          </Text>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bouton principal — Maquette 17 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSearchPro} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Rechercher un professionnel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
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

  /* Audio */
  audioCard: {
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.xs,
  },
  audioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  audioBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  audioDuration: {
    fontSize: 12,
    color: colors.grayDark,
    fontWeight: '600',
  },
  audioPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 36,
  },
  waveBar: {
    flex: 1,
    backgroundColor: colors.grayLight,
    borderRadius: 2,
  },
  waveBarActive: {
    backgroundColor: colors.primary,
  },
  transcriptionLabel: {
    fontSize: 12,
    color: colors.grayDark,
    fontStyle: 'italic',
  },

  /* Text Area */
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
  micInputBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 6,
  },

  /* Catégorie */
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
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  catIcon: {
    fontSize: 18,
  },
  catName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  catFootnote: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 6,
  },

  /* Adresse */
  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  positionBadgeText: {
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
    position: 'relative',
    overflow: 'hidden',
  },
  mapPin: {
    zIndex: 2,
  },
  mapDotGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,83,243,0.05)',
  },

  /* Photos */
  photosRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  photoAddBtn: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
  },
  photoAddBtnPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
  },
  photoWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
  },
  photoImg: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  photoRemoveBtn: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Tariff Card */
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

  /* Bottom Bar */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
