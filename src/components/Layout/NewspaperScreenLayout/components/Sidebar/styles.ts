import { StyleSheet } from 'react-native';

import { heightScreen } from 'src/utils/systemUtils';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000,
  },
  listView: {
    backgroundColor: theme.colors.background,
    height: heightScreen,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  articleView: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray400,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingBottom: 10,
  },
  articleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.gray,
  },
});

export default styles;
