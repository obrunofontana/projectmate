import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { setTheme, Theme } from 'store/slices/AppSlice';

export const useTheme = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.app);

  const setCurrentTheme = useCallback(
    (themeParam: Theme) => {
      dispatch(setTheme(themeParam));
    },
    [dispatch],
  );

  return { theme, setCurrentTheme };
};
