import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    top: -30,
    left: 30,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flexDirection: 'row',
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pageList: {
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  pageItem: {
    justifyContent: 'center',
  },
  pageImage: {
    width: 100,
    height: 150,
  },
  pageText: {
    color: '#ffffff',
  },
});

export default styles;
