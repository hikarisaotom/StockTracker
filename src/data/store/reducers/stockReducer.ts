// import {NotificationsTypes} from '../../enums/Notification';
// import {NotificationsDispatcher} from '../../utils/notifications/NotificationDispatcher';

import {StockAction} from '../actions/stockActions';
import {StockState} from '../types/types';

export const StockReducer = (
  state: StockState,
  action: StockAction,
): StockState => {
  switch (action.type) {
    case 'addMsg':
      //   NotificationsDispatcher({
      //     notificationType: NotificationsTypes.message,
      //     bodyText: action.payload,
      //   });
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
      //   NotificationsDispatcher({
      //     notificationType: NotificationsTypes.error,
      //     bodyText: action.payload,
      //   });
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
    case 'addToWatchList':
      const newItem = action.payload;
      const existingIndex = state.watchList.findIndex(
        item => item.symbol === newItem.symbol,
      );
      if (existingIndex === -1) {
        console.log('item added!');
        return {
          ...state,
          watchList: [...state.watchList, newItem],
        };
      } else {
        const updatedWatchList = [...state.watchList];
        updatedWatchList[existingIndex].price = newItem.price;
        console.log(
          'This item was already in your watchlit, we updated the price',
        );
        return {
          ...state,
          watchList: updatedWatchList,
        };
      }
    default:
      return state;
  }
};
