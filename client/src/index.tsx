import React from "react";
import ReactDOM from "react-dom";
import "./app/ui/style/global.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import './infra/i18n/i18n-index';
//import { I18nextProvider } from "react-i18next";
//import i18next from "i18next";
//import enTranslation from "./domain/i18n/en.json";
//import esTranslation from "./domain/i18n/es.json";
//import LanguageDetector from 'i18next-browser-languagedetector';
//import { initReactI18next } from 'react-i18next'; 
/*
i18next
.use(LanguageDetector)
.use(initReactI18next)
.init({
  supportedLngs: ['en', 'es'],
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
  //interpolation: {
  //  escapeValue: false, // react already safes from xss
  //},
});
*/
ReactDOM.render(
  //  <React.StrictMode>
  //<I18nextProvider i18n={i18next}>
    <App />,
  //</I18nextProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
