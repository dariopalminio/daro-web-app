
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import Products from "../../component/product/products";
import TextField from "../../common/text-field/text-field";
import Button from "../../common/button/button";
import useModal from "../../common/dialog/use-modal-dialog";
import ModalDialog from "../../common/dialog/modal-dialog";
import useModalDialog from "../../common/dialog/use-modal-dialog";
import ListBox from "../../common/list-box/list-box";

export const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();
const [selected, setSelected] = useState("Manzana");

  
  return (
    <div className="container-page">
      <div>{t('home.title')}</div>

      
<ListBox 
id="listbox"
label="seleccion"
value={selected}
options={["Banana","Manzana","Pera","Coco"]}
onChange={(selectedOption)=> setSelected(selectedOption)}
      />

      <Products/>
    </div>
  );
};
