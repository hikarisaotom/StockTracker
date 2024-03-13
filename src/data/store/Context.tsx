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
};
export const AppContext = createContext({} as Contextprops);

export const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(StockReducer, initialState);

  // useEffect(() => {
  //   const socket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);

  //   const handleMessage = (event: any) => {
  //     console.log('UPDATE DATA');
  //     let data = JSON.parse(event?.data);
  //     const history: number[] = [];
  //     (data?.data ?? []).forEach((item: TradeData) => {
  //       history.push(item.p);
  //     });
  //     // updateHistory(data?.data ?? [], symbol);
  //     if ((history ?? []).length >= 2) {
  //       const lastPrice: number = history[history.length - 1] ?? 0;
  //       const penultimatePrice: number = history[history.length - 2] ?? 0.1;
  //       const lastPercentageChange: number =
  //         ((lastPrice - penultimatePrice) / penultimatePrice) * 100;
  //       const lastChange: number = lastPrice - penultimatePrice;
  //       const newItem: WatchListItem = {
  //         symbol: data?.data[0]?.s ?? '',
  //         price: 0,
  //         currentValue: data?.data[0]?.p ?? 0,
  //         currentPercentage: lastPercentageChange,
  //         history: data?.data,
  //       };
  //       updateWatchItem(newItem);
  //     }
  //   };

  //   const handleSocketError = (error: any) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   const subscribeToSymbolsForWatchList = (socket: WebSocket) => {
  //     state.watchList.forEach((item: WatchListItem) => {
  //       if (socket && socket.readyState === WebSocket.OPEN && item.symbol) {
  //         socket.send(JSON.stringify({type: 'subscribe', symbol: item.symbol}));
  //       }
  //     });
  //   };

  //   socket.addEventListener('open', () =>
  //     subscribeToSymbolsForWatchList(socket),
  //   );
  //   socket.addEventListener('message', handleMessage);
  //   socket.addEventListener('error', handleSocketError);

  //   return () => {
  //     socket.close();
  //   };
  // }, [state.watchList]);

  const addToWatchList = (item: WatchListItem) => {
    dispatch({
      type: 'addToWatchList',
      payload: item,
    });
  };

  const updateWatchItem = (newData: WatchListItem) => {
    dispatch({
      type: 'updateWatchListItem',
      payload: newData,
    });
  };
  function subscribeToSymbols(socket: WebSocket) {
    state.watchList.forEach((item: WatchListItem) => {
      if (socket && socket.readyState === WebSocket.OPEN && item.symbol) {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: item.symbol }));
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
      let data = JSON.parse(event?.data);
      if (data?.data) {
        // const history = data?.data ?? [];
        // console.log('[DATA]', history);

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
          console.log('valid');
        } else {
          console.log('not valid');
        }

        if (Array.isArray(history) && history.length >= 2) {
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
      } //if
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
    5000,
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
