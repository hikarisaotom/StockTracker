import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {dropdownStyles} from './DropDown.style';
import {Dropdown} from 'react-native-element-dropdown';
import defaultStrings from '../../../../localization/default';
import {DesignTokens} from '../../../theme';
// import {Text} from 'react-native-paper';

interface DropdownProps {
  onSelected?: ((value: any) => void) | undefined;
  selectedText?: any | null;
  placeHolder?: string;
  dataList: any[];
  valueToDisplay: string | number | symbol;
  valueToSave: string | number | symbol;
  label?: string;
}
const CustomDropdown = ({
  onSelected,
  selectedText,
  dataList,
  placeHolder = defaultStrings.dropdown.placeholder,
  valueToDisplay,
  valueToSave,
  label,
}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={dropdownStyles().margin}>
      {label && <Text style={[dropdownStyles().label]}>{label}</Text>}
      <Dropdown
        style={[dropdownStyles().dropdown]}
        placeholderStyle={dropdownStyles().placeholderStyle}
        selectedTextStyle={dropdownStyles().selectedTextStyle}
        inputSearchStyle={dropdownStyles().inputSearchStyle}
        iconStyle={dropdownStyles().iconStyle}
        itemTextStyle={dropdownStyles().selectedTextStyle}
        containerStyle={dropdownStyles().containerStyle}
        activeColor={DesignTokens.color.primary}
        data={dataList}
        search
        maxHeight={300}
        labelField={valueToDisplay}
        valueField={valueToSave}
        placeholder={!isFocus ? placeHolder : selectedText}
        searchPlaceholder={defaultStrings.dropdown.search}
        value={selectedText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        mode="default"
        onChange={item => {
          onSelected && onSelected(item[valueToSave]);
          setIsFocus(false);
        }}
        selectedTextProps={{numberOfLines: 1}}
      />
    </View>
  );
};

export default CustomDropdown;
