import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type BottomTabParamList = {
  AddAlert: undefined;
  WatchList: undefined;
  Graphs: undefined;
};

export type ContentStackParamList = {
  BottomTabNavigator: undefined;
};

export type AddAlertTabProps = BottomTabScreenProps<
  BottomTabParamList,
  'AddAlert'
>;

export type WatchListTabProps = BottomTabScreenProps<
  BottomTabParamList,
  'WatchList'
>;
export type GraphsTabProps = BottomTabScreenProps<BottomTabParamList, 'Graphs'>;
