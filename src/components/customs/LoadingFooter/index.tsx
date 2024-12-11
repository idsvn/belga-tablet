import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import theme from 'src/themes';

const LoadingFooter = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <View
      style={{
        marginVertical: 5,
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  ) : (
    <></>
  );
};

export default LoadingFooter;
