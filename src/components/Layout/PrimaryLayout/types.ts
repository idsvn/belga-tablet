import { ColorValue, StatusBarStyle, StyleProp, ViewStyle } from 'react-native';

export interface PrimaryLayoutProps {
  statusBarBackgroundColor?: ColorValue;
  barStyle?: null | StatusBarStyle | undefined;
  headerBarStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  goBack?(): void;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  Header?: JSX.Element | JSX.Element[];
}
