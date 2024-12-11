import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  menuItemText: {
    fontSize: 24,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray,
  },
});

export default styles;
