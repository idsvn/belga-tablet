import { API_BASE_URL, API_KIOSK_URL } from 'src/constants/apiURL';

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
};

export default kioskService;
