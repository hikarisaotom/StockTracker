import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../../theme';
export const chartStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 20,
    paddingBottom: 20,
    borderWidth: 2,
    borderColor: DesignTokens.color.white,
  },
  chartContainer: {
    borderRadius: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    marginBottom: DesignTokens.margin.xs,
    marginTop: DesignTokens.margin.mid,
    color: DesignTokens.color.white,
  },
});
