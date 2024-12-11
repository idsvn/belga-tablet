import React, { forwardRef, useRef } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';

import theme from 'src/themes';

const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const {
    color = theme.colors.textRegular,
    fontSize = theme.fontSize.small,
    fontFamily = theme.fontFamily.medium,
    width = '100%',
  } = StyleSheet.flatten(props.style || {});

  const textRef = useRef<RNTextInput>(null);

  return (
    <RNTextInput
      {...props}
      ref={ref || textRef}
      allowFontScaling={false}
      placeholderTextColor={
        props?.placeholderTextColor || theme.colors.placeholderTextInput
      }
      style={[props.style, { fontFamily, color, fontSize, width }]}
    >
      {props.children}
    </RNTextInput>
  );
});

export default TextInput;
