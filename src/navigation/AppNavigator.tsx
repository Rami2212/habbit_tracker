// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { RootStackParamList } from '../types';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { UserContext } from '../context/UserContext';

// Create the root stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    // You could show a loading screen here
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name={Routes.MAIN} component={MainNavigator} />
      ) : (
        <Stack.Screen name={Routes.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;