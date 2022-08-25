/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import historyObject from '../../helper/history-router-object';

interface ICategoryState {
  isLoading: boolean;
  categories: Array<{}>;
  category: {};
  isUpdating: boolean;
  isCreating: boolean;
}

const initialState: ICategoryState = {
  isLoading: false,
  categories: [],
  category: {},
  isUpdating: false,
  isCreating: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoriesView: (state) => {
      state.isCreating = false;
      state.isUpdating = false;
      historyObject.push('/admin/categories');
    },
    createCategoryView: (state) => {
      state.isCreating = true;
      state.isUpdating = false;
      historyObject.push('/admin/categories/create');
    },
    updateCategoryView: (state) => {
      state.isCreating = false;
      state.isUpdating = true;
    },
  },
  extraReducers: (builder) => {},
});

export default categorySlice.reducer;
