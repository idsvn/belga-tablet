import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    position: 'absolute',
    top: 90,
    zIndex: 1000,
    left: 0,
    right: 0,
  },
});

export default styles;
