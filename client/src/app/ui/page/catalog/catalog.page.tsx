
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next';
import Products from "../../component/product/products";

export const CatalogPage: FunctionComponent = () => {
  const { t } = useTranslation();


  return (
    <div className="container-page">
      <div>catalog</div>
      <Products/>
    </div>
  );
};
