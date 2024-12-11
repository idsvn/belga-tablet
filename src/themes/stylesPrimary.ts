import { StyleSheet } from 'react-native';

import colors from './colors';

const stylesPrimary = StyleSheet.create({
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 6,
    backgroundColor: '#fff',
  },
});

export default stylesPrimary;
