import { memo, useCallback, useRef, useState } from 'react';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';

import { Item } from 'src/models/newsletterDetailModal';

import RenderHTML from 'components/customs/RenderHTML';
import ArrowRightIconSvg from 'components/svg/ArrowRightIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const NewsLetterDetailItemList = ({
  items,
  scrollViewRef,
}: {
  items: Item[];
  scrollViewRef: any;
}) => {
  const [imageHeights, setImageHeights] = useState<{ [key: string]: number }>(
    {},
  );

  const SCREEN_WIDTH = useWindowDimensions().width;

  const itemRefs = useRef<(View | null)[]>([]); // Lưu ref cho từng item

  const renderItem = useCallback(
    ({ item, index }: { item: Item; index: number }) => {
      const imageUrl = item.fields?.assetUrl;

      const html = item.fields?.body;

      const itemKey = item.id || item.title;

      const title = item.title !== 'TEXT_ITEM' ? item.title : undefined;

      const handleImageLoad = (e: any) => {
        const { width, height } = e.nativeEvent;

        const aspectRatio = height / width;

        const calculatedHeight = SCREEN_WIDTH * aspectRatio;

        setImageHeights((prev) => ({ ...prev, [itemKey]: calculatedHeight }));
      };

      return (
        <View
          ref={(ref) => (itemRefs.current[index] = ref)} // Gán ref cho item
          style={styles.itemContainer}
        >
          {!!title && <Text style={styles.itemTitle}>{item.title}</Text>}
          {!!imageUrl && (
            <FastImage
              style={[
                styles.itemImg,
                {
                  height: imageHeights[itemKey] || 200,
                  width: SCREEN_WIDTH * 0.9,
                },
              ]}
              source={{ uri: imageUrl }}
              resizeMode={FastImage.resizeMode.contain}
              onLoad={handleImageLoad}
              onError={() => console.log(`Failed to load image: ${imageUrl}`)}
            />
          )}
          {!!html && (
            <View style={styles.htmlContainer}>
              <RenderHTML value={html} fontSize={18} />
            </View>
          )}
          <Text style={styles.itemNote}>{item.note}</Text>
        </View>
      );
    },
    [imageHeights, SCREEN_WIDTH],
  );

  const handleSectionPress = (index: number) => {
    itemRefs.current[index]?.measureLayout(scrollViewRef.current, (x, y) => {
      scrollViewRef.current.scrollTo({ y, animated: true });
    });
  };

  const renderHeader = () => {
    return items
      .filter((item) => item.title !== 'TEXT_ITEM')
      .map((it, index) => {
        return (
          <TouchableOpacity
            key={it.id + index}
            style={styles.headerItem}
            onPress={() => handleSectionPress(index)}
          >
            <Text style={styles.headerText}>{it.title}</Text>
            <ArrowRightIconSvg />
          </TouchableOpacity>
        );
      });
  };

  return (
    <View>
      <View style={styles.headerContainer}>{renderHeader()}</View>
      {items.map((item, index) => (
        <React.Fragment key={item.id || item.title}>
          {renderItem({ item, index })}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 0,
  },
  itemTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 32,
    color: 'black',
  },
  itemNote: {
    fontFamily: fontFamily.regular,
    fontSize: 22,
    color: 'black',
    paddingBottom: 26,
    paddingHorizontal: 10,
  },
  itemImg: {
    marginVertical: 20,
  },
  htmlContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 20,
  },
  headerContainer: {
    paddingBottom: 20,
  },
  headerItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: 'black',
    flex: 1,
  },
});

export default memo(NewsLetterDetailItemList);
