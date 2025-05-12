import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Routes } from './routes';
import { MainTabParamList } from '../types';

// screens
import HomeScreen from '../screens/HomeScreen';
import HabitsScreen from '../screens/HabitsScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
              iconName = 'add';
              break;
            case Routes.CALENDAR:
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case Routes.SETTINGS:
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          if (route.name === Routes.ADD_HABIT) {
            return (
              <View style={styles.addButton}>
                <Icon
                  name={iconName}
                  size={35}
                  color="#FFFFFF"
                />
              </View>
            );
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.darkGray,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={Routes.HABITS}
        component={HabitsScreen}
        options={{ tabBarLabel: 'Habits' }}
      />
      <Tab.Screen
        name={Routes.ADD_HABIT}
        component={AddHabitScreen}
        options={{
            tabBarLabel: '',
            tabBarButton: (props) => (
              <TouchableWithoutFeedback {...props}>
                <View style={styles.addButton}>
                  <Icon name="add" size={35} color="#FFFFFF" />
                </View>
              </TouchableWithoutFeedback>
            ),
          }}
      />
      <Tab.Screen
        name={Routes.CALENDAR}
        component={CalendarScreen}
        options={{ tabBarLabel: 'Calendar' }}
      />
      <Tab.Screen
        name={Routes.SETTINGS}
        component={SettingsScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// styles
const createStyles = (theme: any) => StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.card,
    borderTopColor: theme.colors.border,
    height: 70,
    elevation: 5,
    borderTopWidth: 2,
  },
  tabLabel: {
    fontSize: 12,
  },
  tabItem: {
    paddingVertical: 5,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 40,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: "#FFFFFF",
    top: -28,
  },
});

export default MainNavigator;