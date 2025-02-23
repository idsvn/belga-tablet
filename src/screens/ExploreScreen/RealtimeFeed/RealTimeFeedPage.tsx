import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import { useGetRealtimeFeed } from 'src/services/newsObjectService';

import { LoadingView, RealTimeLoadingView } from './components/LoadingView';

import RealtimeFeedItem from './RealtimeFeedItem';

const STEP = 20;

export const RealTimeFeedPage = memo(() => {
  const [count, setCount] = useState<number>(STEP);

  const [offset, setOffset] = useState<number>(0);

  const [realtimeFeeds, setRealtimeFeeds] = useState<any>();

  const { start, end } = useMemo(() => {
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    const today = new Date();

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(today.getDate() - 7);

    const end = formatDate(today);

    const start = formatDate(sevenDaysAgo);

    return { start, end };
  }, []);

  const isFocused = useIsFocused();

  const { data, isFetching, refetch, isLoading } = useGetRealtimeFeed({
    start,
    end,
    subscription: true,
    count,
    offset,
    enabled: isFocused,
  });

  const isLoadMore = isFetching && count !== undefined;

  const renderItem = useCallback(({ item }) => {
    return <RealtimeFeedItem {...item} />;
  }, []);

  const onEndReached = useCallback(() => {
    setCount(STEP);
    setOffset((prev) => prev + STEP);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setRealtimeFeeds((prev) => {
        const combined = [prev ?? [], data?.data ?? []].flat();

        const uniqueMap = combined.reduce((acc, item) => {
          acc[item.uuid] = item;

          return acc;
        }, {});

        return Object.values(uniqueMap);
      });
    }
  }, [data]);

  if (!realtimeFeeds) {
    return <RealTimeLoadingView />;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      keyExtractor={(item) => item.uuid + JSON.stringify(item.tags)}
      showsVerticalScrollIndicator={false}
      data={realtimeFeeds}
      renderItem={renderItem}
      ListFooterComponent={isLoadMore ? <LoadingView /> : undefined}
      onEndReached={onEndReached}
    />
  );
});
