import { motion } from 'framer-motion';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { PaymentSetup as PaymentSetupForm } from '@/components/onboarding/PaymentSetup';

export function PaymentSetup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
    >
      <div className="w-full max-w-3xl">
        <OnboardingProgress />
        <PaymentSetupForm />
      </div>
    </motion.div>
  );
}