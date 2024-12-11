import React from 'react';
import {
  ColorValue,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
} from 'react-native';

interface MyStatusBarProps extends StatusBarProps {
  backgroundColor?: ColorValue;
}

const MyStatusBar: React.FC<MyStatusBarProps> = (props) => (
  <View style={[styles.statusBar, { backgroundColor: props.backgroundColor }]}>
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={props.backgroundColor || 'transparent'}
        {...props}
      />
    </SafeAreaView>
  </View>
);

export default MyStatusBar;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
