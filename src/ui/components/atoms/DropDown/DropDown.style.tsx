import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../../theme';
export const dropdownStyles = () =>
  StyleSheet.create({
    dropdown: {
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: DesignTokens.color.primary,
      color: DesignTokens.color.success,
    },
    containerStyle: {
      backgroundColor: DesignTokens.color.primary,
      borderColor: DesignTokens.color.white,
    },
    placeholderStyle: {
      fontSize: 14,
      color: DesignTokens.color.disabled,
      paddingLeft: DesignTokens.margin.sm,
    },
    selectedTextStyle: {
      fontSize: 14,
      color: DesignTokens.color.white,
    },
    inputSearchStyle: {
      fontSize: 16,
      backgroundColor: DesignTokens.color.primary,
      borderColor: DesignTokens.color.success,
      color: DesignTokens.color.white,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    margin: {
      marginBottom: DesignTokens.margin.mid,
    },
    label: {
      color: DesignTokens.color.white,
      left: 8,
      marginBottom: 8,
      fontSize: 14,
    },
  });
