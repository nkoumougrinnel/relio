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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function PrestataireJournalScreen() {
  const router = useRouter();

  const clientName = 'Jean Dupont';
  const [diagnostic, setDiagnostic] = useState(
    'Surtension électrique ayant provoqué la fonte du disjoncteur différentiel 32A et l\'endommagement du bornier.'
  );
  const [solution, setSolution] = useState(
    'Remplacement du disjoncteur général, ré-isolation des raccordements et resserrage complet du tableau.'
  );
  const [material, setMaterial] = useState('Disjoncteur Schneider 32A + Bornier de répartition');
  const [materialCost, setMaterialCost] = useState('3 500');
  const [comment, setComment] = useState('Tableau testé en charge pleine. Installation 100% conforme.');
  const [billPhoto, setBillPhoto] = useState<string | null>(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop'
  );

  const handleSubmitJournal = () => {
    if (!diagnostic.trim()) {
      Alert.alert('Champ requis', 'Veuillez saisir le diagnostic obligatoire.');
      return;
    }

    // Une fois soumis, le prestataire passe en attente de paiement
    router.push({
      pathname: '/(prestataire)/mission/waiting-payment',
      params: {
        clientName,
        materialCost,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={22} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Journal d'intervention</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Prestataire */}
        <View style={styles.infoBanner}>
          <Ionicons name="document-text-outline" size={22} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoBannerTitle}>Remplissez le journal obligatoire</Text>
            <Text style={styles.infoBannerSub}>
              Le client {clientName} verra la facture et le récapitulatif pour procéder au paiement.
            </Text>
          </View>
        </View>

        {/* Diagnostic (Obligatoire) */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Diagnostic (Obligatoire) *</Text>
          <TextInput
            style={styles.textArea}
            value={diagnostic}
            onChangeText={setDiagnostic}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholder="Décrivez la panne ou le problème constaté..."
          />
        </View>

        {/* Solution apportée */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Solution apportée</Text>
          <TextInput
            style={styles.textArea}
            value={solution}
            onChangeText={setSolution}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholder="Explication du travail réalisé..."
          />
        </View>

        {/* Matériel & Montant */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Matériel & Fournitures installés</Text>
          <TextInput
            style={styles.input}
            value={material}
            onChangeText={setMaterial}
            placeholder="Ex : Disjoncteur Schneider 32A"
          />

          <Text style={[styles.label, { marginTop: spacing.xs }]}>Montant total du matériel (FCFA)</Text>
          <TextInput
            style={styles.input}
            value={materialCost}
            onChangeText={setMaterialCost}
            keyboardType="numeric"
            placeholder="0"
          />
          <Text style={styles.materialNote}>
            * Le matériel est facturé en supplément du Tarif Relio et remboursé directement.
          </Text>
        </View>

        {/* Photo de facture matériel */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Photo du reçu / facture matériel (optionnel)</Text>
          {billPhoto ? (
            <View style={styles.photoContainer}>
              <Image source={{ uri: billPhoto }} style={styles.photoImg} />
              <TouchableOpacity style={styles.removePhotoBtn} onPress={() => setBillPhoto(null)}>
                <Feather name="x" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addPhotoBtn}
              onPress={() => setBillPhoto('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop')}
            >
              <Feather name="camera" size={20} color={colors.primary} />
              <Text style={styles.addPhotoText}>Ajouter photo facture</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Commentaire libre */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Commentaires / Recommandations au client</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Remarques complémentaires pour le client..."
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitJournal} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Transmettre le journal au client</Text>
          <Feather name="send" size={18} color={colors.white} />
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.grayVeryDark,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E3FF',
    gap: spacing.sm,
  },
  infoBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  infoBannerSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
    lineHeight: 16,
  },
  formGroup: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  textArea: {
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: 14,
    color: colors.grayVeryDark,
    minHeight: 75,
  },
  input: {
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.grayVeryDark,
  },
  materialNote: {
    fontSize: 11,
    color: colors.grayDark,
    fontStyle: 'italic',
    marginTop: 2,
  },
  photoContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    marginTop: 4,
  },
  photoImg: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: borderRadius.sm,
    paddingVertical: 12,
    gap: 6,
    marginTop: 4,
  },
  addPhotoText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
