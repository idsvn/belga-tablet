import { useMutation, useQuery } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { ContactResponse } from 'src/models/contactModel';

import axiosService from './axiosService';

interface GetContactParams {
  userId: number;
  contactids?: string[];
  search?: string;
}

interface ShareNewsObjectsParams {
  userId: number;
  newsObjects: string[];
  recipients: string[];
  contactIds: number[];
  groupIds: string[];
  sender: string;
  personalizedText: string;
}

const shareService = {
  getContact: async ({
    userId,
    ...params
  }: GetContactParams): Promise<ContactResponse> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userId}/contacts`,
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
      url: `${API_BASE_URL}/users/${userId}/newsobjects/share`,
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

export function useSendShare({ ...params }: ShareNewsObjectsParams) {
  const { userId, newsObjects, contactIds, sender, personalizedText } = params;

  return useMutation(
    [
      QUERY_KEY.CONTACT,
      userId,
      newsObjects,
      contactIds,
      sender,
      personalizedText,
    ],
    () => shareService.shareNewsObjects(params),
  );
}

export default shareService;
