import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USER_KEY = '@app_user';
const AUTH_KEY = '@app_auth_state';

// get user
export const getUser = async (): Promise<User | null> => {
  try {
    // check if user is authenticated
    const isAuthenticated = await AsyncStorage.getItem(AUTH_KEY);
    if (isAuthenticated !== 'true') {
      return null;
    }

    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// register
export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  // check if user already exists
  const json = await AsyncStorage.getItem(USER_KEY);
  const existingUser = json ? JSON.parse(json) : null;

  if (existingUser && existingUser.email === email) {
    throw new Error('User with this email already exists');
  }

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
  await AsyncStorage.setItem(AUTH_KEY, 'true');
  return newUser;
};

// login
export const loginUser = async (email: string, password: string): Promise<User> => {
  const json = await AsyncStorage.getItem(USER_KEY);
  const user = json ? JSON.parse(json) : null;

  if (!user) {
    throw new Error('No user found. Please register first.');
  }

  if (user.email === email && user.password === password) {
    // Set auth state to true on successful login
    await AsyncStorage.setItem(AUTH_KEY, 'true');
    return user;
  }

  throw new Error('Invalid email or password');
};

// logout
export const logoutUser = async (): Promise<void> => {
  try {
    // Only remove authentication state, not the user data
    await AsyncStorage.removeItem(AUTH_KEY);
    await AsyncStorage.removeItem("@habits");
    await AsyncStorage.removeItem("@habitLogs");
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// update user
export const updateUserProfile = async (updates: Partial<User>): Promise<User> => {
  const currentUser = await getUser();
  if (!currentUser) {
    throw new Error('User not found');
  }

  const updatedUser = { ...currentUser, ...updates };
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};

// update user preferences
export const updateUserPreferences = async (preferences: Partial<User['preferences']>): Promise<User> => {
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser: User = {
    ...user,
    preferences: {
      ...user.preferences,
      ...preferences,
    },
  };

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};