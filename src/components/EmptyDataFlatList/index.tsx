import React from 'react';
import { StyleSheet, View } from 'react-native';

import theme from 'src/themes';

import Text from '../customs/Text';

interface EmptyDataFlatListProps {
  placeholder?: string;
}

const EmptyDataFlatList = ({ placeholder }: EmptyDataFlatListProps) => {
  return (
    <View style={styles.contentView}>
      {/* <Image
        source={require('../../assets/images/emptyDataFlatList.png')}
        style={styles.image}
        resizeMode="contain"
      /> */}
      <Text style={styles.text}>{placeholder || 'No Data'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentView: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  image: {
    width: 220,
  },
  text: {
    fontSize: 16,
    fontFamily: theme.fontFamily.regular,
  },
});

export default EmptyDataFlatList;
