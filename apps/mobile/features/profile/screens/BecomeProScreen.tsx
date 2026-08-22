import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { BottomBar, Button, Header, Notice } from '../../../components/ui';
import { proApplicationService } from '../services/pro-application.service';
import { ProApplicationStatus } from '../types';
import { ProBenefitList } from '../components/ProBenefitList';
import { ProApplicationStepper } from '../components/ProApplicationStepper';

const ARTISAN_ILLUSTRATION =
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop';

export function BecomeProScreen() {
  const [status, setStatus] = useState<ProApplicationStatus>(
    proApplicationService.getStatus()
  );

  const isPending = status === 'pending';

  const handleSubmit = async () => {
    setStatus(await proApplicationService.submit());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header
        title={isPending ? 'Validation en cours' : 'Devenir prestataire'}
        showBack
        bordered
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isPending ? (
          <View style={styles.centeredView}>
            <View style={styles.clipboardIconBox}>
              <Ionicons
                name="clipboard-outline"
                size={48}
                color={colors.primary}
              />
            </View>

            <Text style={styles.mainTitle}>
              Votre demande est en cours de validation
            </Text>
            <Text style={styles.subtitle}>
              Nous vérifions vos documents et informations. Vous recevrez une
              réponse sous 24 heures.
            </Text>

            <ProApplicationStepper />

            <Notice
              text="Vous serez notifié dès que votre profil sera validé."
              icon={
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={colors.primary}
                />
              }
            />
          </View>
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.illustrationWrapper}>
              <Image
                source={{ uri: ARTISAN_ILLUSTRATION }}
                style={styles.illustration}
              />
            </View>

            <Text style={styles.mainTitle}>Rejoignez Relio</Text>
            <Text style={styles.subtitle}>
              Proposez vos services et recevez des missions près de chez vous.
            </Text>

            <ProBenefitList />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomBar floating>
        {isPending ? (
          <Button
            title="Modifier ma candidature"
            variant="outline"
            onPress={() => setStatus('none')}
          />
        ) : (
          <Button title="Devenir prestataire" onPress={handleSubmit} />
        )}
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
  },
  centeredView: {
    alignItems: 'center',
  },
  illustrationWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  clipboardIconBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.grayVeryDark,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  bottomSpacer: {
    height: 90,
  },
});
