import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useHabits } from '../context/HabitContext';
import { Habit } from '../types';
import Header from '../components/common/Header';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import EditHabitModal from '../components/modals/EditHabitModal';
import { format, isSameDay } from 'date-fns';
import { Routes } from '../navigation/routes';
import FloatingActionButton from '../components/common/FloatingActionButton';
import { HabitList, EmptyState } from '../components/HabitListComponents';
import WeekCalendar from '../components/homeScreen/WeekCalendar';
import ConfettiCannon from 'react-native-confetti-cannon';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    getActiveHabits,
    saveHabit,
    habitLogs,
    refreshHabits,
    refreshLogs,
    toggleHabitCompletion,
    deleteHabit,
  } = useHabits();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));
  const [showCelebration, setShowCelebration] = useState(false);
  const explosionRef = useRef(null);
  const activeHabits = getActiveHabits();

  // refresh habits
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        await refreshHabits();
        await refreshLogs();
      };
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshHabits();
    await refreshLogs();
    setRefreshing(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // completion animation
    const playCelebrationAnimation = (habitTitle) => {
      setShowCelebration(true);
      explosionRef.current?.play();

      setTimeout(() => {
        setShowCelebration(false);
        explosionRef.current?.stop();
      }, 5000);
    };

  // toggle completion
  const handleToggleCompletion = async (habit: Habit) => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const log = findDateLog(habit.id);
    const willBeCompleted = !(log?.completed || false);

    // Add animation like in HabitsScreen
    if (willBeCompleted) {
      playCelebrationAnimation(habit.title);
    }

    await toggleHabitCompletion(habit.id, formattedDate);
  };

  const handleHabitPress = (habit: Habit) => {
    // Optional: Navigate to habit detail
  };

  const handleLongPress = (habit: Habit) => {
    setSelectedHabit(habit);
  };

  const handleEditHabit = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowEditModal(true);
  };

  const handleDeleteHabit = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedHabit) {
      await deleteHabit(selectedHabit.id);
      setShowDeleteModal(false);
      setSelectedHabit(null);
    }
  };

  const findDateLog = (habitId: string) => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    return habitLogs.find(
      (log) => log.habitId === habitId && log.date.startsWith(formattedDate)
    );
  };

  const isToday = isSameDay(selectedDate, new Date());

  const getCompletedCount = () => {
    return activeHabits.filter(habit => {
      const log = findDateLog(habit.id);
      return log?.completed || false;
    }).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Header title="Calendar" showBackButton />

      {/* calendar */}
      <View style={styles.calendarContainer}>
        <WeekCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </View>

      {/* date */}
      <View style={styles.dateHeader}>
        <Text style={styles.currentDateText}>
          {format(selectedDate, 'MMMM d, yyyy')}
        </Text>
        {isToday && <Text style={styles.todayIndicator}>Today</Text>}
      </View>

      {/* progress */}
      <View style={styles.statusContainer}>
        <View style={styles.countContainer}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{getCompletedCount()}/{activeHabits.length}</Text>
          </View>
          <Text style={styles.countLabel}>Completed</Text>
        </View>
      </View>

      {/* habit list and empty state */}
      <View style={styles.content}>
        {activeHabits.length === 0 ? (
          <EmptyState
            onAddPress={() => navigation.navigate(Routes.ADD_HABIT as never)}
          />
        ) : (
          <HabitList
            habits={activeHabits}
            findTodayLog={findDateLog}
            onPress={handleHabitPress}
            onToggle={handleToggleCompletion}
            onLongPress={handleLongPress}
            onEdit={handleEditHabit}
            onDelete={handleDeleteHabit}
            refreshing={refreshing}
            onRefresh={onRefresh}
            slideAnimation={slideAnimation}
          />
        )}
      </View>

      <FloatingActionButton />

      {/* delete modal */}
      <ConfirmDeleteModal
        visible={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        title="Delete Habit"
        message={`Are you sure you want to delete "${selectedHabit?.title}"? This action cannot be undone.`}
      />

      {/* edit habit modal */}
      <EditHabitModal
        visible={showEditModal}
        habit={selectedHabit}
        onClose={() => setShowEditModal(false)}
      />

      {/* completion animation */}
      {showCelebration && (
      <View >
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={true}
          fadeOut={true}
          explosionSpeed={350}
          fallSpeed={3000}
          ref={explosionRef}
        />
      </View>
      )}

    </SafeAreaView>
  );
};

// styles
const createStyles = (theme: any) => StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: theme.colors.background,
     },
     calendarContainer: {
       paddingHorizontal: 16,
       paddingTop: 32,
       backgroundColor: theme.colors.card,
       marginTop: 16,
       marginBottom: 16,
       borderRadius: 20,
       marginHorizontal: 16,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.1,
       shadowRadius: 4,
       elevation: 2,
     },
     dateHeader: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       paddingHorizontal: 16,
       paddingVertical: 12,
       marginBottom: 16,
     },
     currentDateText: {
       fontSize: 20,
       fontWeight: 'bold',
       color: theme.colors.text,
     },
     todayIndicator: {
       fontSize: 14,
       color: theme.colors.primary,
       fontWeight: '600',
     },
     content: {
       flex: 1,
       paddingHorizontal: 16,
     },
     statusContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       paddingHorizontal: 16,
       marginBottom: 16,
     },
     countContainer: {
       flexDirection: 'row',
       alignItems: 'center',
     },
     countBadge: {
       backgroundColor: theme.colors.primary,
       borderRadius: 12,
       paddingHorizontal: 12,
       paddingVertical: 4,
       marginRight: 8,
     },
     countText: {
       color: theme.colors.white,
       fontWeight: '600',
     },
     countLabel: {
       color: theme.colors.secondaryText,
       fontSize: 16,
     },
     section: {
       marginBottom: 8,
       paddingHorizontal: 16,
     },
     sectionTitle: {
       fontSize: 18,
       fontWeight: '600',
       color: theme.colors.text,
       marginBottom: 8,
     },
     celebrationContainer: {
       position: 'absolute',
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       justifyContent: 'center',
       alignItems: 'center',
       zIndex: 1000,
       backgroundColor: 'rgba(0,0,0,0.3)',
     },
     celebrationAnimation: {
       width: 300,
       height: 300,
     },
 });

export default CalendarScreen;