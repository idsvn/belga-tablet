import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
  },
  subTitleText: {
    fontSize: 30,
    textAlign: 'center',
  },
  imageView: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  bannerImage: {},
  footerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderWidth: 3,
    borderColor: theme.colors.lightGray,
  },
  separatorActive: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  signInButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  signInText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  guestButton: {
    alignItems: 'center',
    marginTop: 5,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
  },
  guestButtonText: {
    color: theme.colors.primary,
    fontSize: 24,
  },
});

export default styles;
