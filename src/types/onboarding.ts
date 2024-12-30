export interface OnboardingStatus {
  currentStep: OnboardingStep;
  kycVerified: boolean;
  businessSetupComplete: boolean;
  paymentSetupComplete: boolean;
}

export type OnboardingStep = 'kyc' | 'business' | 'payment' | 'complete';

export interface PaymentSetupData {
  accountNumber: string;
  ifscCode: string;
  accountType: 'savings' | 'current';
} 