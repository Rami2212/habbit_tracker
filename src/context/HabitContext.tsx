// src/context/HabitContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Habit, HabitLog } from '../types';
import * as habitService from '../services/habitService';
import { HabitContextType } from '../types';

const HabitContext = createContext<HabitContextType>({
  habits: [],
  habitLogs: [],
  isLoading: true,
  refreshHabits: async () => {},
  refreshLogs: async () => {},
  saveHabit: async () => false,
  deleteHabit: async () => false,
  archiveHabit: async () => false,
  toggleHabitCompletion: async () => false,
  saveHabitLog: async () => false,
  getActiveHabits: () => [],
  getArchivedHabits: () => [],
  getHabitById: () => undefined,
  getHabitLogsForDate: () => [],
  getHabitLogsForHabit: () => [],
});

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      await refreshHabits();
      await refreshLogs();
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshHabits = async (): Promise<void> => {
    const loadedHabits = await habitService.getHabits();
    setHabits(loadedHabits);
  };

  const refreshLogs = async (): Promise<void> => {
    const loadedLogs = await habitService.getHabitLogs();
    setHabitLogs(loadedLogs);
  };

  const saveHabitData = async (habit: Habit): Promise<boolean> => {
    const success = await habitService.saveHabit(habit);
    if (success) {
      await refreshHabits();
    }
    return success;
  };

  const deleteHabitData = async (habitId: string): Promise<boolean> => {
    const success = await habitService.deleteHabit(habitId);
    if (success) {
      await refreshHabits();
      await refreshLogs();
    }
    return success;
  };

  const archiveHabitData = async (habitId: string): Promise<boolean> => {
    const success = await habitService.archiveHabit(habitId);
    if (success) {
      await refreshHabits();
    }
    return success;
  };

  const toggleHabitCompletionData = async (habitId: string, date: string): Promise<boolean> => {
    const success = await habitService.toggleHabitCompletion(habitId, date);
    if (success) {
      await refreshLogs();
    }
    return success;
  };

  const saveHabitLogData = async (log: HabitLog): Promise<boolean> => {
    const success = await habitService.saveHabitLog(log);
    if (success) {
      await refreshLogs();
    }
    return success;
  };

  const getActiveHabits = (): Habit[] => {
    return habits.filter(habit => !habit.isArchived);
  };

  const getArchivedHabits = (): Habit[] => {
    return habits.filter(habit => habit.isArchived);
  };

  const getHabitById = (habitId: string): Habit | undefined => {
    return habits.find(habit => habit.id === habitId);
  };

  const getHabitLogsForDate = (date: string): HabitLog[] => {
    const dateStr = date.split('T')[0]; // Get just the date part
    return habitLogs.filter(log => log.date.startsWith(dateStr));
  };

  const getHabitLogsForHabit = (habitId: string): HabitLog[] => {
    return habitLogs.filter(log => log.habitId === habitId);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        habitLogs,
        isLoading,
        refreshHabits,
        refreshLogs,
        saveHabit: saveHabitData,
        deleteHabit: deleteHabitData,
        archiveHabit: archiveHabitData,
        toggleHabitCompletion: toggleHabitCompletionData,
        saveHabitLog: saveHabitLogData,
        getActiveHabits,
        getArchivedHabits,
        getHabitById,
        getHabitLogsForDate,
        getHabitLogsForHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);