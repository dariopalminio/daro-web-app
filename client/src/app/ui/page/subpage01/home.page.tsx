
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next';

export const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();


  return (
    <>
      <div>{t('home.title')}</div>
      
    </>
  );
};
