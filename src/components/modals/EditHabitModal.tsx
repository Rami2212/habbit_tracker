import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useHabits } from '../../context/HabitContext';
import AppTextInput from '../common/AppTextInput';
import AppButton from '../common/AppButton';
import Header from '../common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Habit, HabitFrequency, EditHabitModalProps } from '../../types';

// icons for habits
const ICON_OPTIONS = [
  'run', 'bike', 'swim', 'walk', 'water', 'food-apple', 'meditation',
  'book-open-page-variant', 'weight-lifter', 'yoga', 'sleep',
  'palette', 'guitar-acoustic', 'pencil', 'notebook', 'code-tags',
  'pill', 'smoking-off', 'glass-wine', 'home', 'broom', 'dog',
  'cat', 'baby', 'school', 'account-group', 'phone',
];

// colors for habits
const COLOR_OPTIONS = [
  '#37beb0',  // Teal
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FFC107', // Amber
  '#9C27B0', // Purple
  '#F44336', // Red
  '#FF9800', // Orange
  '#00BCD4', // Cyan
  '#795548', // Brown
  '#607D8B', // Blue Grey
  '#E91E63', // Pink
];

const EditHabitModal = ({
  visible,
  onClose,
  habit,
}: EditHabitModalProps) => {
  const { theme } = useTheme();
  const { saveHabit } = useHabits();
  const styles = createStyles(theme);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICON_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // reset form
  const resetForm = () => {
    if (habit) {
      setTitle(habit.title);
      setDescription(habit.description || '');
      setSelectedIcon(habit.icon);
      setSelectedColor(habit.color);
      setTime(habit.time ? new Date(habit.time) : new Date());
    } else {
      setTitle('');
      setDescription('');
      setSelectedIcon(ICON_OPTIONS[0]);
      setSelectedColor(COLOR_OPTIONS[0]);
      setTime(new Date());
    }
  };

  useEffect(() => {
    resetForm();
  }, [habit]);

  // save habit
  const handleSave = async () => {
    if (!habit) return;
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a habit title');
      return;
    }

    setIsLoading(true);

    const updatedHabit: Habit = {
      ...habit,
      title: title.trim(),
      description: description.trim() || undefined,
      icon: selectedIcon,
      color: selectedColor,
      time,
    };

    const success = await saveHabit(updatedHabit);

    setIsLoading(false);

    if (success) {
      resetForm();
      onClose();
    } else {
      Alert.alert('Error', 'Failed to update habit. Please try again.');
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!habit) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Header
                  title="Edit Habit"
                  showBackButton
                  onBackPress={handleCancel}
                />

                <ScrollView
                  style={styles.content}
                  showsVerticalScrollIndicator={false}
                >
                  {/* title */}
                  <AppTextInput
                    label="Habit Name"
                    placeholder="Enter your habit"
                    value={title}
                    onChangeText={setTitle}
                  />

                  {/* description */}
                  <AppTextInput
                    label="Description"
                    placeholder="Add details about your habit"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                  />

                  {/* time */}
                  <Text style={styles.sectionTitle}>Time</Text>
                  <TouchableOpacity
                    style={styles.timeContainer}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Icon name="clock-outline" size={20} color={theme.colors.text} />
                    <Text style={styles.timeText}>
                      {format(time, 'hh:mm a')}
                    </Text>
                  </TouchableOpacity>

                  {showTimePicker && (
                    <DateTimePicker
                      value={time}
                      mode="time"
                      is24Hour={false}
                      display="default"
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) setTime(selectedTime);
                      }}
                    />
                  )}

                  {/* icon */}
                  <Text style={styles.sectionTitle}>Choose an Icon</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.iconScrollView}
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <TouchableOpacity
                        key={icon}
                        style={[
                          styles.iconOption,
                          { backgroundColor: selectedColor },
                          selectedIcon === icon && styles.selectedIconOption,
                        ]}
                        onPress={() => setSelectedIcon(icon)}
                      >
                        <Icon name={icon} size={24} color="#FFFFFF" />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* color */}
                  <Text style={styles.sectionTitle}>Choose a Color</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.colorScrollView}
                  >
                    {COLOR_OPTIONS.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorOption,
                          { backgroundColor: color },
                          selectedColor === color && styles.selectedColorOption,
                        ]}
                        onPress={() => setSelectedColor(color)}
                      />
                    ))}
                  </ScrollView>
                </ScrollView>

                {/* save button */}
                <View style={styles.buttonContainer}>
                  <AppButton
                    title="Save Changes"
                    onPress={handleSave}
                    loading={isLoading}
                    disabled={isLoading || !title.trim()}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// styles
const createStyles = (theme: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    height: '95%',
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  iconScrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
  },
  selectedIconOption: {
    borderWidth: 4,
    borderColor: theme.colors.primary,
  },
  colorScrollView: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 8,
  },
  selectedColorOption: {
    borderWidth: 4,
    borderColor: theme.colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.text,
  },
  buttonContainer: {
    padding: 16,
  },
});

export default EditHabitModal;