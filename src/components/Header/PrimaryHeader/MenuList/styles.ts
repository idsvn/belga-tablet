import { StyleSheet } from 'react-native';

import { heightScreen } from 'src/utils/systemUtils';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: heightScreen,
    position: 'absolute',
    top: 91,
    zIndex: 1000,
    left: 0,
    right: 0,
  },
});

export default styles;
