import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import AppButton from '../common/AppButton';
import { ConfirmDeleteModalProps } from '../../types';

const ConfirmDeleteModal = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmDeleteModalProps) => {

  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              
              <View style={styles.buttonsContainer}>
                <AppButton
                  title={cancelText}
                  onPress={onCancel}
                  style={styles.button}
                />
                <AppButton
                  title={confirmText}
                  onPress={onConfirm}
                  style={styles.button}
                />
              </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
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
     modalContent: {
       width: '80%',
       backgroundColor: theme.colors.card,
       borderRadius: 16,
       padding: 24,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
     },
     title: {
       fontSize: 20,
       fontWeight: '600',
       color: theme.colors.text,
       marginBottom: 16,
     },
     message: {
       fontSize: 16,
       color: theme.colors.text,
       marginBottom: 24,
     },
     buttonsContainer: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
     },
     button: {
       marginLeft: 12,
     },
});

export default ConfirmDeleteModal;