import React, { useState } from 'react';
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next';

export const HomePage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const [language, setLenguage] = useState('es');

  return (
    <>
      <div>{t('home.title')}</div>
      
    </>
  );
};
