import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  BR = 'br',
  EN = 'en',
}

export interface AppState {
  theme: Theme;
  language: Language;
}

const INITIAL_STATE: AppState = {
  theme: Theme.Light,
  language: Language.BR,
};

const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = appSlice.actions;

export default appSlice.reducer;
