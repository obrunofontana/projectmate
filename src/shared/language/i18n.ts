import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import BR from 'shared/language/locales/br.json';
import EN from 'shared/language/locales/en.json';

i18n.use(initReactI18next).init({
  lng: 'br',
  resources: {
    br: { translation: BR },
    en: { translation: EN },
  },
});

export default i18n;
