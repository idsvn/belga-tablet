import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    height: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.gray100,
  },
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.marginHorizontalContent * 2,
    gap: 10,
  },
  leftView: {
    flexDirection: 'row',
  },
});

export default styles;
