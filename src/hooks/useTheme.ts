import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/rootReducer';
import { setTheme } from 'store/slices/AppSlice';

export const useTheme = () => {
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state: RootState) => state.app);

  const toggleTheme = useCallback(() => {
    const isDarkMode = !!JSON.parse(localStorage.getItem('darkMode') || 'false');
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    dispatch(setTheme(!darkMode));
  }, [dispatch, darkMode]);

  return { darkMode, toggleTheme };
};
