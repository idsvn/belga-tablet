import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import { useUpdateTags } from 'src/hooks/useUpdateTags';

import { PATH_SCREEN } from 'src/constants/pathName';

import { timeAgo } from 'src/utils/dateUtils';

import NetworkIcon from 'src/assets/svg/network-icon.svg';
import ShareIcon from 'src/assets/svg/share-icon.svg';

import Text from 'components/customs/Text';
import FavoritesActiveSvg from 'components/svg/FavoritesActiveSvg';

import { navigate } from 'App';

import theme from 'src/themes';

import { RealtimeFeedItemProps } from './types';

import styles from './styles';

const RealtimeFeedItem = (props: RealtimeFeedItemProps) => {
  const { t } = useTranslation();

  const {
    uuid = '',
    sourceLogo,
    title = '',
    wordCount = 0,
    body,
    source = '',
    subSource = '',
    publishDate = '',
    tags = [],
  } = props;

  const { isFavorite, onUpdateFavorite } = useUpdateTags({
    tags,
    id: uuid,
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, {
          id: uuid,
        });
      }}
    >
      <View style={styles.logoView}>
        <FastImage
          source={{ uri: sourceLogo }}
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />
      </View>
      <View style={styles.contentView}>
        <View style={styles.bodyContentView}>
          <View style={styles.titleView}>
            <NetworkIcon width={32} height={32} />
            <View style={styles.sourceView}>
              <Text style={styles.titleText}>{source}</Text>
              <Text style={styles.subTitleText}>{subSource}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={onUpdateFavorite}>
                <FavoritesActiveSvg
                  active={isFavorite}
                  activeColor={theme.colors.gray}
                  width={'20'}
                  height={'20'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <ShareIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bodyView}>
            <Text style={styles.titleText}>{title || ''}</Text>
            <Text style={styles.leadText}>{body || ''}</Text>
          </View>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>{timeAgo(publishDate) || ''}</Text>
          <Text
            style={styles.footerText}
          >{`${wordCount} ${t('ExploreScreen.realtimeFeedItem.wordsText')}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RealtimeFeedItem, (prev, curr) => {
  return (
    prev.uuid === curr.uuid &&
    JSON.stringify(prev.tags) === JSON.stringify(curr.tags)
  );
});
