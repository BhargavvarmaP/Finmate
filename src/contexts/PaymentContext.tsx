import { createContext, useContext, useState } from 'react';
import { api } from '@/services/api/base';

interface PaymentContextType {
  isPaymentSetup: boolean;
  setupPayment: (data: PaymentSetupData) => Promise<void>;
  verifyPayment: (id: string) => Promise<boolean>;
}

interface PaymentSetupData {
  accountNumber: string;
  ifscCode: string;
  accountType: 'savings' | 'current';
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [isPaymentSetup, setIsPaymentSetup] = useState(false);

  const setupPayment = async (data: PaymentSetupData) => {
    await api.post('/payments/setup', data);
    setIsPaymentSetup(true);
  };

  const verifyPayment = async (id: string) => {
    const response = await api.post(`/payments/verify/${id}`);
    return response.data.verified;
  };

  return (
    <PaymentContext.Provider value={{ isPaymentSetup, setupPayment, verifyPayment }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}