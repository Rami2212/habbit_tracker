import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USER_KEY = '@app_user';

// Get user
export const getUser = async (): Promise<User | null> => {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
};

// Register
export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    preferences: {
      theme: 'light',
    },
  };

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
};

// Login
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const json = await AsyncStorage.getItem(USER_KEY);
  if (!json) return null;

  const user: User = JSON.parse(json);
  if (user.email === email && user.password === password) {
    return user;
  }

  return null;
};

// Logout
export const logoutUser = async (): Promise<boolean> => {
  await AsyncStorage.removeItem(USER_KEY);
  return true;
};

// Update user
export const updateUserProfile = async (updates: Partial<User>): Promise<User | null> => {
  const json = await AsyncStorage.getItem(USER_KEY);
  if (!json) return null;

  const currentUser: User = JSON.parse(json);
  const updatedUser = { ...currentUser, ...updates };
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};

// Update user preferences
export const updateUserPreferences = async (preferences: Partial<User['preferences']>): Promise<boolean> => {
  const json = await AsyncStorage.getItem(USER_KEY);
  if (!json) return false;

  const user: User = JSON.parse(json);
  const updatedUser: User = {
    ...user,
    preferences: {
      ...user.preferences,
      ...preferences,
    },
  };

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return true;
};
