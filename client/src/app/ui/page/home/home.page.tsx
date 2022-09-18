
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import Products from "../../component/product/products";
import TextField from "../../common/text-field/text-field";
import Button from "../../common/button/button";
import useModal from "../../common/dialog/use-modal-dialog";
import ModalDialog from "../../common/dialog/modal-dialog";

export const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="container-page">
      <div>{t('home.title')}</div>



      <Products/>
    </div>
  );
};
