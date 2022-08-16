import { createAsyncThunk } from '@reduxjs/toolkit';

import userAPI from '../../api/user-api';
import { ICreateUser, IResponse } from '../../interfaces';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: ICreateUser, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUser(userData);
      console.log(response);
      if (!response.data.success) {
        return rejectWithValue(response.data.error);
      }
      return response.data as IResponse;
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || error.response.data.message
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createUserSession = () => {};
