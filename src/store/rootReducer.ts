import { combineReducers } from '@reduxjs/toolkit';

import appReducer from 'store/slices/AppSlice';

import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from './slices/UserSlice';

const rootReducer = combineReducers({
  app: appReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  userState: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
