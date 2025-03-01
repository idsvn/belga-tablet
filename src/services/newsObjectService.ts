import qs from 'qs';
import { useQuery } from 'react-query';

import { API_BASE_URL, API_NEWS_OBJECTS_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { BelgaNewsObjectModel } from 'src/models/belgaNewsObjectModel';
import { KioskNewsObjectModel } from 'src/models/kioskNewsObjectModel';
import { DeliverableModel } from 'src/models/publicationModel';
import { QueryParams } from 'src/models/systemModel';

import axiosService from './axiosService';

interface BelgaNewsObjectsParams {
  userId: number;
  count: number;
  enddate: string;
  offset: number;
  search?: string;
  subsourceids?: string;
  topicids?: string;
  languages?: string;
  sourceids?: string;
}

interface KioskNewsObjectsParams {
  userId: number;
  count: number;
  newsletterId: number;
  highlight: boolean;
  order: string;
  searchtext?: string;
  offset: number;
  start: string;
  end: string;
}

const newsObjectService = {
  getNewsObject: async (params?: QueryParams) => {
    return axiosService()({
      url: `${API_NEWS_OBJECTS_URL.NEWS_OBJECTS_URL}`,
      method: 'GET',
      params,
      headers: {
        'x-belga-context': 'KIOSK',
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getNewsObjectById: async (id: string): Promise<DeliverableModel> => {
    return axiosService()({
      url: `${API_NEWS_OBJECTS_URL.NEWS_OBJECTS_URL}/${id}`,
      method: 'GET',
      headers: {
        'x-belga-context': 'KIOSK',
      },
      params: {
        highlight: false,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getBelgaNewsObject: async ({
    userId,
    ...params
  }: BelgaNewsObjectsParams): Promise<BelgaNewsObjectModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}/belga/newsobjects`,
      method: 'GET',
      params: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },

  getKioskNewsObject: async ({
    userId,
    newsletterId,
    ...params
  }: KioskNewsObjectsParams): Promise<KioskNewsObjectModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}/kiosk/newsletters/${newsletterId}/newsobjects`,
      method: 'GET',
      params: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useGetBelgaNewsObject({
  enabled = true,
  ...params
}: BelgaNewsObjectsParams & { enabled?: boolean }) {
  const {
    count,
    offset,
    topicids,
    search,
    languages,
    sourceids,
    subsourceids,
  } = params;

  return useQuery(
    [
      QUERY_KEY.BELGA_NEWS_OBJECT,
      count,
      offset,
      topicids,
      search,
      languages,
      sourceids,
      subsourceids,
    ],
    async () => await newsObjectService.getBelgaNewsObject(params),
    {
      refetchInterval: 30000,
      enabled,
    },
  );
}

export function useGetRealtimeFeed({
  enabled = true,
  ...params
}: QueryParams & { enabled?: boolean }) {
  const { count, offset, start, end, subscription } = params;

  return useQuery(
    [QUERY_KEY.REALTIME_FEED, count, offset, start, end, subscription],
    () => newsObjectService.getNewsObject(params),
    {
      refetchInterval: 30000,
      enabled,
    },
  );
}

export function useGetKioskNewsObject({
  enabled = true,
  ...params
}: KioskNewsObjectsParams & { enabled?: boolean }) {
  const { count, highlight, newsletterId, searchtext, offset, start, end } =
    params;

  return useQuery(
    [
      QUERY_KEY.KIOSK_NEWS_OBJECT,
      count,
      highlight,
      newsletterId,
      searchtext,
      offset,
      start,
      end,
    ],
    () => newsObjectService.getNewsObject(params),
    {
      enabled,
    },
  );
}

export default newsObjectService;
