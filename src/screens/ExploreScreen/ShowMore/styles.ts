import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 25,
    color: theme.colors.black,
    fontFamily: theme.fontFamily.semiBold,
    fontWeight: 'bold',
  },
  showMoreText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: theme.fontFamily.semiBold,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  showMoreButton: {
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.primary,
  },
});

export default styles;
