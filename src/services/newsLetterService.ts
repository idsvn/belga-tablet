import { useQuery } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { NewsletterDetailModal } from 'src/models/newsletterDetailModal';

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
