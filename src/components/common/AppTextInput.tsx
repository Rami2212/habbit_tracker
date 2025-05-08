import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },

    label: {
      marginBottom: 8,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: error ? theme.colors.danger : theme.colors.border,
    },

    input: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      color: theme.colors.text,
      fontSize: 16,
    },

    rightIconContainer: {
      paddingHorizontal: 12,
    },

    errorText: {
      color: theme.colors.danger,
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[styles.input, inputStyle]}
          placeholderTextColor={theme.colors.darkGray}
          selectionColor={theme.colors.primary}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;