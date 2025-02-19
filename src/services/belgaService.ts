import { useQuery } from 'react-query';

import { API_BELGA_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { BelgaModel } from 'src/models/belgaModel';

import axiosService from './axiosService';

const belgaService = {
  getContentTypes: async (): Promise<BelgaModel> => {
    return axiosService()({
      url: `${API_BELGA_URL.BELGA_URL}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useBelgaContentTypes() {
  return useQuery(
    [QUERY_KEY.BELGA],
    async () => await belgaService.getContentTypes(),
  );
}
