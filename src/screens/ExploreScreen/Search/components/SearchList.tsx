import { Dispatch, memo, SetStateAction, useState } from 'react';
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

interface SearchListProps {
  newsObjects: NewsObject[];
  isLoading: boolean;
  refetch: () => void;
  renderItem: ({ item }: { item: NewsObject }) => JSX.Element;
  onSelectAll: () => void;
  setSortOrder: (value: SortOption) => void;
  sortOrder: SortOption;
}

const ListHeaderComponent = memo(
  ({
    newsObjects,
    sortOrder,
    setSortOrder,
    onSelectAll,
    isCheckedAll,
    setIsCheckedAll,
  }: {
    newsObjects: NewsObject[];
    sortOrder: SortOption;
    setSortOrder: (value: SortOption) => void;
    onSelectAll: () => void;
    isCheckedAll: boolean;
    setIsCheckedAll: Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <View style={styles.listSearchHeaderContainer}>
        <View style={styles.sortContainer}>
          <Text
            style={styles.resultFoundText}
          >{`${newsObjects.length} RESULTS FOUND`}</Text>
          <Dropdown
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
        <TouchableOpacity
          style={styles.selectAllButton}
          onPress={() => {
            onSelectAll();
            setIsCheckedAll((prev) => !prev);
          }}
        >
          <CheckBox size={12} checked={isCheckedAll} />
          <Text
            style={styles.selectAllText}
          >{`Select all articles on page`}</Text>
        </TouchableOpacity>
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
  }: SearchListProps) => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);

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
            setIsCheckedAll={setIsCheckedAll}
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
