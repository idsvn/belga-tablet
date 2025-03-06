import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { useUpdateTags } from 'src/hooks/useUpdateTags';

import { formatTimeAgo } from 'src/utils/dateUtils';

import NetworkIcon from 'src/assets/svg/network-icon.svg';
import ShareIcon from 'src/assets/svg/share-icon.svg';

import CheckBox from 'components/Checkbox';
import RenderHTML from 'components/customs/RenderHTML';
import Text from 'components/customs/Text';
import FavoritesActiveSvg from 'components/svg/FavoritesActiveSvg';

import colors from 'src/themes/colors';

import { FavoritesItemProps } from './types';

import styles from './styles';

const SearchItem = (props: FavoritesItemProps) => {
  const {
    sourceLogo,
    title = '',
    wordCount = 0,
    body,
    source = '',
    subSource = '',
    publishDate = '',
    page,
    checked,
    onPress,
    onPressCheckBox,
    onPressShare,
    tags,
    uuid,
  } = props;

  const { isFavorite, onUpdateFavorite } = useUpdateTags({
    tags: tags || [],
    id: uuid ?? '',
  });

  const onFavorite = () => {
    if (!uuid) return;
    onUpdateFavorite();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: checked ? colors.primary : colors.gray400 },
      ]}
      onPress={onPress}
    >
      <View style={styles.logoView}>
        <FastImage
          source={{ uri: sourceLogo }}
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />
        <CheckBox
          size={15}
          checked={checked}
          style={{ alignSelf: 'center', marginTop: 20 }}
          onPress={onPressCheckBox}
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
              <TouchableOpacity onPress={onFavorite}>
                <FavoritesActiveSvg
                  active={isFavorite}
                  activeColor={colors.gray}
                  width={'20'}
                  height={'20'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressShare}>
                <ShareIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bodyView}>
            <Text style={styles.titleText}>{title || ''}</Text>
            <RenderHTML value={`<p>${body || ''}</p>`} fontSize={10} />
          </View>
        </View>
        <View style={styles.footerView}>
          {publishDate ? (
            <Text style={styles.footerText}>
              {formatTimeAgo(new Date(publishDate))}
            </Text>
          ) : null}
          <Text style={styles.footerText}>{`${wordCount} words`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SearchItem);
