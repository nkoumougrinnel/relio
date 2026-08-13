import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../../theme';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ClientHomeScreen() {
  const [problemText, setProblemText] = useState('');

  const renderCategory = (icon: string, label: string) => (
    <TouchableOpacity style={styles.categoryBadge} activeOpacity={0.7}>
      <Text style={styles.categoryIcon}>{icon}</Text>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header : Logo & Notification */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/logo-horizontal.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
          <Feather name="bell" size={24} color={colors.grayVeryDark} />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Bonjour & Titre */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Bonjour Jean 👋</Text>
          <Text style={styles.mainTitle}>
            Quel problème devons-nous{'\n'}résoudre aujourd’hui ?
          </Text>
        </View>

        {/* Barre Principale de Saisie (Point Focal) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Décrivez votre problème..."
            placeholderTextColor={colors.placeholder}
            value={problemText}
            onChangeText={setProblemText}
            multiline
            maxLength={200}
          />
          <TouchableOpacity 
            style={[
              styles.actionBtn, 
              problemText.length > 0 ? styles.sendBtn : styles.micBtn
            ]}
            activeOpacity={0.7}
          >
            {problemText.length > 0 ? (
              <Feather name="send" size={20} color={colors.white} style={{ marginLeft: -2 }} />
            ) : (
              <Feather name="mic" size={22} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>

        {/* Catégories populaires */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories populaires</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {renderCategory('⚡', 'Électricité')}
            {renderCategory('💧', 'Plomberie')}
            {renderCategory('❄', 'Climatisation')}
            {renderCategory('🚗', 'Automobile')}
          </ScrollView>
        </View>

        {/* Dernières demandes (Compact) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dernières demandes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.requestsContainer}>
            {/* Demande 1 */}
            <TouchableOpacity style={styles.requestCard} activeOpacity={0.7}>
              <View style={styles.requestIconCircle}>
                <Text style={styles.requestIconEmoji}>❄</Text>
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Climatisation réparée</Text>
                <Text style={styles.requestSubtitle}>Bonapriso · Terminée</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.grayMedium} />
            </TouchableOpacity>

            {/* Demande 2 */}
            <TouchableOpacity style={styles.requestCard} activeOpacity={0.7}>
              <View style={styles.requestIconCircle}>
                <Text style={styles.requestIconEmoji}>⚡</Text>
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Problème d'électricité</Text>
                <Text style={styles.requestSubtitle}>Akwa · En attente</Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.grayMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bloc Pro (Secondaire) */}
        <View style={styles.proBlock}>
          <View style={styles.proInfo}>
            <Text style={styles.proTitle}>Vous êtes un professionnel ?</Text>
            <Text style={styles.proSubtitle}>Recevez des missions près de chez vous.</Text>
            <TouchableOpacity style={styles.proBtn} activeOpacity={0.8}>
              <Text style={styles.proBtnText}>Devenir prestataire</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.proIllustration}>
            {/* Petit emoji/illustration */}
            <Text style={{ fontSize: 40 }}>👷</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  logo: {
    height: 40,
    width: 100, // Ajusté pour le logo vertical/horizontal
  },
  notifBtn: {
    position: 'relative',
    padding: spacing.xs,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4B4B',
    borderWidth: 2,
    borderColor: colors.background,
  },
  scrollContent: {
    paddingTop: spacing.md,
  },
  greetingSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  greetingText: {
    fontSize: 16,
    color: colors.grayDark,
    marginBottom: 4,
    fontWeight: '500',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.grayVeryDark,
    lineHeight: 34,
  },
  
  /* Barre principale de saisie */
  inputContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md, // plus de hauteur et d'espace
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    color: colors.grayVeryDark,
    minHeight: 48,
    maxHeight: 100,
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  micBtn: {
    backgroundColor: colors.primary,
  },
  sendBtn: {
    backgroundColor: colors.success, // ou un bleu vif pour l'envoi
  },

  /* Catégories populaires */
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },

  /* Dernières demandes */
  requestsContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requestIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  requestIconEmoji: {
    fontSize: 18,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.grayVeryDark,
    marginBottom: 2,
  },
  requestSubtitle: {
    fontSize: 13,
    color: colors.grayMedium,
  },

  /* Bloc Professionnel */
  proBlock: {
    marginHorizontal: spacing.lg,
    backgroundColor: '#F0F6FF',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1EDFF',
  },
  proInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  proTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  proSubtitle: {
    fontSize: 13,
    color: colors.grayDark,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  proBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  proBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  proIllustration: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
