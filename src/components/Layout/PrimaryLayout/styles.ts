import { StyleSheet } from 'react-native';

import theme from 'src/themes';

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  notificationTextView: {},
  notificationText: {
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.textBold,
    fontSize: 14,
  },
  notificationBtnGroupView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  rewardBtn: {
    backgroundColor: '#ffffff',
    height: 35,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  rewardView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.paddingHorizontalContent,
  },
  totalRewardText: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 13,
    color: theme.colors.textBold,
    marginLeft: 2,
  },
  notificationBtn: {
    backgroundColor: '#ffffff',
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#C3C3C3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
});

export default styles;
