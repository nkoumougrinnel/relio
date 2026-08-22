import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { OnboardingSlide } from './components/OnboardingSlide';

export default function OnboardingStep3Screen() {
  const router = useRouter();

  return (
    <OnboardingSlide
      title="Le bon professionnel intervient"
      subtitle="Suivez votre intervention en temps réel, échangez avec le professionnel et évaluez la prestation."
      image={require('./assets/illustration-step3.png')}
      currentStep={2}
      onNext={() => router.push('/(onboarding)/ready' as any)}
      options={[
        { icon: <Feather name="shield" size={24} color={colors.primary} />, label: 'Paiement\nsécurisé' },
        { icon: <Feather name="life-buoy" size={24} color={colors.primary} />, label: 'Support' },
        { icon: <Feather name="star" size={24} color={colors.primary} />, label: 'Évaluation' },
      ]}
    />
  );
}