import "./products.css";
import { useEffect } from "react";
import ProductItem from "./prduct-item";
import CircularProgress from "../../common/progress/circular-progress";
import Alert from "../../common/alert/alert";
import useProducts from "../../../../domain/hook/products/products.hook";


interface Props {
    productList: Array<any>;
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
                    key={product._id}
                    name={product.name}
                    description={product.description}
                    grossPrice={product.grossPrice}
                    image={product.images[0]}
                    productId={product._id}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default Products;