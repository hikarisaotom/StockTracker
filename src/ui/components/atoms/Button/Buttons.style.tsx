import {StyleSheet} from 'react-native';
import { DesignTokens } from '../../../theme';

export const buttonStyles = () =>
  StyleSheet.create({
    buttonTextPressed: {
      color: DesignTokens.color.white,
      fontWeight: 'bold',
    },
    buttonTextNotPressed: {
      color: DesignTokens.color.white,
    },
    buttonTextDisable: {
      color: DesignTokens.color.white,
    },
    buttonPressed: {
      backgroundColor: DesignTokens.color.success,
    },
    buttonNotPressed: {
      backgroundColor: DesignTokens.color.success,
      color: DesignTokens.color.white,
    },
    buttonDisabled: {
      backgroundColor: DesignTokens.color.disabled,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radius: {borderRadius: 0},
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      paddingHorizontal: DesignTokens.margin.sm,
      borderRadius: 6,
    },
  });
