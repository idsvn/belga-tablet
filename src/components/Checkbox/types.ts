import { StyleProp, ViewStyle } from 'react-native';

export interface CheckBoxProps {
  checked?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  checkedBoxColor?: string;
  onPress?: () => void;
}
