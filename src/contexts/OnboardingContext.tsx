import { createContext, useContext, useState } from 'react';
import { OnboardingStep, OnboardingStatus } from '@/types';

interface OnboardingContextType {
  status: OnboardingStatus;
  currentStep: OnboardingStep;
  completeStep: (step: OnboardingStep) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialStatus: OnboardingStatus = {
  currentStep: 'kyc',
  kycVerified: false,
  businessSetupComplete: false,
  paymentSetupComplete: false,
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<OnboardingStatus>(initialStatus);

  const completeStep = (step: OnboardingStep) => {
    setStatus(prev => {
      const newStatus = { ...prev };
      switch (step) {
        case 'kyc':
          newStatus.kycVerified = true;
          newStatus.currentStep = 'business';
          break;
        case 'business':
          newStatus.businessSetupComplete = true;
          newStatus.currentStep = 'payment';
          break;
        case 'payment':
          newStatus.paymentSetupComplete = true;
          newStatus.currentStep = 'complete';
          break;
      }
      return newStatus;
    });
  };

  const resetOnboarding = () => {
    setStatus(initialStatus);
  };

  return (
    <OnboardingContext.Provider
      value={{
        status,
        currentStep: status.currentStep,
        completeStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}