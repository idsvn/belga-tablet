import { useQuery } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { MediumTypeGroupModel } from 'src/models/mediumTypeGroupModel';
import { SavedSearchModel } from 'src/models/savedSearchModel';
import { SearchHistoryModel } from 'src/models/searchHistoryModel';
import { SourceGroupModel } from 'src/models/sourceGroupModel';
import { SourceModel } from 'src/models/sourceModel';
import { QueryParams } from 'src/models/systemModel';

import axiosService from './axiosService';

interface SavedSearchParams {
  order?: string;
}

const searchService = {
  getSavedSearch: async (
    userid: number,
    params: SavedSearchParams,
  ): Promise<SavedSearchModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userid}/savedsearches`,
      method: 'GET',
      params: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getSearchHistory: async (
    userid: number,
    params: QueryParams,
  ): Promise<SearchHistoryModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userid}/searchhistory`,
      method: 'GET',
      params: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getSources: async (): Promise<SourceModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/sources`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getSourceGroups: async (): Promise<SourceGroupModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/sourcegroups`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getMediumTypeGroups: async (): Promise<MediumTypeGroupModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/mediumtypegroups`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useGetSavedSearch(userid: number, params: SavedSearchParams) {
  return useQuery(
    [QUERY_KEY.SAVED_SEARCH, params.order],
    async () => await searchService.getSavedSearch(userid, params),
  );
}

export function useGetSearchHistory(userid: number, params: QueryParams) {
  return useQuery(
    [QUERY_KEY.SEARCH_HISTORY, params.count],
    async () => await searchService.getSearchHistory(userid, params),
  );
}

export function useGetSourcesGroup() {
  return useQuery(
    [QUERY_KEY.SOURCES_GROUP],
    async () => await searchService.getSourceGroups(),
  );
}

export function useGetSources() {
  return useQuery(
    [QUERY_KEY.SOURCES],
    async () => await searchService.getSources(),
  );
}

export function useGetMediumTypeGroups() {
  return useQuery(
    [QUERY_KEY.MEDIUM_TYPE_GROUPS],
    async () => await searchService.getMediumTypeGroups(),
  );
}
