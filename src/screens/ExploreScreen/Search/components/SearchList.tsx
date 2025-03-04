import { memo } from 'react';
import { RefreshControl } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import { NewsObject } from 'src/models/searchNewsObjectModel';

import styles from '../styles';

const SearchList = ({
  newsObjects,
  isLoading,
  refetch,
  renderItem,
}: {
  newsObjects: NewsObject[];
  isLoading: boolean;
  refetch: () => void;
  renderItem: ({ item }: { item: NewsObject }) => JSX.Element;
}) => {
  return (
    <FlatList
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
