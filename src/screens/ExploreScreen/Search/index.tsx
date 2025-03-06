import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import uniq from 'lodash/uniq';
import { useTranslation } from 'react-i18next';

// Thêm Dropdown component
import useDebounce from 'src/hooks/useDebounce';

import { COUNTRIES, LANGUAGES } from 'src/constants';
import { PATH_SCREEN } from 'src/constants/pathName';

import {
  useGetMediumTypeGroups,
  useGetNewsObjects,
  useGetSources,
  useGetSourcesGroup,
} from 'src/services/searchService';

import { NewsObject } from 'src/models/searchNewsObjectModel';

import CalendarButton from 'components/CalendarButton';
import CloseIconSvg from 'components/svg/CloseIconSvg';
import FilterIconSvg from 'components/svg/FilterIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import DefaultSearchList from './components/DefaultSearchList';
import DropdownSearchType from './components/DropdownSearchType';
import FilterModal, { FilterCategory } from './components/FilterModal';
import SearchItem from './components/SearchItem';
import SearchList, { SORT_OPTIONS } from './components/SearchList';

import { navigate } from 'App';

import colors from 'src/themes/colors';

import {
  convertMediumTypeToCategories,
  convertSourceGroupToCategories,
} from './utils';

import { FilterSection } from './type';

import styles from './styles';

interface QueryObject {
  searchText: string;
  collapseDuplicates: boolean;
  exactQuery: boolean;
  mediaTypes: any[];
  favouriteNewsbrands: boolean;
  languages: any[];
  keyword: any[];
  title: string;
  intro: string;
  author: string;
  publisher: any[];
  pagenr: any[];
  wordcountmin: string;
  wordcountmax: string;
  tagid: any[];
  start: string;
  end: string;
  sourceid: any[];
  subsourceid: any[];
  edition: any[];
  sourcegroupid: any[];
  order: string;
  country: any[];
  searchMode: string;
  isManual: boolean;
  dateRangeType: string;
  topicIds: any[];
}

export const SearchPage = memo(() => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState<string>();

  const debounceSearchText = useDebounce(searchText, 500);

  const [selectedSearchMode, setSelectedSearchMode] = useState('one_of');

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<
    Record<FilterSection, (number | string)[]>
  >({});

  const [newsObjects, setNewsObjects] = useState<
    (NewsObject & { checked?: boolean })[]
  >([]);

  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS[0]);

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

  const { data: sourceData } = useGetSources();

  const filterParams = useMemo(() => {
    const source = sourceData?.data || [];

    const language = (selectedFilter?.Languages || []) as string[];

    const mediumtypegroup = (selectedFilter?.['Content types'] ||
      []) as string[];

    const selectedCountry = selectedFilter?.Country || [];

    const sourceid = uniq(
      source
        .filter((it) => selectedCountry.includes(it.country))
        .map((it) => it.id),
    );

    const sourcegroup = selectedFilter?.['Newsbrands groups'] || [];

    const sourcegroupid = uniq(
      source
        .filter((it) => sourcegroup.includes(it.sourceGroup))
        .map((it) => it.sourceGroupId),
    );

    return { language, sourceid, sourcegroupid, mediumtypegroup };
  }, [selectedFilter, sourceData]);

  const { data, isLoading, refetch } = useGetNewsObjects({
    searchtext: debounceSearchText,
    count: 20,
    searchMode: selectedSearchMode,
    offset: 0,
    highlight: true,
    snippets: true,
    language: filterParams.language,
    mediumtypegroup: filterParams.mediumtypegroup,
    edition: [],
    sourceid: filterParams.sourceid,
    sourcegroupid: filterParams.sourcegroupid,
    subsourceid: [],
    topicids: [],
    start: start,
    end: end,
    keyword: [],
    author: [],
    publisher: [],
    exactquery: false,
    collapseduplicates: false,
    order: sortOrder.value,
  });

  const { data: mediumtypegroupData } = useGetMediumTypeGroups();

  const { data: sourceGroupData } = useGetSourcesGroup();

  useEffect(() => {
    if (data?.data) {
      setNewsObjects(data?.data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [selectedFilter, sortOrder, refetch]); // Thêm sortOrder vào dependency để refetch khi thay đổi

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

    data.push({ title: 'Languages', options: LANGUAGES });
    data.push({ title: 'Country', options: COUNTRIES });
    if (sourceGroupData?.data) {
      data.push(convertSourceGroupToCategories(sourceGroupData.data));
    }

    return data;
  }, [mediumtypegroupData, sourceGroupData]);

  const handleSavedSearchPress = useCallback((queryObject: QueryObject) => {
    setSearchText(queryObject.searchText);
    setSelectedSearchMode(queryObject.searchMode);
    setDate({ start: queryObject.start, end: queryObject.end });
    setSelectedFilter({
      Languages: queryObject.languages,
      'Content types': queryObject.mediaTypes,
      Country: queryObject.country,
      'Newsbrands groups': queryObject.sourcegroupid,
    });
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
              value={searchText}
            />
            {!!searchText && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <CloseIconSvg />
              </TouchableOpacity>
            )}
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
            onPress={() => setIsFilterModalVisible(true)}
          >
            <FilterIconSvg />
          </TouchableOpacity>
        </View>
        {debounceSearchText ? (
          <SearchList
            newsObjects={newsObjects}
            isLoading={isLoading}
            refetch={refetch}
            renderItem={renderItem}
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
            onSelectAll={() => {
              setNewsObjects((prev) =>
                prev.map((item) => ({ ...item, checked: !item.checked })),
              );
            }}
          />
        ) : (
          <DefaultSearchList onPressSavedSearch={handleSavedSearchPress} />
        )}
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        selections={selectedFilter}
        setSelections={setSelectedFilter}
        categories={categories}
      />
    </>
  );
});
