import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './category/category-slice';
import userReducer from './user/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
