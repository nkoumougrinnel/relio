import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { OnboardingSlide } from './components/OnboardingSlide';

export default function OnboardingStep1Screen() {
  const router = useRouter();

  return (
    <OnboardingSlide
      title="Décrivez votre problème"
      subtitle={
        <>
          Expliquez votre besoin par texte, photo ou message vocal.{ '\n' }
          Relio comprend automatiquement votre demande.
        </>
      }
      image={require('./assets/illustration-step1.png')}
      currentStep={0}
      onNext={() => router.push('/(onboarding)/step2' as any)}
      options={[
        { icon: <Feather name="file-text"  size={24} color={colors.primary} />, label: 'Texte' },
        { icon: <Feather name="camera"  size={24} color={colors.primary} />, label: 'Photo' },
        { icon: <Feather name="mic"  size={24} color={colors.primary} />, label: 'Voix' },
      ]}
    />
  );
}