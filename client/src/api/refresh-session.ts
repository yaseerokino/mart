/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */

import mem from 'mem';

import { getRefreshTokenFromStorage } from '../helper/storage';
import { axiosPublic } from './axios';

export const refreshSession = async () => {
  const refreshToken = await getRefreshTokenFromStorage();
  console.log('refreshToken', refreshToken);
  try {
    const response = await axiosPublic.get('/sessions/refresh', {
      headers: {
        'x-refresh': refreshToken,
      },
    });

    const { accessToken } = response.data;
    console.log('response', response);
    if (!accessToken) {
      localStorage.removeItem('session');
      localStorage.removeItem('user');
    }

    localStorage.setItem(
      'session',
      JSON.stringify({ accessToken, refreshToken })
    );

    return { accessToken, refreshToken };
  } catch (error) {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
  }
};

const maxAge = 10000;

export const memoizedRefreshSession = mem(refreshSession, {
  maxAge,
});
