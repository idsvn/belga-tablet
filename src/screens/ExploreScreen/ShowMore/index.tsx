import { TouchableOpacity, View } from 'react-native';

import Text from 'components/customs/Text';

import { ShowMoreProps } from './types';

import styles from './styles';

const ShowMore = (props: ShowMoreProps) => {
  const { title, showMoreText, onPress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title || ''}</Text>
      <TouchableOpacity style={styles.showMoreButton} onPress={onPress}>
        <Text style={styles.showMoreText}>{showMoreText || ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowMore;
