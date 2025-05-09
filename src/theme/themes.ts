import { colors } from './colors';
import { AppTheme } from '../types/theme';

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.lightBackground,
    card: colors.lightCard,
    text: colors.lightText,
    secondaryText: colors.lightText,
    border: colors.lightBorder,
    notification: colors.danger,
    secondary: colors.secondary,
    success: colors.success,
    danger: colors.danger,
    warning: colors.warning,
    info: colors.info,
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    inputBackground: colors.lightInputBackground,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: 'normal' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    light: { fontFamily: 'System', fontWeight: '300' },
    thin: { fontFamily: 'System', fontWeight: '100' },
  }
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.darkBackground,
    card: colors.darkCard,
    text: colors.darkText,
    secondaryText: colors.darkText,
    border: colors.darkBorder,
    notification: colors.danger,
    secondary: colors.secondary,
    success: colors.success,
    danger: colors.danger,
    warning: colors.warning,
    info: colors.info,
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    inputBackground: colors.darkInputBackground,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: 'normal' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    light: { fontFamily: 'System', fontWeight: '300' },
    thin: { fontFamily: 'System', fontWeight: '100' },
  }
};