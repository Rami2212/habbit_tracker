import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import { Routes } from '../../navigation/routes';
import { UserContext } from '../../context/UserContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { login, error, clearError } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // errors handling
  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  // login
  const handleLogin = async () => {
    if (!email.trim()) {
      setLoginError('Please enter your email');
      return;
    }

    if (!password.trim()) {
      setLoginError('Please enter your password');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate(Routes.REGISTER as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          {/* logo & app name */}
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Habitly</Text>
          <Text style={styles.appDescription}>
            Build better habits, achieve your goals
          </Text>
        </View>

        <View style={styles.form}>
          {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

          {/* email */}
          <AppTextInput
            label="Email"
            placeholder="your.email@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setLoginError('');
            }}
          />

          {/* password */}
          <AppTextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setLoginError('');
            }}
          />

          <View style={{ height: 16 }} />

          {/* login button */}
          <AppButton
            title="Log In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            icon='home'
          />
        </View>

        {/* register button */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// styles
const createStyles = (theme: any) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 16,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 8,
    },
    appDescription: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
    },
    form: {
      marginBottom: 24,
    },
    errorText: {
      color: theme.colors.danger,
      textAlign: 'center',
      marginBottom: 16,
    },
    forgotPassword: {
      color: theme.colors.primary,
      textAlign: 'right',
      marginTop: 8,
      marginBottom: 24,
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 4,
    },
    registerText: {
      color: theme.colors.text,
    },
    registerLink: {
      color: theme.colors.primary,
      fontWeight: '600',
      marginLeft: 4,
    },
  });

export default LoginScreen;