import { TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import BackIcon from 'src/assets/svg/back-icon.svg';
import CloseIcon from 'src/assets/svg/close-icon.svg';
import DateGroupIcon from 'src/assets/svg/date-group-icon.svg';
import MenuIcon from 'src/assets/svg/menu-icon.svg';

import Text from 'components/customs/Text';

import { goBack } from 'App';

import { NewspaperHeaderProps } from './types';

import styles from './styles';

const NewspaperHeader = (props: NewspaperHeaderProps) => {
  const {
    title = '',
    logoUrl,
    showSideBar,
    onShowSideBar,
    onPressBack,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            onPressBack ? onPressBack() : goBack();
          }}
        >
          <BackIcon />
        </TouchableOpacity>
        {logoUrl && (
          <FastImage
            source={{ uri: logoUrl }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        )}
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.menuView}>
        <TouchableOpacity>
          <DateGroupIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShowSideBar?.()}>
          {showSideBar ? (
            <CloseIcon width={30} height={30} />
          ) : (
            <MenuIcon width={30} height={30} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewspaperHeader;
