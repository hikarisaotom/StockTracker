import React from 'react';
import {ActivityIndicator} from 'react-native';
import {DesignTokens} from '../../../theme';

interface LoaderProps {
  color?: string;
  size?: number | 'small' | 'large';
}

const Loader = ({color, size}: LoaderProps) => {
  return (
    <ActivityIndicator
      size={size}
      color={color || DesignTokens.color.success}
    />
  );
};

export default Loader;
