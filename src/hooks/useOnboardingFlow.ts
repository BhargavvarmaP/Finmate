import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePayment } from '@/contexts/PaymentContext';
import { OnboardingStep } from '@/types';

export function useOnboardingFlow() {
  const navigate = useNavigate();
  const { status, completeStep } = useOnboarding();
  const { user } = useAuth();
  const { isPaymentSetup } = usePayment();
  const [isLoading, setIsLoading] = useState(false);

  const getNextStep = (currentStep: OnboardingStep): string => {
    switch (currentStep) {
      case 'kyc':
        return '/auth/business-setup';
      case 'business':
        return '/auth/payment-setup';
      case 'payment':
      case 'complete':
        return '/dashboard';
      default:
        return '/auth/kyc';
    }
  };

  const proceedToNextStep = async () => {
    setIsLoading(true);
    try {
      completeStep(status.currentStep);
      navigate(getNextStep(status.currentStep));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentStep: status.currentStep,
    canProceed: user && !isLoading,
    proceedToNextStep,
  };
}