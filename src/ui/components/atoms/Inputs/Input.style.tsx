import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../../theme';

export const inputStyles = () =>
  StyleSheet.create({
    label: {
      marginLeft: DesignTokens.margin.sm,
      marginVertical: 3,
    },
    placeholder: {
      position: 'absolute',
      color: DesignTokens.color.disabled,
    },
    placeholderLabel: {
      display: 'none',
    },
    placeholderLabelFocused: {
      display: 'flex',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderColor: DesignTokens.color.primary,
      backgroundColor: DesignTokens.color.primary,
      borderRadius: 6,
      overflow: 'hidden',
    },
    input: {
      flex: 6,
      height: 56,
      color: DesignTokens.color.white,
      paddingLeft: 12,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelSuccess: {
      color: DesignTokens.color.success,
      borderColor: DesignTokens.color.success,
    },

    inputContainerSuccess: {
      backgroundColor: DesignTokens.color.success,
      borderColor: DesignTokens.color.success,
    },

    inputSuccess: {
      color: DesignTokens.color.success,
    },
    labelError: {
      color: DesignTokens.color.error,
      borderColor: DesignTokens.color.error,
    },

    bottomLabelError: {
      textAlign: 'left',
      color: DesignTokens.color.error,
    },

    inputContainerError: {
      borderColor: DesignTokens.color.error,
    },

    inputError: {
      color: DesignTokens.color.error,
    },

    labelDisabled: {
      color: DesignTokens.color.disabled,
      borderColor: DesignTokens.color.disabled,
    },

    inputContainerDisabled: {
      borderColor: DesignTokens.color.disabled,
    },

    inputDisabled: {
      color: DesignTokens.color.disabled,
    },
  });
