import React, { useRef, useState } from 'react';
import { Animated, FlatList, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Entypo';

import Text from 'components/customs/Text';

import theme from 'src/themes';

import { PageListProps } from './types';

import styles from './styles';

const PageList = (props: PageListProps) => {
  const { t } = useTranslation();

  const { publications = [], activeIndex = 0, onChooseIndex } = props;

  const flatListRef = useRef<any>();

  const [showPageList, setShowPageList] = useState<boolean>(false);

  const [listHeight] = useState(new Animated.Value(0));

  //   useEffect(() => {
  //     handleScrollToIndex(activeIndex);
  //   }, [activeIndex]);

  //   const handleScrollToIndex = (index: number) => {
  //     flatListRef?.current?.scrollToIndex({
  //       animated: true,
  //       index: index,
  //     });
  //   };

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
        <FlatList
          horizontal
          pagingEnabled
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          data={publications}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.pageItem,
                { marginRight: index % 2 === 0 ? 10 : 0 },
              ]}
              onPress={() => onChooseIndex?.(index)}
            >
              <FastImage
                source={{ uri: item?.attachments?.[0]?.references?.[0]?.href }}
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
  );
};

export default PageList;
