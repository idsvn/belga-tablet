import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, Platform, TouchableOpacity, View } from 'react-native';

import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { PATH_SCREEN } from 'src/constants/pathName';

import {
  NewsObject,
  PublicationsDownloadedModel,
  Zone,
} from 'src/models/publicationModel';

import { getPublicationByDeliverableId } from 'src/redux/slices/deliverablesSlice';
import { AppDispatch, RootState } from 'src/redux/store';

import { heightScreen, widthScreen } from 'src/utils/systemUtils';

import NewspaperScreenLayout from 'components/Layout/NewspaperScreenLayout';

import PageList from './components/PageList';

import { getParams, navigate } from 'App';

import { ZoneSelectedType } from './types';

import styles from './styles';

const heightContent = heightScreen - 90 - 178 - 50;

const NewspaperScreen = () => {
  const { t } = useTranslation();

  const { id } = getParams();

  const dispatch = useDispatch<AppDispatch>();

  const flatListRef = useRef<any>();

  const publicationsDownloaded = useSelector<
    RootState,
    PublicationsDownloadedModel[]
  >((state) => state.deliverablesStore.publicationsDownloaded);

  const [selectedZone, setSelectedZone] = useState<ZoneSelectedType>();

  const zoneId = useRef<string | null>();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const [isZooming, setIsZooming] = useState<boolean>(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getPublicationByDeliverableId({ deliverableid: id }));
    }
  }, [id]);

  const publications = useMemo(() => {
    const publicationsExits = publicationsDownloaded?.find(
      (item) => item.deliverableid === id,
    );

    return publicationsExits?.deliverableModel;
  }, [publicationsDownloaded]);

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

  const handleZonePressIn = ({ uuid, zone }: { uuid: string; zone: Zone }) => {
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

  const renderPublicationItem = ({ item }) => (
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
        source={{ uri: item?.attachments?.[0]?.references?.[0]?.href }}
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

  const handleScrollToIndex = (index: number) => {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const onScrollToStatusFail = () => {};

  return (
    <NewspaperScreenLayout
      style={styles.container}
      title={`${t('NewspaperScreen.pageText')} ${publications?.[activeIndex].page || 0}`}
      logoUrl={`${publications?.[activeIndex].sourceLogo}`}
      newsObjects={publications?.[activeIndex].newsObjects}
      pageNumber={publications?.[activeIndex].page}
    >
      <FlatList
        horizontal
        pagingEnabled
        ref={flatListRef}
        style={{ height: heightContent }}
        showsHorizontalScrollIndicator={false}
        data={publications}
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
        publications={publications}
        activeIndex={activeIndex}
        onChooseIndex={(index) => handleScrollToIndex(index)}
      />
    </NewspaperScreenLayout>
  );
};

export default NewspaperScreen;
