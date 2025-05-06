// src/context/useUserManager.ts
import { useCallback, useEffect, useState } from 'react';
import { User } from '../types';
import * as userService from '../services/userService';
import { useUserManagerReturn } from '../types';

export const useUserManager = (): UseUserManagerReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // load user
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await userService.getUser();
        if (userData) {
          setUser(userData);
        } else {
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

  // login
  const login = useCallback(async (email: string, password: string) => {
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
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // register
  const register = useCallback(async (name: string, email: string, password: string) => {
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
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // logout
  const logout = useCallback(async () => {
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
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
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
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePreferences = useCallback(async (preferences: Partial<User['preferences']>) => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await userService.updateUserPreferences(preferences);
      if (success && user) {
        setUser({
          ...user,
          preferences: {
            ...user.preferences,
            ...preferences,
          },
        });
        return true;
      } else {
        setError('Failed to update preferences');
        return false;
      }
    } catch (err) {
      setError('Failed to update preferences');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
  };
};
