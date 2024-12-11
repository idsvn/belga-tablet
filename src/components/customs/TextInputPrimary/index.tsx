import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput as TextInputCore,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import CloseSvg from 'src/assets/svg/close-icon.svg';
import VisibleOffSvg from 'src/assets/svg/off-eye-icon.svg';
import VisibleSvg from 'src/assets/svg/visible-eye-icon.svg';

import theme from 'src/themes';

import TextInput from '../TextInput';

import styles from './styles';

type TextInputCoreType = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<TextInputCore> &
  Readonly<TextInputProps>;

interface TextInputCustomProps extends TextInputCoreType {
  isPassword?: boolean;
  isClear?: boolean;
}

const TextInputPrimary = (props: TextInputCustomProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { isClear = true, isPassword = false } = props;

  const {
    color = theme.colors.textNormal,
    fontSize = theme.fontSize.small,
    fontFamily = theme.fontFamily.medium,
    width = '100%',
    paddingRight = 45,
  } = StyleSheet.flatten(props.style || {});

  const toggleVisible = () => setVisible(!visible);

  return (
    <View>
      <TextInput
        {...props}
        secureTextEntry={!visible && isPassword}
        allowFontScaling={false}
        placeholderTextColor={theme.colors.placeholderTextInput}
        style={[
          props.style,
          { fontFamily, color, fontSize, width, paddingRight },
        ]}
      >
        {props.children}
      </TextInput>
      <View style={styles.buttonGroupView}>
        {props.value && isClear && (
          <TouchableOpacity
            onPress={() => props?.onChangeText?.('')}
            style={styles.buttonClear}
          >
            <CloseSvg width={10} height={10} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <TouchableOpacity
            style={styles.buttonVisiblePassword}
            onPress={toggleVisible}
          >
            {visible ? (
              <VisibleOffSvg
                width={18}
                height={18}
                color={theme.colors.textNormal}
              />
            ) : (
              <VisibleSvg
                width={18}
                height={18}
                color={theme.colors.textNormal}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInputPrimary;
