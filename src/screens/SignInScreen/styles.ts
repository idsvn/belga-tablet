import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20%',
    marginVertical: '20%',
  },
  titleText: {
    fontSize: 30,
    color: theme.colors.gray,
  },
  inputView: {
    width: '100%',
    marginTop: '10%',
  },
  inputText: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 5,
  },
  inputLabelText: {
    fontSize: 15,
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  rememberText: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  signInButton: {
    marginTop: 50,
  },
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  newUserText: {
    color: theme.colors.gray,
    fontSize: 15,
  },
  registerText: {
    fontSize: 15,
    color: theme.colors.darkBlue200,
  },
  dropdown: {
    marginVertical: 20,
    height: 50,
    width: '20%',
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
  },
});

export default styles;
