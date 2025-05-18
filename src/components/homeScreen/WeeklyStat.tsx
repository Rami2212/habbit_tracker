import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { useHabits } from '../../context/HabitContext';

const WeeklyStat = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { getActiveHabits, getHabitLogsForDate } = useHabits();
  const [weeklyStats, setWeeklyStats] = useState<{ day: string; completion: number }[]>([]);
  const [averageCompletion, setAverageCompletion] = useState(0);

  // initialize week days
  const weekDays = useMemo(() => {
    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startWeek, i));
    }
    return days;
  }, []);

  useEffect(() => {
    // get active habits
    const activeHabits = getActiveHabits();

    // calculate weekly stats
    const stats = weekDays.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayLogs = getHabitLogsForDate(dateStr);
      const completedLogs = dayLogs.filter(log => log.completed).length;

      return {
        day: format(day, 'E').charAt(0),
        completion: activeHabits.length > 0
          ? (completedLogs / activeHabits.length) * 100
          : 0
      };
    });

    setWeeklyStats(stats);

    // calculate average completion
    const avg = stats.reduce((acc, stat) => acc + stat.completion, 0) / 7;
    setAverageCompletion(Math.round(avg));

  }, [weekDays, getActiveHabits, getHabitLogsForDate]);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        {averageCompletion}% Avg. completion rate
      </Text>

      <View style={styles.chartContainer}>
        {weeklyStats.map((stat, index) => (
          <View key={index} style={styles.barContainer}>
            {stat.completion > 0 ? (
              <View
                style={[
                  styles.bar,
                  { height: Math.max(stat.completion, 5) }
                ]}
              />
            ) : (
              <View style={styles.emptyBar} />
            )}
            <Text style={styles.barLabel}>{stat.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

//styles
const createStyles = (theme: any) => StyleSheet.create({
     card: {
       backgroundColor: theme.colors.card,
       borderRadius: 16,
       padding: 16,
       marginBottom: 16,
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.1,
       shadowRadius: 3.84,
       elevation: 5,
     },
     sectionTitle: {
       fontSize: 18,
       fontWeight: '600',
       color: theme.colors.text,
       marginBottom: 12,
     },
     chartContainer: {
       height: 150,
       marginBottom: 8,
       flexDirection: 'row',
       alignItems: 'flex-end',
       justifyContent: 'space-between',
     },
     barContainer: {
       alignItems: 'center',
       flex: 1,
     },
     bar: {
       width: 24,
       borderRadius: 12,
       backgroundColor: theme.colors.primary,
       marginBottom: 8,
     },
     barLabel: {
       fontSize: 12,
       color: theme.colors.secondaryText,
     },
     emptyBar: {
       width: 24,
       height: 5,
       borderRadius: 12,
       backgroundColor: theme.colors.border,
       marginBottom: 8,
     }
   });

export default WeeklyStat;