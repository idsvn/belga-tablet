import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import useDebounce from 'src/hooks/useDebounce';

import { COUNTRIES, LANGUAGES } from 'src/constants';
import { PATH_SCREEN } from 'src/constants/pathName';

import {
  useGetMediumTypeGroups,
  useGetNewsObjects,
} from 'src/services/searchService';

import { NewsObject } from 'src/models/searchNewsObjectModel';

import CalendarButton from 'components/CalendarButton';
import FilterIconSvg from 'components/svg/FilterIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import DefaultSearchList from './components/DefaultSearchList';
import DropdownSearchType from './components/DropdownSearchType';
import FilterModal, { FilterCategory } from './components/FilterModal';
import SearchItem from './components/SearchItem';
import SearchList from './components/SearchList';

import { navigate } from 'App';

import colors from 'src/themes/colors';

import { convertMediumTypeToCategories } from './utils';

import styles from './styles';

export const SearchPage = memo(() => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>();

  const debounceSearchText = useDebounce(searchText, 500);

  const [selectedSearchMode, setSelectedSearchMode] = useState('one_of');

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [newsObjects, setNewsObjects] = useState<
    (NewsObject & { checked?: boolean })[]
  >([]);

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

  const { data, isLoading } = useGetNewsObjects({
    searchtext: debounceSearchText,
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

  const { data: mediumtypegroupData } = useGetMediumTypeGroups();

  useEffect(() => {
    if (data?.data) {
      setNewsObjects(data?.data);
    }
  }, [data]);

  const onSearchChanged = useCallback((text) => {
    setSearchText(text);
  }, []);

  const onSelectStartAndEnd = useCallback((start: string, end: string) => {
    setDate({ start, end });
  }, []);

  const renderItem = useCallback(({ item }: { item: NewsObject }) => {
    return (
      <SearchItem
        {...item}
        onPress={() => {
          navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, { id: item.uuid });
        }}
        onPressShare={() => {
          navigate(PATH_SCREEN.SHARE_SCREEN, {
            id: item.uuid,
            source: item?.source,
            title: item?.title,
          });
        }}
      />
    );
  }, []);

  const categories = useMemo(() => {
    const data: FilterCategory[] = [];

    if (mediumtypegroupData?.data) {
      data.push(convertMediumTypeToCategories(mediumtypegroupData.data));
    }

    data.push({
      title: 'Languages',
      options: LANGUAGES,
    });

    data.push({
      title: 'Country',
      options: COUNTRIES,
    });

    return data;
  }, [mediumtypegroupData]);

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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setIsFilterModalVisible(true);
            }}
          >
            <FilterIconSvg />
          </TouchableOpacity>
        </View>

        {debounceSearchText ? (
          <SearchList
            newsObjects={newsObjects}
            isLoading={isLoading}
            refetch={() => {}}
            renderItem={renderItem}
            onSelectAll={() => {
              setNewsObjects((prev) => {
                return prev.map((item) => {
                  return {
                    ...item,
                    checked: !item.checked,
                  };
                });
              });
            }}
          />
        ) : (
          <DefaultSearchList />
        )}
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onSelectionsChange={() => {}}
        categories={categories}
      />
    </>
  );
});
