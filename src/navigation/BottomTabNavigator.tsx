import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tabsStrings from '../localization/navigation';
import {BottomTabParamList} from './types';
import {AddAlertScreen, GraphsScreen, WatchListScreen} from '../ui/screens';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const routes: Array<React.ComponentProps<typeof Tab.Screen>> = [
  {
    name: 'AddAlert',
    component: AddAlertScreen,
    options: {
      tabBarLabel: tabsStrings.tabs.first,
      headerShown: false,
      tabBarIcon: ({color, size}) => (
        <Icon name="access-alarm" size={20} color="#900" />
      ),
    },
  },
  {
    name: 'WatchList',
    component: WatchListScreen,
    options: {
      tabBarLabel: tabsStrings.tabs.second,
      headerShown: false,
      tabBarIcon: ({color, size}) => (
        <Icon name="favorite" size={20} color="#900" />
      ),
    },
  },
  {
    name: 'Graphs',
    component: GraphsScreen,
    options: {
      tabBarLabel: tabsStrings.tabs.third,
      headerShown: false,
      tabBarIcon: ({color, size}) => (
        <Icon name="bar-chart" size={20} color="#900" />
      ),
    },
  },
];

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="AddAlert"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}>
      {routes.map(routeConfig => (
        <Tab.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
