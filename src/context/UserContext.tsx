import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  updateUserPreferences
} from '../services/userService';
import { User, UserContextType } from '../types';

// default values
export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {
    throw new Error('UserContext not initialized');
  },
  logout: async () => {
    throw new Error('UserContext not initialized');
  },
  register: async () => {
    throw new Error('UserContext not initialized');
  },
  updateProfile: async () => {
    throw new Error('UserContext not initialized');
  },
  updatePreferences: async () => {
    throw new Error('UserContext not initialized');
  },
  clearError: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // load user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error('Error loading user from storage:', err);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // login
  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // logout
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // register
  const register = async (name: string, email: string, password: string): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const newUser = await registerUser(name, email, password);
      setUser(newUser);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // update profile
  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUserProfile(updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // update preferences
  const updatePreferences = async (preferences: Partial<User['preferences']>): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUserPreferences(preferences);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Preferences update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const contextValue: UserContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    updateProfile,
    updatePreferences,
    clearError,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};