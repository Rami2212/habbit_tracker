import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import { WeekCalendarProps } from '../../types';

const WeekCalendar = ({
  onDateSelect,
  selectedDate,
}: WeekCalendarProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  // initialize week days
  useEffect(() => {
    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startWeek, i));
    }
    setWeekDays(days);
  }, []);

  // handle delete
  const handleDatePress = (date: Date) => {
    onDateSelect(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekContainer}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDatePress(day)}
            style={styles.dayContainer}
          >
            <Text style={styles.dayName}>{format(day, 'EEE').toUpperCase()}</Text>
            <View style={[
              styles.dayCircle,
              isSameDay(day, selectedDate) && styles.selectedDay,
              isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && styles.todayCircle
            ]}>
              <Text style={[
                styles.dayNumber,
                isSameDay(day, selectedDate) && styles.selectedDayText
              ]}>
                {format(day, 'd')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

//styles
const createStyles = (theme: any) => StyleSheet.create({
     container: {
       marginBottom: 20,
     },
     weekContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 8,
     },
     dayContainer: {
       alignItems: 'center',
       width: 40,
     },
     dayName: {
       fontSize: 12,
       color: theme.colors.secondaryText,
       marginBottom: 4,
     },
     dayNumber: {
       fontSize: 14,
       fontWeight: '500',
       color: theme.colors.text,
     },
     dayCircle: {
       width: 36,
       height: 36,
       borderRadius: 18,
       justifyContent: 'center',
       alignItems: 'center',
     },
     selectedDay: {
       backgroundColor: theme.colors.primary,
       borderRadius: 18,
     },
     selectedDayText: {
       color: 'white',
       fontWeight: 'bold',
     },
     todayCircle: {
       borderWidth: 1,
       borderColor: theme.colors.primary,
     }
   });

export default WeekCalendar;