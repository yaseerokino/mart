/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import history from '../helper/history-router-object';
import { getAccessTokenFromStorage } from '../helper/storage';
import { memoizedRefreshSession } from './refresh-session';

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:3005/api/',
});
export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3005/api/',
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenFromStorage();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshSession();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }
      return axiosPublic(config);
    }

    if (error?.response?.status === 403) {
      return history.push('/sign-in');
    }
    return Promise.reject(error);
  }
);
