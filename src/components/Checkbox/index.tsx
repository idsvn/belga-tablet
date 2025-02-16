import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from 'src/themes';

import { CheckBoxProps } from './types';

import styles from './styles';

const CheckBox = (props: CheckBoxProps) => {
  const { checked, style, onPress, size = 25 } = props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[
        styles.checkBoxView,
        checked && styles.checkBoxActive,
        { width: size, height: size },
        style,
      ]}
      onPress={onPress}
    >
      {checked && (
        <Icon name="check" size={size - 3} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
