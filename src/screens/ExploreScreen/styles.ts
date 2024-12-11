import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
    paddingVertical: theme.spacing.paddingVerticalContent,
    marginTop: 2,
  },
});

export default styles;
