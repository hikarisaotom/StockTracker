import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../theme';

const AddAlertStyles = StyleSheet.create({
  container: {
    paddingHorizontal: DesignTokens.margin.mid,
    marginBottom: DesignTokens.margin.sm,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default AddAlertStyles;
