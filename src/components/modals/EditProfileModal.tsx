import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import AppTextInput from '../common/AppTextInput';
import AppButton from '../common/AppButton';
import Header from '../common/Header';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditProfileModal = ({
  visible,
  onClose,
}: EditProfileModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user, updateProfile, error, clearError } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // initialize user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLocalError(null);
    clearError();
  }, [user, visible]);

  // reset the form
  const resetForm = () => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLocalError(null);
    clearError();
  };

  const validateInputs = () => {
    // validate name
    if (!name.trim()) {
      setLocalError('Please enter your name');
      return false;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      return false;
    }

    // change password
    if (newPassword) {
      // current password is required
      if (!currentPassword) {
        setLocalError('Current password is required to set a new password');
        return false;
      }

      // check the current password is correct
      if(currentPassword != user.password) {
        setLocalError('Current password is wrong');
        return false;
      }

      // confirm password match
      if (newPassword !== confirmPassword) {
        setLocalError('New passwords do not match');
        return false;
      }
    }

    return true;
  };

  // save user
  const handleSave = async () => {
    setLocalError(null);
    clearError();

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      const updates: any = {
        name,
        email,
      };

      if (newPassword) {
        updates.password = newPassword;
      }

      await updateProfile(updates);

      onClose();
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

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
                  title="Edit Profile"
                  showBackButton
                  onBackPress={handleCancel}
                />

                <ScrollView
                  style={styles.content}
                  showsVerticalScrollIndicator={false}
                >
                  {/* errors */}
                  {(localError || error) && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{localError || error}</Text>
                    </View>
                  )}

                  {/* name */}
                  <AppTextInput
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                  />

                  {/* email */}
                  <AppTextInput
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <Text style={styles.sectionTitle}>Change Password</Text>

                  {/* current password */}
                  <AppTextInput
                    label="Current Password"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                  />

                  {/* new password */}
                  <AppTextInput
                    label="New Password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                  />

                  {/* confirm password */}
                  <AppTextInput
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />

                  <Text style={styles.passwordHint}>
                    Leave password fields empty if you don't want to change your password
                  </Text>
                </ScrollView>

                {/* save button */}
                <View style={styles.buttonContainer}>
                  <AppButton
                    title="Save Changes"
                    onPress={handleSave}
                    loading={isLoading}
                    disabled={isLoading}
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
  passwordHint: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginTop: 8,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 14,
  },
});

export default EditProfileModal;