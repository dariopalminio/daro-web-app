
import { FunctionComponent, useState } from "react";
import { useTranslation } from 'react-i18next';
import CatalogPage from "app/ui/page/catalog/catalog.page";

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