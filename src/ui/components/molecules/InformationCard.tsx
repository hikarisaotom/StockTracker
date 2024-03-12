import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { informationCardStyles } from './InformationCard.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DesignTokens } from '../../theme';
interface InformationCardProps {
  symbol: string;
  alertPrice?: number;
}
const InformationCard = ({
  symbol,
  alertPrice = undefined,
}: InformationCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [marginChange, setMarginChange] = useState(0);
  const [change, setChange] = useState(0);
  // Determina el color de fondo en función del valor actual de la acción en comparación con el precio de alerta
  const cardBgColor =
    alertPrice !== undefined && currentValue > alertPrice
      ? '#8FBC8F'
      : '#FA8072';
  const styles = informationCardStyles;
  return (
    <View style={[styles.card, {backgroundColor: cardBgColor}]}>
      <Text style={styles.title}>{symbol}</Text>
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
      {alertPrice !== undefined ? (
        <Text style={styles.text}>
          Alert Price: <Text style={styles.bold}>${alertPrice.toFixed(2)}</Text>
        </Text>
      ) : (
        <Text style={[styles.text, {color: '#A9A9A9'}]}>
          Alert Price: <Text style={styles.bold}>N/A</Text>
        </Text>
      )}
    </View>
  );
};

export default InformationCard;
