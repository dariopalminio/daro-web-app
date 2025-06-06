
import { FunctionComponent, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import useCatalog from "domain/hook/products/catalog.hook";
import Alert from "app/ui/common/alert/alert";
import { CenteringContainer } from "app/ui/common/elements/centering-container";
import CircularProgress from "app/ui/common/progress/circular-progress";
import Pagination from "app/ui/component/product/pagination";
import Products from "app/ui/component/product/products";
import Categories from "./categories";
import { CategoryType } from "domain/model/category/category.type";

/**
 * CatalogPage for to list products as catalog
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
const CatalogPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { isProcessing, hasError, msg, isSuccess, page, maxPage, products, getPreviousPage,
    getNextPage, getCatalog,categories, getCategories, setCategorySelected,categorySelected } = useCatalog();

    useEffect(() => {
      // declare the async data fetching function
      const fetchData = async () => {
  
        return await getCategories(); //search data
      };
  
      fetchData()
        // make sure to catch any error
        .catch(console.error);;
  
    }, []);
    
    const handleClick = async (el: CategoryType) => {
      setCategorySelected(el);
      await getCatalog(1); //search data
    }


  return (
    <div className="page_container">

  <Categories onClick={(cat: CategoryType) => handleClick(cat)} categorySelected={categorySelected} categories={categories}/>

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
          previousLabel={t('previous')}
          ofLabel={t('of')}
          nextLabel={t('next')} />
      </CenteringContainer>
      </>
      }
    </div>
  );
};

export default CatalogPage;