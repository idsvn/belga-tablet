import { TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import {
  DATE_FORMAT_DDMMYYYY,
  DATE_FORMAT_HHMM,
  formatDate,
} from 'src/utils/dateUtils';

import NetworkIcon from 'src/assets/svg/network-icon.svg';
import ShareIcon from 'src/assets/svg/share-icon.svg';

import CheckBox from 'components/Checkbox';
import Text from 'components/customs/Text';

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
  } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
          {publishDate ? (
            <Text style={styles.footerText}>
              {`${formatDate(new Date(publishDate), DATE_FORMAT_DDMMYYYY) || ''} - ${page ? `Page ${page}` : `${formatDate(new Date(publishDate), DATE_FORMAT_HHMM)}`}`}
            </Text>
          ) : null}
          <Text style={styles.footerText}>{`${wordCount} words`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
