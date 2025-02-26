import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SectionList } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useDebounce from 'src/hooks/useDebounce';

import { useGetNewLetters } from 'src/services/kioskService';

import { formatDate } from 'src/helpers/utils';

import { Letter } from 'src/models/newslettersModel';

import { RootState } from 'src/redux/store';

import CalendarButton from 'components/CalendarButton';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import LetterItem from './components/NewLettersItem';

import colors from 'src/themes/colors';

import styles from './styles';

const STEP = 20;

export const NewsLettersPage = memo(() => {
  const { t } = useTranslation();

  const [count, setCount] = useState<number>(STEP);

  const [offset, setOffset] = useState<number>(0);

  const [searchText, setSearchText] = useState<string>();

  const debounceSearchText = useDebounce(searchText, 500);

  const [newsletters, setNewsletters] = useState<Letter[]>([]);

  const [date, setDate] = useState(() => {
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    const today = new Date();

    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(today.getDate() - 30);

    return {
      start: formatDate(thirtyDaysAgo),
      end: formatDate(today),
    };
  });

  const { start, end } = date;

  const isFocused = useIsFocused();

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { data, isFetching, refetch, isLoading } = useGetNewLetters({
    userId,
    start,
    end,
    count,
    offset,
    enabled: isFocused,
    type: 'NEWSLETTER',
    order: '-publishDate',
    searchtext: debounceSearchText,
  });

  const isLoadMore = isFetching && count !== undefined;

  const renderItem = useCallback(({ item }) => {
    return <LetterItem key={item.id} data={item} />;
  }, []);

  const onEndReached = useCallback(() => {
    setCount(STEP);
    setOffset((prev) => prev + STEP);
  }, []);

  const onSearchChanged = useCallback((text) => {
    setNewsletters([]);
    setSearchText(text);
  }, []);

  // Group data by date
  const groupedData = useMemo(() => {
    const grouped: { [key: string]: Letter[] } = {};

    newsletters.forEach((item) => {
      const dateKey = formatDate(item.publishDate);

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(item);
    });

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  }, [newsletters]);

  // Update newsletters state when new data is fetched
  useEffect(() => {
    if (data?.data) {
      setNewsletters((prev) => {
        const newData = data.data.filter(
          (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id),
        );

        return [...prev, ...newData];
      });
    }
  }, [data]);

  const onSelectStartAndEnd = useCallback((start: string, end: string) => {
    setDate({ start, end });
    setNewsletters([]);
  }, []);

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

        <CalendarButton onSelectStartAndEnd={onSelectStartAndEnd} />
      </View>
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
        ListFooterComponent={() => {
          if (newsletters.length === 0) {
            return undefined;
          }

          return (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={onEndReached}
            >
              {isLoadMore ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={styles.loadMore}>Load more</Text>
              )}
            </TouchableOpacity>
          );
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
});
