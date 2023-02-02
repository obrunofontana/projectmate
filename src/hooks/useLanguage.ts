import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import i18n from 'shared/language/i18n';
import { RootState } from 'store/rootReducer';
import { Language, setLanguage } from 'store/slices/AppSlice';

export const useLanguage = () => {
  const dispatch = useDispatch();

  const { language } = useSelector((state: RootState) => state.app);

  const setCurrentLanguage = useCallback(
    (languageParam: Language) => {
      i18n.changeLanguage(languageParam);
      dispatch(setLanguage(languageParam));
    },
    [dispatch],
  );

  return { language, setCurrentLanguage };
};
