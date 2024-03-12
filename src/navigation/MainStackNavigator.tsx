import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ContentStack from './stacks/ContentStack';

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <ContentStack />
    </NavigationContainer>
  );
}
