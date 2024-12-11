import { TouchableOpacity, View } from 'react-native';

import FavoritesIcon from 'src/assets/svg/favorites-item-icon.svg';
import ShareIcon from 'src/assets/svg/share-icon.svg';

import Text from 'components/customs/Text';

import { NewObjectItemProps } from './types';

import styles from './styles';

const NewObjectItem = (props: NewObjectItemProps) => {
  const { title = '', onPress } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ width: '80%' }}>{title}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity>
          <FavoritesIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShareIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default NewObjectItem;
