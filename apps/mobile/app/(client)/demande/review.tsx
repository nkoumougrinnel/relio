import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ proName?: string }>();

  const proName = params.proName || 'Jean Mbarga';
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    router.replace('/(client)/(tabs)/demandes' as any);
    Alert.alert(
      'Évaluation envoyée !',
      'Merci pour votre retour. Votre avis contribue à maintenir la qualité du réseau Relio.',
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header — Maquette 29 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={28} color={colors.grayVeryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Évaluation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Confetti & Star Graphic — Maquette 29 */}
        <View style={styles.graphicCircle}>
          <Ionicons name="star" size={42} color="#FFB800" />
        </View>

        <Text style={styles.mainTitle}>Comment s'est déroulée{'\n'}votre intervention ?</Text>

        {/* 5 Étoiles Sélectionnables — Maquette 29 */}
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
              style={styles.starBtn}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={34}
                color={star <= rating ? '#FFB800' : colors.grayMedium}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Formulaire Commentaire — Maquette 29 */}
        <View style={styles.commentBox}>
          <Text style={styles.commentLabel}>Votre commentaire (facultatif)</Text>
          <TextInput
            style={styles.textArea}
            value={comment}
            onChangeText={setComment}
            placeholder="Partagez votre expérience..."
            placeholderTextColor={colors.placeholder}
            multiline
            numberOfLines={5}
            maxLength={300}
            textAlignVertical="top"
          />
          <Text style={styles.charCounter}>{comment.length}/300</Text>
        </View>
      </ScrollView>

      {/* Bottom Bar — Maquette 29 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitReview} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Envoyer l'évaluation</Text>
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
    padding: spacing.lg,
    alignItems: 'center',
  },
  graphicCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  starBtn: {
    padding: 4,
  },

  /* Comment Box */
  commentBox: {
    width: '100%',
    gap: spacing.xs,
  },
  commentLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  textArea: {
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 14,
    color: colors.grayVeryDark,
    minHeight: 110,
  },
  charCounter: {
    fontSize: 12,
    color: colors.grayDark,
    textAlign: 'right',
  },

  /* Bottom Bar */
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
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
