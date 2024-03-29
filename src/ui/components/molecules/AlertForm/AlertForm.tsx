import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {WatchListItem} from '../../../../data/store/types/types';
import {AppContext} from '../../../../data/store/Context';
import AddAlertFormStyles from './AddAlertForm.style';
import Input from '../../atoms/Inputs/Input';
import defaultStrings from '../../../../localization/default';
import {getnumericValueInputProps} from '../../../forms';
import CustomDropdown from '../../atoms/DropDown/DropDown';
import CustomButton from '../../atoms/Button/Button';
import InformationCard from '../InformationCard/InformationCard';
import EmptyState from '../../atoms/EmptyState/EmptyState';
import alertStrings from '../../../../localization/alert';
const AlertForm = ({symbols}: {symbols: any[]}) => {
  const [symbol, setSymbol] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(0);
  const [priceInputError, setPriceInputError] = useState<string | null>(null);
  const [lastAdded, setLastAdded] = useState<WatchListItem | undefined>(undefined);

  const {watchList, addToWatchList} = useContext(AppContext);
  const styles = AddAlertFormStyles;
  const isButtonDisabled = () => {
    return (
      symbol == null || (price ?? '').toString().length <= 0 || priceInputError
    );
  };

  useEffect(() => {
    setLastAdded(
      watchList.find(item => item.symbol === symbol?.toString() ?? ''),
    );
  }, [symbol, watchList]);

  const setAlert = () => {
    let item: WatchListItem = {
      price: price ?? 0,
      symbol: symbol?.toString() ?? '',
      marginPercentage: 0,
      currentValue: 0,
      history: [],
      change: 0,
    };
    addToWatchList(item);
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.subContainer}>
        <Text style={styles.title}> {alertStrings.form.title}</Text>
        <Text style={styles.description}> {alertStrings.form.description}</Text>
        <Input
          containerStyle={styles.smallMargin}
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
          disabled={isButtonDisabled()}
          onPress={setAlert}
          containerStyle={styles.smallMargin}
        />

        {watchList.length > 0 && lastAdded ? (
          <InformationCard stock={lastAdded} />
        ) : (
          <EmptyState text={alertStrings.form.empty} />
        )}
      </View>
    </View>
  );
};

export default AlertForm;
