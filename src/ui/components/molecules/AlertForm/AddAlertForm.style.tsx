import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../../theme';

const AddAlertFormStyles = StyleSheet.create({
  container: {
    paddingHorizontal: DesignTokens.margin.mid,
    marginBottom: DesignTokens.margin.sm,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },

  subContainer: {
    flex: 1,
    paddingHorizontal: DesignTokens.margin.mid,
    paddingTop: DesignTokens.margin.lg,
  },
});

export default AddAlertFormStyles;
