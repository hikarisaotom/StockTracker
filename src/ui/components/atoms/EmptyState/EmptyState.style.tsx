import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../../theme';

export const EmptyStateStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: DesignTokens.margin.sm,
  },
  text: {
    color: DesignTokens.color.white,
    fontSize: 16,
  },
});
