
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next';
import Products from "../../component/product/products";
import TextField from "../../common/text-field/text-field";
export const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();


  return (
    <div className="container-page">
      <div>{t('home.title')}</div>

      <Products/>
    </div>
  );
};
