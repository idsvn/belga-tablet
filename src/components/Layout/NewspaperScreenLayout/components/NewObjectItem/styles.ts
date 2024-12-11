import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray400,
    paddingBottom: 20,
    justifyContent: 'flex-start',
  },
  buttonGroup: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    right: 20,
    top: -10,
    justifyContent: 'flex-end',
  },
});

export default styles;
