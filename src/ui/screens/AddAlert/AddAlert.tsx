import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Input from '../../components/atoms/Inputs/Input';
import CustomButton from '../../components/atoms/Button/Button';
import CustomDropdown from '../../components/atoms/DropDown/DropDown';
import Loader from '../../components/atoms/Loader/Loader';
import defaultStrings from '../../../localization/default';
import {API_KEY} from 'react-native-dotenv';
import AddAlertStyles from './AddAlert.style';
import {getnumericValueInputProps} from '../../forms';
import InformationCard from '../../components/molecules/InformationCard';
function AddAlert() {
  const isDarkMode = useColorScheme() === 'dark';
  const [symbol, setSymbol] = useState<string | null>(null);
  const [item, setItem] = useState<any | null>(null);
  const [price, setPrice] = useState<number | null>(0);
  const [priceInputError, setPriceInputError] = useState<string | null>(null);
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

  const form = () => {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.subContainer}>
        <Input
          value={price}
          onChangeText={setPrice}
          placeholder={defaultStrings.input.placeholder}
          required
          error={priceInputError}
          onError={setPriceInputError}
          {...getnumericValueInputProps()}
          testID="price"
        />
        <CustomDropdown
          selectedText={symbol}
          onSelected={setSymbol}
          dataList={symbols}
          valueToDisplay="description"
          valueToSave="symbol"
        />
        <CustomButton
          text={defaultStrings.button.subscribe}
          onPress={() => {
            const result = symbols.find(item => item.symbol === symbol);
            setItem(result);
            console.log(result);
          }}
        />

        {item && <InformationCard alertPrice={price} symbol={item?.symbol} />}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {loading ? <Loader /> : form()}
    </SafeAreaView>
  );
}

export default AddAlert;
