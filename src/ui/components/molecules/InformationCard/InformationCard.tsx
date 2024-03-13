import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {informationCardStyles} from './InformationCard.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DesignTokens} from '../../../theme';
import {WatchListItem} from '../../../../data/store/types/types';
import {API_KEY} from 'react-native-dotenv';

const InformationCard = ({symbol, price}: WatchListItem) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [marginChange, setMarginChange] = useState(0);
  const [change, setChange] = useState(0);
  const [name, setName] = useState('');
  const cardBgColor = 'white';
  const styles = informationCardStyles;
  interface TradeData {
    c: null;
    p: number;
    s: string;
    t: number;
    v: number;
  }
  function subscribeToSymbols(socket: WebSocket) {
    if (socket && socket.readyState === WebSocket.OPEN && symbol) {
      socket.send(JSON.stringify({type: 'subscribe', symbol: symbol}));
    }
  }

  function useDebouncedEffect(
    callback: () => void,
    delay: number,
    deps: any[],
  ) {
    useEffect(() => {
      const handler = setTimeout(() => {
        callback();
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [...deps, delay]);
  }

  useEffect(() => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);

    const handleMessage = (event: any) => {
      let data = JSON.parse(event?.data);
      //current value
      setCurrentValue(data.data[0].p);
      const sortedData = data.data.sort((a, b) => a.t - b.t);
      //history and price change
      const history: number[] = [];
      sortedData.forEach((item: TradeData) => {
        history.push(item.p);
      });
      if (history.length >= 2) {
        const lastPrice: number = history[0] ?? 0;
        const penultimatePrice: number = history[1] ?? 0.1;
        const lastPercentageChange: number =
          ((lastPrice - penultimatePrice) / penultimatePrice) * 100;
        const lastChange: number = lastPrice - penultimatePrice;
        setMarginChange(lastPercentageChange);
        setChange(lastChange);
        setCurrentValue(lastPrice);
      } else {
        setMarginChange(0);
        setChange(0);
      }
    };//end 

    const handleSocketError = (error: any) => {
      console.error('WebSocket error:', error);
    };

    socket.addEventListener('open', () => subscribeToSymbols(socket));
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('error', handleSocketError);

    return () => {
      socket.close();
    };
  }, []);

  // Debounce the subscribe function to limit the frequency of requests
  useDebouncedEffect(
    () => {
      const socket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);
      subscribeToSymbols(socket);
      socket.close();
    },
    1000,
    [],
  );

  return (
<View style={[styles.card, {backgroundColor: cardBgColor}]}>
  <Text style={styles.title}>
    {symbol} {name}
  </Text>
  <Text style={styles.text}>
    Price / Value:{' '}
    <Text style={styles.bold}>${currentValue.toFixed(2)}</Text>
  </Text>
  <View style={{ flexDirection: 'row' }}>
    <Icon
      name={change >= 0 ? 'arrow-drop-up' : 'arrow-drop-down'}
      size={50}
      color={change >= 0 ? DesignTokens.color.success : DesignTokens.color.error}
    />
    <Text style={change >= 0 ? styles.greenText : styles.redText}>
      {Math.abs(marginChange) < 1 ? marginChange.toFixed(4) : marginChange.toFixed(2)}%
    </Text>
    <Text style={change >= 0 ? styles.greenText : styles.redText}>
      (${change.toFixed(2)})
    </Text>
  </View>
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
