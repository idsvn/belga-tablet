import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  checkBoxView: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxActive: {
    borderColor: theme.colors.primary,
  },
});

export default styles;
