import "./products.css";
import { useEffect } from "react";
import ProductItem from "./prduct-item";
import CircularProgress from "../../common/progress/circular-progress";
import Alert from "../../common/alert/alert";
import useProducts from "../../../../domain/hook/products/products.hook";


const Products: React.FC = ({}) => {

    const { isProcessing, hasError, msg, isSuccess, products, getCatalog } = useProducts();
 


    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          // waits for 1000ms
          await sleep(200);
          await getCatalog();
          return 'Hello World';
        };
      
        const result = fetchData()
          // make sure to catch any error
          .catch(console.error);;
        
        // what will be logged to the console?
        console.log(result);
      }, [])

    return (
        <div className="homescreen">
            <div className="homescreen__products">
                {isProcessing ? (
                <CircularProgress>{"Loading..."}</CircularProgress>
                ) : hasError ? (
                    <Alert severity="error">{msg}</Alert>
                ) : (
                products.map((product) => (
                    <ProductItem
                    key={product._id}
                    name={product.name}
                    description={product.description}
                    grossPrice={product.grossPrice}
                    images={product.images}
                    productId={product._id}
                    />
                ))
                )}
            </div>
        </div>
    )
}

export default Products;