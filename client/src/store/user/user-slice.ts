/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { createUser } from './user-action';

interface UserStateProps {
  loading: boolean;
  userInfo: {};
  userToken: null | string;
  error: null | string | Array<string>;
  success: boolean;
}

const initialState: UserStateProps = {
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
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string | Array<string>;
      });
  },
});

export default userSlice.reducer;
