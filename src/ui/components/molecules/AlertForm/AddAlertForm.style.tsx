import { StyleSheet } from 'react-native';
import { DesignTokens } from '../../../theme';

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
  },
  title: {
    color: DesignTokens.color.success,
    textAlign: 'center',
    marginBottom: DesignTokens.margin.sm,
    fontWeight: '700',
    fontSize: 20,
  },
  description: {
    color: DesignTokens.color.white,
    textAlign: 'justify',
    marginBottom: DesignTokens.margin.mid,
    fontSize: 15,
  },
});

export default AddAlertFormStyles;
