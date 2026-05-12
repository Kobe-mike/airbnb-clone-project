import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import { tokenStorage } from '../services/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => tokenStorage.get());

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = tokenStorage.get();
      if (savedToken) {
        try {
          setToken(savedToken);
          const response = await authService.getProfile();
          setUser(response.data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          tokenStorage.clear();
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const { token, user } = response.data;
    tokenStorage.set(token);
    setToken(token);
    setUser(user);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password);
    const { token, user } = response.data;
    tokenStorage.set(token);
    setToken(token);
    setUser(user);
    return response.data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
