import {
  API_NEWS_OBJECTS_URL,
  API_TAG_URL,
  API_USER_URL,
} from 'src/constants/apiURL';

import axiosService from './axiosService';

const tagService = {
  getTagsByUserId: async (userId: number, params: object) => {
    return axiosService()({
      url: `${API_USER_URL.USERS_URL}/${userId}${API_TAG_URL.TAG_URL}`,
      method: 'GET',
      params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
  updateTag: async (tagId: string, data?: any) => {
    return axiosService()({
      url: `${API_NEWS_OBJECTS_URL.NEWS_OBJECTS_URL}/${tagId}${API_TAG_URL.TAG_URL}`,
      method: 'PUT',
      data: data || [],
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export default tagService;
