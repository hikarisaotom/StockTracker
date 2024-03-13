import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {informationCardStyles} from './InformationCard.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DesignTokens} from '../../../theme';
import {TradeData, WatchListItem} from '../../../../data/store/types/types';
import {API_KEY} from 'react-native-dotenv';
import defaultStrings from '../../../../localization/default';
import {AppContext} from '../../../../data/store/Context';

const InformationCard = ({symbol, price, history}: WatchListItem) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [marginChange, setMarginChange] = useState(0);
  const {updateHistory} = useContext(AppContext);
  const [change, setChange] = useState(0);
  const styles = informationCardStyles;
 
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
      setCurrentValue(data?.data?.[0]?.p ?? 0);
      //history and price change
      const history: number[] = [];
      (data?.data ?? []).forEach((item: TradeData) => {
        history.push(item.p);
      });
      updateHistory(data?.data ?? [], symbol);
      if (history.length >= 2) {
        const lastPrice: number = history[history.length - 1] ?? 0;
        const penultimatePrice: number = history[history.length - 2] ?? 0.1;
        const lastPercentageChange: number =
          ((lastPrice - penultimatePrice) / penultimatePrice) * 100;
        const lastChange: number = lastPrice - penultimatePrice;
        setMarginChange(lastPercentageChange);
        setChange(lastChange);
        setCurrentValue(data.data[0].p);
      } else {
        setMarginChange(0);
        setChange(0);
      }
    };

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
          {Math.abs(marginChange) < 1
            ? marginChange.toFixed(4)
            : marginChange.toFixed(2)}
          %
        </Text>
        <Text
          style={[
            styles.moneyStockTextchange,
            change >= 0 ? styles.greenText : styles.redText,
          ]}>
          (${change.toFixed(2)})
        </Text>
      </View>
      {price && (
        <Text style={styles.alertPrice}>
          {defaultStrings.price.default}
          <Text style={[styles.alertPriceValue]}>
            ${Math.round(price * 100) / 100}
          </Text>
        </Text>
      )}
    </View>
  );
};

export default InformationCard;
