// import {NotificationsTypes} from '../../enums/Notification';
// import {NotificationsDispatcher} from '../../utils/notifications/NotificationDispatcher';

import {StockAction} from '../actions/stockActions';
import {StockState, WatchListItem} from '../types/types';

export const StockReducer = (
  state: StockState,
  action: StockAction,
): StockState => {
  switch (action.type) {
    case 'addMsg':
      showMessage('');
      return {
        ...state,
        message: action.payload,
      };
    case 'removeMsg':
      return {
        ...state,
        message: '',
      };
    case 'addError':
      showMessage('');
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
    case 'logout':
      return {
        errorMessage: '',
        status: 'not-authenticated',
        message: '',
        watchList: [],
      };
    case 'addToWatchList': {
      return addToWatchList(state, action.payload);
    }
    case 'updateWatchListItem':
      return updateWatchList(state, action.payload);
    default:
      return state;
  }
};

const showMessage = (msg: string) => {
  //   NotificationsDispatcher({
  //     notificationType: NotificationsTypes.message,
  //     bodyText: msg,
  //   });
  console.log(msg);
};

const addToWatchList = (state: StockState, payload: WatchListItem) => {
  const newItem = payload;
  const existingIndex = state.watchList.findIndex(
    item => item.symbol === newItem.symbol,
  );
  if (existingIndex === -1) {
    showMessage('item added');
    return {
      ...state,
      watchList: [...state.watchList, newItem],
    };
  } else {
    const updatedWatchList = [...state.watchList];
    updatedWatchList[existingIndex].price = newItem.price;
    showMessage('This item was already in your watchlit, we updated the price');
    return {
      ...state,
      watchList: updatedWatchList,
    };
  }
};

const updateWatchList = (state: StockState, payload: WatchListItem) => {
  const updatedItem = payload;
  const updatedWatchListForStockInfo = state.watchList.map(item => {
    if (item.symbol === updatedItem.symbol) {
      return {...item, ...updatedItem};
    }
    return item;
  });
  return {
    ...state,
    watchList: updatedWatchListForStockInfo,
  };
};
// import {StockAction} from '../actions/stockActions';
// import {StockState, WatchListItem} from '../types/types';

// export const stockReducer = (
//   state: StockState,
//   action: StockAction,
// ): StockState => {
//   switch (action.type) {
//     case 'addMsg':
//       return addMessage(state, action.payload);
//     case 'removeMsg':
//       return removeMessage(state);
//     case 'addError':
//       return addError(state, action.payload);
//     case 'removeError':
//       return removeError(state);
//     case 'logout':
//       return logout(state);
//     case 'addToWatchList':
//       return addToWatchList(state, action.payload);
//     case 'updateStockInformation':
//       return updateStockInformation(state, action.payload);
//     case 'updatePrices':
//       return updatePrices(state, action.payload);
//     default:
//       return state;
//   }
// };

// const addMessage = (state: StockState, payload: string): StockState => ({
//   ...state,
//   message: payload,
// });

// const removeMessage = (state: StockState): StockState => ({
//   ...state,
//   message: '',
// });

// const addError = (state: StockState, payload: string): StockState => ({
//   ...state,
//   errorMessage: payload,
// });

// const removeError = (state: StockState): StockState => ({
//   ...state,
//   errorMessage: '',
// });

// const logout = (state: StockState): StockState => ({
//   errorMessage: '',
//   status: 'not-authenticated',
//   message: '',
//   watchList: [],
// });

// const addToWatchList = (
//   state: StockState,
//   payload: WatchListItem,
// ): StockState => {
//   const newItem = payload;
//   const existingIndex = state.watchList.findIndex(
//     item => item.symbol === newItem.symbol,
//   );
//   if (existingIndex === -1) {
//     console.log('item added!');
//     return {
//       ...state,
//       watchList: [...state.watchList, newItem],
//     };
//   } else {
//     const updatedWatchList = [...state.watchList];
//     updatedWatchList[existingIndex].price = newItem.price;
//     console.log(
//       'This item was already in your watchlist, we updated the price',
//     );
//     return {
//       ...state,
//       watchList: updatedWatchList,
//     };
//   }
// };

// const updateStockInformation = (
//   state: StockState,
//   payload: WatchListItem,
// ): StockState => {
//   const updatedItem = payload;
//   const updatedWatchListForStockInfo = state.watchList.map(item => {
//     if (item.symbol === updatedItem.symbol) {
//       return {...item, ...updatedItem};
//     }
//     return item;
//   });
//   return {
//     ...state,
//     watchList: updatedWatchListForStockInfo,
//   };
// };

// const updatePrices = (state: StockState, payload: any): StockState => {
//   const {symbol, prices} = payload;
//   const updatedWatchList = state.watchList.map(item => {
//     if (item.symbol === symbol) {
//       return {...item, history: prices};
//     }
//     return item;
//   });
//   return {
//     ...state,
//     watchList: updatedWatchList,
//   };
// };
