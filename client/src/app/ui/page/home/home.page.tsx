
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import CircularProgress from "../../common/progress/circular-progress";
import { CatalogPage } from "../catalog/catalog.page";

/**
 * 
 */
export const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("Manzana");


  return (
    <div >

      <CatalogPage></CatalogPage>

    </div>
  );
};
