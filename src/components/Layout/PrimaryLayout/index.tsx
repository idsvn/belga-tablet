import React from 'react';
import { SafeAreaView, View } from 'react-native';

import MyStatusBar from 'components/MyStatusBar';

import { PrimaryLayoutProps } from './types';

const PrimaryLayout = (props: PrimaryLayoutProps) => {
  const { barStyle, style, children, Header } = props;

  return (
    <>
      <MyStatusBar
        backgroundColor={props.statusBarBackgroundColor || 'white'}
        barStyle={barStyle || 'dark-content'}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {Header}
        <View style={[style, { flex: 1 }]}>{children}</View>
      </SafeAreaView>
    </>
  );
};

export default PrimaryLayout;
