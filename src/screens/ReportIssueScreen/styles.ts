import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  headerText: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.gray100,
  },
  inputContainer: {
    marginTop: 40,
  },
  textInput: {
    width: '100%',
    height: 54,
    borderColor: theme.colors.gray400,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  charCountText: {
    marginTop: 5,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.gray,
  },
  reportButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    width: 160,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  reportButtonText: {
    color: theme.colors.textWhite,
    fontWeight: 'bold',
  },
  reportButtonIcon: {
    marginLeft: 5,
  },
});

export default styles;
