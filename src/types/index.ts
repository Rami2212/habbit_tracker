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