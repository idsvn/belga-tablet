import qs from 'qs';

import { API_NEWS_OBJECTS_URL } from 'src/constants/apiURL';

import { DeliverableModel } from 'src/models/publicationModel';
import { QueryParams } from 'src/models/systemModel';

import axiosService from './axiosService';

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
};

export default newsObjectService;
