import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.paddingVerticalContent,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  sectionHeader: {
    borderBottomColor: theme.colors.gray400,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
  },
  sectionDescription: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.gray,
  },
  settingsContainer: {
    paddingVertical: theme.spacing.paddingVerticalContent,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingItemText: {
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
  },
  button: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
  dropdown: {
    marginVertical: 10,
    height: 40,
    width: '24%',
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});

export default styles;
