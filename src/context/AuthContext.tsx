'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// This is a dummy user object. In a real app, this would be fetched from an API or Firebase Auth.
interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for a logged-in user
    const checkUser = async () => {
      // In a real app, you'd verify a token here.
      const storedUser = localStorage.getItem('crimson-stream-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email: string, pass: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    if (pass === 'password') {
       const userData = { email };
       setUser(userData);
       localStorage.setItem('crimson-stream-user', JSON.stringify(userData));
    } else {
        throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, pass: string) => {
     // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const userData = { email };
    setUser(userData);
    localStorage.setItem('crimson-stream-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crimson-stream-user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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
