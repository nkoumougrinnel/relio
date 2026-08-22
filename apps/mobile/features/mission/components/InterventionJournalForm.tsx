import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { InterventionJournal } from '../types';

interface InterventionJournalFormProps {
  journal: InterventionJournal;
  onChange: (patch: Partial<InterventionJournal>) => void;
  samplePhotoUri: string;
  materialLabel?: string;
  materialCostLabel?: string;
  materialNote: string;
  commentLabel?: string;
}

/**
 * Formulaire du journal d'intervention, partagé entre la saisie prestataire et
 * la relecture client.
 */
export function InterventionJournalForm({
  journal,
  onChange,
  samplePhotoUri,
  materialLabel = 'Matériel & Fournitures utilisés',
  materialCostLabel = 'Montant du matériel déclaré (FCFA)',
  materialNote,
  commentLabel = 'Commentaire / Remarques',
}: InterventionJournalFormProps) {
  return (
    <>
      <View style={styles.group}>
        <Text style={styles.label}>Diagnostic (Obligatoire) *</Text>
        <TextInput
          style={styles.textArea}
          value={journal.diagnostic}
          onChangeText={(diagnostic) => onChange({ diagnostic })}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Solution apportée</Text>
        <TextInput
          style={styles.textArea}
          value={journal.solution}
          onChangeText={(solution) => onChange({ solution })}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>{materialLabel}</Text>
        <TextInput
          style={styles.input}
          value={journal.material}
          onChangeText={(material) => onChange({ material })}
          placeholder="Ex : Prise Legrand 16A"
          placeholderTextColor={colors.placeholder}
        />

        <Text style={[styles.label, styles.labelSpaced]}>
          {materialCostLabel}
        </Text>
        <TextInput
          style={styles.input}
          value={journal.materialCost}
          onChangeText={(materialCost) => onChange({ materialCost })}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={colors.placeholder}
        />
        <Text style={styles.materialNote}>{materialNote}</Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>
          Photo de la facture matériel (optionnel)
        </Text>
        {journal.billPhoto ? (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: journal.billPhoto }}
              style={styles.photoImage}
            />
            <TouchableOpacity
              style={styles.removePhotoBtn}
              onPress={() => onChange({ billPhoto: null })}
            >
              <Feather name="x" size={12} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addPhotoBtn}
            onPress={() => onChange({ billPhoto: samplePhotoUri })}
            activeOpacity={0.7}
          >
            <Feather name="camera" size={20} color={colors.primary} />
            <Text style={styles.addPhotoText}>Ajouter photo facture</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>{commentLabel}</Text>
        <TextInput
          style={styles.input}
          value={journal.comment}
          onChangeText={(comment) => onChange({ comment })}
          placeholder="Remarques complémentaires..."
          placeholderTextColor={colors.placeholder}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
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
  labelSpaced: {
    marginTop: spacing.xs,
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
  photoImage: {
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
});
