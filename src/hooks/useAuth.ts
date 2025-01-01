import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = !!token && !!user;
  let isTokenExpired = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      isTokenExpired = !!(decoded.exp && decoded.exp < now);
    } catch (error) {
      isTokenExpired = true;
    }
  }

  return {
    user,
    token,
    isAuthenticated: isAuthenticated && !isTokenExpired
  };
}
