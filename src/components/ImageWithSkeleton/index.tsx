import React, { memo, useCallback, useMemo, useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  const [hasError, setHasError] = useState(false);

  const [visible, setIsVisible] = useState(false);

  const source = useMemo(() => {
    if (imageSource) {
      return typeof imageSource === 'string'
        ? [{ uri: imageSource }]
        : [imageSource];
    }

    if (Array.isArray(avatarMetadata) && avatarMetadata.length > 0) {
      const allSources = avatarMetadata
        .map((img) => img?.downloadUrl && { uri: img.downloadUrl })
        .filter(Boolean);

      const mainImage = allSources.length > 0 ? allSources[0] : null;

      return mainImage ? [mainImage, allSources] : [null, []];
    }

    return [null, []];
  }, [imageSource, avatarMetadata]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        width: width || '100%',
        height: height || '100%',
      },
      style,
    ],
    [width, height, style],
  );

  const imageStyles: StyleProp<ImageStyle> = useMemo(
    () => [
      {
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
      imageStyle,
    ],
    [imageStyle],
  );

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
      {isPreview && source?.[1]?.length > 0 && (
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
