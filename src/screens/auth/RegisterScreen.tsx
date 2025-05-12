import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import AppTextInput from '../../components/common/AppTextInput';
import AppButton from '../../components/common/AppButton';
import Header from '../../components/common/Header';
import { Routes } from '../../navigation/routes';
import { UserContext } from '../../context/UserContext';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { register } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // register
  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newUser = await register(name, email, password);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate(Routes.LOGIN as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Create Account" showBackButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Create an account to start tracking your habits.
          </Text>

          <View style={styles.form}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* name */}
            <AppTextInput
              label="Full Name"
              placeholder="Enter your name"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

            {/* email */}
            <AppTextInput
              label="Email"
              placeholder="your.email@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* password */}
            <AppTextInput
              label="Password"
              placeholder="Create a password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* confirm password */}
            <AppTextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* register button */}
            <AppButton
              title="Sign Up"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={{ marginTop: 16 }}
              icon="home"
            />
          </View>

          {/* login button */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
     },
     title: {
       fontSize: 28,
       fontWeight: 'bold',
       color: theme.colors.text,
       marginBottom: 8,
     },
     subtitle: {
       fontSize: 16,
       color: theme.colors.darkGray,
       marginBottom: 32,
     },
     form: {
       marginBottom: 24,
     },
     errorText: {
       color: theme.colors.danger,
       textAlign: 'center',
       marginBottom: 16,
     },
     loginContainer: {
       flexDirection: 'row',
       justifyContent: 'center',
       marginTop: 24,
     },
     loginText: {
       color: theme.colors.text,
     },
     loginLink: {
       color: theme.colors.primary,
       fontWeight: '600',
       marginLeft: 4,
     },
   });

export default RegisterScreen;