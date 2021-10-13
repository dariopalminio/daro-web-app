import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import enTranslation from '../../domain/i18n/en.json';
import esTranslation from '../../domain/i18n/es.json';

/**
 * Configure and initialize the module of Internationalization
 */

// Source of content text
const resources = {
   en: {
      translation: enTranslation,
   },
   es: {
      translation: esTranslation,
   },
};

// Initialize
i18n
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      resources,
      lng: 'en',

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
      escapeValue: false, // react already safes from xss
      },
   });

export default i18n;