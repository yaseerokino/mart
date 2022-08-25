import { LocalStorage } from '../helper/storage';
import { ICreateUser, ICreateUserSession } from '../interfaces/user';
import { axiosPublic, axiosPrivate } from './axios';

const path = 'users';

const userAPI = {
  createUserSession: (data: ICreateUserSession) =>
    axiosPublic.post('sessions', data).then((response) => {
      if (response.data) {
        LocalStorage.set('session', response.data.tokens);
        LocalStorage.set('user', response.data.user);
      }
      return response.data;
    }),
  createUser: (data: ICreateUser) =>
    axiosPublic.post(`${path}`, data).then((response) => response.data),
  currentUser: () =>
    axiosPrivate.get(`${path}/current-user`).then((response) => response),
  currentAdmin: () =>
    axiosPrivate.get(`${path}/current-admin`).then((response) => response),
};

export default userAPI;
