import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

import uniq from 'lodash/uniq';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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

import { RootState } from 'src/redux/store';

import TrashIcon from 'src/assets/svg/trash-icon.svg';

import CalendarButton from 'components/CalendarButton';
import CloseIconSvg from 'components/svg/CloseIconSvg';
import FilterIconSvg from 'components/svg/FilterIconSvg';
import SearchIconSvg from 'components/svg/SearchIconSvg';
import VoiceIconSvg from 'components/svg/VoiceIconSvg';

import { Option } from './components/CustomMultiSelectDropdown';
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
  convertSourceToCategories,
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
    Record<FilterSection, Option[]>
  >({});

  const [newsObjects, setNewsObjects] = useState<
    (NewsObject & { checked?: boolean })[]
  >([]);

  const numberOfSelected = useMemo(() => {
    return newsObjects.filter((it) => it.checked).length;
  }, [newsObjects]);

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

    const language = (selectedFilter?.Languages?.map((it) => it.value) ||
      []) as string[];

    const mediumtypegroup = (selectedFilter?.['Content types']?.map(
      (it) => it.value,
    ) || []) as string[];

    const selectedCountry = selectedFilter?.Country || [];

    const sourceid = uniq(
      source
        .filter((it) =>
          selectedCountry?.map((it) => it.value).includes(it.country),
        )
        .map((it) => it.id),
    );

    const sourcegroup = selectedFilter?.['Newsbrands groups'] || [];

    const sourcegroupid = uniq(
      source
        .filter((it) =>
          sourcegroup.map((it) => it.value).includes(it.sourceGroup),
        )
        .map((it) => it.sourceGroupId),
    );

    return { language, sourceid, sourcegroupid, mediumtypegroup };
  }, [selectedFilter, sourceData]);

  const paginationCount = useSelector<RootState, number>(
    (state) => state.systemStore.paginationCount,
  );

  const { data, isLoading, refetch } = useGetNewsObjects({
    searchtext: debounceSearchText,
    count: paginationCount,
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
  }, [selectedFilter, sortOrder, refetch]);

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
        onPressCheckBox={() => {
          setNewsObjects((prev) => {
            return prev.map((news) => {
              if (news.uuid === item.uuid) {
                return { ...news, checked: !news.checked };
              }

              return news;
            });
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

    data.push(convertSourceToCategories(sourceData?.data ?? []));

    return data;
  }, [mediumtypegroupData, sourceGroupData, sourceData]);

  const handleSavedSearchPress = useCallback((queryObject: QueryObject) => {
    setSearchText(queryObject.searchText);
    setSelectedSearchMode(queryObject.searchMode);
    setDate({ start: queryObject.start, end: queryObject.end });
    setSelectedFilter({
      Languages: queryObject.languages,
      'Content types': queryObject.mediaTypes,
      Country: queryObject.country,
      'Newsbrands groups': queryObject.sourcegroupid,
      Newsbrands: queryObject.sourceid,
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setNewsObjects((prev) => prev.map((item) => ({ ...item, checked: true })));
  }, []);

  const handleDeleteAll = useCallback(() => {
    setNewsObjects((prev) => prev.map((item) => ({ ...item, checked: false })));
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
            onSelectAll={
              numberOfSelected === newsObjects.length
                ? handleDeleteAll
                : handleSelectAll
            }
            isCheckedAll={numberOfSelected === newsObjects.length}
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
      {numberOfSelected > 0 ? (
        <View
          style={{
            backgroundColor: colors.background,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              width: '80%',
              backgroundColor: colors.primary,
              paddingVertical: 20,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
            }}
          >
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text
                style={{ color: '#ffffff', fontWeight: 'bold' }}
              >{`${numberOfSelected || 0} ${t('FavoritesScreen.itemSelectedText')}`}</Text>
              {numberOfSelected && (
                <TouchableOpacity onPress={handleSelectAll}>
                  <Text style={{ color: '#ffffff', fontSize: 12 }}>
                    {t('FavoritesScreen.clearSelectionText')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flexDirection: 'row', gap: 3 }}>
              {/* <TouchableOpacity>
                <ShareIcon width={25} height={20} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={handleDeleteAll}>
                <TrashIcon width={25} height={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
});
