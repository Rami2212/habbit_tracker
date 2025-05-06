import React, { createContext, useContext } from 'react';
import { ThemeContextType } from '../types/theme';
import { useThemeManager } from '../hooks/useThemeManager';
import { lightTheme } from '../theme/themes';

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDarkMode: false,
  toggleTheme: () => {},
  setDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeData = useThemeManager();

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
};