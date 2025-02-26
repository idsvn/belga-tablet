import { useQuery } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import axiosService from './axiosService';

interface GetContactParams {
  userId: number;
  contactids: string[];
  search: string;
}

interface ShareNewsObjectsParams {
  userId: number;
  newsObjects: string[];
  contactIds: string[];
  sender: string;
  personalizedText: string;
}

const shareService = {
  getContact: async ({ userId, ...params }: GetContactParams) => {
    return axiosService()({
      url: `${API_BASE_URL}/user/${userId}/contacts`,
      method: 'GET',
      params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  shareNewsObjects: ({ userId, ...params }: ShareNewsObjectsParams) => {
    return axiosService()({
      url: `${API_BASE_URL}/user/${userId}/newsobjects/share`,
      method: 'POST',
      data: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useGetContact({
  enabled = true,
  ...params
}: GetContactParams & { enabled?: boolean }) {
  const { userId, contactids, search } = params;

  return useQuery(
    [QUERY_KEY.CONTACT, userId, contactids, search],
    () => shareService.getContact(params),
    {
      enabled,
    },
  );
}

export function useSendShare({
  enabled = true,
  ...params
}: ShareNewsObjectsParams & { enabled?: boolean }) {
  const { userId, newsObjects, contactIds, sender, personalizedText } = params;

  return useQuery(
    [
      QUERY_KEY.CONTACT,
      userId,
      newsObjects,
      contactIds,
      sender,
      personalizedText,
    ],
    () => shareService.shareNewsObjects(params),
    {
      enabled,
    },
  );
}

export default shareService;
