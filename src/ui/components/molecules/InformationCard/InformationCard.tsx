import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {informationCardStyles} from './InformationCard.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DesignTokens} from '../../../theme';
import {WatchListItem} from '../../../../data/store/types/types';
const InformationCard = ({symbol, price}: WatchListItem) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [marginChange, setMarginChange] = useState(0);
  const [change, setChange] = useState(0);
  const [name, setName] = useState('');
  const cardBgColor = '#8FBC8F';
  const styles = informationCardStyles;
  return (
    <View style={[styles.card, {backgroundColor: cardBgColor}]}>
      <Text style={styles.title}>
        {symbol} {name}
      </Text>
      <Text style={styles.text}>
        Price / Value:{' '}
        <Text style={styles.bold}>${currentValue.toFixed(2)}</Text>
      </Text>
      <Text style={styles.text}>
        <Icon
          name={change >= 0 ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={50}
          color={
            change >= 0 ? DesignTokens.color.success : DesignTokens.color.error
          }
        />
        <Text style={change >= 0 ? styles.greenText : styles.redText}>
          {Math.abs(marginChange) < 1
            ? marginChange.toFixed(4)
            : marginChange.toFixed(2)}
          % (${change.toFixed(2)})
        </Text>
      </Text>
      {price && (
        <Text style={styles.text}>
          Alert Price:{' '}
          <Text style={styles.bold}>${Math.round(price * 100) / 100}</Text>
        </Text>
      )}
    </View>
  );
};

export default InformationCard;
