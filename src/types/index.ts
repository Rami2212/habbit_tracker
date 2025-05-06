// Habit
export type HabitFrequency = 'daily' | 'weekly' | 'monthly';

export type Habit {
  id: string;
  title: string;
  description?: string;
  icon: string;
  frequency: HabitFrequency;
  color: string;
  reminder?: Date | null;
  createdAt: Date;
  isArchived: boolean;
}

export type HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  notes?: string;
}

export type HabitContextType {
  habits: Habit[];
  habitLogs: HabitLog[];
  isLoading: boolean;
  refreshHabits: () => Promise<void>;
  refreshLogs: () => Promise<void>;
  saveHabit: (habit: Habit) => Promise<boolean>;
  deleteHabit: (habitId: string) => Promise<boolean>;
  archiveHabit: (habitId: string) => Promise<boolean>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<boolean>;
  saveHabitLog: (log: HabitLog) => Promise<boolean>;
  getActiveHabits: () => Habit[];
  getArchivedHabits: () => Habit[];
  getHabitById: (habitId: string) => Habit | undefined;
  getHabitLogsForDate: (date: string) => HabitLog[];
  getHabitLogsForHabit: (habitId: string) => HabitLog[];
}


// User
export type User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    darkMode: boolean;
    reminderTime?: string;
  };
}

export type UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<boolean>;
}

export type UseUserManagerReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<boolean>;
}




export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  AddHabit: undefined;
  EditHabit: { habitId: string };
  HabitDetail: { habitId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Habits: undefined;
  AddHabit: undefined;
  Calendar: undefined;
  Settings: undefined;
};