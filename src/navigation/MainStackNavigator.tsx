import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ContentStack from './stacks/ContentStack';
import { StatusBar } from 'react-native';

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <ContentStack />
    </NavigationContainer>
  );
}
