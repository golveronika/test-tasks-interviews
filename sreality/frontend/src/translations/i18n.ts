import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

import resources from './translations.json';

const languages = ['en', 'cs'];

i18n
.use(initReactI18next)
.use(LanguageDetector)
.init({
  // we init with resources
  resources: resources,
  fallbackLng: languages,
  supportedLngs: languages,
  load: "languageOnly",
  debug: false,
  nonExplicitSupportedLngs: true,
  cleanCode: true,
  detection: {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'language'
  },

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },
  react: {
    useSuspense: true
  }
});

export default i18n;