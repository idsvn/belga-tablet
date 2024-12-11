import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
    flex: 1,
  },
  profileContainer: {
    marginVertical: theme.spacing.marginVerticalContent * 2,
  },
  profileName: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
  },
  menuContainer: {
    width: '100%',
    marginTop: 20,
    borderTopColor: theme.colors.gray400,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  menuList: {
    width: '30%',
    borderRightColor: theme.colors.gray400,
    borderRightWidth: 1,
    height: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
  },
  tabContainer: {
    width: '70%',
    height: '100%',
  },
});

export default styles;
