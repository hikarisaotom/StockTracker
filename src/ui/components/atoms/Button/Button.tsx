import React from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {buttonStyles} from './Buttons.style';
import Loader from '../Loader/Loader';

export interface ButtonProps extends Omit<Partial<PressableProps>, 'style'> {
  text: string;
  withShadow?: boolean;
  colors?: (string | number)[];
  containerStyle?: ViewStyle;
  accessoryLeft?: string | JSX.Element;
  accessoryRight?: string | JSX.Element;
  iconStyle?: TextStyle;
  onPress?: () => void;
  disabledWithoutStyle?: boolean;
  withGradient?: boolean;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const CustomButton = ({
  text,
  containerStyle,
  disabled = false,
  onPress,
  disabledWithoutStyle = false,
  textStyle,
  isLoading = false,
  ...rest
}: ButtonProps) => {
  const eventOnPress = () => {
    if (onPress) {
      onPress();
    }
  };

  const renderContent = (pressed: boolean) => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <Text
          style={[
            pressed
              ? buttonStyles().buttonTextPressed
              : buttonStyles().buttonTextNotPressed,
            disabled && buttonStyles().buttonTextDisable,
            textStyle,
          ]}>
          {text}
        </Text>
      </>
    );
  };

  return (
    <Pressable
      style={({pressed}) => [
        pressed
          ? buttonStyles().buttonPressed
          : buttonStyles().buttonNotPressed,
        (disabled || isLoading) && buttonStyles().buttonDisabled,
        buttonStyles().radius,
        buttonStyles().button,
        containerStyle,
      ]}
      disabled={disabled || disabledWithoutStyle || isLoading}
      onPress={eventOnPress}
      {...rest}>
      {({pressed}) => (
        <View style={[buttonStyles().buttonContainer]}>
          {renderContent(pressed)}
        </View>
      )}
    </Pressable>
  );
};

export default CustomButton;
