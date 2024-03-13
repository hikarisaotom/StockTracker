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
}
export interface WatchListItem {
  symbol: string;
  price: number;
  currentValue: number;
  currentPercentage: number;
  history: TradeData[];
}

export interface TradeData {
  c: null;
  p: number;
  s: string;
  t: number;
  v: number;
}
