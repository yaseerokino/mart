import axios from './axios';

const userAPI = {
  createUser: (data: any) => axios.post('users', data),
  createUserSession: (data: any) => {},
};

export default userAPI;
