import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum Language {
  BR = 'br',
  EN = 'en',
}

export interface AppState {
  darkMode: boolean;
  language: Language;
}

const INITIAL_STATE: AppState = {
  darkMode: !!JSON.parse(localStorage.getItem('darkMode') || 'false'),
  language: Language.BR,
};

const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = appSlice.actions;

export default appSlice.reducer;
