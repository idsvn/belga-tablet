import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

import { getImageUri, isFileExist } from 'src/utils/fileUtils';

import Text from 'components/customs/Text';
import DownloadIconSvg from 'components/svg/DownloadIconSvg';
import DownloadingIconSvg from 'components/svg/DownloadingIconSvg';

import theme from 'src/themes';
import colors from 'src/themes/colors';

import { PageListProps } from './types';

import styles from './styles';

const PageList = (props: PageListProps) => {
  const { t } = useTranslation();

  const {
    publications = [],
    activeIndex = 0,
    onChooseIndex,
    onDownloadPress,
    isDownloading,
  } = props;

  const flatListRef = useRef<any>();

  const [showPageList, setShowPageList] = useState<boolean>(false);

  const [listHeight] = useState(new Animated.Value(0));

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    Promise.all(
      publications.map(async (item) => {
        const imageUrl = item?.attachments?.[0]?.references?.[0]?.href;

        if (imageUrl === undefined) {
          return '';
        }

        const isExist = await isFileExist(imageUrl);

        return isExist ? getImageUri(imageUrl) : imageUrl;
      }),
    ).then((value) => {
      setImageUrls(value);
    });
  }, [publications]);

  useEffect(() => {
    handleScrollToIndex(activeIndex);
  }, [activeIndex]);

  const handleScrollToIndex = (index: number) => {
    try {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPageList = () => {
    setShowPageList(!showPageList);

    Animated.timing(listHeight, {
      toValue: showPageList ? 0 : 190,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {!showPageList && onDownloadPress && (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.lightGray,
            paddingTop: 30,
          }}
        >
          <TouchableOpacity
            disabled={isDownloading}
            style={styles.downloadButton}
            onPress={onDownloadPress}
          >
            {isDownloading ? (
              <DownloadingIconSvg color="white" width={42} height={42} />
            ) : (
              <DownloadIconSvg color="white" width={42} height={42} />
            )}
          </TouchableOpacity>
        </View>
      )}
      <View>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleShowPageList}
        >
          <Icon
            name={`${showPageList ? 'chevron-small-down' : 'chevron-small-up'}`}
            size={25}
            color={'#ffffff'}
          />
          <Text style={styles.toggleText}>{t('NewspaperScreen.pageText')}</Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.pageList, { height: listHeight, overflow: 'hidden' }]}
        >
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleShowPageList}
          >
            <Icon
              name={`${showPageList ? 'chevron-small-down' : 'chevron-small-up'}`}
              size={25}
              color={'#ffffff'}
            />
            <Text style={styles.toggleText}>
              {t('NewspaperScreen.pageText')}
            </Text>
          </TouchableOpacity>
          <FlatList
            horizontal
            pagingEnabled
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            data={imageUrls}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.pageItem,
                  { marginRight: index % 2 === 0 ? 10 : 0 },
                ]}
                onPress={() => onChooseIndex?.(index)}
              >
                <FastImage
                  source={{
                    uri: item,
                  }}
                  style={[
                    styles.pageImage,
                    activeIndex === index && {
                      borderWidth: 1,
                      borderColor: theme.colors.primary,
                      width: 120,
                    },
                  ]}
                  resizeMode="stretch"
                />
                <Text
                  style={[
                    styles.pageText,
                    {
                      textAlign:
                        index === 0 || index === publications.length - 1
                          ? 'center'
                          : index % 2 === 0
                            ? 'left'
                            : 'right',
                    },
                  ]}
                >
                  {` ${index + 1} ${
                    index % 2 !== 0 && index !== publications.length - 1
                      ? '-'
                      : ''
                  }`}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default PageList;
