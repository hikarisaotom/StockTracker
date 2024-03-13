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
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    alignSelf: 'stretch',
    alignContent: 'flex-start',
    paddingHorizontal: DesignTokens.margin.mid,
    paddingVertical: DesignTokens.margin.mid,
    marginHorizontal: DesignTokens.margin.mid,
    backgroundColor: 'rgba(191, 191, 191, 0.3)',
  },
  smallMargin: {
    marginBottom: DesignTokens.margin.mid,
  }
});

export default AddAlertFormStyles;
