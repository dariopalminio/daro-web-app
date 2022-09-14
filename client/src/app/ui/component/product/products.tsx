import "./products.css";
import { useEffect } from "react";
import ProductItem from "./prduct-item";




const Products = () => {



    const getProducts = {products:[
        {_id: "1", name: "name", imageUrl:"img1", price:0,description:"description1", countInStock:1},
        {_id: "2", name: "name2", imageUrl:"img2", price:0,description:"description2", countInStock:1},
        {_id: "3", name: "name3", imageUrl:"img32", price:0,description:"description3", countInStock:1},
        {_id: "4", name: "name4", imageUrl:"img4", price:0,description:"description4", countInStock:1},
    ], loading: false, error:false};
    const { products, loading, error } = getProducts;
  

    return (
        <div className="homescreen">
            <div className="homescreen__products">
                {loading ? (
                <h2>Cargando...</h2>
                ) : error ? (
                <h2>{error}</h2>
                ) : (
                products.map((product) => (
                    <ProductItem
                    key={product._id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    productId={product._id}
                    />
                ))
                )}
            </div>
        </div>
    )
}

export default Products;