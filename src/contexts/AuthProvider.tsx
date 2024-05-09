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
  token: string | null;
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

  const handleLogin = async (cpf: string, password: string) => {
    setIsLoadingRequest(true);
    try {
      const { data } = await login(cpf, password);
      const { access } = data;

      setAuthorization(access);
      handleSetUser(null);
      localStorage.setItem(tokenLocalStorageKey, access);

      navigate(location.state?.from?.pathname || '/home');
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

  const token = localStorage.getItem(tokenLocalStorageKey);
  const contextValue = {
    user,
    token,
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
