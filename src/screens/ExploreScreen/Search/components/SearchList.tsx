import { memo, useState } from 'react';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import { NewsObject } from 'src/models/searchNewsObjectModel';

import CheckBox from 'components/Checkbox';

import { SearchLoadingView } from './LoadingView';

import styles from '../styles';

const SearchList = ({
  newsObjects,
  isLoading,
  refetch,
  renderItem,
  onSelectAll,
}: {
  newsObjects: NewsObject[];
  isLoading: boolean;
  refetch: () => void;
  renderItem: ({ item }: { item: NewsObject }) => JSX.Element;
  onSelectAll: () => void;
}) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  if (isLoading) {
    return <SearchLoadingView />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.listSearchHeaderContainer}>
          <Text
            style={styles.resultFoundText}
          >{`${newsObjects.length} RESULTS FOUND`}</Text>
          <TouchableOpacity
            style={styles.selectAllButton}
            onPress={() => {
              onSelectAll();
              setIsCheckedAll((prev) => !prev);
            }}
          >
            <CheckBox size={12} checked={isCheckedAll} />
            <Text
              style={styles.selectAllText}
            >{`Select all articles on page`}</Text>
          </TouchableOpacity>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      style={styles.sectionList}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      data={newsObjects}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item)}
    />
  );
};

export default memo(SearchList);
