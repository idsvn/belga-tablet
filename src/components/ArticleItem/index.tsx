import { TouchableOpacity, useWindowDimensions, View } from 'react-native';

import moment from 'moment';

import Text from 'components/customs/Text';
import ImageWithSkeleton from 'components/ImageWithSkeleton';

import theme from 'src/themes';

import { ArticleItemProps } from './types';

import styles from './styles';

const ArticleItem = (props: ArticleItemProps) => {
  const { title, imageUrl, publishDate, unread, onPress } = props;

  const { height, width } = useWindowDimensions();

  const showPublishDate = (publishDate: string) => {
    return moment(publishDate).isSame(moment(), 'day')
      ? 'Today'
      : moment(publishDate).format('DD/MM/YYYY');
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: width / 2 - theme.spacing.paddingHorizontalContent - 10,
          opacity: unread ? 1 : 0.6,
        },
      ]}
      onPress={onPress}
    >
      <ImageWithSkeleton
        imageSource={imageUrl}
        resizeMode="contain"
        height={height / 2}
        style={styles.imageView}
      />
      <View style={styles.titleView}>
        {unread && <View style={styles.dotView}></View>}
        <Text style={[styles.titleText, unread && styles.titleUnReadText]}>
          {title || ''}
        </Text>
      </View>
      {publishDate ? (
        <Text style={styles.dateText}>
          {showPublishDate(publishDate) || ''}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default ArticleItem;
