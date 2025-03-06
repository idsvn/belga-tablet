import { useQuery } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { MediumTypeGroupModel } from 'src/models/mediumTypeGroupModel';
import { SavedSearchModel } from 'src/models/savedSearchModel';
import { SearchHistoryModel } from 'src/models/searchHistoryModel';
import { SearchNewsObjectModel } from 'src/models/searchNewsObjectModel';
import { SourceGroupModel } from 'src/models/sourceGroupModel';
import { SourceModel } from 'src/models/sourceModel';
import { QueryParams } from 'src/models/systemModel';

import axiosService from './axiosService';

interface NewsObjectsParams {
  searchtext?: string;
  count?: number;
  offset?: number;
  highlight?: boolean;
  snippets?: boolean;
  language?: string[];
  mediumtypegroup?: string[];
  edition?: string[];
  sourceid?: string[];
  sourcegroupid?: string[];
  subsourceid?: string[];
  topicids?: string[];
  start?: string; // Format: "YYYY-MM-DDTHH:mm:ss"
  end?: string; // Format: "YYYY-MM-DDTHH:mm:ss"
  periodType?: string;
  keyword?: string[];
  author?: string[];
  publisher?: string[];
  exactquery?: boolean;
  collapseduplicates?: boolean;
  order?: string[];
  searchMode?: string;
}

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
  getNewsObjects: async (
    params: NewsObjectsParams,
  ): Promise<SearchNewsObjectModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/newsobjects`,
      method: 'POST',
      data: params,
      headers: {
        'x-belga-context': 'SEARCH',
      },
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

export function useGetNewsObjects(params: NewsObjectsParams) {
  return useQuery(
    [
      QUERY_KEY.NEWS_OBJECTS,
      params.searchtext,
      params.count,
      params.offset,
      params.highlight,
      params.snippets,
      params.language,
      params.mediumtypegroup,
      params.edition,
      params.sourceid,
      params.sourcegroupid,
      params.subsourceid,
      params.topicids,
      params.start,
      params.end,
      params.periodType,
      params.keyword,
      params.author,
      params.publisher,
      params.exactquery,
      params.collapseduplicates,
      params.order,
      params.searchMode,
    ],
    async () => await searchService.getNewsObjects(params),
    {
      enabled: !!params.searchtext,
    },
  );
}
