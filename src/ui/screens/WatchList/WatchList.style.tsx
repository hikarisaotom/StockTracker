import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../theme';

const watchListStyles = StyleSheet.create({
  // container: {
  //   paddingHorizontal: DesignTokens.margin.lg,
  //   marginBottom: DesignTokens.margin.sm,
  //   flex: 1,
  //   flexGrow: 1,
  //   justifyContent: 'center',
  //   backgroundColor: 'black',
  // },
  // subContainer: {marginHorizontal: DesignTokens.margin.mid},
  // title: {
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   marginTop: 20,
  //   marginBottom: 20,
  //   color: DesignTokens.color.success,
  //   textAlign: 'center',
  // },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: DesignTokens.color.success,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: DesignTokens.margin.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  subContainer: {
    // marginHorizontal: DesignTokens.margin.mid,
    flex: 1,
    padding: 20,
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
  },
});

export default watchListStyles;
