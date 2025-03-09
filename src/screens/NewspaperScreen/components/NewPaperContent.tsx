import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  PanResponder,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import { PATH_SCREEN } from 'src/constants/pathName';

import {
  DeliverableModel,
  NewsObject,
  Zone,
} from 'src/models/publicationModel';

import { getImageUri, isFileExist } from 'src/utils/fileUtils';
import { widthScreen } from 'src/utils/systemUtils';

import NewspaperScreenLayout from 'components/Layout/NewspaperScreenLayout';

import { navigate } from 'App';

import PageList from './PageList';

import { ZoneSelectedType } from '../types';

import styles from '../styles';

interface NewsPaperContentProps {
  publications?: DeliverableModel[];
  onPressDownload?: () => void;
  isDownloading?: boolean;
  onSelectStartAndEnd?: (start: string, end: string) => void;
}

interface PublicationWithImageUri extends DeliverableModel {
  imageUri?: string; // Add imageUri to the extended type
}

export const NewsPaperContent = memo(
  ({
    publications,
    onPressDownload,
    onSelectStartAndEnd,
    isDownloading,
  }: NewsPaperContentProps) => {
    const [selectedZone, setSelectedZone] = useState<ZoneSelectedType>();

    const zoneId = useRef<string>();

    const { t } = useTranslation();

    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const [isZooming, setIsZooming] = useState<boolean>(false);

    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const clickTimeout = useRef<NodeJS.Timeout | null>(null);

    const { height } = useWindowDimensions();

    const heightContent = height - 90 - 178 - 50;

    const flatListRef = useRef<any>(null);

    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Transform publications to include resolved imageUri
    const [publicationsWithImageUri, setPublicationsWithImageUri] = useState<
      PublicationWithImageUri[]
    >([]);

    useEffect(() => {
      const resolveImageUris = async () => {
        if (!publications) {
          setPublicationsWithImageUri([]);

          return;
        }

        const resolvedPublications = await Promise.all(
          publications.map(async (item) => {
            const imageUrl = item?.attachments?.[0]?.references?.[0]?.href;

            if (!imageUrl) {
              return { ...item, imageUri: undefined };
            }

            const isExist = await isFileExist(imageUrl);

            const imageUri = isExist ? getImageUri(imageUrl) : imageUrl;

            // console.log(imageUrl, isExist);

            return { ...item, imageUri };
          }),
        );

        setPublicationsWithImageUri(resolvedPublications);
      };

      resolveImageUris();
    }, [publications]);

    const handleScrollToIndex = useCallback((index: number) => {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index,
      });
    }, []);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setIsScrolling(true);
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }
        },
        onPanResponderRelease: () => {
          scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
          }, 300);
        },
      }),
    ).current;

    const handleZonePressIn = ({
      uuid,
      zone,
    }: {
      uuid: string;
      zone: Zone;
    }) => {
      if (!isScrolling && !isZooming) {
        if (clickTimeout.current) {
          clearTimeout(clickTimeout.current);
        }

        clickTimeout.current = setTimeout(() => {
          if (!isScrolling && !isZooming) {
            setSelectedZone({
              uuid,
              zone,
            });
          }
        }, 300);
      }
    };

    const handleZonePress = (zoneId: string) => {
      if (!isScrolling && !isZooming) {
        if (clickTimeout.current) {
          clearTimeout(clickTimeout.current);
        }

        clickTimeout.current = setTimeout(() => {
          if (!isScrolling && !isZooming) {
            navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, {
              id: zoneId,
            });
            setSelectedZone(undefined);
          }
        }, 300);
      }
    };

    const renderPublicationItem = useCallback(
      ({ item }: { item: PublicationWithImageUri }) => {
        const imageUri = item.imageUri;

        return (
          <ReactNativeZoomableView
            maxZoom={5}
            minZoom={1}
            zoomStep={0.3}
            initialZoom={1}
            bindToBorders={true}
            style={{
              height: heightContent,
              width: widthScreen,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
              paddingHorizontal: 20,
            }}
            onZoomBefore={() => {
              setIsZooming(true);
              if (clickTimeout.current) {
                clearTimeout(clickTimeout.current);
              }
            }}
            onZoomAfter={() => {
              setIsZooming(false);
            }}
            {...panResponder.panHandlers}
          >
            <FastImage
              source={{ uri: imageUri }}
              resizeMode="contain"
              style={[styles.image]}
            />
            {Platform.OS === 'android' && (
              <TouchableOpacity
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              ></TouchableOpacity>
            )}

            {item?.newsObjects?.map((newsObject: NewsObject) =>
              newsObject?.zones?.map((zone, index) => (
                <TouchableOpacity
                  key={`${newsObject.uuid}-${index}`}
                  activeOpacity={1}
                  onPress={() => {
                    if (newsObject.uuid) {
                      handleZonePress(newsObject.uuid);
                    }
                  }}
                  onPressIn={() => {
                    handleZonePressIn({
                      uuid: newsObject.uuid!,
                      zone,
                    });
                  }}
                  onPressOut={() => {
                    zoneId.current = newsObject.uuid;
                    setSelectedZone(undefined);
                  }}
                  style={[
                    styles.zone,
                    {
                      left: `${zone.x * 100}%`,
                      top: `${zone.y * 100}%`,
                      width: `${zone.width * 100}%`,
                      height: `${zone.height * 100}%`,
                    },
                  ]}
                >
                  {selectedZone?.uuid === newsObject.uuid ? (
                    <View style={styles.zoneHighlight} />
                  ) : null}
                </TouchableOpacity>
              )),
            )}
          </ReactNativeZoomableView>
        );
      },
      [heightContent],
    );

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index);
      }
    }).current;

    const onScrollToStatusFail = () => {};

    return (
      <NewspaperScreenLayout
        style={styles.container}
        title={`${t('NewspaperScreen.pageText')} ${
          publicationsWithImageUri?.[activeIndex]?.page || 0
        }`}
        logoUrl={`${publicationsWithImageUri?.[activeIndex]?.sourceLogo}`}
        newsObjects={publicationsWithImageUri?.[activeIndex]?.newsObjects}
        pageNumber={publicationsWithImageUri?.[activeIndex]?.page}
        onSelectStartAndEnd={onSelectStartAndEnd}
      >
        <FlatList
          horizontal
          pagingEnabled
          ref={flatListRef}
          style={{ height: heightContent }}
          showsHorizontalScrollIndicator={false}
          data={publicationsWithImageUri}
          onViewableItemsChanged={onViewableItemsChanged}
          renderItem={renderPublicationItem}
          keyExtractor={(_, index) => index.toString()}
          onScrollToIndexFailed={onScrollToStatusFail}
          onScrollBeginDrag={() => {
            setIsScrolling(true);
            if (scrollTimeout.current) {
              clearTimeout(scrollTimeout.current);
            }
          }}
          onScrollEndDrag={() => {
            scrollTimeout.current = setTimeout(() => {
              setIsScrolling(false);
            }, 300);
          }}
          onMomentumScrollBegin={() => {
            setIsScrolling(true);
            if (scrollTimeout.current) {
              clearTimeout(scrollTimeout.current);
            }
          }}
          onMomentumScrollEnd={() => {
            scrollTimeout.current = setTimeout(() => {
              setIsScrolling(false);
            }, 300);
          }}
        />
        <PageList
          publications={publicationsWithImageUri}
          activeIndex={activeIndex}
          onChooseIndex={(index) => handleScrollToIndex(index)}
          onDownloadPress={onPressDownload}
          isDownloading={isDownloading}
        />
      </NewspaperScreenLayout>
    );
  },
);
