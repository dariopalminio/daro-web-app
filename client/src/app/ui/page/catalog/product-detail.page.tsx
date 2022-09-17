
import {
    RouteComponentProps,
  } from "react-router-dom";
import ProductDetail from "../../component/product/product-detail";

  type TParams = { productId: string };


export function ProductDetailPage({
    match,
  }: RouteComponentProps<TParams>) {
    return (
      <div className="container-page">
        ProductDetailPage {match.params.productId}
        <ProductDetail id={match.params.productId} />
      </div>
    );
  }
