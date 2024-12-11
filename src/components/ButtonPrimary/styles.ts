import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  titleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default styles;
