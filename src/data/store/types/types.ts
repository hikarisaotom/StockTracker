export type Contextprops = {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  errorMessage: string;
  message: string;
  watchList: WatchListItem[];
  addToWatchList: (item: WatchListItem) => void;
  updateHistory: (prices: TradeData[], symbol: string) => void;
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
  history: TradeData[];
}

export interface TradeData {
  c: null;
  p: number;
  s: string;
  t: number;
  v: number;
}
