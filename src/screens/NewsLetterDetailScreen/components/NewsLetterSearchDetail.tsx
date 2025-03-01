import { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { useGetKioskNewsObject } from 'src/services/newsObjectService';

import { RootState } from 'src/redux/store';

import RealtimeFeedItem from 'src/screens/ExploreScreen/RealtimeFeed/RealtimeFeedItem';

import { LoadingView, RealTimeLoadingView } from './LoadingView';

interface NewsLetterSearchDetailType {
  newsLetterId?: number;
  searchtext: string;
  start: string;
  end: string;
}
const STEP = 20;

const NewsLetterSearchDetail = ({
  newsLetterId,
  searchtext,
  start,
  end,
}: NewsLetterSearchDetailType) => {
  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const paginationCount = useSelector<RootState, number>(
    (state) => state.systemStore.paginationCount,
  );

  const [offset, setOffset] = useState<number>(0);

  const [realtimeFeeds, setRealtimeFeeds] = useState<any>();

  const isFocused = useIsFocused();

  const {
    data: newsLetterData,
    isFetching,
    isLoading,
    refetch,
  } = useGetKioskNewsObject({
    offset,
    start,
    end,
    count: paginationCount,
    userId: userId,
    newsletterId: newsLetterId ?? 1,
    highlight: true,
    order: '-PUBLISHDATE',
    searchtext: searchtext,
    enabled: isFocused && !!searchtext && !!newsLetterId,
  });

  const isLoadMore = isFetching && paginationCount !== undefined;

  const renderItem = useCallback(({ item }) => {
    return <RealtimeFeedItem {...item} />;
  }, []);

  const onEndReached = useCallback(() => {
    setOffset((prev) => prev + STEP);
  }, []);

  useEffect(() => {
    if (newsLetterData?.data) {
      setRealtimeFeeds((prev) => {
        const combined = [prev ?? [], newsLetterData?.data ?? []].flat();

        const uniqueMap = combined.reduce((acc, item) => {
          acc[item.uuid] = item;

          return acc;
        }, {});

        return Object.values(uniqueMap);
      });
    }
  }, [newsLetterData]);

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
};

export default memo(NewsLetterSearchDetail);
