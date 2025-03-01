import { memo, useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native';

import { formatDate } from 'src/helpers/utils';

import { Letter } from 'src/models/newslettersModel';

import colors from 'src/themes/colors';

import styles from '../styles';

const NewsLetterList = ({
  newsletters,
  isLoading,
  refetch,
  onEndReached,
  isLoadMore,
  renderItem,
}: {
  newsletters: Letter[];
  isLoading: boolean;
  refetch: () => void;
  onEndReached: () => void;
  isLoadMore: boolean;
  renderItem: ({ item }: { item: Letter }) => JSX.Element;
}) => {
  const groupedData = useMemo(() => {
    const grouped: { [key: string]: Letter[] } = {};

    newsletters.forEach((item) => {
      const dateKey = formatDate(item.publishDate);

      grouped[dateKey] ||= [];
      grouped[dateKey].push(item);
    });

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  }, [newsletters]);

  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      style={styles.sectionList}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      sections={groupedData}
      renderItem={renderItem}
      keyExtractor={(item) => JSON.stringify(item)}
      renderSectionHeader={({ section: { title } }) => (
        <Text key={title} style={styles.header}>
          {title}
        </Text>
      )}
      ListFooterComponent={() => (
        <TouchableOpacity style={styles.loadMoreButton} onPress={onEndReached}>
          {isLoadMore ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.loadMore}>Load more</Text>
          )}
        </TouchableOpacity>
      )}
      onEndReachedThreshold={0.5}
    />
  );
};

export default memo(NewsLetterList);
