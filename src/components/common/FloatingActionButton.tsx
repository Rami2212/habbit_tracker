import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';

interface FloatingActionButtonProps {
  onPress?: () => void;
  iconName?: string;
}

const FloatingActionButton = ({
  onPress,
  iconName = 'plus',
}: FloatingActionButtonProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('AddHabit');
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Icon name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
};

// styles
const createStyles = (theme: any) => StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }
});

export default FloatingActionButton;