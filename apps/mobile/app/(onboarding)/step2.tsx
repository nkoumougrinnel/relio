import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { OnboardingSlide } from './components/OnboardingSlide';

export default function OnboardingStep2Screen() {
  const router = useRouter();

  return (
    <OnboardingSlide
      title="Relio analyse votre demande"
      subtitle="Notre moteur compare les artisans disponibles, leurs compétences, leurs notes et leur proximité."
      image={require('./assets/illustration-step2.png')}
      currentStep={1}
      onNext={() => router.push('/(onboarding)/step3' as any)}
      options={[
        { icon: <Feather name="search" size={24} color={colors.primary} />, label: 'Analyse' },
        { icon: <Feather name="git-commit" size={24} color={colors.primary} />, label: 'Comparaison' },
        { icon: <Feather name="user-check" size={24} color={colors.primary} />, label: 'Sélection' },
      ]}
    />
  );
}