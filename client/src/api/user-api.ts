import { LocalStorage } from '../helper/storage';
import { ICreateUser, ICreateUserSession } from '../interfaces/user';
import axios from './axios';

const userAPI = {
  createUser: (data: ICreateUser) =>
    axios.post('users', data).then((response) => response.data),
  createUserSession: (data: ICreateUserSession) =>
    axios.post('sessions', data).then((response) => {
      if (response.data.accessToken) {
        LocalStorage.set('user', response.data);
      }
      return response.data;
    }),
};

export default userAPI;
