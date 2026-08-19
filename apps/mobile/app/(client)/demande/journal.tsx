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

export default function JournalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string; phone?: string; specialty?: string }>();

  const proName = params.proName || 'Jean Mbarga';

  const [diagnostic, setDiagnostic] = useState(
    'Surtension électrique ayant endommagé la prise principale et le câble de dérivation.'
  );
  const [solution, setSolution] = useState(
    'Remplacement complet du bloc prise 16A, réalignement de la ligne neutre et contrôle de tension.'
  );
  const [material, setMaterial] = useState('Prise encastrée Legrand 16A + 2m câble 2.5mm²');
  const [materialCost, setMaterialCost] = useState('3 500');
  const [comment, setComment] = useState('Installation testée sous charge, aucun risque résiduel.');
  const [billPhoto, setBillPhoto] = useState<string | null>(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop'
  );

  const handleValidateJournal = () => {
    // Navigue vers le récapitulatif client (summary.tsx)
    router.push({
      pathname: '/(client)/demande/summary',
      params: {
        proName,
        diagnostic,
        solution,
        material,
        materialCost,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Journal d'intervention</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Prestataire */}
        <View style={styles.proCard}>
          <Ionicons name="document-text-outline" size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.proCardTitle}>Rapport rédigé par {proName}</Text>
            <Text style={styles.proCardSub}>Ce journal est obligatoire avant d'accéder au paiement.</Text>
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
          />
        </View>

        {/* Matériel & Montant (Séparé du Tarif Relio) */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Matériel & Fournitures utilisés</Text>
          <TextInput
            style={styles.input}
            value={material}
            onChangeText={setMaterial}
            placeholder="Ex : Prise Legrand 16A"
          />

          <Text style={[styles.label, { marginTop: spacing.xs }]}>Montant du matériel déclaré (FCFA)</Text>
          <TextInput
            style={styles.input}
            value={materialCost}
            onChangeText={setMaterialCost}
            keyboardType="numeric"
            placeholder="0"
          />
          <Text style={styles.materialNote}>
            * Le matériel est tracé pour référence et sera réglé directement au prestataire.
          </Text>
        </View>

        {/* Photo de facture matériel */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Photo de la facture matériel (optionnel)</Text>
          {billPhoto ? (
            <View style={styles.photoContainer}>
              <Image source={{ uri: billPhoto }} style={styles.photoImg} />
              <TouchableOpacity style={styles.removePhotoBtn} onPress={() => setBillPhoto(null)}>
                <Feather name="x" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addPhotoBtn} onPress={() => setBillPhoto('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300&auto=format&fit=crop')}>
              <Feather name="camera" size={20} color={colors.primary} />
              <Text style={styles.addPhotoText}>Ajouter photo facture</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Commentaire libre */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Commentaire / Remarques</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Remarques complémentaires..."
          />
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleValidateJournal} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Valider le journal & voir le récapitulatif</Text>
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
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#D4E5FF',
    gap: spacing.sm,
  },
  proCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  proCardSub: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
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
    minHeight: 70,
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
    width: 100,
    height: 100,
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
    width: 18,
    height: 18,
    borderRadius: 9,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
