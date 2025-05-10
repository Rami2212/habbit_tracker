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
import Icon from 'react-native-vector-icons/Ionicons';

const AppButton = ({
  title,
  onPress,
  loading = false,
  isDisabled = false,
  style,
  textStyle,
  icon,
}: AppButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, isDisabled, loading, icon);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
      disabled={loading || isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <>
          {icon && <Icon name={icon} style={styles.icon} />}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// styles
const createStyles = (theme: any, isDisabled: boolean, loading: boolean, icon: string) => StyleSheet.create({
    button: {
      flexDirection: 'row',
      backgroundColor: isDisabled
        ? theme.colors.disabled || '#cccccc'
        : theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: loading || isDisabled ? 0.7 : 1,
    } as ViewStyle,

    text: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: '600',
      marginLeft: icon ? 8 : 0,
    } as TextStyle,

    icon: {
      color: "#FFFFFF",
      fontSize: 16,
    } as TextStyle,
});

export default AppButton;
