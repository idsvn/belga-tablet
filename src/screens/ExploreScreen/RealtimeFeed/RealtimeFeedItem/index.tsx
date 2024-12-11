import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import { QueryParamType } from 'src/models/systemModel';
import { TagModel } from 'src/models/tagModel';

import { updateTags } from 'src/redux/slices/tagsSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import { timeAgo } from 'src/utils/dateUtils';

import NetworkIcon from 'src/assets/svg/network-icon.svg';
import ShareIcon from 'src/assets/svg/share-icon.svg';

import Text from 'components/customs/Text';
import { globalLoading } from 'components/GlobalLoading';
import FavoritesActiveSvg from 'components/svg/FavoritesActiveSvg';

import theme from 'src/themes';

import { RealtimeFeedItemProps } from './types';

import styles from './styles';

const RealtimeFeedItem = (props: RealtimeFeedItemProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const tagsSavedNews = useSelector<RootState, TagModel[]>(
    (state) => state.tagStore.tags,
  );

  const {
    uuid,
    sourceLogo,
    title = '',
    wordCount = 0,
    body,
    source = '',
    subSource = '',
    publishDate = '',
    tags,
    onPress,
  } = props;

  const isFavorites = useMemo(() => {
    return tags?.some((tag) => tag.type === QueryParamType.SAVED_NEWS);
  }, [tags]);

  const handleAddToFavorites = async () => {
    globalLoading.show();
    if (!uuid) return;

    const tagIds = tagsSavedNews?.map((tag) => tag.id as number) || [];

    await dispatch(updateTags({ id: uuid, data: isFavorites ? [] : tagIds }));
    globalLoading.hide();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
              <TouchableOpacity onPress={handleAddToFavorites}>
                <FavoritesActiveSvg
                  active={isFavorites}
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

export default RealtimeFeedItem;
