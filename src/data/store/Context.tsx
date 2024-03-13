// import {createContext, useReducer} from 'react';
// import React from 'react';
// import {
//   Contextprops,
//   StockState,
//   TradeData,
//   WatchListItem,
// } from './types/types';
// import {StockReducer} from './reducers/stockReducer';

// const initialState: StockState = {
//   status: 'not-authenticated',
//   watchList: [],
//   errorMessage: '',
//   message: '',
// };
// export const AppContext = createContext({} as Contextprops);

// export const ContextProvider = ({children}: any) => {
//   const [state, dispatch] = useReducer(StockReducer, initialState);
//   const addToWatchList = (item: WatchListItem) => {
//     dispatch({
//       type: 'addToWatchList',
//       payload: item,
//     });
//   };
//   const updateHistory = (prices: TradeData[], symbol: string) => {
//     dispatch({
//       type: 'updatePrices',
//       payload: {prices: prices ?? [], symbol: symbol},
//     });
//   };
//   return (
//     <AppContext.Provider
//       value={{
//         ...state,
//         addToWatchList,
//         updateHistory,
//       }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

import { createContext, useReducer, useEffect } from 'react';
import React from 'react';
import {
  Contextprops,
  StockState,
  TradeData,
  WatchListItem,
} from './types/types';
import {StockReducer} from './reducers/stockReducer';
import {API_KEY} from 'react-native-dotenv';

const initialState: StockState = {
  status: 'not-authenticated',
  watchList: [],
  errorMessage: '',
  message: '',
};
export const AppContext = createContext({} as Contextprops);

export const ContextProvider = ({children}: any) => {
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
    if (socket && socket.readyState === WebSocket.OPEN && 'BINANCE:BTCUSDT') {
      socket.send(
        JSON.stringify({type: 'subscribe', symbol: 'BINANCE:BTCUSDT'}),
      );
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
      console.log('[UPDATING DATA]');
      let data = JSON.parse(event?.data);
      //current value
      // setCurrentValue(data?.data?.[0]?.p ?? 0);
      //history and price change
      const history: number[] = [];
      (data?.data ?? []).forEach((item: TradeData) => {
        history.push(item.p);
      });
      // updateHistory(data?.data ?? [], symbol);
      if ((history ?? []).length >= 2) {
        const lastPrice: number = history[history.length - 1] ?? 0;
        const penultimatePrice: number = history[history.length - 2] ?? 0.1;
        const lastPercentageChange: number =
          ((lastPrice - penultimatePrice) / penultimatePrice) * 100;
        const lastChange: number = lastPrice - penultimatePrice;
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
  }, [state.watchList]);

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
