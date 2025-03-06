import { StyleSheet } from 'react-native';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
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
  header: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.gray,
    paddingTop: 18,
    paddingBottom: 24,
  },
  sectionList: {
    paddingTop: 24,
    marginTop: 30,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
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
    alignSelf: 'flex-start',
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
    textTransform: 'capitalize',
    flex: 1,
  },
  dropdownCheckbox: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  filterButton: {
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  listSearchHeaderContainer: {},
  resultFoundText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.gray,
    paddingBottom: 8,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  selectAllText: {
    fontSize: 13,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  sortDropdown: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  sortPlaceholderText: {
    fontSize: 14,
    color: colors.gray100,
    fontFamily: fontFamily.regular,
  },
  sortSelectedText: {
    fontSize: 14,
    color: colors.black, // Hoặc colors.darkBlue200 để đậm hơn
    fontFamily: fontFamily.bold,
  },
  sortItemText: {
    fontSize: 14,
    color: colors.gray100,
    fontFamily: fontFamily.regular,
    paddingVertical: 8,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default styles;
