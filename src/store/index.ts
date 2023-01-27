import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/slices/AppSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
