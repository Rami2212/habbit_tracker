import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = () => {

  const { theme } = useTheme();
  const styles = createStyle(theme);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>Habitly</Text>
        <Text style={styles.tagline}>Build better habits</Text>
      </View>
    </View>
  );
};

// styles
const createStyle = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "#FFFFFF",
    textAlign: 'center',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default SplashScreen;