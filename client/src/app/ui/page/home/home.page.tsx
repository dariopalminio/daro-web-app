
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import CircularProgress from "../../common/progress/circular-progress";
import CatalogPage from "../catalog/catalog.page";

/**
 * HomePage
 */
const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("Manzana");


  return (
    <div className="page_container" data-testid="page_container_home">

      <CatalogPage></CatalogPage>

    </div>
  );
};

export default HomePage;