import { API_SOURCE_URL } from 'src/constants/apiURL';

import axiosService from './axiosService';

const sourcesService = {
  getSource: async (id: number) => {
    return axiosService()({
      url: `${API_SOURCE_URL.SOURCE_URL}/${id}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export default sourcesService;
