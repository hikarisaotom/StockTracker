import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../theme/index';

export const informationCardStyles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  greenText: {
    color: DesignTokens.color.success,
  },
  redText: {
    color: DesignTokens.color.error,
  },
});
