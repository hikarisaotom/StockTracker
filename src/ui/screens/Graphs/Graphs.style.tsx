import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../theme';

const graphStyles = StyleSheet.create({
  container: {
    paddingHorizontal: DesignTokens.margin.lg,
    marginBottom: DesignTokens.margin.sm,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  subContainer: {marginHorizontal: DesignTokens.margin.mid},
});

export default graphStyles;
