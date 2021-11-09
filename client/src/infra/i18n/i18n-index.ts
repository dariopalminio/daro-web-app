//import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import { supportedLngs } from '../../domain/i18n/supported-lngs';
import enTranslation from '../../domain/i18n/en.json';
import esTranslation from '../../domain/i18n/es.json';

i18next
.use(LanguageDetector)
.use(initReactI18next)
.init({
  supportedLngs: supportedLngs,
  fallbackLng: 'es',
 // lng: "es",
  debug: false,
  detection: {
    order: ['path', 'cookie', 'htmlTag'],
    caches: ['cookie'],
  },
  keySeparator: false, // we do not use keys in form messages.welcome
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
  },
});
export default i18next;

