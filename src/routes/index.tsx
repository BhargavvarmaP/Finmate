import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { KYCVerification } from '@/pages/auth/KYCVerification';
import { BusinessSetup } from '@/pages/auth/BusinessSetup';
import { PaymentSetup } from '@/pages/auth/PaymentSetup';
import { Dashboard } from '@/pages/Dashboard';
import { Transactions } from '@/pages/Transactions';
import { GSTFiling } from '@/pages/financial/GSTFiling';
import { TDSManagement } from '@/pages/financial/TDSManagement';
import { IncomeTaxFiling } from '@/pages/financial/IncomeTaxFiling';
import { Settings } from '@/pages/Settings';
import { useAuth } from '@/contexts/AuthContext';

export function AppRoutes() {
  const { user } = useAuth();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) return <Navigate to="/login" />;
    return <>{children}</>;
  };

  const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) return <Navigate to="/login" />;
    if (user.onboardingComplete) return <Navigate to="/dashboard" />;
    return <>{children}</>;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Onboarding routes */}
      <Route path="/auth/kyc" element={<OnboardingRoute><KYCVerification /></OnboardingRoute>} />
      <Route path="/auth/business-setup" element={<OnboardingRoute><BusinessSetup /></OnboardingRoute>} />
      <Route path="/auth/payment-setup" element={<OnboardingRoute><PaymentSetup /></OnboardingRoute>} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/gst" element={<GSTFiling />} />
        <Route path="/tds" element={<TDSManagement />} />
        <Route path="/income-tax" element={<IncomeTaxFiling />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}