import axios, { AxiosInstance } from 'axios';

import configEnv from 'src/configs';

import { userSessionManager } from 'App';

const axiosService = (): AxiosInstance => {
  const accessToken = userSessionManager.getAccessToken();

  const headers: any = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + accessToken,
  };

  const axiosOption = axios.create({
    baseURL: configEnv.API_BASE_URL,
    headers,
  });

  axiosOption.interceptors.request.use(
    (config: any) => {
      return config;
    },

    (error) => {
      Promise.reject(error);
    },
  );

  axiosOption.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (errors) => {
      // console.log(
      //   'Error:',
      //   JSON.stringify(
      //     {
      //       url: errors?.response?.config.url,
      //       status: errors?.response?.status,
      //       method: errors?.response?.config.method,
      //       data: errors?.response?.data,
      //       headers: errors?.response?.headers,
      //     },
      //     null,
      //     2,
      //   ),
      // );

      throw errors;
    },
  );

  return axiosOption;
};

export default axiosService;
