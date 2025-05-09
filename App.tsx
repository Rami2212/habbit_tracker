// App.tsx
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { HabitProvider } from './src/context/HabitContext';
import { UserProvider } from './src/context/UserContext';
import SplashScreen from './src/screens/SplashScreen';
import Toast from 'react-native-toast-message';

const AppContent = () => {
  const { theme } = useTheme();

  // Custom theme for NavigationContainer
  const navigationTheme = {
    ...(theme.dark ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme.dark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.notification,
    },
  };

  return (
    <>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some loading time for splash screen
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <HabitProvider>
            <AppContent />
          </HabitProvider>
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;