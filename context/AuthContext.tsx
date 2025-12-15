import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  isAdmin: boolean;
  currentAddress: string;
  setCurrentAddress: (address: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("Tashkent, Amir Temur 1");

  useEffect(() => {
    // 1. Check Local Storage first
    const stored = localStorage.getItem('kfc_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }

    // 2. Check for Telegram WebApp Integration
    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand(); // Open full height
        tg.setHeaderColor('#ffffff'); // Match app theme
        tg.setBackgroundColor('#f8fafc'); // Match slate-50

        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser) {
            // Auto-login Telegram user
            // Since Telegram doesn't give phone number directly without request, 
            // we use a placeholder or ID-based mock phone for the session.
            const telegramPhone = `+998(TG)${tgUser.id}`;
            const displayName = `${tgUser.first_name} ${tgUser.last_name || ''}`.trim();
            
            const newUser: User = { 
                phone: telegramPhone, 
                name: displayName,
                telegramId: tgUser.id
            };
            
            setUser(newUser);
            localStorage.setItem('kfc_user', JSON.stringify(newUser));
        }
    }
  }, []);

  const login = (phone: string, name?: string) => {
    const newUser: User = { phone, name: name || 'KFC Fan' };
    setUser(newUser);
    localStorage.setItem('kfc_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kfc_user');
  };

  // Simple admin check mock (Supports both manual phone and Telegram ID mock)
  const isAdmin = user?.phone === '+998901234567' || user?.phone?.includes('(TG)123456789'); // Add your TG ID here for admin testing

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, currentAddress, setCurrentAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};