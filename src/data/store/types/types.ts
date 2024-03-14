export type Contextprops = {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  errorMessage: string;
  message: string;
  watchList: WatchListItem[];
  addToWatchList: (item: WatchListItem) => void;
};

export interface StockState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  errorMessage: string;
  message: string;
  watchList: WatchListItem[];
  symbols: string[];
}
export interface WatchListItem {
  symbol: string;
  price: number;
  currentValue: number;
  marginPercentage: number;
  change: number;
  history: TradeData[];
}

export interface TradeData {
  c: null | string;
  p: number;
  s: string;
  t: number;
  v: number;
}
