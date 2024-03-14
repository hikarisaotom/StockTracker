# Stocks Tracker Mobile Application 📈

This application is built using React Native with TypeScript, adhering to a clean architecture and atomic design structure to ensure scalability and reusability in the future. It leverages the Finnhub API to provide real-time stock information 📈. Featuring multiple components designed to handle different aspects of the application, it emphasizes modularity and code reuse.

## Demo 🚀

You can download the [APK]() here or see a demo for [iOS]() and [Android]().

## Application Structure 🏗️

The Stocks App is structured into several key components, each responsible for a distinct part of the application's functionality:

- **Navigation**: The app provides support for multiple navigation. In this first version, there was included a main stack navigator that uses a bottom tab navigator to display the main screen. This was designed this way considering the addition of Auth features (to be handled by a separate navigator) later on.
  
- **Store**: It saves and maintains the latest information for symbols and watchlist, it also triggers the necessary notifications.

- **Localization**: Different directories to save and implement the necessary text inside the application. This was implemented considering scalability for multi-language support.

- **Types**: Type management and interface design to make communication between components and services easier.

## Technologies Used 📱

- **React Native**: A JavaScript library for building mobile applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Charts**: `react-native-svg-charts` Simple yet flexible JavaScript charting for developers.
- **Notifications**: `react-native-push-notification` and `@react-native-community/push-notification-ios` to support local notifications sent by the application when the price is reached.

## Development Dependencies 🔧

- **@babel/core**: ^7.20.0
- **@babel/preset-env**: ^7.20.0
- **@babel/runtime**: ^7.20.0
- **@react-native/babel-preset**: 0.73.21
- **@react-native/eslint-config**: 0.73.2
- **@react-native/metro-config**: 0.73.5
- **@react-native/typescript-config**: 0.73.1
- **@types/react**: ^18.2.6
- **@types/react-native-push-notification**: ^8.1.4
- **@types/react-native-vector-icons**: ^6.4.18
- **@types/react-test-renderer**: ^18.0.0
- **babel-jest**: ^29.6.3
- **eslint**: ^8.19.0
- **jest**: ^29.6.3
- **prettier**: 2.8.8
- **react-test-renderer**: 18.2.0
- **typescript**: 5.0.4

## Stock Options 🗂️

The application tracks the following stocks:

- AAPL 🍏
- GOOGL 🖥️
- BINANCE:BTCUSDT ₿
- IC MARKETS:1 📈
- MSFT 💼
- AMZN 🛒
- BYND 🌱
- UPOW 🔋
- EXCOF 🏭
- FSLY 🚀
- AMD 🖥️
- TSLA 🚗

>**Note**: Due to some lack of information in all the stocks coming from the Finnhub API, not all the symbols are being listed on the main dropdown component, although, the request to populate the dropdown with that information was designed and included and was left commented into the document for reference purposes.

## Local Push Notifications and Alerts 📲

The application sends local push notifications when the price set for an alert is passed, only one notification will be sent to not annoy the user by sending multiple notifications at once. If the user updates the price for a previously added symbol, even if the user was updated for the old price, a new notification will be sent to notify for the current price.

On the other hand, if a price set for an alert was already reached and the user was already notified, this information will also be displayed in the price tracker component.

## HOW TO RUN 💻

>**Note**: During my development process, all the libraries were installed using only yarn because of this, I recommend using yarn instead of npm.


#### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

#### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

##### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#####  For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Credits 
Special thanks to [Finnhub](https://finnhub.io/) for providing free access to their API. For more information on the Finnhub API, visit their [documentation](https://finnhub.io/docs/api/introduction).