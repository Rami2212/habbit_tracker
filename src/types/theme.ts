export type AppTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    lightGray: string;
    darkGray: string;
    inputBackground: string;
  };
}

export type ThemeContextType {
  theme: AppTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
}

export type UseThemeManagerReturn = {
  theme: AppTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
};