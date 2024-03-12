import defaultStrings from '../../localization/default';
import {InputProps} from '../components/atoms/Inputs/Input';

export const getnumericValueInputProps = (): InputProps => {
  return {
    keyboardType: 'numeric',
    regexp: /^\d+(\.\d+)?$/,
    errorMessage: defaultStrings.error.invalidValue,
  };
};
