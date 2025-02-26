import { StyleSheet } from 'react-native';

import theme from 'src/themes';
import colors from 'src/themes/colors';

const styles = StyleSheet.create({
  container: {},
  imageView: {
    shadowColor: colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
  },
  titleUnReadText: {
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 15,
    color: theme.colors.gray,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
    paddingLeft: 5,
    marginTop: 5,
  },
  dotView: {
    height: 10,
    width: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
  },
});

export default styles;
