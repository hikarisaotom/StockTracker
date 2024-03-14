import React, {useEffect} from 'react';
import MainStackNavigator from '../navigation/MainStackNavigator';
import {ContextProvider} from '../data/store/Context';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {PermissionsAndroid, Platform} from 'react-native';
function App(): React.JSX.Element {
  const createChannel = () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {}
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'test Channel',
      },
      () => {},
    );
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      createChannel();
    }
  }, []);

  return (
    <>
      <AppState>
        <MainStackNavigator />
      </AppState>
    </>
  );
}

const AppState = ({children}: any) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default App;
