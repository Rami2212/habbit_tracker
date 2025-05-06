// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import * as userService from '../services/userService';
import { UserContextType } from '../types';

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: async () => false,
  updateProfile: async () => false,
  updatePreferences: async () => false,
});

// Create the provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const userData = await userService.getUser();

        if (userData) {
          setUser(userData);
        } else {
          // For demo purposes, create a default user if none exists
          // In a real app, you'd redirect to login
          const defaultUser = await userService.createDefaultUser();
          setUser(defaultUser);
        }
      } catch (err) {
        setError('Failed to load user');
        console.error('Error loading user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await userService.loginUser(email, password);

      if (userData) {
        setUser(userData);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      setError('Login failed');
      console.error('Error during login:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await userService.registerUser(name, email, password);

      if (userData) {
        setUser(userData);
        return true;
      } else {
        setError('Registration failed');
        return false;
      }
    } catch (err) {
      setError('Registration failed');
      console.error('Error during registration:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const success = await userService.logoutUser();

      if (success) {
        setUser(null);
        return true;
      } else {
        setError('Logout failed');
        return false;
      }
    } catch (err) {
      setError('Logout failed');
      console.error('Error during logout:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedUser = await userService.updateUserProfile(updates);

      if (updatedUser) {
        setUser(updatedUser);
        return true;
      } else {
        setError('Failed to update profile');
        return false;
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update preferences function
  const updatePreferences = useCallback(async (preferences: Partial<User['preferences']>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const success = await userService.updateUserPreferences(preferences);

      if (success && user) {
        // Update the local user state
        setUser({
          ...user,
          preferences: {
            ...user.preferences,
            ...preferences
          }
        });
        return true;
      } else {
        setError('Failed to update preferences');
        return false;
      }
    } catch (err) {
      setError('Failed to update preferences');
      console.error('Error updating preferences:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const contextValue: UserContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};