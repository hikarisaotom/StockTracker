/* eslint-disable prettier/prettier */
import { createContext, useReducer, useEffect } from 'react';
import React from 'react';
import {
  Contextprops,
  StockState,
  TradeData,
  WatchListItem,
} from './types/types';
import { StockReducer } from './reducers/stockReducer';
import { API_KEY } from 'react-native-dotenv';

const initialState: StockState = {
  status: 'not-authenticated',
  watchList: [],
  errorMessage: '',
  message: '',
  symbols: [],
};
export const AppContext = createContext({} as Contextprops);

export const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(StockReducer, initialState);
  const addToWatchList = (item: WatchListItem) => {
    dispatch({
      type: 'addToWatchList',
      payload: item,
    });
  };

  const updateWatchItem = (newData: WatchListItem) => {
    console.log('updating '+newData.symbol);
    dispatch({
      type: 'updateWatchListItem',
      payload: newData,
    });
  };
  function subscribeToSymbols(socket: WebSocket) {
    state.symbols.forEach((item: string) => {
      console.log('[subsribe]', item);
      if (socket && socket.readyState === WebSocket.OPEN && item) {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: item }));
      }
    });
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
      parseData(event?.data);
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
  }, [state.symbols]);

  const parseData = (rawData: any) => {
    let data = JSON.parse(rawData);
    if (data?.data) {
      const history: TradeData[] =
        data?.data instanceof Array ? data?.data : [];
      if (
        history.length > 0 &&
        history.every(
          item =>
            typeof item === 'object' &&
            item !== null &&
            'p' in item &&
            's' in item &&
            't' in item &&
            'v' in item,
        )
      ) {
        if (history.length >= 2) {
          const lastPrice: number = history[history.length - 1].p ?? 0;
          const penultimatePrice: number = history[history.length - 2].p ?? 0.1;
          const lastPercentageChange: number =
            ((lastPrice - penultimatePrice) / penultimatePrice) * 100;
          const newItem: WatchListItem = {
            symbol: data?.data[0]?.s ?? '',
            price: 0,
            currentValue: data?.data[0]?.p ?? 0,
            currentPercentage: lastPercentageChange,
            history: data?.data,
          };
          updateWatchItem(newItem);
        }
      }
    } //if
  };
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
    <AppContext.Provider
      value={{
        ...state,
        addToWatchList,
      }}>
      {children}
    </AppContext.Provider>
  );
};
