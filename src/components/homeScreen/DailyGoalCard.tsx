import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { format } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { useHabits } from '../../context/HabitContext';

interface DailyGoalCardProps {
  selectedDate: Date;
}

const DailyGoalCard = ({ selectedDate }: DailyGoalCardProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { getActiveHabits, getHabitLogsForDate } = useHabits();

  const activeHabits = getActiveHabits();
  const dailyLogs = getHabitLogsForDate(format(selectedDate, 'yyyy-MM-dd'));

  // calculate completion rates
  const completionRate = activeHabits.length > 0
    ? (dailyLogs.filter(log => log.completed).length / activeHabits.length) * 100
    : 0;

  // total habits
  const totalHabits = activeHabits.length;
  const completedToday = dailyLogs.filter(log => log.completed).length;

  // generate motivational message based on completion
  const getMotivationalMessage = () => {
    if (completionRate >= 100) return "All done! Amazing job today!";
    if (completionRate >= 75) return "Almost there! Goals in reach!";
    if (completionRate >= 50) return "Halfway there! Keep going!";
    if (completionRate >= 25) return "Good start! Keep up the momentum!";
    return "Let's get started on today's goals!";
  };

  return (
    <View style={styles.goalCard}>
      <View style={styles.progressCircle}>
        <Text style={styles.progressText}>{Math.round(completionRate)}%</Text>
      </View>
      <View style={styles.goalInfo}>
        <Text style={styles.goalTitle}>Daily Goals</Text>
        <Text style={styles.goalSubtitle}>
          {getMotivationalMessage()}
        </Text>
        <Text style={styles.goalSubtitle}>
          {completedToday}/{totalHabits} habits
        </Text>
      </View>
    </View>
  );
};

//styles
const createStyles = (theme: any) => StyleSheet.create({
  goalCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  goalSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default DailyGoalCard;