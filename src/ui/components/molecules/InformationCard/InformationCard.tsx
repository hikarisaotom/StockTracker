import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {informationCardStyles} from './InformationCard.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DesignTokens} from '../../../theme';
import {WatchListItem} from '../../../../data/store/types/types';
import { API_KEY } from 'react-native-dotenv';
const InformationCard = ({symbol, price}: WatchListItem) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [marginChange, setMarginChange] = useState(0);
  const [change, setChange] = useState(0);
  const [name, setName] = useState('');
  const cardBgColor = '#8FBC8F';
  const styles = informationCardStyles;

  useEffect(() => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY); // Coloca tu clave de API de Finnhub aquí

    const subscribeToSymbols = () => {
      socket.send(JSON.stringify({type: 'subscribe', symbol: 'AAPL'}));
      socket.send(
        JSON.stringify({type: 'subscribe', symbol: 'BINANCE:BTCUSDT'}),
      );
      socket.send(JSON.stringify({type: 'subscribe', symbol: 'IC MARKETS:1'}));
    };

    const handleMessage = (event: any) => {
      console.log('Message from server:',event);
    };

    const handleSocketError = (error: any) => {
      console.error('WebSocket error:', error);
    };

    // Abre la conexión y suscríbete a los símbolos cuando la conexión se establezca
    socket.addEventListener('open', subscribeToSymbols);

    // Escucha los mensajes del servidor
    socket.addEventListener('message', handleMessage);

    // Maneja errores del socket
    socket.addEventListener('error', handleSocketError);

    // Limpia los listeners y cierra el socket al desmontar el componente
    return () => {
      socket.removeEventListener('open', subscribeToSymbols);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('error', handleSocketError);
      socket.close();
    };
  }, []);

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
