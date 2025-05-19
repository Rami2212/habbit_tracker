import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import AppButton from '../components/common/AppButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileModal from '../components/modals/EditProfileModal';
import Header from '../components/common/Header';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyle(theme);
  const { user, logout } = useContext(UserContext);

  const [error, setError] = useState('');
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);

  // logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (err) {
              setError('Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openEditProfileModal = () => {
    setIsEditProfileModalVisible(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Header title="Profile" showBackButton />

        <View style={styles.scrollContent}>
          {/* profile */}
          <View style={styles.profileSection}>
            <Image
              source={require('../assets/blank-profile-picture.jpg')}
              style={styles.profileImage}
              defaultSource={require('../assets/blank-profile-picture.jpg')}
            />
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* appearance */}
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.optionContainer}>
            <View style={styles.optionRow}>
              <View style={styles.optionIconContainer}>
                <Icon
                  name={isDarkMode ? "weather-night" : "white-balance-sunny"}
                  size={22}
                  color={theme.colors.primary}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.lightGray,
                  true: theme.colors.primary
                }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* account settings */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.optionRow} onPress={openEditProfileModal}>
              <View style={styles.optionIconContainer}>
                <Icon
                  name="account-edit"
                  size={22}
                  color={theme.colors.primary}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionLabel}>Edit Profile</Text>
              </View>
              <Icon name="chevron-right" size={22} style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>

          {/* logout button */}
          <View style={styles.logoutContainer}>
            <AppButton
              title="Logout"
              onPress={handleLogout}
              buttonStyle={styles.logoutButton}
              textStyle={styles.logoutText}
              icon="log-out-outline"
            />
          </View>
        </View>
      </ScrollView>

      {/* edit profile modal */}
      <EditProfileModal
        visible={isEditProfileModalVisible}
        onClose={closeEditProfileModal}
      />
    </SafeAreaView>
  );
};

// styles
const createStyle = (theme: any) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 24,
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: 40,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.lightGray,
      marginBottom: 16,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    userEmail: {
      fontSize: 16,
      color: theme.colors.secondaryText,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
    },
    optionContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    optionIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionIcon: {
      marginRight: 12,
    },
    optionLabel: {
      fontSize: 16,
      color: theme.colors.text,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
    logoutContainer: {
      marginTop: 24,
      marginBottom: 40,
    },
    logoutButton: {
      backgroundColor: theme.colors.danger,
    },
    logoutText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    errorText: {
      color: theme.colors.danger,
      marginTop: 8,
      fontSize: 14,
      textAlign: 'center',
    },
    chevronIcon: {
      color: theme.colors.secondaryText,
    },
});

export default SettingsScreen;