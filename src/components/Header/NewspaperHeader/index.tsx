import { TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import FastImage from 'react-native-fast-image';

import { GENERAL_DATE_FORMAT } from 'src/utils/dateUtils';

import BackIcon from 'src/assets/svg/back-icon.svg';
import CloseIcon from 'src/assets/svg/close-icon.svg';
import MenuIcon from 'src/assets/svg/menu-icon.svg';

import CalendarButton from 'components/CalendarButton';
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
    onSelectStartAndEnd,
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
        <CalendarButton
          onSelectStartAndEnd={onSelectStartAndEnd}
          singleSelect={true}
          initStartDate={moment().format(GENERAL_DATE_FORMAT)}
          initEndDate={moment().format(GENERAL_DATE_FORMAT)}
        />
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
