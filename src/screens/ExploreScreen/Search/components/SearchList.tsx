import { memo } from 'react';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { FlatList } from 'react-native-gesture-handler';

import { NewsObject } from 'src/models/searchNewsObjectModel';

import CheckBox from 'components/Checkbox';

import colors from 'src/themes/colors';
import fontFamily from 'src/themes/fontFamily';

import { SearchLoadingView } from './LoadingView';

import styles from '../styles';

interface SortOption {
  label: string;
  value: string[];
}

export const SORT_OPTIONS = [
  { label: 'Newest to oldest', value: ['-PUBLISHDATE'] },
  { label: 'Oldest to newest', value: ['PUBLISHDATE'] },
  { label: 'Relevance', value: ['-RELEVANCE'] },
  { label: 'Newsbrand', value: ['SOURCE', '-PUBLISHDATE'] },
];
export const SAVE_AS_OPTIONS = [
  { label: ' Save as new board', value: '' },
  { label: 'Save as saved search', value: '' },
];

interface SearchListProps {
  newsObjects: NewsObject[];
  isLoading: boolean;
  refetch: () => void;
  renderItem: ({ item }: { item: NewsObject }) => JSX.Element;
  onSelectAll: () => void;
  setSortOrder: (value: SortOption) => void;
  sortOrder: SortOption;
  isCheckedAll: boolean;
}

const ListHeaderComponent = memo(
  ({
    newsObjects,
    sortOrder,
    setSortOrder,
    onSelectAll,
    isCheckedAll,
  }: {
    newsObjects: NewsObject[];
    sortOrder: SortOption;
    setSortOrder: (value: SortOption) => void;
    onSelectAll: () => void;
    isCheckedAll: boolean;
  }) => {
    return (
      <View style={styles.listSearchHeaderContainer}>
        <View style={styles.sortContainer}>
          <View>
            <Text
              style={styles.resultFoundText}
            >{`${newsObjects.length} RESULTS FOUND`}</Text>
            <TouchableOpacity
              style={styles.selectAllButton}
              onPress={() => {
                onSelectAll();
              }}
            >
              <CheckBox size={12} checked={isCheckedAll} />
              <Text
                style={styles.selectAllText}
              >{`Select all articles on page`}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Dropdown
              iconColor={colors.primary}
              style={styles.saveAsDropdown}
              data={SAVE_AS_OPTIONS}
              labelField="label"
              valueField="value"
              placeholder={'Save as'}
              placeholderStyle={{
                color: colors.primary,
                fontFamily: fontFamily.bold,
                fontSize: 16,
              }}
              value={'Save as'}
              onChange={(__) => {}}
              renderItem={(item) => {
                return (
                  <TouchableOpacity style={styles.dropdownItem}>
                    <Text
                      style={[
                        styles.dropdownText,
                        {
                          color: colors.black,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <Dropdown
              iconColor={colors.primary}
              style={styles.sortDropdown}
              data={SORT_OPTIONS}
              labelField="label"
              valueField="value"
              placeholder={sortOrder.label}
              placeholderStyle={{
                color: colors.primary,
                fontFamily: fontFamily.bold,
                fontSize: 16,
              }}
              value={sortOrder.label}
              onChange={(item) => setSortOrder(item)}
              renderItem={(item) => {
                return (
                  <View style={styles.dropdownItem}>
                    <Text
                      style={[
                        styles.dropdownText,
                        {
                          color:
                            sortOrder.label === item.label
                              ? colors.primary
                              : colors.black,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  },
);

const SearchList = memo(
  ({
    newsObjects,
    isLoading,
    refetch,
    renderItem,
    onSelectAll,
    setSortOrder,
    sortOrder,
    isCheckedAll,
  }: SearchListProps) => {
    if (isLoading) {
      return <SearchLoadingView />;
    }

    return (
      <FlatList
        ListHeaderComponent={() => (
          <ListHeaderComponent
            newsObjects={newsObjects}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onSelectAll={onSelectAll}
            isCheckedAll={isCheckedAll}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.sectionList}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={newsObjects}
        renderItem={renderItem}
        keyExtractor={(item) => JSON.stringify(item)}
      />
    );
  },
);

export default SearchList;
