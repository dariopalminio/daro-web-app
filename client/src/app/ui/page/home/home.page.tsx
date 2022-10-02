
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import { CenteringContainer } from "../../common/elements/centering-container";
import Pagination from "../../component/product/pagination";
import CatalogPage from "../catalog/catalog.page";

/**
 * HomePage
 */
const HomePage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOpts, setSelectedOpts] = useState("COCO");
  return (
    <div className="page_container" data-testid="page_container_home">



    
      <CatalogPage></CatalogPage>

    </div>
  );
};

export default HomePage;