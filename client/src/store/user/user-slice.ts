/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import {
  getAccessTokenFromStorage,
  getRefreshTokenFromStorage,
  getUserFromStorage,
} from '../../helper/storage';
import { createUser, createUserSession } from './user-action';

interface IUserState {
  loading: boolean;
  user: {};
  session: {
    accessToken: null | string;
    refreshToken: null | string;
  };
  error: null | string | Array<string>;
  success: boolean;
}

interface IErrorMessage {
  error: string | Array<string>;
  message: string;
}

export const initialState: IUserState = {
  loading: false,
  user: getUserFromStorage() || {},
  session: {
    accessToken: getAccessTokenFromStorage() || null,
    refreshToken: getRefreshTokenFromStorage() || null,
  },
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          (payload as IErrorMessage).error ||
          (payload as IErrorMessage).message;
      });

    builder
      .addCase(createUserSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.session = payload.tokens;
        state.user = payload.user;
      })
      .addCase(createUserSession.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          (payload as IErrorMessage).error ||
          (payload as IErrorMessage).message;
      });
  },
});

export default userSlice.reducer;
