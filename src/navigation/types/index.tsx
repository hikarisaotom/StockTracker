import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type BottomTabParamList = {
  AddAlert: undefined;
  WatchList: undefined;
  Graphs: undefined;
};

export type AuthStackParamList = {
  SignInScreen: undefined;
};

export type ContentStackParamList = {
  BottomTabNavigator: undefined;
};
export type RootStackParamList = {
  Home: undefined;

  Place: undefined;
};

export type AddAlertTabProps = BottomTabScreenProps<
  BottomTabParamList,
  'AddAlert'
>;

export type WatchlistTabProps = BottomTabScreenProps<
  BottomTabParamList,
  'watchList'
>;
