import { useWindowDimensions, View } from 'react-native';

import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Text from 'components/customs/Text';
import ImageWithSkeleton from 'components/ImageWithSkeleton';

import theme from 'src/themes';

import { ArticleItemProps } from './types';

import styles from './styles';

const ArticleItem = (props: ArticleItemProps) => {
  const { title, imageUrl, publishDate, unread, onPress } = props;

  const { width } = useWindowDimensions();

  const showPublishDate = (publishDate: string) => {
    return moment(publishDate).isSame(moment(), 'day')
      ? 'Today'
      : moment(publishDate).format('DD/MM/YYYY');
  };

  const contentWidth = width / 2 - theme.spacing.paddingHorizontalContent - 10;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: contentWidth,
          opacity: unread ? 1 : 0.6,
        },
      ]}
      onPress={onPress}
    >
      <ImageWithSkeleton
        imageSource={imageUrl}
        resizeMode="contain"
        width={contentWidth}
        height={contentWidth * 1.4}
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
