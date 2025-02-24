import { StyleSheet } from 'react-native';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

export const styles = StyleSheet.create({
  calendar: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  quickSelect: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginTop: 20,
  },
  quickButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    margin: 5,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
  },
  dateText: {
    color: colors.gray100,
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  close: {
    color: colors.gray200,
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  apply: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fontFamily.medium,
  },
  applyButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
