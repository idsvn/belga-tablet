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
    paddingTop: 16,
    paddingHorizontal: 16,
    fontFamily: fontFamily.semiBold,
    fontSize: 36,
    flexShrink: 1,
  },
  subTitle: {
    paddingTop: 12,
    paddingHorizontal: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.gray,
    fontSize: 24,
    flexShrink: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    width: '90%',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray400,
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
  contentContainer: {
    paddingTop: 20,
    width: '90%',
  },
});

export default styles;
