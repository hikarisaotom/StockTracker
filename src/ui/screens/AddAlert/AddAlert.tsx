import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loader from '../../components/atoms/Loader/Loader';
import {API_KEY} from 'react-native-dotenv';
import AddAlertStyles from './AddAlert.style';
import AlertForm from '../../components/molecules/AlertForm/AlertForm';
function AddAlert() {
  const isDarkMode = useColorScheme() === 'dark';
  const [symbols, setSymbols] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = AddAlertStyles;
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=' + API_KEY,
        );
        const data = await response.json();
        setSymbols(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching symbols:', error);
      }
    };

    fetchSymbols();
  }, []);
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
