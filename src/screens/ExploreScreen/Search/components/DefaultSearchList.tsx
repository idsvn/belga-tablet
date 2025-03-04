import { memo, useCallback } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import {
  useGetSavedSearch,
  useGetSearchHistory,
} from 'src/services/searchService';

import { SavedSearch } from 'src/models/savedSearchModel';
import { SearchHistory } from 'src/models/searchHistoryModel';

import { RootState } from 'src/redux/store';

import SearchIconSvg from 'components/svg/SearchIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const DefaultSearchList = () => {
  const { t } = useTranslation();

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { data: savedSearchData } = useGetSavedSearch(userId, {
    order: '-CREATEDATE',
  });

  const { data: previousSearchData } = useGetSearchHistory(userId, {
    count: 5,
  });

  const renderSavedSearchItem = useCallback(
    ({ item }: { item: SavedSearch }) => {
      return (
        <TouchableOpacity>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.savedSearchItem}
          >
            <View style={styles.overlay} />
            <SearchIconSvg color="white" />
            <Text style={styles.savedSearchTitle}>{item.name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    },
    [],
  );

  const renderSearchHistoryItem = useCallback(
    ({ item }: { item: SearchHistory }) => {
      return (
        <TouchableOpacity style={styles.searchHistoryItem}>
          <SearchIconSvg color={colors.gray100} />
          <View>
            <Text style={styles.searchHistoryTitle}>
              {item.queryObject.searchText}
            </Text>
            <Text style={styles.searchHistoryDate}>
              {moment(item.searchDate).format('DD/MM/YYYY - HH:mm')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {t('ExploreScreen.savedSearch')}
        </Text>
        <View style={styles.line}></View>
      </View>
      <FlatList
        style={{ flexGrow: 0 }}
        data={savedSearchData?.data}
        horizontal
        renderItem={renderSavedSearchItem}
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {t('ExploreScreen.previousSearch')}
        </Text>
        <View style={styles.line}></View>
      </View>
      <FlatList
        data={previousSearchData?.data}
        renderItem={renderSearchHistoryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 8,
    gap: 30,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.gray100,
    fontFamily: fontFamily.regular,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: colors.gray100,
  },
  savedSearchItem: {
    height: 100,
    width: 200,
    marginRight: 30,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    opacity: 0.5,
  },
  savedSearchTitle: {
    fontSize: 20,
    color: colors.textWhite,
    fontFamily: fontFamily.bold,
  },
  searchHistoryItem: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchHistoryTitle: {
    fontSize: 16,
    color: colors.gray100,
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
  searchHistoryDate: {
    fontSize: 16,
    color: colors.gray100,
    fontFamily: fontFamily.regular,
  },
});

export default memo(DefaultSearchList);
