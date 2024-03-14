/**
 * @format
 */
// import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './src/ui/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
PushNotification.configure({
   // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  requestPermissions: Platform.OS === 'ios',
});
AppRegistry.registerComponent(appName, () => App);
