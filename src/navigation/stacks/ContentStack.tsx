import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ContentStackParamList} from '../types';
import BottomTabNavigator from '../BottomTabNavigator';

const Stack = createStackNavigator<ContentStackParamList>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: 'BottomTabNavigator',
    component: BottomTabNavigator,
    options: {headerShown: false},
  },
];

export default function ContentStack() {
  return (
    <Stack.Navigator>
      {routes.map(routeConfig => (
        <Stack.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </Stack.Navigator>
  );
}
