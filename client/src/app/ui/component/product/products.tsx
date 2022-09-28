import "./products.css";
import { useEffect } from "react";
import ProductItem from "./prduct-item";
import CircularProgress from "../../common/progress/circular-progress";
import Alert from "../../common/alert/alert";
import useProducts from "../../../../domain/hook/products/products.hook";
import { ProductType } from "../../../../domain/model/product/product.type";


interface Props {
    productList: Array<ProductType>;
}

/**
 * Customized IconButton
 */
const Products: React.FC<Props> = ({ productList }) => {


    return (
        <div className="product_container">
            <div className="product_catalog">
               {
                    productList.map((product:any) => (
                    <ProductItem
                    productItem={product}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default Products;