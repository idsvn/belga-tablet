import React, { memo, useCallback, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useDebounce from 'src/hooks/useDebounce';

import { useGetNewLetters } from 'src/services/kioskService';

import { Letter } from 'src/models/newslettersModel';

import { RootState } from 'src/redux/store';

import NewsLetterDetailScreen from 'src/screens/NewsLetterDetailScreen';

import CalendarButton from 'components/CalendarButton';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import { LetterEmptyView } from './components/EmptyView';
import { NewsLetterLoadingView } from './components/LoadingView';
import LetterItem from './components/NewLettersItem';
import NewsLetterList from './components/NewsLetterList';

import colors from 'src/themes/colors';

import styles from './styles';

const STEP = 20;

export const NewsLettersPage = memo(() => {
  const { t } = useTranslation();

  const paginationCount = useSelector<RootState, number>(
    (state) => state.systemStore.paginationCount,
  );

  const [offset, setOffset] = useState<number>(0);

  const [searchText, setSearchText] = useState<string>();

  const debounceSearchText = useDebounce(searchText, 500);

  const [newsletters, setNewsLetters] = useState<Letter[]>();

  const [detailLetter, setDetailLetter] = useState<Letter>();

  const [date, setDate] = useState(() => {
    const formatDate = (date: Date): string => date.toISOString().split('T')[0];

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
    paginationCount,
    offset,
    enabled: isFocused && !detailLetter,
    type: 'NEWSLETTER',
    order: '-publishDate',
    searchtext: debounceSearchText,
  });

  const isLoadMore = isFetching && paginationCount !== undefined;

  const renderItem = useCallback(
    ({ item }) => (
      <LetterItem
        key={item.id}
        data={item}
        openLetterDetail={setDetailLetter}
      />
    ),
    [],
  );

  const onEndReached = useCallback(() => {
    setOffset((prev) => prev + STEP);
  }, []);

  const onSearchChanged = useCallback((text) => {
    setNewsLetters(undefined);
    setSearchText(text);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setNewsLetters((prev) => {
        prev ??= [];
        const newData = data.data.filter(
          (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id),
        );

        return [...prev, ...newData];
      });
    }
  }, [data]);

  const onSelectStartAndEnd = useCallback((start: string, end: string) => {
    setDate({ start, end });
    setNewsLetters(undefined);
  }, []);

  const ContentView = () => {
    if (newsletters === undefined) {
      return <NewsLetterLoadingView />;
    }

    if (newsletters.length === 0) {
      return <LetterEmptyView />;
    }

    return (
      <NewsLetterList
        newsletters={newsletters}
        isLoading={isLoading}
        refetch={refetch}
        onEndReached={onEndReached}
        isLoadMore={isLoadMore}
        renderItem={renderItem}
      />
    );
  };

  return (
    <>
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
          <CalendarButton
            onSelectStartAndEnd={onSelectStartAndEnd}
            defaultLabel={t('ExploreScreen.last30Days')}
          />
        </View>
        <ContentView />
      </View>
      {detailLetter && (
        <NewsLetterDetailScreen
          onBack={() => setDetailLetter(undefined)}
          letter={detailLetter}
        />
      )}
    </>
  );
});
