import { memo } from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import { useGetNewsLetter } from 'src/services/newsLetterService';

import { Letter } from 'src/models/newslettersModel';

import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';

import styles from './style';

const NewsLetterDetailScreen = ({
  letter,
  onBack,
}: {
  letter: Letter;
  onBack: () => void;
}) => {
  const { t } = useTranslation();

  const { data } = useGetNewsLetter(letter.id);

  const accentColor = data?.brand?.accentColor;

  const logoUrl = data?.brand?.logo?.url;

  const coverImageUrl = data?.coverImage?.url;

  return (
    <View style={styles.container}>
      <View style={[styles.headerBackground, { backgroundColor: accentColor }]}>
        <View style={styles.headerNavigation}>
          <Text style={styles.newsLetter} onPress={onBack}>
            {t('ExploreScreen.newsLetter')}
          </Text>
          <ArrowRightIconSvg color={'white'} />
          <Text style={styles.letterName} numberOfLines={1}>
            {letter.name}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <FastImage style={styles.coverImage} source={{ uri: coverImageUrl }} />
        <View style={styles.titleContainer}>
          <FastImage style={styles.logoImage} source={{ uri: logoUrl }} />
          <Text style={styles.title}>{letter.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(NewsLetterDetailScreen);
