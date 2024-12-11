import { TouchableOpacity } from 'react-native';

import Text from 'components/customs/Text';

import theme from 'src/themes';

import { MenuItemProps } from './types';

import styles from './styles';

const MenuItem = (props: MenuItemProps) => {
  const { Icon, label, active, onPress } = props;

  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        active && {
          backgroundColor: theme.colors.lightGray,
        },
      ]}
      onPress={onPress}
    >
      <>
        {Icon}
        <Text style={styles.menuItemText}>{label}</Text>
      </>
    </TouchableOpacity>
  );
};

export default MenuItem;
