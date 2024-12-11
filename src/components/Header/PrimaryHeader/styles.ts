import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    // backgroundColor: 'red',
    height: 90,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '30%',
  },
  menuText: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.black,
  },
  searchView: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    width: '70%',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 40,
    width: '90%',
    fontSize: 16,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 14,
    marginLeft: theme.spacing.marginHorizontalContent - 35,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.textBold,
    textAlign: 'center',
    alignSelf: 'center',
  },
  wrapperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoVNImage: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },
});

export default styles;
