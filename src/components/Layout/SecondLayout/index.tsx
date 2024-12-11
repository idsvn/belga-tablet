import React from 'react';
import {
  ColorValue,
  SafeAreaView,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import PrimaryHeader from 'components/Header/PrimaryHeader';
import MyStatusBar from 'components/MyStatusBar';

interface Props {
  statusBarBackgroundColor?: ColorValue;
  barStyle?: null | StatusBarStyle | undefined;
  style?: StyleProp<ViewStyle>;
  goBack?(): void;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  option?: JSX.Element;
}
const SecondLayout = (props: Props) => {
  return (
    <>
      <MyStatusBar
        backgroundColor={props.statusBarBackgroundColor || 'white'}
        barStyle={props.barStyle || 'dark-content'}
      />
      <SafeAreaView style={[{ flex: 1 }]}>
        <PrimaryHeader />
        <View style={[props.style, { flex: 1 }]}>{props.children}</View>
      </SafeAreaView>
    </>
  );
};

export default SecondLayout;
