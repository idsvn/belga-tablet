import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import theme from 'src/themes';

export default (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Text> &
    Readonly<TextProps>,
) => {
  const {
    color = theme.colors.textPrimary,
    fontSize = theme.fontSize.small,
    fontFamily = theme.fontFamily.medium,
  } = StyleSheet.flatten(props.style || {});

  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        props.style,
        {
          fontFamily,
          color,
          fontSize,
        },
      ]}
    >
      {props.children}
    </Text>
  );
};
