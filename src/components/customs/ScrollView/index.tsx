import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export default (props: ScrollViewProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      {...props}
    >
      {props.children}
    </ScrollView>
  );
};
