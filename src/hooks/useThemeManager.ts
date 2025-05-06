import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../theme/themes';
import { AppTheme } from '../types';
import { UseThemeManagerReturn } from '../types/theme';

export const useThemeManager = (): UseThemeManagerReturn => {
  const deviceTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(deviceTheme === 'dark');

  // Load theme from storage
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const saved = await AsyncStorage.getItem('@theme_preference');
        if (saved !== null) {
          setIsDarkMode(saved === 'dark');
        }
      } catch (e) {
        console.error('Error loading theme preference', e);
      }
    };

    loadPreference();
  }, []);

  // Save theme to storage
  useEffect(() => {
    const savePreference = async () => {
      try {
        await AsyncStorage.setItem('@theme_preference', isDarkMode ? 'dark' : 'light');
      } catch (e) {
        console.error('Error saving theme preference', e);
      }
    };

    savePreference();
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return {
    theme: isDarkMode ? darkTheme : lightTheme,
    isDarkMode,
    toggleTheme,
    setDarkMode: setIsDarkMode,
  };
};
