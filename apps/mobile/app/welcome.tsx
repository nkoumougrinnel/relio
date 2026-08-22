import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';
import { Button } from '../components/ui';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* En-tête : Logo Horizontal */}
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo-horizontal.png')}
            style={styles.logoHorizontal}
            resizeMode="contain"
          />
        </View>

        {/* Textes de Bienvenue */}
        <View style={styles.textSection}>
          <Text style={styles.welcomeTitle}>Bienvenue sur Relio 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Trouvez rapidement le bon professionnel pour tous vos besoins.
          </Text>
        </View>

        {/* Illustration au Centre */}
        <View style={styles.mainSection}>
          <View style={styles.illustrationContainer}>
            <View style={styles.cloudBackground}>
              <View style={styles.cloudPart1} />
              <View style={styles.cloudPart2} />
              <View style={styles.cloudPart3} />
            </View>
            <Image
              source={require('../assets/images/welcome-illustration.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Actions : Commencer & Se connecter */}
        <View style={styles.actionsSection}>
          <Button
            title="Commencer"
            variant="primary"
            onPress={() => router.push('/(onboarding)' as any)}
          />

          <Button
            title="Se connecter"
            variant="secondary"
            onPress={() => router.push('/(auth)' as any)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },
  logoHorizontal: {
    width: 160,
    height: 150,
  },
  textSection: {
    marginTop: spacing.sm,
    alignItems: 'flex-start',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'left',
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.grayDark,
    textAlign: 'left',
    lineHeight: 24,
  },
  mainSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: width * 0.85,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.md,
    position: 'relative',
  },
  cloudBackground: {
    position: 'absolute',
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudPart1: {
    position: 'absolute',
    width: '90%',
    height: '45%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '15%',
  },
  cloudPart2: {
    position: 'absolute',
    width: '55%',
    height: '55%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '35%',
    left: '12%',
  },
  cloudPart3: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    backgroundColor: '#EBF3FF',
    borderRadius: 200,
    bottom: '30%',
    right: '15%',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  actionsSection: {
    width: '100%',
    gap: spacing.sm,
  },
});
