import { TouchableOpacity } from 'react-native';

import Text from 'components/customs/Text';

import { ButtonPrimaryProps } from './types';

import styles from './styles';

const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const { title = '', style, textStyle, onPress } = props;

  return (
    <TouchableOpacity style={[styles.buttonView, style]} onPress={onPress}>
      <Text style={[styles.titleText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
