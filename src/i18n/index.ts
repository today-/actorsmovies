import i18n from 'i18next';
import {initReactI18next, Trans} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {en} from './en';
import {ru} from './ru';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    whitelist: ['en', 'ru'],
    resources: {
      en: {translations: en},
      ru: {translations: ru}
    },
    fallbackLng: false,
    debug: false,

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    },

    detection: {
      caches: ['cookie'],
      cookieMinutes: 0,
    }
  });

export {i18n};

export type I18nKey = keyof typeof ru | keyof typeof en;

export const t = (i18nKey: I18nKey, count?: number) => Trans({i18nKey, count});

export async function toggleLanguage() {
  await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
}
