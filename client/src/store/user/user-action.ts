/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

import userAPI from '../../api/user-api';
import { LocalStorage } from '../../helper/storage';
import { ICreateUser } from '../../interfaces';
import { ICreateUserSession } from '../../interfaces/user';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: ICreateUser, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUser(userData);
      console.log('response =>', response);
      if (!response.success) {
        return rejectWithValue(response.data.error || response.data.message);
      }
      return response;
    } catch (error: any) {
      console.log(error);
      if (error && error.response) {
        return rejectWithValue(
          error.response.data.error || error.response.data.message
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createUserSession = createAsyncThunk(
  'users/createUserSession',
  async (userData: ICreateUserSession, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUserSession(userData);
      console.log('response =>', response);
      if (!response.success) {
        return rejectWithValue(response.error || response.message);
      }
      LocalStorage.set('tokens', response.tokens);
      return response;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || error.response.data.message
        );
      }
      return rejectWithValue(error.message);
    }
  }
);
