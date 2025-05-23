import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths
} from 'date-fns';
import { useTheme } from '../context/ThemeContext';

interface MonthCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

const MonthCalendar = ({
  onDateSelect,
  selectedDate,
}: MonthCalendarProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [monthDays, setMonthDays] = useState<Date[]>([]);

  // Day names for header
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Generate calendar days for current month
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    setMonthDays(days);
  }, [currentMonth]);

  // Handle date selection
  const handleDatePress = (date: Date) => {
    onDateSelect(date);
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Render calendar in weekly rows
  const renderWeeks = () => {
    const weeks = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      const week = monthDays.slice(i, i + 7);
      weeks.push(
        <View key={i} style={styles.weekRow}>
          {week.map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDatePress(day)}
              style={styles.dayContainer}
            >
              <View style={[
                styles.dayCircle,
                isSameDay(day, selectedDate) && styles.selectedDay,
                isSameDay(day, new Date()) && !isSameDay(day, selectedDate) && styles.todayCircle
              ]}>
                <Text style={[
                  styles.dayNumber,
                  !isSameMonth(day, currentMonth) && styles.outsideMonth,
                  isSameDay(day, selectedDate) && styles.selectedDayText
                ]}>
                  {format(day, 'd')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return weeks;
  };

  return (
    <View style={styles.container}>
      {/* Month Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day Names Header */}
      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName, index) => (
          <View key={index} style={styles.dayNameContainer}>
            <Text style={styles.dayName}>{dayName}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {renderWeeks()}
      </View>
    </View>
  );
};

// Styles
const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  navButton: {
    padding: 8,
    borderRadius: 4,
  },
  navButtonText: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dayNameContainer: {
    width: 40,
    alignItems: 'center',
  },
  dayName: {
    fontSize: 12,
    color: theme.colors.secondaryText,
    fontWeight: '500',
  },
  calendarGrid: {
    paddingHorizontal: 4,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayContainer: {
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
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
  },
  outsideMonth: {
    color: theme.colors.secondaryText,
    opacity: 0.4,
  },
});

export default MonthCalendar;