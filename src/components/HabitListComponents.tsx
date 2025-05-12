import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Habit, HabitLog } from '../types';
import HabitCard from './common/HabitCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HabitListProps, EmptyStateProps } from '../types';

// habit list
export const HabitList = ({
  habits,
  findTodayLog,
  onToggle,
  onEdit,
  onDelete,
  refreshing,
  onRefresh,
  slideAnimation,
}: HabitListProps) => {
  const { theme } = useTheme();

  // Split habits
  const incompleteHabits = habits.filter(
    (habit) => !findTodayLog(habit.id)?.completed
  );
  const completedHabits = habits.filter(
    (habit) => findTodayLog(habit.id)?.completed
  );

  const renderHabitItem = (item: Habit) => {
    const todayLog = findTodayLog(item.id);
    const isCompleted = todayLog?.completed || false;
    const translateY = isCompleted ? slideAnimation : new Animated.Value(0);

    return (
      <Animated.View key={item.id} style={{ transform: [{ translateY }] }}>
        <HabitCard
          habit={item}
          todayLog={todayLog}
          onToggle={() => onToggle(item)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={[]}
      keyExtractor={() => Math.random().toString()} // Dummy key extractor
      renderItem={null}
      ListHeaderComponent={
        <View>
          {/* Incomplete Habits */}
          {incompleteHabits.map(renderHabitItem)}

          {/* Completed Section */}
          {completedHabits.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Completed
              </Text>
              {completedHabits.map(renderHabitItem)}
            </View>
          )}
        </View>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    />
  );
};


// empty state
export const EmptyState = ({
  isFilterEmpty = false,
  filter = 'all',
  onAddPress,
  onResetFilter,
}: EmptyStateProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (isFilterEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="filter-variant-remove" size={80} color={theme.colors.secondaryText} />
        <Text style={styles.emptyText}>No {filter === 'completed' ? 'completed' : 'incomplete'} habits</Text>
        <Text style={styles.emptySubText}>
          {filter === 'completed'
            ? 'Complete some habits to see them here'
            : 'All your habits are completed for today!'}
        </Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onResetFilter}
        >
          <Icon name="filter-variant" size={18} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Show All Habits</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.emptyContainer}>
      <Icon name="filter-variant-remove" size={80} color={theme.colors.secondaryText} />
      <Text style={styles.emptyText}>No habits yet</Text>
      <Text style={styles.emptySubText}>
        Start by adding habits you want to build
      </Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onAddPress}
      >
        <Icon name="plus" size={18} color="#FFFFFF" />
        <Text style={styles.actionButtonText}>Add Your First Habit</Text>
      </TouchableOpacity>
    </View>
  );
};

// styles for empty state
const createStyles = (theme: any) => StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyImage: {
      width: 120,
      height: 120,
      marginBottom: 20,
      opacity: 0.7,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.secondaryText,
      textAlign: 'center',
      marginBottom: 12,
    },
    emptySubText: {
      fontSize: 14,
      color: theme.colors.secondaryText,
      textAlign: 'center',
      marginBottom: 20,
    },
    actionButton: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.primary,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
  });