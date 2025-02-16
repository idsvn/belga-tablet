import { StyleSheet } from 'react-native';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 24,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 40,
    color: colors.black,
  },
  subTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
    color: colors.gray,
  },
  live: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  redCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.red1,
  },
  liveTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 20,
    color: colors.red1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  searchView: {
    flex: 1,
    borderRadius: 50,
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors.gray400,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    marginVertical: 10,
    height: 55,
    flex: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray400,
  },
  dropDownContainer: {
    paddingHorizontal: 10,
    flex: 1.5,
    flexDirection: 'row',
    gap: 10,
  },
  tabBarContainer: {
    flexDirection: 'row',
    color: colors.primary,
    borderBottomWidth: 1,
    borderColor: colors.gray400,
  },
  tabBarLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    color: colors.primary,
    padding: 16,
    borderBottomWidth: 2,
  },
  tabBarBody: {
    flex: 1,
  },
  tabBarBodyHeader: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  allItems: {
    flex: 1,
    fontSize: 28,
    fontWeight: 600,
    fontFamily: fontFamily.semiBold,
  },
  lastUpdateTime: {},
  dropdownText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primary,
    flex: 1,
  },
  dropdownCheckbox: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
});

export default styles;
