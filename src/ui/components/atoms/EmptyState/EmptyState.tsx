import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {EmptyStateStyles} from './EmptyState.style';
import { DesignTokens } from '../../../theme';

interface EmptyStateProps {
  icon?: string;
  iconSize?: number;
  text?: string;
  marginBottom?: number;
  marginTop?: number;
}

const EmptyState = ({
  icon = 'info',
  text,
  iconSize = 50,
  marginBottom,
  marginTop,
}: EmptyStateProps) => {
  const styles = EmptyStateStyles;

  return (
    <View
      style={[
        styles.container,
        {marginTop: marginTop, marginBottom: marginBottom},
      ]}>
      <Icon color={DesignTokens.color.white} size={iconSize} name={icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyState;
