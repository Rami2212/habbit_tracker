// habit
export type Habit {
  id: string;
  title: string;
  description?: string;
  icon: string;
  time: Date;
  color: string;
  createdAt: Date;
  frequency: string;
  dayOfWeekNumber?: number;
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


// user
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isGuest?: boolean;
  preferences: {
    theme?: 'light' | 'dark';
    [key: string]: any;
  };
};

export type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<User>;
  updateProfile: (updates: Partial<User>) => Promise<User>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<User>;
  clearError: () => void;
};


// navigation
import { Routes } from './navigation/routes';

export type RootStackParamList = {
  [Routes.AUTH]: undefined;
  [Routes.MAIN]: undefined;
};

export type AuthStackParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.REGISTER]: undefined;
};

export type MainTabParamList = {
  [Routes.HOME]: undefined;
  [Routes.HABITS]: undefined;
  [Routes.ADD_HABIT]: undefined;
  [Routes.CALENDAR]: undefined;
  [Routes.SETTINGS]: undefined;
};

export type HabitsStackParamList = {
  [Routes.HABITS]: undefined;
  [Routes.EDIT_HABIT]: { habitId: string };
  [Routes.HABIT_DETAIL]: { habitId: string };
};


// Components
export type HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export type AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export type HabitCardProps {
  habit: Habit;
  todayLog?: HabitLog;
  onToggle: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

// home components
export type WeekCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

// habit screen
export type HabitListProps {
  habits: Habit[];
  findTodayLog: (habitId: string) => HabitLog | undefined;
  onToggle: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  refreshing: boolean;
  onRefresh: () => void;
  slideAnimation: Animated.Value;
}

export type EmptyStateProps {
  isFilterEmpty?: boolean;
  filter?: 'all' | 'completed' | 'incomplete';
  onAddPress?: () => void;
  onResetFilter?: () => void;
}

// modals
export type ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export type EditHabitModalProps {
  visible: boolean;
  onClose: () => void;
  habit: Habit | null;
}