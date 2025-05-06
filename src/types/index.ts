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

export type AppTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    lightGray: string;
    darkGray: string;
    inputBackground: string;
  };
}

