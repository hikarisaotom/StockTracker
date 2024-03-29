import {TradeData, WatchListItem} from '../types/types';

export type StockAction =
  | {type: 'signUp'; payload: any}
  | {type: 'addError'; payload: string}
  | {type: 'addMsg'; payload: string}
  | {type: 'removeError'}
  | {type: 'removeMsg'}
  | {type: 'logout'}
  | {type: 'addToWatchList'; payload: WatchListItem}
  | {type: 'updateWatchListItem'; payload: WatchListItem};
