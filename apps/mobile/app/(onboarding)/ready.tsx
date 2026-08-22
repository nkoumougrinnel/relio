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
import { colors, spacing } from '../../theme';
import { Button } from '../../components/ui';

const { width } = Dimensions.get('window');

export default function ReadyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        {/* En-tête : Logo Horizontal */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo-horizontal.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bloc central avec Illustration et Titre */}
        <View style={styles.mainSection}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require('./assets/illustration-ready.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Prêt à simplifier{'\n'}votre quotidien ?</Text>
        </View>

        {/* Actions en bas */}
        <View style={styles.actionsBlock}>
          <Button
            title="Créer un compte"
            variant="primary"
            onPress={() => router.push('/(auth)/register' as any)}
          />

          <Button
            title="J’ai déjà un compte"
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
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    alignItems: 'flex-start',
  },
  logo: {
    width: 140,
    height: 45,
  },
  mainSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  illustrationContainer: {
    width: width * 0.8,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 36,
  },
  actionsBlock: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
});
