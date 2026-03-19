import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { authenticateWithGoogle, logoutFromBackend, type AuthUser } from '@/services/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGoogleSuccess = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: authUser, token: authToken } = await authenticateWithGoogle(code);
      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_KEY, JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (response) => onGoogleSuccess(response.code),
    onError: (err) => setError(err.error_description ?? 'Google sign-in failed'),
  });

  const loginWithGoogle = useCallback(() => {
    if (import.meta.env.VITE_MOCK_AUTH === 'true') {
      onGoogleSuccess('mock-code');
    } else {
      googleLogin();
    }
  }, [googleLogin, onGoogleSuccess]);

  const logout = useCallback(async () => {
    if (token) {
      await logoutFromBackend(token).catch(() => undefined);
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
