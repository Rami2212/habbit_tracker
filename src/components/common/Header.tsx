import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderProps } from '../../types';
import { colors } from '../../theme/colors';

const Header = ({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
}: HeaderProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, showBackButton);
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Icon
                name="chevron-back"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {rightComponent && rightComponent}
      </View>
    </SafeAreaView>
  );
};

// styles
const createStyles = (theme: any, showBackButton: boolean) => StyleSheet.create({
     container: {
       backgroundColor: colors.background,
       borderBottomWidth: 1,
       borderBottomColor: theme.colors.lightGray,
       paddingTop: 20,
       paddingBottom: 5,
     },
     content: {
       height: 56,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       paddingHorizontal: 16,
     },
     leftContainer: {
       flexDirection: 'row',
       alignItems: 'center',
     },
     backButton: {
       width: 40,
       height: 40,
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 20,
     },
     title: {
       fontSize: 18,
       fontWeight: '600',
       color: theme.colors.text,
       marginLeft: showBackButton ? 8 : 0,
     },
});

export default Header;