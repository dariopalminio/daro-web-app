
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import Products from "../../component/product/products";
import TextField from "../../common/text-field/text-field";
import Button from "../../common/button/button";
import useModal from "../../common/dialog/use-modal-dialog";
import ModalDialog from "../../common/dialog/modal-dialog";
import useModalDialog from "../../common/dialog/use-modal-dialog";
import ListBox from "../../common/list-box/list-box";
import MenuList from "../../common/menu-list/menu-list";
import { LeftMenuData } from "../../layout/core/left-menu-data";
import { CatalogPage } from "../catalog/catalog.page";


export const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("Manzana");


  return (
    <div >
      <div>{t('home.title')}</div>

      <CatalogPage></CatalogPage>

    </div>
  );
};
