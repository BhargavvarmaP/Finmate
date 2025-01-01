import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (requireAuth && !token) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && token) {
    // If they're already logged in, redirect them to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
