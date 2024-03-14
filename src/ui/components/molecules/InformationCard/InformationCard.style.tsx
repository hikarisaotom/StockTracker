import {StyleSheet} from 'react-native';
import {DesignTokens} from '../../../theme/index';

export const informationCardStyles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    backgroundColor: DesignTokens.color.black,
    borderWidth: 2,
  },
  redBorder: {
    borderColor: DesignTokens.color.error,
  },
  greenBorder: {
    borderColor: DesignTokens.color.success,
  },
  title: {
    color: DesignTokens.color.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  currentValue: {
    color: DesignTokens.color.white,
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  greenText: {
    color: DesignTokens.color.success,
  },
  redText: {
    color: DesignTokens.color.error,
  },
  stockText: {
    color: DesignTokens.color.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  moneyStockTextchange: {
    color: DesignTokens.color.white,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  stocks: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  alertPrice: {
    color: DesignTokens.color.white,
    textAlign: 'right',
    fontSize: 14,
  },
  alertPriceValue: {
    fontWeight: '700',
    color: DesignTokens.color.warning,
  },
});
