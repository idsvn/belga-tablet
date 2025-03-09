import { memo, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { useUpdateTags } from 'src/hooks/useUpdateTags';

import { PATH_SCREEN } from 'src/constants/pathName';

import { BelgaNewsObject } from 'src/models/belgaNewsObjectModel';

import ShareIcon from 'src/assets/svg/share-icon.svg';

import AudioIconSvg from 'components/svg/AudioIconSvg';
import FavoritesSvg from 'components/svg/FavoritesSvg';

import { navigate } from 'App';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

interface BelgaItemProps {
  data: BelgaNewsObject;
}

const BelgaItem = ({ data }: BelgaItemProps) => {
  const imageUrl = useMemo(() => {
    if (data.attachments?.length) {
      return data.attachments[0].references.find(
        (it) => it.mimeType === 'PNG' && it.representation === 'SMALL',
      )?.href;
    }

    return undefined;
  }, [data.attachments]);

  const isAudioType = data.mediumType === 'AUDIO';

  const { isFavorite, onUpdateFavorite } = useUpdateTags({
    tags: data.tags || [],
    id: data.uuid,
  });

  const onFavorite = () => {
    if (!data.uuid) return;
    onUpdateFavorite();
  };

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(data);
        navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, {
          id: data.uuid,
        });
      }}
      style={styles.container}
    >
      <Text style={styles.timeLabel}>{data.publishDate.slice(11, 16)}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{data.source}</Text>
        <Text style={styles.description}>{data.title}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onFavorite}>
          <FavoritesSvg width={'18'} height={'21'} checked={isFavorite} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate(PATH_SCREEN.SHARE_SCREEN, {
              id: data.uuid,
              source: data.source,
              title: data.title,
            });
          }}
        >
          <ShareIcon width={'18'} height={'21'} />
        </TouchableOpacity>
        {!!imageUrl && (
          <FastImage
            source={{ uri: imageUrl }}
            style={{ width: 36, height: 36, borderRadius: 4 }}
          />
        )}
        {isAudioType && <AudioIconSvg />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: colors.lightGray,
    alignItems: 'center',
  },
  timeLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.primary,
  },
  content: {
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.gray100,
  },
  description: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.black,
  },
  footer: {
    gap: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
});

export default memo(BelgaItem);
