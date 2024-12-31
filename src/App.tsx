import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from '@/routes';
import './styles/animations.css'; // Import custom animations
import '../src/styles/globals.css'; // Import global styles

/**
 * Combines all the context providers into a single component.
 * This reduces nesting and makes the App component cleaner.
 */
const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <AuthProvider>
      <CompanyProvider>
        <OnboardingProvider>
          <PaymentProvider>
            {children}
          </PaymentProvider>
        </OnboardingProvider>
      </CompanyProvider>
    </AuthProvider>
  </ThemeProvider>
);

/**
 * Main App component.
 * Wraps the application with necessary providers and routes.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
        <Toaster />
      </AppProviders>
    </BrowserRouter>
  );
}