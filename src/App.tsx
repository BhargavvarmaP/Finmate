import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from '@/routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CompanyProvider>
            <OnboardingProvider>
              <PaymentProvider>
                <AppRoutes />
                <Toaster />
              </PaymentProvider>
            </OnboardingProvider>
          </CompanyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}