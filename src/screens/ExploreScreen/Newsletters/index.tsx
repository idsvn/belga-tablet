import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useGetRealtimeFeed } from 'src/services/newsObjectService';

import CalendarButton from 'components/CalendarButton';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import LatestPressReleaseItem from '../LatestPressRelease/components/LatestPressReleaseItem';

import colors from 'src/themes/colors';

import styles from './styles';

const STEP = 20;

export const NewsLettersPage = memo(() => {
  const { t } = useTranslation();

  const [count, setCount] = useState<number>(STEP);

  const [offset, setOffset] = useState<number>(0);

  const [newsletters, setNewsletters] = useState<any>();

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
    return <LatestPressReleaseItem {...item} />;
  }, []);

  const onEndReached = useCallback(() => {
    setCount(STEP);
    setOffset((prev) => prev + STEP);
  }, []);

  const onSearchChanged = useCallback(() => {}, []);

  useEffect(() => {
    if (data?.data) {
      setNewsletters((prev) => {
        const combined = [prev ?? [], data?.data ?? []].flat();

        const uniqueMap = combined.reduce((acc, item) => {
          acc[item.uuid] = item;

          return acc;
        }, {});

        return Object.values(uniqueMap);
      });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchIconSvg />
          <TextInput
            style={styles.searchInput}
            placeholder={t('ExploreScreen.newsLettersSearchPlaceHolder')}
            placeholderTextColor={colors.gray200}
            onChangeText={onSearchChanged}
          />
          <TouchableOpacity onPress={() => {}}>
            <VoiceIconSvg />
          </TouchableOpacity>
        </View>

        <CalendarButton onSelectStartAndEnd={() => {}} />
      </View>
    </View>
  );

  //   return (
  //     <FlatList
  //       refreshControl={
  //         <RefreshControl refreshing={isLoading} onRefresh={refetch} />
  //       }
  //       keyExtractor={(item) => item.uuid + JSON.stringify(item.tags)}
  //       showsVerticalScrollIndicator={false}
  //       data={realtimeFeeds}
  //       renderItem={renderItem}
  //       ListFooterComponent={isLoadMore ? <LoadingView /> : undefined}
  //       onEndReached={onEndReached}
  //     />
  //   );
});
