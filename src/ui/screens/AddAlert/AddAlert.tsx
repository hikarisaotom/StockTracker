import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loader from '../../components/atoms/Loader/Loader';
import AddAlertStyles from './AddAlert.style';
import AlertForm from '../../components/molecules/AlertForm/AlertForm';
function AddAlert() {
  const isDarkMode = useColorScheme() === 'dark';
  const [symbols, setSymbols] = useState([
    {symbol: 'AAPL', description: 'Apple Inc.'},
    {symbol: 'GOOGL', description: 'Alphabet Inc.'},
    {symbol: 'BINANCE:BTCUSDT', description: 'Bitcoin to USDT'},
    {symbol: 'IC MARKETS:5', description: 'IC Markets 5'},
    {symbol: 'IC MARKETS:2', description: 'IC Markets 2'},
    {symbol: 'IC MARKETS:1', description: 'IC Markets 1'},
    {symbol: 'MSFT', description: 'Microsoft Corporation'},
    {symbol: 'AMZN', description: 'Amazon.com Inc.'},
    {symbol: 'BYND', description: 'Beyond Meat Inc.'},
    {symbol: 'UPOW', description: 'Upown Energy Inc.'},
    {symbol: 'EXCOF', description: 'Example Company'},
    {symbol: 'FSLY', description: 'Fastly Inc.'},
    {symbol: 'AMD', description: 'Advanced Micro Devices Inc.'},
    {symbol: 'TSLA', description: 'Tesla Inc.'},
  ]);
  const [loading, setIsLoading] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = AddAlertStyles;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loading ? <Loader /> : <AlertForm symbols={symbols ?? []} />}
    </SafeAreaView>
  );
}

export default AddAlert;
