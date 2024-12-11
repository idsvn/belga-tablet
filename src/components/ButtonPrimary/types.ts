import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonPrimaryProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}
