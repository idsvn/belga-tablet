import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import useDebounce from 'src/hooks/useDebounce';

import { PATH_SCREEN } from 'src/constants/pathName';
import { QUERY_KEY } from 'src/constants/queryKey';

import newsObjectService from 'src/services/newsObjectService';
import tagService from 'src/services/tagService';

import { QueryParams, QueryParamType } from 'src/models/systemModel';
import { UserModel } from 'src/models/userModel';

import { RootState } from 'src/redux/store';

import FavoritesIcon from 'src/assets/svg/favorites-icon.svg';
import ShareIcon from 'src/assets/svg/share-transparent-icon.svg';
import TrashIcon from 'src/assets/svg/trash-icon.svg';

import CalendarButton from 'components/CalendarButton';
import CheckBox from 'components/Checkbox';
import LoadingFooter from 'components/customs/LoadingFooter';
import RefreshControl from 'components/customs/RefreshControl';
import Text from 'components/customs/Text';
import TextInput from 'components/customs/TextInput';
import EmptyDataFlatList from 'components/EmptyDataFlatList';
import { globalLoading } from 'components/GlobalLoading';
import PrimaryLayout from 'components/Layout/PrimaryLayout';
import SearchSvg from 'components/svg/SearchSvg';
import VoiceSvg from 'components/svg/VoiceSvg';

import FavoritesItem from './components/FavoritesItem';

import { navigate, queryClient } from 'App';

import theme from 'src/themes';

import styles from './styles';

const COUNT_DEFAULT = 20;

