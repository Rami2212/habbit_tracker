import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppButtonProps } from '../../types';
import { useTheme } from '../../context/ThemeContext';

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    text: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    } as TextStyle,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
