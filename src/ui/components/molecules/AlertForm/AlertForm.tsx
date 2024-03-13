import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';
import {WatchListItem} from '../../../../data/store/types/types';
import {AppContext} from '../../../../data/store/Context';
import AddAlertFormStyles from './AddAlertForm.style';
import Input from '../../atoms/Inputs/Input';
import defaultStrings from '../../../../localization/default';
import {getnumericValueInputProps} from '../../../forms';
import CustomDropdown from '../../atoms/DropDown/DropDown';
import CustomButton from '../../atoms/Button/Button';
import InformationCard from '../InformationCard/InformationCard';

const AlertForm = ({symbols}: {symbols: any[]}) => {
  const [symbol, setSymbol] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(0);
  const [priceInputError, setPriceInputError] = useState<string | null>(null);
  const [lastAdded, setLastAdded] = useState<WatchListItem | null>();

  const {addToWatchList} = useContext(AppContext);

  const styles = AddAlertFormStyles;
  const isButtonDisabled = () => {
    return symbol == null || (price ?? '').toString().length <= 0;
  };
  const setAlert = () => {
    let item: WatchListItem = {
      price: price ?? 0,
      symbol: symbol?.toString() ?? '',
      currentPercentage: 0,
      currentValue: 0,
      history: [],
    };
    setLastAdded(item);
    addToWatchList(item);
  };
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
        disabled={isButtonDisabled()}
        onPress={setAlert}
      />

      {/* {lastAdded && <InformationCard stock={lastAdded} />} */}
    </ScrollView>
  );
};

export default AlertForm;
