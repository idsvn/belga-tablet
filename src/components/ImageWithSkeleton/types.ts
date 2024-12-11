import { StyleProp, ViewStyle } from 'react-native';

import { ImageStyle, ResizeMode } from 'react-native-fast-image';

import { AvatarMetadataModel } from 'src/models/avatarMetadataModel';

export type ImageSourceProp = string | { uri: string };
export type Dimension = number | `${number}%`;

export interface ImageWithSkeletonProps {
  imageSource?: ImageSourceProp;
  width?: Dimension;
  height?: Dimension;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  size?: 'large' | 'medium' | 'small';
  avatarMetadata?: AvatarMetadataModel[];
  isPreview?: boolean;
  resizeMode?: ResizeMode;
}
