import { StyleSheet } from 'react-native';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  headerNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 70,
    gap: 10,
    maxWidth: '50%',
  },
  headerBackground: {
    height: 200,
    backgroundColor: colors.primary,
    paddingTop: 20,
  },
  newsLetter: {
    fontFamily: fontFamily.semiBold,
    textDecorationLine: 'underline',
    fontSize: 18,
    color: 'white',
  },
  letterName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: 'white',
  },
  body: {
    top: -120,
    alignItems: 'center',
  },
  coverImage: {
    width: '90%',
    borderRadius: 10,
    height: 200,
  },
  titleContainer: {
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 105,
    borderRadius: 15,
    height: 105,
    borderWidth: 6,
    borderColor: 'white',
    top: -20,
  },
  title: {
    padding: 16,
    fontFamily: fontFamily.semiBold,
    fontSize: 36,
    flexShrink: 1,
  },
});

export default styles;
