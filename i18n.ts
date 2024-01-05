import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/en.json';
import ar from './locales/ar/ar.json';

// import { getLocales } from 'expo-localization';
// import * as Localization from 'expo-localization';
// import { I18nManager } from 'react-native';

// const deviceLanguage = getLocales()[0].languageCode;

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  // lng: deviceLanguage && I18nManager.isRTL ? 'ar' : 'en', // default language
  lng: 'ar',
  fallbackLng: 'en', // fallback language
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
