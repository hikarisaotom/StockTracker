import React from 'react';
import {useColorScheme} from 'react-native';;
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainStackNavigator from '../navigation/MainStackNavigator';
import { AddAlertScreen, GraphsScreen, WatchListScreen } from './screens';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <MainStackNavigator />
    </>
  );
}

export default App;
