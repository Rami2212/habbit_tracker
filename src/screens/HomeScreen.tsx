import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { format } from 'date-fns';
import { useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

// components
import WeekCalendar from '../components/homeScreen/WeekCalendar';
import DailyGoalCard from '../components/homeScreen/DailyGoalCard';
import WeeklyStat from '../components/homeScreen/WeeklyStat';
import StatBoxes from '../components/homeScreen/StatBoxes';
import FloatingActionButton from '../components/common/FloatingActionButton';

const HomeScreen = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useContext(UserContext);

  // date handling
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    greeting: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: 8,
      marginBottom: 24,
    },
    date: {
      fontSize: 14,
      color: theme.colors.secondaryText,
      marginTop: 40,
    },
    spacer: {
      height: 80,
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.date}>{format(new Date(), 'MMMM d, yyyy').toUpperCase()}</Text>
        <Text style={styles.greeting}>Hi, {user?.name}</Text>

        {/* week calendar */}
        <WeekCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* daily habit card */}
        <DailyGoalCard selectedDate={selectedDate} />

        {/* weekly Progress */}
        <WeeklyStat />

        {/* stats Boxes */}
        <StatBoxes selectedDate={selectedDate} />

        <View style={styles.spacer} />
      </ScrollView>

      {/* FAB */}
      <FloatingActionButton />
    </SafeAreaView>
  );
};

export default HomeScreen;