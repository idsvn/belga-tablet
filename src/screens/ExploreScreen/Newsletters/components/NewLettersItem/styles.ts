import { StyleSheet } from 'react-native';

import theme from 'src/themes';
import fontFamily from 'src/themes/fontFamily';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: theme.colors.gray400,
    borderBottomWidth: 1,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  titleText: {
    color: theme.colors.gray100,
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionContainer: {
    flex: 1,
    paddingRight: 20,
  },
  byBelgaText: {
    color: theme.colors.gray100,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    paddingTop: 8,
  },
  dateText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: theme.colors.gray100,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
  },
  recurringView: {
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  recurringText: {
    color: theme.colors.gray100,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.extraBold,
    fontSize: 12,
  },
});

export default styles;
