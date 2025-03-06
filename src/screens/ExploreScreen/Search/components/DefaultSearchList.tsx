import { memo, useCallback, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  useGetSavedSearch,
  useGetSearchHistory,
} from 'src/services/searchService';

import { QueryObject, SavedSearch } from 'src/models/savedSearchModel';
import { SearchHistory } from 'src/models/searchHistoryModel';

import { RootState } from 'src/redux/store';

import ScrollView from 'components/customs/ScrollView';
import SearchIconSvg from 'components/svg/SearchIconSvg';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

const DefaultSearchList = ({
  onPressSavedSearch,
}: {
  onPressSavedSearch: (queryObject: QueryObject) => void;
}) => {
  const { t } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);

  const userId = useSelector<RootState, number>(
    (state) => state.userStore.user.id,
  );

  const { data: savedSearchData, refetch: refetchSavedSearch } =
    useGetSavedSearch(userId, {
      order: '-CREATEDATE',
    });

  const { data: previousSearchData, refetch: refetchSearchHistory } =
    useGetSearchHistory(userId, {
      count: 5,
    });

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchSavedSearch(), refetchSearchHistory()]);
    setRefreshing(false);
  };

  const renderSavedSearchItem = useCallback(
    ({ item }: { item: SavedSearch }) => {
      return (
        <TouchableOpacity onPress={() => onPressSavedSearch(item.queryObject)}>
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
      <View style={{ gap: 10, marginLeft: 10 }}>
        {previousSearchData?.data?.map((item: SearchHistory) => (
          <TouchableOpacity
            key={item.id}
            style={styles.searchHistoryItem}
            onPress={() => onPressSavedSearch(item.queryObject)}
          >
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
        ))}
      </View>
    </ScrollView>
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
  savedSearchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  savedSearchItem: {
    height: 100,
    width: 200,
    marginRight: 10,
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
