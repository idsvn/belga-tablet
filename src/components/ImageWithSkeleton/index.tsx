import React, { memo, useMemo, useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import FastImage, { ImageStyle } from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import Skeleton from 'react-native-skeleton-placeholder';

import defaultImageSource from 'src/assets/images/no-image.png';

import { ImageWithSkeletonProps } from './types';

const ImageWithSkeleton = ({
  imageSource,
  width,
  height,
  style,
  imageStyle,
  avatarMetadata,
  isPreview,
  resizeMode,
}: ImageWithSkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [hasError, setHasError] = useState<boolean>(false);

  const [visible, setIsVisible] = useState<boolean>(false);

  const source = useMemo(() => {
    if (imageSource) {
      setHasError(false);

      return typeof imageSource === 'string'
        ? [{ uri: imageSource }, { uri: imageSource }]
        : [imageSource, []];
    } else if (Array.isArray(avatarMetadata) && avatarMetadata.length > 0) {
      const allSource = avatarMetadata
        ?.map((image) => ({ uri: image?.downloadUrl }))
        ?.filter((value) => Boolean(value?.uri));

      const avatarMetadataSingle = avatarMetadata[0];

      if (avatarMetadataSingle?.downloadUrl) {
        setHasError(false);

        return [{ uri: avatarMetadataSingle.downloadUrl }, allSource];
      }

      const imageSizeTypes = ['large', 'medium', 'small'];

      for (const imageSizeType of imageSizeTypes) {
        if (avatarMetadataSingle?.[imageSizeType]?.url) {
          setHasError(false);

          return [{ uri: avatarMetadataSingle[imageSizeType].url }, allSource];
        }
      }

      setHasError(true);
    } else {
      setHasError(true);
      setIsLoaded(true);

      return [null, []];
    }
  }, [imageSource, avatarMetadata]);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const containerStyle: StyleProp<ViewStyle> = [
    { width: width || '100%', height: height || '100%' },
    style,
  ];

  const imageStyles: StyleProp<ImageStyle> = [
    { width: '100%', height: '100%', position: 'absolute' },
    imageStyle,
  ];

  return (
    <>
      <TouchableOpacity
        style={containerStyle}
        disabled={!isPreview}
        onPress={() => isPreview && setIsVisible(true)}
      >
        <FastImage
          source={hasError ? defaultImageSource : source?.[0]}
          style={imageStyles}
          resizeMode={resizeMode}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
        />
        {!isLoaded && !hasError && (
          <Skeleton>
            <Skeleton.Item width={width} height={height} borderRadius={0} />
          </Skeleton>
        )}
      </TouchableOpacity>
      {isPreview &&
        source &&
        Array.isArray(source[1]) &&
        source[1].length > 0 && (
          <ImageView
            images={source[1]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        )}
    </>
  );
};

export default memo(ImageWithSkeleton);
