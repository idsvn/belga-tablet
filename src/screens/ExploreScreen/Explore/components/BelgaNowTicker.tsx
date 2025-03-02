import { memo } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
  ExploreMenu,
  setCurrentExploreMenu,
} from 'src/redux/slices/exploreSlice';

import ReloadIconSvg from 'components/svg/ReloadIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BelgaNowTicker = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.liveContainer}>
        <View style={styles.redCircle}></View>
        <Text style={styles.liveTitle}>{t('ExploreScreen.liveTitle')}</Text>
      </View>
      <Text style={styles.titleBanner}>
        Lorem ipsum dolor sit amet, consecteturaaaaaaaaaa...
      </Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.liveContainer}
          onPress={() => {
            dispatch(setCurrentExploreMenu(ExploreMenu.BELGA_NOW));
          }}
        >
          <Text style={styles.readMoreTitle}>
            {t('ExploreScreen.showMoreTextLatestPressRelease')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ReloadIconSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    width: SCREEN_WIDTH,
    marginHorizontal: -40,
    marginTop: -16,
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingVertical: 14,
    alignItems: 'center',
  },
  redCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textWhite,
  },
  liveTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
    color: colors.textWhite,
  },
  readMoreTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textWhite,
    lineHeight: 22,
  },
  liveContainer: {
    borderColor: colors.textWhite,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  titleBanner: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    color: colors.textWhite,
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default memo(BelgaNowTicker);
