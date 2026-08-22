import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import {
  BottomBar,
  Button,
  Header,
  RatingStars,
} from '../../../components/ui';

const MAX_COMMENT_LENGTH = 300;

export function InterventionReviewScreen() {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    router.replace('/(client)/(tabs)/demandes' as any);
    Alert.alert(
      'Évaluation envoyée !',
      'Merci pour votre retour. Votre avis contribue à maintenir la qualité du réseau Relio.'
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header title="Évaluation" showBack bordered />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.graphicCircle}>
          <Ionicons name="star" size={42} color="#FFB800" />
        </View>

        <Text style={styles.title}>
          Comment s&apos;est déroulée{'\n'}votre intervention ?
        </Text>

        <RatingStars
          value={rating}
          size={34}
          onChange={setRating}
          style={styles.stars}
        />

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
            maxLength={MAX_COMMENT_LENGTH}
            textAlignVertical="top"
          />
          <Text style={styles.counter}>
            {comment.length}/{MAX_COMMENT_LENGTH}
          </Text>
        </View>
      </ScrollView>

      <BottomBar>
        <Button title="Envoyer l'évaluation" onPress={handleSubmit} />
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
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  stars: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
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
  counter: {
    fontSize: 12,
    color: colors.grayDark,
    textAlign: 'right',
  },
});
