import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout';

// Pages
import { Home } from '@/pages/Home';
import { Dashboard } from '@/pages/Dashboard';
import { Settings } from '@/pages/Settings';
import { NotFound } from '@/pages/NotFound';

// Auth Pages
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { BusinessSetup } from '@/pages/auth/BusinessSetup';
import { KYCVerification } from '@/pages/auth/KYCVerification';
import { PaymentSetup } from '@/pages/auth/PaymentSetup';

// Financial Pages
import { GSTFiling } from '@/pages/financial/GSTFiling';
import { TDSManagement } from '@/pages/financial/TDSManagement';
import { IncomeTaxFiling } from '@/pages/financial/IncomeTaxFiling';
import { PayrollManagement } from '@/pages/financial/PayrollManagement';
import { MultiCurrency } from '@/pages/financial/MultiCurrency';

// Compliance Pages
import { ComplianceMonitoring } from '@/pages/compliance/ComplianceMonitoring';
import { AuditAnalytics } from '@/pages/compliance/AuditAnalytics';
import { FinancialReporting } from '@/pages/compliance/FinancialReporting';
import { XBRLFiling } from '@/pages/compliance/XBRLFiling';

// Document Pages
import { DocumentStorage } from '@/pages/documents/DocumentStorage';

// Marketing Pages
import { AboutUs } from '@/pages/marketing/AboutUs';
import { Features } from '@/pages/marketing/Features';
import { Pricing } from '@/pages/marketing/Pricing';
import { Blog } from '@/pages/marketing/Blog';
import { CaseStudies } from '@/pages/marketing/CaseStudies';
import { Testimonials } from '@/pages/marketing/Testimonials';

// API Pages
import { APIOverview } from '@/pages/api/Overview';
import { APIReference } from '@/pages/api/Reference';
import { Integration } from '@/pages/api/Integration';

// Additional Features
import { Events } from '@/pages/events/Events';
import { Partners } from '@/pages/partners/Partners';
import { Feedback } from '@/pages/feedback/Feedback';

// Support Pages
import { HelpCenter } from '@/pages/support/HelpCenter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'business-setup',
            element: <BusinessSetup />,
          },
          {
            path: 'kyc-verification',
            element: <KYCVerification />,
          },
          {
            path: 'payment-setup',
            element: <PaymentSetup />,
          },
        ],
      },
      {
        path: 'app',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'financial',
            children: [
              {
                path: 'gst',
                element: <GSTFiling />,
              },
              {
                path: 'tds',
                element: <TDSManagement />,
              },
              {
                path: 'income-tax',
                element: <IncomeTaxFiling />,
              },
              {
                path: 'payroll',
                element: <PayrollManagement />,
              },
              {
                path: 'multi-currency',
                element: <MultiCurrency />,
              },
            ],
          },
          {
            path: 'compliance',
            children: [
              {
                path: 'monitoring',
                element: <ComplianceMonitoring />,
              },
              {
                path: 'audit',
                element: <AuditAnalytics />,
              },
              {
                path: 'reporting',
                element: <FinancialReporting />,
              },
              {
                path: 'xbrl',
                element: <XBRLFiling />,
              },
            ],
          },
          {
            path: 'documents',
            element: <DocumentStorage />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
      {
        path: 'marketing',
        children: [
          {
            path: 'about',
            element: <AboutUs />,
          },
          {
            path: 'features',
            element: <Features />,
          },
          {
            path: 'pricing',
            element: <Pricing />,
          },
          {
            path: 'blog',
            element: <Blog />,
          },
          {
            path: 'case-studies',
            element: <CaseStudies />,
          },
          {
            path: 'testimonials',
            element: <Testimonials />,
          },
        ],
      },
      {
        path: 'api',
        children: [
          {
            path: 'overview',
            element: <APIOverview />,
          },
          {
            path: 'reference',
            element: <APIReference />,
          },
          {
            path: 'integration',
            element: <Integration />,
          },
        ],
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'partners',
        element: <Partners />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: 'help',
        element: <HelpCenter />,
      },
    ],
  },
]);