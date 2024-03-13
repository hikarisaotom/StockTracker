import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {informationCardStyles} from './InformationCard.style';
import {WatchListItem} from '../../../../data/store/types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DesignTokens} from '../../../theme';
import defaultStrings from '../../../../localization/default';
interface informationCardProps {
  stock: WatchListItem;
}
const InformationCard = ({stock}: informationCardProps) => {
  let {symbol, price, currentValue, currentPercentage: change} = stock;
  const styles = informationCardStyles;
  return (
    <View
      style={[
        styles.card,
        change >= 0 ? styles.greenBorder : styles.redBorder,
      ]}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.currentValue}>${currentValue.toFixed(2)}</Text>
      </View>
      <View style={styles.stocks}>
        <Icon
          name={change >= 0 ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={40}
          color={
            change >= 0 ? DesignTokens.color.success : DesignTokens.color.error
          }
        />
        <Text
          style={[
            styles.stockText,
            change >= 0 ? styles.greenText : styles.redText,
          ]}>
          {Math.abs(change) < 1 ? change.toFixed(4) : change.toFixed(2)}%
        </Text>
        <Text
          style={[
            styles.moneyStockTextchange,
            change >= 0 ? styles.greenText : styles.redText,
          ]}>
          (${change.toFixed(2)})
        </Text>
      </View>
      <View>
        <Text style={styles.alertPrice}>
          {' '}
          {defaultStrings.price.default}
          <Text style={styles.alertPriceValue}> {price}</Text>
        </Text>
      </View>
    </View>
  );
};

export default InformationCard;
