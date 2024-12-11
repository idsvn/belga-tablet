import { API_USER_URL } from 'src/constants/apiURL';

import axiosService from './axiosService';

const userService = {
  userInfo: async () => {
    return axiosService()({
      url: `${API_USER_URL.USER_URL}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export default userService;
