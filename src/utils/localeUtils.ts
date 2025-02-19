import { NativeModules } from 'react-native';

import { Language } from 'src/models/systemModel';

export const getSystemLocale = (): string => {
  let locale: string | undefined;

  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (typeof locale === 'undefined') {
    return Language.EN;
  }

  return locale;
};
