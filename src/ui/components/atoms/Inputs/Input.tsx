import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {inputStyles} from './Input.style';
import defaultStrings from '../../../../localization/default';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  labelStyle?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  withSuccess?: boolean;
  withError?: boolean;
  disabled?: boolean;
  accessoryLeft?: string | JSX.Element;
  onAccessoryLeftPress?: () => void;
  accessoryRight?: string | JSX.Element;
  onAccessoryRightPress?: () => void;
  iconStyle?: TextStyle;
  required?: boolean;
  value?: string;
  regexp?: RegExp;
  errorMessage?: string;
  error?: string | null;
  onError?: (error: string | null) => void;
  onChangeText?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean;
  onHandleEndEditing?: () => void;
  placeholderColor?: string;
  canClean?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      containerStyle,
      inputContainerStyle,
      labelStyle,
      inputStyle: inputStylesProps,
      withError = false,
      withSuccess = false,
      disabled = false,
      required = false,
      value,
      regexp,
      errorMessage,
      error = null,
      onError,
      onChangeText,
      secureTextEntry = false,
      onHandleEndEditing,
      placeholderColor,
      placeholder,
      canClean = true,
      ...rest
    },
    ref,
  ) => {
    const [showWithError, setShowWithError] = useState(withError);
    const [entryVisible, setEntryVisible] = useState(!secureTextEntry);
    const [newEntryToValidate, setNewEntryToValidate] = useState(value ?? '');
    const [inputValue, setInputValue] = useState(value ?? '');
    const [isFocused, setIsFocused] = useState(false);
    const [lostFocusCounter, setLostFocusCounter] = useState(0);
    const inputValueExists =
      inputValue.length > 0 ||
      (inputValue.length < 1 && required && lostFocusCounter > 1);

    const showError = () =>
      (showWithError || error !== null) && (inputValueExists || withError);

    const toggleError = useCallback(
      (show: boolean, errorText: string | null = null) => {
        if (onError) {
          onError(errorText);
          setShowWithError(show);
        }
      },
      [onError],
    );
    const validateFormat = useCallback(
      valueToValidate => {
        validateInputFormat(
          required,
          toggleError,
          regexp,
          errorMessage,
          valueToValidate,
          onHandleEndEditing,
        );
      },
      [required, toggleError, regexp, errorMessage, onHandleEndEditing],
    );

    const AddError = useCallback((isFocus: boolean, counter: number) => {
      if (onError) {
        if (!isFocus && required) {
          setLostFocusCounter(counter + 1);
          onError(defaultStrings.error.required);
        }
      }
    }, []);

    const validateOnChangeText = (text: string) => {
      onChangeText && onChangeText(text);
      setNewEntryToValidate(text);
      setInputValue(text);
    };
    useEffect(() => {
      validateFormat(newEntryToValidate);
    }, [newEntryToValidate, validateFormat]);

    useEffect(() => {
      AddError(isFocused, lostFocusCounter);
    }, [isFocused, AddError]);
    const validateInputFormat = (
      required: boolean,
      toggleError: (show: boolean, formatMessage?: string) => void,
      regexp?: RegExp,
      errorMessage?: string,
      value?: string,
      onHandleEndEditing?: () => void,
    ) => {
      if (regexp && value) {
        if (!regexp.test(value)) {
          toggleError(true, errorMessage);
        } else {
          toggleError(false);
        }
      } else if ((!value || value === '') && required) {
        toggleError(true, defaultStrings.error.required);
      } else {
        toggleError(false);
      }
      onHandleEndEditing && onHandleEndEditing();
    };
    const getIconOrJsx = (element: string | JSX.Element) => {
      switch (typeof element) {
        case 'string':
          return <></>;
        case 'object':
          return element;
        default:
          return <></>;
      }
    };

    const toogleFocused = (focused: boolean) => {
      if (!focused && !!newEntryToValidate) {
        setIsFocused(true);
      } else {
        setIsFocused(focused);
      }
    };

    const returnValueProp = (): InputProps => {
      if (value) {
        return {
          value: value,
        };
      } else {
        return {
          value: '',
        };
      }
    };

    const clearInput = () => {
      if (value) {
        validateOnChangeText('');
      }
      setInputValue('');
    };

    const displayCleanButton =
      (!!value || inputValue !== '') && !secureTextEntry && canClean;

    const ClearInputComponent = () => {
      return (
        <TouchableOpacity disabled={disabled} onPress={clearInput}>
          {getIconOrJsx('close-circle')}
        </TouchableOpacity>
      );
    };

    const getPlaceholderText = () => {
      if (!isFocused && label) {
        return label;
      }
      return placeholder ? placeholder : '';
    };

    const getPlaceholderTextColor = () => {
      if (showError()) {
        return inputStyles().inputError.color;
      }
      if (withSuccess) {
        return inputStyles().inputSuccess.color;
      }
      if (disabled) {
        return inputStyles().inputDisabled.color;
      }

      return placeholderColor || inputStyles().placeholder.color;
    };

    return (
      <View style={[containerStyle]}>
        <View
          style={[
            inputStyles().inputContainer,
            showError() && inputStyles().inputContainerError,
            withSuccess && inputStyles().inputContainerSuccess,
            disabled && inputStyles().inputContainerDisabled,
            inputContainerStyle,
          ]}>
          {label && (
            <Text
              style={[
                inputStyles().placeholder,
                showError() && inputStyles().labelError,
                withSuccess && inputStyles().labelSuccess,
                disabled && inputStyles().labelDisabled,
                isFocused || value
                  ? inputStyles().placeholderLabelFocused
                  : inputStyles().placeholderLabel,
                labelStyle,
              ]}>
              {label}
            </Text>
          )}
          <TextInput
            style={[
              inputStyles().input,
              showError() && inputStyles().inputError,
              withSuccess && inputStyles().inputSuccess,
              disabled && inputStyles().inputDisabled,
              inputStylesProps,
              label && (isFocused || value) ? {top: 10} : null,
            ]}
            placeholderTextColor={getPlaceholderTextColor()}
            placeholder={getPlaceholderText()}
            editable={!disabled}
            {...returnValueProp()}
            onChangeText={text => validateOnChangeText(text)}
            onFocus={() => toogleFocused(true)}
            onBlur={() => toogleFocused(false)}
            secureTextEntry={!entryVisible}
            onEndEditing={e => validateFormat(e.nativeEvent.text)}
            ref={ref}
            {...rest}
          />
          {displayCleanButton && <ClearInputComponent />}
        </View>
        {error && inputValueExists && (
          <View>
            <Text
              style={[
                inputStyles().label,
                inputStyles().labelError,
                inputStyles().bottomLabelError,
              ]}>
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  },
);

export default Input;
