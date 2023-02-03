import { configureStore, Action } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { ThunkAction } from 'redux-thunk';

import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([logger, authApi.middleware, userApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
