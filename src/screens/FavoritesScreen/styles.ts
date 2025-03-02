import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  contentView: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: theme.spacing.marginVerticalContent * 2,
  },
  titleText: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
  },
  searchContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 10,
  },
  searchView: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.gray400,
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 30,
    width: '90%',
    fontSize: 16,
  },
  flatList: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  checkboxView: {
    backgroundColor: theme.colors.background,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 5,
  },
});

export default styles;
