
import { FunctionComponent, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import useProducts from "../../../../domain/hook/products/products.hook";
import Alert from "../../common/alert/alert";
import { CenteringContainer } from "../../common/elements/centering-container";
import CircularProgress from "../../common/progress/circular-progress";
import Pagination from "../../component/product/pagination";
import Products from "../../component/product/products";

/**
 * CatalogPage for to list products as catalog
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
const CatalogPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { isProcessing, hasError, msg, isSuccess, page, maxPage, products, getCatalog } = useProducts();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      return await getCatalog(1); //search data
    };

    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);;

  }, []);

  const getNextPage = async () =>{
    if (page!==maxPage) await getCatalog(page + 1); //search data
  }

  const getPreviousPage = async () =>{
    console.log();
    if (page>0) await getCatalog(page - 1); //search data
  }


  return (
    <div className="page_container">

      {isProcessing &&
        <CircularProgress>{t('progress.loading')}</CircularProgress>
      }
      
      {hasError &&
        <Alert severity="error">{msg}</Alert>
      }

      {isSuccess && <>
        <Products productList={products} />

        <CenteringContainer style={{marginTop: "15px"}}>
        <Pagination
          page={page}
          maxPage={maxPage}
          onClickPrevious={() => getPreviousPage()}
          onClickNext={() => getNextPage()}
          previousLabel={'Previous'}
          ofLabel={'of'}
          nextLabel={'Next'} />
      </CenteringContainer>
      </>
      }
    </div>
  );
};

export default CatalogPage;