const FavoritesScreen = () => {
  const { t } = useTranslation();

  const isFetchingNextPageFavorites = useRef<boolean>(false);

  const user = useSelector<RootState, UserModel>(
    (state) => state.userStore.user,
  );

  const [tagIds, setTagIds] = useState<number[]>([]);

  const [searchPagination, __setSearchPagination] = useState<QueryParams>({
    start: null,
    end: null,
  });

  const [favoritesSelected, setFavoritesSelected] = useState<string[]>([]);

  const [textInput, setTextInput] = useState<string>('');

  const textInputDebounce = useDebounce(textInput, 500);

  const [date, setDate] = useState<{ start: string; end: string }>();

  useEffect(() => {
    if (user.id) {
      getTags(user.id);
    }
  }, [user]);

  const {
    data: favoritesData,
    fetchNextPage,
    isRefetching,
    isLoading,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      QUERY_KEY.FAVORITES,
      tagIds,
      searchPagination,
      textInputDebounce,
      date?.start,
      date?.end,
    ],
    async ({ pageParam = 0 }) => {
      const params: QueryParams = {
        offset: pageParam * COUNT_DEFAULT,
        count: COUNT_DEFAULT,
        types: [
          QueryParamType.NEWS,
          QueryParamType.CLIPPING,
          QueryParamType.DOCUMENT,
          QueryParamType.BELGA_COVERAGE,
          QueryParamType.BELGA_PHOTO,
        ],
        start: date?.start,
        end: date?.end,
      };

      params.tagid = tagIds;
      if (searchPagination.start) {
        params.start = searchPagination.start;
      }

      if (searchPagination.end) {
        params.end = searchPagination.end;
      }

      if (textInputDebounce) {
        params.searchtext = textInputDebounce;
      }

      const response = await newsObjectService.getNewsObject(params);

      isFetchingNextPageFavorites.current = false;

      return {
        ...response,
        currentPage: pageParam,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        const totalNumber =
          favoritesData?.pages?.flatMap((item) => item.data)?.length || 0;

        if (totalNumber < lastPage?._meta?.total) {
          return lastPage.currentPage + 1;
        }

        return undefined;
      },
      keepPreviousData: true,
      enabled: tagIds?.length > 0,
    },
  );

  const getTags = async (userId: number) => {
    try {
      const tagsRes = await tagService.getTagsByUserId(userId, {
        subscribed: false,
        type: QueryParamType.SAVED_NEWS,
      });

      if (tagsRes) {
        const ids = tagsRes?.data?.map((tag) => tag.id);

        setTagIds(ids);
      }
    } catch (error) {
      console.log('🚀 ~ getTags ~ error:', error);
    }
  };

  const favorites = useMemo(() => {
    return favoritesData?.pages?.flatMap((item) => item.data) || [];
  }, [favoritesData]);

  const handleLoadMore = () => {
    if (!isFetchingNextPageFavorites.current) {
      isFetchingNextPageFavorites.current = true;
      fetchNextPage();
    }
  };

  const handleNavigate = (id: string) => {
    navigate(PATH_SCREEN.NEWSPAPER_DETAIL_SCREEN, {
      id,
    });
  };

  const handlePressCheckBox = (uuid: string) => {
    if (favoritesSelected.includes(uuid)) {
      setFavoritesSelected((pre) => pre.filter((id) => id !== uuid));
    } else {
      setFavoritesSelected([...favoritesSelected, uuid]);
    }
  };

  const handleSelectAll = () => {
    if (favoritesSelected.length > 0) {
      setFavoritesSelected([]);
    } else {
      setFavoritesSelected(favorites.map((favorite) => favorite.uuid));
    }
  };

  const deleteTagsMutation = useMutation(
    async (tagsToDelete: string[]) => {
      const tagsPromise = tagsToDelete.map((item) =>
        tagService.updateTag(item),
      );

      await Promise.all(tagsPromise);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [QUERY_KEY.FAVORITES, tagIds, searchPagination, textInputDebounce],
          (oldData: any) => {
            if (!oldData) return oldData;

            const updatedPages = oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.filter(
                (item: any) => !variables.includes(item.uuid),
              ),
            }));

            return {
              ...oldData,
              pages: updatedPages,
            };
          },
        );

        setFavoritesSelected([]);
        console.log('All tags deleted successfully');
      },
      onError: (error) => {
        console.error('Error deleting tags', error);
      },
      onSettled: () => {
        globalLoading.hide();
      },
    },
  );

  const handleDeletedTags = () => {
    globalLoading.show();
    deleteTagsMutation.mutate(favoritesSelected);
  };

  const onSelectStartAndEnd = useCallback((start: string, end: string) => {
    setDate({ start, end });
  }, []);

  return (
    <PrimaryLayout>
      <View style={styles.container}>
        <View style={styles.contentView}>
          <FavoritesIcon width={18} height={32} />
          <Text style={styles.titleText}>
            {t('FavoritesScreen.yourFavoritesText')}
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <SearchSvg width={'20'} height={'20'} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('FavoritesScreen.searchPlaceholderNewsletters')}
              onChangeText={(text) => setTextInput(text)}
            />
            <TouchableOpacity onPress={() => {}}>
              <VoiceSvg width={'20'} height={'20'} />
            </TouchableOpacity>
          </View>
          <CalendarButton onSelectStartAndEnd={onSelectStartAndEnd} />
        </View>
        <TouchableOpacity style={styles.checkboxView} onPress={handleSelectAll}>
          <CheckBox size={15} onPress={handleSelectAll} />
          <Text>{t('FavoritesScreen.allText')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isRefetching}
            onRefresh={refetch}
          />
        }
        style={styles.flatList}
        data={favorites}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__item, index) => index.toString()}
        renderItem={({ item }) => {
          const checked = favoritesSelected.includes(item.uuid);

          return (
            <FavoritesItem
              {...item}
              checked={checked}
              onPress={() => handleNavigate(item.uuid)}
              onPressCheckBox={() => handlePressCheckBox(item.uuid)}
            />
          );
        }}
        ListFooterComponent={<LoadingFooter loading={isFetchingNextPage} />}
        ListEmptyComponent={<EmptyDataFlatList />}
        onEndReached={handleLoadMore}
      />
      {favoritesSelected.length > 0 ? (
        <View
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              width: '80%',
              backgroundColor: theme.colors.primary,
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
              >{`${favoritesSelected?.length || 0} ${t('FavoritesScreen.itemSelectedText')}`}</Text>
              {favoritesSelected?.length && (
                <TouchableOpacity onPress={handleSelectAll}>
                  <Text style={{ color: '#ffffff', fontSize: 12 }}>
                    {t('FavoritesScreen.clearSelectionText')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flexDirection: 'row', gap: 3 }}>
              <TouchableOpacity>
                <ShareIcon width={25} height={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletedTags}>
                <TrashIcon width={25} height={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </PrimaryLayout>
  );
};

export default FavoritesScreen;
