import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    position: 'relative',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: theme.colors.gray400,
    borderWidth: 1,
    borderRadius: 6,
  },
  logoView: {
    alignSelf: 'flex-start',
  },
  contentView: {
    width: '95%',
    flexDirection: 'column',

    // marginRight: 10,
  },
  bodyContentView: {
    width: '100%',
    borderBottomColor: theme.colors.gray400,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: '100%',
  },
  bodyView: {
    marginHorizontal: 10,
  },
  sourceView: {
    flexDirection: 'row',
    width: '70%',
    gap: 10,
  },
  titleText: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  subTitleText: {
    flexWrap: 'wrap',
    fontSize: 10,
  },
  leadText: {},
  buttonGroup: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    right: 20,
    top: -10,
    justifyContent: 'flex-end',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 20,
  },
  footerText: {
    fontSize: 12,
    fontFamily: theme.fontFamily.semiBold,
  },
});

export default styles;
