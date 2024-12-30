import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Check, CircleDot } from 'lucide-react';
import { OnboardingStatus } from '@/types';

export function OnboardingProgress() {
  const { status } = useOnboarding();
  
  const steps = [
    { id: 'kyc', label: 'KYC Verification', completed: status.kycVerified },
    { id: 'business', label: 'Business Setup', completed: status.businessSetupComplete },
    { id: 'payment', label: 'Payment Setup', completed: status.paymentSetupComplete },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute top-4 w-full h-0.5 bg-gray-200" />
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                {step.completed ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <CircleDot className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">{step.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}