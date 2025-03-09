import { StyleSheet } from 'react-native';

import theme from 'src/themes';
import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
    paddingTop: theme.spacing.paddingVerticalContent,
  },
  backButton: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButtonText: {
    color: theme.colors.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: fontFamily.semiBold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  searchView: {
    flex: 1,
    borderRadius: 50,
    flexDirection: 'row',
    gap: 20,
    backgroundColor: colors.gray400,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray400,
    borderTopColor: colors.gray400,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 24,
    fontFamily: fontFamily.semiBold,
    color: colors.gray100,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
  },
  checkboxView: {
    backgroundColor: theme.colors.background,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 5,
  },
});

export default styles;
