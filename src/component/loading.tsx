import React from 'react';
import { ActivityIndicator } from 'react-native';

type RNIActivityIndicatorProps = React.ComponentProps<typeof ActivityIndicator>;

export function BaseActivityIndicator(props: RNIActivityIndicatorProps) {
  const { color = 'blue', ...rest } = props;
  return <ActivityIndicator color={color} {...rest} />;
}

export default BaseActivityIndicator;
