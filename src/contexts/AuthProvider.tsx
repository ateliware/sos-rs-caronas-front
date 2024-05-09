import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from '../@types/Location';
import { User } from 'interfaces/User';
import { ApiResponse } from '@services/api';
import { login, sendEmailRecover, setAuthorization } from '@services/api/auth';

export type TAuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  isLoadingRequest?: boolean;
  login: (cpf: string, password: string) => Promise<void | ApiResponse>;
  recover: (cpf: string) => Promise<void | ApiResponse>;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location: LocationState = useLocation();

  const userLocalStorageKey = 'user';
  const tokenLocalStorageKey = 'token';

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoadingRequest(true);
    try {
      const { data } = await login(email, password);
      const { user, token } = data;

      if (user) {
        setAuthorization(token);
        handleSetUser(user);
        localStorage.setItem(tokenLocalStorageKey, token);

        navigate(location.state?.from?.pathname || '/');
      }
      setIsLoadingRequest(false);
    } catch (error) {
      setIsLoadingRequest(false);
      throw error;
    }
  };

  const handleLogout = useCallback(() => {
    setUser(null);
    setAuthorization(null);
    localStorage.removeItem(userLocalStorageKey);
    localStorage.removeItem(tokenLocalStorageKey);
    navigate('/login');
  }, [navigate]);

  const handleSendEmailRecover = async (email: string) => {
    setIsLoadingRequest(true);

    await sendEmailRecover(email);

    setIsLoadingRequest(false);
    navigate(`/email_sent?email=${email}`);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(userLocalStorageKey);
    const storedToken = localStorage.getItem(tokenLocalStorageKey);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAuthorization(storedToken);
    }

    setLoading(false);

    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, [handleLogout]);

  const handleSetUser = (user: User | null) => {
    setUser(user);
    localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
  };

  const contextValue = {
    user,
    setUser: handleSetUser,
    loading,
    isLoadingRequest,
    login: handleLogin,
    logout: handleLogout,
    recover: handleSendEmailRecover,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
}
