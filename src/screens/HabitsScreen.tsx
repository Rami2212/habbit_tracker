import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useHabits } from '../context/HabitContext';
import { Habit } from '../types';
import Header from '../components/common/Header';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import EditHabitModal from '../components/modals/EditHabitModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { Routes } from '../navigation/routes';
import FloatingActionButton from '../components/common/FloatingActionButton';
import { HabitList, EmptyState } from '../components/HabitListComponents';
import ConfettiCannon from 'react-native-confetti-cannon';

const HabitsScreen = () => {
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

  const [refreshing, setRefreshing] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [today] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const activeHabits = getActiveHabits();
  const [slideAnimation] = useState(new Animated.Value(0));
  const [showCelebration, setShowCelebration] = useState(false);
  const explosionRef = useRef(null);

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
    const todayLog = findTodayLog(habit.id);
    const willBeCompleted = !(todayLog?.completed || false);

    if (willBeCompleted) {
      playCelebrationAnimation(habit.title);
    }

    await toggleHabitCompletion(habit.id, today);
  };

  // edit
  const handleEditHabit = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowEditModal(true);
  };

  const handleEdit = async () => {
    if (selectedHabit) {
      await saveHabit(selectedHabit.id);
      setShowEditModal(false);
      setSelectedHabit(null);
    }
  };

  // delete
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

  const findTodayLog = (habitId: string) => {
    return habitLogs.find(
      (log) => log.habitId === habitId && log.date.startsWith(today)
    );
  };

  // filter
  const filteredHabits = useCallback(() => {
    if (filter === 'all') return activeHabits;

    return activeHabits.filter(habit => {
      const todayLog = findTodayLog(habit.id);
      const isCompleted = todayLog?.completed || false;
      return filter === 'completed' ? isCompleted : !isCompleted;
    });
  }, [activeHabits, habitLogs, filter, today]);

  // completed habits
  const getCompletedCount = () => {
    return activeHabits.filter(habit => {
      const todayLog = findTodayLog(habit.id);
      return todayLog?.completed || false;
    }).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Header title="Today's Habits" showBackButton={true} />

      {/* date and progress */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{format(new Date(), 'EEEE')}</Text>
          <Text style={styles.subDate}>{format(new Date(), 'MMMM d, yyyy')}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.countText}>
            {getCompletedCount()}/{activeHabits.length}
          </Text>
          <Text style={styles.countLabel}>Completed</Text>
        </View>
      </View>

      {/* filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'incomplete' && styles.activeFilter]}
          onPress={() => setFilter('incomplete')}
        >
          <Text style={[styles.filterText, filter === 'incomplete' && styles.activeFilterText]}>
            Incomplete
          </Text>
        </TouchableOpacity>
      </View>

      {/* habit list and empty state */}
      <View style={styles.content}>
        {activeHabits.length === 0 ? (
          <EmptyState
            onAddPress={() => navigation.navigate(Routes.ADD_HABIT as never)}
          />
        ) : filteredHabits().length === 0 ? (
          <EmptyState
            isFilterEmpty={true}
            filter={filter}
            onResetFilter={() => setFilter('all')}
          />
        ) : (
          <HabitList
            habits={filteredHabits()}
            findTodayLog={findTodayLog}
            onToggle={handleToggleCompletion}
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


    </SafeAreaView>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 16,
      paddingBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    dateContainer: {
      flexDirection: 'column',
    },
    date: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    subDate: {
      fontSize: 16,
      color: theme.colors.secondaryText,
      marginTop: 4,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    filterContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      borderRadius: 28,
      backgroundColor: theme.colors.card,
      padding: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      marginHorizontal: 16,
    },
    filterButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 24,
    },
    activeFilter: {
      backgroundColor: theme.colors.primary,
    },
    filterText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.secondaryText,
    },
    activeFilterText: {
      color: theme.colors.white,
    },
    headerRight: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      alignItems: 'center',
    },
    countText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    countLabel: {
      fontSize: 12,
      color: theme.colors.secondaryText,
      marginTop: 2,
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

export default HabitsScreen;