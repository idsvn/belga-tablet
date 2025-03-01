import { useQuery } from 'react-query';

import { API_BASE_URL, API_KIOSK_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { NewsLettersResponse } from 'src/models/newslettersModel';
import { QueryParams } from 'src/models/systemModel';

import axiosService from './axiosService';

const kioskService = {
  getLatestPressReleases: async (userId: number) => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}${API_KIOSK_URL.GET_PRESS_RELEASES_URL}?count=4&languages=EN`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getFavorites: async (userId: number) => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}${API_KIOSK_URL.GET_FAVORITES_URL}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getPublicationByDeliverableId: async (
    userId: number,
    deliverableid: number,
  ) => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}${API_KIOSK_URL.GET_PUBLICATION_URL}`,
      method: 'GET',
      params: {
        count: 50,
        deliverableid,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getNewLetters: async (
    userId: number,
    params: QueryParams,
  ): Promise<NewsLettersResponse> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}${API_KIOSK_URL.GET_NEWS_LETTERS_URL}`,
      method: 'GET',
      params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useGetNewLetters({
  enabled = true,
  userId,
  ...params
}: QueryParams & { userId: number; enabled?: boolean }) {
  const { count, offset, start, end, order, type, searchtext } = params;

  return useQuery(
    [
      QUERY_KEY.NEWSLETTER,
      count,
      offset,
      start,
      end,
      order,
      type,
      userId,
      searchtext,
    ],
    () => kioskService.getNewLetters(userId, params),
    {
      refetchInterval: 30000,
      enabled,
    },
  );
}

export default kioskService;
