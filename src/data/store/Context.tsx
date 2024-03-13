import {createContext, useReducer} from 'react';
import React from 'react';
import {Contextprops, StockState, WatchListItem} from './types/types';
import {StockReducer} from './reducers/stockReducer';

const initialState: StockState = {
  status: 'not-authenticated',
  watchList: [],
  errorMessage: '',
  message: '',
};
export const AppContext = createContext({} as Contextprops);

export const ContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(StockReducer, initialState);
  const addToWatchList = (item: WatchListItem) => {
    dispatch({
      type: 'addToWatchList',
      payload: item,
    });
  };
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
