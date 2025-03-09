import { TouchableOpacity, View } from 'react-native';

import { useDispatch } from 'react-redux';

import {
  decreaseFontSize,
  increaseFontSize,
} from 'src/redux/slices/systemSlice';
import { AppDispatch } from 'src/redux/store';

import BackIcon from 'src/assets/svg/back-icon.svg';
import ShareIcon from 'src/assets/svg/share-icon.svg';
import ZoomInFontsizeIcon from 'src/assets/svg/zoom-in-fontsize-icon.svg';
import ZoomOutFontsizeIcon from 'src/assets/svg/zoom-out-fontsize-icon.svg';

import Text from 'components/customs/Text';
import DownloadIconSvg from 'components/svg/DownloadIconSvg';
import FavoritesActiveSvg from 'components/svg/FavoritesActiveSvg';

import { goBack } from 'App';

import theme from 'src/themes';
import colors from 'src/themes/colors';

import { NewspaperDetailHeaderProps } from './types';

import styles from './styles';

const NewspaperDetailHeader = (props: NewspaperDetailHeaderProps) => {
  const {
    enableRightContent = true,
    isFavorites = false,
    onPressBack,
    onPressFavorites,
    onPressShare,
    onPressDownload,
  } = props;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          onPressBack ? onPressBack() : goBack();
        }}
      >
        <BackIcon />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      {enableRightContent && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          {onPressDownload && (
            <TouchableOpacity onPress={onPressDownload}>
              <DownloadIconSvg color={colors.gray} width={28} height={28} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => dispatch(decreaseFontSize())}>
            <ZoomOutFontsizeIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(increaseFontSize())}>
            <ZoomInFontsizeIcon />
          </TouchableOpacity>
          {onPressFavorites && (
            <TouchableOpacity onPress={onPressFavorites}>
              <FavoritesActiveSvg
                active={isFavorites}
                activeColor={theme.colors.gray}
                width={'27'}
                height={'27'}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onPressShare}>
            <ShareIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NewspaperDetailHeader;
