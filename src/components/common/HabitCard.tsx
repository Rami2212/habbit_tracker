import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Animated,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Habit, HabitLog } from '../../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { HabitCardProps } from '../../types';

const HabitCard = ({
  habit,
  todayLog,
  onToggle,
  onLongPress,
  onEdit,
  onDelete,
}: HabitCardProps) => {
  const { theme } = useTheme();
  const isCompleted = todayLog?.completed || false;
  const styles = createStyles(theme, habit, isCompleted);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleEdit = () => {
    toggleMenu();
    onEdit(habit);
  };

  const handleDelete = () => {
    toggleMenu();
    onDelete(habit);
  };

  return (
    <TouchableWithoutFeedback onLongPress={() => onLongPress(habit)}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.card}
        >
          {/* icon */}
          <View style={styles.iconContainer}>
            <Icon name={habit.icon} size={24} color={theme.colors.card} />
          </View>

          {/* content */}
          <View style={styles.content}>
            <Text style={styles.title}>{habit.title}</Text>
            <Text style={styles.details}>{habit.description}</Text>
          </View>

          {/* right actions */}
          <View style={styles.rightActions}>

             {habit?.time && (
               <View style={styles.timeContainer}>
                 <Icon name="clock-outline" size={14} color={theme.colors.secondaryText} />
                 <Text style={styles.timeText}>
                   {format(new Date(habit?.time), 'h:mm a')}
                 </Text>
               </View>
             )}

            <TouchableOpacity
              style={styles.checkContainer}
              onPress={() => onToggle(habit)}
            >
              {isCompleted && (
                <Icon name="check" size={20} style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            {/* menu button */}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={toggleMenu}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name="dots-vertical"
                size={20}
                color={theme.colors.secondaryText}
              />
            </TouchableOpacity>
          </View>

          {/* menu */}
          {menuVisible && (
            <>
              <TouchableWithoutFeedback onPress={toggleMenu}>
                <View style={styles.overlay} />
              </TouchableWithoutFeedback>

              <Animated.View
                style={[
                  styles.menuContainer,
                  {
                    opacity: menuAnimation,
                    transform: [
                      {
                        translateY: menuAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={handleEdit}
                >
                  <Icon name="pencil" size={18} color={theme.colors.text} />
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={handleDelete}
                >
                  <Icon name="trash-can-outline" size={18} color={theme.colors.error || '#ff3b30'} />
                  <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// styles
const createStyles = (theme: any, habit: Habit, isCompleted: boolean) => StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: habit.color || theme.colors.primary,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: habit.color || theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        opacity: isCompleted ? 0.7 : 1,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 4,
        textDecorationLine: isCompleted ? 'line-through' : 'none',
        opacity: isCompleted ? 0.7 : 1,
    },
    details: {
        fontSize: 14,
        color: theme.colors.secondaryText,
        opacity: isCompleted ? 0.7 : 1,
    },
    checkContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: habit.color || theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isCompleted
         ? (habit.color || theme.colors.primary)
         : 'transparent',
    },
    checkIcon: {
        color: theme.colors.card,
    },
    menuButton: {
        marginLeft: 12,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    menuModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-end',
    },
    menuContainer: {
        position: 'absolute',
        right: 8,
        top: -8,
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        paddingVertical: 6,
        width: 140,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 10,
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    menuText: {
        fontSize: 15,
        marginLeft: 12,
        color: theme.colors.text,
    },
    deleteText: {
        color: theme.colors.error || '#ff3b30',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    timeText: {
        fontSize: 14,
        color: theme.colors.secondaryText,
        marginLeft: 4,
    },
});

export default HabitCard;