import { StyleSheet } from 'react-native';

import theme from 'src/themes';
import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

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
    paddingTop: 20,
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  reportButtonText: {
    color: theme.colors.textWhite,
    fontWeight: 'bold',
    fontSize: 20,
  },
  copyContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 10,
  },
  copyField: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: 'center',
  },
  linkCopyText: {
    color: colors.gray100,
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
  copyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  shareButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  mediaShareContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 20,
  },
  shareButtonText: {
    color: colors.gray100,
    fontSize: 14,
  },
  notesContainer: {
    paddingTop: 30,
    gap: 20,
  },
  notesText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.gray100,
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 120,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default styles;
