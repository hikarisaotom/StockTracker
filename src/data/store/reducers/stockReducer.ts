import {Platform} from 'react-native';
import {StockAction} from '../actions/stockActions';
import {StockState, WatchListItem} from '../types/types';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-simple-toast';
import {DesignTokens} from '../../../ui/theme';
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
  Toast.show(msg, Toast.LONG, {
    tapToDismissEnabled: true,
    backgroundColor: DesignTokens.color.success,
    textColor: DesignTokens.color.black,
  });
};

const addToWatchList = (state: StockState, payload: WatchListItem) => {
  const newItem = payload;
  const existingIndex = state.watchList.findIndex(
    item => item.symbol === newItem.symbol,
  );
  if (existingIndex === -1) {
    showMessage('Price alert for ' + newItem.symbol + ' added');
    newItem.wasNotified = false;
    return {
      ...state,
      watchList: [...state.watchList, newItem],
      symbols: [...state.symbols, newItem.symbol],
    };
  } else {
    const updatedWatchList = [...state.watchList];
    updatedWatchList[existingIndex].price = newItem.price;
    updatedWatchList[existingIndex].wasNotified = false;
    showMessage(newItem.symbol + " 's price alert updated");
    if (
      newItem.price < newItem.currentValue &&
      !updatedWatchList[existingIndex].wasNotified
    ) {
      showNotification(
        'Watch Out At this!',
        newItem.symbol + ' has passed the price you set up for watching',
      );
      updatedWatchList[existingIndex].wasNotified = true;
    } else if (newItem.price == newItem.currentValue) {
      updatedWatchList[existingIndex].wasNotified = true;
      showNotification(
        'Can you see the future?',
        newItem.symbol + ' has reached the price you set up for watching',
      );
    }
    return {
      ...state,
      watchList: updatedWatchList,
    };
  }
};
const showNotification = (title: string, msg: string) => {
  if (Platform.OS === 'ios') {
    PushNotificationIOS.addNotificationRequest({
      title: '🎉' + title + ' 🎉',
      id: '1',
      body: msg,
    });
  } else {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: title,
      message: msg,
    });
  }
};

const updateWatchList = (state: StockState, payload: WatchListItem) => {
  const updatedItem = payload;
  let price = updatedItem.currentValue + 900;

  const updatedWatchListForStockInfo = state.watchList.map(item => {
    if (item.symbol === updatedItem.symbol) {
      price = item.price;
      return {...item, ...updatedItem};
    }
    return item;
  });
  const existingIndex = state.watchList.findIndex(
    item => item.symbol === updatedItem.symbol,
  );

  if (
    price < updatedItem.currentValue &&
    !updatedWatchListForStockInfo[existingIndex].wasNotified
  ) {
    showNotification(
      'Watch Out At this!',
      updatedItem.symbol + ' has passed the price you set up for watching',
    );
    updatedWatchListForStockInfo[existingIndex].wasNotified = true;
  } else if (price == updatedItem.currentValue) {
    showNotification(
      'Watch Out At this!',
      'Can you see the future? ' +
        updatedItem.symbol +
        ' has reached the price you set up for watching',
    );
    updatedWatchListForStockInfo[existingIndex].wasNotified = true;
  }
  return {
    ...state,
    watchList: updatedWatchListForStockInfo,
  };
};
