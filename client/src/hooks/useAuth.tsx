import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'gym_owner' | 'client';
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('auth-user');
    return stored ? JSON.parse(stored) : null;
  });
  
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('auth-token');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth-user');
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('auth-token', accessToken);
    } else {
      localStorage.removeItem('auth-token');
    }
  }, [accessToken]);

  const setAuth = (newUser: User, newToken: string) => {
    setUser(newUser);
    setAccessToken(newToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  const isAuthenticated = !!user && !!accessToken;

  return (
    <AuthContext.Provider value={{ user, accessToken, setAuth, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'gym_owner' | 'client';
};

type AuthResponse = {
  user: User;
  accessToken: string;
};

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (data) => {
      const res = await apiRequest('POST', '/api/auth/login', data);
      return res.json();
    },
  });
}

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: async (data) => {
      const res = await apiRequest('POST', '/api/auth/register', data);
      return res.json();
    },
  });
}
