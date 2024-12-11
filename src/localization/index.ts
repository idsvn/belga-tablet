import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE } from 'src/constants/localStorageKey';

import { Language } from 'src/models/systemModel';

import { getSystemLocale } from 'src/utils/localeUtils';

import resources from './resources';

i18n.use(initReactI18next).init({
  debug: true,
  lng: getSystemLocale() || Language.EN,
  fallbackLng: Language.EN,
  interpolation: {
    escapeValue: false,
  },
  resources: resources,
});

export const getLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE);

    if (language !== null) {
      return language;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting language', error);

    return null;
  }
};

export const updateLanguage = async (language: string) => {
  try {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem(LANGUAGE, language);
  } catch (error) {
    console.log('Error updating language', error);
  }
};

getLanguage().then((language) => {
  console.log('language', language);
  if (language !== null) {
    i18n.changeLanguage(language);
  } else {
    i18n.changeLanguage(getSystemLocale());
  }
});

export default i18n;
