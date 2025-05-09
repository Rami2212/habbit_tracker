// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { Routes } from './routes';
import { MainTabParamList } from '../types';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import HabitsScreen from '../screens/HabitsScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditHabitScreen from '../screens/EditHabitScreen';
import HabitDetailScreen from '../screens/HabitDetailScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator();

// Stack navigator for screens that need to be on top of the tab navigator
const HabitsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Routes.HABITS} component={HabitsScreen} />
    <Stack.Screen name={Routes.EDIT_HABIT} component={EditHabitScreen} />
    <Stack.Screen name={Routes.HABIT_DETAIL} component={HabitDetailScreen} />
  </Stack.Navigator>
);

const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case Routes.HOME:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case Routes.HABITS:
              iconName = focused ? 'list' : 'list-outline';
              break;
            case Routes.ADD_HABIT:
              iconName = 'add-circle';
              size = 40;
              break;
            case Routes.CALENDAR:
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case Routes.SETTINGS:
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.darkGray,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 75,
          paddingBottom: 12,
          paddingTop: 4,
        },

        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      <Tab.Screen
        name={Routes.HABITS}
        component={HabitsStack}
        options={{ tabBarLabel: 'Habits' }}
      />
      <Tab.Screen
        name={Routes.ADD_HABIT}
        component={AddHabitScreen}
        options={{
          tabBarLabel: '',
          tabBarItemStyle: {
            height: 60,
          },
        }}
      />
      <Tab.Screen name={Routes.CALENDAR} component={CalendarScreen} />
      <Tab.Screen name={Routes.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;