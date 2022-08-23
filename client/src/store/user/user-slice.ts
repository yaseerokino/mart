/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IResponse } from '../../interfaces';
import { createUser, createUserSession } from './user-action';

interface UserStateProps {
  loading: boolean;
  userInfo: {};
  userToken: null | string;
  error: null | string | Array<string>;
  success: boolean;
}

export const initialState: UserStateProps = {
  loading: false,
  userInfo: {},
  userToken: null,
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
        state.error = payload as string | Array<string>;
      });

    builder
      .addCase(createUserSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userToken = payload as string;
      })
      .addCase(createUserSession.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string | Array<string>;
      });
  },
});

export default userSlice.reducer;
