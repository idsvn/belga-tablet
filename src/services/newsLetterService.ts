import { useQuery } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { NewsletterDetailModal } from 'src/models/newsletterDetailModal';
import { OccurrenceModel } from 'src/models/occurenceModel';
import { QueryParams } from 'src/models/systemModel';

import axiosService from './axiosService';

const newsLetterService = {
  getNewsLetter: async (letterId?: number): Promise<NewsletterDetailModal> => {
    return axiosService()({
      url: `${API_BASE_URL}/newsletters/${letterId}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  getOccurrence: async (
    userid: number,
    recurringId: number,
    params: QueryParams,
  ): Promise<OccurrenceModel> => {
    return axiosService()({
      url: `${API_BASE_URL}/users/${userid}/kiosk/recurringtemplates/${recurringId}/occurrences`,
      params,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useGetNewsLetter(letterId?: number) {
  return useQuery(
    [QUERY_KEY.NEWSLETTER_DETAIL, letterId],
    async () => await newsLetterService.getNewsLetter(letterId),
    {
      enabled: !!letterId,
    },
  );
}

export function useGetOccurrences({
  userid,
  recurringId,
  params,
}: {
  userid: number;
  recurringId?: number;
  params: QueryParams;
}) {
  return useQuery(
    [QUERY_KEY.OCCURRENCES, userid, recurringId, params],
    async () =>
      await newsLetterService.getOccurrence(userid, recurringId ?? 0, params),
    {
      enabled: !!recurringId,
    },
  );
}
