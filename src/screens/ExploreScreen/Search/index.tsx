import React, { memo, useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import useDebounce from 'src/hooks/useDebounce';

import { useGetNewsObjects } from 'src/services/searchService';

import { NewsObject } from 'src/models/searchNewsObjectModel';

import CalendarButton from 'components/CalendarButton';
import FilterIconSvg from 'components/svg/FilterIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import DefaultSearchList from './components/DefaultSearchList';
import DropdownSearchType from './components/DropdownSearchType';
import SearchItem from './components/SearchItem';
import SearchList from './components/SearchList';

import colors from 'src/themes/colors';

import styles from './styles';

export const SearchPage = memo(() => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>();

  const debounceSearchText = useDebounce(searchText, 500);

  const [selectedSearchMode, setSelectedSearchMode] = useState('one_of');

  const [date, setDate] = useState(() => {
    const formatDate = (date: Date): string => date.toISOString().split('T')[0];

    const today = new Date();

    const dayAgo = new Date();

    dayAgo.setDate(today.getDate() - 1);

    return {
      start: formatDate(dayAgo),
      end: formatDate(today),
    };
  });

  const { start, end } = date;

  const { data, error } = useGetNewsObjects({
    searchtext: '"hi"',
    count: 20,
    offset: 0,
    highlight: true,
    snippets: true,
    language: [],
    mediumtypegroup: [],
    edition: [],
    sourceid: [],
    sourcegroupid: [],
    subsourceid: [],
    topicids: [],
    start: '2025-03-04T00:56:59',
    end: '2025-03-05T00:56:59',
    periodType: 'LAST_24_HOURS',
    keyword: [],
    author: [],
    publisher: [],
    exactquery: false,
    collapseduplicates: false,
    order: ['PUBLISHDATE'],
  });

  console.log(error);

  const onSearchChanged = useCallback((text) => {
    setSearchText(text);
  }, []);

  const onSelectStartAndEnd = useCallback((start: string, end: string) => {
    setDate({ start, end });
  }, []);

  const renderItem = useCallback(({ item }: { item: NewsObject }) => {
    return <SearchItem {...item} />;
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <SearchIconSvg />
            <DropdownSearchType
              selectedValue={selectedSearchMode}
              onChange={setSelectedSearchMode}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={t('ExploreScreen.search')}
              placeholderTextColor={colors.gray200}
              onChangeText={onSearchChanged}
            />
            <TouchableOpacity onPress={() => {}}>
              <VoiceIconSvg />
            </TouchableOpacity>
          </View>
          <CalendarButton
            initStartDate={start}
            initEndDate={end}
            onSelectStartAndEnd={onSelectStartAndEnd}
            defaultLabel={t('ExploreScreen.last24Hours')}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
            <FilterIconSvg />
          </TouchableOpacity>
        </View>

        {debounceSearchText ? (
          <SearchList
            newsObjects={data?.data || []}
            isLoading={false}
            refetch={() => {}}
            renderItem={renderItem}
          />
        ) : (
          <DefaultSearchList />
        )}
      </View>
    </>
  );
});
