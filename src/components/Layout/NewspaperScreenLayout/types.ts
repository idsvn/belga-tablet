import { ColorValue, StatusBarStyle, StyleProp, ViewStyle } from 'react-native';

import { NewsObject } from 'src/models/publicationModel';

export interface NewspaperDetailLayoutProps {
  statusBarBackgroundColor?: ColorValue;
  barStyle?: null | StatusBarStyle | undefined;
  headerBarStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  goBack?(): void;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  logoUrl?: string;
  newsObjects?: NewsObject[];
  pageNumber?: number;
  onSelectStartAndEnd: (startDate: string, endDate: string) => void;
}
