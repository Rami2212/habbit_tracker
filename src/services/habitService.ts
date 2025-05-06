// src/services/habitService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitLog } from '../types';

const HABITS_STORAGE_KEY = '@habits';
const HABIT_LOGS_STORAGE_KEY = '@habitLogs';

// Habit CRUD operations
export const getHabits = async (): Promise<Habit[]> => {
  try {
    const habitsJson = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    return habitsJson ? JSON.parse(habitsJson) : [];
  } catch (error) {
    console.error('Error getting habits:', error);
    return [];
  }
};

export const saveHabit = async (habit: Habit): Promise<boolean> => {
  try {
    const habits = await getHabits();
    const existingIndex = habits.findIndex(h => h.id === habit.id);

    if (existingIndex >= 0) {
      habits[existingIndex] = habit;
    } else {
      habits.push(habit);
    }

    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
    return true;
  } catch (error) {
    console.error('Error saving habit:', error);
    return false;
  }
};

export const deleteHabit = async (habitId: string): Promise<boolean> => {
  try {
    const habits = await getHabits();
    const filteredHabits = habits.filter(habit => habit.id !== habitId);
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(filteredHabits));

    // Also delete all logs for this habit
    const logs = await getHabitLogs();
    const filteredLogs = logs.filter(log => log.habitId !== habitId);
    await AsyncStorage.setItem(HABIT_LOGS_STORAGE_KEY, JSON.stringify(filteredLogs));

    return true;
  } catch (error) {
    console.error('Error deleting habit:', error);
    return false;
  }
};

export const archiveHabit = async (habitId: string): Promise<boolean> => {
  try {
    const habits = await getHabits();
    const updatedHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, isArchived: true } : habit
    );
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
    return true;
  } catch (error) {
    console.error('Error archiving habit:', error);
    return false;
  }
};

// Habit Logs CRUD operations
export const getHabitLogs = async (): Promise<HabitLog[]> => {
  try {
    const logsJson = await AsyncStorage.getItem(HABIT_LOGS_STORAGE_KEY);
    return logsJson ? JSON.parse(logsJson) : [];
  } catch (error) {
    console.error('Error getting habit logs:', error);
    return [];
  }
};

export const getHabitLogsForDate = async (date: string): Promise<HabitLog[]> => {
  try {
    const logs = await getHabitLogs();
    return logs.filter(log => log.date.startsWith(date.split('T')[0]));
  } catch (error) {
    console.error('Error getting habit logs for date:', error);
    return [];
  }
};

export const getHabitLogsForHabit = async (habitId: string): Promise<HabitLog[]> => {
  try {
    const logs = await getHabitLogs();
    return logs.filter(log => log.habitId === habitId);
  } catch (error) {
    console.error('Error getting habit logs for habit:', error);
    return [];
  }
};

export const saveHabitLog = async (log: HabitLog): Promise<boolean> => {
  try {
    const logs = await getHabitLogs();
    const existingIndex = logs.findIndex(l => l.id === log.id);

    if (existingIndex >= 0) {
      logs[existingIndex] = log;
    } else {
      logs.push(log);
    }

    await AsyncStorage.setItem(HABIT_LOGS_STORAGE_KEY, JSON.stringify(logs));
    return true;
  } catch (error) {
    console.error('Error saving habit log:', error);
    return false;
  }
};

export const toggleHabitCompletion = async (habitId: string, date: string): Promise<boolean> => {
  try {
    const logs = await getHabitLogs();
    const dateStr = date.split('T')[0]; // Get just the date part

    // Check if there's an existing log for this habit and date
    const existingLogIndex = logs.findIndex(
      log => log.habitId === habitId && log.date.startsWith(dateStr)
    );

    if (existingLogIndex >= 0) {
      // Toggle the completion status
      logs[existingLogIndex].completed = !logs[existingLogIndex].completed;
    } else {
      // Create a new log with completed=true
      logs.push({
        id: `${habitId}_${dateStr}_${Date.now()}`,
        habitId,
        date: dateStr,
        completed: true
      });
    }

    await AsyncStorage.setItem(HABIT_LOGS_STORAGE_KEY, JSON.stringify(logs));
    return true;
  } catch (error) {
    console.error('Error toggling habit completion:', error);
    return false;
  }
};

// Stats and Analytics
export const getHabitStats = async (habitId: string, days: number = 30): Promise<{
  completionRate: number;
  streak: number;
  total: number;
}> => {
  try {
    const logs = await getHabitLogsForHabit(habitId);
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - days);

    // Filter logs for the specified time period
    const recentLogs = logs.filter(log => new Date(log.date) >= startDate);

    // Calculate total completions
    const totalCompletions = recentLogs.filter(log => log.completed).length;

    // Calculate completion rate
    const completionRate = days > 0 ? (totalCompletions / days) * 100 : 0;

    // Calculate current streak
    let streak = 0;
    const dateMap = new Map<string, boolean>();

    // Create a map of dates and completion status
    recentLogs.forEach(log => {
      const dateKey = log.date.split('T')[0];
      dateMap.set(dateKey, log.completed);
    });

    // Calculate streak
    for (let i = 0; i < days; i++) {
      const checkDate = new Date();
      checkDate.setDate(now.getDate() - i);
      const dateKey = checkDate.toISOString().split('T')[0];

      if (dateMap.get(dateKey)) {
        streak++;
      } else {
        break;
      }
    }

    return {
      completionRate,
      streak,
      total: totalCompletions
    };
  } catch (error) {
    console.error('Error getting habit stats:', error);
    return { completionRate: 0, streak: 0, total: 0 };
  }
};

