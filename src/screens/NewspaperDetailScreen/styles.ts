import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sourceLogo: {
    width: 50,
    height: 50,
  },
  titleText: {
    fontSize: 20,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },
  subSourceText: {
    fontSize: 20,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray,
  },
  publishDateText: {
    fontSize: 20,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  contentImage: {
    width: 170,
    height: 244,
  },
  contentTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 40,
  },
  infoBox: {
    backgroundColor: theme.colors.gray400,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    paddingVertical: theme.spacing.paddingVerticalContent,
    marginVertical: theme.spacing.marginVerticalContent,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoTitle: {
    color: theme.colors.gray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 5,
  },
  infoContentText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
  },
  imageBodyView: {
    marginVertical: 5,
  },
  imageBodyStyle: {
    borderRadius: 20,
  },
  htmlView: {
    marginTop: 10,
  },
  issueView: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopColor: theme.colors.gray400,
    borderTopWidth: 1,
    borderBottomColor: theme.colors.gray400,
    borderBottomWidth: 1,
    marginVertical: 20,
    justifyContent: 'flex-start',
  },
  issueText: {
    flex: 1,
    color: theme.colors.gray,
    fontSize: 14,
    fontFamily: theme.fontFamily.semiBold,
  },
  issueButton: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexShrink: 1,
  },
  issueTextButton: {
    fontSize: 14,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primary,
  },
});

export default styles;
