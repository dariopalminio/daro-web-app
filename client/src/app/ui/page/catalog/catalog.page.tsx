
import { FunctionComponent, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import useProducts from "../../../../domain/hook/products/products.hook";
import Alert from "../../common/alert/alert";
import CircularProgress from "../../common/progress/circular-progress";
import Products from "../../component/product/products";

/**
 * CatalogPage for to list products as catalog
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
const CatalogPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { isProcessing, hasError, msg, isSuccess, products, getCatalog } = useProducts();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      return await getCatalog(); //search data
    };

    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);;

  }, []);

  return (
    <div className="page_container">

      {isProcessing &&
        <CircularProgress>{t('progress.loading')}</CircularProgress>
      }
      
      {hasError &&
        <Alert severity="error">{msg}</Alert>
      }

      {isSuccess &&
        <Products productList={products} />
      }
    </div>
  );
};

export default CatalogPage;