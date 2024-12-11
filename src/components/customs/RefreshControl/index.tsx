import React from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';

import theme from 'src/themes';

export default (props: RefreshControlProps) => (
  <RefreshControl
    colors={[theme.colors.primary]}
    tintColor={theme.colors.primary}
    {...props}
  />
);
