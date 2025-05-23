import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { useHabits } from '../../context/HabitContext';
import { useNavigation } from '@react-navigation/native';

interface StatBoxProps {
  selectedDate: Date;
}

const StatBoxes = ({ selectedDate }: StatBoxProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const { getActiveHabitsByDate, getHabitLogsForDate } = useHabits();

  const activeHabits = getActiveHabitsByDate(selectedDate);
  const dailyLogs = getHabitLogsForDate(format(selectedDate, 'yyyy-MM-dd'));

  // total habits
  const totalHabits = activeHabits.length;

  // completed habits
  const completedHabits = dailyLogs.filter(log => log.completed).length;

  // completion rate
  const completionRate = completedHabits/totalHabits*100 || 0;

  return (
    <>
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statCard}
        >
          <Text style={styles.statTitle}>Total Habits</Text>
          <Text style={styles.statValue}>{totalHabits}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
        >
          <Text style={styles.statTitle}>Completed Habits</Text>
          <Text style={styles.statValue}>{completedHabits}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statCard}
        >
          <Text style={styles.statTitle}>Habit Progress</Text>
          <Text style={styles.statValue}>{completedHabits}/{totalHabits}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
        >
          <Text style={styles.statTitle}>Completion Rate</Text>
          <Text style={styles.statValue}>{Math.round(completionRate)}%</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

//styles
const createStyles = (theme: any) => StyleSheet.create({
     statsContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 16,
     },
     statCard: {
       flex: 1,
       backgroundColor: theme.colors.card,
       borderRadius: 12,
       padding: 12,
       marginHorizontal: 4,
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.1,
       shadowRadius: 3.84,
       elevation: 3,
     },
     statTitle: {
       fontSize: 14,
       color: theme.colors.secondaryText,
       marginBottom: 4,
     },
     statValue: {
       fontSize: 16,
       fontWeight: '600',
       color: theme.colors.text,
     },
     statArrow: {
       alignSelf: 'flex-end',
     },
   });

export default StatBoxes;