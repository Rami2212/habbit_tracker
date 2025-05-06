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