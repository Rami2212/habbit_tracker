// src/context/UserContext.tsx
import React, { createContext } from 'react';
import { useUserManager, UseUserManagerReturn } from './useUserManager';

export const UserContext = createContext<UseUserManagerReturn>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: async () => false,
  updateProfile: async () => false,
  updatePreferences: async () => false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userManager = useUserManager();

  return (
    <UserContext.Provider value={userManager}>
      {children}
    </UserContext.Provider>
  );
};
