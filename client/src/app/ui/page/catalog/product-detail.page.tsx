
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  RouteComponentProps,
} from "react-router-dom";
import useProducts from "../../../../domain/hook/products/products.hook";
import CircularProgress from "../../common/progress/circular-progress";
import ProductDetail from "../../component/product/product-detail";

type TParams = { productId: string };

/**
 * ProductDetailPage to search and show product detail data by productId passed as page parameter
 * 
 * Pattern: Container Component and Conditional Rendering
 */
function ProductDetailPage({ match,}: RouteComponentProps<TParams>) {

  const { isProcessing, hasError, msg, isSuccess, product, getDetail } = useProducts();
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchData = async () => {
      return await getDetail(match.params.productId); //search data
    };

    const result = fetchData()
      .catch(console.error);;

    console.log(result);
  }, [])


  return (
    <div className="container-page">
      <Link to="/">{t("back.to.home")}</Link>
      {isProcessing &&
        <CircularProgress>{t('progress.loading')}</CircularProgress>
      }

      {hasError &&
        <h2>{hasError}</h2>
      }

      {isSuccess && <ProductDetail product={product} />
      }
    </div>
  );
};

export default ProductDetailPage;

